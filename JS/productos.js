// Seleccionar el id del container
const productosContainer = document.querySelector(".productos-container");

// Load products from localStorage
const products = JSON.parse(localStorage.getItem("products")) || [];

// Generate product cards dynamically
products.forEach((product) => {
  const productCard = document.createElement("div");
  productCard.classList.add("product-card");

  // Format the price with a thousands separator
  const formattedPrice = product.price.toLocaleString("es-CO");

  productCard.innerHTML = `
        <img src="${product.img}" alt="Amigurumi ${product.name}">
        <h3 class="product-name">${product.name}</h3>
        <h5 class="product-price">$ ${formattedPrice}</h5>
        <button type="submit" class="btn-login">Elegir</button>
    `;

  productosContainer.appendChild(productCard);
});

document.addEventListener("DOMContentLoaded", () => {
  const elegirBtns = document.querySelectorAll(".btn-elegir");
  const modalImg = document.querySelector(".modal-img");
  const modalName = document.querySelector(".modal-name");
  const modalDesc = document.querySelector(".modal-desc");
  const precioFinal = document.getElementById("precioFinal");
  const empaqueCheckbox = document.getElementById("empaqueEspecial");

  // Mapa de personajes y sus imágenes
  const personajes = {
    ulon: "/assets/amigurumipng/basespng/basesPngPersonaje/ulon_cerdo.png",
    goku: "/assets/amigurumipng/basespng/basesPngPersonaje/goku_conejo.png",
    nezuko: "/assets/amigurumipng/basespng/basesPngPersonaje/conejo_nezuko.png",
    naruto: "/assets/amigurumipng/basespng/basesPngPersonaje/naruto_conejo.png",
    sakura: "/assets/amigurumipng/basespng/basesPngPersonaje/sakura_conejo.png",
    anya: "/assets/amigurumipng/basespng/basesPngPersonaje/anya_gato.png",
    zenitsu: "/assets/amigurumipng/basespng/basesPngPersonaje/zenitsu_gato.png",
    goyo: "/assets/amigurumipng/basespng/basesPngPersonaje/goyo_oso.png",
    itadori: "/assets/amigurumipng/basespng/basesPngPersonaje/itadori_mono.png",
    inosuke: "/assets/amigurumipng/basespng/basesPngPersonaje/inosuke_cerdo.png",
    krilin: "/assets/amigurumipng/basespng/basesPngPersonaje/krilin_perro.png",
    luffy: "/assets/amigurumipng/basespng/basesPngPersonaje/Luffy_perro.png",
    tanjiro: "/assets/amigurumipng/basespng/basesPngPersonaje/tanjiro_perro.png",
    gara: "/assets/amigurumipng/basespng/basesPngPersonaje/gara_perro.png",
    kakashi: "/assets/amigurumipng/basespng/basesPngPersonaje/kakashi_mono.png",
    luna: "/assets/amigurumipng/basespng/basesPngPersonaje/gato-Luna (1).png",
    roshi: "/assets/amigurumipng/basespng/basesPngPersonaje/maestro_roshi_oso.png",
    jiraija: "/assets/amigurumipng/basespng/basesPngPersonaje/jiraija_oso.png",
    bills: "/assets/amigurumipng/basespng/basesPngPersonaje/bills_gato.png",
    levi: "/assets/amigurumipng/basespng/basesPngPersonaje/baseConejoLevi.png",
    doflamingo: "/assets/amigurumipng/basespng/basesPngPersonaje/baseCerdoDoflamingo.png",
    power: "/assets/amigurumipng/basespng/basesPngPersonaje/baseCerdoPower.png",
    izuku: "/assets/amigurumipng/basespng/basesPngPersonaje/baseMonoIzuku.png",
    shoto: "/assets/amigurumipng/basespng/basesPngPersonaje/baseOsoShoto.png",
    denji: "/assets/amigurumipng/basespng/basesPngPersonaje/basePerroDenji.png",
    ichigo: "/assets/amigurumipng/basespng/basesPngPersonaje/baseMonoIchigo.png",
    yor: "/assets/amigurumipng/basespng/basesPngPersonaje/basePerroYor.png",
    l: "/assets/amigurumipng/basespng/basesPngPersonaje/baseGatoL.png",
  };

  const personajesPorBase = {
    TonTon: ["ulon", "inosuke", "doflamingo", "power"],
    Kiki: ["itadori", "kakashi", "izuku", "ichigo"],
    Kuma: ["goyo", "roshi", "jiraija", "shoto"],
    Maru: ["krilin", "tanjiro", "gara", "denji", "yor"],
    Shiro: ["goku", "nezuko", "naruto", "sakura", "levi"],
    Mochi: ["anya", "zenitsu", "bills", "luna", "l"],
  };

  let imagenOriginal = "";
  let productoSeleccionado = ""; // global
  let personajeValido = false;

  // Al hacer clic en "Elegir"

  elegirBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".product-card");
      const name = card.getAttribute("data-name");
      const img = card.getAttribute("data-img");

      modalImg.src = img;
      modalName.value = name;
      modalDesc.value = "";
      imagenOriginal = img;
      productoSeleccionado = name; // guardar producto
      personajeValido = false; // reiniciar validación

      document
        .querySelectorAll(".btn-size")
        .forEach((b) => b.classList.remove("active"));
      empaqueCheckbox.checked = false;
      precioFinal.textContent = "$ 0";
    });
  });

  // Botón "Personalizar" con transición
  document.querySelector(".btn-generar").addEventListener("click", () => {
    const texto = modalDesc.value.toLowerCase().trim();
    
    // Validar que haya producto y texto
    if (!productoSeleccionado || texto === "") {
      Swal.fire({
      imageUrl: '../assets/amigurumipng/basespng/amigurumiErrorChopper.png',
      imageWidth: 200,  // Adjust the size 
      imageHeight: 300,
      title: "❌ Faltan datos",
      text: "Por favor selecciona un amigurumi y escribe una descripción.",
      confirmButtonText: '<span class="custom-swal-btn">Aceptar</span>',
      });
      return;
    }
    
    const posiblesPersonajes = personajesPorBase[productoSeleccionado] || [];
    personajeValido = false; // reiniciar antes de verificar
    for (let personaje of posiblesPersonajes) {
      if (texto.includes(personaje)) {
        modalImg.classList.add("fade-out");
        
        setTimeout(() => {
          modalImg.src = personajes[personaje];
          modalImg.classList.remove("fade-out");
          modalImg.classList.add("fade-in");

          setTimeout(() => {
            modalImg.classList.remove("fade-in");
          }, 400);
        }, 300);

        personajeValido = true;
        break;
      }
    }

    if (!personajeValido) {
      Swal.fire({
        imageUrl: '../assets/amigurumipng/basespng/amigurumiErrorChopper.png',
        imageWidth: 200,  // Adjust the size 
        imageHeight: 300,
        title: '❌ Personaje no reconocido',
        text: 'Se mantendrá la imagen original.',
        timer: 4000,
        confirmButtonText: '<span class="custom-swal-btn">Entendido</span>',
      });
      modalImg.src = imagenOriginal;
    }
  });


  // Actualizar precio total
  function actualizarPrecio() {
    const tamañoActivo = document.querySelector(".btn-size.active");
    const precioBase = tamañoActivo ? parseInt(tamañoActivo.dataset.precio) : 0;
    const extraEmpaque = empaqueCheckbox.checked ? 15000 : 0;
    const total = precioBase + extraEmpaque;
    precioFinal.textContent = `$ ${total.toLocaleString()}`;
  }

  // Selección de tamaño
  const sizeButtons = document.querySelectorAll(".btn-size");
  sizeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      sizeButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      actualizarPrecio();
    });
  });

  // Cambio en checkbox de empaque
  empaqueCheckbox.addEventListener("change", actualizarPrecio);

  // Añadir al pedido
  document.querySelector(".btn-submit").addEventListener("click", () => {
    if (!personajeValido) {
      Swal.fire({
        imageUrl: '../assets/amigurumipng/basespng/amigurumiErrorChopper.png',
        imageWidth: 200,  // Adjust the size 
        imageHeight: 300,
        title: "❌ Falta generar el personaje",
        text: "Por favor personaliza el amigurumi antes de añadirlo al pedido.",
        confirmButtonText: '<span class="custom-swal-btn">Aceptar</span>',
      });
      return;
    }
    // Aquí puedes poner la lógica para añadir al carrito si es necesario
  });

  // Utilidad para obtener y actualizar el carrito en localStorage
  function getCarrito() {
    return JSON.parse(localStorage.getItem('carrito')) || [];
  }

  function setCarrito(carrito) {
    localStorage.setItem('carrito', JSON.stringify(carrito));
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

 

  function setupCarritoBtns() {
    // Asegura que el evento se agregue siempre a los botones actuales
    document.querySelectorAll('.btn-submit').forEach(btn => {
      btn.onclick = function() {
        const modal = btn.closest('.modal-content');
        const nombre = modal.querySelector('.modal-name').value;
        const descripcion = modal.querySelector('.modal-desc').value;
        const tamañoBtn = modal.querySelector('.btn-size.active');
        const tamaño = tamañoBtn ? tamañoBtn.dataset.size : '';
        const precio = tamañoBtn ? tamañoBtn.dataset.precio : '0';
        const empaque = modal.querySelector('#empaqueEspecial').checked;
        const img = modal.querySelector('.modal-img').src;
        // Validar que haya nombre, tamaño y descripción personalizada
        if (!nombre || !tamaño || !descripcion.trim()) {
          if (window.Swal) {
            Swal.fire({
              // Anadir alerta personalizada
              imageUrl: '../assets/amigurumipng/basespng/amigurumiErrorChopper.png',
              imageWidth: 200,  // Adjust the size 
              imageHeight: 300,
              title: "❌ Falta eligir el tamaño",
              text: "Por favor elige un tamaño antes de añadirlo al pedido.",
              confirmButtonText: '<span class="custom-swal-btn">Aceptar</span>',
            });
          }
          return;
        }
        const producto = {
          nombre,
          descripcion,
          tamaño,
          precio: parseInt(precio),
          empaque,
          img
        };
        const carrito = getCarrito();
        carrito.push(producto);
        setCarrito(carrito);
        actualizarContadorCarrito();
        document.querySelector('#amigurumiModal .btn-close').click();
        // Mostrar alerta de éxito personalizada
        const nombreSwal = modal.querySelector('.modal-name').value;
        const descripcionSwal = modal.querySelector('.modal-desc').value;
        const tamañoSwal = modal.querySelector('.btn-size.active')?.textContent || 'No seleccionado';
        const empaqueSwal = modal.querySelector('#empaqueEspecial').checked ? 'Sí' : 'No';
        const precioSwal = document.getElementById('precioFinal').textContent;
        Swal.fire({
          // imageUrl: '../assets/amigurumipng/basespng/amigurumiSuccessHappy.png',
          imageUrl: img,
          imageHeight: 300,
          title: '✅ Pedido añadido',
          html: `
            <p><strong>Nombre:</strong> ${nombreSwal}</p>
            <p><strong>Tamaño:</strong> ${tamañoSwal}</p>
            <p><strong>Empaque:</strong> ${empaqueSwal}</p>
            <p><strong>Precio:</strong> ${precioSwal}</p>
            <p><strong>Descripción:</strong> ${descripcionSwal}</p>
          `,
          confirmButtonText: '<span class="custom-swal-btn">Aceptar</span>'
        });
      }
    });
  }

  // Reasignar eventos cada vez que se abre el modal
  const observer = new MutationObserver(() => {
    setupCarritoBtns();
  });
  observer.observe(document.body, { childList: true, subtree: true });

  document.addEventListener('DOMContentLoaded', () => {
    actualizarContadorCarrito();
    setupCarritoBtns();
  });
});
