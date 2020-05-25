$(document).ready(function(){

    var owlSld_banner3 = $('.slider-banner3');
    owlSld_banner3.owlCarousel({
        items:1,
        lazyLoad:true,
        center:true
    });

    $('#banner3-nav-next').click(function() {
        owlSld_banner3.trigger('next.owl.carousel');
    })

    $('#banner3-nav-back').click(function() {
        owlSld_banner3.trigger('prev.owl.carousel');
    })

    var owlSld_doctor = $('.slider-doctor');
    owlSld_doctor.owlCarousel({
        //loop:true,
        singleItem: true,
        items:1,
        lazyLoad:true,
        center:true
    });

    var owlSld_doctor_1 = $('#optimum #main .about-doctor .wrapper_banner .slider-doctor');
    owlSld_doctor_1.owlCarousel({
        loop:true,
        items:1,
        lazyLoad:true,
        center:true
    });

    $('#doctor-nav-next').click(function() {
        owlSld_doctor.trigger('next.owl.carousel');
    })

    $('#doctor-nav-back').click(function() {
        owlSld_doctor.trigger('prev.owl.carousel');
    })

    if($('.owl-item').hasClass('center')){
        var title = $('.owl-item').find('.swiper-slide').attr('title');
        //console.log(title);
        //$('.owl-item').parent().parent().parent().parent().parent().parent().parent().find('.banner5').find('.item').addClass('active');
    }

    var owlSld_infoGold= $('.slide-infoGold');
    owlSld_infoGold.owlCarousel({
        items:1,
        autoHeight: true,
        lazyLoad:true,
        center:true,
        currentItem: 4
    });

    owlSld_infoGold.on('changed.owl.carousel', function(el){
        var current = el.item.index;
        $('.info-pagination .item').each(function(){
            var thisVal = $(this).index();
            if (current == thisVal) {
                $(this).parents('.info-pagination').find('.item').removeClass('active');
                $(this).addClass('active');
            }
        });
    });

    $('.info-pagination .item').click(function(){
        var item = $(this);
        item.parent().find('.active').removeClass('active');
        item.addClass('active');
    });

    $('.info-pagination .item:nth-child(1)').click(function() {
        owlSld_infoGold.trigger('to.owl.carousel',[0]);
    })
    $('.info-pagination .item:nth-child(2)').click(function() {
        owlSld_infoGold.trigger('to.owl.carousel',[1]);
    })
    $('.info-pagination .item:nth-child(3)').click(function() {
        owlSld_infoGold.trigger('to.owl.carousel',[2]);
    })
    $('.info-pagination .item:nth-child(4)').click(function() {
        owlSld_infoGold.trigger('to.owl.carousel',[3]);
    });

    //$('.banner1 .wrapper_banner .banner1_right .home-button-banner1').click(function(){
    //    $('.modal-alpha').addClass('active_support');
    //    $('#main').addClass('active_events');
    //    return false;
    //});
    //
    //$('.dielac-growplus-v02 #main .banner1 .btn-white').click(function(){
    //    $('.modal-alpha').addClass('active_support');
    //    $('#main').addClass('active_events');
    //    return false;
    //});
    //
    //$('.row-back').click(function(){
    //    $('.modal-alpha').removeClass('active_support');
    //    $('#main').removeClass('active_events');
    //});



    var $animation_elements = $('.animation-element');
    var $window = $(window);

    function check_if_in_view() {
        var window_height = $window.height();
        var window_top_position = $window.scrollTop();
        var window_bottom_position = (window_top_position + window_height);

        $.each($animation_elements, function() {
            var $element = $(this);
            var element_height = $element.outerHeight();
            var element_top_position = $element.offset().top;
            var element_bottom_position = (element_top_position + element_height);

            //check to see if this current container is within viewport
            if ((element_bottom_position >= window_top_position) &&
                (element_top_position <= window_bottom_position)) {
                $element.addClass('in-view');
            } else {
                $element.removeClass('in-view');
            }
        });
    }

    $window.on('scroll resize', check_if_in_view);
    $window.trigger('scroll');



    var $scroll_elements = $('.banner_scroll');
    var $window = $(window);
    function check_if_in_scroll() {
        var window_height = $window.height();
        var window_top_position = $window.scrollTop();
        var window_bottom_position = (window_top_position + window_height);

        $.each($scroll_elements, function() {
            var $element = $(this);
            var element_height = $element.outerHeight();
            var element_top_position = $element.offset().top;
            var element_bottom_position = (element_top_position + element_height);
            //check to see if this current container is within viewport
            if ((element_bottom_position >= window_top_position) &&
                (element_top_position <= window_bottom_position)) {
                var percent = element_height/100;
                if((window_top_position-element_top_position)*2/percent > 0 && (window_top_position-element_top_position)*2/percent < 120){
                    var wScr = $(window).width();
                    //if(wScr <= 768){
                    //    $('.scroll-element').css('top',(((window_top_position-element_top_position)*2/percent)+5)+'%');
                    //}
                    //else{
                    //    $('.scroll-element').css('top',(window_top_position-element_top_position)*2/percent+'%');
                    //}
                    $('.scroll-element').css('top',(window_top_position-element_top_position)*2/percent+'%');
                    if((window_top_position-element_top_position)*2/percent > 100){
                        $('.scroll-element').find('.canMilk').css('background-position-x','0%');
                    }
                    else{
                        $('.scroll-element').find('.canMilk').css('background-position-x',(window_top_position-element_top_position)*1.7/percent+'%');
                    }
                }
                //if((window_top_position-element_top_position)*2/percent > 112 && (window_top_position-element_top_position)*2/percent < 118 || window_top_position>1871){
                //    $('.scroll-element').css('z-index','3');
                //}
                //else{
                //    $('.scroll-element').css('z-index','2');
                //}
            }
        });
    }


    $window.on('scroll resize', check_if_in_scroll);
    $window.trigger('scroll');

    //$('.default').parent().addClass('active center');
    //$('.current').parent().removeClass('active center');
    //$('.default').parent().parent().css({'transition': '0.25s','width' : '4720px','transform' : 'translate3d(-3540px, 0px, 0px)'});
});
$(window).load(function(){
    var wWin = $(window).width();
    if(wWin > 840){
        var itemHolder = $('.bounceInDown');
        itemHolder.each(function(id){
            var item = $(this);
            item.attr("id", 'navM'+id);
            $('#navM'+id).css('animation' ,'bounceInLeft '+(id+2)/6+'s');
        });
    }
    if(wWin < 1025){
        $('.banner2_left').removeClass('animation-left');
        $('.banner2_right').removeClass('animation-right');
        $('.col-6').removeClass('animation-element');
        $('.col-6').removeClass('animation-left');
        $('.col-6').removeClass('animation-right');
        $('.col-6').removeClass('in-view');
        //$('.default').parent().parent().css({'transition': '0.25s','width' : '4720px','transform' : 'translate3d(-3069px, 0px, 0px)'});
    }
})
setHeightmilestones();
function setHeightmilestones()
{
    var max = 0;
    $('.step-banner5 .item').each(function(){
        var height_p = $(this).find('.step1 p').height();
        if(max < height_p)
        {
            max = height_p;
        }
    });
    $('.step-banner5 .item .step1 p').css({'height' : max});
}