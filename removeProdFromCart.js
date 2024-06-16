import { getCartProductFromLS } from "./getCartProducts";
import { showToast } from "./showToast";
import { updateCartValue } from "./updateCartValue";

export const removeProdFromCart = (id) => {
    let cartProduct = getCartProductFromLS();
    cartProduct = cartProduct.filter((curProd) => curProd.id !== id);

    localStorage.setItem("cartProductLS", JSON.stringify(cartProduct));

    let removeDiv = document.getElementById(`card${id}`);
    if (removeDiv) {
        removeDiv.remove();

        showToast();
    }
    updateCartValue(cartProduct)
};