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
            document.getElementById('felhasznaloVaros').value = userDetails.felhasznalo_varos;
            document.getElementById('felhasznaloIranyitoszam').value = userDetails.felhasznalo_iranyitoszam;
            document.getElementById('felhasznaloCim').value = userDetails.felhasznalo_cim;
        } else {
            console.error('Error fetching user details:', data.error);
        }
    } catch (error) {
        console.error('Error fetching user details:', error);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const saveChangesButton = document.getElementById('saveChangesButton');
    const iranyitoszamRegex = /^\d{4}$/;

    if (saveChangesButton) {
        saveChangesButton.addEventListener('click', () => {
            const felhasznaloVaros = document.getElementById('felhasznaloVaros').value;
            const felhasznaloIranyitoszam = document.getElementById('felhasznaloIranyitoszam').value;
            const felhasznaloCim1 = document.getElementById('felhasznaloCim').value;

            if (!felhasznaloVaros && !felhasznaloIranyitoszam && !felhasznaloCim1) {
                showHibaMessage('Töltsön ki legalább egy mezőt!');
                return;
            }

            if (felhasznaloIranyitoszam && !iranyitoszamRegex.test(felhasznaloIranyitoszam)) {
                showIszMessage('Az Irányítószám 4 számjegyből kell álljon!');
                return;
            }

            const userDetails = {
                felhasznaloVaros,
                felhasznaloIranyitoszam,
                felhasznaloCim1,
            };

            fetch('http://localhost:8000/api/save-user-details', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userDetails),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        console.log('User details saved successfully:', data.result);
                        showSikerMessage('Felhasználói adatok mentése megtörtént');
                    } else {
                        console.error('Error saving user details:', data.error);
                    }
                })
                .catch(error => console.error('Error saving user details:', error));
        });
    }

    const logoutButton = document.getElementById('logoutButton');

    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            fetch('http://localhost:8000/api/logout', {
                method: 'POST',
                credentials: 'include',
            })
                .then(response => {
                    window.location.href = '/';
                })
                .catch(error => console.error('Error during logout:', error));
        });
    }
});

document.getElementById("cancelbtn").addEventListener("click", function () {
    window.location.href = "/";
});

function showHibaMessage(message) {
    const hiba = document.getElementById('adatmodositasHiba');
    hiba.innerText = message;
    hiba.style.display = 'block';

    setTimeout(() => {
        hiba.style.display = 'none';
    }, 5000 );
}

function showSikerMessage(message) {
    const siker = document.getElementById('adatmodositasSiker');
    siker.innerText = message;
    siker.style.display = 'block';

    setTimeout(() => {
        siker.style.display = 'none';
    }, 5000 );
}

function showIszMessage(message) {
    const isz = document.getElementById('adatmodositasIsz');
    isz.innerText = message;
    isz.style.display = 'block';

    setTimeout(() => {
        isz.style.display = 'none';
    }, 5000);
}