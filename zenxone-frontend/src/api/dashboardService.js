import apiClient from "./axiosConfig";

export const getDashboardStats = async () => {
  const response = await apiClient.get("/dashboard/stats");
  return response.data;
};
