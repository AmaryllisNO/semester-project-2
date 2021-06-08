import { animateOnScroll } from "./components/common/dynamicScroll.js";
import displayMessage from "./components/common/displayMessage.js";
import createMenu from "./components/common/createMenu.js";
import { getToken } from "./utils/storage.js";
import { baseUrl } from "./settings/api.js";

createMenu();
animateOnScroll();

const form = document.querySelector("form");
const title = document.querySelector("#title");
const price = document.querySelector("#price");
const description = document.querySelector("#description");
const imageUrl = document.querySelector("#image-url");
const featured = document.querySelector("#featured");
const message = document.querySelector(".message-container")

form.addEventListener("submit", submitForm);

function submitForm(event) {
    event.preventDefault();

    message.innerHTML = "";

    const titleValue = title.value.trim();
    const priceValue = parseFloat(price.value);
    const imageUrlValue = imageUrl.value.trim();
    const descriptionValue = description.value.trim();
    const featuredValue = featured.checked;

    console.log("commission title is...", titleValue);
    console.log("price is...", priceValue);
    console.log("image url is...", imageUrlValue);
    console.log("description is...", descriptionValue);
    console.log("feature is toggled...", featuredValue);

    if (titleValue.length === 0 || priceValue.length === 0 || isNaN(priceValue) || imageUrlValue.length === 0 || descriptionValue.length === 0) {
        return displayMessage("warning", "Please supply proper values", ".message-container");
    }

    addProduct(titleValue, descriptionValue, priceValue, imageUrlValue, featuredValue);
}

async function addProduct(title, description, price, image_url, featured) {
    const url = baseUrl + "/products";

    const data = JSON.stringify({ title: title, description: description, price: price, image_url: image_url, featured: featured, });

    const token = getToken();

    const options = {
        method: "POST",
        body: data,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
    };

    try {
        const response = await fetch(url, options);
        const json = await response.json();

        console.log(json);

        if (json.created_at) {
            displayMessage("success", "Product created", ".message-container");
            form.reset();
        }

        if (json.error) {
            displayMessage("error", json.message, ".message-container");
        }
    }

    catch (error) {
        console.log(error);
        displayMessage("error", "An error has occured", ".message-container");
    }
}