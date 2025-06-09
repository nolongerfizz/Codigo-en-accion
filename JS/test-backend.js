// JS/test-backend.js
fetch('https://mbhybiq34m.us-east-1.awsapprunner.com')
  .then(response => response.text())
  .then(data => {
    console.log('Respuesta del backend:', data);
  })
  .catch(error => {
    console.error('Error al conectar con el backend:', error);
  });