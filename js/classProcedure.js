class Product {
  name;
  price;
  image;
  description;

  constructor() {}

  constructor(name, price, image, description) {
    this.name = name;
    this.price = price;
    this.image = image;
    this.description = description;
  }

  setName(name) {
    this.name = name;
  }

  setPrice(price) {
    this.price = price;
  }

  setDescription(description) {
    this.description = description;
  }

  getName() {
    return this.name;
  }

  getPrice() {
    return this.price;
  }

  getDescription() {
    return this.description;
  }
}

console.log(new Product())
console.log(new Product("test", 1000, "lorem Ipsum"))