// window.addEventListener('load', () => {
//     fetch('http://localhost:8000/termek')
//         .then(response => response.json())
//         .then(data => {
//             const termekInfoDiv = document.getElementById('termek-info')
//             termekInfoDiv.innerHTML = `
//                 <h2>${data.termekInformacio.termek_nev}</h2>
//                 <p>${data.termekInformacio.termek_leiras}</p>
//                 <img src="${data.termekInformacio.kep_url1}" alt="Termék kép" style="width: 400px">
//             `;
//         })
//         .catch(error => console.error('Hiba a termék információ lekérése során', error))
// })

// window.addEventListener('load', () => {
//     fetch('http://localhost:8000/termek')
//         .then(response => response.json())
//         .then(data => {
//             const termekItemDiv = document.createElement('div');
//             termekItemDiv.className = 'product-item';

//             termekItemDiv.innerHTML = `
//                 <div class="overlay" id="termek-info">
//                     <a href="productDetails.html" class="product-thumb">
//                         <img src="${data.termekInformacio.kep_url1}" alt="Termék kép" style="width: 100%;">
//                     </a>
//                 </div>
//                 <div class="product-info">
//                     <span>${data.termekInformacio.termek_nev}</span>
//                     <a href="productDetails.html">${data.termekInformacio.termek_leiras}</a>
//                     <h4>${data.termekInformacio.termek_ar}</h4>
//                 </div>
//                 <ul class="icons">
//                     <li><i class="bx bx-heart"></i></li>
//                     <li><i class="bx bx-search"></i></li>
//                     <li><i class="bx bx-cart"></i></li>
//                 </ul>
//             `;

//             // Hozzáadja az új termék elemet a dokumentum elejéhez
//             const productCenterDiv = document.querySelector('.product-center');
//             productCenterDiv.insertBefore(termekItemDiv, productCenterDiv.firstChild);
//         })
//         .catch(error => console.error('Hiba a termék információ lekérése során', error))
// })


// window.addEventListener('load', () => {
//     fetch('http://localhost:8000/termek')
//         .then(response => response.json())
//         .then(data => {
//             // Mindig tömbként kezeljük a választ
//             const dataArray = Array.isArray(data) ? data : [data];

//             const productCenterDiv = document.querySelector('.product-center');

//             dataArray.forEach(termekInformacio => {
//                 const termekItemDiv = document.createElement('div');
//                 termekItemDiv.className = 'product-item';

//                 termekItemDiv.innerHTML = `
//                     <div class="overlay" id="termek-info">
//                         <a href="productDetails.html" class="product-thumb">
//                             <img src="${data.termekInformacio.kep_url1}" alt="Termék kép" style="width: 100%;">
//                         </a>
//                     </div>
//                     <div class="product-info">
//                         <span>${data.termekInformacio.termek_nev}</span>
//                         <a href="productDetails.html">${data.termekInformacio.termek_leiras}</a>
//                         <h4>${data.termekInformacio.termek_ar}</h4>
//                     </div>
//                     <ul class="icons">
//                         <li><i class="bx bx-heart"></i></li>
//                         <li><i class="bx bx-search"></i></li>
//                         <li><i class="bx bx-cart"></i></li>
//                     </ul>
//                 `;

//                 // Hozzáadja az új termék elemet a dokumentumhoz
//                 productCenterDiv.appendChild(termekItemDiv);
//             });
//         })
//         .catch(error => console.error('Hiba a termék információ lekérése során', error));
// });

window.addEventListener('load', () => {
    fetch('http://localhost:8000/termek')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const productCenterDiv = document.querySelector('.product-center');

            // Ellenőrizzük, hogy data egy tömb-e
            if (Array.isArray(data)) {
                data.forEach(termekInformacio => {
                    const termekItemDiv = createProductItem(termekInformacio);
                    productCenterDiv.appendChild(termekItemDiv);
                });
            } else {
                console.error('A válasz nem tartalmazza a várt adatokat.');
            }
        })
        .catch(error => console.error('Hiba a termék információ lekérése során', error))
});

function createProductItem(data) {
    const termekItemDiv = document.createElement('div');
    termekItemDiv.className = 'product-item';

    termekItemDiv.innerHTML = `
        <div class="overlay" id="termek-info">
            <a href="productDetails.html" class="product-thumb">
                <img src="${data.termekInformacio.kep_url1}" alt="Termék kép" style="width: 100%;">
            </a>
        </div>
        <div class="product-info">
            <span>${data.termekInformacio.termek_nev}</span>
            <a href="productDetails.html">${data.termekInformacio.termek_leiras}</a>
            <h4>${data.termekInformacio.termek_ar}</h4>
        </div>
        <ul class="icons">
            <li><i class="bx bx-heart"></i></li>
            <li><i class="bx bx-search"></i></li>
            <li><i class="bx bx-cart"></i></li>
        </ul>
    `;

    return termekItemDiv;
}
