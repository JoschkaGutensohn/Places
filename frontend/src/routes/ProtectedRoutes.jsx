import { Navigate } from "react-router-dom";

export const ProtectedRoutes = ({ isLoggedin, children }) => {
  return isLoggedin ? children : <Navigate to="/auth" />;
};
