import React, { useState } from "react";
import "./Docs.css";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import { Button } from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import styled from "@emotion/styled";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  width: 1,
  overflow: "hidden",
  position: "absolute",
});

export default function Docs() {
  const [files, setFiles] = useState([
    { name: "Bill of Sale", url: "/bill-of-sale.pdf" }
  ]);

  const handleDocumentUpload = (fileList) => {
    const uploaded = Array.from(fileList).map(f => ({
      name: f.name,
      url: URL.createObjectURL(f),
    }));
    setFiles(prev => [...prev, ...uploaded]);
  };

  const handleFileClick = (url) => window.open(url, "_blank");

  return (
    <div className="docsContainer">
      <div className="docsHeader">
        <DescriptionIcon className="docsHeaderIcon"/>
        <span className="docsTitle">Documents</span>
      </div>
      <List className="docsList">
        {files.map((file, idx) => (
          <ListItem
            button
            key={idx}
            onClick={() => handleFileClick(file.url)}
          >
            <ListItemIcon>
              <DescriptionIcon color="action" />
            </ListItemIcon>
            <ListItemText primary={file.name} />
          </ListItem>
        ))}
      </List>
      <div className="docsFooter">
        <Button
          component="label"
          variant="outlined"
          startIcon={<CloudUploadIcon />}
          className="uploadButton"
        >
          Upload Files
          <VisuallyHiddenInput
            type="file"
            onChange={e => handleDocumentUpload(e.target.files)}
            multiple
          />
        </Button>
      </div>
    </div>
  );
}
