// Hamburger menu
const hamburger = document.querySelector(".hamburger");
const navList = document.querySelector(".nav-list");

if(hamburger) {
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

document.addEventListener("DOMContentLoaded", function () {
  const popupForm = document.getElementById("popupForm");
  const emailInput = document.getElementById("emailInput");
  const subscribeBtn = document.getElementById("subscribeBtn");

  function showPopup() {
    document.querySelector('.popup').classList.remove('hide-popup');
  }

  function hidePopup() {
    document.querySelector('.popup').classList.add('hide-popup');
  }

  subscribeBtn.addEventListener("click", function (event) {
    event.preventDefault();

    const email = emailInput.value.trim();
    if (isValidEmail(email)) {
      hidePopup();
      sendEmail(email);
    } else {
      alert("Hibás email formátum");
    }
  });

  setInterval(showPopup, 10 * 60 * 1000);

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function sendEmail(email) {
    fetch(`http://localhost:8000/api/send-email?email=${email}`, {
      method: 'POST',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
      })
      .catch(error => console.error("Error sending email:", error));
  }
});
