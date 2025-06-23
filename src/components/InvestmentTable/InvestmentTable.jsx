import React from "react";
import "./InvestmentTable.css";
import { Button, styled } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const InvestmentTable = ({ investments, viewMode, onAccess }) => {
  const handleDocumentUpload = (files, investmentId) => {
    console.log("[Upload Doc] for investment:", investmentId);
    console.log("Files list:", files);
  };

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
    <>
      <div className="tableHeader">
        <h2 className="tableTitle">[{viewMode.toUpperCase()} INVESTMENTS TABLE]</h2>
        <div className="tableMeta">Showing {investments.length} investments</div>
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
              <tr key={inv.id}>
                <td className="tableBodyCell">
                  <div className="companyName">{inv.company || "[Company Name]"}</div>
                  <div className="companySector">{inv.sector || "[Sector]"}</div>
                </td>
                <td className="tableBodyCell">[{inv.investmentType || "TYPE"}]</td>
                <td className="tableBodyCell">${inv.amount?.toLocaleString() || "[Amount]"}</td>
                <td className="tableBodyCell">{inv.round || "[Round]"}</td>
                <td className="tableBodyCell">{inv.ownership || "[%]"}</td>
                <td className="tableBodyCell">${inv.valuation?.toLocaleString() || "[Valuation]"}</td>
                <td className="tableBodyCell">{inv.date || "[Date]"}</td>
                <td className="tableBodyCell">
                  <button className="docButton" onClick={() => onAccess?.(inv.id)}>
                    [{inv.documents || 0} DOCS]
                  </button>
                </td>
                <td className="tableBodyCell">
                  <Button
                    component="label"
                    variant="contained"
                    startIcon={<CloudUploadIcon />}
                  >
                    Upload files
                    <VisuallyHiddenInput
                      type="file"
                      onChange={(e) => handleDocumentUpload(e.target.files, inv.id)}
                      multiple
                    />
                  </Button>
                </td>
              </tr>
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
    </>
  );
};

export default InvestmentTable;
