/* eslint-disable no-unused-vars */
import { Navigate, Route } from "react-router-dom";
import { useAuth } from "../../AuthPovider/AuthProvider";
import { Home } from "../Home/Home";

/* eslint-disable react/prop-types */
export const PrivateRoute = () => {
  const { token } = useAuth();

  // console.log("Token in Home: ", token);

  return token ? <Home /> : <Navigate to="/login" />;
};
