import React from "react";
import "./Header.css";

export default function Header() {
  return (
    <div className="header">
      <div className="logo-section">
        {/* Replace the URL below with your preferred online logo */}
        <img
          src="https://files.catbox.moe/arc0gh.png"
          alt="Unity Medical Center"
          className="logo"
        />
        <h1>Unity Medical Center</h1>
      </div>
      
    </div>
  );
}
