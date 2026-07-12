import apiClient from "./axiosConfig";

export const getAllRoomsAdmin = async () => {
  const response = await apiClient.get("/rooms");
  return response.data;
};

export const createRoom = async (roomData) => {
  const response = await apiClient.post("/rooms", roomData);
  return response.data;
};

export const updateRoom = async (id, roomData) => {
  const response = await apiClient.put(`/rooms/${id}`, roomData);
  return response.data;
};

export const updateRoomMaintenance = async (id, status) => {
  const response = await apiClient.patch(
    `/rooms/${id}/maintenance?status=${status}`,
  );
  return response.data;
};

export const deleteRoom = async (id) => {
  const response = await apiClient.delete(`/rooms/${id}`);
  return response.data;
};

export const getAllBookings = async () => {
  const response = await apiClient.get("/bookings");
  return response.data;
};

export const updateBookingStatus = async (id, status) => {
  const response = await apiClient.patch(
    `/bookings/${id}/status?status=${status}`,
  );
  return response.data;
};
