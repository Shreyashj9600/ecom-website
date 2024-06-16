import products from "./api/products.json";
import { getCartProductFromLS } from "./getCartProducts";
import { fetchQuantityFromCartLS } from "./fetchQuantityFromCartLS";
import { removeProdFromCart } from "./removeProdFromCart";
import {incrementDecrement} from "./incrementDecrement"; 
import { updateCartProductTotal } from "./updateCartProductTotal";

let cartProduct = getCartProductFromLS();

let filterProduct = products.filter((curProd) => {
    return cartProduct.some((curElem) => curElem.id === curProd.id);
})
console.log(filterProduct);

const cartElement = document.querySelector('#productCartContainer');
const templateContainer = document.querySelector('#productCartTemplate');

const showCartProduct = () => {
    filterProduct.forEach((curProd) => {
        const { brand, category, description, id, image, name, price, stock } = curProd;

        let productClone = document.importNode(productCartTemplate.content, true);

        const LSActualData = fetchQuantityFromCartLS(id, price)

        productClone.querySelector('#cardValue').setAttribute('id', `card${id}`);
        productClone.querySelector('.category').textContent = category;
        productClone.querySelector(".productName").textContent = name;
        productClone.querySelector(".productImage").src = image;

        productClone.querySelector('.productQuantity').textContent = LSActualData.quantity
        productClone.querySelector('.productPrice').textContent = LSActualData.price

        productClone.querySelector('.stockElement').addEventListener('click', (event) => {
            incrementDecrement(event, id, stock, price);
        })

        productClone.querySelector('.remove-to-cart-button').addEventListener('click', () => removeProdFromCart(id));

        cartElement.append(productClone)
    })
}

showCartProduct();  


updateCartProductTotal();