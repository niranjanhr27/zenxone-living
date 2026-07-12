import apiClient from "./axiosConfig";

export const getAllPayments = async () => {
  const response = await apiClient.get("/payments");
  return response.data;
};

export const recordPayment = async (paymentData) => {
  const response = await apiClient.post("/payments", paymentData);
  return response.data;
};

export const updatePayment = async (id, paymentData) => {
  const response = await apiClient.put(`/payments/${id}`, paymentData);
  return response.data;
};

export const deletePayment = async (id) => {
  const response = await apiClient.delete(`/payments/${id}`);
  return response.data;
};
