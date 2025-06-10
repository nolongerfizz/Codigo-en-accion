import { apiFetch } from "./apiService.js";

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const productos = await apiFetch("/productos");
    const lista = document.getElementById("listaProductos");
    productos.forEach(p => {
      const li = document.createElement("li");
      li.textContent = p.nombre;
      lista.appendChild(li);
    });
  } catch (err) {
    alert("No autorizado o error al cargar productos");
  }
});