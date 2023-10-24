import {
  Box,
  Button,
  Center,
  Container,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

import { CloseIcon } from "@chakra-ui/icons";
import React from "react";

const UploadsTable = ({ handleSubmit, handleRemove, selectedFiles }) => {
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
  );
};

export default UploadsTable;
