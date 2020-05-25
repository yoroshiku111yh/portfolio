$(document).ready(function(){

    //$('.dielac-1 .container .col-7 .grp-btn .btn-more').click(function(){
    //    $('.modal-alpha').addClass('active_support');
    //    $('#main').addClass('active_events');
    //    return false;
    //});
    //
    //$('.row-back').click(function(){
    //    $('.modal-alpha').removeClass('active_support');
    //    $('#main').removeClass('active_events');
    //});
    //
    //$('#optimum #main .op-gold-1 .container .col-7 .grp-btn .btn-more').click(function(){
    //    $('.modal-alpha').addClass('active_support');
    //    $('#main').addClass('active_events');
    //    return false;
    //});



    var wWin = $(window).width();

    $('.hamburger, .overlayPush').click (function(){
        pushMenu();
        navItemHamburger();
        /*$('.navBar-sub').hide();*/
        var holderSub = $('.navInner-sub');
        holderSub.css({
            'height': 0
        });
    });
    $('.boxArr').click(function(){
        showSubNavMobile($(this));
        heightNavMobile();
    });

    var owlSld_news = $('.slide-news');
    owlSld_news.owlCarousel({
        items:1,
        merge:true,
        margin:10,
        center:true
    });
    $('#news-nav-next').click(function() {
        owlSld_news.trigger('next.owl.carousel');
    });

    $('#news-nav-back').click(function() {
        owlSld_news.trigger('prev.owl.carousel', [300]);
    });

    //////  Slider product

    /*var count = 0;
    var maxProductShow = 5;

    setHeightSlide();

    var wWin = $(window).width();

    var owlSld_news = $('.slide-news');
    owlSld_news.owlCarousel({
        items:1,
        merge:true,
        margin:10,
        center:true
    });
    $('#news-nav-next').click(function() {
        owlSld_news.trigger('next.owl.carousel');
    });

    $('#news-nav-back').click(function() {
        owlSld_news.trigger('prev.owl.carousel', [300]);
    });

    var owlSldHome = $('.sliderHome');
    var bannerVideo;
    var bannerVideoPlayID;
    var bannerVideoCurrentTime = 0;
    var firstTime = true;
    var trackVideoID = setInterval(checkVideoLoadComplete, 100);

    function checkVideoLoadComplete(){
        if(!isNaN($("#banner-video").get(0).duration)){
            clearInterval(trackVideoID);
            initOwlCarousel();
        }
    }



    function initOwlCarousel(){
        bannerVideo = document.getElementById("banner-video");
        clearTimeout(bannerVideoPlayID);
        bannerVideoPlayID = setTimeout(function(){
            bannerVideo.play();
        }, 300);

        owlSldHome.owlCarousel({
            items:1,
            animateOut: 'fadeOut',
            autoplay:true,
            loop: true,
            autoplayTimeout:60000,
            video:true,
            singleItem: true/!*,
             afterAction: function(current) {
             console.log("owlCarousel after action trigger");
             console.log(current);
             //current.find('#video').get(0).play();
             }*!/
        });


        owlSldHome.on('change.owl.carousel', function(e) {

            var id = e.page.index;
            var total = e.page.count;

            if(id == total - 1){
                /!*
                console.log("enter video");
                //bannerVideo = $("#banner-video");
                setTimeout(function(){
                    bannerVideo = document.getElementById("banner-video");
                    bannerVideo.pause();
                    bannerVideo.play();
                }, 500);
                *!/
            }else{
                bannerVideo.pause();
            }
        })


        var wWin = $(window).width();
        var pagPos = $('.sliderHome .owl-controls');
        var wContainer = $('.container').width();
        pagPos.css({
            'left': (wWin - wContainer)/2
        });
        pagPos.find('.owl-dot').each(function(e){
            $(this).addClass('inner-pag-' + e).attr('val', 'phase-' + e);
            if ($(this).index() == 2) {
                $(this).attr('val', 'phase-1');
            }
        });

    }



    $('.sliderHome .owl-item').each(function(e){
        $(this).attr('val','phase-' + e);
    })


    var owlDot = $('.sliderHome .owl-dots');
    var iSlider = $('.thumbSlider .sld-item');
    var wrap_iSlider = $('.thumbSlider .sld-item-wrapper');
    var w_iSlider = 114;

    iSlider.each(function(){
        var item = $(this);
        var childItem = item.length;
        item.css({
            'width': childItem * w_iSlider
        });
    });

    var length_iSlider = iSlider.length;
    wrap_iSlider.css({
        'width': length_iSlider * w_iSlider
    })

    owlDot.on('click', '.owl-dot', function(e){
        var val_btnHp = $(this).attr('val');
        var w = 0;
        iSlider.each(function(){
            var val_iSlider = $(this).attr('val');
            if(val_iSlider == val_btnHp) {
                var item = $(this);
                item.parent().find(iSlider).removeClass('active');
                $('.sld-item[val=' + val_btnHp +']').stop().addClass('active');
                if(wWin > 1000){
                    iSlider.parent('.sld-item-wrapper').css({
                        'transform' : 'translateX(' + -w + 'px)'
                    });
                }else {
                    iSlider.parent('.sld-item-wrapper').css({
                        'transform' : ''
                    });
                }
                return false;
            }
            w += $(this).outerWidth();
        });
    });


    currentProductActive();
    function currentProductActive(){
        iSlider.on('click', function(){
            var item = $(this);
            item.parent().find('.active').removeClass('active');
            item.addClass('active');
            var id = item.index();
            thumbActive(id);
        });
    }

    function thumbActive(e){
        var index_item = /!*e.index()*!/ e;

        $('.decrips-item, .item-current-img').each(function(e){
            var index_decrp = $(this).index();
            if(index_decrp == index_item) {
                $(this).parent().find('.active').removeClass('active');
                $(this).addClass('active');
            }
        });
    }



    var nextBtn = $('.swiper-button-next');
    var prevBtn = $('.swiper-button-prev');

    nextBtn.click(function(){
        checkNB("next");
        thumbActive(count);
    });

    prevBtn.click(function(){
        checkNB("back");
        thumbActive(count);
    });


    function checkNB(dir){
        switch(dir){
            case "next":
                count++;
                break;
            case "back":
                count--;
                break;
            default:
                break;
        }


        if(count < 0) {
            count = 0;
        }

        if(count > iSlider.length - 1){
            count = iSlider.length - 1;
        }
        addActive();
    }

    var canWidth = 0;

    iSlider.each(function(){
        var item = $(this);
        canWidth = item.width();
    });

    addActive();
    function addActive(e) {
        var wPrevActive = iSlider.eq(count).prev().width();

        if(iSlider.hasClass('active')) {
            iSlider.removeClass('active').eq(count).addClass('active');

            if(count > iSlider.length - maxProductShow){
                //console.log("khong chay dc nua dau!!!!");
            }else{
                iSlider.parent('.sld-item-wrapper').css({
                    //'transform' : 'translateX(' + -wPrevActive + 'px)'
                    'transform' : 'translateX(' + -(canWidth*count) + 'px)'
                });
            }

        }else {
            iSlider.parent('.sld-item-wrapper').css({
                //'transform' : 'translateX(' + wPrevActive + 'px)'
                'transform' : 'translateX(' + (canWidth*count) + 'px)'
            });
        }

        thumbActive(iSlider);

    }*/


    //////  END Slider product




    //choose language
    /*$('.lang-current').click(function(e){
        e.stopPropagation();
        var selectLang = $('.lang-select');
        if(selectLang.is(':hidden')){
            selectLang.stop().slideDown(70);
        }else {
            selectLang.stop().slideUp(70);
        }
    });

    $('.lang-option').each(function(){
        var thisItem = $(this);
        var textScd = $('.lang-current').html();
        var textFst = thisItem.html();
        thisItem.click(function(e){
            e.stopPropagation();
            thisItem.parent().slideUp(70);
            if($('.lang-current').hasClass('vn')){
                $('.lang-current').removeClass('vn').html(textFst).addClass('eng');
                thisItem.removeClass('eng').html(textScd).addClass('vn')
            }else {
                $('.lang-current').removeClass('eng').html(textScd).addClass('vn');
                thisItem.removeClass('vn').html(textFst).addClass('eng')
            }
        })
    });*/
    //END choose language

    $('body').click(function(){
        $('.lang-select').stop().slideUp(70);
    });



    var owlSldOp = $('.wrapSliderOp');
    owlSldOp.owlCarousel({
        items:1,
        animateOut: 'fadeOut',
        center:true,
        nav: true
    });

    var wdContainer = $('.container').width();
    var owlWrapOp = $('.wrapSliderOp');
    var owlNavOp = $('.wrapSliderOp .owl-nav');
    var owlNavOp_item = $('.wrapSliderOp .owl-item');
    $(window).on('load resize', function(){
        owlNavOp.css({
            'width' : wdContainer,
            'margin-left' : -wdContainer/2
        });
        owlNavOp_item.each(function(){
            $(this).css({
                'height' : owlWrapOp.height()
            })
        });
    });

    var owlNavOp_item_val = owlNavOp_item.attr('val');
    owlNavOp_item.each(function(i){
        owlNavOp_item_val = $(this).attr('val', 'op-sld-' + (i + 1));
    });


    owlSldOp.on('changed.owl.carousel', function(el){
        var current = el.item.index;
        var indexItem = $(el.target).find('.owl-item').eq(current).attr('val');
        $('.content-sec3-item').each(function(){
            var thisVal = $(this).attr('val');
            if (indexItem == thisVal) {
                $(this).parents('.content-sec3').find('.content-sec3-item').removeClass('active');
                $(this).addClass('active');
            }
        });
    });

    $('.callback').click(function(){
        callbackFn($(this));
    });


    scrollMenu();
    showHideFooter();
    fixnavAndInfo();


    resizeMainMenu();
    $(window).on("resize",function(){
        resizeMainMenu();
        heightNavMobile();
    }).resize();




});

