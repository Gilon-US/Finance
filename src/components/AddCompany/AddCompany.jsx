import React, { useState } from "react";
//import { Button, Typography, Box } from "@mui/material";
import { Button } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const AddCompany = () => {
  const [companyURL, setCompanyURL] = useState("");
  const [linkedinURL, setLinkedinURL] = useState("");

  const handleFileUpload = () => {
    console.log("uploaded");
  };
  /*const handleFileChange = useCallback((e) => {
      const file = e.target.files?.[0];
      if (!file) return;
      setSelectedFile(file);
      setUploadStatus("idle");
      setProgress(0);
    }, []);*/
  return (
    <div>
      <input type="text" onChange={(e) => setCompanyURL(e.target.value)} />
      <input type="text" onChange={(e) => setLinkedinURL(e.target.value)} />
      <Button
        variant="outlined"
        startIcon={<CloudUploadIcon />}
        onClick={handleFileUpload}
      >
        Upload
      </Button>
      <span> {companyURL} </span>
      <span> {linkedinURL}</span>
   { /*  <Box mt={2}>
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
      </Box>*/}
    </div>
  );
};

export default AddCompany;
