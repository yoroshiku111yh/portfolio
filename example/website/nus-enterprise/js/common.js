$(document).ready(function(){

    var wWin = $(window).width();

    $('.v02-hamburger, .v02-overlayPush').click (function(){
        pushMenu();
        if($(this).hasClass('v02-activePush')){
            navItemHamburger();
        }
        var holderSub = $('.v02-nav-sub');
        holderSub.css({
            'height': 0
        });
    });



    var owlSldOp = $('.v02-banner-home-wrap');
    owlSldOp.owlCarousel({
        items:1,
        singleItem: true,
        animateOut: 'fadeOut',
        center:true,
        nav: true
    });



    //slideEvents();
    scrollMenu();
    fixnavAndInfo();
    polygonMask();
    //widthItemSldItem();
    slideMobileNews ();
    currentEffect ();
    boxSearch();
    slideEvents();
    heightBanner();
    heightThumbEvents();
    navInit();
    $(window).on("resize",function(){
        //widthItemSldItem();
        polygonMask();
        slideMobileNews ();
        currentEffect();
        boxSearch();
        heightThumbEvents();
        heightBanner();
        navInit();
        heightNavMobile();
    }).resize();

    $('span.v02-search-btn').click(function(e){
        e.stopPropagation();
        var boxSearch = $('.v02-search-control');

        if(!boxSearch.hasClass('v02-active')){
            boxSearch.stop().addClass('v02-active');
            $('span.v02-search-btn').addClass('v02-hide');
        }else {
            boxSearch.stop().removeClass('v02-active');
            $('span.v02-search-btn').removeClass('v02-hide');
        }
        setTimeout(function(){boxSearch.find('.v02-ipSearch').focus()},100)
    });

    $('.v02-search-control').click(function(e){
        e.stopPropagation();
    });


    $('.v02-callback').click(function(){
        callbackFn($(this));
    });


    $(document).click(function(){
        resetSubMobile($('.v02-boxArr'));
        heightNavMobile();
        $('.v02-bottom-nav-item').stop().removeClass('v02-active');
        $('.v02-nav-sub').stop().css({
            'height' : ''
        });
        $('span.v02-search-btn').stop().removeClass('v02-hide');
        $('.v02-search-control').stop().removeClass('v02-active');
    });

    //section select
    $('select').each(function () {

        var $this = $(this),
            numberOfOptions = $(this).children('option').length;

        $this.addClass('v02-hide');
        $this.wrap('<div class="v02-select"></div>');
        $this.after('<div class="v02-styledSelect"></div>');

        var $styledSelect = $this.next('div.v02-styledSelect');
        $styledSelect.text($this.children('option').eq(0).text());

        var $list = $('<ul />', {
            'class': 'v02-options'
        }).insertAfter($styledSelect);

        $('<span/>', {
            'class': 'v02-boxArr-inner'
        }).insertAfter($list);

        for (var i = 0; i < numberOfOptions; i++) {
            $('<li />', {
                text: $this.children('option').eq(i).text(),
                rel: $this.children('option').eq(i).val()
            }).appendTo($list);
        }

        var $listItems = $list.children('li');

        $styledSelect.click(function (e) {
            e.stopPropagation();
            $('div.v02-styledSelect.v02-active').each(function () {
                $(this).removeClass('v02-active').next('ul.v02-options').hide();
            });
            //$(this).toggleClass('active').next('ul.options').toggle();
            //$(this).toggleClass('active');
            $(this).next('ul.v02-options').toggle(180);
        });

        $listItems.click(function (e) {
            e.stopPropagation();
            $styledSelect.text($(this).text()).removeClass('v02-active');
            //$this.val($(this).attr('rel'));
            $list.hide();
        });

        $(document).click(function () {
            $styledSelect.removeClass('v02-active');
            $list.hide();
        });

    });
    //END section select


});


