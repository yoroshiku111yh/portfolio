/**
 * Created by minhvu on 3/2/2016.
 */
$(document).ready(function(){
    $(window).load(function(){
        init();
    });
    $(window).resize(function(){
        init();
    });
});
var height_sub_menu = 0;
var max_width_sub_menu = 0 ;
var position_top = 0;
var scrolled = 0;
function init()
{
    setMarginTopWrapper();
    /*if(!msieversion())
    {
    }
    else
    {
        var banner_left = $('.v02-banner-left');
        var banner_right = $('.v02-banner-right');
        banner_left.css({'top' : 0});
        banner_right.css({'top' : 0});
    }*/
    setWidthHeightdropDownMenu();
    hoverMenuLineEffect();
    setHeightAboutItem();
    setCenterImg(
        $('#v02-noc-section-about .v02-about-item'),
        '.v02-about-img',
        $('.v02-about-item')
    );
    owlSlide();
    setPosOwlSlideBtn();
    setBgWave();
    slideAlumin();
    slideAbout();
    setPosTextOptions();
    setWidthCompany();
    setBannerNoc();
    scrollMenuSetPosition();
    slideMobileHightLight();
    setWidthUlMenu();
}

function setWidthUlMenu()
{
    var width = 0;
    $('.v02-menu-header .v02-menu-item').each(function(){
        width += ($(this).outerWidth() + 0.5);
    });
    $('.v02-menu-header').css({'width' : width});
}

function msieversion() {

    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");

    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))      // If Internet Explorer, return version number
        //alert(parseInt(ua.substring(msie + 5, ua.indexOf(".", msie))));
    {
        return parseInt(ua.substring(msie + 5, ua.indexOf(".", msie)));
    }
    else
    {
        return false;
    }// If another browser, return 0
}

function slideAlumin()
{
    transformowlCarousel( '.v02-content-about' , 700 , '.v02-about-item' );
}

function slideAbout()
{
    transformowlCarousel( '.v02-options' , 583 , '.v02-item-option' );
}

function hoverMenuLineEffect()
{
    var line = $('.v02-nav-header .v02-line-animate');
    $('.v02-nav-header .v02-menu-header .v02-menu-item').mouseover(function(){
        var w = 0;
        var w_original = 0;
        var left = 0;
        var id = $(this).index();
        var count = 0;
        $('.v02-nav-header .v02-menu-header .v02-menu-item').each(function(){
            w = $(this).outerWidth() ;
            w_original = $(this).width() ;
            count++;
            if(id == count)
            {
                var padding = w - w_original;
                var padding_span = $(this).find('.v02-text').outerWidth() - $(this).find('.v02-text').width();
                left += padding/2;
                w_original += padding/2;
                return false;
            }
            left += w + count + 1 ;
        });
        var subMenu = $(this).find('.v02-menu-child');
        line.css({'width' : w_original , 'opacity' : 1 , 'left' : left});
        subMenu.find('.v02-li-menu-child').css({'width' : max_width_sub_menu });
        subMenu.css({'height' : height_sub_menu , 'bottom' : -height_sub_menu , 'width' : max_width_sub_menu, 'opacity' : 1 });
    });
    $('.v02-nav-header .v02-menu-header .v02-menu-item').mouseleave(function(){
        line.css({'width' : '' , 'opacity' : '' , 'left' : ''});
        var subMenu = $(this).find('.v02-menu-child');
        subMenu.css({'height' : 0 , 'bottom' : '' , 'opacity' : '' });
    });
}

function setWidthHeightdropDownMenu()
{
    $('.v02-nav-header .v02-menu-header .v02-menu-item').each(function() {
        dropDownSubMenu($(this));
    });
}

function setMarginTopWrapper()
{
    position_top = $('.v02-banner-home').height()/3;
    $('.v02-wrapper-margin').css({'margin-top' : -($('.v02-banner-home').height()/3)});
    $('.v02-owl-dots').css({'bottom' : position_top});
    if($(window).width() < 1023)
    {
        $('.v02-wrapper-noc').css({'margin-top' : ''});
        $('.v02-owl-dots').css({'bottom' : ''});
    }
}

var isNewsCarousels = false;

