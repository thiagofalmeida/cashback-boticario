import axios from 'axios';

const api = axios.create({
  baseURL: process.env.BOTICARIO_API_URL,
  headers: { token: process.env.BOTICARIO_API_TOKEN },
});

export default api;
