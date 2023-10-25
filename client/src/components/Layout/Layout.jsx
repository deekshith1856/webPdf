import React from "react";
import Header from "./Header";
import { Box } from "@chakra-ui/react";
import { Helmet } from "react-helmet";
const LayoutContainer = ({ children, description, keywords, author }) => {
  return (
    <div>
      <Helmet>
        <meta charSet="UTF-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
      </Helmet>
      <Header />
      <Box minH={"80vh"}>{children}</Box>
    </div>
  );
};
LayoutContainer.defaultProps = {
  description: "MERN app for spliting pdfs and storing pdfs in cloud",
  keywords: "React, pdf-lib, react-pdf, node, firebase",
  author: "Deekshith",
};
export default LayoutContainer;
