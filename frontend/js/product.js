// window.addEventListener('load', () => {
//     fetch('http://localhost:8000/termek')
//         .then(response => response.json())
//         .then(data => {
//             const termekInfoDiv = document.getElementById('termek-info')
//             termekInfoDiv.innerHTML = `
//                 <h2>${data.termekInformacio.termek_nev}</h2>
//                 <p>${data.termekInformacio.termek_leiras}</p>
//                 <img src="${data.termekInformacio.kep_url1}" alt="Termék kép" style="width: 100%">
//             `;
//         })
//         .catch(error => console.error('Hiba a termék információ lekérése során', error))
// })

// window.addEventListener('load', () => {
//     fetch('http://localhost:8000/termek')
//         .then(response => response.json())
//         .then(data => {
//             console.log(data);  // Ellenőrzés céljából

//             // Mindig tömbként kezeljük a választ
//             const termekInformacioArray = Array.isArray(data.termekInformacio) ? data.termekInformacio : [data.termekInformacio];

//             const productCenterDiv = document.querySelector('.product-center');

//             termekInformacioArray.forEach(termekInformacio => {
//                 const termekItemDiv = document.createElement('div');
//                 termekItemDiv.className = 'product-item';

//                 termekItemDiv.innerHTML = `
//                     <div class="overlay" id="termek-info">
//                         <a href="productDetails.html" class="product-thumb">
//                             <img src="${termekInformacio.kep_url1}" alt="Termék kép" style="width: 100%;">
//                         </a>
//                     </div>
//                     <div class="product-info">
//                         <span>${termekInformacio.termek_nev}</span>
//                         <a href="productDetails.html">${termekInformacio.termek_leiras}</a>
//                         <h4>${termekInformacio.termek_ar}</h4>
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

// // Ide kerül a termékek betöltése és megjelenítése
// const productCenterDiv = document.getElementById('dynamic-products');

// // Töltsd be a termékeket JavaScripttel és adj hozzájuk egy linket a termékId-vel
// // Példa:
// fetch('http://localhost:8000/termek')
//     .then(response => response.json())
//     .then(data => {
//         // Ellenőrzés céljából
//         console.log(data);

//         // Mindig tömbként kezeljük a választ
//         const termekInformacioArray = Array.isArray(data.termekInformacio) ? data.termekInformacio : [data.termekInformacio];

//         termekInformacioArray.forEach(termekInformacio => {
//             const termekItemDiv = document.createElement('div');
//             termekItemDiv.className = 'product-item';
//             termekItemDiv.id = `termek-${termekInformacio.termekId}`;

//             termekItemDiv.innerHTML = `
//                 <div class="overlay" id="termek-info">
//                     <a href="productDetails.html?termekId=${termekInformacio.termekId}" class="product-thumb">
//                         <img src="${termekInformacio.kep_url1}" alt="Termék kép" style="width: 100%;">
//                     </a>
//                 </div>
//                 <div class="product-info">
//                     <span>${termekInformacio.termek_nev}</span>
//                     <a href="productDetails.html?termekId=${termekInformacio.termekId}">${termekInformacio.termek_leiras}</a>
//                     <h4>${termekInformacio.termek_ar}</h4>
//                 </div>
//                 <ul class="icons">
//                     <li><i class="bx bx-heart"></i></li>
//                     <li><i class="bx bx-search"></i></li>
//                     <li><i class="bx bx-cart"></i></li>
//                 </ul>
//             `;

//             // Hozzáadja az új termék elemet a dokumentumhoz
//             productCenterDiv.appendChild(termekItemDiv);
//         });
//     })
//     .catch(error => console.error('Hiba a termék információ lekérése során', error));

window.addEventListener("load", () => {
    fetch("http://localhost:8000/termek")
        .then((response) => response.json())
        .then((data) => {
            const termekInformacioArray = Array.isArray(data.termekInformacio)
                ? data.termekInformacio
                : [data.termekInformacio];

            const productCenterDiv = document.querySelector(".product-center");

            termekInformacioArray.forEach((termekInformacio) => {
                const termekItemDiv = document.createElement("div");
                termekItemDiv.className = "product-item";

                // termekItemDiv.innerHTML = `
                //     <div class="overlay">
                //         <a href="productDetails.html?termekId=${termekInformacio.termek_id}" class="product-thumb">
                //             <img src="${termekInformacio.kep_url1}" alt="Termék kép" style="width: 100%;">
                //         </a>
                //     </div>
                //     <div class="product-info">
                //         <span>${termekInformacio.termek_nev}</span>
                //         <a href="productDetails.html?termekId=${termekInformacio.termek_id}">${termekInformacio.termek_leiras}</a>
                //         <h4>${termekInformacio.termek_ar}</h4>
                //         <h1><a href="productDetails.html?termekId=1">TESZT</a></h1>
                //     </div>
                //     <ul class="icons">
                //         <li><i class="bx bx-heart"></i></li>
                //         <li><i class="bx bx-search"></i></li>
                //         <li><i class="bx bx-cart"></i></li>
                //     </ul>
                // `;
                termekItemDiv.innerHTML = `
    <div class="overlay">
        <a href="productDetails.html?termekId=${termekInformacio.termek_id}" class="product-thumb">
            <img src="${termekInformacio.kep_url1}" alt="Termék kép" style="width: 100%;">
        </a>
    </div>
    <div class="product-info">
        <span>${termekInformacio.termek_nev}</span>
        <a href="productDetails.html?termekId=${termekInformacio.termek_id}">${termekInformacio.termek_leiras}</a>
        <h4>${termekInformacio.termek_ar}</h4>
    </div>
    <ul class="icons">
        <li><i class="bx bx-heart"></i></li>
        <li><i class="bx bx-search"></i></li>
        <li><i class="bx bx-cart"></i></li>
    </ul>
`;

                productCenterDiv.appendChild(termekItemDiv);
            });
        })
        .catch((error) =>
            console.error("Hiba a termék információ lekérése során", error)
        );
});
