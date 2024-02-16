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
            if (data.response.isAdmin === true) {
                window.location.href = '/admin';
            } else {
                document.getElementById('sikeres-bejelentkezes-uzenet').innerText = `Sikeres bejelentkezés, Üdv ${data.data.keresztnev}!`;
            }
        } else {
            document.getElementById('sikeres-bejelentkezes-uzenet').innerText = 'Sikertelen bejelentkezés. Kérlek próbáld újra.';
        }
    })
}