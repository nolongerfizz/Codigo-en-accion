// JS/test-backend.js
fetch('http://localhost:8080/api/ping')
  .then(response => response.text())
  .then(data => {
    console.log('Respuesta del backend:', data);
  })
  .catch(error => {
    console.error('Error al conectar con el backend:', error);
  });