import React, { useState } from 'react';
import axios from '../../services/api';

const FormularioReserva = ({ eventoId, onReservaCreada }) => {
  const [formData, setFormData] = useState({
    nombre_usuario: '',
    email: '',
    numero_plazas: 1,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/reservas', { ...formData, evento_id: eventoId })
      .then(() => {
        alert('Reserva creada con éxito');
        onReservaCreada();
      })
      .catch(err => console.error(err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="nombre_usuario" placeholder="Nombre" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input type="number" name="numero_plazas" placeholder="Número de plazas" onChange={handleChange} />
      <button type="submit">Reservar</button>
    </form>
  );
};

export default FormularioReserva;
