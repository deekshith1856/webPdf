import React from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
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

export default function RegisterForm() {
  // State for controlling password visibility and form data
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [validationError, setValidationError] = useState({});
  // Get the handleRegister function from the authentication context
  const { handleRegister } = useAuth();

  // Create a toast for displaying notifications
  const toast = useToast();

  // Handle form submission
  const handleSubmit = () => {
    // Validate form fields
    function validateEmail(email) {
      // Regular expression pattern for a basic email address validation
      var pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

      // Use the RegExp test() method to check if the email matches the pattern
      return pattern.test(email);
    }
    if (!name || !email || !password) {
      setValidationError({
        name: name.length > 0 ? null : { message: "Required name" },
        email: email.length > 0 ? null : { message: "Required email" },
        password: password.length > 0 ? null : { message: "Required password" },
      });
      return toast({
        title: "error",
        status: "warning",
        description: "Required to fill all fields",
        isClosable: true,
        duration: 4000,
      });
    } else if (password.length < 8 || !validateEmail(email)) {
      const emailError = !validateEmail(email)
        ? null
        : { message: "Enter a valid email" };

      const passwordError =
        password.length < 8 ? { message: "min password lenght 8" } : null;
      setValidationError({
        name: null,
        email: emailError,
        password: passwordError,
      });
    } else {
      setLoading(true);
      // Call the handleRegister function from the authentication context
      handleRegister({ name, email, password });
      setLoading(false);
    }
  };

  return (
    <Stack maxW={"6xl"}>
      <Stack align={"center"}>
        <Heading fontSize={"4xl"} textAlign={"center"}>
          Sign up
        </Heading>
      </Stack>
      <Box
        rounded={"lg"}
        bg={useColorModeValue("white", "gray.700")}
        boxShadow={"lg"}
        p={7}
      >
        <Stack spacing={4}>
          <HStack>
            <Box w={"100%"}>
              <FormControl
                id="name"
                isRequired
                isInvalid={validationError?.name ? true : false}
              >
                <FormLabel> Name</FormLabel>
                <Input
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
                {validationError.name && (
                  <FormErrorMessage>
                    {validationError.name.message}
                  </FormErrorMessage>
                )}
              </FormControl>
            </Box>
          </HStack>
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
            />{" "}
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
            </InputGroup>{" "}
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
              onClick={handleSubmit}
              isLoading={loading}
            >
              Sign up
            </Button>
          </Stack>
          <Stack pt={3}>
            <Text align={"center"}>
              Already a user?{" "}
              <Link to={"/auth/login"}>
                <Text color={"blue.400"}> Login</Text>
              </Link>
            </Text>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
}
