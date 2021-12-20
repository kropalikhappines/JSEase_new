document.addEventListener("DOMContentLoaded", function(){
    var scrollbar = document.body.clientWidth - window.innerWidth + 'px';
    console.log(scrollbar);
    document.querySelector('[href="#basketId"]').addEventListener('click',function(){
      document.body.style.overflow = 'hidden';
      document.querySelector('#basketId').style.marginLeft = scrollbar;
    });
    document.querySelector('[href="#close"]').addEventListener('click',function(){
      document.body.style.overflow = 'visible';
      document.querySelector('#basketId').style.marginLeft = '0px';
    });
  });

//const basketCount = document.querySelector('.totalBasketCount');
const basket = {};
const basketTotalValueEl = document.querySelector('.basketTotalValue');

var totalBasketSpan = document.createElement('span');
totalBasketSpan.setAttribute('class', 'totalBasketCount');
document.querySelector('.cartIconWrap').appendChild(totalBasketSpan);
let totalBasket = 0;
const basketTotalEl = document.querySelector('.basketTotal');

document.querySelector('.totalBasketCount').style.display='none';
const basketEl = document.querySelector('.basket-content');


document.querySelector('.featuredItems').addEventListener('click', event => {
  if (!event.target.closest('.featuredSvg')) {
    return;
  }
  const featuredItem = event.target.closest('.featuredItem');

  const id = +featuredItem.dataset.id;
  const name = document.getElementsByClassName('featuredName')[id - 1]
    .textContent.trim().replace(/\n/g, '');
  const price = +document.getElementsByClassName('featuredPrice')[id - 1]
    .textContent.trim().replace(/[^0-9.]/g, '');
  
  addToCart(id, name, price);
})

function addToCart(id, name, price) {
  if (!(id in basket)) {
    basket[id] = {id: id, name: name, price: price, count: 0};

  }

  totalBasket++;
  basket[id].count++;
  totalBasketSpan.innerHTML = totalBasket;
  basketTotalValueEl.textContent = getTotalBasketPrice().toFixed(2);

  if (totalBasket > 0) {
    document.querySelector('.totalBasketCount').style.display='inline-block';
  }
  productCheck(id);
}

function productCheck(prod) {
  const prodEl = basketEl.querySelector(`.basketRow[data-id='${prod}']`);
  if (!prodEl) {
    addToBasket(prod);
    return;
  }
  const product = basket[prod];
  prodEl.querySelector('.productCount').textContent = product.count;
  prodEl.querySelector('.productTotalRow').textContent = (product.price * product.count).toFixed(2);
}


function getTotalBasketPrice() {
  return Object
    .values(basket)
    .reduce((acc, product) => acc + product.price * product.count, 0);
}

function addToBasket(productId) {
  const productRow = `
    <div class="basketRow" data-id="${productId}">
      <div>${basket[productId].name}</div>
      <div>
        <span class="productCount">${basket[productId].count}</span> шт.
      </div>
      <div>$${basket[productId].price}</div>
      <div>
        $<span class="productTotalRow">${(basket[productId].price * basket[productId].count).toFixed(2)}</span>
      </div>
    </div>
    `;
  basketTotalEl.insertAdjacentHTML("beforebegin", productRow);
}