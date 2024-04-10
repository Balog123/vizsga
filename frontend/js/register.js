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
        
        fetch('http://localhost:8000/api/registration', {
            method: 'POST',
            headers: { 'Content-type' : 'application/json' },
            body: JSON.stringify({
                keresztnev: keresztnev,
                vezeteknev: vezeteknev,
                email: email,
                jelszo: jelszo
            })
        })
        .then(response => {
            return response.json()
        })
        .then(data => {
            console.log(data)
            if (data.success) {
                window.location.href = '/bejelentkezes';
            } else {
                document.getElementById('sikertelen-reg').innerHTML = 'Ez a felhasználó már regisztrálva van.'
            }
        })
        .catch(error => {
            console.log('Hiba történt:', error)
        });
    } catch (error) {
        console.log(error)
    }
}