
import gsap from 'gsap';
import SwipeToSection from '../components/swipe/swipeToSection';
import SceneRaymarchingBasic from './../components/rayMarchingBasic/scene';
import InitScrollTriggerBody from './smoothScrollTrigger';

const initScrollTrigger = new InitScrollTriggerBody();
export default class BackgroundMain {
    constructor() {
        this.canvasElm = document.querySelector("#bg-cv");
        this.size = {
            width: window.innerWidth,
            height: window.innerHeight,
        };
        this.init();
    }
    init() {
        this.canvasInit();
        this.scrollEvent();
    }
    canvasInit() {
        if (!this.canvasElm || !window.supportgl2) return;
        this.scene = new SceneRaymarchingBasic({
            $container: this.canvasElm,
            size: this.size,
            speed: 0.02
        });
        setTimeout(() => {
            this.scene.startPointsGo();
        }, 1000);
    }
    scrollEvent(){
        this.tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".js-swipe-start-trigger",
                start: "top bottom",
                end: "0px 0px",
                scrub: 1,
                pin: false,
                markers: false,
            }
        });
        this.tl.to(".circle-black", {
            transform : "scale(3000%)"
        });
    }
}