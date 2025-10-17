import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function Dashboard() {
  const [stats, setStats] = useState({
    patients: 1200,
    admitted: 60,
    doctors: 54,
    appointments: 100,
  });

  const [data, setData] = useState([
    { name: "Jan", patients: 30, admitted: 15 },
    { name: "Feb", patients: 45, admitted: 20 },
    { name: "Mar", patients: 60, admitted: 25 },
    { name: "Apr", patients: 50, admitted: 30 },
    { name: "May", patients: 80, admitted: 45 },
  ]);

  // Function to randomize data
  const updateData = () => {
    setStats((prev) => ({
      ...prev,
      patients: prev.patients + Math.floor(Math.random() * 10 - 5),
      admitted: prev.admitted + Math.floor(Math.random() * 5 - 2),
      doctors: prev.doctors + Math.floor(Math.random() * 2 - 1),
      appointments: prev.appointments + Math.floor(Math.random() * 10 - 5),
    }));

    setData((prevData) =>
      prevData.map((item) => ({
        ...item,
        patients: Math.max(10, item.patients + Math.floor(Math.random() * 10 - 5)),
        admitted: Math.max(5, item.admitted + Math.floor(Math.random() * 5 - 2)),
      }))
    );
  };

  // Run updates every 4 seconds
  useEffect(() => {
    const interval = setInterval(updateData, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="dashboard">
      <h2>📊 Live Hospital Overview</h2>

      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>👨‍⚕️ Total Patients</h3>
          <p className="animated-number">{stats.patients}</p>
        </div>
        <div className="stat-card">
          <h3>🏥 Active Admissions</h3>
          <p className="animated-number">{stats.admitted}</p>
        </div>
        <div className="stat-card">
          <h3>💊 Doctors</h3>
          <p className="animated-number">{stats.doctors}</p>
        </div>
        <div className="stat-card">
          <h3>📅 Appointments Today</h3>
          <p className="animated-number">{stats.appointments}</p>
        </div>
      </div>

      <div className="charts-section">
        <div className="chart-card">
          <h3>Patient Visits (Monthly)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <CartesianGrid strokeDasharray="3 3" />
              <Bar dataKey="patients" fill="#0056b3" />
              <Bar dataKey="admitted" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>Admissions Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <CartesianGrid strokeDasharray="3 3" />
              <Line
                type="monotone"
                dataKey="admitted"
                stroke="#0056b3"
                strokeWidth={3}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
