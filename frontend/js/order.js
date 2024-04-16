document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/api/user', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();

        if (data.success) {
            const userDetails = data.userDetails;
            console.log(userDetails)
            document.getElementById('firstName').value = userDetails.felhasznalo_keresztnev;
            document.getElementById('lastName').value = userDetails.felhasznalo_keresztnev;
            document.getElementById('city').value = userDetails.felhasznalo_varos;
            document.getElementById('zipcode').value = userDetails.felhasznalo_iranyitoszam;
            document.getElementById('address').value = userDetails.felhasznalo_cim;
        } else {
            console.error('Error fetching user details:', data.error);
        }
    } catch (error) {
        console.error('Error fetching user details:', error);
    }
});


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
            alert('Megrendelés sikeresen leadva!');
        } else {
            alert('Megrendelés leadása sikertelen...');
        }
    } catch (error) {
        console.error('Hiba:', error);
        alert('Hiba:', error);
    }
});