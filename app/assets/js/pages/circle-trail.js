
import { gsap, Power4 } from 'gsap';
export default class CircleTrail {
    constructor() {
        this.init();
    }
    init() {
        $(".body-smooth-scroll").mousemove(function (e) {
            //$(".circle-trail").css({ left: e.pageX, top: e.pageY });
            window.trailY = e.pageY - 15;
            gsap.to(".circle-trail", { duration: 0.45, "left": e.pageX - 15, "top": e.pageY - 15 + window.bodyScrollBar.offset.y, ease: Power4.out });
        });
        $(".btn-common").hover(() => {
            $(".circle-trail").css({ "opacity": 0 });
        }, () => {
            $(".circle-trail").css({ "opacity": "" });
        });
        window.bodyScrollBar.addListener(() => {
            this.setTopWhenScroll();
        });
    }
    setTopWhenScroll(){
        gsap.to(".circle-trail", { duration: 0, "top": window.trailY + window.bodyScrollBar.offset.y });
    }
}