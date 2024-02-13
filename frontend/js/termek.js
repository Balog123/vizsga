window.addEventListener('load', () => {
    fetch('http://localhost:8000/termek')
        .then(response => response.json())
        .then(data => {
            const termekInfoDiv = document.getElementById('termek-info')
            termekInfoDiv.innerHTML = `
                <h2>${data.termekInformacio.termek_nev}</h2>
                <p>${data.termekInformacio.termek_leiras}</p>
                <img src="${data.termekInformacio.kep_url1}" alt="Termék kép" style="width: 400px">
            `;
        })
        .catch(error => console.error('Hiba a termék információ lekérése során', error))
})