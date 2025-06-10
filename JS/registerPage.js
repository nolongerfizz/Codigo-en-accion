import { register } from "./authService.js";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registerForm");
  if (form) {
    form.addEventListener("submit", async function(e) {
      e.preventDefault();
      const nombre = document.getElementById("nombre").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const telefono = document.getElementById("telefono").value;
      const idRol = document.getElementById("idRol").value; // Asegúrate de tener este campo o asigna un valor fijo

      try {
        await register(nombre, email, password, telefono, idRol);
        alert("Registro exitoso. Ahora puedes iniciar sesión.");
        window.location.href = "/login.html";
      } catch (err) {
        alert("Error en el registro: " + err.message);
      }
    });
  }
});