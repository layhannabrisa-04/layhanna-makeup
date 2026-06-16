import axios from 'axios';

const api = axios.create({
  // Se existir a variável do Render (nuvem), ele usa ela. 
  // Se não existir (no seu PC), ele usa o localhost!
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000'
});

export default api;