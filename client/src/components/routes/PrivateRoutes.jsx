import React, { useEffect, useState } from "react";
import axios from "axios";
import { Outlet } from "react-router-dom";
import RoutesSpinner from "./RoutesSpinner";
import { useAuth } from "../../context/AuthContext";

const PrivateRoutes = () => {
  const [ok, setOk] = useState(false);
  const { currentUser, loggedIn } = useAuth();
  useEffect(() => {
    const verifyuser = async () => {
      try {
        const config = {
          headers: { authorization: `Bearer ${currentUser.token}` },
        };
        const { data } = await axios.get(
          `${import.meta.env.VITE_REACT_API_URL}/auth/verifyUser`,
          config
        );
        if (data.ok) {
          setOk(true);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (loggedIn) {
      verifyuser();
    }
  });

  return ok ? <Outlet /> : <RoutesSpinner />;
};

export default PrivateRoutes;
