import React, { useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Button } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import styled from "@emotion/styled";

const Docs = () => {
  const [files, setFiles] = useState([
    { name: "Document 1.pdf", url: "https://example.com/doc1.pdf" },
    { name: "Presentation.pptx", url: "https://example.com/presentation.pptx" },
    { name: "Photo.jpg", url: "https://example.com/photo.jpg" },
  ]);

  const handleDocumentUpload = (fileList) => {
    const uploadedFiles = Array.from(fileList).map((file) => ({
      name: file.name,
      url: URL.createObjectURL(file), // Creates a temporary local URL
    }));
    ////////// add the request to nurit funtion to add that file

    setFiles((prevFiles) => [...prevFiles, ...uploadedFiles]);
  };

  const handleFileClick = (url) => {
    window.open(url, "_blank");
  };

  /* const handleDocumentUpload = (files) => {
        console.log("Files list:", files);
      };*/

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  return (
    <div>
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {files.map((file, index) => (
          <ListItem
            button
            key={index}
            onClick={() => handleFileClick(file.url)}
          >
            <ListItemText primary={file.name} />
          </ListItem>
        ))}
      </List>

      <Button
        component="label"
        variant="contained"
        startIcon={<CloudUploadIcon />}
      >
        Upload files
        <VisuallyHiddenInput
          type="file"
          onChange={(e) => handleDocumentUpload(e.target.files)}
          multiple
        />
      </Button>
    </div>
  );
};

export default Docs;