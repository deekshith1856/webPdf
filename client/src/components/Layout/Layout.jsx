import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Box } from "@chakra-ui/react";

const LayoutContainer = ({ children }) => {
  return (
    <div>
      <Header />
      <Box minH={"80vh"}>{children}</Box>
    </div>
  );
};

export default LayoutContainer;
