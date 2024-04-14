const registerBtn = document.querySelector('#registerbtn');

registerBtn.onclick = async function () {
    try {
        const keresztnev = document.querySelector('#registerFirstName').value.trim();
        const vezeteknev = document.querySelector('#registerLastName').value.trim();
        const email = document.querySelector('#registerEmail').value.trim();
        const jelszo = document.querySelector('#registerPsw').value.trim();

        if (!keresztnev || !vezeteknev || !email || !jelszo) {
            throw new Error('Kérjük, töltsön ki minden mezőt');
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new Error('Helytelen email formátum');
        }


        document.querySelector('#registerFirstName').value = '';
        document.querySelector('#registerLastName').value = '';
        document.querySelector('#registerEmail').value = '';
        document.querySelector('#registerPsw').value = '';

        const response = await fetch('http://localhost:8000/api/registration', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                keresztnev: keresztnev,
                vezeteknev: vezeteknev,
                email: email,
                jelszo: jelszo
            })
        });

        const data = await response.json();

        if (data.success) {
            window.location.href = '/bejelentkezes';
        } else {
            document.getElementById('sikertelen-reg').innerHTML = data.error || 'a';
        }
    } catch (error) {
        console.log('Hiba történt:', error);
        document.getElementById('sikertelen-reg').innerHTML = error.message || 'Internal Server Error';
    }
};

document.getElementById("cancelbtn").addEventListener("click", function () {
    window.location.href = "/";
});