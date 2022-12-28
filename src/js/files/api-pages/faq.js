import { isMobile, getResource, extractVideoID } from "../functions.js";




export async function pageFaq() {

    // Get the modal

    // Fakes the loading setting a timeout
    



    // const body = document.body;
    // if (location.pathname === "/faq.html") {
        
    //     setTimeout(function () {
    //         $('body').addClass('loaded');
    //         console.log('faq.html')
    //     }, 5000);

    //     const data = await getResource("/an_object/")
    //     const dataText = await getResource("/text/");
    //     document.querySelector("meta[name='keywords']").setAttribute("content", dataText[0].key_text)
    //     const developers = await getResource("/an_object/");
    //     const area = await getResource("/an_object/");
    //     const type = await getResource("/an_object/");

    //     var projectData = [];
    //     var projectData2 = [];

    //     var start = 0
    //     var start2 = 0
    //     var end = 10
    //     var end2 = 10

    //     let pageSize = 10;
    //     let pageSize2 = 10;
    //     let currentPage = 1;
    //     let currentPage2 = 1;

    //     /* Properties Fields */
    //     async function getResourceHere2() {
    //         const _apiBase2 = "https://kvartirivdubai.ru/api/an_object/"
    //         const res2 = await fetch(`${_apiBase2}`)

    //         const body2 = await res2.json()
    //         projectData2 = body2;
    //         start2 = (currentPage2 - 1) * pageSize2
    //         end2 = currentPage2 * pageSize2

    //     }
    //     async function renderProjects2(page = 1, first, last) {

    //         await getResourceHere2()
    //         if (page == numPages2()) {
    //             nextButton2.style.visibility = "hidden";
    //         } else {
    //             nextButton2.style.visibility = "visible";
    //         }
    //         projectData2.filter((row, index) => {
    //             start2 = first
    //             end2 = last

    //             if (index >= start2 && index < end2) return true;

    //         }).forEach(char => {

    //             // console.log(projectData2)

    //             const propertyContent2 = document.querySelector(".best-properties__content");
    //             const propertyItem2 = document.createElement("div");
    //             propertyItem2.className = "best-properties__item-propertie item-propertie";
    //             propertyItem2.setAttribute("data-index", char.id);
    //             propertyItem2.setAttribute("data-tabs-title", "");
    //             const videoLink = extractVideoID(char.video_link);
                
    //             propertyItem2.innerHTML = `
    //                         <div class="best-properties__item-propertie item-propertie">
    //                             <div class="item-propertie__body">
    //                                 <a href="project.html#${char.id}" class="item-propertie__image-ibg">
    //                                     <img src="${char.mainphoto}" alt="">
    //                                     <div class="item-propertie__types">
    //                                         <span>${char.properties}</span>
    //                                     </div>
    //                                     <div class="item-propertie__stickers">
                                            
    //                                     </div>
    //                                 </a>
    //                                 <div class="item-propertie__content">
    //                                     <a href="project.html#${char.id}" class="item-propertie__title">${char.title}</a>
    //                                     <div class="item-propertie__location">
    //                                        <a href = "search.html?types=Type&developer=&area=${char.area}&lifestyle=&min=&max=">${char.area}</a>
    //                                     </div>
    //                                     <div class="item-propertie__developer">
    //                                         <img src="img/icons/building.svg" alt="Building icon">
    //                                         <a href = "search.html?types=Type&developer=${char.developer}&area=&lifestyle=&min=&max=">${char.developer}</a>
    //                                     </div>
	// 							        <button type="button" data-popup="#video" data-popup-youtube="${videoLink}" class="item-propertie__video-play _icon-play">
    //                                         Посмотреть видео
    //                                     </button>
    //                                     <div class="item-propertie__price">
                                            
    //                                         <span class="item-propertie__value">${char.starting_price}</span>
    //                                     </div>
    //                                 </div>
    //                             </div>
    //                         </div>`;

    //             propertyContent2.appendChild(propertyItem2);


    //         });
    //     }
    //     renderProjects2(1, start, end)

    //     function numPages2() {
    //         return Math.ceil(projectData2.length / pageSize2);
    //     }

    //     function previousPage2() {
    //         if (currentPage2 > 1)
    //             currentPage2--;
    //         renderProjects2(currentPage2)
    //     }

    //     function nextPage2() {
    //         start2 += 10
    //         end2 += 10
    //         renderProjects2(currentPage2, start2, end2)
    //     }

    //     document.querySelector('#nextButton2').addEventListener('click', nextPage2, false);


    //     /* End Of Properties Field */







    //     let developerArray = [];
    //     var developerTitle
    //     let developerObject = {};

    //     for (let i in developers) {

    //         // Extract the title
    //         developerTitle = developers[i]['developer'];

    //         // Use the title as the index
    //         developerObject[developerTitle] = developers[i];
    //     }
    //     for (let x in developerObject) {
    //         developerArray.push(developerObject[x]);
    //     }

    //     developerArray.forEach((char2, index) => {
    //         const selectContent = document.querySelector(".form-find__select-developer");
    //         const selectItem = document.createElement("option");
    //         selectItem.className = "";
    //         selectItem.innerHTML = `<option selected="">${char2.developer}</option>`;
    //         selectContent.appendChild(selectItem);

    //     });


    //     let areaArray = [];
    //     var areaTitle
    //     let areaObject = {};

    //     for (let i in area) {

    //         // Extract the title
    //         areaTitle = area[i]['area'];

    //         // Use the title as the index
    //         areaObject[areaTitle] = area[i];
    //     }
    //     for (let x in areaObject) {
    //         areaArray.push(areaObject[x]);
    //     }

    //     areaArray.forEach((char2, index) => {
    //         const selectContent = document.querySelector(".form-find__select-area");
    //         const selectItem = document.createElement("option");
    //         selectItem.className = "";
    //         selectItem.innerHTML = `<option selected="">${char2.area}</option>`;
    //         selectContent.appendChild(selectItem);

    //     });


    //     let typeArray = [];
    //     var typeTitle
    //     let typeObject = {};

    //     for (let i in type) {

    //         // Extract the title
    //         typeTitle = type[i]['type'];

    //         // Use the title as the index
    //         typeObject[typeTitle] = type[i];
    //     }
    //     for (let x in typeObject) {
    //         typeArray.push(typeObject[x]);
    //     }

    //     typeArray.forEach((char2, index) => {
    //         const selectContent = document.querySelector(".form-find__select-type");
    //         const selectItem = document.createElement("option");
    //         selectItem.className = "";
    //         selectItem.innerHTML = `<option selected="">${char2.type}</option>`;
    //         selectContent.appendChild(selectItem);

    //     });



    //     /* ===================== */

    //     /* ===================== */
    //     // Developers
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
