import Scrollbar from 'smooth-scrollbar';

export default class SmoothScroll {
    constructor() {
        this.initSmoothScroll();
        window.bodyScrollBar.addListener(() => {
            if(window.bodyScrollBar.offset.y > 20){
                $(".header").addClass("stick");
            }
            else{
                $(".header").removeClass("stick");
            }
        })
    }
    initSmoothScroll() {
        const scroller = document.querySelector('.body-smooth-scroll');
        if (!scroller || window.innerWidth < 768) {
            return;
        }
        scroller.classList.add("smooth-scroll-wrapper");
        window.bodyScrollBar = Scrollbar.init(scroller);
    }
}

