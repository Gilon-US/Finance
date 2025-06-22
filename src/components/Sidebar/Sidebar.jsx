import React from "react";
import "./sidebar.css";

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
        <h3 className="font-bold ">[MY QUERIES]</h3>
        <div className="text-xs text-gray-500">
          ({userQueries.length} queries)
        </div>
        {userQueries.map((query, index) => (
          <div
            key={`user-${index}`}
            className={`queryItem ${
              selectedQuery === query ? "bg-gray-200" : ""
            }`}
            onClick={() => onSelect(query, "user")}
          >
            {query || `[User Query ${index + 1}]`}
          </div>
        ))}
        <div className={`button text-xs`}>[+ ADD QUERY]</div>
      </div>

      {/* System Queries */}
      <div className="querySection">
        <h3 className="font-bold">[GILON QUERIES]</h3>
        <div className="text-xs text-gray-500">
          ({systemQueries.length} queries)
        </div>
        {systemQueries.map((query, index) => (
          <div
            key={`system-${index}`}
            className={`queryItem ${
              selectedQuery === query ? "bg-gray-200" : ""
            }`}
            onClick={() => onSelect(query, "system")}
          >
            {query || `[System Query ${index + 1}]`}
          </div>
        ))}
      </div>

      {/* Debug Info */}
      <div className="text-xs text-gray-500 border border-gray-200">
        <div>Active Query: {selectedQuery || "None"}</div>
        <div>View Mode: {viewMode}</div>
        <div>Total Investments: {investments.length}</div>
        <div>Filtered: {filteredInvestments.length}</div>
      </div>
    </div>
  );
};

export default Sidebar;
