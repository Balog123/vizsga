window.addEventListener("DOMContentLoaded", () => {
    fetch("http://localhost:8000/api/products")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {

            const productList = document.querySelector(".product-center");

            data.products.forEach(product => {
                const listItem = document.createElement("div");
                listItem.className = 'product-item';

                listItem.innerHTML = `
                    <div class="overlay" id="termek-info">
                        <a href="/products/${product.termek_id}" class="product-thumb">
                            <img src="${product.kep_url}" alt="${product.termek_nev}">
                        </a>
                    </div>
                    <div class="product-info">
                        <span><a href="/products/${product.termek_id}">${product.termek_nev}</a></span>
                        <a>${product.termek_leiras}</a>
                        <h4>${product.termek_ar}</h4>
                    </div>
                    <ul class="icons">
                        <li><i class="bx bx-heart"></i></li>
                        <li><a href="/products/${product.termek_id}"><i class="bx bx-search"></a></i></li>
                        <li><i class="bx bx-cart"></i></li>
                    </ul>
                `;

                productList.appendChild(listItem);
            });
        })
        .catch(error => console.error("Error fetching products:", error));
});