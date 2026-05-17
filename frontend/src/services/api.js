import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api" 
});

// Interceptor pentru a adăuga token-ul la fiecare cerere
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; 
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) { // Dacă primim un 401, înseamnă că token-ul nu e valid sau a expirat
      localStorage.removeItem("token"); // Ștergem token-ul din localStorage
      window.location.href = "/login"; // Redirecționăm utilizatorul către pagina de login
    }
    return Promise.reject(error);
  }
);

export default api;