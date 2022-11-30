import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default class NewsDecor{
    constructor(){
        return;
        this.init();
    }
    init(){
        this.tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".js-news-trigger",
                start: "center bottom",
                end: "0% 50%",
                scrub: true,
            }
        });
        this.tl.from(".js-news-decor",{
            filter : "blur(6px)",
            scale : 0.35
        })
    }
}