const loginBtn = document.getElementById('loginbtn');

loginBtn.onclick = function () {
    const email = document.getElementById('loginEmail').value;
    const jelszo = document.getElementById('loginPsw').value;

    if (!email || !jelszo) {
        document.getElementById('sikeres-bejelentkezes-uzenet').innerText = 'Minden mezőt ki kell tölteni!';
        return;
    }

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
                document.getElementById('sikeres-bejelentkezes-uzenet').innerText = 'Rossz email cím vagy jelszó';
            }
        });
};

document.getElementById("cancelbtn").addEventListener("click", function () {
    window.location.href = "/";
});
