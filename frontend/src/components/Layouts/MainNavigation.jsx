import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/react.svg";

import "./MainNavigation.css";
import { Button, Navbar } from "flowbite-react";
import { AuthContext } from "../../context/auth-context";

export const MainNavigation = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.logout(() => navigate("/auth"));
  };
  return (
    <Navbar fluid rounded>
      <Navbar.Brand as={Link} to="/">
        <img src={Logo} className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Flowbite React
        </span>
      </Navbar.Brand>
      {auth.isLoggedIn ? (
        <div className="flex md:order-2">
          <Button onClick={handleLogout}>Logout</Button>
          <Navbar.Toggle />
        </div>
      ) : (
        <Navbar.Toggle />
      )}
      <Navbar.Collapse>
        <Navbar.Link as={Link} to="/">
          ALL USERS
        </Navbar.Link>

        {auth.isLoggedIn && (
          <>
            <Navbar.Link as={Link} to={`${auth.userId}/places`}>
              MYPLACES
            </Navbar.Link>
            <Navbar.Link as={Link} to="/places/new">
              ADD PLACE
            </Navbar.Link>
          </>
        )}
        {!auth.isLoggedIn && (
          <Navbar.Link as={Link} to="/auth">
            AUTHENTICATE
          </Navbar.Link>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};
