import React, { useState } from "react";
import "./InvestmentRow.css";
import { Button, styled, IconButton } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DescriptionIcon from "@mui/icons-material/Description";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import Docs from "../Docs/Docs";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  width: 1,
  overflow: "hidden",
  position: "absolute",
});

export default function InvestmentRow({ investment, onDocumentUpload }) {
  const [open, setOpen] = useState(false);

  return (
    <tr className="investmentRow">
      <td className="tableBodyCell companyCell">
        <div className="companyName">{investment.company}</div>
        <div className="companySector">{investment.sector}</div>
      </td>

      <td className="tableBodyCell">{investment.investmentType}</td>
      <td className="tableBodyCell">${investment.amount.toLocaleString()}</td>
      <td className="tableBodyCell">{investment.round}</td>
      <td className="tableBodyCell">{investment.ownership}</td>
      <td className="tableBodyCell">
        ${investment.valuation.toLocaleString()}
      </td>
      <td className="tableBodyCell">{investment.date}</td>

      <td className="tableBodyCell docsCell">
        <Button
          variant="text"
          startIcon={<DescriptionIcon />}
          className="docButton"
          onClick={() => setOpen(true)}
        >
          {investment.documents} Docs
        </Button>

        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle className="dialogTitle">
            Documents
            <IconButton
              className="closeButton"
              size="small"
              onClick={() => setOpen(false)}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <Docs />
        </Dialog>
      </td>

      <td className="tableBodyCell actionsCell">
        <Button
          component="label"
          variant="outlined"
          startIcon={<CloudUploadIcon />}
          className="uploadButton"
        >
          Upload Files
          <VisuallyHiddenInput
            type="file"
            multiple
            onChange={(e) => onDocumentUpload(e.target.files)}
          />
        </Button>
      </td>
    </tr>
  );
}
