import Desserts from "./Desserts.js";

const addToCartBtn = document.querySelectorAll(".btn-wrapper")

addToCartBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => selectItem(e, btn))
})

function selectItem(event, btn) {
    // changing button to show increasing and decrease btns
    btn.querySelector(".overlay").style.visibility = "hidden";
    btn.querySelector(".content").style.visibility = "visible";
    btn.style.backgroundColor = '#e36312'


    // add border to img to show selected item
    let card = event.target.closest(".card")
    card.querySelector('img').style.border = '4px solid #e36312'
    // setting amount for select item as 
    card.querySelector('.amount').textContent = "1";


    addItem(card)
}

const cartList = [];

function addItem(card) {
    // getting data from select card to caret obj
    const name = card.querySelector(".name")
    const price = card.querySelector(".price")
    const amount = card.querySelector(".amount")

    // creating obj of desserts
    let desserts = new Desserts(name.textContent, price.textContent, amount.textContent)


    if (!cartList.some((item) => item.name === desserts.name)) {
        cartList.push(desserts)
    }
    renderCartItem(cartList)
}

function renderCartItem(list) {
    const cart = document.querySelector(".item-wrapper")
    const emptyCart = document.querySelector(".empty")
    const activeCart = document.querySelector(".active")
    // const itemCount = document.querySelectorAll('.count')

    if (list.length > 0) {
        emptyCart.classList.add('hide')
        activeCart.classList.add('show')
    }

    // let items = list.map((item) => {
    //     return `<div class="item">
    //         <p class="title">${item.name}</p>
    //         <div class="price-wrappers">
    //             <p>${item.amount}x</p>
    //             <p class="price">@ ${item.price}$</p>
    //             <p class="subtotal">$</p>
    //         </div>
    //         <button class="cancel-btn"><i class="fa-solid fa-x"></i></button>
    //     </div>`
    // })
    // items = items.join("")
    let item = list[list.length - 1];
    item = `<div class="item">
            <p class="title">${item.name}</p>
            <div class="price-wrappers">
                <p>${item.amount}x</p>
                <p class="price">@ ${item.price}$</p>
                <p class="subtotal">$</p>
            </div>
            <button class="cancel-btn"><i class="fa-solid fa-x"></i></button>
        </div>`

    const items = document.querySelectorAll('.item')
    const template = document.createElement('template')
    template.innerHTML = item.trim()
    let newItem = template.content.firstChild;

    if (list.length === 1) {
        console.log(newItem)
        cart.appendChild(newItem)
    } else {
        const lastItem = items[items.length - 1];
        lastItem.insertAdjacentElement('afterend', newItem)
    }

    requestAnimationFrame(() => {
        newItem.classList.add('show-item');
    });
}

