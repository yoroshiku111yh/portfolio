import Scrollbar from 'smooth-scrollbar';

export default class SmoothScroll {
    constructor() {
        this.initSmoothScroll();
    }
    initSmoothScroll() {
        const scroller = document.querySelector('.body-smooth-scroll');
        if (!scroller) {
            return;
        }
        scroller.classList.add("smooth-scroll-wrapper");
        window.bodyScrollBar = Scrollbar.init(scroller);
        window.bodyScrollBar.addListener(() => {
            if (window.bodyScrollBar.offset.y > 20) {
                $(".header").addClass("stick");
            }
            else {
                $(".header").removeClass("stick");
            }
        })
    }
}

