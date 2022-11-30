
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default class InitScrollTriggerBody{
    constructor(){
        if(!window.bodyScrollBar) return;
        this.init();
    }
    init(){
        const bodyScrollBar = window.bodyScrollBar;
        const scroller = document.querySelector('.body-smooth-scroll');
        ScrollTrigger.scrollerProxy(scroller, {
            scrollTop(value) {
                if (arguments.length) {
                    bodyScrollBar.scrollTop = value;
                }
                return bodyScrollBar.scrollTop;
            }
        });
        bodyScrollBar.addListener(ScrollTrigger.update);
        ScrollTrigger.defaults({ scroller: scroller });
    }
}
