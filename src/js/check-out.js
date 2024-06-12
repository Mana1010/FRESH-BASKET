const checkoutPage = document.querySelector(".checkout-page");
const totalAmount = document.querySelector(".total-amount");
const getItems = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : [];
const getCheckOutItems = getItems.filter(({ isCheckOut }) => isCheckOut);
console.log(getCheckOutItems);
function renderCheckOutProducts(checkOutProducts) {
  if (checkOutProducts.length) {
    // emptyPage.style.display = "none";
    checkoutPage.classList.add("grid");
    checkoutPage.classList.remove("hidden");
    Array.from(checkOutProducts).map((cartProduct) => {
      checkoutPage.innerHTML += `<div>
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
                            onclick="removeCartProduct(${cartProduct.id})"
                              class="py-2 px-3 rounded-sm text-white bg-[${
                                cartProduct.themeColor
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
function renderCartProductsLength() {
  document.querySelector(".add-to-cart-length").textContent = getItems.length;
}
function displayTotalAmount(totalCheckOutAmount) {
  const total = totalCheckOutAmount.reduce((acc, { price }) => {
    return acc + price;
  }, 0);
  totalAmount.textContent = `${total}$`;
}
displayTotalAmount(getCheckOutItems);
renderCartProductsLength();
renderCheckOutProducts(getCheckOutItems);
