import React, { useState } from "react";
import "./InvestmentTable.css";
import InvestmentRow from "../InvestmentRow/InvestmentRow";
//import AddCompany from "../AddCompany/AddCompany";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import AddCompany from "../AddCompany/AddCompany";

const InvestmentTable = ({ investments, viewMode }) => {
  const handleDocumentUpload = (files, investmentId) => {
    console.log("[Upload Doc] for investment:", investmentId, files);
    // TODO: wire this up to your upload API
  };
  const [open, setOpen] = useState();
  return (
    <>
      <div className="tableHeader">
        <h2 className="tableTitle">
          [{viewMode.toUpperCase()} INVESTMENTS TABLE]
        </h2>
        <div className="tableMeta">
          Showing {investments.length} investments
        </div>
      </div>
      <table className="investmentTable">
        <thead>
          <tr>
            <th className="tableHeaderCell">COMPANY</th>
            <th className="tableHeaderCell">TYPE</th>
            <th className="tableHeaderCell">AMOUNT</th>
            <th className="tableHeaderCell">ROUND</th>
            <th className="tableHeaderCell">OWNERSHIP</th>
            <th className="tableHeaderCell">VALUATION</th>
            <th className="tableHeaderCell">DATE</th>
            <th className="tableHeaderCell">DOCS</th>
            <th className="tableHeaderCell">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {investments.length > 0 ? (
            investments.map((inv) => (
              <InvestmentRow
                key={inv.id}
                investment={inv}
                onDocumentUpload={(files) =>
                  handleDocumentUpload(files, inv.id)
                }
              />
            ))
          ) : (
            <tr>
              <td colSpan="9" className="tableBodyCell tableEmpty">
                [NO {viewMode.toUpperCase()} INVESTMENTS FOUND]
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle className="dialogTitle">
          Add Company
          <IconButton
            className="closeButton"
            size="small"
            onClick={() => setOpen(false)}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <AddCompany />
      </Dialog>
      <button onClick={() => setOpen(true)}>Add Company</button>
    </>
  );
};

export default InvestmentTable;
