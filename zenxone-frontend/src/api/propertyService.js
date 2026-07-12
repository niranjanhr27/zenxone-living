import apiClient from "./axiosConfig";

export const getActiveProperties = async () => {
  const response = await apiClient.get("/properties/active");
  return response.data;
};

export const getPropertyById = async (id) => {
  const response = await apiClient.get(`/properties/${id}`);
  return response.data;
};

export const getPropertiesByType = async (type) => {
  const response = await apiClient.get(`/properties/type/${type}`);
  return response.data;
};