function heightNavMobile(){
    var wWin = $(window).width();
    var hWin = $(window).height();
    if(wWin > 918){
        $('.navBar').css({
            'height': '',
            'overflow-y' : ''
        });
    }else {
        $('.navBar').css({
            'height': hWin - 55,
            'overflow-y' : 'auto'
        })
    }
}

function resizeMainMenu(){
    var item_nav = $('.lstNav-item');
    var sub_nav = $('.navInner-sub');
    var wWin = $(window).width();
    var hWin = $(window).height();

    item_nav.removeClass('active');
    if(wWin > 1000){
        item_nav.unbind('mouseenter mouseleave hover');
        //resetSubMobile();
        item_nav.hover(function(){
            var thisItem = $(this);
            thisItem.find('.navInner-sub').stop(true).slideDown(400, function(){
                //itemSubShow(thisItem);
            });
            thisItem.stop(true).addClass('active');
        },function(){
            var thisItem = $(this);
            thisItem.find('.navInner-sub').stop(true).slideUp(400, function(){
                //resetSubMobile(thisItem);
            });
            thisItem.stop(true).removeClass('active');
        })
    }else {
        item_nav.unbind('mouseenter mouseleave hover')
    }
}


function scrollMenu() {
    var link_scroll = $('a[href*=#]:not([href=#])');
    link_scroll.click(function() {
        var nameLink = location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname;
        if (nameLink) {
            $(this).parent().parent().find('.currentNav').removeClass('currentNav');
            $(this).addClass('currentNav');
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            if (target.length) {
                var yScroll = target.offset().top;
                $('html,body').animate({
                    scrollTop: yScroll - 193
                }, 700);
                return false;
            }
        }
    });
}

