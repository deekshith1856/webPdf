import { Center, Flex, Spinner, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const RoutesSpinner = () => {
  const [count, setCount] = useState(4);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => prev - 1);
    }, 1000);
    count == 0 && navigate(`/auth/login`);

    return () => clearInterval(interval);
  }, [count, location, navigate]);
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
