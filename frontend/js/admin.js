const uploadBtn = document.querySelector('#adatatokBtn')

uploadBtn.onclick = function () {
    try {
        const kategoria_nev = document.querySelector('#kategoria_nev').value
        const kep_url = document.querySelector('#kep_url').value
        const nev = document.querySelector('#nev').value
        const ar = parseFloat(document.querySelector('#ar').value)
        const leiras = document.querySelector('#leiras').value
        const szelesseg = parseInt(document.querySelector('#szelesseg').value)
        const magassag = parseInt(document.querySelector('#magassag').value)
        const hossz = parseInt(document.querySelector('#hossz').value)
        const raktaron = parseInt(document.querySelector('#raktaron').value)

        document.querySelector('#kategoria_nev').value = ""
        document.querySelector('#kep_url').value = ""
        document.querySelector('#nev').value = ""
        document.querySelector('#ar').value = ""
        document.querySelector('#leiras').value = ""
        document.querySelector('#szelesseg').value = ""
        document.querySelector('#magassag').value = ""
        document.querySelector('#hossz').value = ""
        document.querySelector('#raktaron').value = ""

        fetch('http://localhost:8000/admin/feltoltes', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                kategoria_nev: kategoria_nev,
                kep_url: kep_url,
                nev: nev,
                ar: ar,
                leiras: leiras,
                szelesseg: szelesseg,
                magassag: magassag,
                hossz: hossz,
                raktaron: raktaron
            })
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                if (data.success) {
                    document.getElementById('sikeres-feltoltes').innerHTML = 'Sikeresen feltöltötte az adatokat.'
                } else {
                    document.getElementById('sikertelen-feltoltes').innerHTML = 'Hiba történt az adatok feltöltésekor.'
                }
            })
            .catch(error => {
                console.log('Hiba történt:', error)
            });
    } catch (error) {
        console.log(error)
    }
};