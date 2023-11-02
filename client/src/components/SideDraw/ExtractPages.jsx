import { Box, Button, Center, Input, Radio, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { formatPageNumbers } from "../../utils/helper";

const ExtractPages = ({ pages, handleSubmit, setPages }) => {
  const [formatedPageNumbers, setFormatedPageNumbers] = useState();
  const [modify, setModify] = useState(false);
  // Use useEffect to format the page numbers when 'pages' prop changes

  useEffect(() => {
    const data = formatPageNumbers(pages);
    setFormatedPageNumbers(data);
  }, [pages]);

  const handleChange = (e) => {
    setModify(true);
    setFormatedPageNumbers(e.target.value);
  };
  const handleSelect = () => {
    const pageNumbersArray = formatedPageNumbers.split(",");
    console.log(pageNumbersArray);
    const parsedPageNumbersSet = new Set();

    pageNumbersArray.forEach((pageNumberInput) => {
      const cleanedPagenumber = pageNumberInput.trim();

      if (cleanedPagenumber.includes("-")) {
        const [start, end] = cleanedPagenumber.split("-").map(Number);

        if (!isNaN(start) && !isNaN(end) && start <= end) {
          for (let i = start; i <= end; i++) {
            parsedPageNumbersSet.add(i);
          }
        }
      } else {
        const pageNumber = Number(cleanedPagenumber);
        if (!isNaN(pageNumber)) {
          parsedPageNumbersSet.add(pageNumber);
        }
      }
      const sortedArray = Array.from(parsedPageNumbersSet).sort(
        (a, b) => a - b
      );

      setPages(sortedArray);
    });
  };
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
          onChange={handleChange}
        />
        {modify && <Button onClick={handleSelect}>Select Pages</Button>}
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
