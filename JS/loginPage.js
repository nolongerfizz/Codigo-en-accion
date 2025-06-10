import { login } from "./authService.js";

// === ✅ ALERTA ESTANDAR CON SWEETALERT === //
function showAlert({ title = '', text = '', icon = 'info', imageUrl = '', focusElementId = '' }) {
  Swal.fire({
    title,
    text,
    icon: imageUrl ? undefined : icon,
    imageUrl: imageUrl || undefined,
    imageWidth: 200,
    imageHeight: 300,
    confirmButtonText: '<span class="custom-swal-btn">Aceptar</span>'
  }).then(() => {
    if (focusElementId) document.getElementById(focusElementId)?.focus();
  });
}

// === 🔍 VALIDACIÓN DE FORMULARIO DE LOGIN === //
function validateLogin(correo, contrasena) {
  const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const regexContrasena = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d\S]{8,}$/;

  if (!correo || !regexCorreo.test(correo)) {
    return { valid: false, msg: 'Por favor, ingrese un correo electrónico válido.', field: 'correo' };
  }

  if (!contrasena || !regexContrasena.test(contrasena)) {
    return {
      valid: false,
      msg: 'La contraseña debe contener una mayúscula, un número, un carácter especial y al menos 8 caracteres.',
      field: 'contrasena'
    };
  }

  return { valid: true };
}

document.addEventListener("DOMContentLoaded", () => {
  // Mostrar/ocultar contraseña
  document.querySelectorAll('.btn-toggle-password').forEach(btn => {
    btn.addEventListener('click', () => {
      const input = document.getElementById(btn.getAttribute('data-target'));
      const icon = btn.querySelector('i');
      if (!input || !icon) return;
      const isPassword = input.type === 'password';
      input.type = isPassword ? 'text' : 'password';
      icon.classList.toggle('fa-eye');
      icon.classList.toggle('fa-eye-slash');
    });
  });

  // Formulario de login
  const form = document.querySelector('form');
  if (form) {
    form.addEventListener("submit", async function(e) {
      e.preventDefault();
      const correo = document.getElementById('correo').value.trim();
      const contrasena = document.getElementById('contrasena').value.trim();
      const validacion = validateLogin(correo, contrasena);
      if (!validacion.valid) {
        return showAlert({
          title: '❌ Error',
          text: validacion.msg,
          icon: 'error',
          imageUrl: '../assets/amigurumipng/basespng/amigurumiErrorChopper.png',
          focusElementId: validacion.field
        });
      }
      try {
        await login(correo, contrasena);
        await showAlert({
          title: '✅ Bienvenido',
          text: 'Inicio de sesión exitoso.',
          imageUrl: '../assets/amigurumipng/basespng/amigurumiSuccessHappy.png'
        });
        window.location.href = '../HTML/productos.html';
      } catch (err) {
        let msg = 'Usuario o contraseña incorrectos';
        if (err.response) {
          try {
            const text = await err.response.clone().text();
            msg = text || msg;
          } catch {
            try {
              const data = await err.response.clone().json();
              msg = data.message || msg;
            } catch {}
          }
        }
        showAlert({
          title: '❌ Error',
          text: msg,
          icon: 'error',
          imageUrl: '../assets/amigurumipng/basespng/amigurumiErrorChopper.png'
        });
      }
    });
  }
});