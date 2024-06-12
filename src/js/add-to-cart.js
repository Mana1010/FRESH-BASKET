const cartPage = document.querySelector(".cart-page");
const emptyPage = document.querySelector(".empty-page");
const itemsCount = document.querySelector(".items-count");
const sortBySelect = document.querySelector(".sort-by-select");
const searchBox = document.querySelector("#input-search-box");
const noSearchFound = document.querySelector(".no-search-found-page");
let getProducts = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : [];
function renderAddedCartProducts(cartProducts) {
  if (cartProducts.length) {
    emptyPage.style.display = "none";
    cartPage.classList.add("grid");
    cartPage.classList.remove("hidden");
    Array.from(cartProducts).map((cartProduct) => {
      cartPage.innerHTML += `<div class="flex flex-col space-y-2">
                    <h6 class="text-secondary font-semibold">${new Date(
                      cartProduct.addedCartDate
                    ).toLocaleString()}</h6>
                    <div
                      style="box-shadow: 0 0 3px black"
                      class="w-full flex items-center rounded-md relative justify-between lg:h-[150px] flex-col lg:flex-row"
                    >
                      <div class="flex space-x-2 flex-col lg:flex-row lg:justify-start justify-center items-center space-y-2 lg:space-y-0">
                        <div
                          class="w-8 h-8 rounded-full p-1 bg-[${
                            cartProduct.themeColor
                          }] flex items-center justify-center absolute right-[-10px] top-[-10px] z-[999]"
                        >
                          <img
                            src="${cartProduct.icon}"
                            width="20"
                            alt="${cartProduct.type}"
                          />
                        </div>
                        <img
                          src="${cartProduct.imgUrl}"
                          alt="${cartProduct.name}"
                          width="140"
                        />
                        <div
                          class="flex flex-col space-y-2 items-center justify-center"
                        >
                          <h2 class="text-primary text-2xl font-bold">${
                            cartProduct.name
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
                            cartProduct.basePrice
                          }$/${cartProduct.isPerPound ? "lb" : "each"}</h2>
                        </div>
                      </div>
                      <div
                        class="pr-2 flex flex-col lg:justify-end lg:items-end justify-center items-center h-full py-1.5"
                      >
                        <p class="text-secondary text-lg font-bold">x${
                          cartProduct.order
                        }</p>
                        <h2 class="text-secondary text-xl font-semibold">
                          Total: <span>${cartProduct.price}$</span>
                        </h2>
                        <div class="flex space-x-2">
                          <button
                         ${cartProduct.isCheckOut && "disabled='disabled'"}
                          onclick="removeCartProduct(${
                            cartProduct.addToCartId
                          })"
                            class="py-2 px-3 rounded-sm text-secondary text-sm border-[${
                              cartProduct.themeColor
                            }] border-[1px] font-bold"
                          >
                            Remove
                          </button>
                          <button
                          onclick="checkOut(${cartProduct.addToCartId})"
                            class="py-2 px-3 rounded-sm text-sm ${
                              cartProduct.isCheckOut
                                ? `border-[1px] border-[${cartProduct.themeColor}] text-secondary`
                                : `bg-[${cartProduct.themeColor}] text-white`
                            } font-bold"
                          >
                            ${
                              cartProduct.isCheckOut
                                ? "Cancel Checkout"
                                : "Checkout"
                            }
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>`;
    });
  } else {
    emptyPage.style.display = "flex";
    cartPage.classList.add("hidden");
    cartPage.classList.remove("grid");
  }
  itemsCount.textContent = getProducts.length;
}
function sortBy(e) {
  const value = e.target.value;
  cartPage.innerHTML = ``;
  if (value === "by-latest") {
    const sortByLatest = getProducts.sort(
      (a, b) => b.addedCartDate - a.addedCartDate
    );
    renderAddedCartProducts(sortByLatest);
  } else {
    const sortByOldest = getProducts.sort(
      (a, b) => a.addedCartDate - b.addedCartDate
    );
    renderAddedCartProducts(sortByOldest);
  }
}
function removeCartProduct(addToCartId) {
  const updatedProducts = getProducts.filter(
    (product) => product.addToCartId !== addToCartId
  );
  localStorage.setItem("cart", JSON.stringify(updatedProducts));
  getProducts = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [];
  cartPage.innerHTML = ``;
  renderAddedCartProducts(getProducts);
}
function checkOut(addToCartId) {
  const checkOutItems = getProducts.map((product) => {
    if (product.addToCartId === addToCartId) {
      return {
        ...product,
        isCheckOut: !product.isCheckOut,
      };
    } else {
      return product;
    }
  });
  localStorage.setItem("cart", JSON.stringify(checkOutItems));
  getProducts = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [];
  cartPage.innerHTML = ``;
  renderCheckOutLength(getProducts);
  renderAddedCartProducts(getProducts);
}
function searchProduct(e) {
  const searchName = e.target.value.trim();
  const filteredSearchName = getProducts.filter((product) =>
    product.name.toLowerCase().includes(searchName.toLowerCase())
  );
  if (!filteredSearchName.length) {
    document.querySelector(".keyword").textContent = `"${searchName}"`;
    noSearchFound.style.display = "flex";
    cartPage.style.display = "none";
  } else {
    noSearchFound.style.display = "none";
    cartPage.style.display = "grid";
    cartPage.innerHTML = ``;
    renderAddedCartProducts(filteredSearchName);
  }
}
function renderCheckOutLength(checkOutProducts) {
  const filteredProduct = checkOutProducts.filter(
    ({ isCheckOut }) => isCheckOut
  );
  document.querySelector(".checkout-length").textContent =
    filteredProduct.length;
}

renderCheckOutLength(getProducts);
renderAddedCartProducts(getProducts);
searchBox.addEventListener("input", searchProduct);
sortBySelect.addEventListener("input", sortBy);
