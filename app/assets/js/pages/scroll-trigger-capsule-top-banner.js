import { gsap, Linear } from "gsap";
import { TweenMax } from "gsap/gsap-core";
import InitScrollTriggerBody from "./smoothScrollTrigger";
const initScrollTrigger = new InitScrollTriggerBody();


export default class ScrollTriggerCapsuleTopBanner {
    constructor() {
        this.tl;
        this.init();
    }
    init() {
        this.tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".js-top-banner-start-trigger",
                start: "center bottom",
                end: "top top",
                scrub: true,
            }
        });
        this.tl
            .to("#blob-1", {
                y : "90vh",
            }, "stage-1")
            .to("#blob-1", {
                x : "-70vw",
                scale : "0.5",
                delay : 0.05
            }, "stage-1")

    }
}