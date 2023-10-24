import { Box, Button, Heading } from "@chakra-ui/react";
import React from "react";
import { DownloadIcon } from "@chakra-ui/icons";
const DownloadSplit = ({ handleDownloadPdf }) => {
  return (
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
        leftIcon={<DownloadIcon boxSize={6} />}
        colorScheme="teal"
        width={"30%"}
        px={3}
        mt={5}
        onClick={handleDownloadPdf}
      >
        Download split PDF
      </Button>
    </Box>
  );
};

export default DownloadSplit;
