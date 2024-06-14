const checkoutPage = document.querySelector(".checkout-page");
const totalAmount = document.querySelector(".total-amount");
const totalItems = document.querySelector(".total-items");
const searchBox = document.querySelector("#input-search-box");
const emptyPage = document.querySelector(".empty-page");
const noSearchFound = document.querySelector(".no-search-found-page");
const placeOrderbtn = document.querySelector(".place-order-btn");
const addToCartLength = document.querySelector(".add-to-cart-length");
const orderHistoryLength = document.querySelector(".order-history-length");
let getItems = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : [];
const getCheckOutItems = getItems.filter(({ isCheckOut }) => isCheckOut);
function renderCheckOutProducts(checkOutProducts) {
  if (checkOutProducts.length) {
    placeOrderbtn.removeAttribute("disabled");
    placeOrderbtn.classList.remove("disabled:bg-slate-400");
    emptyPage.style.display = "none";
    checkoutPage.classList.add("grid");
    checkoutPage.classList.remove("hidden");
    Array.from(checkOutProducts).map((checkOutProducts) => {
      checkoutPage.innerHTML += `<div>
                      <div
                        style="box-shadow: 0 0 3px black"
                        class="w-full flex items-center rounded-md relative justify-between lg:h-[160px] flex-col lg:flex-row"
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
    emptyPage.style.display = "flex";
    checkoutPage.classList.add("hidden");
    checkoutPage.classList.remove("grid");
    placeOrderbtn.setAttribute("disabled", true);
    placeOrderbtn.classList.add("disabled:bg-slate-400");
  }
}
function searchProduct(e) {
  const rendergetCheckOutItems = getItems.filter(
    ({ isCheckOut }) => isCheckOut
  );
  const searchName = e.target.value.trim();
  const filteredSearchName = rendergetCheckOutItems.filter((product) =>
    product.name.toLowerCase().includes(searchName.toLowerCase())
  );
  if (!filteredSearchName.length && searchName) {
    document.querySelector(".keyword").textContent = `"${
      searchName.length >= 40 ? `${searchName.slice(0, 40)}...` : searchName
    }"`;
    noSearchFound.style.display = "flex";
    emptyPage.style.display = "none";
    checkoutPage.style.display = "none";
  } else {
    noSearchFound.style.display = "none";
    emptyPage.style.display = "flex";
    checkoutPage.style.display = "grid";
    checkoutPage.innerHTML = ``;
    renderCheckOutProducts(filteredSearchName);
  }
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

function randomCode() {
  const trackingNumber = [];
  const randomChar =
    "335424713242324354575345767879897557687989824343546889786756223244349479301934826925623925468233413361936818091381357231478453504934";
  for (let i = 0; i < 15; i++) {
    const randomize = Math.floor(Math.random() * randomChar.length);
    trackingNumber.push(randomChar[randomize]);
  }
  return +trackingNumber.join("");
}
function addToOrderHistory(getOrders) {
  const getOrderData = localStorage.getItem("order-history")
    ? JSON.parse(localStorage.getItem("order-history"))
    : [];
  const orderHistoryData = getOrders.map((order) => {
    const trackingNumber = randomCode();
    return {
      ...order,
      trackingId: trackingNumber,
    };
  });
  localStorage.setItem(
    "order-history",
    JSON.stringify([...orderHistoryData, ...getOrderData])
  );
  const getUpdatedOrderHistory = localStorage.getItem("order-history")
    ? JSON.parse(localStorage.getItem("order-history"))
    : [];
  displayOrderHistoryLength(getUpdatedOrderHistory);
}
function placeOrder() {
  if (getCheckOutItems.length) {
  }
  const total = getCheckOutItems.reduce((acc, { price }) => {
    return acc + price;
  }, 0);
  const formattedNumber = new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 2,
  }).format(total);
  Swal.fire({
    title: "Confirm Order",
    html: `Your total puchase is: <strong>${formattedNumber}$</strong>`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#E56E1E",
    cancelButtonColor: "#d33",
    confirmButtonText: "Place Order",
  }).then((result) => {
    if (result.isConfirmed) {
      const getUncheckItems = getItems.filter(({ isCheckOut }) => !isCheckOut);
      localStorage.setItem("cart", JSON.stringify(getUncheckItems));
      getItems = localStorage.getItem("cart")
        ? JSON.parse(localStorage.getItem("cart"))
        : [];
      const getUpdatedCheckItems = getItems.filter(
        ({ isCheckOut }) => isCheckOut
      );
      placeOrderbtn.setAttribute("disabled", true);
      placeOrderbtn.classList.add("disabled:bg-slate-400");
      addToCartLength.textContent = getItems.length;
      checkoutPage.innerHTML = ``;
      addToOrderHistory(getCheckOutItems);
      displayTotalItems(getUpdatedCheckItems);
      displayTotalAmount(getUpdatedCheckItems);
      renderCheckOutProducts(getUpdatedCheckItems);
      Swal.fire({
        title: "Order Placed",
        html: "Thank you for purchasing from <strong>FRESH BASKET</strong>",
        icon: "success",
      });
    }
  });
}
function displayOrderHistoryLength(getItems) {
  orderHistoryLength.textContent = getItems.length;
}
const getOrderHistory = localStorage.getItem("order-history")
  ? JSON.parse(localStorage.getItem("order-history"))
  : [];
displayOrderHistoryLength(getOrderHistory);
displayTotalItems(getCheckOutItems);
displayTotalAmount(getCheckOutItems);
renderCartProductsLength();
renderCheckOutProducts(getCheckOutItems);
placeOrderbtn.addEventListener("click", placeOrder);
searchBox.addEventListener("input", searchProduct);
