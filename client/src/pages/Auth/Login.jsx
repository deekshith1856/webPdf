import { Container, Stack, Flex, Box, Heading, Text } from "@chakra-ui/react";
import LayoutContainer from "../../components/Layout/Layout";

import LoginForm from "../../components/auth/LoginForm";
import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { loggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) {
      navigate("/");
    }
  });
  return (
    <LayoutContainer>
      <Container maxW={"100%"} mb={7}>
        <Stack
          align={"center"}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 20, md: 28 }}
          direction={{ base: "column", md: "row" }}
        >
          <Stack flex={1} spacing={{ base: 5, md: 10 }}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: "3xl", sm: "4xl", lg: "6xl" }}
            >
              <Text
                as={"span"}
                position={"relative"}
                _after={{
                  content: "''",
                  width: "full",
                  height: "30%",
                  position: "absolute",
                  bottom: 1,
                  left: 0,
                  bg: "red.400",
                  zIndex: -1,
                }}
              >
                Welcome to Split PDF -
              </Text>
              <br />
              <Text as={"span"} color={"red.400"}>
                Your PDF Management Solution
              </Text>
            </Heading>
            <Box>
              <Text fontSize={"xl"} fontWeight={"semibold"}>
                Login to access your PDF's
              </Text>

              <br />
              <Text color={"gray.700"}>Store PDFs Securely in the Cloud </Text>

              <Text color={"gray.500"}>
                Access your PDFs from anywhere, on any device. Safe and reliable
                cloud storage ensures your PDFs are always at your fingertips.{" "}
              </Text>
            </Box>

            <Box>
              <Text color={"gray.700"}>Effortlessly Split PDFs</Text>

              <Text color={"gray.500"}>
                Access your PDFs from anywhere, on any device. Safe and reliable
                cloud storage ensures your PDFs are always at your fingertip.
              </Text>
            </Box>
          </Stack>
          <Flex
            flex={1}
            justify={"center"}
            align={"center"}
            position={"relative"}
            w={"full"}
          >
            <Box
              position={"relative"}
              rounded={"2xl"}
              boxShadow={"2xl"}
              width={"full"}
              overflow={"hidden"}
            >
              <LoginForm />
            </Box>
          </Flex>
        </Stack>
      </Container>
    </LayoutContainer>
  );
}
