// window.addEventListener("DOMContentLoaded", () => {
//     const urlParams = new URLSearchParams(window.location.search);
//     const productId = window.location.pathname.split('/').pop();

//     if (productId) {
//         fetch(`http://localhost:8000/api/products/${productId}`)
//             .then(response => {
//                 if (!response.ok) {
//                     throw new Error(`HTTP error! Status: ${response.status}`);
//                 }
//                 return response.json();
//             })
//             .then(data => {
//                 const productDetails = document.querySelector(".details");
//                 const product = data.product;

//                 const productHTML = `
//                     <div class="left image-container">
//                         <div class="main" id="termek-kep">
//                             <img src="${product.kep_url1}" alt="${product.termek_nev}" style="width: 100%;">
//                         </div>
//                     </div>
//                     <div class="right">
//                         <span>${product.kategoria_nev}</span>
//                         <h1>${product.termek_nev}</h1>
//                         <div class="price">${product.termek_ar} Ft</div>
//                         <form class="form">
//                             <input type="text" placeholder="1" />
//                             <a href="cart.html" class="addCart">Kosárba</a>
//                         </form>
//                         <h3>Termék részletei</h3>
//                         <p>${product.termek_leiras}</p>
//                     </div>
//                 `;

//                 productDetails.innerHTML = productHTML;
//             })
            
//             .catch(error => console.error("Error fetching product details:", error));
//     } else {
//         console.error("Product ID not found in the URL");
//     }
// });
window.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = window.location.pathname.split('/').pop();

    if (productId) {
        // Fetch the main product details
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
                            <img src="${product.kep_url1}" alt="${product.termek_nev}" style="width: 100%;">
                        </div>
                    </div>
                    <div class="right">
                        <span>${product.kategoria_nev}</span>
                        <h1>${product.termek_nev}</h1>
                        <div class="price">${product.termek_ar} Ft</div>
                        <form class="form">
                            <input type="text" placeholder="1" />
                            <a href="cart.html" class="addCart">Kosárba</a>
                        </form>
                        <h3>Termék részletei</h3>
                        <p>${product.termek_leiras}</p>
                    </div>
                `;

                productDetails.innerHTML = productHTML;

                // Fetch related products
                fetch(`http://localhost:8000/api/related-products/${productId}`)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(`HTTP error! Status: ${response.status}`);
                        }
                        return response.json();
                    })
                    .then(data => {
                        const relatedProductsContainer = document.querySelector(".product-center");

                        // Display related products
                        data.relatedProducts.forEach(relatedProduct => {
                            const relatedProductItem = document.createElement("div");
                            relatedProductItem.className = 'product-item';

                            relatedProductItem.innerHTML = `
                                <div class="overlay">
                                    <a href="/products/${relatedProduct.termek_id}" class="product-thumb">
                                        <img src="${relatedProduct.kep_url1}" alt="${relatedProduct.termek_nev}">
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
                    })
                    .catch(error => console.error("Error fetching related products:", error));
            })
            .catch(error => console.error("Error fetching product details:", error));
    } else {
        console.error("Product ID not found in the URL");
    }
});
