window.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    // const productId = urlParams.get('id');
    
    // Get the last part of the pathname (which should be the product ID)
    const productId = window.location.pathname.split('/').pop();

    if (productId) {
        fetch(`http://localhost:8000/api/products/${productId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                const productDetails = document.getElementById("productDetails");
                const product = data.product;

                const productHTML = `
                    <h2>${product.termek_nev}</h2>
                    <img src="${product.kep_url1}" alt="${product.termek_nev}" style="width: 300px;">
                    <p>${product.termek_leiras}</p>
                    <p>Ár: ${product.termek_ar} Ft</p>
                `;

                productDetails.innerHTML = productHTML;
            })
            .catch(error => console.error("Error fetching product details:", error));
    } else {
        console.error("Product ID not found in the URL");
    }
});
