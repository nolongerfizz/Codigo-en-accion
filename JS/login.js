// === ✅ ALERTA ESTANDAR CON SWEETALERT === //
function showAlert({ title = '', text = '', icon = 'info', imageUrl = '', focusElementId = '' }) {
  Swal.fire({
    title,
    text,
    icon: imageUrl ? undefined : icon,
    imageUrl: imageUrl || undefined,
    imageWidth: 200,
    imageHeight: 300,
    confirmButtonText: 'Aceptar'
  }).then(() => {
    if (focusElementId) document.getElementById(focusElementId).focus();
  });
}

// === 🔐 FUNCION HASH FALSA (DEMO SOLO PARA LOCALSTORAGE) === //
function fakeHash(password) {
  // ¡Advertencia! Esto NO es seguro para producción real.
  return btoa(password); // Base64 como simulación
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

// === 🚀 EVENTO SUBMIT === //
document.querySelector('form').addEventListener('submit', function (event) {
  event.preventDefault();

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

  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  const contrasenaHasheada = fakeHash(contrasena); // Simula hash como se guardó en el register

  const usuarioEncontrado = usuarios.find(user =>
    user.correo === correo && user.contrasena === contrasenaHasheada
  );

  if (usuarioEncontrado) {
    localStorage.setItem('usuarioActivo', JSON.stringify(usuarioEncontrado));
    
    setTimeout(() => {
      window.location.href = '../index.html';
    }, 50);
  } else {
    showAlert({
      title: '❌ Error',
      text: 'Correo o contraseña incorrectos.',
      icon: 'error',
      imageUrl: '../assets/amigurumipng/basespng/amigurumiErrorChopper.png'
    });
  }
});

// === 👁️ MOSTRAR/OCULTAR CONTRASEÑA === //
document.querySelectorAll('.btn-toggle-password').forEach(btn => {
  btn.addEventListener('click', () => {
    const input = document.getElementById(btn.getAttribute('data-target'));
    const icon = btn.querySelector('i');

    const isPassword = input.type === 'password';
    input.type = isPassword ? 'text' : 'password';
    icon.classList.toggle('fa-eye');
    icon.classList.toggle('fa-eye-slash');
  });
});
