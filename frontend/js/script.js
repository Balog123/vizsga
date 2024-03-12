// Hamburger menu
const hamburger = document.querySelector(".hamburger");
const navList = document.querySelector(".nav-list");

if (hamburger) {
  hamburger.addEventListener("click", () => {
    navList.classList.toggle("open");
  });
}

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
          // Check if user is logged in
          fetch('http://localhost:8000/check-auth', {
              method: 'GET',
              credentials: 'include',
          })
              .then(response => response.json())
              .then(data => {
                  console.log('Authentication check response:', data);

                  if (data.success) {
                      // User is logged in, redirect to profile.html
                      window.location.href = '/profil';
                  } else {
                      // User is not logged in, redirect to register.html
                      window.location.href = '/regisztracio';
                  }
              })
              .catch(error => console.error('Error checking authentication:', error));
      });
  }
});

