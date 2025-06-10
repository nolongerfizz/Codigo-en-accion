// === ✅ ALERTAS CON SWEETALERT2 === //
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

// === ✅ VALIDACIÓN === //
function validateForm(fields) {
  const { nombre, telefono, correo, contrasena, confirmarContrasena, termsCheck } = fields;

  const regexTelefono = /^\d{10}$/;
  const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const regexContrasena = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d\S]{8,}$/;

  if (!nombre) return { valid: false, msg: 'Por favor, ingrese su nombre.', field: 'nombre' };
  if (!telefono || !regexTelefono.test(telefono)) return { valid: false, msg: 'Ingrese un teléfono válido de 10 dígitos.', field: 'telefono' };
  if (!correo || !regexCorreo.test(correo)) return { valid: false, msg: 'Ingrese un correo electrónico válido.', field: 'correo' };
  if (!contrasena || !regexContrasena.test(contrasena)) return { valid: false, msg: 'La contraseña debe tener al menos 8 caracteres, una mayúscula, un número y un carácter especial.', field: 'contrasena' };
  if (contrasena !== confirmarContrasena) return { valid: false, msg: 'Las contraseñas no coinciden.', field: 'confirmar-contrasena' };
  if (!termsCheck) return { valid: false, msg: 'Debe aceptar los términos y condiciones.', field: null };

  return { valid: true };
}

import { register } from "./authService.js";

document.addEventListener("DOMContentLoaded", () => {
  // Mostrar/ocultar contraseña (usando toggle como en register.js)
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

  // Formulario de registro
  const form = document.querySelector('form');
  if (form) {
    form.addEventListener("submit", async function(e) {
      e.preventDefault();
      const fields = {
        nombre: document.getElementById('nombre').value.trim(),        
        correo: document.getElementById('correo').value.trim(),
        contrasena: document.getElementById('contrasena').value.trim(),
        telefono: document.getElementById('telefono').value.trim(),
        confirmarContrasena: document.getElementById('confirmar-contrasena').value.trim(),
        termsCheck: document.getElementById('termsCheck').checked
      };
      const validation = validateForm(fields);
      if (!validation.valid) {
        return showAlert({
          title: '❌ Error',
          text: validation.msg,
          icon: 'error',
          imageUrl: '../assets/amigurumipng/basespng/amigurumiErrorChopper.png',
          focusElementId: validation.field
        });
      }
      try {
        await register(fields.nombre, fields.correo, fields.contrasena, fields.telefono);
        await showAlert({
          title: '✅ Registro exitoso',
          text: 'Sus datos han sido registrados correctamente. Ahora puedes iniciar sesión.',
          imageUrl: '../assets/amigurumipng/basespng/amigurumiSuccessHappy.png'
        });
        form.reset();
        window.location.href = 'login.html';
      } catch (err) {
        // Intenta mostrar el mensaje real del backend si existe
        let msg = err.message;
        if (err.response) {
          try {
            const data = await err.response.json();
            msg = data.message || msg;
          } catch {}
        }
        showAlert({
          title: '❌ Error',
          text: 'Error en el registro: ' + (msg || 'Intenta de nuevo más tarde.'),
          icon: 'error',
          imageUrl: '../assets/amigurumipng/basespng/amigurumiErrorChopper.png'
        });
      }
    });
  }
});