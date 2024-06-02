const clearSearchBoxBTN = document.querySelector("#remove-search-button");
const inputSearchBox = document.querySelector("#input-search-box");

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
async function getItem() {
  try {
    const response = await fetch("http://127.0.0.1:5500/db/product.json");
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}
async function displayProduct() {
  const currentUrl = location.href.split("#");
  const currenttSection = currentUrl.at(-1);
  const products = await getItem();
  products.forEach((product) => {
    console.log(product.id);
  });
}

getItem();
displayProduct();
window.addEventListener("popstate", displayProduct);
inputSearchBox.addEventListener("input", trackChanges);
clearSearchBoxBTN.addEventListener("click", clearSearchBox);
