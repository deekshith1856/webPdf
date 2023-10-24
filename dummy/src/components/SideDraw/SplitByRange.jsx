import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  InputLeftElement,
  InputRightAddon,
  InputRightElement,
  Spacer,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";

const SplitByRange = ({ numpages }) => {
  const [fromValue, setFromValue] = useState(0);
  const [toValue, setToValue] = useState(0);
  console.log(numpages);
  const handleFromChange = (event) => {
    setFromValue(event.target.value);
  };

  const handleToChange = (event) => {
    setToValue(event.target.value);
  };
  return (
    <Box display={"flex"} flexDir={"column"}>
      <Center>
        <Text fontSize={"xl"} fontWeight={"xl"}>
          Custom Range
        </Text>
      </Center>
      <Flex direction={"column"} align="center" gap={{ md: 3, base: 7 }} mt={3}>
        <InputGroup>
          <InputLeftAddon>
            <Text>From:</Text>
          </InputLeftAddon>
          <InputRightAddon>
            <input type="number" min={1} defaultValue={1} />
          </InputRightAddon>
        </InputGroup>
        <Spacer />
        <InputGroup>
          <InputLeftAddon>
            <Text>To:</Text>
          </InputLeftAddon>
          <InputRightAddon>
            <input type="number" max={numpages} defaultValue={numpages} />
          </InputRightAddon>
        </InputGroup>
      </Flex>
      <Center mt={5} width={{ md: "100%" }}>
        <Button width={{ md: "100%" }} colorScheme="red">
          <Text color="white"> Split PDF </Text>
        </Button>
      </Center>
    </Box>
  );
};

export default SplitByRange;
