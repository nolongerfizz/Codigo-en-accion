// Lista para guardar los productos en formato JSON
const products = [];

// Capturar el formulario
const form = document.getElementById('productForm');

// Escuchar evento submit
form.addEventListener('submit', function (event) {
  event.preventDefault(); // Evita recargar la página

  // Obtener valores de los inputs
  const name = document.getElementById('name').value;
  const img = document.getElementById('img').value;
  const price = parseFloat(document.getElementById('price').value);

  // Crear objeto del producto
  const product = {
    name: name,
    img: img,
    price: price
  };

  // Agregar el producto al array
  products.push(product);

  // Mostrar el array completo de productos en consola
  console.log("Lista de productos:", JSON.stringify(products, null, 2));console.log(products);

  // Limpiar el formulario
  form.reset();
});