function showSubNavMobile(sel){
    var navSub = sel.parent().find('.navInner-sub');
    var holderSub = $('.navInner-sub');

    var itemSub_length = holderSub.find('.sub-lst-item').length;
    var height_holderSub = 0;
    navSub.find('.lstNav-sub li').each(function(){
        height_holderSub += $(this).outerHeight()
    });
    //navSub.css({'height' : height_holderSub});

    resetSubMobile(sel);
    TweenMax.killTweensOf();
    if (!sel.hasClass('active')){
        console.log(true);
        TweenMax.to(holderSub,.2,{height: 0, ease:Linear.easeOut});
        TweenMax.to(navSub,.2,{height: height_holderSub, ease:Linear.easeOut, onComplete:function(){
            itemSubShow(sel);
        }});
        sel.parents(holderSub).find('.boxArr').stop().removeClass('active');
        sel.stop().addClass('active');
    }else {
        TweenMax.to(navSub,.2,{height: 0, ease:Linear.easeOut});
        sel.stop().removeClass('active');
    }
}

function itemSubShow(el){
    var itemHolder = el.parent().find('.lstNav-sub-item');
    TweenMax.killTweensOf();
    itemHolder.each(function(id){
        var item = $(this);
        item.attr('itemID', id)
        TweenMax.to(item,.3, {y: 0, alpha: 1, ease:Back.easeOut, delay: id/100})
    })
}

