const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const HttpError = require("../models/http-error");
const User = require("../models/user");

const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, "-password");
  } catch (error) {
    return next(new HttpError("Something went wrong.", 500));
  }

  if (users.length === 0) {
    return next(new HttpError("No users found.", 500));
  }
  res.json({ users: users.map((u) => u.toObject({ getters: true })) });
};

const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }
  const { name, email, password } = req.body;

  let foundUser;
  try {
    foundUser = await User.findOne({ email: email });
  } catch (error) {
    return next(new HttpError("Something went wrong.", 500));
  }

  if (foundUser) {
    return next(
      new HttpError("Could not create user, email already exists", 422)
    );
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (error) {
    return next(new HttpError("Something went wrong.", 500));
  }

  const createdUser = new User({
    name,
    email,
    password: hashedPassword,
    image: req.file.path,
    places: [],
  });

  try {
    await createdUser.save();
  } catch (error) {
    return next(new HttpError("Something went wrong", 500));
  }

  let token;
  try {
    token = jwt.sign(
      { userId: createdUser.id, email: createdUser.email },
      process.env.JWT_KEY,
      { expiresIn: "1h" }
    );
  } catch (error) {
    return next(new HttpError("Something went wrong", 500));
  }

  res
    .status(201)
    .json({ userId: createdUser.id, email: createdUser.email, token });
};

const login = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }
  const { email, password } = req.body;

  let foundUser;
  try {
    foundUser = await User.findOne({ email: email });
  } catch (error) {
    return next(new HttpError("Something went wrong.", 500));
  }

  if (!foundUser) {
    return next(
      new HttpError(
        "Could not identify user, credentials seems to be wrong",
        403
      )
    );
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, foundUser.password);
  } catch (error) {
    return next(new HttpError("Something went wrong.", 500));
  }

  if (!isValidPassword) {
    return next(
      new HttpError(
        "Could not identify user, credentials seems to be wrong",
        403
      )
    );
  }

  let token;
  try {
    token = jwt.sign(
      { userId: foundUser.id, email: foundUser.email },
      process.env.JWT_KEY,
      { expiresIn: "1h" }
    );
  } catch (error) {
    return next(new HttpError("Something went wrong.", 500));
  }

  res.status(200).json({ userId: foundUser.id, email: foundUser.email, token });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
