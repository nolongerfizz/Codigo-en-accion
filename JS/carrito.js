function getCarrito() {
  return JSON.parse(localStorage.getItem('carrito')) || [];
}

function setCarrito(carrito) {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

function renderCarrito() {
  const lista = document.getElementById('carrito-lista');
  if (!lista) return;
  lista.innerHTML = '';
  const carrito = getCarrito();
  carrito.forEach((producto, idx) => {
    const card = document.createElement('div');
    card.className = 'producto-card';
    // Formatear el precio igual que en productos
    const precioTotal = producto.precio + (producto.empaque ? 15000 : 0);
    const precioFormateado = precioTotal.toLocaleString('es-CO');
    card.innerHTML = `
      <img src="${producto.img}" alt="${producto.nombre}">
      <div class="info">
        <span class="cerrar" data-idx="${idx}"><i class="fa-solid fa-trash"></i></span>
        <div class="nombre">${producto.nombre}</div>
        <div>📏 Tamaño: ${producto.tamaño ? producto.tamaño : ''}</div>
        ${producto.empaque ? '<div>🎁Empaque especial: $15.000</div>' : ''}
        <div class="precio">$ ${precioFormateado}</div>
      </div>
    `;
    lista.appendChild(card);
  });
  actualizarResumen();
  addEliminarListeners();
}

function addEliminarListeners() {
  document.querySelectorAll('.cerrar').forEach(btn => {
    btn.onclick = function() {
      const idx = parseInt(btn.getAttribute('data-idx'));
      const carrito = getCarrito();
      carrito.splice(idx, 1);
      setCarrito(carrito);
      renderCarrito();
      actualizarContadorCarrito(); // Asegura que el contador del header se actualiza
    };
  });
}

function actualizarResumen() {
  const carrito = getCarrito();
  let total = 0;
  let empaque = 0;
  let envio = 12000; // Envío fijo
  carrito.forEach(p => {
    total += p.precio;
    if (p.empaque) empaque += 15000;
  });
  const totalFinal = total + empaque + (carrito.length > 0 ? envio : 0);
  // Actualiza los valores en el resumen si existen
  const resumen = document.querySelector('.resumen-card');
  if (resumen) {
    // Productos añadidos
    resumen.querySelectorAll('.resumen-linea span')[1].textContent = carrito.length;
    // Envío
    resumen.querySelectorAll('.resumen-linea span')[3].textContent = `$ ${envio.toLocaleString()}`;
    // Empaque especial
    resumen.querySelectorAll('.resumen-linea span')[5].textContent = `$ ${empaque.toLocaleString()}`;
    // Total
    resumen.querySelector('.valor-total').textContent = `$ ${totalFinal.toLocaleString()}`;
  }
}

function actualizarContadorCarrito() {
  const carrito = getCarrito();
  let icono = document.querySelector('.cart .cart-count');
  if (!icono) {
    const cartIcon = document.querySelector('.cart');
    if (!cartIcon) return;
    icono = document.createElement('span');
    icono.className = 'cart-count';
    cartIcon.appendChild(icono);
  }
  icono.textContent = carrito.length;
}

document.addEventListener('DOMContentLoaded', () => {
  renderCarrito();
  actualizarContadorCarrito();
});