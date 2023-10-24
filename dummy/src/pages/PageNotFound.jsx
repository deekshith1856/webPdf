import React from "react";
import { Box, Heading, Container, Button, Stack } from "@chakra-ui/react";
import LayoutContainer from "../components/Layout/Layout";
import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <LayoutContainer>
      <Container maxW={"3xl"} mt={20}>
        {" "}
        <Stack
          as={Box}
          textAlign={"center"}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 20, md: 36 }}
        >
          <Heading
            fontWeight={600}
            fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
            lineHeight={"110%"}
          >
            404 Page not found
          </Heading>

          <Stack
            direction={"column"}
            spacing={3}
            align={"center"}
            alignSelf={"center"}
            position={"relative"}
          >
            <Link to="/">
              <Button
                colorScheme={"green"}
                bg={"green.400"}
                rounded={"full"}
                px={6}
                _hover={{
                  bg: "green.500",
                }}
              >
                Go home
              </Button>
            </Link>
          </Stack>
        </Stack>
      </Container>
    </LayoutContainer>
  );
}

export default PageNotFound;
