import { Box, Button, Center, Input, Radio, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { formatPageNumbers } from "../../utils/helper";

const ExtractPages = ({ pages, handleSubmit }) => {
  const [formatedPageNumbers, setFormatedPageNumbers] = useState();
  useEffect(() => {
    const data = formatPageNumbers(pages);
    setFormatedPageNumbers(data);
  }, [pages]);
  return (
    <Box display={"flex"} flexDir={"column"} gap={5}>
      <Center>
        {" "}
        <Text fontSize={"xl"} fontWeight={"xl"}>
          Select pages
        </Text>
      </Center>
      <Box display={"flex"} flexDir={"column"} gap={2}>
        <Text>Pages to extract</Text>

        <Input
          border={"1px solid black"}
          value={formatedPageNumbers}
          isReadOnly
        />
      </Box>
      <Center mt={5} width={{ md: "100%" }}>
        <Button width={{ md: "100%" }} colorScheme="red" onClick={handleSubmit}>
          <Text color="white"> Split PDF </Text>
        </Button>
      </Center>
    </Box>
  );
};

export default ExtractPages;