function resetSubMobile(el){
    var itemHolder = el.parents('.navBar').find('.lstNav-sub-item');
    itemHolder.each(function(id){
        var item = $(this);
        TweenMax.killTweensOf(item);
        TweenMax.to(item, 0, {opacity:0, y:20});
    })
}

function fixnavAndInfo(){
    var hHeader = $('.header').outerHeight(true);
    var hWrapper = $('.wrapper').height();
    var childInfo = $('.home-info-box-half');
    var hInfo = $('.home-info').outerHeight(true);
    var hScrollTop = hWrapper + hHeader;
    var isAnimate = false;
    var wWin = $(window).width();
    if( wWin > 840){
        $(window).scroll(function(){
            var wScroll = $(window).scrollTop();
            if(isAnimate == false )
            {
                if(wScroll >= hScrollTop + hInfo/3) {
                    childInfo.each(function(id){
                        var item = $(this);
                        item.attr('itemID', id);
                        TweenMax.killTweensOf();
                        TweenMax.to(item,.3,{opacity: 1, y:0, ease:Linear.easeOut, delay: id/8})
                    });
                    isAnimate = true;
                }
                else if(wScroll >= hInfo ) {
                    isAnimate = true;
                }
            }

            scrollBar();
        });

        $(window).on('load resize', function(){
            scrollBar();
        });
    }
}

function resetAnimationInfo(){
    var itemHolder = $('.home-info-box-half');
    itemHolder.each(function(id){
        var item = $(this);
        TweenMax.killTweensOf(item);
        TweenMax.to(item, 0, {opacity:0, y:20});
    })
}



/*function showArticle(){
    var wWin = $(window).width();
    var wScroll = $(window).scrollTop();
    //if(wScroll >= yInfo + hInfo/3 && wWin > 840) {
    if(wScroll >= hScrollTop + yInfo/3 && wWin > 840) {
        isAnimate = true;
        trace('dung' + hScrollTop + yInfo/3)
    }
    else
    {
        trace('sai ' + yInfo);
        trace('scroll ' + wScroll);
        resetAnimation();
    }
}*/

function setHeightSlide()
{
    var max = 0;
    var wWin = $(window).width();
    $('.sliderHome .swiper-slide').each(function(){
        var hThis = $(this).outerHeight();
        if(max < $(this).outerHeight())
        {
            max = hThis;
        }

        if(wWin < 641){
           max = wWin - wWin/4
        }
    });
    $('.sliderHome .swiper-slide').css({'height' : max});
}


