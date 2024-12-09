import React, { useState, useEffect } from 'react';
import axios from '../../services/api';

const ListaEventos = () => {
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    // Obtener lista de eventos
    axios.get('/eventos')
      .then(response => setEventos(response.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Lista de Eventos</h2>
      <ul>
        {eventos.map(evento => (
          <li key={evento.id}>
            <h3>{evento.nombre}</h3>
            <p>{evento.descripcion}</p>
            <p>Fecha: {evento.fecha}</p>
            <p>Cupo: {evento.cupo}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListaEventos;
