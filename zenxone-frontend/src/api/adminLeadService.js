import apiClient from "./axiosConfig";

export const getAllLeads = async () => {
  const response = await apiClient.get("/leads");
  return response.data;
};

export const updateLeadStatus = async (id, status, remarks) => {
  const response = await apiClient.patch(`/leads/${id}/status`, {
    status,
    remarks,
  });
  return response.data;
};

export const updateLead = async (id, leadData) => {
  const response = await apiClient.put(`/leads/${id}`, leadData);
  return response.data;
};

export const deleteLead = async (id) => {
  const response = await apiClient.delete(`/leads/${id}`);
  return response.data;
};
