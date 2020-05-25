/**
 * Created by Jame Moriarty on 3/2/2016.
 */
$(document).ready(function(){
    var owlSld_banner1 = $('.content_banner1');
    owlSld_banner1.owlCarousel({
        loop:true,
        autoHeight: true,
        items:1,
        lazyLoad:true,
        center:true,
        currentItem: 3
    });
    $('.ico-next').click(function() {
        owlSld_banner1.trigger('next.owl.carousel');
    })

    $('.ico-pre').click(function() {
        owlSld_banner1.trigger('prev.owl.carousel');
    })
    $(window).load(function(){
        init();
    });
    $(window).resize(function(){
        init();
    });
});
function init()
{
    hoverMenuLineEffect();
    setBannerNoc();
    setMarginTopWrapper();
    setWidthHeightdropDownMenu()
}
function hoverMenuLineEffect()
{
    var line = $('#v02-noc-pro .v02-nav-header .v02-line-animate');
    $('#v02-noc-pro .v02-nav-header .v02-menu-header .v02-menu-item').mouseover(function(){
        var w = 0;
        var w_original = 0;
        var left = 0;
        var id = $(this).index();
        var count = 0;
        $('#v02-noc-pro .v02-nav-header .v02-menu-header .v02-menu-item').each(function(){
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
            left += w + count -2 ;
        });
        var subMenu = $(this).find('.v02-menu-child');
        line.css({'width' : w_original , 'opacity' : 1 , 'left' : left});
        subMenu.find('.v02-li-menu-child').css({'width' : max_width_sub_menu });
        subMenu.css({'height' : height_sub_menu , 'bottom' : -height_sub_menu , 'width' : max_width_sub_menu, 'opacity' : 1 });
    });
    $('#v02-noc-pro .v02-nav-header .v02-menu-header .v02-menu-item').mouseleave(function(){
        line.css({'width' : '' , 'opacity' : '' , 'left' : ''});
        var subMenu = $(this).find('.v02-menu-child');
        subMenu.css({'height' : 0 , 'bottom' : '' , 'opacity' : '' });
    });
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
function setMarginTopWrapper()
{
    position_top = $('#v02-noc .v02-banner-home').height()/3;
    $('#v02-noc .v02-wrapper-noc').css({'margin-top' : -($('#v02-noc .v02-banner-home').height()/3)});
    $('#v02-noc .v02-owl-dots').css({'bottom' : position_top});
    if($(window).width() < 1023)
    {
        $('#v02-noc .v02-wrapper-noc').css({'margin-top' : ''});
        $('#v02-noc .v02-owl-dots').css({'bottom' : ''});
    }
}
function setWidthHeightdropDownMenu()
{
    $('.v02-nav-header .v02-menu-header .v02-menu-item').each(function() {
        dropDownSubMenu($(this));
    });
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
//window.onload=function() {
//
//    // get tab container
//    var container = document.getElementById("tabContainer");
//    var tabcon = document.getElementById("tabscontent");
//    //alert(tabcon.childNodes.item(1));
//    // set current tab
//    var navitem = document.getElementById("tabHeader_1");
//
//    //store which tab we are on
//    var ident = navitem.id.split("_")[1];
//    //alert(ident);
//    navitem.parentNode.setAttribute("data-current",ident);
//    //set current tab with class of activetabheader
//    navitem.setAttribute("class","liTab tabActiveHeader fn15 clWhite");
//
//    //hide two tab contents we don't need
//    var pages = tabcon.getElementsByClassName("tabpage");
//    for (var i = 1; i < pages.length; i++) {
//        pages.item(i).style.opacity="0";
//        pages.item(i).style.transition="opacity linear 0.1s";
//    };
//
//    //this adds click event to tabs
//    var tabs = container.getElementsByTagName("li");
//    for (var i = 0; i < tabs.length; i++) {
//        tabs[i].onclick=displayPage;
//    }
//    //var heightTab = $('.tabpage').height();
//    //$('#tabscontent').css('height',heightTab);
//    $('.tabpage').each(function(){
//        var heightTab = $('.tabpage').height();
//        $('#tabscontent').css('height',heightTab);
//    });
//}
//
//// on click of one of tabs
//function displayPage() {
//    var current = this.parentNode.getAttribute("data-current");
//    //remove class of activetabheader and hide old contents
//    document.getElementById("tabHeader_" + current).setAttribute("class","liTab fn15 clWhite");
//    document.getElementById("tabpage_" + current).style.opacity="0";
//    document.getElementById("tabpage_" + current).style.transition="opacity linear 0.1s";
//    var ident = this.id.split("_")[1];
//    //add class of activetabheader to new active tab and show contents
//    this.setAttribute("class","tabActiveHeader fn15 clWhite");
//    document.getElementById("tabpage_" + ident).style.opacity="1";
//    document.getElementById("tabpage_" + ident).style.transition="opacity ease-out 0.2s 0.1s";
//    this.parentNode.setAttribute("data-current",ident);
//}