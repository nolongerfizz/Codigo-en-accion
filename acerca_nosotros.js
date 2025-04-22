// Espera a que todo el contenido esté cargado
document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.getElementById('menu-toggle');
    const responsiveMenu = document.getElementById('responsive-menu');
  
    // Alternar visibilidad del menú responsive
    menuToggle.addEventListener('click', function () {
      responsiveMenu.classList.toggle('active');
    });
  });