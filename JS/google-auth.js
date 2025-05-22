function handleCredentialResponse(response) {
  const data = jwt_decode(response.credential);

  const usuario = {
    nombre: data.name,
    correo: data.email,
    imagen: data.picture,
    isGoogleUser: true
  };

  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  const yaRegistrado = usuarios.some(u => u.correo === usuario.correo);

  if (!yaRegistrado) {
    usuarios.push(usuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
  }

  localStorage.setItem("usuarioActivo", JSON.stringify(usuario));

  // ✅ Redirigir automáticamente al home
  window.location.href = "home.html";
}

window.onload = function () {
  google.accounts.id.initialize({
    client_id: "947069495147-elj5eqr5nqal4h25r470jdoa8qih0g35.apps.googleusercontent.com",
    callback: handleCredentialResponse
  });

  google.accounts.id.renderButton(
    document.getElementById("google-signin-btn"),
    {
      theme: "outline",
      size: "large",
      shape: "rectangular",
      text: "signin_with"
    }
  );
};
