import React from "react";
import "./Sidebar.css";

export default function Sidebar({ setActivePage, activePage }) {
  return (
    <div className="sidebar">
      <h2 className="logo">HEALTH CARE</h2>
      <ul className="sidebar-menu">
        <li
          className={activePage === "dashboard" ? "active" : ""}
          onClick={() => setActivePage("dashboard")}
        >
          Dashboard
        </li>
        <li
          className={activePage === "patients" ? "active" : ""}
          onClick={() => setActivePage("patients")}
        >
          Patients
        </li>
        <li
          className={activePage === "doctors" ? "active" : ""}
          onClick={() => setActivePage("doctors")}
        >
          Doctors
        </li>
        <li
          className={activePage === "appointments" ? "active" : ""}
          onClick={() => setActivePage("appointments")}
        >
          Appointments
        </li>
        <li
          className={activePage === "about" ? "active" : ""}
          onClick={() => setActivePage("about")}
        >
          About
        </li>
      </ul>
    </div>
  );
}
