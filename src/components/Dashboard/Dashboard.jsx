/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import InvestmentTable from "../InvestmentTable/InvestmentTable";
import SummaryStats from "../SummaryStats/SummaryStats";
import "./Dashboard.css";
import { mockInvestments } from "../../data/mockInvestments";

const Dashboard = () => {
  const [currentUser, setCurrentUser] = useState({ name: "John Investor" });
  const [systemQueries, setSystemQueries] = useState([
    "Ready for Exit",
    "Needs Follow-up",
  ]);
  const [userQueries, setUserQueries] = useState([
    "High Value",
    "Tech Only",
    "Recent",
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState("current");
  const [selectedQuery, setSelectedQuery] = useState("");
  const [filteredInvestments, setFilteredInvestments] = useState([]);
  const [investments, setInvestments] = useState(mockInvestments);

  const handleInvestmentToggle = (mode) => {
    console.log("[Toggle]", mode);
    // Optional: filter or fetch investments by mode here
  };

  const handleVaultAccess = (id) => {
    console.log("[Access Vault] for investment:", id);
  };

   const onQuerySelect = (query, type) => {
    console.log("[Access Vault] for investment:", );
  };

  const handleQuerySelect = (query, type) => {
    console.log("[Query Selected]", query, `(type: ${type})`);
  };

  useEffect(() => {
    const filtered = investments.filter((inv) => inv.status === viewMode);
    setFilteredInvestments(filtered);
  }, [investments, viewMode]);

  if (loading) {
    return (
      <div className="dashboardMainDiv">
        <div className="p-8 text-center">LOADING...</div>
      </div>
    );
  }

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
        onToggle={(mode) => {
          setViewMode(mode);
          handleInvestmentToggle?.(mode);
        }}
      />
      <div className="bottomDiv">
        <Sidebar
          userQueries={userQueries}
          systemQueries={systemQueries}
          selectedQuery={selectedQuery}
          onSelect={(query, type) => {
            setSelectedQuery(query);
            onQuerySelect?.(query, type);
          }}
          investments={investments}
          filteredInvestments={filteredInvestments}
          viewMode={viewMode}
        />
        <div className="mainContent">
          <InvestmentTable
            investments={filteredInvestments}
            viewMode={viewMode}
            onAccess={handleVaultAccess}
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
