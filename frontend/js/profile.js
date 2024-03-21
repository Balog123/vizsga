// document.addEventListener('DOMContentLoaded', () => {
//     const saveChangesButton = document.getElementById('saveChangesButton');

//     if (saveChangesButton) {
//         saveChangesButton.addEventListener('click', () => {
//             const felhasznaloVaros = document.getElementById('felhasznaloVaros').value;
//             const felhasznaloIranyitoszam = document.getElementById('felhasznaloIranyitoszam').value;
//             const felhasznaloCim1 = document.getElementById('felhasznaloCim1').value;

//             const userDetails = {
//                 felhasznaloVaros,
//                 felhasznaloIranyitoszam,
//                 felhasznaloCim1,
//             };

//             fetch('http://localhost:8000/api/save-user-details', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(userDetails),
//             })
//                 .then(response => response.json())
//                 .then(data => {
//                     if (data.success) {
//                         console.log('User details saved successfully:', data.result);
//                     } else {
//                         console.error('Error saving user details:', data.error);
//                     }
//                 })
//                 .catch(error => console.error('Error saving user details:', error));
//         });
//     }

//     const logoutButton = document.getElementById('logoutButton');

//     if (logoutButton) {
//         logoutButton.addEventListener('click', () => {
//             fetch('http://localhost:8000/logout', {
//                 method: 'POST',
//                 credentials: 'include',
//             })
//                 .then(response => {
//                     window.location.href = '/';
//                 })
//                 .catch(error => console.error('Error during logout:', error));
//         });
//     }
// });

document.addEventListener('DOMContentLoaded', () => {
    const saveChangesButton = document.getElementById('saveChangesButton');

    if (saveChangesButton) {
        saveChangesButton.addEventListener('click', () => {
            const felhasznaloVaros = document.getElementById('felhasznaloVaros').value;
            const felhasznaloIranyitoszam = document.getElementById('felhasznaloIranyitoszam').value;
            const felhasznaloCim1 = document.getElementById('felhasznaloCim1').value;

            const userDetails = {
                felhasznaloVaros,
                felhasznaloIranyitoszam,
                felhasznaloCim1,
            };

            fetch('http://localhost:8000/api/save-user-details', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userDetails),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        console.log('User details saved successfully:', data.result);
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
            fetch('http://localhost:8000/logout', {
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
