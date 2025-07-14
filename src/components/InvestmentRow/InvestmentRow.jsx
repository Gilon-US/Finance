import React, { useState } from "react";
import "./InvestmentRow.css";
import { Button, styled } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
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

export default function InvestmentRow({ investment }) {
  const [open, setOpen] = useState(false);
  return (
    <tr>
      <td className="tableBodyCell">
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
      <td className="tableBodyCell">
        <button className="docButton" onClick={() => setOpen(true)}>
          {investment.documents} docs
        </button>
        <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogTitle>Documents</DialogTitle>
          <IconButton
            aria-label="close"
            onClick={() => setOpen(false)}
            sx={(theme) => ({
              position: "absolute",
              right: 8,
              top: 8,
              color: theme.palette.grey[500],
            })}
          >
            <CloseIcon />
          </IconButton>
          <Docs />
        </Dialog>
      </td>
      <td className="tableBodyCell">
        <Button
          component="label"
          variant="contained"
          startIcon={<CloudUploadIcon />}
        >
          Upload
          <VisuallyHiddenInput
            type="file"
            multiple
            onChange={(e) =>
              console.log("[Upload] for:", investment.id, e.target.files)
            }
          />
        </Button>
      </td>
    </tr>
  );
}
