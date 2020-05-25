$(document).ready(function(){

    $('.hamburger, .overlayPush').click (function(){
        pushMenu();
        navItemHamburger();
        /*$('.navBar-sub').hide();*/
        var holderSub = $('.navBar-sub');
        holderSub.css({
            'display': 'block',
            'height': 0,
            'overflow': 'hidden',
            'border': 'none'
        });
    });

    $('.boxArr').click(function(){
        //showSub();
        showSubNavMobile($(this));
    });


    var sliderHp = new Swiper('.sliderHome .swiper-container', {
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        loop: true,
        autoplay: 2000
    });

    //intro-details
    var holderImgH = $('.ctn-img');
    var ctnText = $('.ctn-img .ctn-img-text');
    var seemore = $('.seemoreText');
    var seemoreLink = $('.seemoreLink');


    //slidePopup


    $('.wrap-content-all').each(function(){
        var itemThis = $(this);

        var galleryTop = new Swiper(itemThis.find('.gallery-top'), {
            nextButton: itemThis.find('.swiper-button-next'),
            prevButton: itemThis.find('.swiper-button-prev'),
            //loop: true,
            //loopedSlides: 5
            //spaceBetween: 10
        });
        var galleryThumbs = new Swiper(itemThis.find('.gallery-thumbs'), {
            spaceBetween: 10,
            centeredSlides: true,
            slidesPerView: 'auto',
            touchRatio: 0.2,
            //freeMode: true,
            //loop:true,
            //loopedSlides: 5,
            paginationClickable: true,
            slideToClickedSlide: true
        });
        galleryTop.params.control = galleryThumbs;
        galleryThumbs.params.control = galleryTop;
    })


    //END slidePopup



    seemoreLink.click(function(){
        var item = $(this);
        item.parent().find('.wrap-hide').stop().css({
            'height' : 'auto',
            'margin-bottom' : '',
            'overflow' : ''
        })
        item.hide();
    });

    $(window).on('load resize',function(){
        var winW = $(window).width();
        seemore.hide();
        if (winW > 970) {
            holderImgH.parents('.wrapper').find('.ctn-img-inner').each(function(){
                var item = $(this);
                var itemH = $(this).outerHeight(true);
                var parentItem = item.parent(holderImgH);
                if ( parentItem.height() > itemH ){
                    parentItem.find(seemore).show();
                    parentItem.find(ctnText).css({
                        'height' : itemH - 83,
                        'margin-bottom' : 53,
                        'overflow' : 'hidden'
                    })
                }
            });

            seemore.click(function(){
                var item = $(this);
                item.parent().find(ctnText).stop().css({
                    'height' : '',
                    'margin-bottom' : '',
                    'overflow' : ''
                })
                item.hide();
            });
        }

        //popupGallery
        var imgPopup = $('.coverPopup > img');
        imgPopup.each(function(){
            var item = $(this);
            var imgPopup_H = item.height();
            var parent_imgHeight = item.parent().parent().height();
            if (imgPopup_H >= parent_imgHeight) {
                item.parent().css('height','100%');
            }else {
                item.parent().css('height','')
            }
        })
        //END popupGallery

    })
    //END intro-details
    scrollMenu();
    fixnav();
    selectWindowResize();
    selectStyle();

    $('.callback').click(function(){
        callbackFn($(this));
    })
});


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
    var navSub = sel.parent().find('.navBar-sub');
    var holderSub = $('.navBar-sub');

    var itemSub_length = holderSub.find('.sub-lst-item').length;
    var height_holderSub = 0;
    navSub.find('.navBar-sub-lst li').each(function(){
        height_holderSub += $(this).outerHeight()
    });
    //navSub.css({'height' : height_holderSub});

    resetSubMobile();
    TweenMax.killTweensOf();
    if (!sel.hasClass('active')){
        TweenMax.to(holderSub,.2,{height: 0, display: 'block', ease:Linear.easeOut});
        TweenMax.to(navSub,.2,{height: height_holderSub, ease:Linear.easeOut, onComplete:function(){
            itemSubShow();
        }});
        sel.parents(holderSub).find('.boxArr').stop().removeClass('active');
        sel.stop().addClass('active');
    }else {
        TweenMax.to(navSub,.2,{height: 0, ease:Linear.easeOut});
        sel.stop().removeClass('active');
    }
}

function itemSubShow(e){
    var itemHolder = $('.navBar-sub .sub-lst-item');
    TweenMax.killTweensOf();
    itemHolder.each(function(id){
        var item = $(this);
        item.attr('itemID', id)
        TweenMax.to(item,.3, {y: 0, alpha: 1, ease:Back.easeOut, delay: id/25})
    })
}

