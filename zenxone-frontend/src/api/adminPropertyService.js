import apiClient from "./axiosConfig";

export const getAllPropertiesAdmin = async () => {
  const response = await apiClient.get("/properties");
  return response.data;
};

export const createProperty = async (propertyData) => {
  const response = await apiClient.post("/properties", propertyData);
  return response.data;
};

export const updateProperty = async (id, propertyData) => {
  const response = await apiClient.put(`/properties/${id}`, propertyData);
  return response.data;
};

export const deleteProperty = async (id) => {
  const response = await apiClient.delete(`/properties/${id}`);
  return response.data;
};
