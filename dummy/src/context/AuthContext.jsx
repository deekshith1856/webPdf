import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const autoLogin = async () => {
      const user = JSON.parse(localStorage.getItem("user")) || {};
      if (Object.keys(user).length > 0) {
        const config = {
          headers: {
            authorization: `Bearer ${user.token}`,
          },
        };
        const { data } = await axios.get(
          `${import.meta.env.VITE_REACT_API_URL}/auth/auto`,
          config
        );
        if (data) {
          setLoggedIn(true);
          setCurrentUser({
            ...data,
            token: user.token,
          });
        }
      }
    };
    autoLogin();
  }, []);
  const handleLogin = async ({ email, password }) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_REACT_API_URL}/auth/signin`,
        { email, password }
      );
      console.log(data);
      setCurrentUser(data);
      setLoggedIn(true);

      navigate(location.state || "/");

      localStorage.setItem("user", JSON.stringify(data));
    } catch (err) {
      console.log(err);
      toast({
        title: "Error",
        status: "warning",
        description: err.message,
        isClosable: true,
        duration: 3000,
      });
    }
  };
  const handleRegister = async ({ name, email, password }) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_REACT_API_URL}/auth/signup`,
        { name, email, password }
      );
      setCurrentUser(data);
      setLoggedIn(true);
      navigate(location.state || "/");
      localStorage.setItem("user", JSON.stringify(data));
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        status: "warning",
        description: err.message,
        isClosable: true,
        duration: 3000,
      });
    }
  };
  const handleLogout = async () => {
    setCurrentUser({});
    setLoggedIn(false);
    localStorage.removeItem("user");
    navigate("/");
  };
  const values = {
    loggedIn,
    currentUser,
    handleLogin,
    handleRegister,
    handleLogout,
    loading,
    setLoading,
  };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
export const useAuth = () => useContext(AuthContext);
