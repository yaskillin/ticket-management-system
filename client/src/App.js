import React, { useState, useEffect } from "react";
import TicketForm from "./components/TicketForm";
import TicketTable from "./components/TicketTable";
import "./global.css";

function App() {
  const [tickets, setTickets] = useState([]);
  const [editingTicket, setEditingTicket] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const [sortConfig, setSortConfig] = useState({
    key: "",
    direction: "ascending",
  });
  const [filterStatus, setFilterStatus] = useState("All");

  // Fonction pour récupérer les tickets depuis l'API
  const fetchTickets = () => {
    fetch("http://localhost:5143/api/ticket")
      .then((response) => response.json())
      .then((data) => {
        setTickets(data); // Mettre à jour l'état avec les tickets récupérés
      })
      .catch((error) => console.error("Error fetching tickets:", error));
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const handleAddOrUpdateTicket = (newTicket) => {
    if (editingTicket) {
      // Mise à jour du ticket existant
      fetch(`http://localhost:5143/api/ticket/${editingTicket.ticketID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTicket),
      })
        .then(() => {
          fetchTickets(); // Rafraîchir la liste
          setEditingTicket(null); // Réinitialiser le formulaire
          setShowForm(false); // Cacher le formulaire après la mise à jour
        })
        .catch((error) => console.error("Error updating ticket:", error));
    } else {
      // Ajout d'un nouveau ticket
      fetch("http://localhost:5143/api/ticket", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTicket),
      })
        .then(() => {
          fetchTickets(); // Rafraîchir la liste des tickets
          setShowForm(false); // Cacher le formulaire après l'ajout
        })
        .catch((error) => console.error("Error adding ticket:", error));
    }
  };

  const handleDeleteTicket = (ticketID) => {
    fetch(`http://localhost:5143/api/ticket/${ticketID}`, {
      method: "DELETE",
    })
      .then(() => {
        setTickets(tickets.filter((ticket) => ticket.ticketID !== ticketID));
      })
      .catch((error) => console.error("Error deleting ticket:", error));
  };

  const handleEditTicket = (ticket) => {
    setEditingTicket(ticket);
    setShowForm(true); // Afficher le formulaire lors de l'édition
  };

  const handleAddNewTicket = () => {
    setEditingTicket(null); // Aucune édition
    setShowForm(true); // Afficher le formulaire pour l'ajout
  };

  // Gérer le tri par colonne
  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  // Gérer le filtrage par statut
  const handleFilterChange = (event) => {
    setFilterStatus(event.target.value);
  };

  // Filtrer et trier les tickets avant de les passer au composant TicketTable
  let filteredTickets = tickets.filter((ticket) => {
    if (filterStatus === "All") {
      return true;
    }
    // Normaliser la casse pour le statut (mettre en minuscule pour comparaison)
    return ticket.status.toLowerCase() === filterStatus.toLowerCase();
  });

  if (sortConfig.key) {
    filteredTickets = filteredTickets.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
  }

  return (
    <div className="container">
      <h1>Ticket Management System</h1>
      {showForm ? (
        <TicketForm
          onAddTicket={handleAddOrUpdateTicket}
          editingTicket={editingTicket}
        />
      ) : (
        <button className="add-new" onClick={handleAddNewTicket}>
          Add New
        </button>
      )}

      {/* Menu de filtrage par statut */}
      <div>
        <label htmlFor="filter">Filter by Status: </label>
        <select id="filter" value={filterStatus} onChange={handleFilterChange}>
          <option value="All">All</option>
          <option value="Open">Open</option>
          <option value="Closed">Closed</option>
        </select>
      </div>

      <TicketTable
        tickets={filteredTickets}
        onDeleteTicket={handleDeleteTicket}
        onEditTicket={handleEditTicket}
        onSort={handleSort}
        sortConfig={sortConfig}
      />
    </div>
  );
}

export default App;
