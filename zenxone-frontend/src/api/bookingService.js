import apiClient from "./axiosConfig";

export const uploadFile = async (file, type) => {
  const formData = new FormData();
  formData.append("file", file);

  const endpoint =
    type === "aadhaar" ? "/files/upload/aadhaar" : "/files/upload/photo";

  const response = await apiClient.post(endpoint, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const submitPublicBooking = async (bookingData) => {
  const response = await apiClient.post("/bookings/public", bookingData);
  return response.data;
};
