import { getUserName, removeUser } from "../../utils/storage.js";
import { getExistingCartItems } from "../../utils/cartFunction.js";



export default function createMenu() {

    console.log("menu created");

    const currentCartItems = getExistingCartItems();
    let itemCount = currentCartItems.length;

    if (itemCount === 0) {
        itemCount = "";
    }

    const { pathname } = document.location;
    const username = getUserName();

    let authLink = ` 
    <li class="navbar__listitem navbar__listitem--right">
        <a href="login.html" class="navbar__link ${pathname === "/login.html" ? "navbar__link--active" : ""}">
            <img src="./assets/icons/user.svg" class="navbar__listimage" alt="user" />
            Login
        </a>
    </li>
    `;

    let authLinkMobile = ` 
    <li class="navbar__listitem navbar__listitem--right">
        <a href="login.html" class="navbar__link ${pathname === "/login.html" ? "navbar__link--active" : ""}">
            <img src="./assets/icons/user.svg" class="navbar__listimage" alt="user" />
            Login
        </a>
    </li>
    `;

    if (username) {
        authLink = ` 
        <li class="navbar__listitem navbar__listitem--right">
            <a href="add.html" class="navbar__link ${pathname === "/add.html" ? "navbar__link--active" : ""}">
                Add Product
            </a>
        </li>

        <li class="navbar__listitem navbar__listitem--right" >
            <button href="login.html" class="navbar__link" id="logoutbutton">
                <img src="./assets/icons/logout.svg" class="navbar__listimage" alt="logout" />
                Log Out
            </button>
        </li>
        `
        authLinkMobile = ` 
        <li class="navbar__listitem navbar__listitem--mobile">
            <a href="add.html" class="navbar__link ${pathname === "/add.html" ? "navbar__link--active" : ""}">
                Add Product
            </a>
        </li>

        <li class="navbar__listitem navbar__listitem--mobile" >
            <button href="login.html" class="navbar__link" id="logoutbutton">
                <img src="./assets/icons/logout.svg" class="navbar__listimage" alt="logout" />
                Log Out
            </button>
        </li>
        `

    }


    const container = document.querySelector(".menu-container");

    container.innerHTML = `
    <div class="menu">
        <ul class="navbar__list">
            <div class="navbar__leftsection">

                <li class="navbar__listitem"><a href="index.html"
                        class="navbar__link ${pathname === "/index.html" ? "navbar__link--active" : ""} ${pathname === "/" ? "navbar__link--active" : ""}">Home</a>
                </li>

                <li class="navbar__listitem"><a href="commissions.html" class="navbar__link  ${pathname === "/commissions.html" ? "navbar__link--active" : ""}
                ">Commissions</a>

            </div>

            <div class="navbar__rightsection"> 
                
                ${authLink}
                
                <li class="navbar__listitem navbar__listitem--right">
                    <a href="cart.html" class="navbar__link ${pathname === "/cart.html" ? "navbar__link--active" : ""}">
                        <img src="./assets/icons/shopping-cart.svg" class="navbar__listimage"
                            alt="shopping cart" />
                        Your Cart
                        <span class="navbar__itemcount" id="itemcount">${itemCount}</span>
                    </a>
                </li>
            </div>
        </ul>
    </div>

    <div class="menu-mobile">
        <div class="nav-mobile nav-mobile--closed" id="navmobile">
            <ul class="navbar__list navbar__list--mobile">
                
                    <li class="navbar__listitem navbar__listitem--mobile"><a href="index.html"
                            class="navbar__link ${pathname === "/index.html" ? "navbar__link--active" : ""} ${pathname === "/" ? "navbar__link--active" : ""}">Home</a>
                    </li>
                    <li class="navbar__listitem navbar__listitem--mobile"><a href="commissions.html" class="navbar__link  ${pathname === "/commissions.html" ? "navbar__link--active" : ""}
                    ">Commissions</a>
                    </li>
                
                
                    ${authLinkMobile}

                    <li class="navbar__listitem navbar__listitem--mobile ">
                        <a href="cart.html" class="navbar__link ${pathname === "/cart.html" ? "navbar__link--active" : ""}">
                        <img src="./assets/icons/shopping-cart.svg" class="navbar__listimage"
                        alt="shopping cart" />
                            Your Cart
                        </a>
                    </li>
            </ul>
            <button class="nav-mobile__close" id="closebutton">
            
            </button>
        </div>

        <div class="menu-mobile__container">
            <a href="cart.html" class="navbar__link ${pathname === "/cart.html" ? "navbar__link--active" : ""}">
                <img src="./assets/icons/shopping-cart.svg" class="navbar__listimage"
                alt="shopping cart" />
            </a>
            <button class="menu-mobile__hamburgerbutton" id="hamburgerbutton">   
                <img src="../../assets/icons/hamburger.svg" />           
            </button>
        </div>      
    </div>
`

    const itemCountContainer = document.querySelector("#itemcount");
    if (parseInt(itemCountContainer.innerHTML) >= 1) {
        console.log("you have 1 or more items in your cart");
        itemCountContainer.classList.add("navbar__itemcount--active");
    } else {
        console.log("you have no items in your cart");
    }


    const hamburgerButton = document.querySelector("#hamburgerbutton");
    const navMobile = document.querySelector("#navmobile");

    hamburgerButton.addEventListener("click", () => {
        navMobile.classList.toggle("nav-mobile--open");
        navMobile.classList.toggle("nav-mobile--closed");
    })

    try {
        const logoutButton = document.getElementById("logoutbutton");
        logoutButton.addEventListener("click", () => {
            console.log("unlogging attempted")
            removeUser();
            location.href = "index.html";
        })

    } catch (error) {
        console.log(error);
    }
}
