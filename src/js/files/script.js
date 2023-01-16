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

  const headerObserver = new IntersectionObserver(callback);
  headerElement ? headerObserver.observe(headerElement) : null;

  const quizButton = document.querySelector(".quiz__button")

  // if (isMobile.iOS()) {
  //   body.classList.add("_is-iphone");
  // }

  if (quizButton) {
    quizButton.addEventListener("click", (e) => {
      e.preventDefault()
      Marquiz.showModal('62a9d7fb7cd214004ab0c35a')
    })
  }

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

  telInputHandler();

  if (document.querySelector(".questions__title")) {
    const questionTitle = document.querySelector(".questions__title");
    questionTitle.insertAdjacentHTML("beforeend", `<span class="questions__title-stroke">${questionTitle.innerHTML}</span>`);
  }

  if (window.innerWidth < 767.98) {
    const mainTabIndex = document.querySelector(".main-index-tabs");

    mainTabIndex.removeAttribute("data-tabs-titles");

    Array.from(mainTabIndex.children).forEach(item => {
      item.removeAttribute("data-tabs-titles");
      item.removeAttribute("data-tabs-body");
    });
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

  if (isMobile.any()) {
    if (window.innerWidth > 767.98) {
      if (targetitem.closest(".header-index-menu__label")) {
        const parentElement = targetitem.closest(".header-index-menu__label").parentElement;
        parentElement.classList.toggle("_hover");
      }

      if (!targetitem.closest(".header-index-menu__label") && document.querySelectorAll(".header-index-menu__button._hover").length > 0) {
        removeClasses(document.querySelectorAll(".header-index-menu__button._hover"), "_hover");
      }
    }

    if (targetitem.closest(".actions-header-index__label")) {
      const parentElement = targetitem.closest(".actions-header-index__label").parentElement;
      parentElement.classList.toggle("_hover");
    }

    if (!targetitem.closest(".actions-header-index__label") && document.querySelectorAll(".actions-header-index__choose-language._hover").length > 0) {
      removeClasses(document.querySelectorAll(".actions-header-index__choose-language._hover"), "_hover");
    }
  }
}

function telInputHandler() {
  const telInputs = document.querySelectorAll(".country-phones");

  if (telInputs.length) {

    telInputs.forEach((input) => {
      const inputIti = window.intlTelInput(input, {
        preferredCountries: ["us", "uz", "ru"],
        autoHideDialCode: false,
        autoPlaceholder: "aggressive",
        // initialCountry: "auto",
        // separateDialCode: true,

        customPlaceholder: function (selectedCountryPlaceholder, selectedCountryData) {
          return '' + selectedCountryPlaceholder.replace(/[0-9]/g, 'X');
        },

        utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.min.js",
      });


      $(input).on("focus click countrychange", function (e, countryData) {
        const pl = $(this).attr('placeholder') + '';
        const res = pl.replace(/X/g, '9');

        if (res != 'undefined') {
          $(this).inputmask(res, { placeholder: "X", clearMaskOnLostFocus: true });
        }
      });

      $(input).on("focusout", function (e, countryData) {
        const intlNumber = inputIti.getNumber();

        console.log(intlNumber);
      });
    });

    // $('input[name="leyka_donor_phone"]')

    // $('input[name="leyka_donor_phone"]')

  }
}


// function questionScrollImages(elements) {
//   const questionImageParent = document.querySelector(".questions__images");

//   function offset(el) {
//     const rect = el.getBoundingClientRect(),
//       scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
//       scrollTop = window.pageYOffset || document.documentElement.scrollTop;
//     return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
//   }

//   document.addEventListener("scroll", () => {

//     for (let index = 0; index < elements.length; index++) {
//       const imageAnimOriginal = elements[index].lastElementChild,
//         offsetImage = offset(imageAnimOriginal);
//       const imageAnimSource = elements[index].firstElementChild,
//         offsetSource = offset(imageAnimSource);

//     }
//   });
// }