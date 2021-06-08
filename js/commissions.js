import { animateOnScroll } from "./components/common/dynamicScroll.js";
import { baseUrl } from "./settings/api.js";
import createMenu from "./components/common/createMenu.js"
import { createProducts } from "./components/common/createProducts.js";
import { filterProducts } from "./components/common/filterProducts.js";

export const productsUrl = baseUrl + "/products";
export const uploadsUrl = baseUrl + "/uploads";

createMenu()

async function getProducts() {

    try {
        const response = await fetch(productsUrl);
        const products = await response.json();

        console.log(products);

        createProducts(products)
        filterProducts(products);
        animateOnScroll();

    }

    catch (error) {
        console.log(error);
    }
}



getProducts();

