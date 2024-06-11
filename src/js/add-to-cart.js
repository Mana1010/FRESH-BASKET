const cartPage = document.querySelector(".cart-page");
const emptyPage = document.querySelector(".empty-page");
const itemsCount = document.querySelector(".items-count");
const sortBySelect = document.querySelector(".sort-by-select");
const getProducts = localStorage.getItem("cart")
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
                      class="w-full flex items-center rounded-md relative justify-between lg:h-[150px]"
                    >
                      <div class="flex space-x-2">
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
                        class="pr-2 flex flex-col justify-end items-end h-full py-1.5"
                      >
                        <p class="text-secondary text-lg font-bold">x${
                          cartProduct.order
                        }</p>
                        <h2 class="text-secondary text-xl font-semibold">
                          Total: <span>${cartProduct.price}$</span>
                        </h2>
                        <div class="flex space-x-2">
                          <button
                            class="py-2 px-3 rounded-sm text-secondary border-[${
                              cartProduct.themeColor
                            }] border-[1px] font-bold"
                          >
                            Remove
                          </button>
                          <button
                            class="py-2 px-3 rounded-sm text-white bg-[${
                              cartProduct.themeColor
                            }] font-bold"
                          >
                            Place Order
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
  console.log("Hello");
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
renderAddedCartProducts(getProducts);
sortBySelect.addEventListener("input", sortBy);
