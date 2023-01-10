import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";
// import { ScrollSmoother } from "gsap/ScrollSmoother.js";
// import ScrollSmoother from "gsap/ScrollSmoother";
// import ScrollTrigger from "gsap/ScrollTrigger";


window.addEventListener("load", function () {
  gsap.registerPlugin(ScrollTrigger);


  if (document.querySelectorAll(".questions__images img").length) {
    gsap.to(".questions__images img", {
      scrollTrigger: {
        trigger: ".questions__images img",
        start: "top center",
        scrub: 1.5,
      },
      y: "50",
    });
  }

  if (document.querySelectorAll(".index-partners__parnters_top .index-partners__item").length) {
    gsap.to(".index-partners__parnters_top .index-partners__item", {
      scrollTrigger: {
        trigger: ".index-partners__item",
        scrub: 1.5,
        start: "top bottom",
      },
      x: "200%"
    })
  }

  if (document.querySelectorAll(".index-partners__parnters_bottom .index-partners__item").length) {
    gsap.to(".index-partners__parnters_bottom .index-partners__item", {
      scrollTrigger: {
        trigger: ".index-partners__item",
        scrub: 1.5,
        start: "top bottom",
      },
      x: "+=-150"
    })
  }
})