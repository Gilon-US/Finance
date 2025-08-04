// src/components/Dashboard/Dashboard.jsx
import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import InvestmentTable from "../InvestmentTable/InvestmentTable";
import SummaryStats from "../SummaryStats/SummaryStats";
import "../Dashboard/Dashboard.css";

export default function Dashboard() {
  const [currentUser, setCurrentUser] = useState({ name: "John Investor" });
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState("current");
  const [selectedQuery, setSelectedQuery] = useState("");
  const [investments, setInvestments] = useState([]);
  const [filteredInvestments, setFilteredInvestments] = useState([]);

  // Normalize API investments for UI
  const transformInvestment = (inv) => ({
    id:             inv.investment_id,
    company:        inv.company_name || inv.company || "N/A",
    investmentType: inv.type || inv.investment_type || "",
    amount:         Number(inv.amount || 0),
    round:          inv.round || "Unknown",
    ownership:      inv.ownership || "0%",
    valuation:      Number(inv.valuation || 0),
    date:           inv.date ? inv.date.split("T")[0] : "",
    status:         inv.status || "",
    documents:      Array.isArray(inv.documents) ? inv.documents.length : 0,
    linkedinUrl:    inv.linkedin_url || "",
    websiteUrl:     inv.website_url || "",
    sector:         inv.sector || "",
    companyDetails: null
  });

 // Load user_id and investments array from the login response stored in localStorage
useEffect(() => {
  try {
    const session = JSON.parse(localStorage.getItem("sessionData") || "{}");

    // ✅ Debug logs
    console.log("Raw session data:", session);
    if (Array.isArray(session.investments)) {
      console.log("First investment (raw):", session.investments[0]);
    }

    if (session.user_id) {
      setCurrentUser({ name: session.user_id });
    }

    if (Array.isArray(session.investments)) {
      const normalized = session.investments.map(transformInvestment);

      // ✅ Debug logs after transformation
      console.log("Normalized investments:", normalized);

      setInvestments(normalized);
    }
  } catch (e) {
    console.error("Failed to load sessionData:", e);
    setError("Could not load investments");
  }
}, []);

  useEffect(() => {
    setFilteredInvestments(
      investments.filter((inv) => inv.status === viewMode)
    );
  }, [investments, viewMode]);

  if (error) {
    return (
      <div className="dashboardMainDiv">
        <div>ERROR: {error}</div>
      </div>
    );
  }

  return (
    <div className="dashboardMainDiv">
      <Header user={currentUser} viewMode={viewMode} onToggle={setViewMode} />
      <div className="bottomDiv">
        <Sidebar
          selectedQuery={selectedQuery}
          onSelect={setSelectedQuery}
          investments={investments}
          filteredInvestments={filteredInvestments}
          viewMode={viewMode}
        />
        <div className="mainContent">
          <InvestmentTable investments={filteredInvestments} viewMode={viewMode} />
          {filteredInvestments.length > 0 && (
            <SummaryStats investments={filteredInvestments} />
          )}
        </div>
      </div>
    </div>
  );
}
