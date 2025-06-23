import React from "react";
import "./Header.css";

const Header = ({ user, viewMode, onToggle }) => {
  return (
    <div className="headerMainDiv">
      <div className="headerContent">
        <h1 className="headerTitle">[INVESTMENT PORTFOLIO HEADER]</h1>
        <p className="headerUser">User: {user?.name || "Unknown"}</p>
        <div className="toggleContainer">
          <button
            className={viewMode === "current" ? "activeToggleButton" : "toggleButton"}
            onClick={() => onToggle("current")}
          >
            [CURRENT]
          </button>
          <button
            className={viewMode === "potential" ? "activeToggleButton" : "toggleButton"}
            onClick={() => onToggle("potential")}
          >
            [POTENTIAL]
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
