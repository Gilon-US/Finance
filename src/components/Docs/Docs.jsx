import React, { useState, useCallback } from "react";
import axios from "axios";
import "./Docs.css";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import { Button, LinearProgress, Typography, Box } from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

export default function Docs({ userId, investmentId }) {
  const [files, setFiles] = useState([
    { name: "Bill of Sale", url: "/bill-of-sale.pdf" },
  ]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("idle"); // 'idle' | 'uploading' | 'success' | 'error'
  const [progress, setProgress] = useState(0);

  // File picker handler
  const handleFileChange = useCallback((e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedFile(file);
    setUploadStatus("idle");
    setProgress(0);
  }, []);

  // Upload button handler
  const handleFileUpload = useCallback(async () => {
    if (!selectedFile) return;
    setUploadStatus("uploading");

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("user_id", userId);
    formData.append("investment_id", investmentId);

    try {
      const res = await axios.post(
        import.meta.env.VITE_API_UPLOAD_DOCUMENT_URL,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: (evt) => {
            if (evt.total) {
              setProgress(Math.round((evt.loaded * 100) / evt.total));
            }
          },
        }
      );

      if (res.data.success) {
        // Use the returned download_url so frontend can open it directly
        setFiles((prev) => [
          ...prev,
          { name: selectedFile.name, url: res.data.download_url },
        ]);
        setUploadStatus("success");
      } else {
        setUploadStatus("error");
      }
    } catch (err) {
      console.error("Upload error:", err);
      setUploadStatus("error");
    }
  }, [selectedFile, userId, investmentId]);

  return (
    <div className="docsContainer">
      <div className="docsHeader">
        <DescriptionIcon className="docsHeaderIcon" />
        <span className="docsTitle">Documents</span>
      </div>

      {/* Existing files list */}
      <List className="docsList">
        {files.map((file, idx) => (
          <ListItem
            button
            key={idx}
            onClick={() => window.open(file.url, "_blank")}
          >
            <ListItemIcon>
              <DescriptionIcon color="action" />
            </ListItemIcon>
            <ListItemText primary={file.name} />
          </ListItem>
        ))}
      </List>

      {/* File picker & info */}
      <Box mt={2}>
        <input type="file" onChange={handleFileChange} />
        {selectedFile && (
          <Box mt={1} mb={1}>
            <Typography variant="body2">Name: {selectedFile.name}</Typography>
            <Typography variant="body2">
              Size: {(selectedFile.size / 1024).toFixed(2)} KB
            </Typography>
            <Typography variant="body2">Type: {selectedFile.type}</Typography>
          </Box>
        )}
      </Box>

      {/* Upload controls & progress */}
      {selectedFile && uploadStatus !== "uploading" && (
        <Button
          variant="outlined"
          startIcon={<CloudUploadIcon />}
          onClick={handleFileUpload}
        >
          Upload
        </Button>
      )}
      {uploadStatus === "uploading" && (
        <Box mt={1}>
          <LinearProgress variant="determinate" value={progress} />
          <Typography variant="caption">{progress}%</Typography>
        </Box>
      )}
      {uploadStatus === "success" && (
        <Typography variant="body2" color="success.main">
          Upload successful!
        </Typography>
      )}
      {uploadStatus === "error" && (
        <Typography variant="body2" color="error.main">
          Upload failed. Please try again.
        </Typography>
      )}
    </div>
  );
}
