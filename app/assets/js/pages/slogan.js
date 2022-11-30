import { gsap, Linear } from "gsap";
import InitScrollTriggerBody from './smoothScrollTrigger';
import Flickity from "flickity";

const initScrollTrigger = new InitScrollTriggerBody();

export default class SloganDrawLogo {
    constructor() {
        this.topFlagStart = 900;
        this.top = this.topFlagStart;
        this.prevIndexSlide = 0;
        this.process = {
            percent: 100,
            percentSlogan1: 100,
            percentSlogan2: 100,
            percentSlogan3: 100
        };
        this.enable = {
            slogan1: true,
            slogan2: true,
            slogan3: true
        }
        this.init();
        this.onResize();
    }
    init() {
        this.stickyEventScroll();
        this.initSlide();
        this.onEventSlide();
        //filter :url("#goo");
        let isSafari = navigator.vendor.match(/apple/i) &&
            !navigator.userAgent.match(/crios/i) &&
            !navigator.userAgent.match(/fxios/i) &&
            !navigator.userAgent.match(/Opera|OPT\//);

        if (isSafari) {
            // Safari browser is used
        } else {
            $("#blob-wrapper").css({filter :'url("#goo")'});
        }
        const sloganInfoElms = $(".js-slogan-info");

        for (let i = 0; i < sloganInfoElms.length; i++) {
            const elm = sloganInfoElms[i];
            const flagId = elm.dataset.flag;
            const id = elm.getAttribute("id");
            this.top += 400 * i;
            this.createFlagTrigger({
                id: flagId,
                top: this.top
            });
            this.createScrollTriggerSloganInfo({
                idContent: `#${id}`,
                idFlag: `#${flagId}`,
                isStart: i === 0,
                isEnd: i === sloganInfoElms.length - 1,
                idContentPrev: i - 1 < 0 ? null : `#${sloganInfoElms[i - 1].getAttribute("id")}`
            })
        }

    }

    stickyEventScroll() {
        $("#svg-logo-draw-1").find("path").css({ strokeDasharray: '1353.3720703125px' });

        this.tlCircle = gsap.timeline({
            scrollTrigger: {
                trigger: ".js-slogan-circle-start-trigger",
                start: "center bottom",
                end: "0% 0%",
                scrub: true,
            }
        });

        this.tlCircle
            .from("#blob-2",
                {
                    scale: 0.25,
                    alpha: 0.15,
                    onUpdate: () => {
                        const alpha = $("#blob-2")[0].style.opacity;
                        if (alpha > 0.45) {
                            $("#svg-logo-draw-1 path").addClass("-play");
                            $("#svg-logo-draw-1 path").removeClass("-reverse");
                        }
                        else {
                            if (!$("#svg-logo-draw-1 path").hasClass("-play")) return;
                            $("#svg-logo-draw-1 path").removeClass("-play");
                            $("#svg-logo-draw-1 path").addClass("-reverse");
                        }
                    }
                }, "stage-1"
            )
            .from(this.process, {
                percent: 0,
                onUpdate: () => {
                    if (this.process.percent > 95.7) {
                        this.startSticky = true;
                        $(".js-pin-contain-slogan").addClass("-sticky");
                        $(".js-pin-contain-slogan").css({ "transform": `translateY(${window.bodyScrollBar.offset.y}px)` });
                    }
                    else {
                        this.startSticky = false;
                        $(".js-pin-contain-slogan").removeClass("-sticky");
                        $(".js-pin-contain-slogan").css({ "transform": "" });
                    }
                }
            }, "stage-1");

        this.tlMain = gsap.timeline({
            scrollTrigger: {
                trigger: ".js-slogan-start-trigger",
                start: "top bottom",
                end: `0% ${-$('.s-slogan').outerHeight() * 0.37}px`,
                scrub: 1,
                pin: false,
                markers: false,
                onUpdate: () => {
                    if (!this.startSticky) return;
                    $(".js-pin-contain-slogan").addClass("-sticky");
                    $(".js-pin-contain-slogan").css({ "transform": `translateY(${window.bodyScrollBar.offset.y}px)` });
                }
            }
        });
    }
    createFlagTrigger({ id, top }) {
        const div = document.createElement("div");
        div.setAttribute("id", id);
        div.style.position = "absolute";
        div.style.top = top + 'px';
        div.style.left = 0;
        $('.s-slogan').append(div);
    }
    createScrollTriggerSloganInfo({ idContent, idFlag, isEnd, isStart, idContentPrev }) {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: idFlag,
                start: "center bottom",
                end: "33% 33%",
                scrub: true,
            }
        });
        if (isStart) {
            return this.partsLogoFirst(tl, idContent);
        }
        if (isEnd) {
            return this.partsLogoLast(tl, idContent, idContentPrev);
        }
        this.partsLogoMiddle(tl, idContent);
    }
    partsLogoFirst(tl, idContent) {
        return tl.from(this.process, {
            percentSlogan1: 0,
            onUpdate: () => {
                if (this.process.percentSlogan1 === 100) {
                    this.carousel.select(1);
                    this.enable.slogan1 = false;
                }
                else {
                    if (!this.enable.slogan1) {
                        this.carousel.select(0);
                        this.enable.slogan1 = true;
                    }
                }
            }
        })
    }
    partsLogoMiddle(tl, idContent) {
        tl.from(this.process, {
            percentSlogan2: 0,
            onUpdate: () => {
                if (this.process.percentSlogan2 === 100) {
                    this.carousel.select(2);
                    this.enable.slogan2 = false;
                }
                else {
                    if (!this.enable.slogan2) {
                        this.carousel.select(1);
                        this.enable.slogan2 = true;
                    }
                }
            }
        })
    }
    partsLogoLast(tl, idContent, idContentPrev) {
        tl.from(this.process, {
            percentSlogan3: 0,
            onUpdate: () => {
            }
        })
    }
    onResize() {
        window.addEventListener("resize", () => {
            window.location.reload();
        })
    }
    initSlide() {
        this.carousel = new Flickity(document.querySelector(".js-slogan-slide"), {
            cellAlign: "center",
            contain: true,
            pageDots: false,
            prevNextButtons: false,
            wrapAround: true,
            adaptiveHeight: true,
        });
    }
    onEventSlide() {
        const duration = 0.5;
        this.carousel.on("change", (index) => {
            switch (index) {
                case 0:

                    $("#svg-logo-draw-2 path").removeClass("-play");
                    $("#svg-logo-draw-2 path").addClass("-reverse");

                    if ($("#svg-logo-draw-2 path").hasClass("-play")) {
                        $("#svg-logo-draw-2 path").removeClass("-play");
                        $("#svg-logo-draw-2 path").addClass("-reverse");
                    }
                    break;
                case 1:
                    $("#svg-logo-draw-2 path").addClass("-play");
                    $("#svg-logo-draw-2 path").removeClass("-reverse");

                    if ($("#svg-logo-draw-3 path").hasClass("-play")) {
                        $("#svg-logo-draw-3 path").removeClass("-play");
                        $("#svg-logo-draw-3 path").addClass("-reverse");
                    }
                    break;
                case 2:

                    $("#svg-logo-draw-3 path").addClass("-play");
                    $("#svg-logo-draw-3 path").removeClass("-reverse");
                default:
                    break;
            };
            const cells = this.carousel.getCellElements();
            const prevElm = $(cells[this.prevIndexSlide]).find(".js-slogan-info")[0];
            const selectedElm = $(cells[index]).find(".js-slogan-info")[0];
            if (index === 0) {
                gsap.timeline().fromTo(
                    selectedElm,
                    {
                        y: "-25px",
                        filter: "blur(3px)",
                        alpha: 0,
                        duration: duration,
                        ease: Linear.easeNone
                    },
                    {
                        y: "0",
                        filter: "blur(0px)",
                        alpha: 1,
                        duration: duration,
                        ease: Linear.easeNone
                    },
                );
            }
            else {
                gsap.timeline().fromTo(
                    selectedElm,
                    {
                        y: "50px",
                        filter: "blur(3px)",
                        alpha: 0,
                        duration: duration,
                        ease: Linear.easeNone
                    },
                    {
                        y: "0",
                        filter: "blur(0px)",
                        alpha: 1,
                        duration: duration,
                        ease: Linear.easeNone
                    },
                );
            }
            if (this.prevIndexSlide > index) {
                gsap.timeline().fromTo(
                    prevElm,
                    {
                        y: "0px",
                        filter: "blur(0px)",
                        alpha: 1,
                        duration: duration,
                        ease: Linear.easeNone
                    },
                    {
                        y: "50px",
                        filter: "blur(3px)",
                        alpha: 0,
                        duration: duration,
                        ease: Linear.easeNone
                    },
                );
            }
            this.prevIndexSlide = index;
        })
    }
}