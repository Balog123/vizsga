const registerBtn = document.querySelector('#registerbtn')

registerBtn.onclick = function () {
    try {
        const keresztnev = document.querySelector('#registerFirstName').value
        const vezeteknev = document.querySelector('#registerLastName').value
        const email = document.querySelector('#registerEmail').value
        const jelszo = document.querySelector('#registerPsw').value

        document.querySelector('#registerFirstName').value = ""
        document.querySelector('#registerLastName').value = ""
        document.querySelector('#registerEmail').value = ""
        document.querySelector('#registerPsw').value = ""
        document.querySelector('#registerPswRepeat').value = ""
        
        fetch('http://localhost:8000/regisztracio', {
            method: 'POST',
            headers: { 'Content-type' : 'application/json' },
            //headers: { 'Content-type': 'application/x-www-form-urlencoded' },
            body: JSON.stringify({
                keresztnev: keresztnev.value,
                vezeteknev: vezeteknev.value,
                email: email.value,
                jelszo: jelszo.value
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('A szerver hibát adott vissza');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
           /* if (data.success) {
                window.location.href = '/bejelentkezes';
            } else {
                document.getElementById('sikertelen-reg').innerText = 'Ez a felhasználó már regisztrálva van.';
            }*/
        })
        .catch(error => {
            console.log('Hiba történt:', error);
        });
        /*.then(response => response.json())
        .then(data => {
            console.log(data)
            if (data.success) {
                window.location.href = '/bejelentkezes'
            } else {
                document.getElementById('sikertelen-reg').innerText = 'Ez a felhasználó már regisztrálva van.'
            }
        })*/
    } catch (error) {
        console.log(error)
    }
}