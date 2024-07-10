
document.addEventListener("DOMContentLoaded", function () {
    const cards = document.getElementById("cards");
    const searchInput = document.getElementById("search-input"); // added
    const sortBySelect = document.getElementById("sort-by"); // added
    const filterBySelect = document.getElementById("filter-by"); // added
    const loadingIndicator = document.getElementById("loading-indicator");

    let searchQuery = ""; // added
    let sortBy = "default"; // added
    let filterBy = "all"; // added
    let allData = [];

    async function fetchData() {
        loadingIndicator.classList.remove("hidden");
        try {
            const response = await fetch("https://tap-web-1.herokuapp.com/topics/list");
            allData = await response.json();
            populateFilterByOptions();
            filterAndSortData();
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            loadingIndicator.classList.add("hidden");
        }
    }

    function generateCards(filteredData) {
        cards.innerHTML = "";
        
        data.forEach((item) => {
            const card = document.createElement("div");
            card.className = "card";
            card.innerHTML = generateCard(item);
            cards.appendChild(card);
        });

    }

    function generateRating(rating) {
        const fullStars = Math.floor(rating);
        const halfStars = rating % 1 ? 1 : 0;
        const emptyStars = 5 - fullStars - halfStars;
        return `${'<ion-icon name="star"></ion-icon>'.repeat(fullStars)}
                ${'<ion-icon name="star-half"></ion-icon>'.repeat(halfStars)}
                ${'<ion-icon name="star-outline"></ion-icon>'.repeat(emptyStars)}`;
    }

    function generateCard(item) {
        return `
            <a href="/details/details.html?id=${encodeURIComponent(item.id)}" class="card-link">
                <div class="card-content">
                    <img src="${item.image}" alt="${item.topic}" class="card-image">
                    <div class="info">
                        <p class="category" title="${item.category}">${item.category}</p>
                        <h3 class="title">${item.topic}</h3>
                        <div class="stars">
                            ${generateRating(item.rating)}
                        </div>
                        <h6 class="author-card">Author: ${item.name}</h6>
                    </div>
                </div>
            </a>
        `;
    }
    //cards&&
    //generateCards();});
    function filterAndSortData() {
        let filteredData = allData.filter(item => {
            const matchesSearch = item.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                item.name.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesFilter = filterBy === "all" || item.category === filterBy;
            return matchesSearch && matchesFilter;
        });

        if (sortBy === "topic") {
            filteredData.sort((a, b) => a.topic.localeCompare(b.topic));
        } else if (sortBy === "author") {
            filteredData.sort((a, b) => a.name.localeCompare(b.name));
        }

        generateCards(filteredData);
    }

    function debounce(func, wait) {
        let timeout;
        return function (...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }

    searchInput.addEventListener("input", debounce(async (event) => {
        searchQuery = event.target.value;
        await fetchDataWithSearchQuery();
    }, 300));

    sortBySelect.addEventListener("change", (event) => {
        sortBy = event.target.value;
        filterAndSortData();
    });

    filterBySelect.addEventListener("change", (event) => {
        filterBy = event.target.value;
        filterAndSortData();
    });

    function populateFilterByOptions() {
        const categories = [...new Set(allData.map(item => item.category))];
        categories.forEach(category => {
            const option = document.createElement("option");
            option.value = category;
            option.innerText = category;
            filterBySelect.appendChild(option);
        });
    }

    async function fetchDataWithSearchQuery() {
        loadingIndicator.classList.remove("hidden");
        try {
            const response = await fetch(`https://tap-web-1.herokuapp.com/topics/list?phrase=${encodeURIComponent(searchQuery)}`);
            allData = await response.json();
            filterAndSortData();
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            loadingIndicator.classList.add("hidden");
        }
    }

    fetchData();
});




