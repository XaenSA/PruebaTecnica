import React, { useState, useEffect } from "react";
import api from "../services/api";

const ReservationList = ({ eventId, onReservationCreated }) => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    fetchReservations();
  }, [eventId]);

  const fetchReservations = async () => {
    try {
      const response = await api.get(`/reservas/${eventId}`);
      setReservations(response.data);
    } catch (error) {
      console.error("Error al cargar las reservas:", error);
    }
  };

  const handleStatusChange = async (reservationId, newStatus) => {
    try {
      await api.put(`/reservas/${reservationId}/estado`, { estado: newStatus });
      fetchReservations(); 
      alert("Estado de la reserva actualizado");
    } catch (error) {
      console.error("Error al actualizar el estado:", error);
      alert("Hubo un error al actualizar el estado");
    }
  };

  
  const handleDeleteReservation = async (reservationId) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar esta reserva?")) {
      try {
        await api.delete(`/reservas/${reservationId}`);
        fetchReservations(); 
        alert("Reserva eliminada");

        
        if (onReservationCreated) {
          onReservationCreated(); 
        }
      } catch (error) {
        console.error("Error al eliminar la reserva:", error);
        alert("Hubo un error al eliminar la reserva");
      }
    }
  };

  return (
    <div>
      <h3>Reservas para el Evento</h3>
      <ul>
        {reservations.map((reservation) => (
          <li key={reservation.id}>
            <p>Usuario: {reservation.nombre_usuario}</p>
            <p>Email: {reservation.email}</p>
            <p>Plazas: {reservation.numero_plazas}</p>
            <p>Estado: {reservation.estado}</p>

            {/* Botones para cambiar el estado y eliminar la reserva */}
            <button
              onClick={() => handleStatusChange(reservation.id, "confirmada")}
              disabled={reservation.estado === "confirmada"}
            >
              Confirmar
            </button>
            <button
              onClick={() => handleStatusChange(reservation.id, "cancelada")}
              disabled={reservation.estado === "cancelada"}
            >
              Cancelar
            </button>
            <button onClick={() => handleDeleteReservation(reservation.id)}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReservationList;
