document.getElementById('orderForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const deliveryDetails = {
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        city: formData.get('city'),
        zipcode: formData.get('zipcode'),
        address: formData.get('address'),
        floor: formData.get('floor'),
        door: formData.get('door')
    };

    try {
        const response = await fetch('/api/order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(deliveryDetails)
        });

        const data = await response.json();

        if (data.success) {
            alert('Order placed successfully');
        } else {
            alert('Error placing order');
        }
    } catch (error) {
        console.error('Error placing order:', error);
        alert('Error placing order');
    }
});
