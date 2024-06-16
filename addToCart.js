import { getCartProductFromLS } from "./getCartProducts";
import { showToast } from "./showToast";
import { updateCartValue } from "./updateCartValue";

getCartProductFromLS();
export const addToCart = (event, id, stock) => {
 let arrLocalStorageProduct = getCartProductFromLS(); //-------

  const currentProdElem = document.querySelector(`#card${id}`);
  let quantity = currentProdElem.querySelector(".productQuantity").innerText;
  let price = currentProdElem.querySelector(".productPrice").innerText;

  // console.log(quantity, price)
  price = price.replace("₹", "");

  let existingProd = arrLocalStorageProduct.find(
    (curProd) => curProd.id === id
  );

  if (existingProd && quantity > 1) {
    quantity = Number(existingProd.quantity) + Number(quantity);
    price = Number(price * quantity);
    let updateCard = { id, quantity, price };

    updateCard = arrLocalStorageProduct.map((curProd) => {
      return curProd.id === id ? updateCard : curProd;
    });
    localStorage.setItem("cartProductLS", JSON.stringify(updateCard));
    
    showToast('add',id)
  }

  if (existingProd) {
    // alert("product id all ready exiest");  
    return false;
  }

  price = Number(price * quantity);
  quantity = Number(quantity);

  // let updateCard = { id, quantity, price };
  arrLocalStorageProduct.push({ id, quantity, price });
  localStorage.setItem("cartProductLS", JSON.stringify(arrLocalStorageProduct));

  showToast('delet', id)

  updateCartValue(arrLocalStorageProduct);
};
