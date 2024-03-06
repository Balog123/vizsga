window.addEventListener("DOMContentLoaded", () => {
    const sortSelect = document.getElementById("sortSelect");
    const productList = document.querySelector(".product-center");

    const fetchProducts = (sortOrder) => {
        const apiUrl = `http://localhost:8000/api/products?sortOrder=${sortOrder}`;

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                productList.innerHTML = "";

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
    };

    sortSelect.addEventListener("change", () => {
        const selectedSortOrder = sortSelect.value;
        fetchProducts(selectedSortOrder);
    });

    fetchProducts(0);
});