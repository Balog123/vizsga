// Hamburger menu
const hamburger = document.querySelector(".hamburger");
const navList = document.querySelector(".nav-list");

if (hamburger) {
  hamburger.addEventListener("click", () => {
    navList.classList.toggle("open");
  });
}

// window.addEventListener('scroll', function () {
//   var header = document.querySelector('.header');
//   var topNav = document.querySelector('.top-nav');
//   var navigation = document.querySelector('.navigation');

//   if (window.scrollY > 50) {
//     topNav.style.display = 'none';
//     header.style.display = 'sticky';
//   } else {
//     topNav.style.display = 'block';
//   }
// });
//   document.addEventListener('scroll', () => {
//     const header = document.querySelector('header');
//     const home = document.getElementById('home');

//     if (window.scrollY > home.offsetTop - header.offsetHeight) {
//         header.classList.add('scrolled');
//     } else {
//         header.classList.remove('scrolled');
//     }
// });

const header = document.querySelector('.header');
const topNav = document.querySelector('.top-nav');
const navigation = document.querySelector('.navigation');
const home = document.getElementById('home');
const dropdownContent = document.querySelector('.dropdown-content');
const termekLink = document.querySelector('.nav-link-termekek');

termekLink.addEventListener("mouseenter", () => {
  if (window.scrollY > 50) {
    dropdownContent.classList.add('scrolled-dropdown');
  }
  dropdownContent.style.top = `${header.offsetHeight}px`;
  dropdownContent.style.display = 'block';
});

termekLink.addEventListener("mouseleave", () => {
  dropdownContent.style.display = 'none';
  dropdownContent.classList.remove('scrolled-dropdown');
});

window.addEventListener('scroll', function () {
  if (window.scrollY > 50) {
    topNav.style.display = 'none';
    header.style.display = 'sticky';
  } else {
    topNav.style.display = 'block';
  }
});

// A fejléc stílusának kezelése görgetéskor
document.addEventListener('scroll', () => {
  if (window.scrollY > home.offsetTop - header.offsetHeight) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

window.addEventListener('scroll', function () {
  const scrolled = window.scrollY > 50; // Ellenőrizzük, hogy le van-e görgetve az oldal

  // Beállítjuk a .dropdown-content elem top értékét attól függően, hogy le van-e görgetve az oldal vagy sem
  if (scrolled) {
    dropdownContent.classList.add('scrolled-dropdown'); // Ha le van görgetve az oldal, hozzáadjuk a 'scrolled-dropdown' osztályt
    dropdownContent.style.top = `${header.offsetHeight}px`; // Beállítjuk a top értéket a header magasságával
  } else {
    dropdownContent.classList.remove('scrolled-dropdown'); // Ha nincs lefelve görgetve az oldal, eltávolítjuk a 'scrolled-dropdown' osztályt
    dropdownContent.style.top = '11rem'; // Beállítjuk a kezdeti értéket
  }
});


//popup
const popup = document.querySelector(".popup");
const closePopup = document.querySelector(".popup-close");

if (popup) {
  closePopup.addEventListener("click", () => {
    popup.classList.add("hide-popup");
  });

  window.addEventListener("load", () => {
    setTimeout(() => {
      popup.classList.remove("hide-popup");
    }, 1000);
  });
}
// Popup email fetch
// document.addEventListener("DOMContentLoaded", function () {
//   const popupForm = document.getElementById("popupForm");
//   const emailInput = document.getElementById("emailInput");
//   const subscribeBtn = document.getElementById("subscribeBtn");

//   function showPopup() {
//     document.querySelector('.popup').classList.remove('hide-popup');
//   }

//   function hidePopup() {
//     document.querySelector('.popup').classList.add('hide-popup');
//   }

//   subscribeBtn.addEventListener("click", function (event) {
//     event.preventDefault();

//     const email = emailInput.value.trim();
//     if (isValidEmail(email)) {
//       hidePopup();
//       sendEmail(email);
//     } else {
//       alert("Hibás email formátum");
//     }
//   });

//   setInterval(showPopup, 10 * 60 * 1000);

//   function isValidEmail(email) {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   }

//   function sendEmail(email) {
//     fetch(`http://localhost:8000/api/send-email?email=${email}`, {
//       method: 'POST',
//     })
//       .then(response => {
//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         return response.json();
//       })
//       .then(data => {
//         console.log(data);
//       })
//       .catch(error => console.error("Error sending email:", error));
//   }
// });

document.addEventListener('DOMContentLoaded', () => {
  const searchIcon = document.getElementById('searchIcon');
  const searchBar = document.getElementById('searchBar');
  const searchInput = document.getElementById('searchInput');
  const searchSubmit = document.getElementById('searchSubmit');

  searchIcon.addEventListener('click', (event) => {
    event.stopPropagation();
    searchBar.style.display = 'flex';
    searchInput.focus();
  });

  searchSubmit.addEventListener('click', (event) => {
    event.stopPropagation();
    performSearch();
  });

  document.addEventListener('click', (event) => {
    if (!searchBar.contains(event.target) && event.target !== searchIcon) {
      searchBar.style.display = 'none';
    }
  });

  searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      performSearch();
    }
  });

  function performSearch() {
    const searchTerm = searchInput.value.trim();
    if (searchTerm !== '') {
      console.log('Performing search:', searchTerm);

      window.location.href = `/search.html?query=${encodeURIComponent(searchTerm)}`;
    }
  }
});


document.addEventListener('DOMContentLoaded', () => {
  const userIcon = document.getElementById('userIcon');

  if (userIcon) {
    userIcon.addEventListener('click', () => {
      fetch('http://localhost:8000/check-auth', {
        method: 'GET',
        credentials: 'include',
      })
        .then(response => response.json())
        .then(data => {
          console.log('Authentication check response:', data);

          if (data.success) {
            window.location.href = '/profil';
          } else {
            window.location.href = '/regisztracio';
          }

        })
        .catch(error => console.error('Error checking authentication:', error));
    });
  }
});

