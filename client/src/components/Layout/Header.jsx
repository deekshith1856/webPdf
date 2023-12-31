import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Flex,
  Avatar,
  Text,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useColorModeValue,
  Stack,
  Center,
  ButtonGroup,
} from "@chakra-ui/react";
import { useAuth } from "../../context/AuthContext";
import { FaUserCircle, FaPlus } from "react-icons/fa";

export default function Header() {
  // Get user authentication information from the context
  const { loggedIn, currentUser, handleLogout } = useAuth();

  return (
    <>
      <Box
        bg={useColorModeValue("gray.100", "gray.900")}
        px={4}
        zIndex={100}
        top={0}
        right={0}
        left={0}
        position={"fixed"}
      >
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Box mx={{ base: "2", md: "5" }} fontWeight={"bold"}>
            {/* Display the app name and link to the home page */}
            <Link to={"/"}>Split PDF</Link>
          </Box>

          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              {/* Render buttons for non-logged-in users */}
              {!loggedIn ? (
                <ButtonGroup>
                  <Link to={"/auth/login"}>
                    <Button
                      variant={"outline"}
                      border={"1px solid black"}
                      display={{ base: "none", md: "inline-block" }}
                    >
                      Login
                    </Button>
                  </Link>
                  <Link to={"/auth/register"}>
                    <Button colorScheme="blue">
                      <Text display={{ base: "none", md: "inline-block" }}>
                        Register
                      </Text>
                      <FaUserCircle />
                    </Button>
                  </Link>
                </ButtonGroup>
              ) : (
                // Render a menu for logged-in users
                <Menu>
                  <Link to={"/dashboard/uploads"}>
                    <Button
                      colorScheme="red"
                      width={{ base: "15vh" }}
                      leftIcon={<FaPlus />}
                    >
                      Upload
                    </Button>
                  </Link>
                  <MenuButton
                    as={Button}
                    rounded={"full"}
                    variant={"link"}
                    cursor={"pointer"}
                    minW={0}
                  >
                    {/* Display the user's avatar */}
                    <Avatar
                      size={"sm"}
                      src={"https://avatars.dicebear.com/api/male/username.svg"}
                    />
                  </MenuButton>
                  <MenuList alignItems={"center"}>
                    <br />
                    <Center>
                      <Avatar
                        size={"2xl"}
                        src={
                          "https://avatars.dicebear.com/api/male/username.svg"
                        }
                      />
                    </Center>
                    <br />
                    <Center>
                      {/* Display the user's name */}
                      <p>{currentUser.name}</p>
                    </Center>
                    <br />
                    <MenuDivider />
                    <Link to={"/dashboard/myuploads"}>
                      <MenuItem>My files</MenuItem>
                    </Link>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </MenuList>
                </Menu>
              )}
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
