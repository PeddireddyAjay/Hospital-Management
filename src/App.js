import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import Patients from "./components/Patients";
import Doctors from "./components/Doctors";
import Appointments from "./components/Appointments";
import "./App.css";

export default function App() {
  const [activePage, setActivePage] = useState("dashboard");

  // Centralized state for patients & doctors
  const [patients, setPatients] = useState([
    { id: 1, name: "Rahul Sharma", age: 32, contact: "9876543210", condition: "Fever" },
    { id: 2, name: "Priya Singh", age: 28, contact: "9123456780", condition: "Asthma" },
    { id: 3, name: "Arjun Patel", age: 45, contact: "9988776655", condition: "Diabetes" },
  ]);

  const [doctors] = useState([
    { id: 1, name: "Dr. Anil Kumar", specialty: "Cardiologist", availability: "9am-1pm" },
    { id: 2, name: "Dr. Priya Verma", specialty: "Dermatologist", availability: "11am-4pm" },
    { id: 3, name: "Dr. Rajesh Singh", specialty: "Orthopedic", availability: "2pm-6pm" },
  ]);

  return (
    <div className="app-container">
      <Sidebar setActivePage={setActivePage} activePage={activePage} />
      <div className="main-section">
        <Header />
        <div className="content">
          {activePage === "dashboard" && <Dashboard />}
          {activePage === "patients" && <Patients patients={patients} setPatients={setPatients} />}
          {activePage === "doctors" && <Doctors />}
          {activePage === "appointments" && <Appointments patients={patients} doctors={doctors} />}
          {activePage === "about" && (
            <div style={{ padding: "20px" }}>
              <h2>About Unity Medical Center</h2>
              <p>
                Unity Medical Center is a modern hospital management dashboard for tracking patients, doctors, and appointments efficiently.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
