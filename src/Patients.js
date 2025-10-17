import React, { useState, useEffect } from "react";
import { FaUserPlus, FaPhoneAlt, FaUserAlt } from "react-icons/fa";
import { AiOutlineCheckCircle } from "react-icons/ai";

export default function Patients() {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [newPatient, setNewPatient] = useState({ name: "", age: "", contact: "" });
  const [showSuccess, setShowSuccess] = useState(false);

  // Fetch mock API data
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.map((user, index) => ({
          id: user.id,
          name: user.name,
          age: 25 + index,
          contact: user.phone,
          email: user.email,
        }));
        setPatients(formatted);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load data");
        setLoading(false);
      });
  }, []);

  // Add new patient (local update)
  const handleAddPatient = (e) => {
    e.preventDefault();
    if (!newPatient.name || !newPatient.age || !newPatient.contact) return;
    const updated = [
      ...patients,
      {
        id: patients.length + 1,
        ...newPatient,
        email: "N/A",
      },
    ];
    setPatients(updated);
    setNewPatient({ name: "", age: "", contact: "" });
    setShowForm(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000); // hide success popup after 3s
  };

  const filtered = patients.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading)
    return (
      <div className="loader-container">
        <div className="spinner"></div>
        <p>Loading patient records...</p>
      </div>
    );

  if (error) return <p>{error}</p>;

  return (
    <div className="page">
      <h2>Patient Records</h2>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search"
      />

      {/* Patients Grid */}
      <div className="patients-grid">
        {filtered.map((p) => (
          <div key={p.id} className="patient-card">
            <h3>
              <FaUserAlt style={{ color: "#007bff", marginRight: "6px" }} />
              {p.name}
            </h3>
            <p>Age: {p.age}</p>
            <p>
              <FaPhoneAlt style={{ color: "#0099ff", marginRight: "6px" }} />
              {p.contact}
            </p>
            <button onClick={() => setSelectedPatient(p)}>View Details</button>
          </div>
        ))}
      </div>

      {/* View Details Modal */}
      {selectedPatient && (
        <div className="modal">
          <div className="modal-content">
            <h3>{selectedPatient.name}</h3>
            <p>Age: {selectedPatient.age}</p>
            <p>Email: {selectedPatient.email}</p>
            <p>Contact: {selectedPatient.contact}</p>
            <button onClick={() => setSelectedPatient(null)}>Close</button>
          </div>
        </div>
      )}

      {/* Add Patient Form Modal */}
      {showForm && (
        <div className="modal">
          <div className="modal-content">
            <h3>Add New Patient</h3>
            <form onSubmit={handleAddPatient}>
              <input
                type="text"
                placeholder="Full Name"
                value={newPatient.name}
                onChange={(e) =>
                  setNewPatient({ ...newPatient, name: e.target.value })
                }
                required
              />
              <input
                type="number"
                placeholder="Age"
                value={newPatient.age}
                onChange={(e) =>
                  setNewPatient({ ...newPatient, age: e.target.value })
                }
                required
              />
              <input
                type="text"
                placeholder="Contact"
                value={newPatient.contact}
                onChange={(e) =>
                  setNewPatient({ ...newPatient, contact: e.target.value })
                }
                required
              />
              <button type="submit">Add Patient</button>
            </form>
            <button className="close-btn" onClick={() => setShowForm(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Floating Add Button */}
      <button className="floating-btn" onClick={() => setShowForm(true)}>
        <FaUserPlus size={24} />
      </button>

      {/* Success Popup */}
      {showSuccess && (
        <div className="success-popup">
          <AiOutlineCheckCircle size={28} />
          <span>Patient added successfully!</span>
        </div>
      )}
    </div>
  );
}
