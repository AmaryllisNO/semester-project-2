import { createProducts } from "./createProducts.js";

export function filterProducts(products) {
    // console.log(products);
    const filter = document.querySelector(".search");

    filter.addEventListener("keyup", function () {

        const searchValue = event.target.value.trim().toLowerCase();

        console.log(searchValue);

        const filteredProducts = products.filter(function (product) {
            if (product.title.toLowerCase().includes(searchValue) || product.description.toLowerCase().includes(searchValue)) {
                return true;
            }
        })

        // console.log(filteredProducts);

        createProducts(filteredProducts);
    });
}