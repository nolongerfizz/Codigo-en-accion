import { login } from "./authService.js";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  if (form) {
    form.addEventListener("submit", async function(e) {
      e.preventDefault();
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      try {
        await login(email, password);
        window.location.href = "/productos.html";
      } catch (err) {
        alert("Usuario o contraseña incorrectos");
      }
    });
  }
});