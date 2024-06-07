import { products } from "../../db/product.js";
const clearSearchBoxBTN = document.querySelector("#remove-search-button");
const inputSearchBox = document.querySelector("#input-search-box");
const backToTopBtn = document.querySelector(".back-to-top-btn");
const ratings = document.querySelector("#ratings");
const productSection = document.querySelector("#product-section");

let productItems = [...products];
function renderProducts(products) {
  products.forEach((product) => {
    productSection.innerHTML += `<div
      class="flex bg-white flex-col rounded-md border-[1px] border-[${product.themeColor}] relative pb-2 h-[400px]"
    >
      <div
        class="w-8 h-8 rounded-full p-1 bg-[${product.themeColor}] flex items-center justify-center absolute left-[40%]  top-[-10px] z-[999]"
      >
        <img
          src="${product.icon}"
          alt="${product.type}"
          width="20"
        />
      </div>
      <div class="w-full h-[170px] overflow-hidden">
        <img
          src="${product.imgUrl}"
          alt="${product.type}"
          class="w-full object-cover"
        />
      </div>
      <div
        class="flex flex-col space-y-2 pt-4 px-2 justify-center items-center"
      >
        <h2 class="font-bold text-[${product.themeColor}] text-lg text-center">${product.name}</h2>
        <div id="ratings" class="space-x-1 text-lg text-yellow-500">
        </div>
        <div class="flex flex-col items-center justify-center space-y-2">
          <div class="flex items-center space-x-2">
            <button onclick="addOrder(${product.id})"><ion-icon name="add-outline"></ion-icon></button>
            <div
              class="px-5 py-0.5 border-[1px] border-primary text-secondary rounded-sm"
            >
              ${product.order}
            </div>
            <button onclick="subtractOrder(${product.id})"><ion-icon name="remove-outline"></ion-icon></button>
          </div>
          <small>PER POUND</small>
          <strong>${product.price}$/lb</strong>
        </div>
        <div
          class="flex items-center justify-center w-full space-x-2 pt-2"
        >
        <button id="order-now" class="rounded-sm bg-primary px-2 py-1.5 text-white text-sm">
        ORDER NOW
      </button>
          <button
            class="bg-transparent rounded-sm border-[1px] border-primary px-2 py-1.5 text-secondary text-sm"
          >
            ADD TO CART
          </button>
        </div>
      </div>
    </div>`;
  });
}

function clearSearchBox() {
  inputSearchBox.value = "";
}
function trackChanges(e) {
  if (e.target.value.trim()) {
    clearSearchBoxBTN.classList.add("flex");
    clearSearchBoxBTN.classList.remove("hidden");
  } else {
    clearSearchBoxBTN.classList.add("hidden");
    clearSearchBoxBTN.classList.remove("flex");
  }
}

//FETCH DATA
function handleScrollPx() {
  if (window.scrollY >= 200) {
    backToTopBtn.classList.add("flex");
    backToTopBtn.classList.remove("hidden");
  } else {
    backToTopBtn.classList.add("hidden");
    backToTopBtn.classList.remove("flex");
  }
}
function addOrder(id) {
  for (let i = 0; i < productItems.length; i++) {
    if (productItems[i].id == id) {
      productItems[i].order++;
    }
  }
  productSection.innerHTML = ``;
  renderProducts(productItems);
}
function subtractOrder(id) {
  for (let i = 0; i < productItems.length; i++) {
    if (productItems[i].id == id) {
      if (productItems[i].order > 0) {
        productItems[i].order--;
      }
    }
  }
}
window.subtractOrder = subtractOrder;
window.addOrder = addOrder;
function backToTop() {
  window.scrollTo(0, 0);
}

async function displayProduct() {
  const currentUrl = location.href.split("#");
  const currenttSection = currentUrl.at(-1);
  const filteredProduct = productItems.filter(
    (product) => currenttSection.split("-")[0] === product.type
  );

  productSection.innerHTML = ``;
  renderProducts(filteredProduct);
}
renderProducts(productItems);
backToTopBtn.addEventListener("click", backToTop);
window.addEventListener("scroll", handleScrollPx);
window.addEventListener("popstate", displayProduct);
inputSearchBox.addEventListener("input", trackChanges);
clearSearchBoxBTN.addEventListener("click", clearSearchBox);
