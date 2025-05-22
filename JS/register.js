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
        Swal.fire({
            title: '❌ Error',
            text: 'Por favor, ingrese su nombre.',
            imageUrl: '../assets/amigurumipng/basespng/amigurumiErrorChopper.png',
            imageWidth: 200,  // Adjust the size 
            imageHeight: 300,
            confirmButtonText: 'Aceptar'
        });
        return;
    }

    if (!apellidos) {
        Swal.fire({
            title: '❌ Error',
            text: 'Por favor, ingrese sus apellidos.',
            imageUrl: '../assets/amigurumipng/basespng/amigurumiErrorChopper.png',
            imageWidth: 200,  // Adjust the size 
            imageHeight: 300,
            confirmButtonText: 'Aceptar'
        });
        return;
    }

    // Actualizar validación del teléfono para que sean exactamente 10 dígitos
    if (!telefono || !/^[0-9]{10}$/.test(telefono)) {
        Swal.fire({
            title: '❌ Error',
            text: 'Por favor, ingrese un número de teléfono válido de 10 dígitos.',
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

    // Validar que la confirmación de contraseña coincida con la contraseña
    const confirmarContrasena = document.getElementById('confirmar-contrasena').value.trim();
    if (contrasena !== confirmarContrasena) {
        Swal.fire({
            title: '❌ Error',
            text: 'Las contraseñas no coinciden.',
            imageUrl: '../assets/amigurumipng/basespng/amigurumiErrorChopper.png',
            imageWidth: 200,  // Adjust the size 
            imageHeight: 300,
            confirmButtonText: 'Aceptar'
        });
        return;
    }

    if (!termsCheck) {
        Swal.fire({
            title: '❌ Error',
            text: 'Debe aceptar los términos y condiciones.',
            imageUrl: '../assets/amigurumipng/basespng/amigurumiErrorChopper.png',
            imageWidth: 200,  // Adjust the size 
            imageHeight: 300,
            confirmButtonText: 'Aceptar'
        });
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
        title: '✅ Registro exitoso',
        text: 'Sus datos han sido registrados correctamente.',
        imageUrl: '../assets/amigurumipng/basespng/amigurumiSuccessHappy.png',
        imageWidth: 200,  // Adjust the size 
        imageHeight: 300,
        confirmButtonText: 'Aceptar'
    });

    // Redirigir a nuestra página de iniciar sesión con un retraso de 3000 ms
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 3000);

    // Resetear el formulario después de un registro exitoso
    document.querySelector('form').reset();
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