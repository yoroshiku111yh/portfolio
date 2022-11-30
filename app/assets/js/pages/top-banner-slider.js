import SliderFlickEffect1 from './../components/sliderFlickEffect1';

export default class TopBannerSlider {
    constructor() {
        this.carouselElm = $(".js-slider-top-banner");
        this.carouselElmNav = $(".js-slider-top-banner-nav");
        this.carousel;
        this.navItemNext;
        this.init();
    }
    init() {
        if (this.carouselElm.length === 0) return;
        this.slider = new SliderFlickEffect1({
            carouselElm : this.carouselElm[0],
            carouselElmNav : this.carouselElmNav,
            textnavClass : ".js-slider-top-banner-nav-text",
            autoPlay : this.carouselElm[0].dataset.auto ? true : false
        })
    }
}