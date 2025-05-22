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

// === 🔐 HASH SIMULADO (NO SEGURO, SOLO DEMO) === //
function fakeHash(password) {
  return btoa(password);
}

// === ✅ VALIDACIÓN === //
function validateForm(fields) {
  const { nombre, apellidos, telefono, correo, contrasena, confirmarContrasena, termsCheck } = fields;

  const regexTelefono = /^\d{10}$/;
  const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const regexContrasena = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d\S]{8,}$/;

  if (!nombre) return { valid: false, msg: 'Por favor, ingrese su nombre.', field: 'nombre' };
  if (!apellidos) return { valid: false, msg: 'Por favor, ingrese sus apellidos.', field: 'apellidos' };
  if (!telefono || !regexTelefono.test(telefono)) return { valid: false, msg: 'Ingrese un teléfono válido de 10 dígitos.', field: 'telefono' };
  if (!correo || !regexCorreo.test(correo)) return { valid: false, msg: 'Ingrese un correo electrónico válido.', field: 'correo' };
  if (!contrasena || !regexContrasena.test(contrasena)) return { valid: false, msg: 'La contraseña debe tener al menos 8 caracteres, una mayúscula, un número y un carácter especial.', field: 'contrasena' };
  if (contrasena !== confirmarContrasena) return { valid: false, msg: 'Las contraseñas no coinciden.', field: 'confirmar-contrasena' };
  if (!termsCheck) return { valid: false, msg: 'Debe aceptar los términos y condiciones.', field: null };

  return { valid: true };
}

// === 🚀 FORMULARIO === //
document.querySelector('form').addEventListener('submit', function (event) {
  event.preventDefault();

  const fields = {
    nombre: document.getElementById('nombre').value.trim(),
    apellidos: document.getElementById('apellidos').value.trim(),
    telefono: document.getElementById('telefono').value.trim(),
    correo: document.getElementById('correo').value.trim(),
    contrasena: document.getElementById('contrasena').value.trim(),
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

  const usuario = {
    nombre: fields.nombre,
    apellidos: fields.apellidos,
    telefono: fields.telefono,
    correo: fields.correo,
    contrasena: fakeHash(fields.contrasena)
  };

  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  const correoExistente = usuarios.find(u => u.correo === usuario.correo);

  if (correoExistente) {
    return showAlert({
      title: '❌ Error',
      text: 'Este correo ya está registrado.',
      icon: 'error',
      imageUrl: '../assets/amigurumipng/basespng/amigurumiErrorChopper.png'
    });
  }

  usuarios.push(usuario);
  localStorage.setItem('usuarios', JSON.stringify(usuarios));

  showAlert({
    title: '✅ Registro exitoso',
    text: 'Sus datos han sido registrados correctamente.',
    imageUrl: '../assets/amigurumipng/basespng/amigurumiSuccessHappy.png'
  });

  setTimeout(() => {
    window.location.href = 'login.html';
  }, 3000);

  document.querySelector('form').reset();
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

// === 👤 GOOGLE SIGN-IN === //
window.onload = function () {
  google.accounts.id.initialize({
    client_id: '947069495147-elj5eqr5nqal4h25r470jdoa8qih0g35.apps.googleusercontent.com',
    callback: handleCredentialResponse
  });

  google.accounts.id.renderButton(
    document.getElementById("google-signin-btn"),
    {
      theme: "outline",
      size: window.innerWidth < 480 ? "medium" : "large",
      text: "signin_with",
      shape: "rectangular",
      width: "100%"
    }
  );
};

function handleCredentialResponse(response) {
  const decoded = jwt_decode(response.credential);

  const nombre = decoded.given_name || '';
  const apellidos = decoded.family_name || '';
  const correo = decoded.email || '';
  const contrasena = fakeHash('Google_' + Math.random().toString(36).slice(-8));
  const telefono = '0000000000';

  const usuario = { nombre, apellidos, correo, contrasena, telefono };
  let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

  const yaExiste = usuarios.some(u => u.correo === correo);
  if (!yaExiste) usuarios.push(usuario);

  localStorage.setItem('usuarios', JSON.stringify(usuarios));
  localStorage.setItem('usuarioActivo', JSON.stringify(usuario));

  Swal.fire({
    title: '✅ Inicio de sesión exitoso',
    text: `Bienvenido/a ${nombre}`,
    imageUrl: '../assets/amigurumipng/basespng/amigurumiSuccessHappy.png',
    imageWidth: 200,
    imageHeight: 300,
    confirmButtonText: 'Aceptar'
  }).then(() => {
    window.location.href = 'home.html';
  });
}