function resetSubMobile(){
    var itemHolder = $('.navBar-sub .sub-lst-item');
    itemHolder.each(function(id){
        var item = $(this);
        TweenMax.killTweensOf(item);
        TweenMax.to(item, 0, {opacity:0, y:20});
    })
}
var scrolledWindow = 0;
function fixnav(){
    var header_H = $('.header').outerHeight();
    $(window).scroll(function(){
        var scrollWindow = $(window).scrollTop();
        var subFix = $('.main-subNav');
        var count_section_total = 0;
        var first_height_section = 0;
        first_height_section = $('.wrapper section[id]:nth-child('+ (1) +')').outerHeight();
        $('.wrapper section[id]').each(function(i){
            count_section_total++;
        });
        $('.wrapper section[id]').each(function(i){
            var top = $(this).offset().top ;
            var scroll = $(window).scrollTop();
            var position_top = top - scroll ;

            var position_top_near_end =  $('.wrapper section[id]:nth-child('+ (count_section_total - 1) +')').offset().top - scroll;
            if( position_top <= first_height_section*0.6
                && position_top >= -1*$(this).outerHeight()*0.85
                && $(this).height() > 0 )
            {

                $('.main-subNav-lst .sub-lst-item > a.active').removeClass('active');
                $('.main-subNav-lst .sub-lst-item > a').eq(i).addClass('active');

                if($('.main-subNav-lst .sub-lst-item:nth-child('+ (count_section_total - 1) +') a').hasClass('active')
                    && position_top_near_end < 0
                  )
                {
                    $('.main-subNav-lst .sub-lst-item  a.active').removeClass('active');
                    $('.main-subNav-lst .sub-lst-item:last-child  a').addClass('active');
                }
                else
                {
                    //console.log('alo')
                }
            }

        });
        if(scrollWindow >  1){
            scrolledWindow = scrollWindow;
            $('.header').addClass('header-fix');
            $('body').addClass('activeScroll_bdy');
            $('.main-subNav').addClass('main-subNav-fix');
            $('.wrapper').css('padding-top', header_H + 40);
            TweenMax.killTweensOf();
            TweenMax.to(subFix, .3, {
                'position': 'fixed',
                'top': '110px',
                'left': 0,
                'right': 0,
                'z-index': 98,
                'margin-top': 0,
                ease:Quint.easeOut
            })

        }else if(scrollWindow < scrolledWindow) {
            $('.header').removeClass('header-fix');
            $('body').removeClass('activeScroll_bdy');
            $('.main-subNav').removeClass('main-subNav-fix');
            $('.wrapper').css('padding-top', '');
            TweenMax.killTweensOf();
            TweenMax.to(subFix, .3, {
                'position': '',
                'top': '',
                'left': '',
                'right': '',
                'z-index': '',
                'margin-top': ''
            })
        }
    });
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
            trace('before');
            boxSelect.addClass('showDown').stop().slideDown(150);
            activeSelect();
        }else {
            trace('after');
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

function test(){
    console.log('abs');
}

function navItemHamburger(){
    var itemHolder = $('.lstNav-item');
    resetAnimation();
    itemHolder.each(function(id){
        var item = $(this);

        item.attr("itemID", id);
        TweenMax.killTweensOf(item);
        TweenMax.fromTo(item,.3, {y: 20, alpha:0}, {y:0, alpha:1, ease:Back.easeOut, delay: id/20,
                                onCompleteParams:[id],onComplete:function(_id){
                if(_id == 1){
                    social();
                }
            }});
    })
}


function social(){
    var itemHolder = $('.header-top-mobile .top-item');
    itemHolder.each(function(id){
        var item = $(this);
        TweenMax.killTweensOf(item);
        item.attr("itemID", id);
        TweenMax.to(item,.3, {y:0, opacity: 1, ease:Back.easeIn, delay: id/20});
    })
}

function resetAnimation(){
    var itemHolder = $('.header-top-mobile .top-item');
    itemHolder.each(function(id){
        var item = $(this);
        TweenMax.killTweensOf(item);
        TweenMax.to(item, 0, {opacity:0, y:20});
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
	var pushLeft = $('.navMobile');
	menuBtn.toggleClass('activePush');
	$('.overlayPush').toggleClass('darkoverlay');
	$('body').toggleClass('push_body');
	pushLeft.toggleClass('pushMenu_show');
}

function trace(s){
    console.log(s)
}

$('.seemoreLink').click(function(event){
    var parent =  $(this).parent();
    var wrap = parent.find('.wrap-hide');
    $(this).css({'background-color ' : 'black'});
    if(parent.find('.wrap-hide').length != 0)
    {
        event.preventDefault();
        wrap.addClass({'height' : '1000px'});
    }
});

function setHeightItem(element)
{
    var max = 0;
    if($(element).length != 0)
    {
        $(element).each(function(){
            if(max < $(this).outerHeight())
            {
                max = $(this).outerHeight();
            }
        });
        $(element).css({'min-height' : max});
    }
}

setHeightItem('.vid-lib');
setHeightItem('.news-item');

$('.vid-control').click(function(event){
    if(!$(event.target).hasClass('caption-poup'))
    {
        var iframe = $(this).find('.iframe');
        var src = iframe.attr('src');
        var where = src.indexOf('&autoplay=0');
        if( where != -1)
        {
            src = src.substring( 0, where);
        }
        else
        {
            src = src+'&autoplay=0';
        }
        $(this).find('.iframe').attr('src' , src);
    }

});

function checkMobile()
{
    var isMobile = false;
    if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
        || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) isMobile = true;
    return isMobile;
}

$('.document_pdf').click(function(event){
    if(!checkMobile())
    {
        event.preventDefault();
    }
    else
    {
        closePopUp();
    }
});