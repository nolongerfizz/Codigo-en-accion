// Agregar SweetAlert para alertas con mejor diseño
function showAlert(title, text, icon, focusElementId) {
    Swal.fire({
        title: title,
        text: text,
        icon: icon,
        confirmButtonText: 'Aceptar'
    }).then(() => {
        if (focusElementId) {
            document.getElementById(focusElementId).focus();
        }
    });
}

document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita el envío del formulario

    // Obtener los valores de los campos
    const nombre = document.getElementById('nombre').value.trim();
    const apellidos = document.getElementById('apellidos').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const correo = document.getElementById('correo').value.trim();
    const contrasena = document.getElementById('contrasena').value.trim();
    const termsCheck = document.getElementById('termsCheck').checked;

    // Validaciones personalizadas
    if (!nombre) {
        showAlert('Error', 'Por favor, ingrese su nombre.', 'error', 'nombre');
        return;
    }

    if (!apellidos) {
        showAlert('Error', 'Por favor, ingrese sus apellidos.', 'error', 'apellidos');
        return;
    }

    // Actualizar validación del teléfono para que sean exactamente 10 dígitos
    if (!telefono || !/^[0-9]{10}$/.test(telefono)) {
        showAlert('Error', 'Por favor, ingrese un número de teléfono válido de 10 dígitos.', 'error', 'telefono');
        return;
    }

    // Deshabilitar validación nativa del correo electrónico
    const correoInput = document.getElementById('correo');
    correoInput.setAttribute('novalidate', 'true');

    // Reemplazar validación del correo con SweetAlert
    if (!correo || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
        showAlert('Error', 'Por favor, ingrese un correo electrónico válido.', 'error', 'correo');
        return;
    }

    if (!contrasena || !/(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}/.test(contrasena)) {
        showAlert('Error', 'La contraseña debe contener una mayúscula, un número, un carácter especial y al menos 8 caracteres.', 'error', 'contrasena');
        return;
    }

    // Validar que la confirmación de contraseña coincida con la contraseña
    const confirmarContrasena = document.getElementById('confirmar-contrasena').value.trim();
    if (contrasena !== confirmarContrasena) {
        showAlert('Error', 'Las contraseñas no coinciden.', 'error', 'confirmar-contrasena');
        return;
    }

    if (!termsCheck) {
        showAlert('Error', 'Debe aceptar los términos y condiciones.', 'error', 'termsCheck');
        return;
    }

    // Crear objeto JSON con los datos del usuario
    const usuario = {
        nombre,
        apellidos,
        telefono,
        correo,
        contrasena
    };

    // Obtener usuarios existentes de localStorage o inicializar un array vacío
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Agregar el nuevo usuario al array
    usuarios.push(usuario);

    // Guardar el array actualizado en localStorage
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    // Mostrar la alerta de éxito inmediatamente
    Swal.fire({
        title: 'Registro exitoso',
        text: 'Sus datos han sido registrados correctamente.',
        icon: 'success',
        confirmButtonText: 'Aceptar'
    });

    // Redirigir a nuestra página de iniciar sesión con un retraso de 3000 ms
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 3000);

    // Resetear el formulario después de un registro exitoso
    document.querySelector('form').reset();
});