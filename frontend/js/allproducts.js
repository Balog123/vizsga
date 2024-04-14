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
                            <h4>${product.termek_ar} Ft</h4>
                        </div>
                        <ul class="icons">
                            <li><i class="bx bx-heart"></i></li>
                            <li><a href="/products/${product.termek_id}"><i class="bx bx-search"></a></i></li>
                            <li><span class="addToCartBtn" data-product-id="${product.termek_id}"><i class="bx bx-cart"></i></span></li>
                        </ul>
                    `;

                    productList.appendChild(listItem);
                });

                document.querySelectorAll(".addToCartBtn").forEach(button => {
                    button.addEventListener("click", function(event) {
                        event.preventDefault();
                        
                        const productId = this.getAttribute("data-product-id");

                        fetch('http://localhost:8000/api/kosar', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                productId: productId,
                                darab: 1,
                                userId: getUserId()
                            }),
                        })
                        .then(response => {
                            if (!response.ok) {
                                throw new Error(`HTTP error! Status: ${response.status}`);
                            }
                            return response.json();
                        })
                        .then(data => {
                            console.log('Termék sikeresen hozzáadva a kosárhoz:', data);
                        })
                        .catch(error => {
                            console.error('Hiba történt a kosár API hívásakor:', error);
                        });
                    });
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

function getUserId() {
    const cookies = document.cookie.split(';');
    let userId = null;

    cookies.forEach(cookie => {
        const [name, value] = cookie.split('=');
        if (name.trim() === 'userId') {
            userId = value;
        }
    });

    return userId;
}