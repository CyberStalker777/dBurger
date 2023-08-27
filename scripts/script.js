const product = {
    crazy: {
        name: 'Crazy',
        price: 31000,
        img: 'img/crazy.png',
        amount: 0,
        get totalSum() {
            return this.price * this.amount
        }
    },
    light: {
        name: 'Light',
        price: 26000,
        img: 'img/light.png',
        amount: 0,
        get totalSum() {
            return this.price * this.amount
        }
    },
    cheeseburger: {
        name: 'CheeseBurger',
        price: 29000,
        img: 'img/cheseeburger.png',
        amount: 0,
        get totalSum() {
            return this.price * this.amount
        }
    },
    dburger: {
        name: 'dBurger',
        price: 24000,
        img: 'img/dBurger.png',
        amount: 0,
        get totalSum() {
            return this.price * this.amount
        }
    },
}




const productBtns = document.querySelectorAll('.card__item_btn'),
    productMenu = document.querySelector('.basket__inner '),
    basketBtn = document.querySelector('.basket'),
    basketClose = document.querySelector('.close'),
    totalPriceMenu = document.querySelector('.basket__down_price'),
    menuList = document.querySelector('.basket__list'),
    productCount = document.querySelector('.basket__span');


productBtns.forEach(item => {
    item.addEventListener('click', function () {
        plusOrMinus(this)
        // console.log(this);
    })
})

function plusOrMinus(item) {

    let parent = item.closest('.card'),
        parentId = parent.getAttribute('id');

    product[parentId].amount++;

    basket()
}

function basket() {

    let productArr = [],
        totalCount = 0;

    for (const key in product) {

        const pk = product[key],
            productCard = document.querySelector(`#${pk.name.toLowerCase()}`),
            productIndicator = productCard.querySelector('.card__span')


        if (pk.amount) {
            productArr.push(pk)

            productCount.classList.add('active')
            productIndicator.classList.add('active')
            totalCount += pk.amount
            // totalCount = totalCount + pk.amount
            productIndicator.innerHTML = pk.amount
        } else {
            productIndicator.classList.remove('active')
            productIndicator.innerHTML = 0;
        }

        productCount.innerHTML = totalCount;
    }

    menuList.innerHTML = ''


    for (let i = 0; i < productArr.length; i++) {
        menuList.innerHTML += menuItemBurger(productArr[i])
    }

    totalPriceMenu.innerHTML = totalSumAll();

}


function menuItemBurger(productItem) {
    const { name, img, amount, totalSum: price } = productItem;

    return `
    <div class="basket__list">
    <div class="basket__list_item">
        <div class="basket__list_left">
            <img src="${img}" alt="crazy">
            <div class="basket__list_desc">
                <h4 class="basket__list_desc-title">${name}</h4>
                <p class="basket__list_desc-text">${price}</p>
            </div>
        </div>
        <div class="basket__btns" id="${name.toLowerCase()}__card">
            <button class="basket__btn minus" data-symbol="-">-</button>
            <output class="basket__count">${amount}</output>
            <button class="basket__btn plus" data-symbol="+">+</button>
        </div>
    </div>
</div>
    `

}



function totalSumAll() {
    let totalSum = 0;

    for (const key in product) {
        totalSum += product[key].totalSum
    }

    return totalSum;

}


window.addEventListener('click', (e) => {

    let btn = e.target;

    if (btn.classList.contains('basket__btn')) {
        const attr = btn.getAttribute('data-symbol'),
            parent = btn.closest('.basket__btns');


        if (parent) {
            const idProduct = parent.getAttribute('id').split('__')[0]
            if (attr == '+') {
                product[idProduct].amount++
            } else if (attr == '-') {
                product[idProduct].amount--
            }
            basket()
        }
    }

})

const printBody = document.querySelector('.print__body'),
    printFooter = document.querySelector('.print__footer'),
    printBtn = document.querySelector('.basket__down');

printBtn.addEventListener('click', () => {
    printBody.innerHTML = ''

    for (const key in product) {
        const { name, price, totalSum, amount } = product[key];

        if (amount) {
            printBody.innerHTML += `   <div class="print__body">
            <p class="print__body_name">
                <span class="name">${name}</span>
                <span class="count">${amount}</span>
                <span class="price">${price}</span>
            </p>
        </div>
        <div class="print__footer">${totalSumAll()}</div>`
        }
    }

    window.print()

})




















let box = document.querySelector('.box');

box.addEventListener('click', () => {
    productMenu.classList.remove('active')
})



basketBtn.addEventListener('click', () => {
    productMenu.classList.toggle('active')
})

basketClose.addEventListener('click', () => {
    productMenu.classList.remove('active')
})