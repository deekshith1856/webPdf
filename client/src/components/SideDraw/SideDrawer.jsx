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
import { BsFilterSquareFill } from "react-icons/bs";
import ExtractPages from "./ExtractPages";

export default function SimpleSidebar({
  handleSubmit,
  pages,
  setPages,
  numPages,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  return (
    <>
      <Box minH="100vh">
        <Button
          ref={btnRef}
          onClick={onOpen}
          zIndex={100}
          pos={"fixed"}
          top={20}
          right={2}
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
      </Box>

      <Center
        mt={5}
        bottom={10}
        right={5}
        width={{ base: "30%" }}
        position={"fixed"}
        display={{ base: "block", md: "none" }}
      >
        <Button
          width={{ base: "100%" }}
          colorScheme="red"
          onClick={handleSubmit}
        >
          <Text color="white"> Split PDF </Text>
        </Button>
      </Center>
    </>
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
      w={{ base: "full", md: "25%" }}
      pos="fixed"
      px={5}
      mt={16}
      right={7}
      h={"full"}
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Split-PDF
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
