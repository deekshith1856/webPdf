import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import axios from "axios";
import {
  Button,
  Input,
  Box,
  Center,
  Flex,
  VStack,
  Container,
  Text,
  FormControl,
  Heading,
  Spacer,
} from "@chakra-ui/react";
import { CheckCircleIcon, DownloadIcon } from "@chakra-ui/icons";
import SideDrawer from "./SideDraw/SideDrawer";
import LoadingSpinner from "./Spinner/LoadingSpinner";
import SelectPdf from "./miscellaneous/SelectPdf";
import DownloadSplit from "./miscellaneous/DownloadSplit";

const PdfFile = () => {
  const [selectedFile, setSelectedFile] = useState();
  const [numPages, setNumPages] = useState(0);
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pdfUrl, setPdfUrl] = useState("");

  pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const handleSubmit = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", selectedFile);
    setSelectedFile();
    // Append an array of values with the same key
    console.log("pages", pages);
    pages.forEach((value) => {
      formData.append("pages", value);
    });
    setPages([]);
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/upload/split",
        formData
      );
      console.log("data", data);
      const byteValues = Object.values(data);
      const binaryData = new Uint8Array(byteValues);
      const blob = new Blob([binaryData], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
      // Create an anchor element to trigger the download
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
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
  const handleChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };
  const handleSelectPage = (val) => {
    if (findPage(val)) {
      const updateValue = pages.filter((data) => data !== val);
      setPages(updateValue.sort((a, b) => a - b));
    } else {
      setPages([...pages, val].sort((a, b) => a - b));
    }
  };
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
