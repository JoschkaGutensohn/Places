import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { ProtectedRoutes } from "./ProtectedRoutes";

const Users = React.lazy(() => import("../pages/Users/Users"));
const NewPlace = React.lazy(() => import("../pages/NewPlace"));
const UserPlaces = React.lazy(() => import("../pages/UserPlaces/UserPlaces"));
const UpdatePlace = React.lazy(() => import("../pages/UpdatePlace"));
const Auth = React.lazy(() => import("../pages/Auth"));

export const AllRoutes = ({ isLoggedin }) => {
  return (
    <Routes>
      <Route path="/" element={<Users />} />
      <Route path="/:userId/places" element={<UserPlaces />} />
      <Route
        path="/places/new"
        element={
          <ProtectedRoutes isLoggedin={isLoggedin}>
            <NewPlace />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/places/:placeId"
        element={
          <ProtectedRoutes isLoggedin={isLoggedin}>
            <UpdatePlace />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/auth"
        element={isLoggedin ? <Navigate to="/" /> : <Auth />}
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
