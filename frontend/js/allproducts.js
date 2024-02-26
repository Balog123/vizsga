window.addEventListener("DOMContentLoaded", () => {
    fetch("http://localhost:8000/api/products")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {

            // const productList = document.getElementById("productList");

            const productCenterDiv = document.querySelector(".product-center");

            data.products.forEach(product => {
                const listItem = document.createElement("li");

                listItem.innerHTML = `
                    <h2><a href="/products/${product.termek_id}">${product.termek_nev}</a></h2>
                    <p>${product.termek_leiras}</p>
                    <p>Price: $${product.termek_ar}</p>
                    <a href="/products/${product.termek_id}">
                        <img src="${product.kep_url1}" alt="${product.termek_nev}" style="width: 300px; height: 300px;">
                    </a>
                `;

                productCenterDiv.appendChild(listItem);
            });
        })
        .catch(error => console.error("Error fetching products:", error));
});
