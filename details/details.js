import { data } from "../data.js";

document.addEventListener("DOMContentLoaded", async () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    if (id) {
        try {
            const response = await fetch(`https://tap-web-1.herokuapp.com/topics/details/${id}`);
            const item = await response.json();
            if (item) {
                document.querySelector(".detail-title").innerText = item.topic;
                document.querySelector(".detail-category").innerText = item.category;
                document.querySelector(".detail-rating").innerHTML = generateRating(item.rating);
                document.querySelector(".detail-description").innerText =item.description;
                document.querySelector(".detail-img").src = `../images/${item.image}`;
                document.querySelector(".detail-img").alt = item.topic;
                document.querySelector(".detail-author a").innerText = item.name;
                document.querySelector(".detail-author strong").innerText = item.topic;
                document.querySelector(".detail-sub-title").innerText = `${item.topic} Sub Topics`;
                document.querySelector(".detail-sub-list").innerHTML =generateSubTopics(item.subtopics);

            } 
        }
        catch (error) {
                console.error("Error fetching details:", error);
        }
    }
});

function generateRating(rating) {
    const fullStars = Math.floor(rating);
    const halfStars = rating % 1 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStars;
    return `${'<ion-icon name="star"  ></ion-icon>'.repeat(fullStars)}
            ${'<ion-icon name="star-half" ></ion-icon>'.repeat(halfStars)}
            ${'<ion-icon name="star-outline" ></ion-icon>'.repeat(emptyStars)}`;
}

function generateSubTopics(subTopics) {
    return subTopics.map((subTopic) => `
    <li class="detail-sub-item">
        <ion-icon name="checkmark-circle-outline" class="details__checkmark"></ion-icon>
        <span>${subTopic}</span>
    </li>
    `).join("");
}














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
}
