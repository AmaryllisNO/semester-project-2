import { baseUrl } from "./settings/api.js";
import displayMessage from "./components/common/displayMessage.js";
import createMenu from "./components/common/createMenu.js";
import { animateOnScroll } from "./components/common/dynamicScroll.js";
import { getExistingCartItems } from "./utils/cartFunction.js"

createMenu();
animateOnScroll();

const queryString = document.location.search;
console.log(queryString);

// get the "id" from the query string
const params = new URLSearchParams(queryString);
const id = params.get("id");

// if "id" does not exist, go to homepage
if (!id) {
    document.location.href = "/index.html";
}

const productUrl = baseUrl + "/products/" + id;

console.log(productUrl);

(async function () {

    try {
        const response = await fetch(productUrl);
        const details = await response.json();

        document.title = details.title;

        const cardContainer = document.querySelector("#card-container");

        // <p class="card-text card__text">${product.description}</p>

        cardContainer.innerHTML += `
        <div class="details">
            <div class="details__bgcontainer">
            <img src="${details.image_url}" class="details__background" />
                <div class="details__container sectionwrapper">
                    <div class="details__leftsection">
                        <div class="details__heading">${details.title}</div>
                        <div class="details__description">${details.description}</div>
                    </div>

                    <div class="details__rightsection">
                        <img src="${details.image_url}" class="details__image" alt="${details.title}">
                    </div>

                </div>
                <div class="details__container--secondary sectionwrapper">
                    <div class="details__price-container">$ <div class="details__price">${details.price}</div>
                    </div>
                    <div class="details__buttons">
                        <button class="details__addbutton" id="addButton" data-id="${details.id}" data-title="${details.title}" data-price="${details.price}"><img src="./assets/icons/shopping-cart.svg">Add to
                            cart</button>
                        <a href="cart.html" class="details__cartbutton button button--nomargin"><span>Go to
                                cart</span>
                            <img class="button__arrowright" src="./assets/icons/arrowright-white.svg" /></a>
                    </div>
                </div>

            </div>
                
            </div>
        </div>
    </div>
    `

        console.log(details);

        // add item to cart 

        const addButton = document.querySelector("#addButton");
        console.log(addButton.innerHTML);
        addButton.addEventListener("click", handleClick);
    }

    catch (error) {
        console.log(error);
        displayMessage("error", error, ".error-container")
    }
})();

function handleClick() {
    // debugging
    console.log("you clicked a button corresponding to " + addButton.dataset.title);



    // assign constants to the clicked button's dataset variables
    const id = addButton.dataset.id;
    const title = addButton.dataset.title;
    const price = addButton.dataset.price;

    // log the button's dataset variables
    console.log("ID:", id)
    console.log("title:", title)
    console.log("price:", price)

    // assign the existingCartItems array to a constant
    const currentCartItems = getExistingCartItems();

    // log the currentCartItems array
    console.log(currentCartItems);

    // check if the id of the item we just clicked is in our currentCartItems array
    const itemsExist = currentCartItems.find(function (item) {
        return item.id === id;
    })

    console.log(typeof itemsExist, itemsExist);

    // if the item does not exist (returns undefined) assign the dataset variables to an object and push it into the currentCartItems array
    if (!itemsExist) {

        const item = { id: id, title: title, price: price };

        currentCartItems.push(item);
        saveCartItems(currentCartItems);
        console.log(title + " was added to the cart!");
    }

    // if the item exists 
    else {
        /*  const newCartItems = currentCartItems.filter(cartItem => cartItem.id !== id);

         console.log(newCartItems);

         saveCartItems(newCartItems); */
        //  console.log(title + " was removed from the cart??");

        const item = { id: id, title: title, price: price };

        currentCartItems.push(item);
        saveCartItems(currentCartItems);
        console.log(title + " was added to the cart!");
    }

    createMenu();
}

function saveCartItems(cartItems) {
    localStorage.setItem("cartitems", JSON.stringify(cartItems))
}

