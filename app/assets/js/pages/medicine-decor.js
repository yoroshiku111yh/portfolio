import { gsap } from "gsap";
import InitScrollTriggerBody from './smoothScrollTrigger';

const initScrollTrigger = new InitScrollTriggerBody();

export default class MedicineDecor {
    constructor() {
        this.init();
    }
    init() {

        this.tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".js-medicine-trigger",
                start: "center bottom",
                end: ".js-medicine-trigger-end",
                scrub: true,
                markers : false
            }
        });
        this.tl
            .from("#blob-3", {
                scale: 0.25,
                filter: 'blur(4px)'
            }, "stage-1")
            .to("#blob-1",{
                y : "175vh"
            }, "stage-1")
            .to("#blob-1",{
                x : "0vw",
                delay : 0.15
            }, "stage-1");
    }
}