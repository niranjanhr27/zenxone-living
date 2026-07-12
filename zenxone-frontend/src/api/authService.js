import apiClient from "./axiosConfig";

export const login = async (username, password) => {
  const response = await apiClient.post("/auth/login", { username, password });
  return response.data;
};

export const register = async (userData) => {
  const response = await apiClient.post("/auth/register", userData);
  return response.data;
};
