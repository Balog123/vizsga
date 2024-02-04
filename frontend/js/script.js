const hamburger = document.querySelector(".hamburger");
const navList = document.querySelector(".nav-list");

if(hamburger) {
    hamburger.addEventListener("click", () => {
        navList.classList.toggle("open");
    });
}