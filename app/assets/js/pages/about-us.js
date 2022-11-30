
import SliderFlickEffect1 from './../components/sliderFlickEffect1';
import { gsap } from "gsap";
import InitScrollTriggerBody from './smoothScrollTrigger';

const initScrollTrigger = new InitScrollTriggerBody();

export default class AboutUs {
    constructor() {
        this.carouselElm = $(".js-slider-about");
        this.carouselElmNav = $(".js-slider-about-nav");
        this.carousel;
        this.navItemNext;
        this.init();
    }
    init() {
        if (this.carouselElm.length !== 0) {

            this.slider = new SliderFlickEffect1({
                carouselElm: this.carouselElm[0],
                carouselElmNav: this.carouselElmNav,
                autoPlay: false
            });
        }

        this.scrollTrigger();
    }
    scrollTrigger() {
        this.tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".js-about-start-trigger",
                start : "top bottom",
                end: ".js-about-end-trigger",
                scrub: 1,
                pin : false,
                markers : false,
            }
        });
        this.tl
            .from(".js-scroll-about-image-1", { y: "20%", alpha: 0, filter: "blur(5px)", delay : 0.15 }, "stage-1")
            .from(".js-scroll-about-image-2", { y: "20%", alpha: 0, filter: "blur(2px)", delay : 0.2 }, "stage-1")
            .from(".js-scroll-about-contain .index-caption__text", { y: "-40px", alpha: 0, delay : 0.25 }, "stage-1")
            .from(".js-scroll-about-contain .headline-common__title", { y: "-20px", x : "10px", alpha: 0, filter: 'blur(2px)', delay : 0.35 }, "stage-1")
            .from(".js-scroll-about-contain .headline-common__desc", { x: "-10px", alpha: 0, filter: 'blur(2px)', delay : 0.35 }, "stage-1")
            .to(".js-scroll-about-image-1 img", { y: "-10%", delay : 0.25 })
    }
}