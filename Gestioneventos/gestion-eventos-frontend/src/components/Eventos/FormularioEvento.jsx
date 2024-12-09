import React, { useState } from 'react';
import axios from '../../services/api';

const FormularioEvento = ({ onEventoCreado }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    fecha: '',
    cupo: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/eventos', formData)
      .then(() => {
        alert('Evento creado con éxito');
        onEventoCreado();
      })
      .catch(err => console.error(err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="nombre" placeholder="Nombre" onChange={handleChange} />
      <input name="descripcion" placeholder="Descripción" onChange={handleChange} />
      <input type="date" name="fecha" onChange={handleChange} />
      <input type="number" name="cupo" placeholder="Cupo" onChange={handleChange} />
      <button type="submit">Guardar Evento</button>
    </form>
  );
};

export default FormularioEvento;
