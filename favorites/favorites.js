import { data } from "../data.js";

document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    console.log("inside favorites")
    const favoriteList = document.getElementById("favorites-list");
    const showFavorites = document.getElementById("show-favorites");
    const favoriteContainer = document.getElementById("favorites-container");
    console.log("favoriteList",favoriteList)
    console.log("showFavorites",showFavorites)


    if (id) {
        const item = data.find((item) => item.id === parseInt(id));
        if (item) {
            const addToFavoritesButton = document.getElementById("addToFavorites");
            const buttonText = addToFavoritesButton.querySelector("span");
            const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
            const isItemInFavorites = favorites.find((favorite) => favorite.id === item.id);

            buttonText.innerText = isItemInFavorites ? "Remove from Favorites" : "Add to Favorites";
            addToFavoritesButton.addEventListener("click", changeFavoriteButton.bind(null, item, buttonText));
        } else {
            document.querySelector(".details").innerText = "Item not found.";
        }
    } 


    document.getElementById("clear-local-storage")?.addEventListener("click", () => {
        localStorage.clear();
        alert("Local storage has been cleared!");
    });
    
    document.getElementById("show-favorites").addEventListener("click", () => {
        console.log("inside if statement")
        favoriteContainer.classList.toggle("hidden");
        updateFavCards();
    });


    function updateFavCards() {
        favoriteList.innerHTML = "";
        const favoriteData = JSON.parse(localStorage.getItem("favorites")) || [];

        favoriteData.forEach((item) => {
            const card = document.createElement("div");
            card.className = "card favorite-item";
            card.innerHTML = generateFavCard(item);
            favoriteList.appendChild(card);
        });
    }

    function generateFavCard(item) {
        const currentPath = window.location.pathname;
        const isDetailsPage = currentPath.includes("details");
        const imageSrc = isDetailsPage ? `../${item.image}` : item.image;
        return `
            <a href="/details/details.html?id=${encodeURIComponent(item.id)}" class="favorite-item card-link">
                <div class="favorite-card">
                    <img src="${imageSrc}" alt="${item.topic}" class="favorite-image">
                    <div class="info">
                        <h3 class="favorite-title">${item.topic}</h3>
                        <div class="favorite-rating stars">
                            ${generateRating(item.rating)}
                        </div>
                    </div>
                </div>
            </a>
        `;
    }

    function generateRating(rating) {
        const fullStars = Math.floor(rating);
        const halfStars = rating % 1 ? 1 : 0;
        const emptyStars = 5 - fullStars - halfStars;
        return `${'<ion-icon name="star"></ion-icon>'.repeat(fullStars)}
                ${'<ion-icon name="star-half"></ion-icon>'.repeat(halfStars)}
                ${'<ion-icon name="star-outline"></ion-icon>'.repeat(emptyStars)}`;
    }

    updateFavCards();
});

    function changeFavoriteButton(item, buttonText) {
        const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        const isItemInFavorites = favorites.find((favorite) => favorite.id === item.id);
        if (!isItemInFavorites) {
            favorites.push(item);
            localStorage.setItem("favorites", JSON.stringify(favorites));
            //alert("Item added to favorites!");
            buttonText.innerText = "Remove from Favorites";
        } else {
            const updatedFavorites = favorites.filter((favorite) => favorite.id !== item.id);
            localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
            //alert("Item removed from favorites!");
            buttonText.innerText = "Add to Favorites";
        }
        //localStorage.setItem("favorites", JSON.stringify(favorites));
        updateFavCards();
    }
    