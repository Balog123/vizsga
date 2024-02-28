// dropdown.js
fetch("http://localhost:8000/api/categories")
    .then(response => response.json())
    .then(data => {
        const categories = data.categories || data;  
        console.log(categories);

        const dropdownContainer = document.querySelector(".nav-item.with-dropdown");
        const dropdownContent = dropdownContainer.querySelector(".dropdown-content");

        if (Array.isArray(categories)) {
            categories.forEach(category => {
                const categoryLink = document.createElement("a");
                categoryLink.href = `/${category.toLowerCase()}.html`;
                categoryLink.textContent = category;
                dropdownContent.appendChild(categoryLink);
            });
        } else {
            console.error("Invalid data structure for categories:", categories);
        }

        let leaveTimer;

        // Show dropdown content on hover
        dropdownContainer.addEventListener("mouseenter", () => {
            clearTimeout(leaveTimer); // Clear the timeout if it exists
            dropdownContent.style.display = "block";
        });

        // Hide dropdown content after a short delay on mouse leave
        dropdownContainer.addEventListener("mouseleave", () => {
            leaveTimer = setTimeout(() => {
                dropdownContent.style.display = "none";
            }, 200); // Adjust the delay (in milliseconds) based on your preference
        });
    })
    .catch(error => console.error("Error fetching categories:", error));
