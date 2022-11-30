import Flickity from "flickity";

export default class SliderFlickEffect1 {
    constructor({carouselElm, carouselElmNav, textnavClass, autoPlay}) {
        this.carouselElm = $(carouselElm)[0];
        this.carouselElmNav = $(carouselElmNav);
        this.textnavClass = textnavClass;
        this.carousel;
        this.navItemNext;
        this.autoPlay = autoPlay;
        this.init();
    }
    init() {
        if (this.carouselElm.length === 0) return;
        this.carousel = new Flickity(this.carouselElm, {
            cellAlign: "center",
            contain: true,
            pageDots: false,
            prevNextButtons: false,
            wrapAround: true,
            autoPlay : this.autoPlay
        });
    }
}


