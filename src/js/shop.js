import { productItems } from "../../db/product.js";
const clearSearchBoxBTN = document.querySelector("#remove-search-button");
const inputSearchBox = document.querySelector("#input-search-box");
const backToTopBtn = document.querySelector(".back-to-top-btn");
const productSection = document.querySelector("#product-section");
const paginationBtn = document.querySelectorAll("#pagination-btn-group > a");
const footerPagination = document.querySelector(".pagination");

function reusableVariables() {
  const currentUrl = location.href.split(/[#|/]/);

  const currentSection =
    currentUrl.at(-1).split("-")[0] !==
    "http://127.0.0.1:5500/src/pages/store.html"
      ? currentUrl.at(-2).split("-")[0]
      : "";
  const filteredProduct = productItems.filter(
    (product) => currentSection === product.type
  );
  const updatedProducts = filteredProduct.length
    ? filteredProduct
    : productItems;
  const updatedParams = +currentUrl.at(-1) - 1;
  const currentSectionParams = updatedProducts.slice(
    updatedParams * 8 === 0 ? 0 : updatedParams * 8,
    +currentUrl.at(-1) * 8
  );
  const piecesOfPaginationBtn = Math.ceil(updatedProducts.length / 8);
  return {
    updatedParams,
    piecesOfPaginationBtn,
    currentSection,
    filteredProduct,
    currentSectionParams,
  };
}
//This is a reusable function to use to render the products in web page
function renderProducts(products) {
  products.map((product) => {
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
        <span class="text-yellow-500 text-lg"><ion-icon name="star"></ion-icon></span>
        <span class="text-yellow-500 text-lg"><ion-icon name="star"></ion-icon></span>
        <span class="text-yellow-500 text-lg"><ion-icon name="star"></ion-icon></span>
        <span class="text-yellow-500 text-lg"><ion-icon name="star"></ion-icon></span>
        <span class="text-yellow-500 text-lg"><ion-icon name="star"></ion-icon></span>
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
function renderPaginationFooter() {
  const { piecesOfPaginationBtn, updatedParams } = reusableVariables();
  const currentSecondUrl = location.href.split("").slice(0, -1).join("");
  new Array(piecesOfPaginationBtn).fill(0).map((product, index) => {
    // footerPagination.innerHTML += "<button class="border-[1px] border-primary text-primary px-4 py-2">1</button>";
    const createBtn = document.createElement("a");
    createBtn.textContent = index + 1;
    createBtn.classList.add(
      `border-[1px]`,
      `border-primary`,
      `${updatedParams === index ? "text-white" : "text-primary"}`,
      `${updatedParams === index ? "bg-primary" : "bg-transparent"}`,
      `px-4`,
      `py-2`
    );
    createBtn.setAttribute("href", `${currentSecondUrl}${index + 1}`);
    // createBtn.href = ``
    footerPagination.appendChild(createBtn);
  });
}
// This two function is for the search box
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

//This function is for the arrow button that it will appear when the user scrolled down the page and when the user clicked it the web page will automatically scrolled up on its own
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
  const { currentSectionParams } = reusableVariables();
  for (let i = 0; i < currentSectionParams.length; i++) {
    if (currentSectionParams[i].id == id) {
      currentSectionParams[i].order++;
    }
  }

  displayProduct();
}
function subtractOrder(id) {
  const { currentSectionParams } = reusableVariables();
  console.log(currentSectionParams.length);
  for (let i = 0; i < currentSectionParams.length; i++) {
    if (currentSectionParams[i].id == id) {
      if (currentSectionParams[i].order > 0) {
        currentSectionParams[i].order--;
      }
    }

    displayProduct();
  }
}
window.subtractOrder = subtractOrder;
window.addOrder = addOrder;
function backToTop() {
  window.scrollTo(0, 0);
}
export async function displayProduct() {
  const { currentSection, currentSectionParams } = reusableVariables();
  const btnColorsCategory = [
    {
      category: "",
      color: "#E56E1E",
    },
    {
      category: "meat",
      color: "#CA0000",
    },
    {
      category: "seafood",
      color: "#1B7080",
    },
    {
      category: "vegetable",
      color: "#91AB24",
    },
    {
      category: "fruit",
      color: "#EE3841",
    },
  ];
  for (const type of btnColorsCategory) {
    if (type.category === currentSection) {
      Array.from(paginationBtn).map((btn) => {
        const getCategory =
          btn.getAttribute("href").split("-")[0].slice(1)[0] === "/"
            ? ""
            : btn.getAttribute("href").split("-")[0].slice(1);
        if (currentSection === getCategory) {
          btn.classList.remove(`bg-[#93959A]`);
          btn.classList.add(`bg-[${type.color}]`);
        }
      });
    } else {
      Array.from(paginationBtn).map((btn) => {
        const getCategory = btn.getAttribute("href").split("-")[0].slice(1);
        if (currentSection !== getCategory) {
          btn.classList.remove(`bg-[${type.color}]`);
          btn.classList.add(`bg-[#93959A]`);
        }
      });
    }
  }
  productSection.innerHTML = ``;
  footerPagination.innerHTML = ``;
  renderPaginationFooter();
  renderProducts(currentSectionParams);
}
displayProduct();
backToTopBtn.addEventListener("click", backToTop);
window.addEventListener("scroll", handleScrollPx);
window.addEventListener("popstate", displayProduct);
inputSearchBox.addEventListener("input", trackChanges);
clearSearchBoxBTN.addEventListener("click", clearSearchBox);
