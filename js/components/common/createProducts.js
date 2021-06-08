import { baseUrl } from "../../settings/api.js";
import { featuredCardContainer, cardContainer } from "./constants/constants.js";
import { getUserName, removeUser } from "../../utils/storage.js";
import { getExistingCartItems } from "../../utils/cartFunction.js";
import createMenu from "./createMenu.js";

const username = getUserName();

export function createProducts(products) {

    let editLink = ``;

    // if the window location is on the homepage, list the featured products
    if (window.location.pathname === "/index.html" || window.location.pathname === "/") {

        featuredCardContainer.innerHTML = "";

        products.forEach(product => {

            try {


                if (typeof username != "undefined") {
                    editLink = `
                    <a href="edit.html?id=${product.id}" class="card__editbutton">
                        <span>Edit</span>
                        <img class="button__arrowright" src="./assets/icons/arrowright-white.svg" />
                    </a>
                    `
                }
            } catch (error) {
                console.log(error);
            }


            if (product.featured === true) {

                featuredCardContainer.innerHTML += `
                <div class="row__column row__column--space row__column--desktop-2">
                    <div class="card-container">
                        <div class="card box box--dark">
                            <img src="${product.image_url}"
                                class="card-img-top card__img card__img--dark" alt="${product.title}" />
        
                            <button class="card__button" data-id="${product.id}" data-title="${product.title}" data-price="${product.price}"><img src="./assets/icons/shopping-cart.svg"> Add to
                                cart</button>
        
                            <div class="card-body card__content">
                                <h5 class="card-title card__title">${product.title}</h5>
                                <span class="card__price-container">$ <div class="card__price">${product.price}</div></span>
                            </div>
                        </div>
        
                        <p class="card__description">${product.description}</p>
                        <a href="details.html?id=${product.id}" class="card__detailsbutton">
                            <span>Details</span>
                            <img class="card__arrowright" src="./assets/icons/arrowright.svg" />
                        </a>
                        ${editLink}
                    </div>
                </div>
                `
            }
        });
    } else if (window.location.pathname === "/commissions.html") {


        // console.log(editLink);
        console.log("you're on the list page");

        cardContainer.innerHTML = "";

        products.forEach(product => {
            try {
                if (typeof username != "undefined") {
                    editLink = `
                    <a href="edit.html?id=${product.id}" class="card__editbutton">
                        <span>Edit</span>
                        <img class="button__arrowright" src="./assets/icons/arrowright-white.svg" />
                    </a>
                    `
                }
            } catch (error) {
                console.log(error);
            }

            cardContainer.innerHTML += `
            <div class="row__column row__column--space row__column--desktop-2">
                <div class="card-container">
                    <div class="card box box--dark">
                        <img src="${product.image_url}"
                            class="card-img-top card__img card__img--dark" alt="${product.title}" />
    
                        <button class="card__button" data-id="${product.id}" data-title="${product.title}" data-price="${product.price}"><img src="./assets/icons/shopping-cart.svg"> Add to
                            cart</button>
    
                        <div class="card-body card__content">
                            <h5 class="card-title card__title">${product.title}</h5>
                            <span class="card__price-container">$ <div class="card__price">${product.price}</div></span>
                        </div>
                    </div>

                    <a href="./details.html?id=${product.id}" class="card__detailsbutton">
                        <span>Details</span>
                        <img class="card__arrowright" src="./assets/icons/arrowright.svg" />
                    </a>
                    ${editLink}
                </div>
            </div>`
        });
    }

    if (products.length === 0) {
        cardContainer.innerHTML = `<div class="card--error">No items matches your search</div>`
    }

    const cartButtons = document.querySelectorAll(".card__button");

    cartButtons.forEach(button => {
        // console.log(button);
        button.addEventListener("click", handleClick);

        function handleClick() {
            // debugging
            console.log("you clicked a button corresponding to " + button.dataset.title);



            // assign constants to the clicked button's dataset variables
            const id = this.dataset.id;
            const title = this.dataset.title;
            const price = this.dataset.price;

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

            /* const itemCountContainer = document.querySelector("#itemcount");
            if (parseInt(itemCountContainer.innerHTML) >= 1) {
                console.log("you have more than 3 items in your cart");
            } else {
                console.log("you have less than 3 items in your cart");
            }

            console.log(parseInt(itemCountContainer.innerHTML));

            itemCountContainer.classList.add("navbar__itemcount--active"); */
        }
    });

    function saveCartItems(cartItems) {
        localStorage.setItem("cartitems", JSON.stringify(cartItems))
    }
}