import { register } from "./authService.js";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registerForm");
  if (form) {
    form.addEventListener("submit", async function(e) {
      e.preventDefault();
      const nombre = document.getElementById("nombre").value.trim();
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value;
      const confirmarPassword = document.getElementById("confirmar-password").value;
      const telefono = document.getElementById("telefono").value.trim();
      const termsCheck = document.getElementById("termsCheck").checked;

      if (!termsCheck) {
        alert("Debes aceptar los términos y condiciones.");
        return;
      }
      if (password !== confirmarPassword) {
        alert("Las contraseñas no coinciden.");
        return;
      }

      try {
        await register(nombre, email, password, telefono);
        alert("Registro exitoso. Ahora puedes iniciar sesión.");
        window.location.href = "/login.html";
      } catch (err) {
        alert("Error en el registro: " + err.message);
      }
    });
  }
});