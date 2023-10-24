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
  const { loading, setLoading, currentUser } = useAuth();
  const [uploads, setUploads] = useState([]);
  const toast = useToast();
  useEffect(() => {
    const fetchUploads = async () => {
      try {
        setLoading(true);
        const config = {
          headers: { authorization: `Bearer ${currentUser.token}` },
        };
        const { data } = await axios.get(
          `${import.meta.env.VITE_REACT_API_URL}/upload/myuploads`,
          config
        );
        setUploads(data);
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
    fetchUploads();
  }, []);
  const handleDownload = (data) => {
    const a = document.createElement("a");
    a.style.display = "none";
    document.body.appendChild(a);
    a.href = data.fileUrl;
    a.download = data.fileName;
    a.click();
    document.body.removeChild("a");
  };
  const handleOpenPdf = (data) => {
    window.open(data.fileUrl, "_blank");
  };
  return (
    <LayoutContainer>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <Center>
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
