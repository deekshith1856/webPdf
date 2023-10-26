import { Flex, Spinner, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const RoutesSpinner = () => {
  // Initialize the countdown state
  const [count, setCount] = useState(4);

  // Get the navigate function and location from React Router
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Start a countdown using setInterval
    const interval = setInterval(() => {
      setCount((prev) => prev - 1);
    }, 1000);

    // When the countdown reaches 0, navigate to the login route
    if (count === 0) {
      navigate(`/auth/login`);
    }

    // Clean up the interval to prevent memory leaks
    return () => clearInterval(interval);
  }, [count, location, navigate]);

  // Render a loading spinner and countdown text
  return (
    <Flex
      flexDir={"column"}
      height={"100vh"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Spinner
        thickness="8px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
      <Text fontWeight={"semibold"} fontSize={"larger"}>
        Loading, in {count}
      </Text>
    </Flex>
  );
};

export default RoutesSpinner;
