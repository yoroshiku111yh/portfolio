import gsap from "gsap";
import InitScrollTriggerBody from "./smoothScrollTrigger";


const initScrollTrigger = new InitScrollTriggerBody();

export default class About{
    constructor(){
        this.init();
    }
    init(){
        this.tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".js-about-start-trigger",
                start: "top bottom",
                end: "0px 0px",
                scrub: 1,
                pin: false,
                markers: false,
            }
        });
        this.tl.from(".s-about__text", {
            opacity : 0,
            filter : "blur(4px)",
            y : "75px"
        })
    }
}