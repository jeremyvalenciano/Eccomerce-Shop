const cartIcon = document.querySelector('.banner__cart-icon');
cartIcon.addEventListener("click", displayCart);
const closeButton = document.querySelector('.close-btn');
closeButton.addEventListener("click", closeCart);
const addCartBtns = document.querySelectorAll('.cart-btn');
addCartBtns.forEach(btn => {
  btn.addEventListener("click", addProduct);
});
const cleanCartBtn = document.querySelector('.clean-cart');
cleanCartBtn.addEventListener("click", cleanCart);
const totalCart = document.querySelector('.total-cart');
totalCart.addEventListener("click", createCart);
const buyBtn = document.querySelector('.buy-btn');
buyBtn.addEventListener("click", createCart);
const menuBtnMobile = document.querySelector('.banner__menu-icon');
menuBtnMobile.addEventListener("click", displayMenu);



//cart products
let productsCart = [];
const cart = document.querySelector('.cart');
const listItem = document.querySelector('.list-item')
function displayMenu() {
  const navbar = document.querySelector('.navbar');
  if (navbar.classList.contains('navbar-mobile')) {
    navbar.classList.remove('navbar-mobile');
  } else {
    navbar.classList.add('navbar-mobile');
  }
}

//Display and Close Cart
function displayCart() {
  cart.style.display = 'block';
  cart.classList.add('displayed');
}
function closeCart() {
  cart.style.display = 'none';
  cart.classList.remove('displayed');
}

function addProduct(event) {
  const productSelected = event.target.parentElement.parentElement;
  readDataProduct(productSelected);

}

function deleteProduct(event) {
  const productSelected = event.target.parentElement.parentElement;
  const productId = productSelected.getAttribute('data-id');
  //delete by data id
  //return every product diferent by the productId selected
  productsCart = productsCart.filter(product => product.id !== productId);
  createCart(); //load the cart again
}

//read and extract data from the html
function readDataProduct(product) {
  //crate object with the data of the html
  const infoProduct = {
    image: product.querySelector('img').src,
    name: product.querySelector('.product-name').textContent,
    price: product.querySelector('.product-price').textContent,
    id: product.querySelector('.cart-btn').getAttribute('data-id'),
    quantity: 1,
  }
  //check if we already have some product in our cart
  const exist = productsCart.some(product => product.id === infoProduct.id);
  if (exist) {
    //add more quantity
    const products = productsCart.map(product => {
      if (product.id === infoProduct.id) {
        product.quantity++;
        return product; //return the new object with the new quantity
      } else {
        return product; //return the objects that are not duplicated
      }
    })
    productsCart = [...products];
  } else {
    //add product to the products array with spread operator
    //copy of the array and the new product
    productsCart = [...productsCart, infoProduct];
  }
  createCart();
}

//create products Carts with html
function createCart() {
  //clean cart (List Item)
  listItem.innerHTML = '';
  productsCart.forEach((product) => {
    const item = document.createElement('div');
    const image = document.createElement('img');
    const itemInfo = document.createElement('div');
    const div = document.createElement('div');
    const name = document.createElement('p');
    const deleteBtn = document.createElement('button');
    const decreaseButton = document.createElement('button');
    const increaseButton = document.createElement('button');
    const quantityButton = document.createElement('input');
    const price = document.createElement('p');
    item.classList.add('item');
    image.classList.add('item__image');
    name.classList.add('item__name');
    itemInfo.classList.add('item__info');
    price.classList.add('item__price');
    decreaseButton.classList.add('decrease-item');
    increaseButton.classList.add('increase-item');
    item.dataset.id = product.id;
    quantityButton.type = "number";
    quantityButton.min = 1;
    quantityButton.max = 2;
    quantityButton.value = product.quantity;
    quantityButton.name = "item-number";
    quantityButton.id = "item-number";
    quantityButton.classList.add('quantity-item');
    deleteBtn.classList.add('deleteBtn');
    image.src = product.image;
    name.innerText = product.name;
    deleteBtn.innerText = 'X';
    decreaseButton.innerText = '-';
    increaseButton.innerText = '+';
    price.innerText = product.price;
    item.appendChild(image);
    item.appendChild(itemInfo);
    itemInfo.appendChild(name);
    itemInfo.appendChild(deleteBtn);
    itemInfo.appendChild(div);
    div.appendChild(decreaseButton);
    div.appendChild(quantityButton);
    div.appendChild(increaseButton);
    div.appendChild(price);
    listItem.appendChild(item);
  })
  //add event listener to each delete button in the cart
  const deleteBtns = document.querySelectorAll('.deleteBtn');
  deleteBtns.forEach(btn => {
    btn.addEventListener("click", deleteProduct);
  });
  //add event listener to each increase button in the cart
  const increaseBtns = document.querySelectorAll('.increase-item');
  increaseBtns.forEach(btn => {
    btn.addEventListener("click", increaseItem);
  });
  //add event listener to each increase button in the cart
  const decreaseBtns = document.querySelectorAll('.decrease-item');
  decreaseBtns.forEach(btn => {
    btn.addEventListener("click", decreaseItem);
  });
  //diplay clean button
  if (productsCart.length >= 1) {
    cleanCartBtn.style.display = 'block';
    buyBtn.style.display = 'block';
  } else {
    cleanCartBtn.style.display = 'none';
    buyBtn.style.display = 'none';
  }
  calculateTotal();
}

function cleanCart() {
  productsCart = [];
  createCart();
}

function increaseItem(event) {
  const productSelected = event.target.parentElement.parentElement.parentElement;
  const productId = productSelected.getAttribute('data-id');
  productsCart.forEach((product) => {
    if (product.id === productId) {
      if (product.quantity === 10) {
        product.quantity = 10;
      } else if (product.quantity === 0) {
        product.quantity = 1;
      } else {
        product.quantity++;
      }
    }
  })
  createCart();
}

function decreaseItem(event) {
  const productSelected = event.target.parentElement.parentElement.parentElement;
  const productId = productSelected.getAttribute('data-id');
  productsCart.forEach((product) => {
    if (product.id === productId) {
      if (product.quantity === 10) {
        product.quantity--;
      } else if (product.quantity === 1) {
        product.quantity = 1;
      } else {
        product.quantity--;
      }
    }
  })
  createCart();
}

function calculateTotal() {
  let total = 0;
  productsCart.forEach((product) => {
    let stringPrice = product.price;
    stringPrice = stringPrice.substring(1);
    let price = parseFloat(stringPrice);
    total += product.quantity * price;
  })
  totalCart.innerText = total;
}