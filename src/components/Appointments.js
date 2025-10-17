import React, { useState } from "react";
import "./Appointments.css";

export default function Appointments({ patients, doctors }) {
  const [appointments, setAppointments] = useState([]);
  const [form, setForm] = useState({ patientId: "", doctorId: "", date: "", time: "" });

  // Handle booking appointments
  const handleBook = () => {
    if (!form.patientId || !form.doctorId || !form.date || !form.time) {
      alert("Please fill all fields!");
      return;
    }

    // Check for conflict
    const conflict = appointments.find(
      (a) =>
        a.doctorId === parseInt(form.doctorId) &&
        a.date === form.date &&
        a.time === form.time
    );

    if (conflict) {
      alert(`Doctor ${conflict.doctorName} is not available at this time!`);
      return;
    }

    const patient = patients.find(p => p.id === parseInt(form.patientId));
    const doctor = doctors.find(d => d.id === parseInt(form.doctorId));

    setAppointments([...appointments, {
      id: Date.now(),
      patientName: patient.name,
      doctorName: doctor.name,
      doctorId: doctor.id,
      date: form.date,
      time: form.time,
      status: "Confirmed"
    }]);

    // Reset form
    setForm({ patientId: "", doctorId: "", date: "", time: "" });
  };

  // Calculate unavailable times for selected doctor/date
  const doctorAppointments = appointments.filter(
    a => a.doctorId === parseInt(form.doctorId) && a.date === form.date
  );
  const unavailableTimes = doctorAppointments.map(a => a.time);

  // Example available time slots
  const availableTimes = ["09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00"];

  return (
    <div className="appointments-container">
      <h2>Book Appointment</h2>
      <div className="appointment-form">
        <select value={form.patientId} onChange={e => setForm({ ...form, patientId: e.target.value })}>
          <option value="">Select Patient</option>
          {patients.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>

        <select value={form.doctorId} onChange={e => setForm({ ...form, doctorId: e.target.value })}>
          <option value="">Select Doctor</option>
          {doctors.map(d => <option key={d.id} value={d.id}>{d.name} ({d.specialty})</option>)}
        </select>

        <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />

        <select value={form.time} onChange={e => setForm({ ...form, time: e.target.value })}>
          <option value="">Select Time</option>
          {availableTimes.map(time => (
            <option key={time} value={time} disabled={unavailableTimes.includes(time)}>
              {time} {unavailableTimes.includes(time) ? "(Booked)" : ""}
            </option>
          ))}
        </select>

        <button onClick={handleBook}>Book</button>
      </div>

      <h3>Upcoming Appointments</h3>
      <table className="appointments-table">
        <thead>
          <tr>
            <th>Patient</th>
            <th>Doctor</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map(a => (
            <tr key={a.id}>
              <td>{a.patientName}</td>
              <td>{a.doctorName}</td>
              <td>{a.date}</td>
              <td>{a.time}</td>
              <td>{a.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
