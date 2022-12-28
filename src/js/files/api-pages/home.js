import { isMobile, getResource } from "../functions.js";
import { flsModules } from "../modules.js";



export async function pageHome() {

    // Get the modal

    const body = document.body;
    if (location.pathname === "/") {
        // const dataText = await getResource("/text/");
        // document.querySelector("meta[name='keywords']").setAttribute("content", dataText[0].key_text)

        // const data = await getResource("/an_object/");
        // const developers = await getResource("/an_object/");
        // const area = await getResource("/an_object/");
        // const type = await getResource("/an_object/");

        // const data_developer = await getResource("/developer/");
        // const dataArea = await getResource("/area/");
        // // const dataType = await getResource("/type/");
        // const dataBlog = await getResource("/blog/");

        // var projectData = [];
        // var projectIndex = [];
        // var start = 0
        // var end = 10

        // let pageSize = 10;
        // let currentPage = 1;


        // async function getResourceHere() {
        //     const _apiBase = "https://kvartirivdubai.ru/api/an_object/"
        //     const res = await fetch(`${_apiBase}`)

        //     const body = await res.json()
        //     projectData = body;
        //     start = (currentPage - 1) * pageSize
        //     end = currentPage * pageSize
        // }

        // async function renderProjects(page = 1, first, last) {

        //     setTimeout(function () {
        //         $("body").addClass("loaded")
        //     }, 0)

        //     await getResourceHere()
        //     if (page == numPages()) {
        //         nextButton.style.visibility = "hidden";
        //     } else {
        //         nextButton.style.visibility = "visible";
        //     }
        //     projectData.filter((row, index) => {
        //         start = first
        //         end = last

        //         if (index >= start && index < end) return true;

        //     }).forEach(char => {
        //         const afterFiveDays = new Date(char.created).addDays(5);
        //         const afterThirtyDays = new Date(char.created).addDays(30);
        //         const timeProject = new Date().getTime() <= afterFiveDays.getTime();
        //         // <div class="card-news__type-projects">
        //         //     ${timeProject ? "Новый проект" : ""}
        //         // </div>
    
        //         // if (new Date().getTime() >= afterThirtyDays.getTime()) return;

        //         // console.log(projectData)
        //         const propertyContent = document.querySelector(".properties__content");
        //         const propertyItem = document.createElement("div");
        //         propertyItem.className = "properties__item item-properties ";
        //         propertyItem.setAttribute("data-index", char.id);
        //         propertyItem.setAttribute("data-tabs-title", "");
        //         propertyItem.innerHTML = `
        //         <a href="/project.html#${char.id}" class="item-properties__image-ibg">
        //             <img src="${char.mainphoto}" alt="">
        //         </a>
        //         ${timeProject ? `
        //             <div class="item-properties__type">
        //                 "Новый проект"
        //             </div>
        //         ` : ""}
        //         <div class="item-properties__content">
        //             <div class="item-properties__body">
        //                 <div class="item-properties__title">${char.title}</div>
        //                 <div class="item-properties__subtitle">
        //                     Area: <span class="item-properties__value">
        //                         ${char.area}
        //                     </span>
        //                 </div>
        //                 <div class="item-properties__position">
        //                     <img src="./img/icons/building.svg" class="item-properties__icon" alt="Building icon">
        //                     <span class="item-properties__value"> ${char.developer}</span>
        //                 </div>
        //                 <div class="item-properties__info">
        //                     <a href="${char.video_link
        //             }" class="item-properties__col">
        //                         <img src="./img/icons/youtube.svg" class="item-properties__icon" alt="Youtube icon">
        //                         <span class="item-properties__subtitle">
        //                             Обзор видео
        //                         </span>
        //                     </a>
        //                 </div>
        //                 <div class="item-properties__subtitle">
        //                     <span class="item-properties__price">
        //                         ${char.starting_price.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, ",")}
        //                     </span>
        //                 </div>
        //             </div>
        //             <a href="/project.html#${char.id}" class="item-properties__next">
        //                 <span class="_icon-arrow-right"></span>
        //             </a>
        //         </div>`;

        //         propertyContent.appendChild(propertyItem);
        //     })
        // }
        // renderProjects(1, start, end)

        // function numPages() {
        //     return Math.ceil(projectData.length / pageSize);
        // }

        // function previousPage() {
        //     if (currentPage > 1)
        //         currentPage--;
        //     renderProjects(currentPage)
        // }

        // function nextPage() {
        //     start += 10
        //     end += 10
        //     renderProjects(currentPage, start, end)
        // }

        // document.querySelector('#nextButton').addEventListener('click', nextPage, false);

        // // console.log(dataText);


        // /* ===================== */
        // // Main Block

        // let developerArray = [];
        // var developerTitle
        // let developerObject = {};

        // for (let i in developers) {

        //     // Extract the title
        //     developerTitle = developers[i]['developer'];

        //     // Use the title as the index
        //     developerObject[developerTitle] = developers[i];
        // }
        // for (let x in developerObject) {
        //     developerArray.push(developerObject[x]);
        // }

        // developerArray.forEach((char2, index) => {
        //     const selectContent = document.querySelector(".form-find__select-developer");
        //     const selectItem = document.createElement("option");
        //     selectItem.className = "";
        //     selectItem.innerHTML = `<option selected="">${char2.developer}</option>`;
        //     selectContent.appendChild(selectItem);

        // });


        // let areaArray = [];
        // var areaTitle
        // let areaObject = {};

        // for (let i in area) {

        //     // Extract the title
        //     areaTitle = area[i]['area'];

        //     // Use the title as the index
        //     areaObject[areaTitle] = area[i];
        // }
        // for (let x in areaObject) {
        //     areaArray.push(areaObject[x]);
        // }

        // areaArray.forEach((char2, index) => {
        //     const selectContent = document.querySelector(".form-find__select-area");
        //     const selectItem = document.createElement("option");
        //     selectItem.className = "";
        //     selectItem.innerHTML = `<option selected="">${char2.area}</option>`;
        //     selectContent.appendChild(selectItem);

        // });


        // let typeArray = [];
        // var typeTitle
        // let typeObject = {};

        // for (let i in type) {

        //     // Extract the title
        //     typeTitle = type[i]['type'];

        //     // Use the title as the index
        //     typeObject[typeTitle] = type[i];
        // }
        // for (let x in typeObject) {
        //     typeArray.push(typeObject[x]);
        // }

        // typeArray.forEach((char2, index) => {
        //     const selectContent = document.querySelector(".form-find__select-type");
        //     const selectItem = document.createElement("option");
        //     selectItem.className = "";
        //     selectItem.innerHTML = `<option selected="">${char2.type}</option>`;
        //     selectContent.appendChild(selectItem);

        // });


        // data.forEach((char, index) => {
        //     const propertyContent = document.querySelector(".properties__content");
        //     const propertyItem = document.createElement("div");
        //     propertyItem.className = "properties__item item-properties ";
        //     propertyItem.setAttribute("data-index", char.id);
        //     propertyItem.setAttribute("data-tabs-title", "");
        //     propertyItem.innerHTML = `
        //         <a href="/more.html" class="item-properties__image-ibg">
        //             <img src="${char.mainphoto}" alt="">
        //         </a>
        //         <div class="item-properties__content">
        //             <div class="item-properties__body">
        //                 <div class="item-properties__title">${char.title}</div>
        //                 <div class="item-properties__subtitle">
        //                     Area: <span class="item-properties__value">
        //                         ${char.area}
        //                     </span>
        //                 </div>
        //                 <div class="item-properties__position">
        //                     <img src="./img/icons/building.svg" class="item-properties__icon" alt="Building icon">
        //                     <span class="item-properties__value"> ${char.developer}</span>
        //                 </div>
        //                 <div class="item-properties__info">
        //                     <a href="${char.video_link
        //                 }" class="item-properties__col">
        //                         <img src="./img/icons/youtube.svg" class="item-properties__icon" alt="Youtube icon">
        //                         <span class="item-properties__subtitle">
        //                             Play Video Overview
        //                         </span>
        //                     </a>
        //                     <a href="${char.tour_360
        //                 }" class="item-properties__col">
        //                         <img src="./img/icons/360.svg" class="item-properties__icon" alt="360deg icon">
        //                         <span class="item-properties__subtitle">
        //                             Open 3600 Tour
        //                         </span>
        //                     </a>
        //                 </div>
        //                 <div class="item-properties__subtitle">
        //
        //                     <span class="item-properties__price">
        //                          ${char.starting_price.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, ",")}
        //                     </span>
        //                 </div>
        //             </div>
        //             <a href="/more.html#${char.id}" class="item-properties__next">
        //                 <span class="_icon-arrow-right"></span>
        //             </a>
        //         </div>`;
        //
        //     propertyContent.appendChild(propertyItem);
        //
        //
        // });
        /* ===================== */

        /* ===================== */
        // Area Properties
        // const bestAreaBody = document.querySelector(".best-area__body");
        // function numberWithCommas(x) {
        //     return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        // }
        // var BreakException2 = {};
        // var aar2 = 0;
        // try {
        //     dataArea.forEach((char, index) => {

        //         // console.log(aar2);
        //         if (aar2 === 4) throw BreakException2;
        //         aar2 += 1

        //         const a = document.createElement("a");
                
        //         let hrefLabel = char.name.replace(/\s/g, "+")

        //         a.setAttribute("href", `https://kvartirivdubai.ru/search.html?types=Type&search=&developer=&area=${hrefLabel}&lifestyle=&min=&max=`);
        //         a.className = "best-area__item item-area";
        //         a.innerHTML = `
        //             <div class="item-area__image-ibg"><img src="${char.mainphoto}" alt=""></div>
        //             <div class="item-area__content">
        //                 <div class="item-area__message">От $ ${char.starting_price}</div>
        //                 <div class="item-area__info">
        //                     <div class="item-area__title title title_w">${char.name}</div>
        //                     <div class="item-area__text">${char.description}</div>
        //                 </div>
        //             </div>`;
        //         bestAreaBody.appendChild(a);
        //     });
        // } catch (e) {
        //     if (e !== BreakException2) throw e;
        // }
        /* ===================== */

        /* ===================== */
        // Areas
        // const areaBody = document.querySelector(".area__body");
        // var BreakException = {};
        // var aar = 0;
        // try {
        //     dataArea.forEach((char, index) => {
        //         // console.log(index);
        //         // if (index > 3) {
        //         //     console.log(index, "if 1");
        //         //     return;
        //         // }
        //         if (index >= 4) {
        //             // console.log('if 2');
        //             return;
        //         }
        //         // console.log(aar);
        //         if (aar === 5) throw BreakException;
        //         aar += 1

        //         let hrefLabel = char.name.replace(/\s/g, "+")

        //         const a = document.createElement("a");
        //         a.setAttribute("href", `https://kvartirivdubai.ru/search.html?types=Type&search=&developer=&area=${hrefLabel}&lifestyle=&min=&max=`);
        //         a.className = "area__item";
        //         a.innerHTML = `
        //             <div class="area__image-ibg"><img src="${char.mainphoto}" alt="Dubai island buildings"></div>
        //             <div class="area__title">
        //                 ${char.name}
        //             </div>`;
        //         areaBody.appendChild(a);
        //     });
            
        // } catch (e) {
        //     if (e !== BreakException) throw e;
        // }
        /* ===================== */

        /* ===================== */
        // Overwiews Slider
        // const overviewsWrapper = document.querySelector(".overviews-slider__wrapper");
        // data_developer.forEach((char, index) => {
        //     const div = document.createElement("div");
        //     div.className = "swiper-slide overviews-slider__slide";
        //     div.innerHTML = `
        //     <div class="swiper-slide overviews-slider__slide">
        //         <a href="${char.link}" class="overviews-slider__image-ibg"><img src="${char.mainphoto}" alt=""></a>
        //         <div class="overviews-slider__subtitle">${char.name}</div>
        //         <a href="${char.link}" class="button button_small overviews-slider__button">Обзор видео</a>
        //     </div>`;
        //     overviewsWrapper.appendChild(div)
        // })


        /* ===================== */
        // Lead
        // const leadWrapper = document.querySelector(".lead__wrapper");
        // data_developer.forEach((char, index) => {
        //     const a = document.createElement("a");
        //     a.className = "lead__card lead-card swiper-slide";
        //     a.innerHTML = `
        //         <div class="lead-card__body">
        //             <div class="lead-card__image-ibg"><img src="${char.mainphoto}" alt=""></div>
        //             <div class="lead-card__company-logo">
        //                 <img src="${char.logo}" alt="">
        //             </div>
        //             <div class="lead-card__content">
        //                 <div class="lead-card__title title" style=" display: -webkit-box;max-width: 450px;-webkit-line-clamp: 2;-webkit-box-orient: vertical; overflow: hidden;">${char.title}</div>
        //                 <div class="lead-card__text" style=" display: -webkit-box;max-width: 450px;-webkit-line-clamp: 4;-webkit-box-orient: vertical;overflow: hidden;">${char.text}</div>
        //             </div>
        //         </div>`;
        //     leadWrapper.appendChild(a)
        // })
        /* ===================== */

        /* ===================== */
        // News
        // const newsWrapper = document.querySelector(".news__body");
        // const lastElements = [dataBlog.pop(), dataBlog.pop()]
        // lastElements.forEach((char, index) => {
        //     // const afterFiveDays = new Date(char.created).addDays(5);
        //     // const afterThirtyDays = new Date(char.created).addDays(30);
        //     // const timeProject = new Date().getTime() <= afterFiveDays.getTime();
        //     // // <div class="card-news__type-projects">
        //     // //     ${timeProject ? "Новый проект" : ""}
        //     // // </div>

        //     // if (new Date().getTime() >= afterThirtyDays.getTime()) return;
            
        //     const div = document.createElement("div");
        //     div.className = "news__card card-news";
        //     const dateArr = char.created.split('-');
        //     const getMonth = new Date(dateArr[1]).toLocaleDateString("en", {
        //         month: "long"
        //     });
        //     div.innerHTML = `
        //         <div class="card-news__body">
        //             <a href="/sub-blog.html#${char.id}" class="card-news__image-ibg"><img src="${char.mainphoto}" alt=""></a>
        //             <div class="card-news__date">
        //                 <span class="card-news__icon _icon-calendar"></span>
        //                 <span class="card-news__date-text">
        //                     ${dateArr[2]} <sup>th</sup> ${getMonth} ${dateArr[0]}
        //                 </span>
        //             </div>
        //             <div class="card-news__content">
                        
        //                 <div class="card-news__title">${char.title}</div>
        //                 <div class="card-news__text">${char.description}</div>
        //                 <a href="/sub-blog.html#${char.id}" class="card-news__button button button_small">
        //                     Подробнее
        //                 </a>
        //             </div>
        //         </div>`;
        //     newsWrapper.appendChild(div)
        // })
        /* ===================== */



        // var locations = [];
        // data.forEach((char, index) => {
        //     locations[index] = [char.title, char.latitude, char.longitude, index]
        // });
        //   ['Bondi Beach', -33.890542, 151.274856, 4],
        //   ['Coogee Beach', -33.923036, 151.259052, 5],
        //   ['Cronulla Beach', -34.028249, 151.157507, 3],
        //   ['Manly Beach', -33.80010128657071, 151.28747820854187, 2],
        //   ['Maroubra Beach', -33.950198, 151.259302, 1]
        // ];

        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 12,
            center: new google.maps.LatLng(25.0617177, 55.312431),
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });

        var infowindow = new google.maps.InfoWindow();

        var marker, i;

        for (i = 0; i < locations.length; i++) {
            marker = new google.maps.Marker({
                position: new google.maps.LatLng(locations[i][1], locations[i][2]),
                map: map
            });

            google.maps.event.addListener(marker, 'click', (function (marker, i) {
                return function () {
                    infowindow.setContent(locations[i][0]);
                    infowindow.open(map, marker);
                }
            })(marker, i));
        }
    }
}
