import React, { useState, useEffect } from "react";
import api from "../services/api";

const EditEventForm = ({ event, onEventUpdate }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    fecha: "",
    cupo: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false); 

  
  useEffect(() => {
    if (event) {
      const { nombre, descripcion, fecha, cupo } = event;
      setFormData({
        nombre,
        descripcion,
        fecha: new Date(fecha).toISOString().split("T")[0], 
        cupo,
      });
    }
  }, [event]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return; 
    setIsSubmitting(true); 
    try {
      const response = await api.put(`/eventos/${event.id}`, formData);

      if (response.status === 200 || response.status === 204) {
        alert("Evento actualizado exitosamente");
        onEventUpdate(); 

        
        setTimeout(() => {
          window.location.reload(); 
        }, 500); 
      } else {
        alert("Hubo un problema al actualizar el evento. Inténtalo de nuevo.");
      }
    } catch (error) {
      console.error("Error al actualizar el evento:", error);
      alert("Error al comunicarse con el servidor. Por favor, verifica tu conexión.");
    } finally {
      setIsSubmitting(false); 
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Editar Evento</h2>
      <div>
        <label>Nombre:</label>
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label>Descripción:</label>
        <textarea
          name="descripcion"
          value={formData.descripcion}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label>Fecha:</label>
        <input
          type="date"
          name="fecha"
          value={formData.fecha}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label>Cupo:</label>
        <input
          type="number"
          name="cupo"
          value={formData.cupo}
          onChange={handleInputChange}
          required
        />
      </div>
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Actualizando..." : "Actualizar Evento"}
      </button>
    </form>
  );
};

export default EditEventForm;
