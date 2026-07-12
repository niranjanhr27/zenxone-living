import apiClient from "./axiosConfig";

export const getRoomsByProperty = async (propertyId) => {
  const response = await apiClient.get(`/rooms/property/${propertyId}`);
  return response.data;
};

export const getAllRooms = async () => {
  const response = await apiClient.get("/rooms");
  return response.data;
};
