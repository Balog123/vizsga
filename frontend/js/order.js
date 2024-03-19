document.getElementById('orderForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const deliveryDetails = {
        szallitasi_keresztnev: formData.get('firstName'),
        szallitasi_vezeteknev: formData.get('lastName'),
        szallitasi_varos: formData.get('city'),
        szallitasi_iranyitoszam: formData.get('zipcode'),
        szallitasi_cim: formData.get('address'),
        szallitasi_emelet: formData.get('floor'),
        szallitasi_ajto: formData.get('door')
    };

    try {
        const response = await fetch('/api/order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
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