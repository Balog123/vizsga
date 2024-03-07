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
                        <span>${product.termek_kategoria}</span>
                        <h1>${product.termek_nev}</h1>
                        <div class="price">${product.termek_ar} Ft</div>
                        <form class="form">
                            <input type="text" id="darab" placeholder="1" />
                            <button type="submit" id="addToCartBtn" class="addCart">Kosárba</button>
                        </form>
                        <h3>Termék részletei</h3>
                        <p>${product.termek_leiras}</p>
                    </div>
                `;

                productDetails.innerHTML = productHTML;

                document.getElementById("addToCartBtn").addEventListener("click", function(event) {
                    event.preventDefault();

                    const darab = document.getElementById('darab').value
                    
                    fetch('http://localhost:8000/api/kosar', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            productId: productId,
                            darab: darab
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
                                        <a>${relatedProduct.termek_leiras}</a>
                                        <h4>${relatedProduct.termek_ar} Ft</h4>
                                    </div>
                                    <ul class="icons">
                                        <li><i class="bx bx-heart"></i></li>
                                        <li><a href="/products/${relatedProduct.termek_id}"><i class="bx bx-search"></a></i></li>
                                        <li><i class="bx bx-cart"></i></li>
                                    </ul>
                                `;

                                relatedProductsContainer.appendChild(relatedProductItem);
                            });
                        }
                    })
                    .catch(error => console.error("Error fetching related products:", error));
            })
            .catch(error => console.error("Error fetching product details:", error));
    } else {
        console.error("Product ID not found in the URL");
    }
});
