const API_URL = "https://mbhybiq34m.us-east-1.awsapprunner.com/api";

export async function login(email, password) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ correo: email, password }),
  });
  if (!res.ok) throw new Error("Login fallido");
  const data = await res.json();
  localStorage.setItem("token", data.token);
  return data;
}

export async function register(nombre, email, password, telefono) {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nombre, correo: email, contrasena: password, telefono }),
  });
  if (!res.ok) {
    let msg = "Registro fallido";
    try {
      const data = await res.json();
      msg = data.message || msg;
    } catch {}
    const error = new Error(msg);
    error.response = res;
    throw error;
  }
  return await res.json();
}

export function getToken() {
  return localStorage.getItem("token");
}

export function logout() {
  localStorage.removeItem("token");
}