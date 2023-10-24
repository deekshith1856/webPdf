"use client";

import React from "react";
import {
  Box,
  CloseButton,
  Flex,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  Button,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Center,
} from "@chakra-ui/react";
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
} from "react-icons/fi";
import { BsFilterSquareFill } from "react-icons/bs";
import SplitByRange from "./SplitByRange";
import ExtractPages from "./ExtractPages";
const LinkItems = [
  { name: "Home", icon: FiHome },
  { name: "Trending", icon: FiTrendingUp },
  { name: "Explore", icon: FiCompass },
  { name: "Favourites", icon: FiStar },
  { name: "Settings", icon: FiSettings },
];

export default function SimpleSidebar({
  handleSubmit,
  pages,
  setPages,
  numPages,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  return (
    <Box minH="100vh">
      <Button
        ref={btnRef}
        onClick={onOpen}
        zIndex={100}
        mx={5}
        my={5}
        display={{ md: "none", base: "inline-block" }}
      >
        <BsFilterSquareFill />
      </Button>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
        setPages={setPages}
        pages={pages}
        numPages={numPages}
        handleSubmit={handleSubmit}
      />
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent
            onClose={onClose}
            setPages={setPages}
            pages={pages}
            numPages={numPages}
            handleSubmit={handleSubmit}
          />
        </DrawerContent>
      </Drawer>

      <Box ml={{ base: 0, md: 60 }} p="4">
        <Center mt={5} width={{ base: "30%" }} position={"fixed"}>
          <Button
            width={{ base: "30%" }}
            colorScheme="red"
            onClick={handleSubmit}
          >
            <Text color="white"> Split PDF </Text>
          </Button>
        </Center>
      </Box>
    </Box>
  );
}

const SidebarContent = ({
  onClose,
  setPages,
  pages,
  numPages,
  handleSubmit,
  ...rest
}) => {
  return (
    <Box
      bg={"white"}
      borderLeft="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 80 }}
      pos="fixed"
      h="full"
      px={5}
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Logo
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      <Box
        display={"flex"}
        justifyContent={{ base: "center", md: "flex-start" }}
      >
        <Tabs
          w={{ base: "100%", md: "" }}
          isFitted
          size="md"
          variant="enclosed"
        >
          <TabList>
            {/* <Tab w={{ base: "50%", md: "" }}>Split by range</Tab> */}
            <Tab w={{ base: "50%", md: "" }}>Extract pages</Tab>
          </TabList>
          <TabPanels>
            {/* <TabPanel>
              <SplitByRange
                pages={pages}
                setPages={setPages}
                numPages={numPages}
              />
            </TabPanel> */}
            <TabPanel>
              <ExtractPages
                pages={pages}
                setPages={setPages}
                handleSubmit={handleSubmit}
              />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
};
