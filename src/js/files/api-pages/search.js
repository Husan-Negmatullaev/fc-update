import { isMobile, getResource2, getResource, extractVideoID } from "../functions.js";




export async function pageSearch() {

    // Fakes the loading setting a timeout




    // if (location.pathname === "/search.html") {
    //     const params = new URLSearchParams(window.location.search)

    //     setTimeout(function () {
    //         $('body').addClass('loaded');
    //         console.log('search.html');
    //     }, 5000);
    //     const dataText = await getResource("/text/");
    //     document.querySelector("meta[name='keywords']").setAttribute("content", dataText[0].key_text)

    //     const developers = await getResource("/an_object/");
    //     const area = await getResource("/an_object/");
    //     const data = await getResource2("https://kvartirivdubai.ru/api/an_object/?developer=" + params.get('developer') + "&area=" + params.get('area') + "&properties=" + params.get('type') + "&type=" + params.get('lifestyle') + "&search=" + params.get('search'));
    //     const type = await getResource("/an_object/");
    //     console.log(params);

    //     // const data_developer = await getResource("/developer/");
    //     // const dataArea = await getResource("/area/");
    //     // const dataType = await getResource("/type/");
    //     // const dataBlog = await getResource("/blog/");

    //     const formInput = document.querySelector(".form-find__input")
    //     formInput.value = params.get("search")

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

    //     console.log(developerArray);
    //     developerArray.forEach((char2, index) => {
    //         const selectContent = document.querySelector(".form-find__select-developer");
    //         const selectItem = document.createElement("option");
    //         selectItem.className = "";
    //         console.log(developerArray[index], "developerArray");
    //         if (params.get("developer") === developerArray[index].developer) {
    //             selectItem.setAttribute("selected", "")
    //         }
    //         selectItem.setAttribute("value", char2.developer)
    //         selectItem.textContent = `${char2.developer}`;
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
    //         if (params.get('area') === areaArray[index].area) {
    //             selectItem.setAttribute("selected", "")
    //         }
    //         selectItem.textContent = `${char2.area}`;
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
    //         console.log(typeArray[index], "typeArray");
    //         if (params.get('lifestyle') === typeArray[index].area) {
    //             console.log(params.get('lifestyle') === typeArray[index].area, 'select-type');
    //             selectItem.setAttribute("selected", "")
    //         }
    //         selectItem.setAttribute("value", char2.area)
    //         selectItem.textContent = `${char2.type}`;
    //         selectContent.appendChild(selectItem);
    //     });

    //     // Select-name-types
    //     const selectTypes = document.querySelectorAll('.form-find__select[name="types"] .select__option')
    //     selectTypes.forEach((char, index) => {
    //         console.log(char.getAttribute("value"), params.get("types"), char.getAttribute("value") === params.get("types") , "types");
    //         if (char.getAttribute("value") === params.get("types")) {
    //             char.setAttribute("selected", "")
    //         }
    //         // if (params.get("types") === char)
    //     })

    //     // Select-min-price
    //     const selectMinPrice = document.querySelectorAll('.form-find__select[name="min"] .select__option')
    //     selectMinPrice.forEach((char, index) => {
    //         if (char.getAttribute("value") === params.get("min")) {
    //             char.setAttribute("selected", "")
    //         }
    //     })

    //     // Select-max-price
    //     const selectMaxPrice = document.querySelectorAll(".form-find__select[name='max'] .select__option");
    //     selectMaxPrice.forEach((char, index) => {
    //         if (char.getAttribute("value") === params.get("max")) {
    //             char.setAttribute("selected", "")
    //         }
    //     }) 

    //     data.forEach((char, index) => {
    //         const propertyContent = document.querySelector(".best-properties__content");
    //         const propertyItem = document.createElement("div");
    //         propertyItem.className = "best-properties__item-propertie item-propertie";
    //         propertyItem.setAttribute("data-index", char.id);
    //         propertyItem.setAttribute("data-tabs-title", "");
    //         const videoLink = extractVideoID(char.video_link);

    //         propertyItem.innerHTML = `
    //                                        <div class="best-properties__item-propertie item-propertie">
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
    //                                        <a href = "search.html?types=Type&developer=&area=${char.area}&lifestyle=&min=&max=&search=">${char.area}</a>
    //                                     </div>
    //                                     <div class="item-propertie__developer">
    //                                         <img src="img/icons/building.svg" alt="Building icon">
    //                                         <a href = "search.html?types=Type&developer=${char.developer}&area=&lifestyle=&min=&max=&search=">${char.developer}</a>
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

    //         propertyContent.appendChild(propertyItem);


    //     });




    // };
}