

import { gsap } from 'gsap';
import InitScrollTriggerBody from '../../pages/smoothScrollTrigger';

const initScrollTrigger = new InitScrollTriggerBody();

export default class SwipeToSection{
    constructor({trigger, end, processEnd, callbackRollForward, callbacRollBackward}){
        this.trigger = trigger;
        this.end = end;
        this.processEnd = processEnd;
        this.processScroll = {
            value : 0
        };
        this.init();
    }
    init(){
        this.eventSwipe();
    }
    eventSwipe() {
        this.tl = gsap.timeline({
            scrollTrigger: {
                trigger: this.trigger,
                start: "top bottom",
                end: this.end,
                scrub: 1,
                pin: false,
                markers: true,
            }
        });
        this.tl.to(this.processScroll, {
            value : 1,
            onUpdate : () => {
                if(this.processScroll.value > 0.1){
                    console.log("helu");
                }
            }
        })
    }
}