import { Box, Button, Heading, Tooltip } from "@chakra-ui/react";
import React from "react";
import { ArrowBackIcon, DownloadIcon } from "@chakra-ui/icons";
const DownloadSplit = ({ handleDownloadPdf, handleArrowBack }) => {
  return (
    <>
      <Tooltip hasArrow label="Go to split pdf">
        <Button
          position={"fixed"}
          colorScheme="red"
          ml={5}
          onClick={handleArrowBack}
        >
          <ArrowBackIcon />
        </Button>
      </Tooltip>
      <Box
        display="flex"
        width={"100%"}
        flexDir={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        mt={20}
      >
        <Heading mt={5} mb={3}>
          {" "}
          Your PDF is ready
        </Heading>{" "}
        <Button
          colorScheme="teal"
          display={{ base: "none", md: "block" }}
          width={"30%"}
          alignContent={"center"}
          px={3}
          mt={5}
          onClick={handleDownloadPdf}
        >
          <DownloadIcon boxSize={6} /> Download split PDF
        </Button>{" "}
        <Button
          display={{ md: "none", base: "block" }}
          onClick={handleDownloadPdf}
          colorScheme="teal"
        >
          Download PDF
        </Button>
      </Box>
    </>
  );
};

export default DownloadSplit;
