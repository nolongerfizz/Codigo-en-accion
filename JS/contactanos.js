document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
  
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
  
      const formMessages = document.getElementById('form-messages');
      formMessages.innerHTML = ''; // Limpiar mensajes anteriores
  
      try {
        const response = await fetch(form.action, {
          method: 'POST',
          headers: {
            'Accept': 'application/json'
          },
          body: new FormData(form)
        });
  
        if (response.ok) {
          formMessages.innerHTML = `
            <p class="success">
              ✨ ¡Gracias por tu mensaje! Nos pondremos en contacto contigo muy pronto 💌
            </p>
          `;
          form.reset(); // Limpiar formulario
        } else {
          formMessages.innerHTML = `
            <p class="error">Ocurrió un error al enviar. Intenta nuevamente.</p>
          `;
        }
      } catch (error) {
        formMessages.innerHTML = `
          <p class="error">Error de conexión. Por favor intenta más tarde.</p>
        `;
      }
    });
  });
  