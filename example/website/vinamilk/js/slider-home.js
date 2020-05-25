$(document).ready(function(){

    //////  Slider product

    var count = 0;
    var maxProductShow = 5;

    setHeightSlide();

    var wWin = $(window).width();

    /*var owlSld_news = $('.slide-news');
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
    });*/

    var owlSldHome = $('.sliderHome');
    var bannerVideo;
    var bannerVideoPlayID;
    var bannerVideoCurrentTime = 0;
    var firstTime = true;
    var trackVideoID = setInterval(checkVideoLoadComplete, 100);

    function checkVideoLoadComplete(){
        if($("#banner-video").length != 0)
        {
            if(!isNaN($("#banner-video").get(0).duration)){
                clearInterval(trackVideoID);
                initOwlCarousel();
            }
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
            singleItem: true/*,
             afterAction: function(current) {
             console.log("owlCarousel after action trigger");
             console.log(current);
             //current.find('#video').get(0).play();
             }*/
        });


        owlSldHome.on('change.owl.carousel', function(e) {

            var id = e.page.index;
            var total = e.page.count;

            if(id == total - 1){
                /*
                console.log("enter video");
                //bannerVideo = $("#banner-video");
                setTimeout(function(){
                    bannerVideo = document.getElementById("banner-video");
                    bannerVideo.pause();
                    bannerVideo.play();
                }, 500);
                */
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

        var owlDot = $('.sliderHome .owl-dots');
        var iSlider = $('.thumbSlider .sld-item');

        owlDot.on('click', '.owl-dot', function(e){
            //console.log("clickkkk");
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

    }



    $('.sliderHome .owl-item').each(function(e){
        $(this).attr('val','phase-' + e);
    })


    var owlDot = $('.sliderHome .owl-dots');
    var iSlider = $('.thumbSlider .sld-item');
    var wrap_iSlider = $('.thumbSlider .sld-item-wrapper');
    var w_iSlider = 114;

    $(window).on("resize", function (){
        //resizeWidthiSlider();
        widthiSlider();
    });

    function widthiSlider(){
        iSlider.each(function(){
            var item = $(this);
            var childItem = item.length;
            item.css({
                'width': childItem * w_iSlider
            });
        });
    }

    function resizeWidthiSlider(){
        if(wWin < 641) {
            w_iSlider = 75;
        }else {
            w_iSlider = 114;
        }
    }

    var length_iSlider = iSlider.length;
    wrap_iSlider.css({
        'width': length_iSlider * w_iSlider
    })

    owlDot.click(function(){
        console.log("clickkkk");
    })



    currentProductActive();
    function currentProductActive(){
        iSlider.on('click', function(){
            var item = $(this);
            item.parent().find('.active').removeClass('active');
            item.addClass('active');
            var id = item.index();
            /*indexSlide = id;*/
            count = id;
            thumbActive(id);
        });
    }

    function thumbActive(_id){
        var index_item = _id;

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
        //count = indexSlide ;
        //console.log(count+' next');
        checkNB("next");
        thumbActive(count);
        //console.log(count+' after next');
    });

    prevBtn.click(function(){
        //count = indexSlide ;
        //console.log(count+' back');
        checkNB("back");
        thumbActive(count);
        //console.log(count+' after back');
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

            var currentTrans = iSlider.parent('.sld-item-wrapper').css('transform').split(/[()]/)[1];
            var currentPosX;
            //console.log(currentTrans);
            if(currentTrans == undefined){
                currentPosX = 0
            }else{
                currentPosX = currentTrans.split(',')[4];
            }

            var maxPosID = iSlider.length - maxProductShow


            if(count > iSlider.length - maxProductShow && currentPosX <= -(canWidth*maxPosID)){
                //console.log("khong chay dc nua dau!!!!");
                return;
            }
            if(count > iSlider.length - maxProductShow && currentPosX > -(canWidth*maxPosID)){
                iSlider.parent('.sld-item-wrapper').css({
                    //'transform' : 'translateX(' + -wPrevActive + 'px)'
                    'transform' : 'translateX(' + -(canWidth*maxPosID) + 'px)'
                });
            }else{
                iSlider.parent('.sld-item-wrapper').css({
                    //'transform' : 'translateX(' + -wPrevActive + 'px)'
                    'transform' : 'translateX(' + -(canWidth*count) + 'px)'
                });
            }

            /*
            if(count > iSlider.length - maxProductShow ){
                console.log("khong chay dc nua dau!!!!");
            }else{
                iSlider.parent('.sld-item-wrapper').css({
                    //'transform' : 'translateX(' + -wPrevActive + 'px)'
                    'transform' : 'translateX(' + -(canWidth*count) + 'px)'
                });
            }
            */

        }else {
            iSlider.parent('.sld-item-wrapper').css({
                //'transform' : 'translateX(' + wPrevActive + 'px)'
                'transform' : 'translateX(' + (canWidth*count) + 'px)'
            });
        }

        thumbActive(iSlider);

    }


    $(window).on("resize",function(){
        maxProductShow = Math.floor(5*($(window).width()/1200));
        count = 0;
        addActive();
    }).resize();


    //////  END Slider product


});