function scrollBar(){
    var wWin = $(window).width();
    var thisScroll = $(window).scrollTop();
    var h_header = $('.header').outerHeight(true);
    var h_sliderHome = $('.sizeBanner').height();
    var h_navSection = $('.nav-main').height();
    var navBar = $('.nav');
    var wrapper = $('.wrapper');

    if(wWin > 1000) {
        if (thisScroll > (h_header + h_sliderHome + h_navSection) ) {
            navBar.stop().addClass('nav-state');
        } else {
            navBar.stop().removeClass('nav-state');
        }
        if (thisScroll > ((h_header * 2) + h_sliderHome)) {
            navBar.stop().addClass('nav-scroll');
            wrapper.css('padding-top', navBar.height());
        } else {
            navBar.stop().removeClass('nav-scroll');
            wrapper.css('padding-top', '');
        }
    }else {
        navBar.removeClass('nav-scroll').removeClass('nav-state');
        wrapper.css('padding-top', '');
    }
}

function selectWindowResize(){
    $(window).on("load resize", function(e){
        var winW = $(window).width();
        var boxSelect = $('.main-subNav-lst');
        var curr = $('.current-select-style');
        if(winW < 781) {
            boxSelect.hide();
            curr.show();
        }else {
            boxSelect.show();
            curr.hide();
        }
    })
}


function selectStyle(){
    //selectWindowResize();
    var currArrow = $('.arrSelect');
    var boxSelect = $('.main-subNav-lst');
    currArrow.click(function(){
        if (boxSelect.is(':hidden')){
            boxSelect.addClass('showDown').stop().slideDown(150);
            activeSelect();
        }else {
            boxSelect.removeClass('showDown').stop().slideUp(100);
        }
    })
}

function activeSelect(){
    var currHtml = $('.current-select-style .current-text');
    var itemSelect = $('.main-subNav-lst .sub-lst-item > a');
    var boxSelect = $('.main-subNav-lst');
    itemSelect.click(function () {
        var item = $(this);
        var itemSelectHtml = item.html();
        currHtml.html(itemSelectHtml);
        boxSelect.removeClass('showDown').slideUp(100);
    })
}

function callbackFn(cal){
    var functions = cal.attr('callback');
    if(functions)
    {
        var fn = eval(functions);
        fn();
    }
}

function navItemHamburger(){
    var itemHolder = $('.lstNav-item');
    //resetAnimation();
    itemHolder.each(function(id){
        var item = $(this);

        item.attr("itemID", id);
        TweenMax.killTweensOf(item);
        TweenMax.fromTo(item,.3, {y: 20, alpha:0}, {y:0, alpha:1, ease:Back.easeOut, delay: id/20});
    })
}


function checkMobile()
{
    var isMobile = false; //initiate as false
// device detection
    if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
        || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) isMobile = true;
    return isMobile;
}


function pushMenu(){
	var menuBtn = $('.hamburger');
	var pushLeft = $('.nav');
	menuBtn.toggleClass('activePush');
	$('.overlayPush').toggleClass('darkoverlay');
	$('body').toggleClass('push_body');
	pushLeft.toggleClass('pushMenu_show');
}

function showHideFooter() {
    var ft_top = $('.footer-top');
    var item_click = $('.siteMap');
    item_click.click(function(){
        if(ft_top.is(':hidden')){
            $(this).stop(true).addClass('active');
            ft_top.stop(true).slideDown(90);
        }else {
            $(this).stop(true).removeClass('active');
            ft_top.stop(true).slideUp(90);
        }
    })
}

function showSubMenu(){
    var item_nav = $('.lstNav-item > a');
    var sub_nav = $('.navInner-sub');

    item_nav.hover(function(){
        var thisItem = $(this);
        /*if(sub_nav.is(':hidden')){
            thisItem.parents('.lstNav').find('.lstNav-item').removeClass('active');
            thisItem.parent().addClass('active');
        }else {
            thisItem.parent().removeClass('active');
        }*/
        if(sub_nav.is(':hidden')){
            thisItem.parents('.lstNav').find('.navInner-sub').slideUp();
            thisItem.parent().find('.navInner-sub').slideDown();
        }else {
            thisItem.parent().find('.navInner-sub').slideUp();
        }
    })
}

