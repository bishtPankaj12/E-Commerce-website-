// add to cart ....

let iconCart = document.querySelector(".icon-cart");
let body = document.querySelector('body');
let closeCart = document.querySelector('.close');

iconCart.addEventListener('click',()=>{
    body.classList.toggle('showCart')
})
closeCart.addEventListener('click',()=>{
    body.classList.toggle('showCart')
})

document.addEventListener("DOMContentLoaded", () => {
    const cartIcon = document.querySelector(".icon-cart span");
    const cartTab = document.querySelector(".cartTab");
    const closeCart = document.querySelector(".close");
    const checkoutBtn = document.querySelector(".checkOut");
    const addToCartButtons = document.querySelectorAll(".add-cart button");
    const cartList = document.querySelector(".listCart");
    
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    function updateCartUI() {
        cartList.innerHTML = "";
        cart.forEach((item, index) => {
            const itemElement = document.createElement("div");
            itemElement.classList.add("item");
            itemElement.innerHTML = `
                <div class="image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="name">
                    <p>${item.name}</p>
                </div>
                <div class="totalPrice">$${(item.price * item.quantity).toFixed(2)}</div>
                <div class="quantity">
                    <span class="minus" data-index="${index}">&lt;</span>
                    <span>${item.quantity}</span>
                    <span class="plus" data-index="${index}">&gt;</span>
                </div>
            `;
            cartList.appendChild(itemElement);
        });
        cartIcon.textContent = cart.reduce((total, item) => total + item.quantity, 0);
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    addToCartButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            const product = e.target.closest(".best-p1");
            const name = product.querySelector(".name-of-p p").textContent;
            const price = parseFloat(product.querySelector(".price").textContent.replace("$", ""));
            const image = product.querySelector("img").src;
            
            const existingItem = cart.find(item => item.name === name);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ name, price, image, quantity: 1 });
            }
            updateCartUI();
        });
    });

    cartList.addEventListener("click", (e) => {
        if (e.target.classList.contains("minus")) {
            const index = e.target.dataset.index;
            if (cart[index].quantity > 1) {
                cart[index].quantity -= 1;
            } else {
                cart.splice(index, 1);
            }
            updateCartUI();
        }
        if (e.target.classList.contains("plus")) {
            const index = e.target.dataset.index;
            cart[index].quantity += 1;
            updateCartUI();
        }
    });

    checkoutBtn.addEventListener("click", () => {
        alert("Proceeding to Checkout");
        cart = [];
        updateCartUI();
    });

    updateCartUI();
});


