import { data } from "./data.js";

document.addEventListener("DOMContentLoaded", function () {
    const cards = document.getElementById("cards");
    

    function generateCards() {
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
            <a href="/details.html?id=${encodeURIComponent(item.id)}" class="card-link">
                <div class="card">
                    <img src="${item.image}" alt="${item.topic}" class="card-image">
                    <div class="info">
                        <p class="topic">${item.category}</p>
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
    generateCards();
});
