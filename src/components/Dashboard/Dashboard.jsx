// src/components/Dashboard/Dashboard.jsx

import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import InvestmentTable from "../InvestmentTable/InvestmentTable";
import SummaryStats from "../SummaryStats/SummaryStats";
import "../Dashboard/Dashboard.css";

const Dashboard = () => {
  const [currentUser, setCurrentUser] = useState({ name: "John Investor" });
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState("current");
  const [selectedQuery, setSelectedQuery] = useState("");
  const [investments, setInvestments] = useState([]);
  const [filteredInvestments, setFilteredInvestments] = useState([]);
  

  // Load user_id and investments array from the login response stored in localStorage
  useEffect(() => {
    try {
      const session = JSON.parse(localStorage.getItem("sessionData") || "{}");
      if (session.user_id) {
        setCurrentUser({ name: session.user_id });
      }
      if (Array.isArray(session.investments)) {
        setInvestments(session.investments);
      }
    } catch (e) {
      console.error("Failed to load sessionData:", e);
      setError("Could not load investments");
    }
  }, []);

  // Re-filter whenever the investments list or view mode changes
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
      <Header
        user={currentUser}
        viewMode={viewMode}
        onToggle={(mode) => setViewMode(mode)}
      />
      <div className="bottomDiv">
        <Sidebar
          selectedQuery={selectedQuery}
          onSelect={(query) => setSelectedQuery(query)}
          investments={investments}
          filteredInvestments={filteredInvestments}
          viewMode={viewMode}
        />
        <div className="mainContent">
          <InvestmentTable
            investments={filteredInvestments}
            viewMode={viewMode}
          />
          {filteredInvestments.length > 0 && (
            <SummaryStats investments={filteredInvestments} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
