const backToTop = document.querySelector("#back-to-top");
const form = document.querySelector("form");
const navLinks = document.querySelectorAll(".nav-link");
const menu = document.querySelector("#menu");
const buttonMenu = document.querySelector("#button-menu");
//This function is use to scroll at the very top of the window

function backToTopFunc() {
  window.scrollTo(0, 0);
}

function submitForm(e) {
  e.preventDefault();
  Swal.fire({
    title: "Good job!",
    text: "Your Message successfully submitted",
    icon: "success",
  });
}
function handleUrlChange() {
  const currentUrl = location.href.split("#");
  const pathname = currentUrl.at(-1);
  navLinks.forEach((link) => {
    const currentLink = link.getAttribute("href");
    if (currentLink === `#${pathname}`) {
      link.classList.add("bg-[#E56E1E]");
      console.log(link);
    } else {
      link.classList.remove("bg-[#E56E1E]");
    }
  });
}

function showMainMenu() {
  if (menu.classList.contains("hidden")) {
    menu.classList.add("block");
    menu.classList.remove("hidden");
  } else {
    menu.classList.add("hidden");
    menu.classList.remove("block");
  }
}
handleUrlChange();
window.addEventListener("popstate", handleUrlChange);
form.addEventListener("submit", submitForm);
backToTop.addEventListener("click", backToTopFunc);
buttonMenu.addEventListener("click", showMainMenu);