function polygonMask(){
    var widthPoint,
        heightPoint,
        halfWPoint,
        pointItemMask,
        hNews = $('#v02-news').outerHeight(),
        wWin = $(window).width(),
        hBannerHome = $('.v02-banner-home').height(),
        itemMask = $('#v02-polyMask'),
        itemMaskNews = $('#v02-polyMask-news'),
        overlayMask = $('.v02-mask-overlay-poly'),
        overlayNews = $('.v02-mask-overlay-news');

    widthPoint = wWin;
    halfWPoint = widthPoint / 2;
    heightPoint = hBannerHome;
    $('#v02-myMask').attr({
        'height' : hBannerHome,
        'width' : wWin
    });
    $('#v02-myMask-news').attr({
        'height' : hNews,
        'width' : wWin
    });

    if(wWin > 1023) {
        itemMask.attr('points', '0,0 ' + widthPoint + ',0 ' + widthPoint + ',' + (heightPoint * 76) / 100 + ' ' + widthPoint / 2 + ',' + heightPoint + ' 0,' + (heightPoint * 76) / 100 + '');
        overlayMask.attr('points', '0,0 ' + widthPoint + ',0 ' + widthPoint + ',' + (heightPoint * 76) / 100 + ' ' + widthPoint / 2 + ',' + heightPoint + ' 0,' + (heightPoint * 76) / 100 + '');
        itemMaskNews.attr('points', '0,' + (hNews * 5.5)/100 + ' ' + widthPoint + ',0 ' + widthPoint + ',' + hNews + ' 0,' + (hNews * 94.5)/100);
        overlayNews.attr('points', '0,' + (hNews * 5.5)/100 + ' ' + widthPoint + ',0 ' + widthPoint + ',' + hNews + ' 0,' + (hNews * 94.5)/100);

    }else {
        itemMask.attr('points', '0,0 ' + widthPoint + ',0 ' + widthPoint + ',' + heightPoint + ' ' + widthPoint / 2 + ',' + heightPoint + ' 0,' + heightPoint + '');
        overlayMask.attr('points', '0,0 ' + widthPoint + ',0 ' + widthPoint + ',' + heightPoint + ' ' + widthPoint / 2 + ',' + heightPoint + ' 0,' + heightPoint + '');
        itemMaskNews.attr('points', '0,0 ' + widthPoint + ',0 ' + widthPoint + ',' + hNews + ' 0,' + hNews);
        overlayNews.attr('points', '0,0 ' + widthPoint + ',0 ' + widthPoint + ',' + hNews + ' 0,' + hNews);
    }
}



var isNewsCarousel = false;

function slideMobileNews(){
    var wWin = $(window).width();
    var owlMobileNews = $('.v02-news-wrap-slide');

    if(wWin < 1000){ // change to 768 if check on ipad only;
        if(!isNewsCarousel){
            owlMobileNews.addClass('owl-carousel').owlCarousel({
                items:2,
                margin: 12,
                nav: true,
                responsive: {
                    0:{
                        items:1
                    },
                    640:{
                        items:2
                    }
                }
            })
            isNewsCarousel = true;
        }
    }else {
        if(isNewsCarousel){
            owlMobileNews.trigger('destroy.owl.carousel').removeClass('owl-carousel owl-loaded');
            owlMobileNews.find('.owl-stage-outer').children().unwrap();
            owlMobileNews.responsive = false;
            owlMobileNews.removeData();
            isNewsCarousel = false;
        }
    }
}

function boxSearch(){
    var wWin = $(window).width();
    var wHamburger = $('.v02-hamburger').outerWidth();
    if(wWin < 461) {
        $('.v02-search-mobile .v02-ipSearch').css({
            'width' : wWin - 40,
            'right': -wHamburger
        })
    }else {
        $('.v02-search-mobile .v02-ipSearch').css({
            'width' : '',
            'right': ''
        })
    }
}

function widthItemSldItem(){
    var item = $('.v02-events-inner .owl-item');
    var wWrap = $('.v02-events-inner').width();
    var wWin = $(window).width();
    if(wWin < 640){
        item.css({
            'width': wWrap - 50
        });
        slideEvents();
    }else {
        slideEvents();
    }
}

function slideEvents (){

    //slider events
    var owlEventsHp = $('.v02-events .v02-events-inner');
    owlEventsHp.owlCarousel({
        items:2,
        margin: 12,
        nav: true,
        responsive: {
            0:{
                center: false,
                //stagePadding: 20,
                items:1
            },
            640:{
                items:2
            }
        }
    });
    //END slider events


    //slider funding
    var owlFundingHp = $('.v02-funding .v02-events-inner');
    owlFundingHp.owlCarousel({
        margin: 12,
        nav: true,
        dots: false,
        responsive: {
            0:{
                center: false,
                //stagePadding: 50,
                items:1
            },
            640:{
                //autoWidth: true,
                items:2
            },
            768:{
                items:3
            }
        }
    });
    //END slider funding
}

function heightThumbEvents(){
    var h_thumbEvents = $('.v02-events .v02-events-thumb').height();
    setTimeout(function(){
        $('.v02-events .owl-nav').css({
            'top' : h_thumbEvents/2,
            'margin-top': -12
        })
    },300);
}

function heightBanner(){
    var wWin = $(window).width();
    var hBanner = $('.v02-banner-home').height();
    var hBanner_item = $('.v02-banner-home-item');


    if(wWin < 918){
        hBanner_item.css({
            'height' : wWin/2
        })
    }else {
        hBanner_item.css({
            'height' : ''
        })
    }
}


