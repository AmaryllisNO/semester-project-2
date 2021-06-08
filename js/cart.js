import createMenu from "./components/common/createMenu.js"
import { getExistingCartItems } from "./utils/cartFunction.js";
import { deleteFromStorage } from "./utils/storage.js";

createMenu();

const cartContainer = document.querySelector("#cart-container");
const cartSum = document.querySelector(".cart__sum");
const idLink = "/details.html?id=";


const cartItems = getExistingCartItems();
console.log(cartItems);

function createCartItems() {
    cartItems.forEach(item => {
        cartContainer.innerHTML += `
    <li class="cart__listitem">
        <div class="cart__listitemcontainer">
            <span class="cart__itemname">${item.title}</span>
            <span class="cart__itemlink"><a href="${idLink + item.id}">View details <img class="button__arrowright" src="./assets/icons/arrowright-white.svg" /></a></span>
            <span class="cart__itemlink--mobile"><a href="${idLink + item.id}"><img class="button__arrowright" src="./assets/icons/arrowright-white.svg" /></a></span>
            <span class="cart__itemprice">$ ${item.price}</span>
        </div>
    </li>
`
    });
}

createCartItems();

// CALCULATE AND DISPLAY TOTAL SUM 

let initSum = 0;

function calculateSumPrice() {

    cartItems.forEach(item => {

        const finalSum = initSum += parseInt(item.price);
        console.log(finalSum);


        cartSum.innerHTML = `$ ${finalSum}`;
    })
}

calculateSumPrice();

// CREATE "CLEAR ALL ITEMS" BUTTON

const clearItemsButton = document.querySelector("#clearitemsbutton");

clearItemsButton.addEventListener("click", () => {
    console.log("the clear items button has been clicked");
    deleteFromStorage("cartitems");
    cartContainer.innerHTML = `<div class="card--error">You've cleared your cart.</div>`
    cartSum.innerHTML = `$ 0`;
    createMenu();
})

if (cartItems.length === 0) {
    cartContainer.innerHTML = `<div class="card--error">There are no items in your cart yet.</div>`
}