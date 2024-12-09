import React, { useState } from "react";
import api from "../services/api";

const AddEventForm = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    fecha: "",
    cupo: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/eventos", formData); // Enviar datos al backend
      alert("Evento creado exitosamente");
      setFormData({ nombre: "", descripcion: "", fecha: "", cupo: "" }); // Limpia el formulario
    } catch (error) {
      console.error("Error al crear evento:", error);
      alert("Hubo un error al crear el evento");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Agregar Nuevo Evento</h2>
      <div>
        <label>Nombre:</label>
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Descripción:</label>
        <textarea
          name="descripcion"
          value={formData.descripcion}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Fecha:</label>
        <input
          type="date"
          name="fecha"
          value={formData.fecha}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Cupo:</label>
        <input
          type="number"
          name="cupo"
          value={formData.cupo}
          onChange={handleInputChange}
        />
      </div>
      <button type="submit">Crear Evento</button>
    </form>
  );
};

export default AddEventForm;
