import React, { useState, useEffect } from 'react';
import axios from '../../services/api';

const ListaReservas = ({ eventoId }) => {
  const [reservas, setReservas] = useState([]);

  useEffect(() => {
    axios.get(`/reservas/${eventoId}`)
      .then(response => setReservas(response.data))
      .catch(err => console.error(err));
  }, [eventoId]);

  return (
    <div>
      <h2>Reservas del Evento</h2>
      <ul>
        {reservas.map(reserva => (
          <li key={reserva.id}>
            <p>Usuario: {reserva.nombre_usuario}</p>
            <p>Email: {reserva.email}</p>
            <p>Plazas: {reserva.numero_plazas}</p>
            <p>Estado: {reserva.estado}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListaReservas;
