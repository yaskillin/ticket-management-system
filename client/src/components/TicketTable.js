import React from "react";
import "../global.css"; // Importation du fichier CSS global

function TicketTable({
  tickets,
  onDeleteTicket,
  onEditTicket,
  onSort,
  sortConfig,
}) {
  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  return (
    <table>
      <thead>
        <tr>
          <th>
            <button
              type="button"
              onClick={() => onSort("ticketID")}
              className={getClassNamesFor("ticketID")}
            >
              Ticket Id
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => onSort("description")}
              className={getClassNamesFor("description")}
            >
              Description
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => onSort("status")}
              className={getClassNamesFor("status")}
            >
              Status
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => onSort("date")}
              className={getClassNamesFor("date")}
            >
              Date
            </button>
          </th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {tickets.map((ticket) => (
          <tr key={ticket.ticketID}>
            <td>{ticket.ticketID}</td>
            <td>{ticket.description}</td>
            <td>{ticket.status}</td>
            <td>{new Date(ticket.date).toLocaleDateString()}</td>
            <td className="action-buttons">
              <button className="edit" onClick={() => onEditTicket(ticket)}>
                Update
              </button>
              <button
                className="delete"
                onClick={() => onDeleteTicket(ticket.ticketID)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TicketTable;
