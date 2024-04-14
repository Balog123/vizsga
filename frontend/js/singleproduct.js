window.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
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
                const productDetails = document.querySelector(".details");
                const product = data.product;

                const productHTML = `
                    <div class="left image-container">
                        <div class="main" id="termek-kep">
                            <img src="${product.kep_url}" alt="${product.termek_nev}" style="width: 100%;">
                        </div>
                    </div>
                    <div class="right">
                        <span>Termékek -> ${product.termek_kategoria}</span>
                        <h1>${product.termek_nev}</h1>
                        <div class="price">Ár: ${product.termek_ar} Ft</div>
                        <form class="form">
                            <input type="text" id="darab" value="1" />
                            <button type="submit" id="addToCartBtn" class="addCart">Kosárba</button>
                        </form>
                        <h4>Raktáron: ${product.termek_raktaron} db <span id="termek_nincs_raktaron"></span><span id="cartMessage"></span></h4>
                        <h2>Termék részletei</h2>
                        <p>${product.termek_leiras}</p>
                    </div>
                `;

                productDetails.innerHTML = productHTML;

                const errorMessageElement = document.getElementById("termek_nincs_raktaron");
                const cartMessageElement = document.getElementById("cartMessage");

                document.getElementById("addToCartBtn").addEventListener("click", function (event) {
                    event.preventDefault();

                    const darab = document.getElementById('darab').value;

                    if (!darab || darab <= 0) {
                        errorMessageElement.textContent = "Érvénytelen darabszám!";
                        return;
                    }

                    if (darab > product.termek_raktaron) {
                        errorMessageElement.textContent = "Nincs elegendő darab a kosárba helyezéshez!";
                        return;
                    }

                    addToCart(productId, darab);
                });

                function addToCart(productId, darab) {
                    fetch('http://localhost:8000/api/kosar', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            productId: productId,
                            darab: darab,
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
                            cartMessageElement.textContent = "Termék sikeresen hozzáadva a kosárhoz!";
                            cartMessageElement.classList.add("visible");
                            console.log('Termék sikeresen hozzáadva a kosárhoz:', data);
                        })
                        .catch(error => {
                            console.error('Hiba történt a kosár API hívásakor:', error);
                        });
                }

                fetch(`http://localhost:8000/api/related-products/${productId}`)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(`HTTP error! Status: ${response.status}`);
                        }
                        return response.json();
                    })
                    .then(data => {
                        const relatedProductsContainer = document.querySelector(".product-center");

                        if (data.relatedProducts.length === 0) {
                            relatedProductsContainer.innerHTML = '<p class="no-related-products">Nem található ehhez hasonló termék</p>';
                        } else {
                            data.relatedProducts.forEach(relatedProduct => {
                                const relatedProductItem = document.createElement("div");
                                relatedProductItem.className = 'product-item';

                                relatedProductItem.innerHTML = `
                                    <div class="overlay">
                                        <a href="/products/${relatedProduct.termek_id}" class="product-thumb">
                                            <img src="${relatedProduct.kep_url}" alt="${relatedProduct.termek_nev}">
                                        </a>
                                    </div>
                                    <div class="product-info">
                                        <span><a href="/products/${relatedProduct.termek_id}">${relatedProduct.termek_nev}</a></span>
                                        <h4>${relatedProduct.termek_ar} Ft</h4>
                                    </div>
                                    <ul class="icons">
                                        <li><i class="bx bx-heart"></i></li>
                                        <li><a href="/products/${relatedProduct.termek_id}"><i class="bx bx-search"></a></i></li>
                                        <li><span class="addToCartBtn" data-product-id="${relatedProduct.termek_id}"><i class="bx bx-cart"></i></span></li>
                                    </ul>
                                `;

                                relatedProductsContainer.appendChild(relatedProductItem);
                            });
                        }

                        document.querySelectorAll(".addToCartBtn").forEach(button => {
                            button.addEventListener("click", function (event) {
                                event.preventDefault();

                                const productId = this.getAttribute("data-product-id");

                                fetch('http://localhost:8000/api/kosar', {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify({
                                        productId: productId,
                                        darab: 1
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
                    .catch(error => console.error("Related prodcuts fetch hiba:", error));
            })
            .catch(error => console.error("Product details fetch hiba:", error));
    } else {
        console.error("Nem található ID");
    }
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