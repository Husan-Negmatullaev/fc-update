import {isMobile, getResource, getHash, getDigFormat, getDigFromString, extractVideoID} from "../functions.js";
import { flsModules } from "../modules.js";


// https://kvartirivdubai.ru/api/an_object/
export async function pageSubBlog() {
    const body = document.body;
    if (location.pathname === "/sub-blog.html") {
        
        setTimeout(function() {
            $('body').addClass('loaded');
            console.log('sub-blog.html')
        }, 5000);
        const dataText = await getResource("/text/");
        document.querySelector("meta[name='keywords']").setAttribute("content", dataText[0].key_text)

        const dataCurrentObject = await getResource(`/blog/${getHash()}`);
        const dataDeveloper = await getResource("/developer/")
        const dataAllObject = await getResource("/an_object/")
        const developers = await getResource("/an_object/");
        const area = await getResource("/an_object/");
        const type = await getResource("/an_object/");

        document.querySelector('title').textContent = dataCurrentObject.title;
        document.querySelector("meta[name='description']").setAttribute("content", dataCurrentObject.description)


        /* ================================== */
        // Form and Search

         var projectData =[];
        var projectData2 =[];
        var projectIndex =[];
        var start =0
        var start2 =0
        var end =9
        var end2 =9

        let pageSize = 10;
        let pageSize2 = 9;
        let currentPage = 1;
        let currentPage2 = 1;
        const overviewsWrapper = document.querySelector(".areas-city__content");

        /* End Of Area Div */


        /* Properties Fields */
        async function getResourceHere2() {
            const _apiBase2 = "https://kvartirivdubai.ru/api/an_object/"
            const res2 = await fetch(`${_apiBase2}`)

            const body2 = await res2.json()
            projectData2 = body2;
            start2 = (currentPage2 - 1) * pageSize2
            end2 = currentPage2 * pageSize2

        }
        async function renderProjects2(page =1,first,last){

            await getResourceHere2()
            if (page == numPages2()) {
                nextButton2.style.visibility = "hidden";
            } else {
                nextButton2.style.visibility = "visible";
            }
            projectData2.filter((row,index) =>{
                start2 = first
                end2 = last

                if (index >= start2 && index < end2) return true ;

            }).forEach(char => {

                // console.log(projectData2)

                const propertyContent2 = document.querySelector(".best-properties__content");
                const propertyItem2 = document.createElement("div");
                propertyItem2.className = "best-properties__item-propertie item-propertie";
                propertyItem2.setAttribute("data-index", char.id);
                propertyItem2.setAttribute("data-tabs-title", "");
                const videoLink = extractVideoID(char.video_link);

                propertyItem2.innerHTML = `
                                           <div class="best-properties__item-propertie item-propertie">
                                <div class="item-propertie__body">
                                    <a href="project.html#${char.id}" class="item-propertie__image-ibg">
                                        <img src="${char.mainphoto}" alt="">
                                        <div class="item-propertie__types">
                                            <span>${char.properties}</span>
                                        </div>
                                        <div class="item-propertie__stickers">
                                            
                                        </div>
                                    </a>
                                    <div class="item-propertie__content">
                                        <a href="project.html#${char.id}" class="item-propertie__title">${char.title}</a>
                                        <div class="item-propertie__location">
                                           <a href = "search.html?types=Type&developer=&area=${char.area}&lifestyle=&min=&max=&search=">${char.area}</a>
                                        </div>
                                        <div class="item-propertie__developer">
                                            <img src="img/icons/building.svg" alt="Building icon">
                                            <a href = "search.html?types=Type&developer=${char.developer}&area=&lifestyle=&min=&max=&search=">${char.developer}</a>
                                        </div>
								        <button type="button" data-popup="#video" data-popup-youtube="${videoLink}" class="item-propertie__video-play _icon-play">
                                            Посмотреть видео
                                        </button>
                                        <div class="item-propertie__price">
                                            
                                            <span class="item-propertie__value">${char.starting_price}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>`;

                propertyContent2.appendChild(propertyItem2);


            });
        }
        renderProjects2(1,start,end)

        function numPages2() {
            return Math.ceil(projectData2.length / pageSize2);
        }

        function previousPage2(){
            if(currentPage2 > 1)
                currentPage2--;
            renderProjects2(currentPage2)
        }

        function nextPage2(){
            start2+=10
            end2+=10
            renderProjects2(currentPage2,start2,end2)
        }

        document.querySelector('#nextButton2').addEventListener('click', nextPage2, false);


        /* End Of Properties Field */











        let developerArray = [];
        var developerTitle
        let developerObject = {};

        for (let i in developers) {

            // Extract the title
            developerTitle = developers[i]['developer'];

            // Use the title as the index
            developerObject[developerTitle] = developers[i];
        }
        for (let x in developerObject) {
            developerArray.push(developerObject[x]);
        }

        developerArray.forEach((char2, index) => {
            const selectContent = document.querySelector(".form-find__select-developer");
            const selectItem = document.createElement("option");
            selectItem.className = "";
            selectItem.innerHTML = `<option selected="">${char2.developer}</option>`;
            selectContent.appendChild(selectItem);

        });


        let areaArray = [];
        var areaTitle
        let areaObject = {};

        for (let i in area) {

            // Extract the title
            areaTitle = area[i]['area'];
            // Use the title as the index
                areaObject[areaTitle] = area[i];
            }
             for (let x in areaObject) {
                areaArray.push(areaObject[x]);
            }

         areaArray.forEach((char2, index) => {
            const selectContent = document.querySelector(".form-find__select-area");
            const selectItem = document.createElement("option");
            selectItem.className = "";
            selectItem.innerHTML = `<option selected="">${char2.area}</option>`;
            selectContent.appendChild(selectItem);

         });


             let typeArray = [];
            var typeTitle
            let typeObject = {};

            for (let i in type) {

                // Extract the title
                typeTitle = type[i]['type'];

                // Use the title as the index
                typeObject[typeTitle] = type[i];
            }
             for (let x in typeObject) {
                typeArray.push(typeObject[x]);
            }

         typeArray.forEach((char2, index) => {
            const selectContent = document.querySelector(".form-find__select-type");
            const selectItem = document.createElement("option");
            selectItem.className = "";
            selectItem.innerHTML = `<option selected="">${char2.type}</option>`;
            selectContent.appendChild(selectItem);

         });

        /* ======================== */
        // Main Blog Sub
        const mainTitle = document.querySelector('.main-blog-sub__title');
        mainTitle.textContent = dataCurrentObject.title;

        const mainImage = document.querySelector(".main-blog-sub__image");
        mainImage.src = dataCurrentObject.mainphoto;

        const mainDate = document.querySelector(".main-blog-sub__date-text");
        const mainDateMonth = document.querySelector(".main-blog-sub__date-month");
        const mainDateWeek = document.querySelector(".main-blog-sub__date sup")
        const splitDate = dataCurrentObject.created.split("-");
        const getWeek = new Date(splitDate).toLocaleDateString("ru", {
            weekday: "short"
        })
        mainDateWeek.textContent = getWeek;
        mainDateMonth.textContent = splitDate[0];
        mainDate.textContent = splitDate[2];

        const buttonVideo = document.querySelector(".main-blog-sub__button-quiz");
        const videoId = extractVideoID(dataCurrentObject.link);
        buttonVideo.dataset.popupYoutube = videoId;

        // Gallery
        // inline-gallery__wrapper
        const galleryInterier = document.querySelector(".gallery-interier__wrapper");
        const galleryInterierThumbs = document.querySelector(".thumbs-interier__wrapper");
        dataCurrentObject.blog_gallery.forEach((item) => {
             const div = document.createElement("div");
             const divThumb = document.createElement("div");
             div.className = "gallery-interier__slide swiper-slide";
             divThumb.className = "thumbs-interier__slide swiper-slide";
             divThumb.innerHTML = `
                <div data-exterior="${item.blog_gallery}" class="thumbs-interier__image-ibg"><img src="${item.image}" alt=""></div>
             `
             div.innerHTML = `
                <div data-exterior="${item.blog_gallery}" class="gallery-interier__image-ibg"><img src="${item.image}" alt=""></div>
            `;
             galleryInterier.appendChild(div);
             galleryInterierThumbs.appendChild(divThumb)
        })

        // Text Content
        const contentText = document.querySelector(".content-text__text");
        contentText.innerHTML = dataCurrentObject.description;

        /* ======================== */
    }
}
