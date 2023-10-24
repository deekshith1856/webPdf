import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import LayoutContainer from "../components/Layout/Layout";
import { Center, useToast } from "@chakra-ui/react";
import axios from "axios";
import LoadingSpinner from "../components/Spinner/LoadingSpinner";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import { DownloadIcon } from "@chakra-ui/icons";
const UploadsPage = () => {
  // Access authentication context
  const { loading, setLoading, currentUser } = useAuth();

  // State for storing uploaded files
  const [uploads, setUploads] = useState([]);

  // Toast for displaying error messages
  const toast = useToast();

  // Fetch uploads when the component mounts
  useEffect(() => {
    const fetchUploads = async () => {
      try {
        setLoading(true);
        // Include the user's token in the request headers
        const config = {
          headers: { authorization: `Bearer ${currentUser.token}` },
        };

        // Fetch user's uploads
        const { data } = await axios.get(
          `${import.meta.env.VITE_REACT_API_URL}/upload/myuploads`,
          config
        );
        setUploads(data);
      } catch (error) {
        console.log(error);
        // Display an error toast
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
    fetchUploads();
  }, []);

  // Function to handle file download
  const handleDownload = (data) => {
    const a = document.createElement("a");
    a.style.display = "none";
    document.body.appendChild(a);
    a.href = data.fileUrl;
    a.download = data.fileName;
    a.click();
    document.body.removeChild("a");
  };

  // Function to open PDF in a new tab
  const handleOpenPdf = (data) => {
    window.open(data.fileUrl, "_blank");
  };
  return (
    <LayoutContainer>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <Center mt={20}>
            <TableContainer w={{ base: "100%", md: "5xl" }}>
              <Table variant="striped" colorScheme="teal">
                <TableCaption>My files</TableCaption>
                <Thead>
                  <Tr>
                    <Th isNumeric>S.No</Th>
                    <Th>File Name</Th>
                    <Th></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {uploads.map((data, index) => (
                    <Tr key={index}>
                      <Td isNumeric>{index + 1}</Td>
                      <Td
                        _hover={{ cursor: "pointer" }}
                        onClick={() => handleOpenPdf(data)}
                      >
                        {data.fileName}
                      </Td>
                      <Td
                        _hover={{ cursor: "pointer" }}
                        onClick={() => handleDownload(data)}
                      >
                        <DownloadIcon />
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </Center>
        </>
      )}
    </LayoutContainer>
  );
};

export default UploadsPage;
