import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach JWT token to every request if it exists
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("zx-auth-token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Handle expired/invalid tokens globally
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("zx-auth-token");
      localStorage.removeItem("zx-user");
    }
    return Promise.reject(error);
  },
);

export default apiClient;
