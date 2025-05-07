// Seleccionar el id del container 
const productosContainer = document.querySelector('.productos-container');

// Load products from localStorage
const products = JSON.parse(localStorage.getItem('products')) || [];

// Generate product cards dynamically
products.forEach((product) => {
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');

    productCard.innerHTML = `
        <img src="${product.img}" alt="Amigurumi ${product.name}">
        <h3 class="product-name">${product.name}</h3>
        <h5 class="product-price">$ ${product.price}</h5>
        <button type="submit" class="btn-login">Elegir</button>
    `;

    productosContainer.appendChild(productCard);
});