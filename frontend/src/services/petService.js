import api from "./api";

// Listarea tuturor animalelor mele
export const getMyPets = () => api.get("/pets");

// Preluarea unui singur animal (pentru pagina de Edit)
export const getPetById = (id) => api.get(`/pets/${id}`);

// Crearea unui animal nou
export const addPet = (data) => api.post("/pets", data);

// Actualizarea datelor unui animal existent
export const updatePet = (id, data) => api.put(`/pets/${id}`, data);

// Ștergerea unui animal
export const deletePet = (id) => api.delete(`/pets/${id}`);