window.addEventListener('load', () => {
    // Az URL-ből kinyerjük a termekId-t
    const urlParams = new URLSearchParams(window.location.search);
    const termekId = urlParams.get('termekId');

    // Ellenőrizzük, hogy van-e termekId az URL-ben
    if (termekId) {
        // Ha van, akkor kérjük le a termék részleteit az adatbázisból
        fetch(`http://localhost:8000/termek/${termekId}`)
            .then(response => response.json())
            .then(termekDetails => {
                // Itt dolgozd fel a termék részleteit és jelenítsd meg az oldalon

                // Példa: termék nevének megjelenítése
                const termekNevDiv = document.getElementById('termek-nev');
                termekNevDiv.textContent = termekDetails.termek_nev;

                // Példa: termék képének megjelenítése
                const termekKepDiv = document.getElementById('termek-kep');
                termekKepDiv.innerHTML = `<img src="${termekDetails.kep_url1}" alt="Termék kép" style="width: 100%;">`;

                // További részletek megjelenítése...
            })
            .catch(error => console.error('Hiba a termék részleteinek lekérése során', error));
    }
});
