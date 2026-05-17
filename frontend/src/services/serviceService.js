import api from "./api";

export const getAllServices = (params) => {
  // params poate conține { category: 'dog', location: 'Bucuresti' }
  return api.get("/services", { params });
};

export const getServiceById = (id) => {
  return api.get(`/services/${id}`);
};

export const createService = (data) => {
  return api.post("/services", data);
};