import React, { useState } from "react";
import "./Doctors.css";

export default function Doctors() {
  const [search, setSearch] = useState("");
  const [doctors] = useState([
    { id: 1, name: "Dr. Anil Kumar", specialty: "Cardiologist", availability: "9am-1pm" },
    { id: 2, name: "Dr. Priya Verma", specialty: "Dermatologist", availability: "11am-4pm" },
    { id: 3, name: "Dr. Rajesh Singh", specialty: "Orthopedic", availability: "2pm-6pm" },
  ]);

  const filteredDoctors = doctors.filter(
    (d) =>
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.specialty.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="doctors-container">
      <div className="doctors-header">
        <h2>Doctors</h2>
        <input
          type="text"
          placeholder="Search by name or specialty..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <table className="doctors-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Specialty</th>
            <th>Availability</th>
          </tr>
        </thead>
        <tbody>
          {filteredDoctors.map((d) => (
            <tr key={d.id}>
              <td>{d.name}</td>
              <td>{d.specialty}</td>
              <td>{d.availability}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
