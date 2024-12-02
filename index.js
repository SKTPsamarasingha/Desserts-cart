import Desserts from "./Desserts.js";


const cardBtnOverLay = document.querySelectorAll(".overlay")


cardBtnOverLay.forEach((btn) => {

    btn.addEventListener('click', (e) => {
        highlightItem(e)
    })
})
const emptyCart = document.querySelector(".empty")
const activeCart = document.querySelector(".active")


// to store selected item data
const cartList = [];


const highlightItem = (event) => {

    const card = event.target.closest(".card")

    const btn = card.querySelector('.btn-wrapper')
    const overlay = btn.children[0]
    // cart icon animation
    overlay.children[0].style.transform = "translateX(9rem)";
    overlay.children[1].style.opacity = "0";
    // changing button to show increasing and decrease btns
    btn.style.backgroundColor = '#e36312'
    setTimeout(() => {
        overlay.children[0].style.visibility = "hidden";
        btn.children[1].classList.add("show-content")
    }, 500)

    // add border to img to show selected item
    card.querySelector('img').style.borderColor = '#e36312'
    card.querySelector('.amount').textContent = "1";
    emptyCart.classList.add('hide')
    activeCart.classList.add('show')


    let desserts = new Desserts(
        card.id,
        card.querySelector(".name").textContent,
        card.querySelector(".price").textContent,
        card.querySelector(".amount").textContent
    )
    if (!cartList.some((item) => item.name === desserts.name)) {
        cartList.push(desserts)
        renderCartItem(cartList)
    }
}

// items in cart
let items;
const cart = document.querySelector(".item-wrapper")


const renderCartItem = (list) => {
    // selecting last dessert obj from list
    const item = list[list.length - 1];
    // creating html string from dessert obj
    const itemHtmlStr = `<div class="item" id="${item.id}">
            <p class="title">${item.name}</p>
            <div class="price-wrappers">
                <p class="amount">${item.amount}x</p>
                <p class="price">@ ${item.price}$</p>
                <p class="subtotal">${item.price * item.amount}$</p>
            </div>
            <button class="cancel-btn"><i class="fa-solid fa-x"></i></button>
        </div>`
    // selecting items from cart
    items = document.querySelectorAll('.item')

    // creating template to covert sting into DOM node
    const template = document.createElement('template')
    template.innerHTML = itemHtmlStr.trim()
    let newItem = template.content.firstChild;

    let lastItemName;
    // if its just one item render it to cart else render its to after last items
    if (list.length === 1) {
        cart.appendChild(newItem)
    } else {
        let lastItem = items[items.length - 1];
        lastItemName = lastItem.querySelector('.title').textContent

        list.forEach((item) => {
            if (item.name !== lastItemName) {
                lastItem.insertAdjacentElement('afterend', newItem)
            }
        })
    }
    updateTotal()
    // adding animation class to last item
    requestAnimationFrame(() => {
        newItem.classList.add('show-item');
    });
}

cart.addEventListener("click", (e) => {

    removeItemFromCart(e)
    removeHighlight(e)

});

const removeHighlight = (e) => {
    const cartItem = e.target.classList.value === "cancel-btn" ? e.target.parentElement.id : e.target.parentElement.parentElement.id
    const card = document.getElementById(cartItem)

    if (card != null) {
        try {
            const index = cartList.findIndex(item => item.id === cartItem)
            cartList.splice(index, 1)

            const btn = card.querySelector('.btn-wrapper')

            const overlay = btn.children[0]
            // cart icon animation
            // changing button to show increasing and decrease btns
            btn.children[1].classList.remove("show-content")


            setTimeout(() => {
                btn.style.backgroundColor = '#FFF'
                overlay.children[0].style.transform = "translateX(0rem)";
                overlay.children[1].style.opacity = "1";
                overlay.children[0].style.visibility = "visible";
            }, 400)

            card.querySelector('img').style.borderColor = '#fff'
            card.querySelector('.amount').textContent = "0";
        } catch (e) {
            console.log(e.message)
        }
    }


//
//

// //
// //     // add border to img to show selected item

//     emptyCart.classList.remove('hide')
//     activeCart.classList.remove('show')
//
}


const removeItemFromCart = (e) => {
    let target = e.target;
    target = target.closest(".cancel-btn");
    try {
        target = target ? target.parentElement : target;
        const hasItem = target.classList.contains('item')
        if (hasItem) {
            target.classList.remove('show-item');

            setTimeout(() => {
                target.remove();
            }, 500)
        }

    } catch (e) {
        console.log(e.message)
    }
}


const increaseBtn = document.querySelectorAll('.increase');
const decreaseBtn = document.querySelectorAll('.decrease');

increaseBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => increaseAmount(e))
})
decreaseBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => decreaseAmount(e))
})
const increaseAmount = (event) => {
    const name = event.target.closest('.card').querySelector('.name').textContent
    const items = document.querySelectorAll('.item')
    const amountTxt = event.target.closest('.card').querySelector('.amount');

    items.forEach((item) => {
        let cartName = item.querySelector(".title").textContent;
        let amountElm = item.querySelector('.amount');
        let subtotalElm = item.querySelector('.subtotal')
        let priceElm = item.querySelector('.price')

        let amount = parseInt(amountElm.textContent)
        let price = parseFloat(priceElm.textContent.slice(2, 7))

        if (cartName === name) {

            amount++;
            amountTxt.textContent = amount

            amountElm.textContent = `${amount}x`
            subtotalElm.textContent = `${price * amount}$`
            updateTotal()
        }
    })
}
const decreaseAmount = (event) => {
    const name = event.target.closest('.card').querySelector('.name').textContent
    const amountTxt = event.target.closest('.card').querySelector('.amount');

    const items = document.querySelectorAll('.item')
    items.forEach((item) => {
        let cartName = item.querySelector(".title").textContent;
        let amountElm = item.querySelector('.amount');
        let subtotalElm = item.querySelector('.subtotal')
        let priceElm = item.querySelector('.price')

        let amount = parseInt(amountElm.textContent)
        let price = parseFloat(priceElm.textContent.slice(2, 7))

        if (cartName === name) {
            if (amount > 1) {
                amount--;
                amountTxt.textContent = amount
                amountElm.textContent = `${amount}x`
                subtotalElm.textContent = `${price * amount}$`
                updateTotal()
            }
        }
    })
}

function updateTotal() {
    const itemWrapper = document.querySelector('.item-wrapper')
    const subtotalsElm = itemWrapper.querySelectorAll('.subtotal')

    const totalElm = document.querySelector('.total')
    let total = 0;
    subtotalsElm.forEach((subtotal) => {
        const number = parseFloat(subtotal.textContent.match(/\d+(\.\d+)?/)[0]);
        total += number;
        totalElm.textContent = `${total}$`
    })
}


