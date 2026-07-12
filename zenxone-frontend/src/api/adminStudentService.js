import apiClient from "./axiosConfig";

export const getAllStudents = async () => {
  const response = await apiClient.get("/students");
  return response.data;
};

export const updateStudent = async (id, studentData) => {
  const response = await apiClient.put(`/students/${id}`, studentData);
  return response.data;
};

export const moveOutStudent = async (id) => {
  const response = await apiClient.patch(`/students/${id}/move-out`);
  return response.data;
};
