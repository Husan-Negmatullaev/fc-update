import { getResource } from "../functions.js";


export async function pageBlog() {

    // Fakes the loading setting a timeout
    


    // const body = document.body;
    // if (location.pathname === "/blog.html") {

    //     const dataText = await getResource("/text/");
    //     document.querySelector("meta[name='keywords']").setAttribute("content", dataText[0].key_text)


    //     setTimeout(function () {
    //         $('body').addClass('loaded');
    //         console.log('blog.html');
    //     }, 5000);

    //     const blog = await getResource("/blog/");
    //     const data = await getResource("/an_object/");

    //     const overviewsWrapper = document.querySelector(".news-blog__body");

    //     blog.forEach((char, index) => {
    //         const afterFiveDays = new Date(char.created).addDays(5);
    //         const afterThirtyDays = new Date(char.created).addDays(30);
    //         const timeProject = new Date().getTime() <= afterFiveDays.getTime();

    //         if (new Date().getTime() >= afterThirtyDays.getTime()) return;

    //         const div = document.createElement("div");
    //         div.className = "news-blog__card card-news";
    //         div.innerHTML = `
    //            <div class="card-news__body">
    //                 <a href="/sub-blog.html#${char.id}" class="card-news__image-ibg"><img src="${char.mainphoto}" alt=""></a>
    //                 <div class="card-news__date">
    //                     <span class="card-news__icon _icon-calendar"></span>
    //                     <span class="card-news__date-text">
    //                         ${char.created}
    //                     </span>
    //                 </div>
    //                 <div class="card-news__content">
    //                     <div class="card-news__type-projects">
    //                         ${timeProject ? "Новый проект" : ""}
    //                     </div>
    //                     <div class="card-news__title">${char.title}</div>
    //                     <div class="card-news__text">${char.description_ru_ru}</div>
    //                     <a href="/sub-blog.html#${char.id}" class="card-news__button button button_small">
    //                         Подробнее
    //                     </a>
    //                 </div>
    //             </div>`;
    //         overviewsWrapper.appendChild(div)
    //     })


    //     // Get the modal
    //     var modal = document.getElementById("myModal");

    //     modal.style.display = "none";




    //     // Get the button that opens the modal
    //     var btn = document.getElementById("myBtn");

    //     // Get the <span> element that closes the modal
    //     var span = document.getElementsByClassName("close")[0];

    //     // When the user clicks the button, open the modal


    //     // When the user clicks on <span> (x), close the modal


    //     // When the user clicks anywhere outside of the modal, close it
    //     window.onclick = function (event) {
    //         if (event.target == modal) {
    //             modal.style.display = "none";
    //         }
    //     }

    //     const trustedWrapper = document.querySelector('.trusted-slider__wrapper');

    //     const swiperElements = []
    //     for (let index = 0; index < 10; index++) {
    //         let counterItem = 0;
    //         if (counterItem < 10) {
    //             swiperElements.push(data[index])
    //             counterItem++
    //         }
    //     }
        
    //     swiperElements.forEach((char, index) => {
    //         const div = document.createElement("div");
    //         div.className = "trusted-slider__slide swiper-slide";
    //         div.innerHTML = `
    //             <a href="/project.html#${char.id}" class="trusted-slider__item">
    //                 <div class="trusted-slider__image-ibg"><img src="${char.photo}" alt=""></div>
    //                 <div class="trusted-slider__content">
    //                     <div class="trusted-slider__text-content">
    //                         <h3 class="trusted-slider__title">
    //                             ${char.title}
    //                         </h3>
    //                     </div>
    //                     <div class="trusted-slider__icon">
    //                         <img src="img/icons/right-arrow.svg" alt="">
    //                     </div>
    //                 </div>
    //             </a>`;

    //         trustedWrapper.appendChild(div);
    //     })

    // }
}