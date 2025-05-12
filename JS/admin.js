// Inicializar el array de productos con los datos existentes en localStorage
const products = JSON.parse(localStorage.getItem('products')) || [];

// Capturar el formulario
const form = document.getElementById('productForm');

// Mostrar un mensaje de éxito o error
function mostrarMensaje(tipo, mensaje) {
  const mensajeDiv = document.createElement('div');
  mensajeDiv.className = `alert alert-${tipo}`; // alert-success o alert-danger
  mensajeDiv.textContent = mensaje;

  // Insertar el mensaje en el formulario
  const form = document.getElementById('productForm');
  form.parentNode.insertBefore(mensajeDiv, form);

  // Eliminar el mensaje después de 3 segundos
  setTimeout(() => {
    mensajeDiv.remove();
  }, 3000);
}

// Modificar el evento submit para manejar el precio correctamente y evitar reemplazos
form.addEventListener('submit', function (event) {
  event.preventDefault(); // Evita recargar la página

  try {
    // Obtener valores de los inputs
    const name = document.getElementById('name').value;
    const img = document.getElementById('img').value;
    let price = document.getElementById('price').value;

    // Eliminar puntos del separador de miles y convertir a número
    price = parseFloat(price.replace(/\./g, ''));

    // Crear objeto del producto
    const product = {
      name: name,
      img: img,
      price: price
    };

    // Agregar el producto al array
    products.push(product);

    // Guardar productos en localStorage
    localStorage.setItem('products', JSON.stringify(products));

    // Mostrar mensaje de éxito
    mostrarMensaje('success', 'Amigurumi agregado correctamente.');

    // Limpiar el formulario
    form.reset();
  } catch (error) {
    // Mostrar mensaje de error
    mostrarMensaje('danger', 'No se pudo agregar el amigurumi.');
    console.error(error);
  }
});

// Formatear el precio con separador de miles
const priceInput = document.getElementById('price');

priceInput.addEventListener('input', (event) => {
  let value = event.target.value.replace(/\./g, ''); // Eliminar puntos existentes
  if (!isNaN(value) && value !== '') {
    event.target.value = parseFloat(value).toLocaleString('es-CO'); // Formatear con puntos
  }
});