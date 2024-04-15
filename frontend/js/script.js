// Hamburger menu
const hamburger = document.querySelector(".hamburger");
const navList = document.querySelector(".nav-list");

if (hamburger) {
  hamburger.addEventListener("click", () => {
    navList.classList.toggle("open");
  });
}

const header = document.querySelector('.header');
const topNav = document.querySelector('.top-nav');
const navigation = document.querySelector('.navigation');
const dropdownContent = document.querySelector('.dropdown-content');
const termekLink = document.querySelector('.nav-link-termekek');

function debounce(func, delay) {
  let timeout;
  return function () {
    const context = this,
      args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(context, args);
    }, delay);
  };
}

const handleScroll = debounce(() => {
  const scrolled = window.scrollY > 30;
  const header = document.querySelector('.header');
  const topNav = document.querySelector('.top-nav');
  const dropdownContent = document.querySelector('.dropdown-content');

  if (scrolled) {
    header.classList.add('scrolled');
    dropdownContent.classList.add('scrolled-dropdown');
    dropdownContent.style.top = `${header.offsetHeight}px`;
    topNav.style.display = 'none';
  } else {
    header.classList.remove('scrolled');
    dropdownContent.classList.remove('scrolled-dropdown');
    dropdownContent.style.top = '11rem';
    topNav.style.display = 'block';
  }
}, 1);
window.addEventListener('scroll', handleScroll);


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
  const searchIcon2 = document.getElementById('searchIcon2');
  const searchBar = document.getElementById('searchBar');
  const searchBar2 = document.getElementById('searchBar2');
  const searchInput = document.getElementById('searchInput');
  const searchInput2 = document.getElementById('searchInput2');
  const searchSubmit = document.getElementById('searchSubmit');
  const searchSubmit2 = document.getElementById('searchSubmit2');

  function showSearchBar() {
    searchBar.style.display = 'flex';
    searchInput.focus();
  }

  function showSearchBar2() {
    searchBar2.style.display = 'flex';
    searchInput2.focus();
  }

  searchIcon.addEventListener('click', (event) => {
    event.stopPropagation();
    showSearchBar();
  });

  searchIcon2.addEventListener('click', (event) => {
    event.stopPropagation();
    showSearchBar2();
  });

  document.addEventListener('click', (event) => {
    if (!searchBar.contains(event.target) && !searchBar2.contains(event.target) && event.target !== searchIcon && event.target !== searchIcon2) {
      searchBar.style.display = 'none';
      searchBar2.style.display = 'none';
    }
  });

  function performSearch(input) {
    const searchTerm = input.value.trim();
    if (searchTerm !== '') {
      window.location.href = `/search.html?query=${encodeURIComponent(searchTerm)}`;
    }
  }

  searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      performSearch(searchInput);
    }
  });

  searchInput2.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      performSearch(searchInput2);
    }
  });

  searchSubmit.addEventListener('click', () => {
    performSearch(searchInput);
  });

  searchSubmit2.addEventListener('click', () => {
    performSearch(searchInput2);
  });
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

document.addEventListener('DOMContentLoaded', () => {
  const userIcon2 = document.getElementById('userIcon2');

  if (userIcon2) {
    userIcon2.addEventListener('click', () => {
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