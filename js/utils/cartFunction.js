export function getExistingCartItems() {
    const cartItems = localStorage.getItem("cartitems");
    // localStorage.removeItem("cartitems");

    if (!cartItems) {
        return [];
    } else {
        return JSON.parse(cartItems);
    }

}