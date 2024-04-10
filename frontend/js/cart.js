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
        const { kosar_nev, kosar_ar, kosar_darab, kosar_termek_id, kep_url } = item;

        const productDetails = await fetchProductDetails(kosar_termek_id);

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${kosar_nev}</td>
            <td><img src="${kep_url}" alt="${kosar_nev}" title="${kosar_nev}" class="product-thumbnail"></td>
            <td>${kosar_ar} Ft</td>
            <td>${kosar_darab}</td>
            <td><button class="removeButton">Eltávolítás</button></td>
        `;
        cartItemsContainer.appendChild(row);

        const removeButton = row.querySelector('.removeButton');
        removeButton.addEventListener('click', () => {
            removeCartItem(item, row);
        });
    }
    totalPriceElement.textContent = calculateTotalPrice(cartItems);
};

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

async function removeCartItem(item, row) {
    try {
        const response = await fetch('/api/kosar/remove', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ kosar_id: item.kosar_id }),
        });

        if (!response.ok) {
            throw new Error('Failed to remove item from the cart');
        }

        if (row) {
            row.remove();
        }

        const cartResponse = await fetch('/api/kosar');
        const cartData = await cartResponse.json();

        updateCartUI(cartData);

    } catch (error) {
        console.error('Error removing item from the cart:', error);
    }
}

function updateCartUI(cartData) {
    const totalPriceElement = document.getElementById('total-price');
    totalPriceElement.textContent = calculateTotalPrice(cartData.cartItems);
}