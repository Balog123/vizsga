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

document.getElementById("infoBtn").addEventListener("click", function(event) {
    event.preventDefault();
    document.getElementById("infoPopup2").style.display = "block";
  });
  
  document.getElementById("closeBtn").addEventListener("click", function() {
    document.getElementById("infoPopup2").style.display = "none";
  });
  
  window.onclick = function(event) {
    if (event.target == document.getElementById("infoPopup2")) {
        document.getElementById("infoPopup2").style.display = "none";
    }
  };
  
  document.addEventListener("DOMContentLoaded", function () {
    const popupForm = document.querySelector('.contact form');
    const emailInput = document.querySelector('.contact form input[type="email"]');
    const messageDiv = document.createElement('div');
    messageDiv.id = 'message';
    document.querySelector('.contact form').appendChild(messageDiv);
  
    popupForm.addEventListener('submit', async function (event) {
        event.preventDefault();
  
        const email = emailInput.value.trim();
        if (isValidEmail(email)) {
            try {
                const response = await fetch('/api/send-email', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email })
                });
  
                const data = await response.json();
  
                if (response.ok) {
                    messageDiv.textContent = 'Email sikeresen elküldve!';
                    messageDiv.style.color = 'green';
                    emailInput.value = '';
                } else {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
            } catch (error) {
                console.error("Hiba történt az email küldésekor:", error);
                messageDiv.textContent = 'Hiba történt az email elküldésekor.';
                messageDiv.style.color = 'red';
            }
        } else {
            messageDiv.textContent = 'Érvénytelen email formátum.';
            messageDiv.style.color = 'red';
        }
    });
  
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
  });