const registerBtn = document.getElementById('registerbtn')

registerBtn.onclick = function () {
    try {
        const keresztnev = document.getElementById('registerFirstName').value
        const vezeteknev = document.getElementById('registerLastName').value
        const email = document.getElementById('registerEmail').value
        const jelszo = document.getElementById('registerPsw').value
        
        fetch('http://localhost:8000/regisztracio', {
            method: 'POST',
            headers: { 'Content-type' : 'application/json' },
            body: JSON.stringify({
                keresztnev: keresztnev,
                vezeteknev: vezeteknev,
                email: email,
                jelszo: jelszo
            })
        })
        .then(response => response.json())
    } catch (error) {
        console.log(error)
    }
}
