import React, { useState } from "react";
import LayoutContainer from "../components/Layout/Layout";
import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  FormControl,
  Heading,
  Input,
  Spacer,
  Text,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  useToast,
} from "@chakra-ui/react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { CloseIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

const MyUploads = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const { currentUser, loading, setLoading } = useAuth();

  const handleChange = (e) => {
    const filesArray = Array.from(e.target.files);
    console.log(filesArray);
    setSelectedFiles(filesArray);
  };
  const navigate = useNavigate();
  const toast = useToast();
  const handleSubmit = async () => {
    const formData = new FormData();
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append("pdfFiles", selectedFiles[i]);
    }
    try {
      setLoading(true);
      navigate("/dashboard/myuploads");
      const config = {
        headers: {
          authorization: `Bearer ${currentUser.token}`,
        },
      };
      const { data } = await axios.post(
        `${import.meta.env.VITE_REACT_API_URL}/upload/cloud`,
        formData,
        config
      );
      console.log(data);
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: error.message,
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };
  const handleRemove = (indexToRemove) => {
    const updatedFiles = selectedFiles.filter(
      (_, index) => index != indexToRemove
    );
    setSelectedFiles(updatedFiles);
  };

  return (
    <LayoutContainer>
      <Flex direction="row" justify={"space-between"} mt={20}>
        {selectedFiles.length == 0 ? (
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
        ) : (
          <>
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
                <Center>
                  <Button
                    colorScheme="teal"
                    onClick={handleSubmit}
                    width={40}
                    size={"lg"}
                    px={3}
                    py={3}
                  >
                    Upload
                  </Button>
                </Center>
                <TableContainer mt={5}>
                  <Table size="sm">
                    <Thead>
                      <Tr>
                        <Th isNumeric>S.NO</Th>
                        <Th>Name</Th>
                        <Th></Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {selectedFiles.map((file, index) => (
                        <Tr key={index}>
                          <Td>{index + 1}</Td>
                          <Td>{file.name}</Td>
                          <Td onClick={() => handleRemove(index)}>
                            <CloseIcon />
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </TableContainer>
              </Box>
            </Container>
          </>
        )}
      </Flex>
    </LayoutContainer>
  );
};

export default MyUploads;
