import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import LayoutContainer from "../components/Layout/Layout";
import { Box, Center, useToast } from "@chakra-ui/react";
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
import UploadsBar from "../components/miscellaneous/UploadsBar";
import UploadsPagination from "../components/miscellaneous/UploadsPagination";
const UploadsPage = () => {
  // Access authentication context
  const { loading, setLoading, currentUser } = useAuth();

  // State for storing uploaded files
  const [uploads, setUploads] = useState([]);
  // filters for docs
  const [sortBy, setSortBy] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  // Toast for displaying error messages
  const toast = useToast();

  // Fetch uploads when the component mounts
  useEffect(() => {
    const fetchUploads = async () => {
      try {
        setLoading(true);

        // Define the data you want to send as query parameters
        const queryParams = {
          currentPage: currentPage,
          dataPerPage: 10,
          sortBy: sortBy,
        };
        // Convert the queryParams object into a query string
        const queryString = Object.keys(queryParams)
          .map((key) => `${key}=${encodeURIComponent(queryParams[key])}`)
          .join("&");

        // Include the user's token in the request headers
        const config = {
          headers: { authorization: `Bearer ${currentUser.token}` },
        };

        // Fetch user's uploads
        const { data } = await axios.get(
          `${
            import.meta.env.VITE_REACT_API_URL
          }/upload/myuploads?${queryString}`,
          config
        );
        setUploads(data.data);
        setTotalPages(data.dataCount);
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
  }, [currentPage, sortBy]);

  // Function to handle file download
  const handleDownload = (data) => {
    const a = document.createElement("a");

    a.href = data.fileUrl;
    a.download = data.fileName;
    document.body.appendChild(a);
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
        <Box mt={20}>
          <UploadsBar sortBy={sortBy} setSortBY={setSortBy} />
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
                  {uploads.length > 0 &&
                    uploads.map((data, index) => (
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
          <UploadsPagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
          />
        </Box>
      )}
    </LayoutContainer>
  );
};

export default UploadsPage;
