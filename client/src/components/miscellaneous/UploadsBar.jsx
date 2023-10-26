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
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";
import React from "react";

const UploadsBar = ({ sortBy, setSortBy }) => {
  console.log(sortBy);
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

        <Menu closeOnSelect={true}>
          <MenuButton as={Button} colorScheme="blue">
            Sort By
          </MenuButton>
          <MenuList w="260px">
            <RadioGroup
              pl={2}
              value={sortBy}
              onChange={(val) => setSortBy(val)}
            >
              <Stack direction="column">
                <Radio value="1">Latest</Radio>
                <Radio value="-1">Oldest</Radio>
              </Stack>
            </RadioGroup>
          </MenuList>
        </Menu>
      </Box>
    </Center>
  );
};

export default UploadsBar;
