import gsap, { Back, Power0, Power1 } from "gsap";


export default class TopBanner {
    constructor() {
        this.init();
    }
    init() {
        gsap
            .to(".js-headline-1", {
                duration: 0.25,
                y: "0",
                alpha: 1,
                rotate: 0,
                ease: Power1.easeOut,
                delay: 0.25,
            });
        gsap
            .to(".js-headline-2", {
                duration: 0.25,
                y: "0",
                alpha: 1,
                rotate: 0,
                ease: Power1.easeOut,
                delay: 0.45
            });
        gsap
            .to(".js-headline-3", {
                duration: 0.25,
                y: "0",
                alpha: 1,
                rotate: 0,
                ease: Power1.easeOut,
                delay: 0.65
            });
        gsap
            .to(".js-headline-4", {
                duration: 0.25,
                y: "0",
                alpha: 1,
                rotate: 0,
                ease: Power1.easeOut,
                delay: 0.85
            });
    }
}