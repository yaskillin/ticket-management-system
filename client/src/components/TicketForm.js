import React, { useState, useEffect } from "react";
import "../global.css"; // Importation du fichier CSS global

function TicketForm({ onAddTicket, editingTicket }) {
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Open");

  useEffect(() => {
    if (editingTicket) {
      setDescription(editingTicket.description);
      setStatus(editingTicket.status);
    }
  }, [editingTicket]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTicket = {
      description,
      status,
      date: new Date(),
    };

    onAddTicket(newTicket);
    setDescription("");
    setStatus("Open");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Status</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="Open">Open</option>
          <option value="Closed">Closed</option>
        </select>
      </div>
      <button type="submit">
        {editingTicket ? "Update Ticket" : "Add Ticket"}
      </button>
    </form>
  );
}

export default TicketForm;
