import React, { useState } from "react";
import { Button, TextField, Box, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const AddCompany = () => {
  const [companyURL, setCompanyURL]     = useState("");
  const [linkedinURL, setLinkedinURL]   = useState("");
  const [docs, setDocs]                 = useState([]);

  const handleFileChange = (e) => {
    setDocs(Array.from(e.target.files));
  };

  const isApplyDisabled = !linkedinURL.trim();

  const handleApply = () => {
    console.log("Company URL:",   companyURL);
    console.log("LinkedIn URL:",  linkedinURL);
    console.log("Uploaded docs:", docs);
  };

  return (
    <Box display="flex" flexDirection="column" gap={2} p={2}>
      <TextField
        label="Company URL"
        value={companyURL}
        onChange={e => setCompanyURL(e.target.value)}
        fullWidth
      />

      <TextField
        label="LinkedIn URL"
        value={linkedinURL}
        onChange={e => setLinkedinURL(e.target.value)}
        fullWidth
      />

      <Button
        variant="outlined"
        component="label"
        startIcon={<CloudUploadIcon />}
      >
        Upload Docs
        <input
          type="file"
          hidden
          multiple
          onChange={handleFileChange}
        />
      </Button>

      {docs.length > 0 &&
        docs.map((file, i) => (
          <Typography key={i} variant="body2">
            {file.name}
          </Typography>
        ))}

      <Button
        variant="contained"
        disabled={isApplyDisabled}
        onClick={handleApply}
      >
        Apply
      </Button>
    </Box>
  );
};

export default AddCompany;
