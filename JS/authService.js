const API_URL = "https://mbhybiq34m.us-east-1.awsapprunner.com/api";

export async function login(email, password) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ correo: email, contrasena: password }), // Cambiado a 'contrasena'
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
  const contentType = res.headers.get("content-type");
  let data;
  if (contentType && contentType.includes("application/json")) {
    data = await res.json();
  } else {
    data = await res.text();
  }
  if (!res.ok) {
    let msg = typeof data === "string" ? data : (data.message || "Registro fallido");
    const error = new Error(msg);
    error.response = res;
    throw error;
  }
  return data;
}

export function getToken() {
  return localStorage.getItem("token");
}

export function logout() {
  localStorage.removeItem("token");
}