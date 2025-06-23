import React from "react";
import "./InvestmentTable.css";
import { Button, styled } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const InvestmentTable = ({ investments, viewMode, onAccess }) => {

    const handleDocumentUpload = (files, investmentId) => {
    console.log("[Upload Doc] for investment:", investmentId); //TODO - send an HTTP request to the server
    console.log("Files list:", files); //TODO - send an HTTP request to the server
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
      <div>
        <h2 className="text-lg font-bold">
          [{viewMode.toUpperCase()} INVESTMENTS TABLE]
        </h2>
        <div className="text-sm">Showing {investments.length} investments</div>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th className="tableHeader">COMPANY</th>
            <th className="tableHeader">TYPE</th>
            <th className="tableHeader">AMOUNT</th>
            <th className="tableHeader">ROUND</th>
            <th className="tableHeader">OWNERSHIP</th>
            <th className="tableHeader">VALUATION</th>
            <th className="tableHeader">DATE</th>
            <th className="tableHeader">DOCS</th>
            <th className="tableHeader">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {investments.length > 0 ? (
            investments.map((currentInvestment) => (
              <tr key={currentInvestment.id}>
                <td className="tableCell">
                  <div className="font-semibold">
                    {currentInvestment.company || "[Company Name]"}
                  </div>
                  <div className="text-xs text-gray-600">
                    {currentInvestment.sector || "[Sector]"}
                  </div>
                </td>
                <td className="tableCell">
                  [{currentInvestment.investmentType || "TYPE"}]
                </td>
                <td className="tableCell">
                  ${currentInvestment.amount?.toLocaleString() || "[Amount]"}
                </td>
                <td className="tableCell">
                  {currentInvestment.round || "[Round]"}
                </td>
                <td className="tableCell">
                  {currentInvestment.ownership || "[%]"}
                </td>
                <td className="tableCell">
                  $
                  {currentInvestment.valuation?.toLocaleString() ||
                    "[Valuation]"}
                </td>
                <td className="tableCell">
                  {currentInvestment.date || "[Date]"}
                </td>
                <td className="tableCell">
                  <button
                    className={`button text-xs`}
                    onClick={() => onAccess?.(currentInvestment.id)}
                  >
                    [{currentInvestment.documents || 0} DOCS]
                  </button>
                </td>
                <td className="tableCell">
                  <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon />}
                  >
                    Upload files
                    <VisuallyHiddenInput
                      type="file"
                      onChange={(event) => handleDocumentUpload(event.target.files, currentInvestment.id )}
                      multiple
                    />
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" className={`tableCell text-center text-gray-500`}>
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
