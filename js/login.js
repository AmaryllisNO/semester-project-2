import createMenu from "./components/common/createMenu.js";
import { animateOnScroll } from "./components/common/dynamicScroll.js";
import displayMessage from "./components/common/displayMessage.js";
import { baseUrl } from "./settings/api.js";
import { saveToken, saveUser } from "./utils/storage.js"

createMenu();
animateOnScroll();

const form = document.querySelector("form");
const username = document.querySelector("#username");
const password = document.querySelector("#password");
const message = document.querySelector(".message-container");
const usernameError = document.querySelector(".form__messageerror--username");
const passwordError = document.querySelector(".form__messageerror--password");

form.addEventListener("submit", submitForm);

function submitForm(event) {

    event.preventDefault();

    message.innerHTML = "";

    const usernameValue = username.value.trim();
    const passwordValue = password.value.trim();
    console.log(usernameValue);


    if (usernameValue.length === 0 || passwordValue.length === 0) {
        displayMessage("warning", 'Please fill out the form', ".message-container");
    }

    if (usernameValue.length > 0) {
        usernameError.style.display = "none";
    } else {
        usernameError.style.display = "block";
    }

    if (usernameValue.length > 0) {
        passwordError.style.display = "none";
    } else {
        passwordError.style.display = "block";
    }

    doLogin(usernameValue, passwordValue);
}

async function doLogin(username, password) {

    const url = baseUrl + "/auth/local";

    const data = JSON.stringify({ identifier: username, password: password });

    const options = {
        method: "POST",
        body: data,
        headers: {
            "Content-Type": "application/json",
        }
    };

    try {
        const response = await fetch(url, options);
        const json = await response.json();
        console.log(json);

        if (json.user) {
            displayMessage("success", "Successful login", ".message-container");

            saveToken(json.jwt);
            saveUser(json.user);

            location.href = "index.html"
        }

        if (json.error) {
            displayMessage("warning", "Invalid login details", ".message-container")
        }
    }

    catch (error) {
        console.log(error);
    }
} 