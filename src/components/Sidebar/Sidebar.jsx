import React from "react";
import "./Sidebar.css";

const Sidebar = ({
  userQueries = [],
  systemQueries = [],
  selectedQuery,
  onSelect,
  investments,
  filteredInvestments,
  viewMode,
}) => {
  return (
    <div className="sidebarMainDiv">
      {/* User Queries */}
      <div className="querySection">
        <h3 className="querySectionTitle">[MY QUERIES]</h3>
        <div className="queryMeta">({userQueries.length} queries)</div>
        {userQueries.map((query, index) => (
          <div
            key={`user-${index}`}
            className={`queryItem ${
              selectedQuery === query ? "selectedQueryItem" : ""
            }`}
            onClick={() => onSelect(query, "user")}
          >
            {query || `[User Query ${index + 1}]`}
          </div>
        ))}
        <div className="addQueryButton">[+ ADD QUERY]</div>
      </div>

      {/* System Queries */}
      <div className="querySection">
        <h3 className="querySectionTitle">[GILON QUERIES]</h3>
        <div className="queryMeta">({systemQueries.length} queries)</div>
        {systemQueries.map((query, index) => (
          <div
            key={`system-${index}`}
            className={`queryItem ${
              selectedQuery === query ? "selectedQueryItem" : ""
            }`}
            onClick={() => onSelect(query, "system")}
          >
            {query || `[System Query ${index + 1}]`}
          </div>
        ))}
      </div>

      {/* Debug Info */}
      <div className="debugBox">
        <div>Active Query: {selectedQuery || "None"}</div>
        <div>View Mode: {viewMode}</div>
        <div>Total Investments: {investments.length}</div>
        <div>Filtered: {filteredInvestments.length}</div>
      </div>
    </div>
  );
};

export default Sidebar;
