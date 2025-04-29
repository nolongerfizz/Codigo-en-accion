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
        })
        .catch(error => {
            console.error(error);
        });
}

// Cargar el header y activar el botón toggle
loadComponent("header", "/components/header.html", function () {
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
});

// Cargar el footer
loadComponent("footer", "/components/footer.html");
