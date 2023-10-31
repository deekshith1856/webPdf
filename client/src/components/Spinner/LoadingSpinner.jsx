import { Center, Spinner, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

const LoadingSpinner = () => {
  const [count, setCount] = useState(3);
  useEffect(() => {
    // Start a countdown using setInterval
    const interval = setInterval(() => {
      setCount((prev) => prev - 1);
    }, 1000);
    // Clean up the interval to prevent memory leaks
    return () => clearInterval(interval);
  }, [count]);
  return (
    <Center mt={40}>
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
      {count <= 0 && <Text>Please wait, this is taking longer than usual</Text>}
    </Center>
  );
};

export default LoadingSpinner;
