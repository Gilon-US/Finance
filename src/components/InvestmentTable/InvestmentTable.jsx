import React from "react";
import "./InvestmentTable.css";

const InvestmentTable = ({ investments, viewMode, onUpload, onAccess }) => {
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
            investments.map((inv) => (
              <tr key={inv.id}>
                <td className="tableCell">
                  <div className="font-semibold">
                    {inv.company || "[Company Name]"}
                  </div>
                  <div className="text-xs text-gray-600">
                    {inv.sector || "[Sector]"}
                  </div>
                </td>
                <td className="tableCell">[{inv.investmentType || "TYPE"}]</td>
                <td className="tableCell">
                  ${inv.amount?.toLocaleString() || "[Amount]"}
                </td>
                <td className="tableCell">{inv.round || "[Round]"}</td>
                <td className="tableCell">{inv.ownership || "[%]"}</td>
                <td className="tableCell">
                  ${inv.valuation?.toLocaleString() || "[Valuation]"}
                </td>
                <td className="tableCell">{inv.date || "[Date]"}</td>
                <td className="tableCell">
                  <button
                    className={`button text-xs`}
                    onClick={() => onAccess?.(inv.id)}
                  >
                    [{inv.documents || 0} DOCS]
                  </button>
                </td>
                <td className="tableCell">
                  <button
                    className={`button text-xs`}
                    onClick={() => onUpload?.(inv.id)}
                  >
                    [UPLOAD]
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="9"
                className={`$'tableCell' text-center text-gray-500`}
              >
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
