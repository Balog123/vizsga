document.addEventListener('DOMContentLoaded', function () {
    fetch('http://localhost:8000/api/admin/megjelenites')
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']))
    .catch(error => console.error('Hiba történt:', error));
})

document.querySelector('table tbody').addEventListener('click', function(event) {
    if (event.target.className === "delete-row-btn") {
        deleteRow(event.target.dataset.id);
    }
    if (event.target.className === "edit-row-btn") {
        handleEditRow(event.target.dataset.id);
    }
});

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
        tableHtml += `<td><button class="edit-row-btn" data-id=${termek_id}>Módosítás</td>`;
        tableHtml += `<td><button class="delete-row-btn" data-id=${termek_id}}>Törlés</td>`;
        tableHtml += "</tr>";
    });

    table.innerHTML = tableHtml;
}

function handleEditRow(id) {
    const updateSection = document.querySelector('#update-row');
    updateSection.hidden = false;
    document.querySelector('#modositas-input').dataset.id = id;
}

function deleteRow(termekId) {
    fetch(`http://localhost:8000/api/admin/${termekId}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            location.reload();
        } else {
            console.error(data.error);
        }
    })
    .catch(error => {
        console.error('Hiba történt:', error);
    });
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

        document.querySelector('#kategoria').value = ""
        document.querySelector('#kep_url').value = ""
        document.querySelector('#nev').value = ""
        document.querySelector('#ar').value = ""
        document.querySelector('#leiras').value = ""
        document.querySelector('#szelesseg').value = ""
        document.querySelector('#magassag').value = ""
        document.querySelector('#hossz').value = ""
        document.querySelector('#raktaron').value = ""

        if (!kategoria || !kep_url || !nev || !ar || !leiras || !szelesseg || !magassag || !hossz || !raktaron) {
            document.getElementById('sikertelen-feltoltes').style.display = "block"
            document.getElementById('sikertelen-feltoltes').innerHTML = 'Valahol nem adtál meg adatot.'
            return;
        }

        fetch('http://localhost:8000/api/admin/feltoltes', {
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
                location.reload();
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


const updateBtn = document.querySelector('#update-row-btn');

updateBtn.onclick = function() {
    const modositas_input = document.querySelector('#modositas-input')

    fetch('http://localhost:8000/api/admin/modositas', {
        method: 'PATCH',
        headers: {
            'Content-type' : 'application/json'
        },
        body: JSON.stringify({
            id: modositas_input.dataset.id,
            ar: modositas_input.value
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            location.reload();
            document.querySelector('#modositas-input').value = ""
        }
    })
}

document.getElementById("vissza").addEventListener("click", function() {
    window.location.href = "/";
  });