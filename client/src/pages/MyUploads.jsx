import React, { useState } from "react";
import LayoutContainer from "../components/Layout/Layout";
import { Flex, useToast } from "@chakra-ui/react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UploadsTable from "../components/miscellaneous/UploadsTable";
import UploadPdf from "../components/miscellaneous/UploadPdf";

const MyUploads = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const { currentUser, setLoading } = useAuth();

  const handleChange = (e) => {
    const filesArray = Array.from(e.target.files);
    if (filesArray.length > 5) {
      return toast({
        title: "Max files per upload 5",
        description: "Exceded max file limit per upload ",
        status: "warning",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
    }
    setSelectedFiles(filesArray);
  };
  const navigate = useNavigate();
  const toast = useToast();
  const handleSubmit = async () => {
    const formData = new FormData();
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append("pdfFiles", selectedFiles[i]);
    }
    try {
      setLoading(true);
      navigate("/dashboard/myuploads");
      const config = {
        headers: {
          authorization: `Bearer ${currentUser.token}`,
        },
      };
      const { data } = await axios.post(
        `${import.meta.env.VITE_REACT_API_URL}/upload/cloud`,
        formData,
        config
      );
      //toast to display success message
      toast({
        title: "Files uploaded successfully",
        description: "Files have been uploaded successfully",
        position: "top",
        duration: 4000,
        status: "success",
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: error.message,
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  //Removing file from array of selected files
  const handleRemove = (indexToRemove) => {
    const updatedFiles = selectedFiles.filter(
      (_, index) => index != indexToRemove
    );
    setSelectedFiles(updatedFiles);
  };

  return (
    <LayoutContainer>
      <Flex direction="row" justify={"space-between"} mt={20}>
        {selectedFiles.length == 0 ? (
          <UploadPdf handleChange={handleChange} />
        ) : (
          <>
            <UploadsTable
              handleSubmit={handleSubmit}
              handleRemove={handleRemove}
              selectedFiles={selectedFiles}
            />
          </>
        )}
      </Flex>
    </LayoutContainer>
  );
};

export default MyUploads;
