import React, { useEffect, useState } from "react";
import axios from "axios";
import { Outlet } from "react-router-dom";
import RoutesSpinner from "./RoutesSpinner";
import { useAuth } from "../../context/AuthContext";

const PrivateRoutes = () => {
  // State to track whether the user is verified
  const [ok, setOk] = useState(false);

  // Get user authentication information from the context
  const { currentUser, loggedIn } = useAuth();

  useEffect(() => {
    // Function to verify the user's authentication on the server
    const verifyUser = async () => {
      try {
        const config = {
          headers: { authorization: `Bearer ${currentUser.token}` },
        };
        const { data } = await axios.get(
          `${import.meta.env.VITE_REACT_API_URL}/auth/verifyUser`,
          config
        );

        // If the verification is successful, set ok to true
        if (data.ok) {
          setOk(true);
        }
      } catch (error) {
        console.log(error);
      }
    };

    // Check user authentication and verify if logged in
    if (loggedIn) {
      verifyUser();
    }
  }, [currentUser.token, loggedIn]);

  // Render the Outlet (child routes) if the user is verified, otherwise show a spinner
  return ok ? <Outlet /> : <RoutesSpinner />;
};

export default PrivateRoutes;
