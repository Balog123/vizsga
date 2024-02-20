// productDetails.js

window.addEventListener("load", () => {
    // A query stringből kinyerjük a termék azonosítóját
    const urlParams = new URLSearchParams(window.location.search);
    const termekId = urlParams.get('termekId');

    // Ellenőrizzük, hogy van-e termék azonosító
    if (termekId) {
        // Fetcheljük a termék részleteit a szerverről
        fetch(`http://localhost:8000/termek/${termekId}`)
            .then((response) => response.json())
            .then((data) => {
                // Megtaláltuk a termék részleteit
                const termekAdatok = data.termekAdatok;

                // Megjelenítjük a termék részleteit a HTML-ben
                displayTermekDetails(termekAdatok);
            })
            .catch((error) =>
                console.error("Hiba a termék információ lekérése során", error)
            );
    }
});

function displayTermekDetails(termekAdatok) {
    // Kép megjelenítése
    const termekKepContainer = document.getElementById("termek-kep");
    termekKepContainer.innerHTML = `<img src="${termekAdatok.kep_url}" alt="Termék kép">`;

    // Termék nevének megjelenítése
    const termekNevElem = document.getElementById("termek-nev");
    termekNevElem.textContent = termekAdatok.termek_nev;

    // Ár megjelenítése
    const termekArElem = document.querySelector(".price");
    termekArElem.textContent = `${termekAdatok.termek_ar} Ft`;
}
