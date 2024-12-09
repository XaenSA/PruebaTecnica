import React, { useState } from "react";
import api from "../services/api";

const ReservationForm = ({ eventId, onReservationCreated }) => {
  const [formData, setFormData] = useState({
    nombre_usuario: "",
    email: "",
    numero_plazas: 1,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    
    if (name === "numero_plazas") {
      
      if (value !== "" && value < 1) {
        return; 
      }
    }

    
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.numero_plazas < 1) {
      alert("El número de plazas debe ser mayor que 0");
      return;
    }

    try {
      await api.post("/reservas", { ...formData, evento_id: eventId });
      alert("Reserva creada con éxito");
      onReservationCreated(); 
      setFormData({ nombre_usuario: "", email: "", numero_plazas: 1 }); 
    } catch (error) {
      console.error("Error al crear la reserva:", error);
      alert("Hubo un error al crear la reserva");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Realizar Reserva</h3>
      <div>
        <label>Nombre:</label>
        <input
          type="text"
          name="nombre_usuario"
          value={formData.nombre_usuario}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Número de Plazas:</label>
        <input
          type="number"
          name="numero_plazas"
          value={formData.numero_plazas}
          onChange={handleInputChange}
          min="1" 
        />
      </div>
      <button type="submit">Reservar</button>
    </form>
  );
};

export default ReservationForm;

