
export default class NavSection {
    constructor() {
        this.sections = document.querySelectorAll(".js-nav-section");
        this.lengthSections = this.sections.length;
        this.prevRatio = 0.0;
        this.carouselElmNav = $(".js-nav-section-item");
        this.navItemNext;
        this.textnavClass = ".js-nav-text";
        this.isStop = false;
        this.flagStop = 0;
        this.init();
    }
    init() {
        this.onScroll();
        for (let i = 0; i < this.sections.length; i++) {
            this.createObserver(this.sections[i]);
        }
    }
    onScroll() {
        window.bodyScrollBar.addListener(() => {
            if (this.isStop) {
                if(!this.flagStop){
                    this.flagStop = window.bodyScrollBar.offset.y;
                }
                return;
            };
            $(".nav-section__wrapper").css({ "transform": `translateY(${window.bodyScrollBar.offset.y}px)` })
        })
    }
    handleIntersect(entries, observer) {
        entries.forEach((entry) => {
            let index;
            if (entry.intersectionRatio > 0.5 && entry.intersectionRatio > this.prevRatio) {
                index = entry.target.dataset.index;
                if(index != -1){
                    this.selectNav(index);
                }
                else{
                    this.isStop = true;
                }
            }
            if(window.bodyScrollBar.offset.y <= this.flagStop){
                this.isStop = false;
                this.flagStop = 0;
            }
            this.prevRatio = entry.intersectionRatio;
        });
    }
    createObserver(boxElement) {
        let observer;

        let options = {
            root: null,
            rootMargin: "0px",
            threshold: this.buildThresholdList()
        };

        observer = new IntersectionObserver(this.handleIntersect.bind(this), options);
        observer.observe(boxElement);
    }
    buildThresholdList() {
        let thresholds = [];
        let numSteps = 20;

        for (let i = 1.0; i <= numSteps; i++) {
            let ratio = i / numSteps;
            thresholds.push(ratio);
        }

        thresholds.push(0);
        return thresholds;
    }
    selectNav(index) {
        const indexActiveNav = this.carouselElmNav.length - index - 1;
        this.carouselElmNav.removeClass("active");
        $(this.carouselElmNav[indexActiveNav]).addClass("active");
        if (this.navItemNext) {
            $(this.navItemNext).removeAttr("style");
        }
        this.navItemNext = this.carouselElmNav[indexActiveNav + 1];
        if (!this.navItemNext) return;
        const range = $(this.carouselElmNav[indexActiveNav]).find(this.textnavClass).width();
        $(this.navItemNext).css({ "margin-left": `${range}px` });
    }
}