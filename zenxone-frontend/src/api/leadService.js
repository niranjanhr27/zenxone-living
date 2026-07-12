import apiClient from "./axiosConfig";

export const submitPublicLead = async (leadData) => {
  const response = await apiClient.post("/leads/public", leadData);
  return response.data;
};
