import React, { useState, useEffect } from "react";
import api from "../services/api";
import EditEventForm from "./EditEventForm";
import ReservationForm from "./ReservationForm";
import ReservationList from "./ReservationList";
import "./styles.css";

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [newEvent, setNewEvent] = useState({
    nombre: "",
    descripcion: "",
    fecha: "",
    cupo: "",
  });
  const [isReservationVisible, setIsReservationVisible] = useState(false); 
  const [isEditFormVisible, setIsEditFormVisible] = useState(false); 

 
  const fetchEvents = async () => {
    try {
      const response = await api.get("/eventos");
      setEvents(response.data);
    } catch (error) {
      console.error("Error al cargar los eventos:", error);
    }
  };

  // Agregar un nuevo evento
  const handleAddEvent = async (e) => {
    e.preventDefault();
    try {
      await api.post("/eventos", newEvent);
      fetchEvents(); // Refrescar la lista de eventos
      setNewEvent({ nombre: "", descripcion: "", fecha: "", cupo: "" }); // Limpiar formulario
      alert("Evento agregado exitosamente");
    } catch (error) {
      console.error("Error al agregar evento:", error);
    }
  };

 
  const handleManageCreatedReservations = (eventId) => {
    // Buscar el evento correspondiente
    const event = events.find((e) => e.id === eventId);

    if (event) {
      
      if (event.reservas && event.reservas.length > 0) {
        setSelectedEventId(eventId); 
        setIsReservationVisible(true); 
      } else {
        alert("No hay aún reservas para este evento."); 
      }
    } else {
      console.error("Evento no encontrado.");
    }
  };

  
  const handleEditEvent = (eventId) => {
    const eventToEdit = events.find((event) => event.id === eventId);
    setSelectedEvent(eventToEdit); 
    setIsEditFormVisible(!isEditFormVisible); 
  };

  
  const handleEventUpdate = async (updatedEvent) => {
    try {
      await api.put(`/eventos/${updatedEvent.id}`, updatedEvent); 
      fetchEvents(); 
      setSelectedEvent(null); 
      setIsEditFormVisible(false); 
      alert("Evento actualizado exitosamente");
    } catch (error) {
      console.error("Error al actualizar evento:", error);
    }
  };

  
  const handleDeleteEvent = async (eventId) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este evento?")) {
      try {
        await api.delete(`/eventos/${eventId}`);
        fetchEvents();
        alert("Evento eliminado");
      } catch (error) {
        console.error("Error al eliminar evento:", error);
        alert("Hubo un error al eliminar el evento");
      }
    }
  };

  const handleSelectEventForReservations = (eventId) => {
    setSelectedEventId(eventId);
    setIsReservationVisible(!isReservationVisible); 
  };

  const handleReservationCreated = () => {
    fetchEvents();
  };

  const formatDate = (date) => {
    const newDate = new Date(date);
    const day = String(newDate.getDate()).padStart(2, "0");
    const month = String(newDate.getMonth() + 1).padStart(2, "0");
    const year = newDate.getFullYear();
    return `${day}/${month}/${year}`; 
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="main-container">
      <h1 align="center"> Gestión de Eventos</h1>
      <title>Eventos</title>

      {/* Formulario para agregar nuevo evento */}
      <div className="form-container">
        <h3>Agregar Nuevo Evento</h3>
        <form onSubmit={handleAddEvent}>
          <input
            type="text"
            placeholder="Nombre del Evento"
            value={newEvent.nombre}
            onChange={(e) => setNewEvent({ ...newEvent, nombre: e.target.value })}
            required
          />
          
          <input
            type="text"
            placeholder="Descripción"
            value={newEvent.descripcion}
            onChange={(e) =>
              setNewEvent({ ...newEvent, descripcion: e.target.value })
            }
            required
          />
          <input
            type="date"
            placeholder="Fecha"
            value={newEvent.fecha}
            onChange={(e) => setNewEvent({ ...newEvent, fecha: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Cupo disponible"
            value={newEvent.cupo}
            onChange={(e) => setNewEvent({ ...newEvent, cupo: e.target.value })}
            required
          />
          <button type="submit">Agregar Evento</button>
        </form>
      </div>

      {/* Lista de eventos */}
      <ul className="event-list">
        {events.map((event) => (
          <li key={event.id} className="event-card">
            <h3 className="event-title">{event.nombre}</h3>
            <p>{event.descripcion}</p>
            <p>Fecha: {formatDate(event.fecha)}</p>
            <p>Cupo disponible: <strong>{event.cupo}</strong></p>
            <button
              className="btn btn-edit"
              onClick={() => handleEditEvent(event.id)} 
            >
              Editar Evento
            </button>
            <button
              className="btn btn-delete"
              onClick={() => handleDeleteEvent(event.id)}
            >
              Eliminar
            </button>
            <button
              className="btn btn-manage"
              onClick={() => handleSelectEventForReservations(event.id)}
            >
              Gestionar Reservas
            </button>
            
          </li>
        ))}
      </ul>

      {/* Mostrar el formulario de edición si se seleccionó un evento */}
      {isEditFormVisible && selectedEvent && (
        <div className="form-container">
          <h3>Editar Evento</h3>
          <EditEventForm
            event={selectedEvent}  
            onEventUpdate={handleEventUpdate}  
          />
        </div>
      )}

      {/* Gestión de reservas */}
      {isReservationVisible && selectedEventId && (
        <div className="form-container">
          <ReservationForm
            eventId={selectedEventId}
            onReservationCreated={handleReservationCreated}
          />
          <ReservationList
            eventId={selectedEventId}
            onReservationCreated={handleReservationCreated}
          />
        </div>
      )}
    </div>
  );
};

export default EventList;
