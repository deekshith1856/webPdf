import {
  Box,
  Button,
  Center,
  Heading,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Text,
} from "@chakra-ui/react";
import React from "react";

const UploadsBar = ({ sortBy, setSortBY }) => {
  return (
    <Center>
      <Box
        display={"flex"}
        flexDir={"row"}
        justifyContent={"space-between"}
        px={10}
        pb={2}
        w={{ base: "100%", md: "5xl" }}
      >
        <Heading> My Files</Heading>
        <Menu closeOnSelect={false}>
          <MenuButton as={Button} colorScheme="blue">
            Sort By
          </MenuButton>
          <MenuList minWidth="240px">
            <MenuOptionGroup
              value={sortBy}
              title="Order"
              type="radio"
              onChange={(value) => setSortBY(value)}
            >
              <MenuItemOption value="1">Latest</MenuItemOption>
              <MenuItemOption value="-1">Oldest</MenuItemOption>
            </MenuOptionGroup>
          </MenuList>
        </Menu>
      </Box>
    </Center>
  );
};

export default UploadsBar;
