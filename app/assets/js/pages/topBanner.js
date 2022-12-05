import gsap, { Back, Power0 } from "gsap";


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
                ease: Back.easeOut.config(1),
                delay: 0.25,
            });
        gsap
            .to(".js-headline-2", {
                duration: 0.25,
                y: "0",
                alpha: 1,
                rotate: 0,
                ease: Back.easeOut.config(1),
                delay : 0.35
            })
    }
}