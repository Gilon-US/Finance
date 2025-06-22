import React from "react";
import "./Header.css";

const Header = ({ user, viewMode, onToggle }) => {
  return (
    <div className="headerMainDiv">
      <div>
        <div>
          <h1 className="text-xl font-bold">[INVESTMENT PORTFOLIO HEADER]</h1>
          <p className="text-sm text-gray-600">
            User: {user?.name || "Unknown"}
          </p>
        </div>
        <div>
          <button
            className={viewMode === "current" ? "activeToggle" : "toggle"}
            onClick={() => onToggle("current")}
          >
            [CURRENT]
          </button>
          <button
            className={viewMode === "potential" ? "activeToggle" : "toggle"}
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
