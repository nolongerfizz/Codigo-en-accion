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
        showAlert('Error', 'Por favor, ingrese un correo electrónico válido.', 'error', 'correo');
        return;
    }

    if (!contrasena || !/(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}/.test(contrasena)) {
        showAlert('Error', 'La contraseña debe contener una mayúscula, un número, un carácter especial y al menos 8 caracteres.', 'error', 'contrasena');
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
            title: 'Inicio de sesión exitoso',
            text: '¡Bienvenido, ' + usuarioEncontrado.nombre + '!',
            icon: 'success',
            confirmButtonText: 'Aceptar'
        }).then(() => {
            window.location.href = 'home.html';
        });
    } else {
        // Datos inválidos
        showAlert('Error', 'Correo o contraseña incorrectos.', 'error');
    }
});
