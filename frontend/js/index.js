const registerBtn = document.getElementById('registerbtn')

registerBtn.onclick = function () {
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
}



const loginBtn = document.getElementById('loginbtn')

loginBtn.onclick = function () {
    const email = document.getElementById('loginEmail').value
    const jelszo = document.getElementById('loginPsw').value

    fetch('http://localhost:8000/bejelentkezes', {
        method: 'POST',
        headers: { 'Content-type' : 'application/json' },
        body: JSON.stringify({
            email: email,
            jelszo: jelszo
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            document.getElementById('sikeres-bejelentkezes-uzenet').innerText = `Sikeres bejelentkezés, Üdv ${data.data.keresztnev}!`
        } else {
            document.getElementById('sikeres-bejelentkezes-uzenet').innerText = 'Sikertelen bejelentkezés. Kérlek próbáld újra.'
        }
    })
}