function heightNavMobile(){
    var wWin = $(window).width();
    var hWin = $(window).height();
    if(wWin > 918){
        $('.v02-navBar').css({
            'height': '',
            'overflow-y' : '',
            'padding-top' : ''
        });
    }else {
        $('.v02-navBar').css({
            'height': hWin,
            'padding-top' : '50px',
            'overflow-y' : 'auto'
        })
    }
}

function navInit(){
    var wWin = $(window).width();
    var navHover = $('.v02-bottom-nav-item');
    var navClick = $('.v02-boxArr');
    navHover.unbind('mouseenter mouseleave hover');
    navClick.unbind('mouseenter mouseleave hover click');
    if(wWin > 1020){
        if (!navHover.hasClass('active')){
            navHover.hover(function(e){
                e.stopPropagation();
                navSubMobile($(this).find('a'));
                heightNavMobile();
            });
        }
    }
    if(wWin <= 1024){
        navClick.click(function(e){
            e.stopPropagation();
            navSubMobile($(this));
            heightNavMobile();
        });
    }
}


function scrollMenu() {
    var link_scroll = $('a[href*=#]:not([href=#])');
    link_scroll.click(function() {
        var nameLink = location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname;
        if (nameLink) {
            $(this).parent().parent().find('.v02-currentNav').removeClass('v02-currentNav');
            $(this).addClass('v02-currentNav');
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            if (target.length) {
                var yScroll = target.offset().top;
                $('html,body').animate({
                    scrollTop: yScroll - 62
                }, 700);
                return false;
            }
        }
    });
}



var showNavItemID;

function navSubMobile(sel){
    var navSub = sel.parent().find('.v02-nav-sub');
    var holderSub = $('.v02-nav-sub');

    var itemSub_length = holderSub.find('.v02-nav-sub-lst').length;
    var height_holderSub = 0;
    navSub.find('.v02-nav-sub-lst li').each(function(){
        height_holderSub += $(this).outerHeight(true)
    });
    //navSub.css({'height' : height_holderSub});

    resetSubMobile(sel);

    if (!sel.parent().hasClass('v02-active')){
        TweenMax.killTweensOf(holderSub);
        TweenMax.killTweensOf(navSub);
        TweenMax.to(holderSub,.2,{height: 0, ease:Linear.easeOut});
        /*
        TweenMax.to(navSub,.3,{height: height_holderSub + 2, ease:Linear.easeOut, onComplete:function(){
            itemSubShow(sel);
        }});
        */
        TweenMax.to(navSub,.3,{height: height_holderSub + 2, ease:Linear.easeOut});
        clearTimeout(showNavItemID);
        showNavItemID = setTimeout(function(){
            itemSubShow(sel);
        },150);

        sel.parents('.v02-navBar').find('.v02-bottom-nav-item').stop().removeClass('v02-active');
        sel.parent().stop().addClass('v02-active');
    }else {
        TweenMax.to(navSub,.2,{height: 0, ease:Linear.easeOut});
        sel.parent().stop(true).removeClass('v02-active');
    }
}

function itemSubShow(el){
    var itemHolder = el.parent().find('.v02-nav-sub-lst-item');
    itemHolder.each(function(id){
        var item = $(this);
        item.attr('itemID', id);
        TweenMax.killTweensOf(item);
        TweenMax.to(item,.45, {y: 0, alpha: 1, ease:Back.easeOut, delay: id/20})
    })
}

function resetSubMobile(el){
    var itemHolder = el.parents('.v02-navBar').find('.v02-nav-sub-lst-item');
    itemHolder.each(function(id){
        var item = $(this);
        TweenMax.killTweensOf(item);
        TweenMax.to(item, 0, {opacity:0, y:20});
    });
    //$('.bottom-nav-item').stop().removeClass('active');
}

function fixnavAndInfo(){
    var hHeader = $('.v02-header').outerHeight(true);
    var hWrapper = $('.v02-wrapper').height();
    var childInfo = $('.v02-home-info-box-half');
    var hInfo = $('.v02-home-info').outerHeight(true);
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
                        TweenMax.killTweensOf(item);
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
    var itemHolder = $('.v02-home-info-box-half');
    itemHolder.each(function(id){
        var item = $(this);
        TweenMax.killTweensOf(item);
        TweenMax.to(item, 0, {opacity:0, y:20});
    })
}


