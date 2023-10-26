import React from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useToast,
  FormErrorMessage,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useAuth } from "../../context/AuthContext";

const LoginForm = () => {
  // State for controlling password visibility and form data
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [validationError, setValidationError] = useState({});
  // Get the handleLogin function from the authentication context
  const { handleLogin } = useAuth();

  // Create a toast for displaying notifications
  const toast = useToast();

  // Handle form submission
  const handleSubmit = () => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Validate form fields
    if (!email || !password) {
      setValidationError({
        email: { message: "Required email" },
        password: { message: "Required password" },
      });

      return toast({
        title: "Warning",
        status: "warning",
        isClosable: true,
        description: "All fields required",
        duration: 3000,
      });
    } else {
      setLoading(true);
      // Call the handleLogin function from the authentication context
      handleLogin({ email, password });
      setLoading(false);
    }
  };

  return (
    <Stack maxW={"6xl"}>
      <Stack align={"center"}>
        <Heading fontSize={"4xl"} textAlign={"center"}>
          Login to your account
        </Heading>
      </Stack>
      <Box
        rounded={"lg"}
        bg={useColorModeValue("white", "gray.700")}
        boxShadow={"lg"}
        p={7}
      >
        <Stack spacing={4}>
          <FormControl
            id="email"
            isRequired
            isInvalid={validationError?.email ? true : false}
          >
            <FormLabel>Email address</FormLabel>
            <Input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />

            {validationError.email && (
              <FormErrorMessage>
                {validationError.email.message}
              </FormErrorMessage>
            )}
          </FormControl>
          <FormControl
            id="password"
            isRequired
            isInvalid={validationError?.password ? true : false}
          >
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input
                type={showPassword ? "text" : "password"}
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <InputRightElement h={"full"}>
                <Button
                  variant={"ghost"}
                  onClick={() =>
                    setShowPassword((showPassword) => !showPassword)
                  }
                >
                  {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
            {validationError.password && (
              <FormErrorMessage>
                {validationError.password.message}
              </FormErrorMessage>
            )}
          </FormControl>
          <Stack spacing={10} pt={2}>
            <Button
              loadingText="Submitting"
              size="lg"
              bg={"blue.400"}
              color={"white"}
              _hover={{
                bg: "blue.500",
              }}
              isLoading={loading}
              onClick={handleSubmit}
            >
              Login
            </Button>
          </Stack>
          <Stack pt={3}>
            <Text align={"center"}>
              New user?{" "}
              <Link to={"/auth/register"}>
                <Text color={"blue.400"}> Register</Text>
              </Link>
            </Text>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
};

export default LoginForm;
