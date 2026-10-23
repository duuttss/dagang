import axios from "axios";

// Alamat API Laravel kita
const API_URL = "http://127.0.0.1:8000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
  },
});

// Fungsi untuk mengambil token yang disimpan di browser
export const getToken = () => localStorage.getItem("auth_token");

// Interceptor: Otomatis menyisipkan token ke setiap request (jika ada)
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;