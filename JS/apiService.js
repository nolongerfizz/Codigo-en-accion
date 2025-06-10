import { getToken, logout } from "./authService.js";
const API_URL = "https://mbhybiq34m.us-east-1.awsapprunner.com/api";

export async function apiFetch(endpoint, options = {}) {
  const token = getToken();
  const headers = {
    ...(options.headers || {}),
    Authorization: token ? `Bearer ${token}` : "",
    "Content-Type": "application/json",
  };
  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });
  if (res.status === 401) {
    logout();
    window.location.href = "/login.html";
    throw new Error("No autorizado");
  }
  return res.json();
}