import React from "react";
import {
  Button,
  Input,
  Box,
  Center,
  Container,
  Text,
  FormControl,
  Heading,
  Spacer,
} from "@chakra-ui/react";
const SelectPdf = ({ handleChange }) => {
  return (
    <div
      style={{
        background: "rgb(198,207,251)",
        background:
          "  radial-gradient(circle, rgba(198,207,251,1) 0%, rgba(252,70,107,1) 100%)",
        width: "100vw",
        height: "100vh",
      }}
    >
      <Container mt={20}>
        <Box
          display="flex"
          width={"100%"}
          flexDir={"column"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Heading mt={5} mb={3}>
            {" "}
            Split pdf
          </Heading>{" "}
          <Spacer />
          <Text textAlign={"center"} mb={5}>
            Separate one page or a whole set for easy conversion into
            independent PDF files.
          </Text>
          <Spacer />
          <Center>
            <FormControl id="fileInput">
              <Input
                type="file"
                accept=".pdf"
                onChange={handleChange}
                display="none" // Hide the default input field
              />
              <Button
                as="label"
                htmlFor="fileInput"
                colorScheme="teal"
                width={40}
                size={"lg"}
                px={3}
                py={3}
              >
                Select PDF file
              </Button>
            </FormControl>
          </Center>
        </Box>
      </Container>
    </div>
  );
};

export default SelectPdf;
