const orderHistoryPage = document.querySelector(".order-history-page");
const emptyPage = document.querySelector(".empty-page");
const noSearchFound = document.querySelector(".no-search-found-page");
const totalAmount = document.querySelector(".total-amount");
const totalItems = document.querySelector(".total-items");
const checkOutLength = document.querySelector(".checkout-length");
const addToCartLength = document.querySelector(".add-to-cart-length");

const getOrderItems = localStorage.getItem("order-history")
  ? JSON.parse(localStorage.getItem("order-history"))
  : [];

function renderOrderHistory(getOrderPlaced) {
  getOrderPlaced.map((order) => {
    orderHistoryPage.innerHTML += `<div>
          <div
            style="box-shadow: 0 0 3px black"
            class="w-full flex items-center rounded-md relative justify-between lg:h-[160px] flex-col lg:flex-row"
          >
            <div
              class="flex space-x-2 flex-col lg:flex-row lg:justify-start justify-center items-center space-y-2 lg:space-y-0"
            >
              <div
                class="w-8 h-8 rounded-full p-1 bg-[${order.themeColor}] flex items-center justify-center absolute right-[-10px] top-[-10px] z-[999]"
              >
                <img
                  src="${order.icon}"
                  width="20"
                  alt="${order.type}"
                />
              </div>
              <img
                src="${order.imgUrl}"
                alt="${order.name}"
                width="140"
              />
              <div class="flex flex-col space-y-2 items-center justify-center">
                <h2 class="text-primary text-2xl font-bold">${order.name}</h2>
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
                <h2 class="font-bold text-secondary">${order.basePrice}$/lbs</h2>
              </div>
            </div>
            <div
              class="pr-2 flex flex-col lg:justify-between lg:items-end justify-center items-center h-full py-1.5"
            >
              <div class="flex space-x-1 flex-col">
                <h5 class="font-bold text-[0.9rem]">Tracking Number:</h5>
                <p class="text-[0.8rem] text-secondary">${order.trackingId}</p>
              </div>
              <div class="flex items-end justify-end flex-col">
                <p class="text-secondary text-lg font-bold">${order.order}x</p>
                <h2 class="text-secondary text-xl font-semibold">
                  Total: <span>${order.price}$</span>
                </h2>
              </div>
              <div class="flex flex-col space-y-1">
                <div
                  class="flex items-center space-x-1 justify-center md:justify-normal"
                >
                </div>
                <button
                disabled
                  class="py-2 px-3 rounded-sm text-primary text-white font-bold flex items-center space-x-2 bg-slate-400"
                >
                  <span> Pending</span>
                  <img src="../images/delivery-icon.png" width="20" />
                </button>
              </div>
            </div>
          </div>
        </div>`;
  });
}
function displayTotalPurchase(totalCheckOutAmount) {
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
function displayLength() {
  const getCartItems = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [];
  const getCheckedItems = getCartItems.filter(({ isCheckOut }) => isCheckOut);
  checkOutLength.textContent = getCheckedItems.length;
  addToCartLength.textContent = getCartItems.length;
}
displayLength();
displayTotalItems(getOrderItems);
displayTotalPurchase(getOrderItems);
renderOrderHistory(getOrderItems);
