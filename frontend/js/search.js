document.addEventListener('DOMContentLoaded', () => {
    const resultContainer = document.getElementById('searchResults');

    const urlParams = new URLSearchParams(window.location.search);
    const searchTerm = urlParams.get('query');

    fetchSearchResults(searchTerm);
});

function fetchSearchResults(searchTerm) {
    const apiUrl = `/api/search?query=${encodeURIComponent(searchTerm)}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            displaySearchResults(data.searchResults);
        })
        .catch(error => console.error("Error fetching search results:", error));
}

function displaySearchResults(searchResults) {
    const resultContainer = document.getElementById('searchResults');

    resultContainer.innerHTML = "";

    if (searchResults.length > 0) {
        const productsWrapper = document.createElement('div');
        productsWrapper.className = 'product-center container';

        searchResults.forEach(result => {
            const resultItem = document.createElement('div');
            resultItem.className = 'product-item';

            resultItem.innerHTML = `
                <div class="overlay" id="termek-info">
                    <a href="/products/${result.termek_id}" class="product-thumb">
                        <img src="${result.kep_url}" alt="${result.termek_nev}">
                    </a>
                </div>
                <div class="product-info">
                    <span><a href="/products/${result.termek_id}">${result.termek_nev}</a></span>
                    <h4>${result.termek_ar} Ft</h4>
                </div>
                <ul class="icons">
                    <li><i class="bx bx-heart"></i></li>
                    <li><a href="/products/${result.termek_id}"><i class="bx bx-search"></i></a></li>
                    <li><span class="addToCartBtn" data-product-id="${result.termek_id}"><i class="bx bx-cart"></i></span></li>
                </ul>
            `;

            productsWrapper.appendChild(resultItem);
        });

        resultContainer.appendChild(productsWrapper);

        attachAddToCartEventListeners();
    } else {
        resultContainer.innerHTML = '<p class="noProductFound">A keresett termékre nincs találat...</p>';
    }
}


function attachAddToCartEventListeners() {
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
}

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
