//menu show animation
//set width to 0
//change display form

class product {

  constructor(name, price, img, description) {
    this.name = name;
    this.price = price;
    this.img = img;
    this.description = description;
  }

  toString() {
    return `${this.name}_${this.price}_${this.img}_${this.description}`;
  }
}

let productNames = document.querySelectorAll(".product-name");
let productPrices = document.querySelectorAll(".product-price");
let productImages = document.querySelectorAll(".product-image");
let productDescriptions = document.querySelectorAll(".product-description");

let addToCartButtons = document.querySelectorAll(".add-to-cart");
let removeFromCartButtons = document.querySelectorAll(".remove-from-cart");


let cart = [];

function removeCartItem(index, cartArray) {
  let newCart = [];

  for (let i = 0; i < cartArray.length; i++) {
    if (i === index) {

    } else {
      newCart[newCart.length] = cartArray[i];
    }
  }

  return newCart;
}

addToCartButtons.forEach((value, index) => {
  value.onclick = function() {
    value.style.display = "none"
    removeFromCartButtons[index].style.display = "inherit";
    // cart[cart.length] = new product(productNames[index].outerText, productPrices[index].textContent, productImages[index].src, productDescriptions[index].textContent).toString();
    cart.push(new product(productNames[index].outerText, productPrices[index].textContent, productImages[index].src, productDescriptions[index].textContent).toString());

    document.querySelector(".dropbtn").textContent = `Shopping Cart(${cart.length})`;

    sessionStorage.clear();
    sessionStorage.setItem("cart", cart);


  }
});

removeFromCartButtons.forEach((value, index) => {
  value.onclick = function() {
    value.style.display = "none";
    addToCartButtons[index].style.display = "inherit";
    cart = removeCartItem(index, cart)

    removeItem = new product(productNames[index].outerText, productPrices[index].textContent, productImages[index].src, productDescriptions[index].textContent).toString();

    for (let i = 0; i < cart.length; i++) {
      if (removeItem === cart[i].toString()) {
        cart = removeCartItem(i, cart);
      }
    }
    document.querySelector(".dropbtn").textContent = `Shopping Cart(${cart.length})`;

    sessionStorage.clear();
    sessionStorage.setItem("cart", cart);
  }
});




// productName.forEach((value, index, productName) => {
//   cart[cart["length"]] = new product(value.textContent, productPrice[index].textContent, productImage[index].src, productDescription[index].textContent);
// });