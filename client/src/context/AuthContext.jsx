import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

// Create the authentication context
const AuthContext = createContext();

// Create the AuthProvider component
const AuthProvider = ({ children }) => {
  // State for tracking authentication status
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [loading, setLoading] = useState(false);
const toast= useToast()
  // Navigation hook for redirection
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is already logged in (auto-login)
    const autoLogin = async () => {
      const user = JSON.parse(localStorage.getItem("user")) || {};

      if (Object.keys(user).length > 0) {
        const config = {
          headers: {
            authorization: `Bearer ${user.token}`,
          },
        };

        // Verify the user's token on the server
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

  // Handle user login
  const handleLogin = async ({ email, password }) => {
    try {
      // Send a POST request to the server for user login
      const { data } = await axios.post(
        `${import.meta.env.VITE_REACT_API_URL}/auth/signin`,
        { email, password }
      );

      setCurrentUser(data);
      setLoggedIn(true);

      // Redirect to the previous page or the default route
      navigate("/");

      localStorage.setItem("user", JSON.stringify(data));
    } catch (error) {
      // Handle and display an error toast
      toast({
        title: "Error",
        status: "warning",
        description: error.response.data.message,
        isClosable: true,
        duration: 3000,
      });
    }
  };

  // Handle user registration
  const handleRegister = async ({ name, email, password }) => {
    try {
      // Send a POST request to the server for user registration
      const { data } = await axios.post(
        `${import.meta.env.VITE_REACT_API_URL}/auth/signup`,
        { name, email, password }
      );

      setCurrentUser(data);
      setLoggedIn(true);

      // Redirect to the previous page or the default route
      navigate(location.state || "/");
      localStorage.setItem("user", JSON.stringify(data));
    } catch (error) {
      

      // Handle and display an error toast
      toast({
        title: "Error",
        status: "warning",
        description: error.response.data.message,
        isClosable: true,
        duration: 3000,
      });
    }
  };

  // Handle user logout
  const handleLogout = async () => {
    setCurrentUser({});
    setLoggedIn(false);

    // Remove user information from local storage
    localStorage.removeItem("user");

    // Navigate to the default route
    navigate("/");
  };

  // Context values for consumers
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

// Create a hook for using the authentication context
export const useAuth = () => useContext(AuthContext);
