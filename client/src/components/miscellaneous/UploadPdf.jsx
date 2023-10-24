import React from "react";
import {
  Box,
  Button,
  Center,
  Container,
  FormControl,
  Heading,
  Input,
  Spacer,
  Text,
} from "@chakra-ui/react";
const UploadPdf = ({ handleChange }) => {
  return (
    <Container>
      <Box
        display="flex"
        width={"100%"}
        flexDir={"column"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Heading mt={5} mb={3}>
          {" "}
          Upload PDF's
        </Heading>{" "}
        <Spacer />
        <Text textAlign={"center"} mb={5}>
          Upload your pdfs and access it from anywhere
        </Text>
        <Spacer />
        <Center>
          <FormControl id="fileInput">
            <Input
              type="file"
              accept=".pdf"
              onChange={handleChange}
              display="none" // Hide the default input field
              multiple
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
  );
};

export default UploadPdf;
