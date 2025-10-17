import React, { useState } from "react";
import "./Patients.css";

export default function Patients() {
  const [search, setSearch] = useState("");
  const [patients, setPatients] = useState([
    { id: 1, name: "Rahul Sharma", age: 32, contact: "9876543210", condition: "Fever" },
    { id: 2, name: "Priya Singh", age: 28, contact: "9123456780", condition: "Asthma" },
    { id: 3, name: "Arjun Patel", age: 45, contact: "9988776655", condition: "Diabetes" },
  ]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingPatient, setEditingPatient] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    contact: "",
    condition: "",
  });

  const handleOpenAddModal = () => {
    setFormData({ name: "", age: "", contact: "", condition: "" });
    setEditingPatient(null);
    setShowAddModal(true);
  };

  const handleSavePatient = () => {
    if (!formData.name || !formData.age || !formData.contact || !formData.condition) {
      alert("Please fill all fields!");
      return;
    }

    if (editingPatient) {
      // Update existing
      setPatients(
        patients.map((p) =>
          p.id === editingPatient.id ? { ...p, ...formData } : p
        )
      );
    } else {
      // Add new
      setPatients([...patients, { id: Date.now(), ...formData }]);
    }

    setShowAddModal(false);
    setEditingPatient(null);
  };

  const handleEdit = (patient) => {
    setFormData(patient);
    setEditingPatient(patient);
    setShowAddModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this patient?")) {
      setPatients(patients.filter((p) => p.id !== id));
    }
  };

  const filteredPatients = patients.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="patients-container">
      <div className="patients-header">
        <h2>Patient Records</h2>
        <div className="patients-actions">
          <input
            type="text"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="add-btn" onClick={handleOpenAddModal}>
            + Add Patient
          </button>
        </div>
      </div>

      <table className="patients-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Contact</th>
            <th>Condition</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredPatients.map((p) => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{p.age}</td>
              <td>{p.contact}</td>
              <td>{p.condition}</td>
              <td>
                <button className="view-btn" onClick={() => setSelectedPatient(p)}>View</button>
                <button className="edit-btn" onClick={() => handleEdit(p)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(p.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* View Details Modal */}
      {selectedPatient && (
        <div className={`modal show`} onClick={() => setSelectedPatient(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>{selectedPatient.name}</h3>
            <p><strong>Age:</strong> {selectedPatient.age}</p>
            <p><strong>Contact:</strong> {selectedPatient.contact}</p>
            <p><strong>Condition:</strong> {selectedPatient.condition}</p>
            <button className="cancel-btn" onClick={() => setSelectedPatient(null)}>Close</button>
          </div>
        </div>
      )}

      {/* Add/Edit Modal */}
      {showAddModal && (
        <div className={`modal show`} onClick={() => setShowAddModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>{editingPatient ? "Edit Patient" : "Add New Patient"}</h3>
            <input
              type="text"
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <input
              type="number"
              placeholder="Age"
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: e.target.value })}
            />
            <input
              type="text"
              placeholder="Contact Number"
              value={formData.contact}
              onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
            />
            <input
              type="text"
              placeholder="Condition"
              value={formData.condition}
              onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
            />
            <div className="modal-buttons">
              <button className="update-btn" onClick={handleSavePatient}>
                {editingPatient ? "Update" : "Add"}
              </button>
              <button className="cancel-btn" onClick={() => setShowAddModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
