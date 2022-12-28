import { isMobile, removeClasses } from "./functions.js";
// Подключение списка активных модулей
import { flsModules } from "./modules.js";

window.onload = function () {
  const body = document.body;
  // Header fixing
  const headerElement = document.querySelector('.header') ?? document.querySelector(".project-header");

  const callback = function (entries, observer) {
    if (entries[0].isIntersecting) {
      // console.log(headerElement);
      headerElement.classList.remove('_scroll')
    } else {
      headerElement.classList.add('_scroll')
    }
  }

  const headerObserver = new IntersectionObserver(callback)
  headerObserver.observe(headerElement)

  const quizButton = document.querySelector(".quiz__button")

  if (quizButton) {
    quizButton.addEventListener("click", (e) => {
      e.preventDefault()
      Marquiz.showModal('62a9d7fb7cd214004ab0c35a')
    })
  }

  const menuLinks = document.querySelectorAll(".menu__link[data-spoller]");

  if (window.location.pathname === "/developers") {
    const mainBlockDeveloper = document.querySelector(".main-blog_developers");

    if (mainBlockDeveloper) {
      mainBlockDeveloper.classList.add("main-block-js");
    }
  }
  if (body.dataset.convert) {
    // console.log('asd');
    const dataCurrency = body.dataset.convert.split(",");
    const api = `https://v6.exchangerate-api.com/v6/fb6a4624d4a8b975c011b97f/latest/${dataCurrency[0].toUpperCase()}`;

    function getResults() {
      fetch(`${api}`)
        .then(currency => {
          return currency.json();
        }).then(displayResults);
    }

    function displayResults(currency) {
      let fromRate = currency.conversion_rates[dataCurrency[0].toUpperCase()];
      let toRate = currency.conversion_rates.USD;
      const valueOfCurrency = ((toRate / fromRate) * dataCurrency[1]).toFixed(2);

      console.log(currency.conversion_rates, valueOfCurrency);
    }

    getResults()
  }
}

document.addEventListener("click", documentActions);

document.addEventListener("mouseover", (event) => {
  const targetItem = event.target;

  if (window.innerWidth > 991) {
    if (targetItem.closest(".menu__item")) {
      const menuItem = targetItem.closest(".menu__item");
      menuItem.classList.add("_hover")
    }
  }
})

document.addEventListener("mouseout", (event) => {
  const targetItem = event.target;
  if (window.innerWidth > 991) {
    if (targetItem.closest(".menu__item")) {
      const menuItem = targetItem.closest(".menu__item");
      menuItem.classList.remove("_hover")
    }
  }
})

function documentActions(e) {
  const targetitem = e.target;
  if (window.innerWidth > 768 && isMobile.any()) {
    if (targetitem.classList.contains("menu-project__link") || targetitem.classList.contains("menu-project__arrow")) {
      // targetitem.classList.toggle("_hover");
      targetitem.closest(".menu-project__item").classList.toggle("_hover");
    }
    if (!targetitem.closest(".menu-project__item") && document.querySelectorAll(".menu-project__item._hover").length > 0) {
      removeClasses(document.querySelectorAll(".menu-project__item._hover"), "_hover")
    }
  }
  if (targetitem.closest(".menu__item")) {
    if (targetitem.closest(".menu__sub-blog")) {
      return;
    }
    targetitem.closest(".menu__item").classList.toggle("_hover");
  }
  if (targetitem.closest("[data-popup-content]")) {
    const dataPopupContent = targetitem.closest("[data-popup-content]").dataset.popupContent.split(",");
    const inputHiddenContents = document.querySelectorAll(".popup-discover__item_hidden input");
    for (let i = 0; i < dataPopupContent.length; i++) {
      const input = inputHiddenContents[i];
      input.value = dataPopupContent[i];
    }
    // dataPopupContent.forEach((content, id) => {
    //     inputHiddenContents[id].value = content;
    // });
  }
  if (targetitem.closest("[data-dropdown-button]")) {
    targetitem.closest("[data-dropdown-parent]").classList.toggle("_active");
  }
  if (!targetitem.closest("[data-dropdown-button]") && document.querySelectorAll("[data-dropdown-parent]._active").length > 0) {
    removeClasses(document.querySelectorAll("[data-dropdown-parent]._active"), "_active")
  }
  if (targetitem.closest("[data-currency-value]")) {
    const dataCurrency = targetitem.closest("[data-currency]");
    const dataCurrencyValue = targetitem.closest("[data-currency-value]").dataset.currencyValue;
    const dataCurrencySet = dataCurrency.querySelector("[data-currency-set]");
    let valueCurrency = dataCurrencyValue.split(",").join(" ");

    if (document.querySelectorAll("[data-currency-value]._selected").length > 0) {
      removeClasses(document.querySelectorAll("[data-currency-value]._selected"), "_selected");
      targetitem.closest("[data-currency-value]").classList.add("_selected");
    }

    dataCurrencySet.textContent = valueCurrency;
  }
  if (targetitem.closest("[data-get-gallery]")) {
    console.log(flsModules.gallery[0].galleryClass.openGallery());
  }
}

