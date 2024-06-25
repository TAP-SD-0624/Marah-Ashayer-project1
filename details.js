import { data } from "./data.js";

document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    console.log(id, "id");
    if (id) {
    const item = data.find((item) => item.id === parseInt(id));
    console.log(item, "item");
    if (item) {
        document.querySelector(".detail-title").innerText = item.topic;
        document.querySelector(".detail-category").innerText = item.category;
        document.querySelector(".detail-rating").innerHTML = generateRating(item.rating);
        document.querySelector(".detail-description").innerText =item.description;
        document.querySelector(".detail-img").src = `../${item.image}`;
        document.querySelector(".detail-img").alt = item.topic;
        document.querySelector(".detail-author a").innerText = item.name;
        document.querySelector(".detail-author strong").innerText = item.topic;
        document.querySelector(".detail-sub-title").innerText = `${item.topic} Sub Topics`;
        document.querySelector(".detail-sub-list").innerHTML =generateSubTopics(item.subtopics);


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
        <ion-icon name="checkmark-circle-outline" style="color: green" class="details__checkmark"></ion-icon>
        <span>${subTopic}</span>
    </li>
    `).join("");
}
