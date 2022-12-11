import gsap from "gsap";

import InitScrollTriggerBody from './smoothScrollTrigger';

const initScrollTrigger = new InitScrollTriggerBody();


export default class ProjectsBackground {
    constructor() {
        this.init();
    }
    init() {
        this.createTimeLineScroll({
            startTrigger : ".js-start-trigger-project-1",
            endTrigger : "0px 200px"
        })
    }
    createTimeLineScroll({ startTrigger, endTrigger }) {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: startTrigger,
                start: "top bottom",
                end: endTrigger,
                scrub: 1,
                pin: false,
                markers: false,
            }
        });
        tl.from(".js-project-1",{
            "background-image": "linear-gradient(to bottom, #000000, #000000, #000000, #000000, #000000)"
        }).to(".js-project-1",{
            "background-image": "linear-gradient(to bottom, #0f3ee9, #0f3ee9, #0f3ee9, #0f3ee9, #0f3ee9)"
        })
        
    }
}