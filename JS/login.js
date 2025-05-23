// Función para mostrar alertas con SweetAlert
function showAlert(title, text, icon) {
    Swal.fire({
        title,
        text,
        icon,
        confirmButtonText: 'Aceptar'
    });
}

// Capturar el evento submit del formulario
document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita recarga

    const correo = document.getElementById('correo').value.trim();
    const contrasena = document.getElementById('contrasena').value.trim();

    // Validación de campos vacíos
    // Reemplazar validación del correo con SweetAlert
    if (!correo || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
        Swal.fire({
            title: '❌ Error',
            text: 'Por favor, ingrese un correo electrónico válido.',
            imageUrl: '../assets/amigurumipng/basespng/amigurumiErrorChopper.png',
            imageWidth: 200,  // Adjust the size 
            imageHeight: 300,
            confirmButtonText: 'Aceptar'
        });
        return;
    }

    if (!contrasena || !/(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}/.test(contrasena)) {
        Swal.fire({
            title: '❌ Error',
            text: 'La contraseña debe contener una mayúscula, un número, un carácter especial y al menos 8 caracteres.',
            imageUrl: '../assets/amigurumipng/basespng/amigurumiErrorChopper.png',
            imageWidth: 200,  // Adjust the size 
            imageHeight: 300,
            confirmButtonText: 'Aceptar'
            });
        return;
    }

    // Deshabilitar validación nativa del correo electrónico
    const correoInput = document.getElementById('correo');
    correoInput.setAttribute('novalidate', 'true');

    // Obtener usuarios registrados del localStorage
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Buscar usuario que coincida con correo y contraseña
    const usuarioEncontrado = usuarios.find(user => user.correo === correo && user.contrasena === contrasena);

    if (usuarioEncontrado) {
        // Guardar usuario activo en localStorage
        localStorage.setItem('usuarioActivo', JSON.stringify(usuarioEncontrado));

        // Mostrar alerta de éxito y redirigir al aceptar
        Swal.fire({
            title: '✅ Bienvenido!',
            imageUrl: '../assets/amigurumipng/basespng/amigurumiSuccessHappy.png',
            imageWidth: 200,  // Adjust the size 
            imageHeight: 300,
            confirmButtonText: 'Aceptar'
        }).then(() => {
            window.location.href = 'home.html';
        });
    } else {
        // Datos inválidos
        showAlert('Error', 'Correo o contraseña incorrectos.', 'error');
    }
});

// Mostrar/ocultar contraseña
const toggleBtns = document.querySelectorAll('.btn-toggle-password');
toggleBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        const targetId = btn.getAttribute('data-target');
        const input = document.getElementById(targetId);
        const icon = btn.querySelector('i');
        if (input.type === 'password') {
            input.type = 'text';
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        } else {
            input.type = 'password';
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        }
    });
});
