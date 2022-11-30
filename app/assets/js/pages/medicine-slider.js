import Flickity from "flickity";
import gsap, { Power4 } from "gsap";

export default class MedicineSlider {
    constructor() {
        this.carousels = [];
        this.carouselElm = document.querySelectorAll(".js-medicine-prod-slider");
        this.init();
    }
    init() {
        for (let i = 0; i < this.carouselElm.length; i++) {
            const carousel = new Flickity(this.carouselElm[i], {
                cellAlign: "left",
                contain: true,
                pageDots: true,
                prevNextButtons: true,
                wrapAround: false,
                groupCells : true,
            });
            this.carousels.push(carousel);
        }
        this.tabSlider();
    }
    tabSlider(){
        $('.js-tab-slider-medicine').on("click", (e) => {
            const _this = e.currentTarget;
            
            if($(_this).hasClass("active")) return;

            const idSlide = _this.dataset.slide;
            if(!idSlide) return;

            $(".js-slider-medicine").removeClass("active");
            $(idSlide).addClass("active");

            $('.js-tab-slider-medicine').removeClass("active");
            $(_this).addClass("active");
        })
    }
}