function scrollBar(){
    var wWin = $(window).width();
    var thisScroll = $(window).scrollTop();
    var h_header = $('.v02-header').outerHeight(true);
    var h_sliderHome = $('.v02-sizeBanner').height();
    var h_navSection = $('.v02-nav-main').height();
    var navBar = $('.v02-nav');
    var wrapper = $('.v02-wrapper');

    if(wWin > 1000) {
        if (thisScroll > (h_header + h_sliderHome + h_navSection) ) {
            navBar.stop().addClass('v02-nav-state');
        } else {
            navBar.stop().removeClass('v02-nav-state');
        }
        if (thisScroll > ((h_header * 2) + h_sliderHome)) {
            navBar.stop().addClass('v02-nav-scroll');
            wrapper.css('padding-top', navBar.height());
        } else {
            navBar.stop().removeClass('v02-nav-scroll');
            wrapper.css('padding-top', '');
        }
    }else {
        navBar.removeClass('v02-nav-scroll').removeClass('v02-nav-state');
        wrapper.css('padding-top', '');
    }
}

function callbackFn(cal){
    var functions = cal.attr('v02-callback');
    if(functions)
    {
        var fn = eval(functions);
        fn();
    }
}

function navItemHamburger(){
    var itemHolder = $('.v02-bottom-nav-item');
    //resetAnimation();
    itemHolder.each(function(id){
        var item = $(this);
        item.attr("itemID", id);
        TweenMax.killTweensOf(item);
        TweenMax.fromTo(item,.3, {y: 20, alpha:0}, {y:0, alpha:1, ease:Back.easeOut, delay: id/20});
    })
}

function currentEffect(){
    var wWin = $(window).width();
    var thisItemHover = $('.v02-item-hover');
    if(wWin > 1024){
        resetAnimation();
        //TweenMax.killTweensOf(thisItemHover.find('.fullImg'));
        //TweenMax.to(thisItemHover.find('.fullImg'),.25, {scale:1, ease:Expo.easeOut});

        //thisItemHover.each(function(){
        //    var item = $(this);
        thisItemHover.hover(function(){
            hoverEffect($(this));
        },function(){
            resetAnimation();
            TweenMax.killTweensOf(thisItemHover.find('.v02-fullImg'));
            TweenMax.killTweensOf(thisItemHover.find('.v02-overlay'));
            TweenMax.to(thisItemHover.find('.v02-fullImg'),.5, {scale:1,transformOrigin:"50% 50%", ease:Expo.easeOut});
            TweenMax.to(thisItemHover.find('.v02-overlay'),.5, {scale:1,transformOrigin:"50% 50%", ease:Expo.easeOut});
            //TweenMax.to(thisItemHover.find('.fullImg'),.25, {css:{transform:"scale(1) translate(50% 50%)"}, ease:Expo.easeOut});
        });
        //})
    }else{
    }
}

function hoverEffect(parent){
    var itemHolder = parent.find('.v02-item-effect');
    resetAnimation();
    itemHolder.each(function(id){
        var item = $(this);
        item.attr("itemID", id);
        TweenMax.killTweensOf(item);
        TweenMax.killTweensOf(parent.find('.v02-fullImg'));
        TweenMax.killTweensOf(parent.find('.v02-overlay'));
        TweenMax.to(item,.3, {y:0, alpha:1, ease:Sine.easeOut, delay: 0});
        TweenMax.to(parent.find('.v02-fullImg'),.5, {scale:1.2,transformOrigin:"50% 50%", ease:Expo.easeOut});
        TweenMax.to(parent.find('.v02-overlay'),.5, {scale:1.2,transformOrigin:"50% 50%", ease:Expo.easeOut});
        //TweenMax.to(thisItemHover.find('.fullImg'),.25, {css:{transform:"scale(1.2) translate(50% 50%)"}, ease:Expo.easeOut});
        TweenMax.to(parent.find('.v02-overlay'),.3, {alpha:1, ease: Sine.easeOut});
    })
}

function resetAnimation(){
    var itemHolder = $('.v02-item-effect');
    itemHolder.each(function(id){
        var item = $(this);
        item.attr("itemID", id);
        TweenMax.killTweensOf(item);
        TweenMax.killTweensOf(item.parent().find('.v02-overlay'));
        TweenMax.to(item,.2, {y: 30, alpha:0, ease:Sine.easeOut, delay: 0});
        TweenMax.to(item.parent().find('.v02-overlay'),.1, {alpha:0, ease: Sine.easeOut});
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
	var menuBtn = $('.v02-hamburger');
	var pushLeft = $('.v02-nav');
	menuBtn.toggleClass('v02-activePush');
	$('.v02-overlayPush').toggleClass('v02-darkoverlay');
	$('body').toggleClass('v02-push_body');
	pushLeft.toggleClass('v02-pushMenu_show');
}
