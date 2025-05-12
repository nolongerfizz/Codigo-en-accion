// Decode JWT from Google
function handleCredentialResponse(response) {
    const data = jwt_decode(response.credential);
  
    // Debug
    console.log("GOOGLE USER:", data);
  
    // Save to localStorage
    localStorage.setItem("googleUser", JSON.stringify(data));
  
    // Optional alert or redirect
    alert(`¡Bienvenido, ${data.name}! (${data.email})`);
    // window.location.href = "/home.html"; // Uncomment to redirect
  }
  
  // Load Google One Tap and button
  window.onload = function () {
    google.accounts.id.initialize({
      client_id: "80646318170-t4eg0ktde3diu3l04n8gnr6p0pnedaem.apps.googleusercontent.com", // ← real client ID
      callback: handleCredentialResponse
    });
  
    google.accounts.id.renderButton(
      document.getElementById("google-signin-btn"),
      {
        theme: "outline",
        size: "large",
        text: "signup_with",
        shape: "rectangular"
      }
    );
  };
  