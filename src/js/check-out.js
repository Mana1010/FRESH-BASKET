const checkoutPage = document.querySelector(".checkout-page");
const totalAmount = document.querySelector(".total-amount");
const totalItems = document.querySelector(".total-items");
const searchBox = document.querySelector("#input-search-box");
let getItems = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : [];
const getCheckOutItems = getItems.filter(({ isCheckOut }) => isCheckOut);
console.log(getCheckOutItems);
function renderCheckOutProducts(checkOutProducts) {
  if (checkOutProducts.length) {
    checkoutPage.classList.add("grid");
    checkoutPage.classList.remove("hidden");
    Array.from(checkOutProducts).map((checkOutProducts) => {
      checkoutPage.innerHTML += `<div>
                      <div
                        style="box-shadow: 0 0 3px black"
                        class="w-full flex items-center rounded-md relative justify-between lg:h-[150px] flex-col lg:flex-row"
                      >
                        <div class="flex space-x-2 flex-col lg:flex-row lg:justify-start justify-center items-center space-y-2 lg:space-y-0">
                          <div
                            class="w-8 h-8 rounded-full p-1 bg-[${
                              checkOutProducts.themeColor
                            }] flex items-center justify-center absolute right-[-10px] top-[-10px] z-[999]"
                          >
                            <img
                              src="${checkOutProducts.icon}"
                              width="20"
                              alt="${checkOutProducts.type}"
                            />
                          </div>
                          <img
                            src="${checkOutProducts.imgUrl}"
                            alt="${checkOutProducts.name}"
                            width="140"
                          />
                          <div
                            class="flex flex-col space-y-2 items-center justify-center"
                          >
                            <h2 class="text-primary text-2xl font-bold">${
                              checkOutProducts.name
                            }</h2>
                            <div>
                              <span class="text-yellow-500 text-lg"
                                ><ion-icon name="star"></ion-icon
                              ></span>
                              <span class="text-yellow-500 text-lg"
                                ><ion-icon name="star"></ion-icon
                              ></span>
                              <span class="text-yellow-500 text-lg"
                                ><ion-icon name="star"></ion-icon
                              ></span>
                              <span class="text-yellow-500 text-lg"
                                ><ion-icon name="star"></ion-icon
                              ></span>
                              <span class="text-yellow-500 text-lg"
                                ><ion-icon name="star"></ion-icon
                              ></span>
                            </div>
                            <h2 class="font-bold text-secondary">${
                              checkOutProducts.basePrice
                            }$/${
        checkOutProducts.isPerPound ? "lb" : "each"
      }</h2>
                          </div>
                        </div>
                        <div
                          class="pr-2 flex flex-col lg:justify-end lg:items-end justify-center items-center h-full py-1.5"
                        >
                          <p class="text-secondary text-lg font-bold">x${
                            checkOutProducts.order
                          }</p>
                          <h2 class="text-secondary text-xl font-semibold">
                            Total: <span>${checkOutProducts.price}$</span>
                          </h2>
                          <div class="flex space-x-2">
                            <button
                            onclick="removeCheckOutItem(${
                              checkOutProducts.checkOutId
                            })"
                              class="py-2 px-3 rounded-sm text-white bg-[${
                                checkOutProducts.themeColor
                              }] font-bold"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>`;
    });
  } else {
    // emptyPage.style.display = "flex";
    // cartPage.classList.add("hidden");
    // cartPage.classList.remove("grid");
  }
}
function searchProduct(e) {
  const searchName = e.target.value.trim();
  console.log(searchName);
  const filteredSearchName = getCheckOutItems.filter((product) =>
    product.name.toLowerCase().includes(searchName.toLowerCase())
  );
  checkoutPage.innerHTML = ``;
  renderCheckOutProducts(filteredSearchName);
}
function renderCartProductsLength() {
  document.querySelector(".add-to-cart-length").textContent = getItems.length;
}
function displayTotalAmount(totalCheckOutAmount) {
  const total = totalCheckOutAmount.reduce((acc, { price }) => {
    return acc + price;
  }, 0);
  const formattedNumber = new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 2,
  }).format(total);
  totalAmount.textContent = `${formattedNumber}$`;
}
function displayTotalItems(totalCheckOutItems) {
  totalItems.textContent = totalCheckOutItems.length;
}
function removeCheckOutItem(checkOutId) {
  const getAllProducts = getItems.map((product) => {
    if (product.checkOutId === checkOutId) {
      return {
        ...product,
        isCheckOut: !product.isCheckOut,
      };
    } else {
      return product;
    }
  });
  localStorage.setItem("cart", JSON.stringify(getAllProducts));
  getItems = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [];
  const updatedGetCheckOutItems = getItems.filter(
    ({ isCheckOut }) => isCheckOut
  );
  checkoutPage.innerHTML = ``;
  renderCheckOutProducts(updatedGetCheckOutItems);
  displayTotalAmount(updatedGetCheckOutItems);
  displayTotalItems(updatedGetCheckOutItems);
}
displayTotalItems(getCheckOutItems);
displayTotalAmount(getCheckOutItems);
renderCartProductsLength();
renderCheckOutProducts(getCheckOutItems);
searchBox.addEventListener("input", searchProduct);
