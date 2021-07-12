"use strict";

class Product {
  constructor(name, price, img, description) {
    this.name = name;
    this.price = price;
    this.img = img;
    this.description = description;
  }

  toString() {
    return `${this.name},${this.price},${this.img},${this.description}`;
  }

  static toProduct(productString) {
    let productProps = productString.split("_");


    return new Product(productProps[0], productProps[1], productProps[2], productProps[3]);
  }
}


function removeArrayItem(index, cartArray) {
  // cartArray = [...cartArray]
  let newCart = [];

  cartArray.forEach((value, i) => {
    if (i === index) {

    } else {
      newCart[newCart.length] = cartArray[i];
    }
  })

  return newCart;
}

let cart = sessionStorage.getItem("cart");
console.log(cart)
cart = cart.split(",")

cart.forEach((value, index) => {
  cart[index] = Product.toProduct(value);
})

document.querySelector(".dropbtn").textContent = `Shopping Cart(${cart.length})`;
let cartSize = cart.length;

let cartTable = document.querySelector("table");
let cartTableBody = document.querySelector("tbody");



function createProductColumn(product) {
  let column = document.createElement("td");
  let productDiv = document.createElement("div");
  let productImageDiv = document.createElement("div");
  let productImage = document.createElement("img")
  let productName = document.createElement("p");

  productName.classList.add("product-name")

  //  
  productDiv.classList.add("product-div");
  productImageDiv.classList.add("product-img-div");

  productImage.classList.add("product-img");
  productImage.src = product.img

  productImageDiv.appendChild(productImage);

  productName.textContent = product.name;

  productDiv.appendChild(productImageDiv);
  productDiv.appendChild(productName);
  column.appendChild(productDiv)

  return column;
}

function createButtonColumn() {
  let btn = document.createElement("button");
  let btn1 = document.createElement("button");
  let column = document.createElement("td");

  btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M10 11H7.101c0-.003 0-.006.001-.009.065-.319.163-.634.291-.937.126-.297.281-.583.461-.85.178-.264.384-.513.61-.74C8.691 8.238 8.94 8.032 9.206 7.853c.266-.18.551-.334.848-.46.302-.128.617-.226.938-.291.658-.135 1.357-.135 2.018 0 .318.065.634.163.937.291.296.125.581.281.85.461.266.179.514.384.738.609l1.416-1.412c-.314-.316-.664-.604-1.036-.855-.373-.252-.773-.47-1.188-.646-.425-.18-.868-.317-1.315-.408-.923-.189-1.899-.189-2.819 0-.449.092-.892.229-1.316.409C8.858 5.727 8.458 5.944 8.086 6.196 7.716 6.445 7.368 6.733 7.05 7.05S6.445 7.716 6.197 8.085c-.252.373-.47.773-.646 1.19-.18.424-.317.867-.408 1.315C5.115 10.725 5.1 10.863 5.08 11H2l4 4L10 11zM14 13h2.899c-.001.003 0 .006-.001.008-.066.324-.164.639-.292.938-.123.293-.278.579-.459.848-.179.264-.385.514-.613.742-.225.225-.473.43-.739.61-.268.18-.553.335-.849.461-.303.128-.618.226-.938.291-.657.135-1.357.135-2.017 0-.319-.065-.634-.163-.937-.291-.297-.126-.583-.281-.85-.461-.264-.178-.513-.384-.74-.61L7.05 16.95c.317.317.666.605 1.035.854.373.252.773.47 1.19.646.424.18.867.317 1.315.408C11.051 18.952 11.525 19 12 19s.949-.048 1.408-.142c.449-.091.893-.229 1.317-.409.415-.176.815-.393 1.188-.645.372-.251.722-.54 1.035-.854.317-.317.605-.666.855-1.037.254-.377.472-.777.645-1.187.178-.42.315-.863.408-1.316.027-.135.043-.273.063-.41H22l-4-4L14 13z"/></svg>`
  btn1.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g><path d="M20 7v14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7H2V5h20v2h-2zM6 7v13h12V7H6zm1-5h10v2H7V2zm4 8h2v7h-2v-7z"/></g></svg>`;
  btn.classList.add("refresh-item")
  btn1.classList.add("delete-item")
  column.appendChild(btn);
  column.appendChild(btn1);

  return column;

}


function addListeners() {
  deleteButtons = document.querySelectorAll("button.delete-item");
  deleteButtons.forEach((value, index) => {
    value.onclick = function() {
      // alert()

      let price = document.querySelectorAll("td.product-price")[index].textContent.replace("$", "");

      let searchTerm = new Product(document.getElementsByClassName("product-name")[index].textContent, price,
        document.getElementsByClassName("product-img")[index].src,
        "").toString();

      for (let i = 0; i < cart.length; i++) {
        if (searchTerm === cart[i].toString()) {
          console.log(true);
          cart = removeArrayItem(i, cart);
          document.querySelectorAll("tbody tr")[index].remove();
        } else {
          console.log(false);
        }
      }
      document.querySelector(".dropbtn").textContent = `Shopping Cart(${cart.length})`;
      addListeners();
    }
  })

}

cart.forEach((value, index) => {
  // Create the variables
  let newRow = document.createElement("tr");
  let productColumn = document.createElement("td");
  let quantityColumn = document.createElement("td");
  let priceColumn = document.createElement("td");
  let quantityInput = document.createElement("input");
  priceColumn.classList.add("product-price");

  // 
  quantityInput.type = "number"
  quantityInput.value = "1";
  quantityInput.min = "1"
  newRow.classList.add("cart-item")

  productColumn = createProductColumn(value);
  priceColumn.textContent = `$${value.price}`;
  newRow.appendChild(productColumn);
  newRow.appendChild(priceColumn);


  quantityColumn.appendChild(quantityInput);
  newRow.appendChild(quantityColumn);
  newRow.appendChild(createButtonColumn());
  cartTableBody.appendChild(newRow)


});
// document.querySelector(".dropbtn").textContent = `Shopping Cart(${cart.length})`;

let deleteButtons = document.querySelectorAll("button.delete-item");
let cartRows = document.querySelectorAll("tr.cart-item");

deleteButtons.forEach((value, index) => {
  value.onclick = function() {
    // alert()

    let price = document.querySelectorAll("td.product-price")[index].textContent.replace("$", "");

    let searchTerm = new Product(document.getElementsByClassName("product-name")[index].textContent, price,
      document.getElementsByClassName("product-img")[index].src,
      "").toString();

    for (let i = 0; i < cart.length; i++) {
      if (searchTerm === cart[i].toString()) {
        // console.log(true);
        cart = removeArrayItem(i, cart);
      }
    }
    document.querySelectorAll("tbody tr")[index].remove();
    document.querySelector(".dropbtn").textContent = `Shopping Cart(${cart.length})`;
    addListeners()
  }
})