// fetch("http://localhost:8000/api/categories")
//     .then(response => response.json())
//     .then(data => {
//         const categories = data.categories || data;
//         console.log(categories);

//         const dropdownContainer = document.querySelector(".nav-item.with-dropdown");
//         const dropdownContent = dropdownContainer.querySelector(".dropdown-content");

//         if (Array.isArray(categories)) {
//             categories.forEach(categoryObject => {
//                 const category = categoryObject.category_name;
//                 if (typeof category === 'string') {
//                     const categoryLink = document.createElement("a");
//                     categoryLink.href = `/${category.toLowerCase()}.html`;
//                     categoryLink.textContent = category;
//                     dropdownContent.appendChild(categoryLink);
//                 } else {
//                     console.error("Invalid category type:", typeof category, category);
//                 }
//             });
//         } else {
//             console.error("Invalid data structure for categories:", categories);
//         }

//         let leaveTimer;

//         // Show dropdown content on hover
//         dropdownContainer.addEventListener("mouseenter", () => {
//             clearTimeout(leaveTimer); // Clear the timeout if it exists
//             dropdownContent.style.display = "block";
//         });

//         // Hide dropdown content after a short delay on mouse leave
//         dropdownContainer.addEventListener("mouseleave", () => {
//             leaveTimer = setTimeout(() => {
//                 dropdownContent.style.display = "none";
//             }, 200); // Adjust the delay (in milliseconds) based on your preference
//         });
//     })
//     .catch(error => console.error("Error fetching categories:", error));

// dropdown.js
document.addEventListener("DOMContentLoaded", () => {
    fetch("http://localhost:8000/api/categories")
        .then(response => response.json())
        .then(data => {
            const categories = data.categories || data;
            console.log(categories);

            const dropdownContainer = document.querySelector(".nav-item.with-dropdown");
            const dropdownContent = dropdownContainer.querySelector(".dropdown-content");

            if (Array.isArray(categories)) {
                categories.forEach(categoryObject => {
                    const category = categoryObject.category_name;
                    if (typeof category === 'string') {
                        const categoryLink = document.createElement("a");
                        categoryLink.href = `/category.html?category=${encodeURIComponent(category.toLowerCase())}`;
                        categoryLink.textContent = category;
                        dropdownContent.appendChild(categoryLink);
                    } else {
                        console.error("Invalid category type:", typeof category, category);
                    }
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

            // Handle click on a dropdown link
            dropdownContent.addEventListener("click", (event) => {
                const target = event.target;
                if (target.tagName === 'A') {
                    const selectedCategory = target.textContent.trim().toLowerCase();
                    window.location.href = `/category.html?category=${encodeURIComponent(selectedCategory)}`;
                }
            });

            // Hide dropdown content after a short delay on mouse leave
            dropdownContainer.addEventListener("mouseleave", () => {
                leaveTimer = setTimeout(() => {
                    dropdownContent.style.display = "none";
                }, 200); // Adjust the delay (in milliseconds) based on your preference
            });
        })
        .catch(error => console.error("Error fetching categories:", error));
});