document.addEventListener('DOMContentLoaded', () => {
    fetchCartItems();
});

const fetchCartItems = async () => {
    try {
        const response = await fetch('/api/kosar', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const result = await response.json();

        if (result.success) {
            displayCartItems(result.cartItems);
        } else {
            console.error('Error fetching cart items:', result.error);
        }
    } catch (error) {
        console.error('Error fetching cart items:', error);
    }
};

const displayCartItems = async (cartItems) => {
    const cartItemsContainer = document.getElementById('cart-items-container');
    const totalPriceElement = document.getElementById('total-price');

    cartItemsContainer.innerHTML = '';

    for (const item of cartItems) {
        const { kosar_nev, kosar_ar, kosar_darab, kosar_termek_id } = item;

        // Move this line up to declare productDetails before accessing it
        const productDetails = await fetchProductDetails(kosar_termek_id);
        const kep_url = productDetails ? productDetails.kep_url : '';

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${kosar_nev}</td>
            <td>${kep_url}</td>
            <td>${kosar_ar} Ft</td>
            <td>${kosar_darab}</td>
            <td><a href="#">Eltávolítás</a></td>
        `;
        cartItemsContainer.appendChild(row);
    }
    totalPriceElement.textContent = calculateTotalPrice(cartItems);
};

//<td>${productDetails ? `<img src="${productDetails.kep_url}" alt="${kosar_nev}" title="${kosar_nev}" class="product-thumbnail">` : ''}</td>
const fetchProductDetails = async (termekId) => {
    try {
        const response = await fetch(`/api/products/${termekId}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const result = await response.json();

        console.log('Fetch Product Details Result:', result);

        return result.success ? result.product : null;
    } catch (error) {
        console.error('Error fetching product details:', error);
        return null;
    }
};

const calculateTotalPrice = (cartItems) => {
    const totalPrice = cartItems.reduce((total, item) => {
        const itemPrice = parseFloat(item.kosar_ar) * parseFloat(item.kosar_darab);
        return total + itemPrice;
    }, 0);

    return `${totalPrice} Ft`;
};