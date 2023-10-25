import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import axios from "axios";
import { Box, Center, Flex, VStack, useToast } from "@chakra-ui/react";
import { CheckCircleIcon, DownloadIcon } from "@chakra-ui/icons";
import SideDrawer from "./SideDraw/SideDrawer";
import LoadingSpinner from "./Spinner/LoadingSpinner";
import SelectPdf from "./miscellaneous/SelectPdf";
import DownloadSplit from "./miscellaneous/DownloadSplit";
import { useAuth } from "../context/AuthContext";

const PdfFile = () => {
  const [selectedFile, setSelectedFile] = useState();
  const [numPages, setNumPages] = useState(0);
  const [pages, setPages] = useState([]);
  const { loading, setLoading } = useAuth();
  const [pdfUrl, setPdfUrl] = useState("");
  const toast = useToast();
  pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

  // Function to handle successful loading of PDF
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  // Function to handle the form submission for PDF splitting
  const handleSubmit = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", selectedFile);
    setSelectedFile();

    // Append an array of values with the same key
    pages.forEach((value) => {
      formData.append("pages", value);
    });
    setPages([]);
    try {
      // Send a POST request to split the PDF
      const { data } = await axios.post(
        `${import.meta.env.VITE_REACT_API_URL}/upload/split`,
        formData
      );

      // Process the split PDF data
      const byteValues = Object.values(data);
      const binaryData = new Uint8Array(byteValues);
      // Create a Blob object with the binary data, specifying the MIME type
      const blob = new Blob([binaryData], { type: "application/pdf" });
      // Create a URL for the Blob to make it accessible for download or rendering
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // Function to handle the download of the split PDF
  const handleDownloadPdf = () => {
    console.log("download pdf");
    const a = document.createElement("a");
    a.href = pdfUrl;
    a.download = "document.pdf";
    document.body.appendChild(a);
    a.click();

    // Clean up
    window.URL.revokeObjectURL(pdfUrl);
    setPdfUrl("");
  };
  // Function to handle the selection of PDF file
  const handleChange = (e) => {
    setSelectedFile(e.target.files[0]);
    toast({
      title: "Select pages.",
      description: "Click on the pages to select ",
      colorScheme: "teal",
      position: "top",
      isClosable: true,
    });
  };

  // Function to handle the selection of specific pages
  const handleSelectPage = (val) => {
    if (findPage(val)) {
      const updateValue = pages.filter((data) => data !== val);
      setPages(updateValue.sort((a, b) => a - b));
    } else {
      setPages([...pages, val].sort((a, b) => a - b));
    }
  };

  // Function to check if a page is already selected
  const findPage = (val) => {
    return pages.includes(val);
  };
  return (
    <div>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          {!pdfUrl ? (
            <Flex direction="row" justify={"space-between"}>
              {!selectedFile ? (
                <SelectPdf handleChange={handleChange} />
              ) : (
                <>
                  <Flex
                    height={"100%"}
                    width={{ base: "100%", md: "75%" }}
                    py={20}
                    px={10}
                  >
                    <Document
                      file={selectedFile}
                      onLoadSuccess={onDocumentLoadSuccess}
                    >
                      <Flex
                        dir="row"
                        wrap={"wrap"}
                        height={"100%"}
                        overflowY={"scroll"}
                        width={"100%"}
                        gap={3}
                      >
                        {numPages > 0 &&
                          Array.from({ length: numPages }, (_, index) => {
                            const pageProps = {
                              pageNumber: index + 1,
                              scale: 0.45,
                              renderAnnotationLayer: false,
                            };
                            return (
                              <Box
                                key={index}
                                border={
                                  findPage(pageProps.pageNumber)
                                    ? "2px solid blue"
                                    : ""
                                }
                              >
                                <VStack
                                  border={"4px solid #FFDFDF"}
                                  onClick={() =>
                                    handleSelectPage(pageProps.pageNumber)
                                  }
                                  px={1}
                                  py={1.5}
                                  mx={1}
                                  my={1.5}
                                >
                                  <style>
                                    {`
                      .react-pdf__Page__textContent {
                        display: none;
                      }
                    `}
                                  </style>
                                  {findPage(pageProps.pageNumber) && (
                                    <CheckCircleIcon
                                      top={2}
                                      left={2}
                                      boxSize={6}
                                      color="teal.500"
                                    />
                                  )}
                                  <Page {...pageProps} />
                                  <Center>{pageProps.pageNumber}</Center>
                                </VStack>
                              </Box>
                            );
                          })}
                      </Flex>
                    </Document>
                  </Flex>
                  <SideDrawer
                    pages={pages}
                    setPages={setPages}
                    handleSubmit={handleSubmit}
                    numPages={numPages}
                  />
                </>
              )}
            </Flex>
          ) : (
            <DownloadSplit handleDownloadPdf={handleDownloadPdf} />
          )}
        </>
      )}
    </div>
  );
};

export default PdfFile;
