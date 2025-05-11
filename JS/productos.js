// Seleccionar el id del container 
const productosContainer = document.querySelector('.productos-container');

// Load products from localStorage
const products = JSON.parse(localStorage.getItem('products')) || [];

// Generate product cards dynamically
products.forEach((product) => {
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');

    // Format the price with a thousands separator
    const formattedPrice = product.price.toLocaleString('es-CO');

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
    l: "/assets/amigurumipng/basespng/basesPngPersonaje/L_gato.png",
    itadori: "/assets/amigurumipng/basespng/basesPngPersonaje/itadori_gato.png",
    inosuke: "/assets/amigurumipng/basespng/basesPngPersonaje/inosuke_cerdo.png",
    krilin: "/assets/amigurumipng/basespng/basesPngPersonaje/krilin_perro.png",
    luffy: "/assets/amigurumipng/basespng/basesPngPersonaje/Luffy_perro.png",
    tanjiro: "/assets/amigurumipng/basespng/basesPngPersonaje/tanjiro_perro.png",
    gara:"/assets/amigurumipng/basespng/basesPngPersonaje/gara_perro.png",
    kakashi: "/assets/amigurumipng/basespng/basesPngPersonaje/kakashi_mono.png",
    luna: "/assets/amigurumipng/basespng/basesPngPersonaje/gato_luna.png",
    maestroroshi: "/assets/amigurumipng/basespng/basesPngPersonaje/maestro_roshi_oso.png",
    jiraija: "/assets/amigurumipng/basespng/basesPngPersonaje/jiraija_oso.png",
    bills: "/assets/amigurumipng/basespng/basesPngPersonaje/bills_gato.png"
  };

  let imagenOriginal = "";

  // Al hacer clic en "Elegir"
  elegirBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".product-card");
      const name = card.getAttribute("data-name");
      const img = card.getAttribute("data-img");

      modalImg.src = img;
      modalName.value = name;
      modalDesc.value = "";
      imagenOriginal = img;

      document.querySelectorAll(".btn-size").forEach(b => b.classList.remove("active"));
      empaqueCheckbox.checked = false;
      precioFinal.textContent = "$ 0";
    });
  });

  // Botón "Personalizar" con transición
  document.querySelector(".btn-generar").addEventListener("click", () => {
    const texto = modalDesc.value.toLowerCase();
    let encontrado = false;

    for (let personaje in personajes) {
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

        encontrado = true;
        break;
      }
    }

    if (!encontrado) {
      alert("No se reconoció ningún personaje. Se mantiene la imagen original.");
      modalImg.src = imagenOriginal;
    }
  });

  // Actualizar precio total
  function actualizarPrecio() {
    const tamañoActivo = document.querySelector(".btn-size.active");
    const precioBase = tamañoActivo ? parseInt(tamañoActivo.dataset.precio) : 0;
    const extraEmpaque = empaqueCheckbox.checked ? 5000 : 0;
    const total = precioBase + extraEmpaque;
    precioFinal.textContent = `$ ${total.toLocaleString()}`;
  }

  // Selección de tamaño
  const sizeButtons = document.querySelectorAll(".btn-size");
  sizeButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      sizeButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      actualizarPrecio();
    });
  });

  // Cambio en checkbox de empaque
  empaqueCheckbox.addEventListener("change", actualizarPrecio);

  // Añadir al pedido
  document.querySelector(".btn-submit").addEventListener("click", () => {
    const nombre = modalName.value;
    const descripcion = modalDesc.value;
    const tamaño = document.querySelector(".btn-size.active")?.textContent || "No seleccionado";
    const empaque = empaqueCheckbox.checked ? "Sí" : "No";
    const precio = precioFinal.textContent;

    alert(`✅ Pedido añadido:\nNombre: ${nombre}\nTamaño: ${tamaño}\nEmpaque: ${empaque}\nPrecio: ${precio}\nDescripción: ${descripcion}`);
  });
});
