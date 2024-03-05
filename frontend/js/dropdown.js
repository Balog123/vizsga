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

            dropdownContainer.addEventListener("mouseenter", () => {
                clearTimeout(leaveTimer);
                dropdownContent.style.display = "block";
            });

            dropdownContent.addEventListener("click", (event) => {
                const target = event.target;
                if (target.tagName === 'A') {
                    const selectedCategory = target.textContent.trim().toLowerCase();
                    window.location.href = `/category.html?category=${encodeURIComponent(selectedCategory)}`;
                }
            });

            dropdownContainer.addEventListener("mouseleave", () => {
                leaveTimer = setTimeout(() => {
                    dropdownContent.style.display = "none";
                }, 200);
            });
        })
        .catch(error => console.error("Error fetching categories:", error));
});