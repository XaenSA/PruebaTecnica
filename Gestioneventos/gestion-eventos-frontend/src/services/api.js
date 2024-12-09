import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // Cambia según tu backend
});

export default api;
