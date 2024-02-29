document.addEventListener('DOMContentLoaded', function () {
    fetch('http://localhost:8000/admin/megjelenites')
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']))
    .catch(error => console.error('Hiba történt:', error)); // Hiba kezelése
})

function loadHTMLTable(data) {
    const table = document.querySelector('table tbody');

    if (data.length === 0) {
        table.innerHTML = "<tr><td class='no-data' colspan='12'>No Data</td></tr>";
        return;
    }

    let tableHtml = "";

    data.forEach(function ({termek_id, termek_nev, termek_ar, termek_leiras, termek_szelesseg, termek_magassag, termek_hossz, termek_raktaron, termek_kategoria, kep_url}) {
        tableHtml += "<tr>";
        tableHtml += `<td>${termek_id}</td>`;
        tableHtml += `<td>${termek_nev}</td>`;
        tableHtml += `<td>${termek_ar} Ft</td>`;
        tableHtml += `<td>${termek_leiras}</td>`;
        tableHtml += `<td>${termek_szelesseg}</td>`;
        tableHtml += `<td>${termek_magassag}</td>`;
        tableHtml += `<td>${termek_hossz}</td>`;
        tableHtml += `<td>${termek_raktaron}</td>`;
        tableHtml += `<td>${termek_kategoria}</td>`;
        if (kep_url) {
            tableHtml += `<td><img src="${kep_url}"></td>`;
        } else {
            tableHtml += `<td>No Image</td>`; 
        }
        tableHtml += `<td><button class="delete-row-btn" data-id=${termek_id}}>Delete</td>`;
        tableHtml += `<td><button class="edit-row-btn" data-id=${termek_id}>Edit</td>`;
        tableHtml += "</tr>";
    });

    table.innerHTML = tableHtml;
}

const feltoltes = document.querySelector('#adatatokBtn')

feltoltes.onclick = function () {
    try {
        const kategoria = document.querySelector('#kategoria').value
        const kep_url = document.querySelector('#kep_url').value
        const nev = document.querySelector('#nev').value
        const ar = parseFloat(document.querySelector('#ar').value)
        const leiras = document.querySelector('#leiras').value
        const szelesseg = parseInt(document.querySelector('#szelesseg').value)
        const magassag = parseInt(document.querySelector('#magassag').value)
        const hossz = parseInt(document.querySelector('#hossz').value)
        const raktaron = parseInt(document.querySelector('#raktaron').value)

        // if (!nev || !ar || !leiras || !szelesseg || !magassag || !hossz || !raktaron) {
        //     document.getElementById('sikertelen-feltoltes').style.display = "block";
        //     document.getElementById('sikertelen-feltoltes').innerHTML = 'Adj meg minden adatot.';
        //     throw new Error('Minden mező kitöltése kötelező!');
        // }

        document.querySelector('#kategoria').value = ""
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
                kategoria: kategoria,
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
            return response.json()
        })
        .then(data => {
            console.log(data)
            if (data.success === true) {
                document.getElementById('sikeres-feltoltes').style.display = "block"
                document.getElementById('sikeres-feltoltes').innerHTML = 'Sikeresen feltöltötte az adatokat.'
            } else {
                document.getElementById('sikertelen-feltoltes').style.display = "block"
                document.getElementById('sikertelen-feltoltes').innerHTML = 'Hiba történt az adatok feltöltésekor.'
            }
        })
        .catch(error => {
            console.log('Hiba történt:', error)
        })
    } catch (error) {
        console.log(error)
    }
}