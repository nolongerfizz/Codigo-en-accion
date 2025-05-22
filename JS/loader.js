// Función para cargar HTML externo y ejecutar scripts si los hay
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
        if (callback) callback(); // Ejecuta la función después de inyectar
      })
      .catch(error => {
        console.error(error);
      });
  }
  
  // Cargar header y luego su script
  loadComponent("header", "../components/header.html", function () {
    const script = document.createElement("script");
    script.src = "../JS/header_nav.js";
    script.defer = true;
    document.body.appendChild(script);
  });
  
  // Cargar footer
  loadComponent("footer", "../components/footer.html");

  // Hide the loader once the page is fully loaded
  window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    if (loader) {
        loader.style.display = 'none';
    }
  });





