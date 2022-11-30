import Flickity from "flickity";

export default class MedicineSlider {
    constructor() {
        this.carousel;
        this.carouselElm = document.querySelector(".js-news-slider");
        this.init();
    }
    init() {
        this.carousel = new Flickity(this.carouselElm, {
            cellAlign: "left",
            contain: true,
            pageDots: true,
            prevNextButtons: true,
            wrapAround: false,
            groupCells : true,
        });
    }
}