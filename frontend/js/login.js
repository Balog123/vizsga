const loginBtn = document.getElementById('loginbtn');

loginBtn.onclick = function () {
    const email = document.getElementById('loginEmail').value;
    const jelszo = document.getElementById('loginPsw').value;

    fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
            email: email,
            jelszo: jelszo
        })
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                if (data.data.isAdmin === true) {
                    window.location.href = '/admin';
                } else {
                    window.location.href = '/';
                }
            } else {
                document.getElementById('sikeres-bejelentkezes-uzenet').innerText = 'Sikertelen bejelentkezés. Kérlek próbáld újra.';
            }
        });
};
