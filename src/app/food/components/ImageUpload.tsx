'use client'
import React, { useState } from "react";
import styled from "styled-components";
import { useFoodContext } from "./context/FoodContext";

function ImageUpload() {

  const { selectedFile, setSelectedFile, isEditing , editFood} = useFoodContext()

  const handleFileChange = (event: any) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (selectedFile) {
      // You can perform file upload logic here, such as sending the file to a server
      console.log("Selected file:", selectedFile);
      // Clear the selected file after upload
      setSelectedFile(null);
    } else {
      console.log("No file selected.");
    }
  };

  return (
    <UploadContainer>
      <Label htmlFor="fileInput">
        <Img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/f57ec1098a632438e481dcc29baa4d394ff63f27141aff6fe967376c246931d0?"
        />
      </Label>
      <FileInput type="file" id="fileInput" onChange={handleFileChange} />
      {selectedFile ? <p>Selected File: {selectedFile.name}</p> : null}
      {isEditing && !selectedFile ? <img width={150} height={100} src={editFood?.image} />: null}
    </UploadContainer>
  );
}

const Img = styled.img`
  aspect-ratio: 1.1;
  object-fit: auto;
  object-position: center;
  width: 32px;
`;

const UploadContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  justify-content: space-between;
`;

const FileInput = styled.input`
  display: none;
`;

const Label = styled.label`
  color: white;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 4px;
`;

const UploadButton = styled.button`
  margin-top: 10px;
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border: none;
  border-radius: 4px;
`;
export default ImageUpload;