function slideMobileHightLight(){
    var wWin = $(window).width();
    var owlMobileNews = $('#v02-noc .v02-item-detail');

    if(wWin < /*530*/ 799){ // change to 768 if check on ipad only;
        if(!isNewsCarousels){
            owlMobileNews.addClass('owl-carousel').owlCarousel({
                items:2,
                /*itemsDesktopSmall : [799,1], // betweem 900px and 601px
                itemsTablet: [600,1], //2 items between 600 and 0*/
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
            isNewsCarousels = true;
            $('#v02-noc-section-highlights .owl-prev').addClass('style');
            $('#v02-noc-section-highlights .owl-next').addClass('style');
            var top = $('#v02-noc-section-highlights .v02-item-detail .v02-item').height()/2 - $('#noc-section-highlights .owl-prev.style').outerHeight()/2;
            $('#v02-noc-section-highlights .owl-prev').css({'top' : top});
            $('#v02-noc-section-highlights .owl-next').css({'top' : top});

        }
    }else {
        if(isNewsCarousels){
            owlMobileNews.trigger('destroy.owl.carousel').removeClass('owl-carousel owl-loaded');
            owlMobileNews.find('.owl-stage-outer').children().unwrap();
            owlMobileNews.responsive = false;
            owlMobileNews.removeData();
            isNewsCarousels = false;
        }
    }
}

function transformowlCarousel( divParent , sizeDetect , item  ){
    var wWin = $(window).width();
    var owl = $(divParent);

    if(wWin < sizeDetect){ // change to 768 if check on ipad only;
        if(!owl.hasClass('owl-carousel')){
            owl.addClass('owl-carousel').owlCarousel({
                items:2,
                /*itemsDesktopSmall : [799,1], // betweem 900px and 601px
                 itemsTablet: [600,1], //2 items between 600 and 0*/
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
            //isTurnCarousel = true;
            $(divParent).find('.owl-prev').addClass('style');
            $(divParent).find('.owl-next').addClass('style');
            var top = $(divParent).find(item).height()/2 - $(divParent).find('.owl-prev.style').outerHeight()/2;
            $(divParent).find('.owl-prev.style').css({'top' : top});
            $(divParent).find('.owl-next.style').css({'top' : top});

        }
    }else {
        if(owl.hasClass('owl-carousel')){
            owl.trigger('destroy.owl.carousel').removeClass('owl-carousel owl-loaded');
            owl.find('.owl-stage-outer').children().unwrap();
            owl.responsive = false;
            owl.removeData();
            //isTurnCarousel = false;
        }
    }
}

function scrollMenuSetPosition()
{
    if($('.v02-content').length != 0)
    {
        var h_header = $('header').outerHeight();
        $(window).scroll(function(){
            var scroll = $(window).scrollTop();
            var top = 0;
            if(msieversion())
            {
                top = $('.v02-banner-home').height();
            }
            else
            {
                top = position_top*2;
            }
            var total_width = 0;
            $('.v02-menu-header .v02-menu-item').each(function(){
                var w = $(this).outerWidth();
                total_width += (w + 5);
            });

            if($(window).width() > 789)
            {
                if(scroll >= top + h_header  && scroll > scrolled )
                {
                    $('header').css({'opacity' : 0});
                    $('.v02-nav-header').css({'position' : 'fixed' , 'left' : 0 , 'right' : 0 , 'top' : 0 , 'z-index' : 99});
                    $('.v02-menu-header').css({'width' : total_width});
                    scrolled = scroll;
                }
                else if (scrolled > scroll)
                {
                    scrolled = scroll;
                    $('header').css({'opacity' : ''});
                    $('.v02-nav-header').css({'position' : '' , 'left' : '' , 'right' : '' , 'top' : '' , 'z-index ' : 1});
                    $('.v02-menu-header').css({'width' : ''});
                }
            }

        });
    }
}

function dropDownSubMenu(element)
{
    var max_width = 0;
    var height_sub = 0;
    var margin = 32;
    var subMenu = element.find('.v02-menu-child');
    if(subMenu.length != 0)
    {
        subMenu.find('.v02-li-menu-child').each(function(){
            var w = $(this).outerWidth();
            var h = $(this).outerHeight();
            height_sub += h;
            if(w > max_width)
            {
                max_width = w;
            }
        });
        height_sub_menu = height_sub;
        max_width_sub_menu = max_width + margin;
    }
}

function setHeightAboutItem()
{
    $('#v02-noc-section-about .v02-about-item').each(function(){
        var spanText = $(this).find('.v02-text');
        spanText.css({'position' : 'relative'});
        var height = spanText.outerHeight();
        spanText.css({'position' : '' , 'height' : height});

    });
}
function setCenterImg(list , classImg , wrapper)
{
    list.each(function(){
        if($(this).find(classImg).height() < wrapper.height() )
        {
            $(this).find(classImg).css({'height' : '100%'});
        }
        var w = $(this).find(classImg).width();
        var h = $(this).find(classImg).height();
        var w_wrapper = wrapper.width();
        var h_wrapper = wrapper.height();
        var trend = -1;
        var left = trend*(w - w_wrapper)/2;
        var top = trend*(h - h_wrapper)/2;
        $(this).find(classImg).css({'top' : top , 'left' : left});
    });
}

function owlSlide()
{
    $('.v02-slide-upcoming').owlCarousel({
        items : 2,
        itemsDesktop : [1000,2], //5 items between 1000px and 901px
        itemsDesktopSmall : [900,2], // betweem 900px and 601px
        itemsTablet: [600,2] //2 items between 600 and 0
    });

    $('.v02-upcoming .owl-next').click(function(){
        $('.v02-slide-upcoming').trigger('next.owl.carousel');
    });
    $('.v02-upcoming .owl-prev').click(function(){
        $('.v02-slide-upcoming').trigger('prev.owl.carousel');
    });
}

function setPosOwlSlideBtn()
{
    var height_image = $('.v02-slide-upcoming .v02-item-image').height();
    var height_btn_slide = $('.upcoming .owl-prev').outerHeight();
    var top = height_image/2 - height_btn_slide/2;
    $('.v02-upcoming .owl-prev').css({'top' : top});
    $('.v02-upcoming .owl-next').css({'top' : top});
}

function setBgWave()
{
    var w = $(window).width();
    var w_content = $('#v02-noc-section-highlights .v02-detail-content').outerWidth();
    var plus = (w - w_content)*70/100;
    var left = -plus/2;
    $('.v02-bg-wave').css({'width' : w_content + plus , 'left' : left});
}

function setPosTextOptions()
{
    $('#v02-noc-section-alumni .v02-options .v02-item-option').each(function(){
        setCenterElement($(this).find('.v02-title'));
    });
}

function setCenterElement(element)
{
    element.css({'position' : 'relative'});
    var w = element.outerWidth();
    var h = element.outerHeight();
    element.css({'position' : '' , 'width' : w , 'height' : h});
}

function setWidthCompany()
{
    var max = 0;
    $('.v02-company .v02-list .v02-item').each(function(){
        var w = $(this).width();
        if(max < w)
        {
            max = w;
        }
    });
    $('.v02-company .v02-list .v02-item').css({'width' : max});
    var w_wrapper_company = $('.v02-company').width();
    var total = 0;
    while(w_wrapper_company > total)
    {
        total += (max + 15);
    }
    $('.v02-company .v02-list').css({'width' : total - max});
}

function setBannerNoc()
{
    var left = $('#v02-noc .v02-banner-left');
    var right = $('#v02-noc .v02-banner-right');
    var w_content = $('#v02-noc .v02-content').width();
    var w_window = $(window).width();
    var size_banner = (w_window - w_content)/2;
    left.css({'width' : size_banner});
    right.css({'width' : size_banner});
}

$('.v02-filter-tag .v02-tag').click(function(){
    deactive(this);
});

function deactive(item)
{
    if(!$(item).hasClass('unactive'))
    {
        $(item).addClass('unactive');
        $(item).css({ 'background' : 'none' , border: '2px solid #cccccc' , 'color' : '#cccccc' });
        $(item).find('.deactive').css({'opacity' : 1});
    }
    else
    {
        $(item).css({ 'background' : '' , border: '' , 'color' : '' });
        $(item).find('.deactive').css({'opacity' : ''});
        $(item).removeClass('unactive');
    }
}