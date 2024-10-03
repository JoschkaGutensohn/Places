const fs = require("fs");

const { validationResult } = require("express-validator");
const HttpError = require("../models/http-error");
const getCoordsForAddress = require("../util/location");
const Place = require("../models/place");
const User = require("../models/user");
const { default: mongoose } = require("mongoose");

const getPlaceById = async (req, res, next) => {
  const placeId = req.params.pid;
  let place;
  try {
    place = await Place.findById(placeId);
  } catch (error) {
    return next(new HttpError("Something went wrong.", 500));
  }
  if (!place) {
    return next(
      new HttpError("Could not find a place for the provided id.", 404)
    );
  }
  res.json({ place: place.toObject({ getters: true }) });
};

const getPlacesByUserId = async (req, res, next) => {
  const userId = req.params.uid;

  //alt1
  let places;
  try {
    places = await Place.find({ creator: userId });
  } catch (error) {
    return next(new HttpError("Something went wrong.", 500));
  }
  if (places.length === 0) {
    return next(
      new HttpError("Could not find any places for the provided userid.", 404)
    );
  }
  res.json({
    places: places.map((place) => place.toObject({ getters: true })),
  });

  //alt2
  // let userWithPlaces;
  // try {
  //   userWithPlaces = await User.findById(userId).populate("places");
  // } catch (error) {
  //   return next(new HttpError("Something went wrong.", 500));
  // }
  // if (!userWithPlaces || userWithPlaces.places.length === 0) {
  //   return next(
  //     new HttpError("Could not find any places for the provided userid.", 404)
  //   );
  // }
  // res.json({
  //   places: userWithPlaces.places.map((place) =>
  //     place.toObject({ getters: true })
  //   ),
  // });
};

const createPlace = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }
  const { title, description, address } = req.body;
  let coordinates;
  try {
    coordinates = await getCoordsForAddress(address);
  } catch (error) {
    return next(new HttpError(error));
  }
  const createdPlace = new Place({
    title,
    description,
    address,
    location: coordinates,
    image: req.file.path,
    creator: req.userData.userId,
  });

  let user;
  try {
    user = await User.findById(req.userData.userId);
  } catch (error) {
    return next(new HttpError("Something went wrong", 500));
  }

  if (!user) {
    return next(new HttpError("User for provided id does not exist", 404));
  }

  try {
    // Klappt nur wenn beide Collections bereits vorhanden sind,
    // da in einer Session nicht automatisch neue Collections erstellt werden
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdPlace.save({ session: sess });
    user.places.push(createdPlace);
    await user.save({ session: sess });
    sess.commitTransaction();
  } catch (error) {
    return next(new HttpError("Creating place failed, please try again", 500));
  }
  res.status(201).json({ place: createdPlace.toObject({ getters: true }) });
};

const updatePlace = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }
  const placeId = req.params.pid;
  const { title, description } = req.body;
  let place;
  try {
    place = await Place.findById(placeId);
  } catch (error) {
    return next(new HttpError("Something went wrong.", 500));
  }
  if (!place) {
    return res.status(404).json({ message: "Place not found." });
  }

  if (place.creator.toString() !== req.userData.userId) {
    return next(new HttpError("You are not allowed to edit this place!", 401));
  }

  place.title = title;
  place.description = description;
  try {
    await place.save();
  } catch (error) {
    return next(new HttpError("Something went wrong.", 500));
  }
  res.status(200).json({ place: place.toObject({ getters: true }) });
};

const deletePlace = async (req, res, next) => {
  const placeId = req.params.pid;
  let place;
  try {
    place = await Place.findById(placeId).populate("creator");
  } catch (error) {
    return next(new HttpError("Something went wrong.", 500));
  }
  if (!place) {
    return res.status(404).json({ message: "Place not found." });
  }

  if (place.creator.id !== req.userData.userId) {
    return next(new HttpError("You are not allowed to edit this place!", 401));
  }

  const imagePath = place.image;

  try {
    // Klappt nur wenn beide Collections bereits vorhanden sind,
    // da in einer Session nicht automatisch neue Collections erstellt werden
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await place.deleteOne({ session: sess });
    place.creator.places.pull(place);
    await place.creator.save({ session: sess });
    sess.commitTransaction();
  } catch (error) {
    return next(new HttpError("Something went wrong.", 500));
  }

  fs.unlink(imagePath, (err) => {
    console.log(err);
  });

  res
    .status(200)
    .json({ message: `Place with id ${placeId} successfully deleted` });
};

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
