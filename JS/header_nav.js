function loadComponent(id, url, callback) {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error al cargar ${url}`);
            }
            return response.text();
        })
        .then(html => {
            document.getElementById(id).innerHTML = html;
            if (callback) callback(); // Ejecuta después de insertar el HTML

            // Check if user is logged in and update header
            if (id === "header") {
                updateHeaderForLoggedUser();
            }
        })
        .catch(error => {
            console.error(error);
        });
}

function updateHeaderForLoggedUser() {
    const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));

    if (usuarioActivo) {
        // Ocultar links de login y registro
        const loginLink = document.querySelector(".login");
        const registerLink = document.querySelector(".link_register");
        const responsiveLinks = document.querySelectorAll(".menu-responsive-links a");

        if (loginLink) loginLink.style.display = "none";
        if (registerLink) registerLink.style.display = "none";

        // Ocultar del menú responsive
        responsiveLinks.forEach(link => {
            if (link.href.includes("register") || link.href.includes("login")) {
                link.style.display = "none";
            }
        });

        // mostrar  o botón de "Cerrar sesión"
        const iconsDiv = document.querySelector(".icons");
        if (iconsDiv) {
            const logoutBtn = document.createElement("a");
            logoutBtn.href = "#";
            logoutBtn.classList.add("login"); // same style as 'Inicia sesión'
            logoutBtn.innerHTML = `
            <i class="fa fa-sign-out-alt"></i>
            <span>Cerrar sesión</span>
            `;
            logoutBtn.addEventListener("click", () => {
                localStorage.removeItem("usuarioActivo");
                window.location.reload();
            });
            iconsDiv.appendChild(logoutBtn);
        }
    }
}

function actualizarContadorCarritoHeader() {
  // Obtiene el carrito del localStorage
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
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

// Cargar el header y activar el botón toggle
loadComponent("header", "../components/header.html", function () {
    const menuToggle = document.getElementById('menu-toggle');
    const responsiveMenu = document.getElementById('responsive-menu');

    if (menuToggle && responsiveMenu) {
        menuToggle.addEventListener('click', function () {
            responsiveMenu.classList.toggle('active');
        });

        window.addEventListener('resize', function () {
            if (window.innerWidth > 768) {
                responsiveMenu.classList.remove('active');
            }
        });
    }
    // Mostrar el contador del carrito en el header después de cargarlo
    actualizarContadorCarritoHeader();
    // Escuchar cambios en el storage para actualizar el contador en tiempo real
    window.addEventListener('storage', function(e) {
      if (e.key === 'carrito') actualizarContadorCarritoHeader();
    });
});

// Cargar el footer
loadComponent("footer", "/components/footer.html");
