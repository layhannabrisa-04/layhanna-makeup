import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api', // Conecta direto com as suas rotas do Express
});

export default api;