/**
 * Created by minhvu on 9/1/2015.
 */
$(document).ready(function(){


    /*about*/
    $('.listAbout .aboutImgText').click(function(){
        $('.aboutImgText').removeClass('actived');
        var to = $(this).attr('to');
        to = '.'+to;
        $(this).addClass('actived');
        $('.aboutDetailWrapper .about').removeClass('actived');
        $('.aboutDetailWrapper').find(to).addClass('actived');
    });
    $('.year').click(function(){
        if(!($(this).hasClass('actived')))
        {
            $('.year').removeClass('actived');
            $(this).addClass('actived');
        }
    });

    $('.googleMap .DropDownContent .contentMain').click(function(){
           var height = 0;
           $('.dropDown .list li').each(function(){
               height += 45;
           });
            if( !$('.DropDownContent').hasClass('actived'))
            {
                $('.dropDown').css({'padding-top' : '1px' , 'height' : height+'px' , 'border' : '1px solid #262a67' , 'border-top' : '0px solid white'});
                $('.DropDownContent').addClass('actived');
                $('.DropDownContent').css({'border-bottom' : '0px solid white'});
            }
            else
            {
                $('.dropDown').removeAttr('style');
                $('.googleMap .DropDownContent').removeClass('actived');
                $('.DropDownContent').removeAttr('style');
            }
    });
    $('html').click(function(e){
        var container = $('.googleMap .DropDownContent');
        var childContainer = $('.DropDownContent .list li');
        if((!container.is(e.target)  && container.has(e.target).length === 0))
        {
            $('.dropDown').removeAttr('style');
            $('.googleMap .DropDownContent').removeClass('actived');
            $('.DropDownContent').removeAttr('style');
        }
    });

    $('.milestones li.year').click(function(){
        var year = $(this).attr('year');
        $('.table').removeClass('actived');
        $('.table.'+year).addClass('actived');
    });

    var slide_ul_responsive = 0;
    var countLi = 0;
    function checkPositionSlideYear()
    {
        slide_ul_responsive = 0;
        var counting = 0;
        countLi = 0 ;
        var responsiveTimeLineYearWidth = 0;
        /*responsiveTimeLineYear*/
        $('.responsiveTimeLineYear .year').each(function(){
            countLi++;
            responsiveTimeLineYearWidth += $(this).outerWidth() + 15;
        });
        $('.responsiveTimeLineYear').css({'width' : responsiveTimeLineYearWidth});
        $('.TableDetail .table').each(function(){
            counting++;
            if($(this).hasClass('actived'))
            {
                var counting_milestones = 0;
                $('.milestones .year').each(function(){
                    counting_milestones++;
                    console.log(counting_milestones);
                    console.log(counting);
                    if(counting == counting_milestones)
                    {
                        $('.milestones .year').removeClass('actived');
                        $(this).addClass('actived');

                        $('.wrapResponsiveTimeLineYear .responsiveTimeLineYear').css({
                            'left' : slide_ul_responsive
                        });

                        return false;
                    }
                });
                return false;
            }
            slide_ul_responsive -= /*105*/($('.responsiveTimeLineYear .year').outerWidth() + 15);
            console.log(-1*($('.responsiveTimeLineYear .year').outerWidth() + 15)*(countLi - 1)+'slide');
        });
    }
    checkPositionSlideYear();
    $(window).resize(function(){
        checkPositionSlideYear();
    });
    $('.responsiveArrow').click(function(){
        var trend = $(this).attr('trend');
        if(trend == "left" && slide_ul_responsive != 0)
        {
            slide_ul_responsive -= /*-105*/ -1*($('.responsiveTimeLineYear .year').outerWidth() + 15);
            $('.wrapResponsiveTimeLineYear .responsiveTimeLineYear').css({
                'left' : slide_ul_responsive+'px'
            });
            $('.TableDetail .table').each(function(){
                if($(this).hasClass('actived'))
                {
                    $('.table').removeClass('actived');
                    $(this).prev().addClass('actived');
                    return false;
                }
            });
        }
        else if(trend == "right" && slide_ul_responsive != /*-105*/-1*($('.responsiveTimeLineYear .year').outerWidth() + 15)*(countLi - 1))
        {
            slide_ul_responsive += /*-105*/ -1*($('.responsiveTimeLineYear .year').outerWidth()+15);
            $('.wrapResponsiveTimeLineYear .responsiveTimeLineYear').css({
                'left' : slide_ul_responsive+'px'
            });
            $('.TableDetail .table').each(function(){
                if($(this).hasClass('actived'))
                {
                    $('.table').removeClass('actived');
                    $(this).next().addClass('actived');
                    return false;
                }
            });
        }
    });

    slideYoro('#slideYoro' , '.teamContent' , 'unactived' , 156 , 236 , 1110 ,'.square' , 3 , 9);

    function slideYoro(parent , child , unspecial , unactived_width , actived_width , max_width , square , total_actived , space)
    {
        var width_content = 0;
        var limit_range = total_actived*(actived_width);
        var resize_width  = $(window).width();
        //console.log('resize'+resize_width);
        var grandFather = $(parent).parent();
        $(grandFather).css({'overflow' : 'hidden'});
        var string = parent + ' ' + child;
        var left = unactived_width + space*2; // mac dinh ban dau left gia tri bang width cua 1 phan tu chua kich hoat dau tien
        var count = 0;

        $(string).each(function() {
            if (!$(this).hasClass(unspecial)) {
                count++;
            }
        });

        /*find height Slide*/
        var max_height_child = 0;
        $(child).each(function(){
            if(max_height_child < $(this).outerHeight())
                max_height_child = $(this).outerHeight();
        });
        var grandfather = $(parent).parent();
        $(parent).css({
            'height' : max_height_child
        });
        $(grandfather).css({
            'height': max_height_child + 58 // padding-bottom : 40px;
        });
        /**/
        function left_slide()
        {
            var total = 0;
            var count_unspecial = 0;
            $(string).each(function(){
                if(!$(this).hasClass(unspecial))
                {
                    return false;
                }
                total = total - (unactived_width + space*2); // khoang cach se bang do dai cua moi phan tu chua kich hoat truoc phan tu da kich hoat dau tien
            });
            return total;
        }
        if(resize_width < limit_range)
        {
            $(string).each(function(){
                if(!$(this).hasClass(unspecial) && count > 1)
                {
                    $(this).addClass(unspecial);
                    $(this).next().next().addClass(unspecial);
                    //left = Math.round(left_slide()/2);
                    return false;
                }
                else if ( count <= 1)
                {
                     return false;
                }
            });
        }
        else if(resize_width > limit_range)
        {
            $(string).each(function(){
                if(count < total_actived)
                {
                    if(!$(this).hasClass(unspecial))
                    {
                        $(this).prev().removeClass(unspecial);
                        $(this).next().removeClass(unspecial);
                        //left = Math.round(left_slide()/2);
                        return false;
                    }
                }
            });
        }

        $(string).each(function() {
            if ($(this).hasClass(unspecial)) {
                $(this).css({'width' : unactived_width+'px'});
                if(square != null && unactived_width != null)
                {
                    $(this).find(square).css({'width' : unactived_width+'px' , 'height' : unactived_width+'px'});
                    $(this).find(square).find('img').css({'width' : unactived_width+'px'});
                }
            }
            else
            {
                if(actived_width == null)
                    actived_width = 230;
                $(this).css({'width' : actived_width+'px'})
                if(square != null)
                {
                    $(this).find(square).css({'width' : actived_width+'px' , 'height' : actived_width+'px'});
                    $(this).find(square).find('img').css({'width' : actived_width+'px'});
                }
            }
            width_content += actived_width;
        });
        left += Math.round(left_slide());


        if(resize_width < max_width + 5 && resize_width > limit_range)
        {
            left = Math.round((resize_width - max_width  - space)/2) + left;
        }
        else if(resize_width < limit_range)
        {
            limit_range = (unactived_width+space*2)*2 + actived_width+space*2; // mac dinh ban dau la 3 phan tu da kich hoat , khi con 1 phan tu kich hoat , thay doi gia tri gioi han chieu dai la 2 phan tu chua kich hoat + 1 phan tu da kich hoat + khoang cach
            left = Math.round((resize_width -  limit_range - space )/2) + left;
        }
        $(parent).css({'width' : +width_content+'px' , 'position' : 'absolute' , 'left' : left+'px'});

    }

    $(window).resize(function(){
        slideYoro('#slideYoro' , '.teamContent' , 'unactived' , 156 , 236 , 1110 ,'.square' , 3 , 9);
    });

    $('.arrowLeft.arrow').click(function(){
        slideLeft();
    });
    $('.arrowRight.arrow').click(function(){
        slideRight();
    });

    function slideLeft()
    {
        var count = 0;
        if($('#slideYoro .teamContent:first-child').hasClass('unactived'))
        {
            $('#slideYoro .teamContent').each(function(){
                if(!$(this).hasClass('unactived'))
                {
                    $('#slideYoro .teamContent').each(function(){
                        if(!$(this).hasClass('unactived'))
                        {
                            count++;
                        }
                    });
                    if(count > 1)
                    {
                        $(this).next().next().addClass('unactived');
                        $(this).prev().removeClass('unactived');
                    }
                    else if(count == 1)
                    {
                        $(this).addClass('unactived');
                        $(this).prev().removeClass('unactived');
                    }
                    slideYoro('#slideYoro' , '.teamContent' , 'unactived' , 156 , 236 , 1110 ,'.square' , 3 , 9);
                    return false;
                }
            });
        }
    }
    function slideRight()
    {
        var count = 0;
        if($('#slideYoro .teamContent:last-child').hasClass('unactived')) {
            $('#slideYoro .teamContent').each(function () {
                if (!$(this).hasClass('unactived')) {
                    $('#slideYoro .teamContent').each(function () {
                        if (!$(this).hasClass('unactived')) {
                            count++;
                        }
                    });
                    if (count > 1) {
                        $(this).addClass('unactived');
                        $(this).next().next().next().removeClass('unactived');
                    }
                    else if (count == 1)
                    {
                        $(this).addClass('unactived');
                        $(this).next().removeClass('unactived');
                    }
                    slideYoro('#slideYoro', '.teamContent', 'unactived', 156, 236, 1110, '.square', 3, 9);
                    return false;
                }
            });
        }
    }

    /*overview*/

    var owl = $("#contentSlide");

    owl.owlCarousel({
        pagination:false,
        items : 4,
        rewindNav: false
        //10 items above 1000px browser width
       /* itemsDesktop : [1146,3], //5 items between 1000px and 901px
        itemsDesktopSmall : [900,3], // betweem 900px and 601px
        itemsTablet: [600,2], //2 items between 600 and 0
        itemsMobile : false // itemsMobile disabled - inherit from itemsTablet option*/
    });

    // Custom Navigation Events
    autoSlideOfOverViewGallery();
    function autoSlideOfOverViewGallery()
    {
        var delay = 4000;
        var width_slide_child = 0;
        if($('.m_overview .slideShow').length != 0 )
        {
            setInterval(autoSlide,delay);
        }

        function autoSlide()
        {
            var slideContent = $('#contentSlide');
            var slide_child = $('#contentSlide .owl-item');
            width_slide_child += slide_child.outerWidth();
            if(width_slide_child > slideContent.height())
            {
                owl.trigger('owl.next');
            }
            $('#contentSlide .slide').each(function(){
                if($(this).hasClass('actived'))
                {
                    var nextElement = $(this).parent().next().children();
                    if(nextElement.length != 0)
                    {
                        $(this).removeClass('actived');
                        nextElement.addClass('actived');

                        if(nextElement.hasClass('vid-btn') && !nextElement.hasClass('playing'))
                        {
                            stopPlayVid();
                            var vid = nextElement.attr('data-vid');
                            nextElement.addClass('playing');
                            $("#mainImage .image[data-vid='"+vid+"']").addClass('playing');
                            $("#mainImage .image[data-vid='"+vid+"']").find('iframe').attr('id','vidPlaying');
                        }
                        else
                        {
                            stopPlayVid();
                        }
                        $('.mainImage .image').each(function(){
                            if($(this).hasClass('actived'))
                            {
                                $(this).removeClass('actived');
                                var green = $(this);
                                TweenMax.to(green,0.5 ,{'z-index' : 0,'opacity':0 ,ease: Linear.easeInOut});
                                $(this).next().addClass('actived');
                                var next_green = $(this).next() ;
                                TweenMax.to(next_green,0.5 ,{'z-index' : 99,'opacity':1 ,ease: Linear.easeInOut});
                                return false;
                            }
                        });

                        return false;
                    }
                }
            });
        }
    }


    $(".btn_next.right").click(function(){
        owl.trigger('owl.next');
        var timeLine = new TimelineLite();
        $('.contentSlide .slide').each(function(){

            if($(this).hasClass('actived'))
            {
                if(!$('.contentSlide .owl-item:last-child .slide').hasClass('actived'))
                {
                    $(this).removeClass('actived');
                    $(this).parent().next().children().addClass('actived');
                    var nextElement = $(this).parent().next().children();
                    if(nextElement.hasClass('vid-btn') && !nextElement.hasClass('playing'))
                    {
                        stopPlayVid();
                        var vid = nextElement.attr('data-vid');
                        nextElement.addClass('playing');
                        $("#mainImage .image[data-vid='"+vid+"']").addClass('playing');
                        $("#mainImage .image[data-vid='"+vid+"']").find('iframe').attr('id','vidPlaying');
                    }
                    else
                    {
                        stopPlayVid();
                    }

                    $('.mainImage .image').each(function(){
                        if($(this).hasClass('actived'))
                        {
                            $(this).removeClass('actived');
                            var green = $(this);
                            TweenMax.to(green,0.5 ,{'z-index' : 0,'opacity':0 ,ease: Linear.easeInOut});
                            $(this).next().addClass('actived');
                            var next_green = $(this).next() ;
                            TweenMax.to(next_green,0.5 ,{'z-index' : 99,'opacity':1 ,ease: Linear.easeInOut});
                            return false;
                        }
                    });
                }
                else
                {
                    /*$(this).removeClass('actived');
                    $('.contentSlide .owl-item:first-child .slide').addClass('actived');
                    $('.mainImage .image').each(function(){
                        if($(this).hasClass('actived'))
                        {
                            $(this).removeClass('actived');
                            var green = $(this);
                            TweenMax.to(green,0.5 ,{'z-index' : 0,'opacity':0 ,ease: Linear.easeInOut});
                            $('.mainImage .image:first-child').addClass('actived');
                            var next_green = $('.mainImage .image:first-child') ;
                            TweenMax.to(next_green,0.5 ,{'z-index' : 99,'opacity':1 ,ease: Linear.easeInOut});
                            return false;
                        }
                    });*/
                }
                return false;
            }

        });
    })
    $(".btn_next.left").click(function(){
        owl.trigger('owl.prev');
        var timeLine = new TimelineLite();
        $('.contentSlide .slide').each(function(){

            if($(this).hasClass('actived'))
            {
                if(!$('.contentSlide .owl-item:first-child .slide').hasClass('actived'))
                {
                    $(this).removeClass('actived');
                    $(this).parent().prev().children().addClass('actived');
                    var prevElement = $(this).parent().prev().children();

                    if(prevElement.hasClass('vid-btn') && !prevElement.hasClass('playing'))
                    {
                        stopPlayVid();
                        var vid = prevElement.attr('data-vid');
                        prevElement.addClass('playing');
                        $("#mainImage .image[data-vid='"+vid+"']").addClass('playing');
                        $("#mainImage .image[data-vid='"+vid+"']").find('iframe').attr('id','vidPlaying');
                    }
                    else
                    {
                        stopPlayVid();
                    }

                    $('.mainImage .image').each(function(){
                        if($(this).hasClass('actived'))
                        {
                            $(this).removeClass('actived');
                            var green = $(this);
                            TweenMax.to(green,0.5 ,{'z-index' : 0,'opacity':0 ,ease: Linear.easeInOut});
                            $(this).prev().addClass('actived');
                            var next_green = $(this).prev() ;
                            TweenMax.to(next_green,0.5 ,{'z-index' : 99,'opacity':1 ,ease: Linear.easeInOut});
                            return false;
                        }
                    });
                }
                else
                {
                    /*$(this).removeClass('actived');
                    $('.contentSlide .owl-item:last-child .slide').addClass('actived');
                    $('.mainImage .image').each(function(){
                        if($(this).hasClass('actived'))
                        {
                            $(this).removeClass('actived');
                            var green = $(this);
                            TweenMax.to(green,0.5 ,{'z-index' : 0,'opacity':0 ,ease: Linear.easeInOut});
                            $('.mainImage .image:last-child').addClass('actived');
                            var next_green = $('.mainImage .image:last-child') ;
                            TweenMax.to(next_green,0.5 ,{'z-index' : 99,'opacity':1 ,ease: Linear.easeInOut});
                            return false;
                        }
                    });*/
                }
                return false;
            }

        });
    });

    function stopPlayVid()
    {
        var vid_playing = $('#mainImage .image.playing');
        var src = vid_playing.find('iframe').attr('src');
        if(vid_playing.length != 0)
        {
            vid_playing.find('iframe').attr('src' , src )
            $('#mainImage .image.playing').find('iframe').removeAttr('id');
            $('.slide.vid-btn.playing').removeClass('playing');
            $('#mainImage .image.playing').removeClass('playing');
        }
    }
    $('.contentSlide .slide').click(function(){
        if(!$(this).hasClass('actived'))
        {
            if($(this).hasClass('vid-btn') && !$(this).hasClass('playing'))
            {
                stopPlayVid();
                var vid = $(this).attr('data-vid');
                $(this).addClass('playing');
                $("#mainImage .image[data-vid='"+vid+"']").addClass('playing');
                $("#mainImage .image[data-vid='"+vid+"']").find('iframe').attr('id','vidPlaying');
            }
            else
            {
                stopPlayVid();
            }

            $('.contentSlide .slide').removeClass('actived');
            $(this).addClass('actived');
            var timeLine = new TimelineLite();
            var slide = "."+$(this).attr('slide');
            var green_slide = $('.mainImage').find(slide);
            var green_actived = $('.mainImage .image.actived');
            TweenMax.to(green_actived,0.5 ,{'z-index' : 0,'opacity':0 ,ease: Quint.easeInOut});
            $('.mainImage .image.actived').removeClass('actived');
            TweenMax.to(green_slide, 0.5, {'z-index' : 99,'opacity': 1 ,ease : Linear.easeInOut});
            $('.mainImage').find(slide).addClass('actived');
        }
    });

    /**/

    $('.listSocial .social').click(function(){

        var social = $(this).attr('social');
        var div_detail_social = $('.content_detail_social').find('.'+social);
        $('.content_detail_social .detail_social').removeClass('actived');
        if(!$(div_detail_social).hasClass('actived'))
        {
            $(div_detail_social).addClass('actived');
        }
    });

    /*facilities*/
    calcHeightDetailResort();
    function calcHeightDetailResort()
    {
        var max_height_detail = 0;
        var max_width_wrapAllDetailResort = 0;
        var left = false;
        $('.wrapAllDetailResort .detail').each(function(){

            if($(this).hasClass('actived') && left == false)
            {
                var heightDetail = $('.detail.actived').outerHeight(true);    ///Nh�
                $('.wrapAllDetailResort').css({
                    'margin-left' : (-1)*max_width_wrapAllDetailResort
                });

                ///Nh�

                $('.contentAccommodation .contentDetail').css({
                    'height' : heightDetail
                });

                ///END Nh�



                left = true;
            }
            max_width_wrapAllDetailResort+=$('.contentDetail').width() ;
            $(this).css({
                'width' : $('.contentDetail').width()
            });
        });
        $('.wrapAllDetailResort').css({
            'width' : max_width_wrapAllDetailResort
        });
    }
    $(window).resize(function(){
        calcHeightDetailResort();
    });
    $('.listResort .resort').click(function(){
        if(!$(this).hasClass('actived'))
        {
            $('.listResort .resort').removeClass('actived');
            $('.wrapAllDetailResort .detail').removeClass('actived');
            $(this).addClass('actived');
            var detail_this = '.'+$(this).attr('detail');
            $('.wrapAllDetailResort').find(detail_this).addClass('actived');
            calcHeightDetailResort();
        }
    });
    /**/

    /*golf course*/
    $('.wrapAllDrop .wrapDropDownHole').click(function(){
        var height = 0;
        var duration  = 150;
        $('.wrapAllDrop').css({
            'overflow' : 'visible'
        });
        $('.wrapDropDownHole').css({
            'border-bottom' : '0px solid white'
        });
        $('.valueHole').css({
           'border-bottom' : '1px solid #eca920'
        });
        /*$(' .dropDownHole .contentDropDownHole .detailDropDownHole').each(function(){
            height += 45;
        });*/
        $(' .wrapDropDown').css({
            'height' : 312
        });
        $(' .dropDownHole').css({
            'height' : 300
        });
        $(' .dropDownHole .contentDropDownHole .detailDropDownHole').each(function(){
            $(this).animate({
                opacity : 1
            },duration);
        });
        $(' .dropDownHole .scrollDownCustom').css({
            'opacity' : 1
        });

        $('.wrapAllDrop').addClass('actived');
    });
    $('.dropDownHole .contentDropDownHole .detailDropDownHole').click(function(){
        var hole = $(this).attr('Hole');
        var par = $(this).attr('Par');
        var title = $(this).html();
        $('.valueHole').attr('Hole' , hole);
        $('.valueHole').attr('Par' , par);
        //$('.detailHole .valueHole').html('Hole '+hole+' / '+'Par' + par);
        $('.detailHole .valueHole').html(title);
        $('.wrapAllDrop').css({
            'overflow' : 'hidden'
        });
        $('.wrapDropDownHole').css({
            'border-bottom' : '1px solid #262A67'
        });
        $('.valueHole').css({
            'border-bottom' : '1px solid white'
        });
        $(' .wrapDropDown').css({
            'height' : 0
        });
        $(' .dropDownHole .contentDropDownHole .detailDropDownHole').css({
            'opacity' : 0
        });
        $(' .dropDownHole .scrollDownCustom').css({
            'opacity' : 0
        });
        $('.wrapAllDrop').removeClass('actived');
        $('.wrapperSlideDetailHole .detailHole').each(function(){
            if($(this).attr('Hole') == hole  && $(this).attr('Par') == par)
            {
                $('.wrapperSlideDetailHole .detailHole').removeClass('actived');
                $(this).addClass('actived');
                slideWidthWrapSlide();
            }
        });
    });
    $('html').click(function(e){
        var container = $('.wrapAllDrop');
        if((!container.is(e.target)  && container.has(e.target).length === 0))
        {
            if($('.wrapAllDrop').hasClass('actived'))
            {
                $('.wrapAllDrop').css({
                    'overflow' : 'hidden'
                });
                $('.wrapDropDownHole').css({
                    'border-bottom' : '1px solid #262A67'
                });
                $('.valueHole').css({
                    'border-bottom' : '1px solid white'
                });
                $(' .wrapDropDown').css({
                    'height' : 0
                });
                $(' .dropDownHole .contentDropDownHole .detailDropDownHole').css({
                    'opacity' : 0
                });
                $(' .dropDownHole .scrollDownCustom').css({
                    'opacity' : 0
                });
                $('.wrapAllDrop').removeClass('actived')
            }
        }
    });
    function scrollBar () {
        var scroll = 0;
        var scroller = $('.detailHole.actived .btn_scroll') ;
        var scrollbar = $('.detailHole.actived .scrollDownCustom') ;
        var holder = $('.detailHole.actived .wrapDropDown') ;
        var bar = $(".detailHole.actived .scrollDownCustom");
        var y0 = scroller.offset().top - scrollbar.offset().top;
        var h0 = bar.height();
        var per = y0/(h0 - scroller.height());
        var content_ScreenOffsetY = holder.offset().top;
        var y1 = ($('.contentDropDownHole').height() - holder.height())*per
        scroll = content_ScreenOffsetY - y1;
        return scroll;
    };
    var position ;
    var old_position ;
    $('.btn_scroll').draggable({
        axis : 'y',
        containment : '.scrollDownCustom',
        start : function()
        {

        },
        drag : function()
        {
            position = $('.btn_scroll').offset();
            $('.detailHole.actived .contentDropDownHole').offset({"top": scrollBar()})
            old_position = position;
        }
    });

    $('.thumb_img_hole .thumb').click(function(){
        /*var src = $(this).find('img').attr('src');*/
        var src = $(this).find('img').attr('data-image');
        $('.detailHole.actived .imgDetailBig').find('img').attr('src',src);
    });

    slideWidthWrapSlide();
    function slideWidthWrapSlide()
    {
        var max_width_wrapAllDetailResort = 0;
        var height_wrap = 0;
        var left = false;
        $('.wrapperSlideDetailHole .detailHole').each(function(){

            if($(this).hasClass('actived') && left == false)
            {
                $('.wrapperSlideDetailHole').css({
                    'margin-left' : (-1)*max_width_wrapAllDetailResort
                });
                left = true;
                height_wrap = $(this).outerHeight();
            }
            $(this).css({
                'width' : $('.wrapHole').width()
            });
            max_width_wrapAllDetailResort+= $('.wrapHole').width() ;
        });
        $('.wrapperSlideDetailHole').css({
            'width' : max_width_wrapAllDetailResort
            /*'height' : height_wrap*/
        });
    }
    $('.contentDetailHole .btn_prev').click(function(){
        $('.wrapperSlideDetailHole .detailHole').each(function(){
            if($(this).hasClass('actived') && !$('.detailHole:first-child').hasClass('actived'))
            {
                $(this).removeClass('actived');
                $(this).prev().addClass('actived');
                var title = $(this).prev().attr("data-title");
                var hole = $(this).prev().attr('Hole');
                var par = $(this).prev().attr('Par');
                slideWidthWrapSlide();
                $('.valueHole').attr('Hole' , hole);
                $('.valueHole').attr('Par' , par);
                $('.detailHole .valueHole').html(title);
                return false;
            }
        });
    });
    $('.contentDetailHole .btn_next').click(function(){
        $('.wrapperSlideDetailHole .detailHole').each(function(){
            if($(this).hasClass('actived') && !$('.detailHole:last-child').hasClass('actived'))
            {
                $(this).removeClass('actived');
                $(this).next().addClass('actived');
                var title = $(this).next().attr("data-title");
                var hole = $(this).next().attr('Hole');
                var par = $(this).next().attr('Par');
                slideWidthWrapSlide();
                $('.valueHole').attr('Hole' , hole);
                $('.valueHole').attr('Par' , par);
                $('.detailHole .valueHole').html(title);
                return false;
            }
        });
    });
    slidePromotion()
    function slidePromotion()
    {
        var width_slide = 0;
        var count_item = 0;
        $('.SlidePromotion .promotion').each(function(){
            width_slide+= $(this).outerWidth();
            count_item++;
        });
        if(count_item < 4)
        {
            $('.wrapPromotion').css({
                'width' : width_slide
            });
        }
        $('.SlidePromotion').css({
            'width' : width_slide
        });
    }
    var slide_promotion = 0;
    $('.contentPromotion .btn_prev').click(function(){
        if(slide_promotion !=  0)
        {
            $('.SlidePromotion .promotion').each(function(){
                slide_promotion+= ($(this).outerWidth());
                $('.SlidePromotion').css({
                    'margin-left' : slide_promotion
                });
                return false;
            });
        }
    });
    $('.contentPromotion .btn_next').click(function(){
        if(slide_promotion != (-1)*($('.SlidePromotion').outerWidth() - $('.wrapPromotion').outerWidth()))
        {
            $('.SlidePromotion .promotion').each(function(){
                slide_promotion-= ($(this).outerWidth());
                $('.SlidePromotion').css({
                    'margin-left' : slide_promotion
                });
                return false;
            });
        }
    });

    $(window).resize(function(){
        calcHeightDetailResort();
        slideWidthWrapSlide();
    });

    /**/
    /*events_tournaments*/
    /**/

    $('.dropDownTypeFillter .value').click(function(){
        var heightDrop = 0;
        if(!$(this).hasClass('actived'))
        {
            var parent = $(this).parent();
            $(parent).find('.dropdown .item').each(function(){
                heightDrop += $(this).outerHeight();
            });
            $('.dropDownTypeFillter .dropdown').css({
                'height' : heightDrop
            });
            $('.dropDownTypeFillter .value').addClass('actived')
        }else
        {
            $(this).find('.dropdown').css({
                'height' : 0
            });
            $('.dropDownTypeFillter .value').removeClass('actived')
        }
    });

    $('.dropDownMonth .value').click(function(){
        var heightDrop = 0;
        if(!$(this).hasClass('actived'))
        {
            var parent = $(this).parent();
            $(parent).find('.dropdown .item').each(function(){
                heightDrop += $(this).outerHeight();
            });
            $('.dropDownMonth .dropdown').css({
                'height' : heightDrop
            });
            $('.dropDownMonth .value').addClass('actived')
        }else
        {
            $(this).find('.dropdown').css({
                'height' : 0
            });
            $('.dropDownMonth .value').removeClass('actived')
        }
    });

    $('html').click(function(e){
        var container = $('.dropDownTypeFillter');
        if((!container.is(e.target)  && container.has(e.target).length === 0))
        {
            $('.dropDownTypeFillter .dropdown').css({
                'height' : 0
            });
            $('.dropDownTypeFillter .value').removeClass('actived')
        }
    });

    $('html').click(function(e){
        var container = $('.dropDownMonth');
        if((!container.is(e.target)  && container.has(e.target).length === 0))
        {
            $('.dropDownMonth .dropdown').css({
                'height' : 0
            });
            $('.dropDownMonth .value').removeClass('actived')
        }
    });

    $('.row-corporate .seemore').click(function(){
        var parent = $(this).parent();
        var heightDetail = $(parent).find('.detail').outerHeight();
        $(parent).find('.wrapDetail').css({
            'height' : heightDetail
        })
        $(this).remove();
    });

    /**/
    /**/
    /*offers*/
    //$('.dropdownPart .value').click(function(){
    $('.dropdownPart').click(function(){    ///Nh�
        //var parent = $(this).parent();
        var parent = $(this);      ///Nh�
        var heightDropDown = 0;
        if(!$(this).hasClass('actived'))
        {
            $('html').find('.dropDowns').css({
                'height' : 0,
                'z-index': 0
            });
            $(parent).find('.dropDowns .item').each(function(){
                heightDropDown += $(this).outerHeight();
            });
            $(parent).find('.dropDowns').css({
                'height' : heightDropDown,
                'z-index': 99
            });
            $(parent).find('.arrowDropDown').css({
                'transform': 'rotate(180deg)',
                '-o-transform': 'rotate(180deg)',
                '-moz-transform': 'rotate(180deg)',
                '-webkit-transform': 'rotate(180deg)'
            });
            $(parent).addClass('actived');
        }else
        {
            $(parent).removeClass('actived');
            $(parent).find('.dropDowns').css({
                'height' : 0,
                'z-index': 0
            });
            $(parent).find('.arrowDropDown').css({
                'transform': 'rotate(0deg)',
                '-o-transform': 'rotate(0deg)',
                '-moz-transform': 'rotate(0deg)',
                '-webkit-transform': 'rotate(0deg)'
            });

        }
    });

    $('html').click(function(e){
        var container = $('.dropdownPart');
        if((!container.is(e.target)  && container.has(e.target).length === 0))
        {
            $('.dropdownPart .dropDowns').css({
                'height' : 0,
                'z-index': 0
            });
            $('.dropdownPart').find('.arrowDropDown').css({
                'transform': 'rotate(0deg)',
                '-o-transform': 'rotate(0deg)',
                '-moz-transform': 'rotate(0deg)',
                '-webkit-transform': 'rotate(0deg)'
            });
            $('.dropdownPart').removeClass('actived');
        }
    });

    $('.dropdownPart .dropDowns .item').click(function(e){
        e.stopPropagation() /// Nh�
        var text  = $(this).text();
        var value = $(this).attr('val');
        var dropDownPart = $(this).parent().parent();
        $(dropDownPart).find('span.value').html(text);
        $(dropDownPart).find('span.value').attr('val' , value);
        $(dropDownPart).find('.dropDowns').css({
            'height' : 0,
            'z-index': 0
        });

        //Nh�
        $(dropDownPart).find('.arrowDropDown').css({
            'transform': 'rotate(0deg)',
            '-o-transform': 'rotate(0deg)',
            '-moz-transform': 'rotate(0deg)',
            '-webkit-transform': 'rotate(0deg)'
        });
        //END Nh�

        $(dropDownPart).removeClass('actived');
    });

    /**/
    /*offer detail*/
    /*
    * transform: ;
     -o-transform: ;
     -moz-transform: ;
     -webkit-transform: ;
    * */
    function IsEmail(email) {
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(email);
    }
    $('.btn_book, .unlink').click(function(){
        $('.popUp').css({'display' : 'block'});
    });
    $('.btn_book').click(function(){
        $('.smPopup').css({'display' : 'none'});
        $('.popUp').css({'display' : 'block'});
    });
    $('.btn-hres').click(function(){
        var data_id = $(this).attr('data-id');
        $('.smPopup .idHidden').val(data_id);
        $('.smPopup').css({'display' : 'block'});
        $('.popUp').css({'display' : 'none'});
    });

    $('.popUp, .smPopup').click(function(e){
        var container = $('.bookBox');
        if((!container.is(e.target)  && container.has(e.target).length === 0))
        {
            $('.popUp, .smPopup').css({'display' : 'none'});
        }
    });

    $('.popUp').click(function(e){
        var container = $('.dropdownPart');
        if((!container.is(e.target)  && container.has(e.target).length === 0))
        {
            $('.dropdownPart .dropDowns').css({
                'height' : 0,
                'z-index': 0
            });
            $('.dropdownPart').removeClass('actived');
        }
    });

    $('.btn_book_popUp').click(function(){
        //var property_offername = $('.offerName .options.property .value').attr('val');

        var date_days = $('.wrapDate .days.dropdownContent .value').attr('data-value');
        var date_months = $('.wrapDate .months.dropdownContent .value').attr('data-value');
        var date_years = $('.wrapDate .years.dropdownContent .value').attr('data-value');

        var holes = $('.wrapDate .holes.dropdownContent .value').attr('data-value');
        var numberOfGolfer = $('.wrapDate .numberOfGolfer.dropdownContent .value').attr('data-value');

        var hours = $('.wrapDate.selectTeeTime .hours.dropdownContent .value').attr('data-value');
        var minute = $('.wrapDate.selectTeeTime .minute.dropdownContent .value').attr('data-value');
        var dayNight = $('.wrapDate.selectTeeTime .dayNight.dropdownContent .value').attr('data-value');

        var title_guest_information = $('.guestInformation .options.titleDropDown .value').attr('val');

        var first_name = $('.guestInformation .fillNameGuest .firstName ').val();
        var last_name = $('.guestInformation .fillNameGuest .lastName').val();

        var day_birthday = $('.guestInformation .selectBirthday .days .value').attr('data-value');
        var month_birthday = $('.guestInformation .selectBirthday .months .value').attr('data-value');
        var year_birthday = $('.guestInformation .selectBirthday .years .value').attr('data-value');

        var email_guest = $('.guestInformation .email.selectEmail').val() ;
        var address_guest = $('.guestInformation .selectAddress').val() ;
        var city_guest = $('.guestInformation .selectCity').val();
        var residence_country_guest = $('.guestInformation .residenceCountry .value').attr('val');

        var phone = $('.bookBox .phone').val();

        var check_required = true;
        //property name
        /*if(property_offername == '')
        {
            $('.offerName .options.property.dropdownPart').css({
                'border' : '1px solid red'
            })
            $('.offerName .options.property.dropdownPart .dropDowns').css({
                'border' : '1px solid red',
                'border-top' : '0px'
            })
            $('.offerName .options.property.dropdownPart .value').css({
                'color' : 'red'
            });
            check_required = false;
        }
        else
        {
            $('.offerName .options.property.dropdownPart').css({
                'border' : '1px solid #262a67'
            })
            $('.offerName .options.property.dropdownPart .dropDowns').css({
                'border' : '1px solid #262a67',
                'border-top' : '0px'
            })
            $('.offerName .options.property.dropdownPart .value').css({
                'color' : '#262a67'
            });
        }*/
        // mobile
        if(phone != '')
        {
            if(phone.length <8 || phone.length > 11)
            {
                $('.bookBox .phone').css({
                    'border' : '1px solid red'
                });
                //console.log(last_name);
                check_required = false;
            }
            else
            {
                $('.bookBox .phone').css({
                    'border' : '1px solid #262a67'
                });
            }
        }
        else
        {
            check_required = false;
            $('.bookBox .phone').css({
                'border' : '1px solid red'
            });
        }
        //date offer
        if(date_days == '' || date_months == '' || date_years == '')
        {
            $('.wrapDate .choicedBox[data-box = "selectDate"]').css({
                'background-color' : 'red',
                'color' : 'white'
            });
            check_required = false;
        }
        else
        {
            checkingButtonColorWrapDate("selectDate");
        }
        //holes and number golfer
        /*if(holes == '' || numberOfGolfer == '')
        {
            $('.wrapDate .choicedBox[data-box = "selectHolesNumberOlfer"]').css({
                'background-color' : 'red',
                'color' : 'white'
            });
            check_required = false;
        }
        else
        {
            checkingButtonColorWrapDate("selectHolesNumberOlfer");
        }*/
        //tee time
        /*if(hours == '' || minute == '' || dayNight == '')
        {
            $('.wrapDate .choicedBox[data-box = "selectTeeTime"]').css({
                'background-color' : 'red',
                'color' : 'white'
            });
            check_required = false;
        }
        else
        {
            checkingButtonColorWrapDate("selectTeeTime");
        }*/
        //guest information
        //title
        if(title_guest_information == '')
        {
            $('.guestInformation .options.titleDropDown.dropdownPart').css({
                'border' : '1px solid red'
            })
            $('.guestInformation .options.titleDropDown.dropdownPart .dropDowns').css({
                'border' : '1px solid red',
                'border-top' : '0px'
            })
            $('.guestInformation .options.titleDropDown.dropdownPart .value').css({
                'color' : 'red'
            });
            check_required = false;
        }
        else
        {
            $('.guestInformation .options.titleDropDown.dropdownPart').css({
                'border' : '1px solid #262a67'
            })
            $('.guestInformation .options.titleDropDown.dropdownPart .dropDowns').css({
                'border' : '1px solid #262a67',
                'border-top' : '0px'
            })
            $('.guestInformation .options.titleDropDown.dropdownPart .value').css({
                'color' : '#262a67'
            });
        }
        //name guest
        if(first_name == '' || last_name == '')
        {
            //console.log(last_name);
            if(first_name == '')
            {
                $('.guestInformation .fillNameGuest .firstName ').css({
                    'border' : '1px solid red'
                });
            }
            else
            {
                $('.guestInformation .fillNameGuest .firstName ').css({
                    'border' : '1px solid #262a67'
                });
            }
            if(last_name == '')
            {
                $('.guestInformation .fillNameGuest .lastName ').css({
                    'border' : '1px solid red'
                });
            }
            else
            {
                $('.guestInformation .fillNameGuest .lastName ').css({
                    'border' : '1px solid #262a67'
                });
            }
            check_required = false;
        }
        else
        {
            $('.guestInformation .fillNameGuest .firstName ').css({
                'border' : '1px solid #262a67'
            });
            $('.guestInformation .fillNameGuest .lastName ').css({
                'border' : '1px solid #262a67'
            });
        }
        //birthday
        if(day_birthday == '' || month_birthday == '' || year_birthday == '')
        {
            $('.guestInformation .wrapDate .choicedBox[data-box="selectBirthday"]').css({
                'background-color' : 'red',
                'color' : 'white'
            });
            check_required = false;
        }
        else
        {
            checkingButtonColorWrapDate("selectBirthday");
        }
        //email
        if(email_guest == '' || IsEmail(email_guest) == false)
        {
            $('.guestInformation .wrapDate .choicedBox[data-box="selectEmail"]').css({
                'background-color' : 'red',
                'color' : 'white'
            });
            check_required = false;
        }
        else if(IsEmail(email_guest) == true)
        {
            checkingButtonColorWrapDate("selectEmail");
        }
        //address
        if(address_guest =='')
        {
            $('.guestInformation .wrapDate .choicedBox[data-box="selectAddress"]').css({
                'background-color' : 'red',
                'color' : 'white'
            });
            check_required = false;
        }
        else
        {
            checkingButtonColorWrapDate("selectAddress");
        }
        //city
        if(city_guest =='')
        {
            $('.guestInformation .wrapDate .choicedBox[data-box="selectCity"]').css({
                'background-color' : 'red',
                'color' : 'white'
            });
            check_required = false;
        }
        else
        {
            checkingButtonColorWrapDate("selectCity");
        }
        //residence country
        if(residence_country_guest == '')
        {
            $('.guestInformation .residenceCountry.dropdownPart').css({
                'border' : '1px solid red'
            })
            $('.guestInformation .residenceCountry.dropdownPart .dropDowns').css({
                'border' : '1px solid red',
                'border-top' : '0px'
            })
            $('.guestInformation .residenceCountry.dropdownPart .value').css({
                'color' : 'red'
            });
            check_required = false;
        }
        else
        {
            $('.guestInformation .residenceCountry.dropdownPart').css({
                'border' : '1px solid #262a67'
            })
            $('.guestInformation .residenceCountry.dropdownPart .dropDowns').css({
                'border' : '1px solid #262a67',
                'border-top' : '0px'
            })
            $('.guestInformation .residenceCountry.dropdownPart .value').css({
                'color' : '#262a67'
            });
        }


        if($('.requiredDropDown .value').attr('val') == '' && $('.requiredDropDown').length != 0)
        {
            check_required = false;
            $('.requiredDropDown').css({'border' : '1px solid red'});
            $('.requiredDropDown .value').css({'color' : 'red'});
            $('.requiredDropDown .dropDowns').css({
                'border' : '1px solid red',
                'border-top' : '0px'
            })
        }
        else
        {
            $('.requiredDropDown').css({'border' : '1px solid #262a67'});
            $('.requiredDropDown .value').css({'color' : '#262a67'});
            $('.requiredDropDown .dropDowns').css({
                'border' : '1px solid #262a67',
                'border-top' : '0px'
            })
        }

        if($('.requiredInput').val() == '' && $('.requiredInput').length != 0)
        {
            check_required = false;
            $('.requiredInput').css({
                'border' : '1px solid red'
            });
        }
        else
        {
            $('.requiredInput').css({
                'border' : '1px solid #262a67'
            });
        }

        console.log(check_required);
        if(check_required == true)
        {
            //call back
            var function_actived = $('.btn_book_popUp').attr('callback');
            if(function_actived)
            {
                var fn = eval(function_actived);
                fn();
            }
            $('.popUp_box_thank').css({'display' : 'block',
                'opacity' : 1});
            //$('.popUp_box_thank.infoContact').css({'opacity' : 0 , 'display' : 'none'});
            $('.popUp_box_thank .resultBox').css({
                'opacity' : 1});
        }

        function testcallback()
        {
            alert('done');
        }

        function checkingButtonColorWrapDate(content)
        {
            if($('.wrapDate .choicedBox[data-box = '+content+']').hasClass('clicked'))
            {
                $('.wrapDate .choicedBox[data-box = '+content+']').css({
                    'background-color' : '#eca920',
                    'color' : '#262a67'
                });
            }
            else
            {
                $('.wrapDate .choicedBox[data-box = '+content+']').css({
                    'background-color' : '#262a67',
                    'color' : '#eca920'
                });
            }
        }

    });
    $('.resultBox .cancel').click(function(){
        $('.popUp_box_thank').css({
            'display' : 'none',
            'opacity' : 0
        })
    });
    $('.bookBox .cancel').click(function(){
        $('.popUp, .smPopup').css({
            'display' : 'none'
        })
    });

    $('.wrapDate .dropdownContent .value').click(function(){
        var parent = $(this).parent();
        var height = 0 ;
        var dropdown = $(parent).find('.dropdownValue div');
        $('.dropdownContent .dropdownValue').css({
            'height' : 0,
            'z-index': 0
        });
        $('.dropdownValue').removeClass('actived');
        $(dropdown).each(function(){
            height += $(this).outerHeight();
        });
        $(parent).find('.dropdownValue').css({
            'height' : height,
            'z-index' : 99
        });
        $(parent).find('.arrowDropDown').css({
            'transform': 'rotate(180deg)',
            '-o-transform': 'rotate(180deg)',
            '-moz-transform': 'rotate(180deg)',
            '-webkit-transform': 'rotate(180deg)'
        });
        $(parent).addClass('actived');
    });

    $('.wrapDate .dropdownContent .dropdownValue div').click(function(){
        var grandfather = $(this).parent().parent();
        var father = $(this).parent();
        var value = $(this).attr('data-value');
        $(grandfather).find('span.value').html(value);
        $(grandfather).find('span.value').attr('data-value',value);
        $(father).css({
            'height' : 0,
            'z-index': 0
        });
        $(grandfather).find('.arrowDropDown').css({
            'transform': 'rotate(0deg)',
            '-o-transform': 'rotate(0deg)',
            '-moz-transform': 'rotate(0deg)',
            '-webkit-transform': 'rotate(0deg)'
        });
        $(father).removeClass('actived');
    });

    $('.popUp').click(function(e){
        var container = $('.dropdownContent');
        if((!container.is(e.target)  && container.has(e.target).length === 0))
        {
            $('.dropdownContent .dropdownValue').css({
                'height' : 0,
                'z-index': 0
            });
            $('.dropdownContent').find('.arrowDropDown').css({
                'transform': 'rotate(0deg)',
                '-o-transform': 'rotate(0deg)',
                '-moz-transform': 'rotate(0deg)',
                '-webkit-transform': 'rotate(0deg)'
            });
            $('.dropdownValue').removeClass('actived');
        }
    });

    $('.wrapDate .choicedBox').click(function(){
        $('.choicedBox').css({
            'background-color': '#262a67',
            'color' : '#eca920'
        });
        $('.choicedBox').removeClass('clicked');
        var box = '.'+$(this).attr('data-box');
        $(this).addClass('clicked');
        $(this).css({
            'background-color': '#eca920',
            'color' : '#262a67'
        });
        $('.box').css({'display' : 'none'});
        $(box).css({
            'display' : 'block'
        });
    });
    //changeTitleBook();
    function changeTitleBook()
    {
        $('.offerName .title_book').html($('head title').html());
    }

    /**/
    /*wrapAll resort*/
    widthWrapResort();
    function widthWrapResort()
    {
        var count_item = 0;
        var width_wrap_resort = 0;
        var height = 0;
        var max = 0;
        var width_list_resort ;
        $('.listResort .wrapperAllResort .resort').each(function(){
            width_wrap_resort += $(this).outerWidth() + 10;
            count_item++;
            if($(this).outerHeight() > max)
                max =$(this).outerHeight();
            height = max;
        });
        if(count_item  < 3 )
            width_list_resort = $('.listResort .wrapperAllResort .resort').outerWidth()*count_item;
        else
            width_list_resort = 'auto'
        $('.listResort .wrapperAllResort').css({
            'width' : width_wrap_resort,
            'height' : height
        });
        $('.listResort').css({
            'height' : height,
            'width'  : width_list_resort
        });
    }
    $('.listResort .btn.btn_prev').click(function(){
        $('.listResort .wrapperAllResort .resort').each(function(){
            if($(this).hasClass('actived') && !$('.resort:first-child').hasClass('actived'))
            {
                $(this).removeClass('actived');
                $('.wrapAllDetailResort .detail').removeClass('actived');
                $(this).prev().addClass('actived');
                var detail_this = '.'+$(this).prev().attr('detail');
                $('.wrapAllDetailResort').find(detail_this).addClass('actived');
                slideListResort()
                calcHeightDetailResort();
                return false;
            }
        });
    });
    $('.listResort .btn.btn_next').click(function(){
        $('.listResort .wrapperAllResort .resort').each(function(){

            if($(this).hasClass('actived') && !$('.resort:last-child').hasClass('actived'))
            {
                $(this).removeClass('actived');
                $('.wrapAllDetailResort .detail').removeClass('actived');
                $(this).next().addClass('actived');
                var detail_this = '.'+$(this).next().attr('detail');
                $('.wrapAllDetailResort').find(detail_this).addClass('actived');
                slideListResort();
                calcHeightDetailResort();
                return false;
            }
        });
    });
    function slideListResort()
    {
        var left_resort = 0;
        $('.listResort .wrapperAllResort .resort').each(function(){
            if($(this).hasClass('actived'))
            {
                $('.listResort .wrapperAllResort').css({
                    'left' : left_resort
                });
            }
            //left_resort -= ($(this).outerWidth() + 5) ;
            left_resort -= ($(this).outerWidth(true)) ; // Nh�
        });
    }
    /*$('.wrapAllDetailResort .thumbList .thumb').click(function(){*/
    $('.popUpthumbImg').click(function(){
        var link_img = $(this).attr('data-img');
        $('.popUpResortImgReview .imga').attr('src' , link_img);
        $('.popUpResortImgReview').css({'display' : 'block'});
        return false;
    });
    $('.popUpResortImgReview').click(function(e){
        var container = $('.popUpResortImgReview .imgPopUp');
        if((!container.is(e.target)  && container.has(e.target).length === 0))
        {
            $('.popUpResortImgReview').css({'display': 'none'});
        }
    });
    //calcHeightDetailResort();
    $(window).resize(function(){
        widthWrapResort();
        setTopArrowSlideColumn();
    });
    /**/

    function setTopArrowSlideColumn()
    {
        var height_arrow = 41;
        var height_contain = $('#ImgBig .imgDetail').outerHeight();
        var btn_arrow = $('#ImgBig .btn.btn_big').css({
            'top' : Math.round(height_contain/2) - height_arrow
        });
    }
    setTopArrowSlideColumn();

});

function IsEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}

function closePopUp()
{
    $('.popUp').css({
        'display': 'none'
    })
    $('.smPopup').css({
        'display': 'none'
    })
}
function resetForm(formID){
    $("#" + formID).each (function() { this.reset(); });
    return false;
}

function setHeightlstPackages()
{
    var lstPackages = $('.lst-packages');
    if(lstPackages.length != 0)
    {
        var max_height = 0;
        var packages = lstPackages.find('.item-packages');
        packages.each(function(){
            console.log($(this).height());
            if($(this).find('.ctn-item-packages').height() > max_height)
            {
                max_height = $(this).find('.ctn-item-packages').height();
            }
        });
        packages.each(function(){
            $(this).find('.ctn-item-packages').css({
                'height' : max_height
            });
        });
    }
}
setTimeout(setHeightlstPackages , 1000);
function isInt(value) {
    return !isNaN(value) && (function(x) { return (x | 0) === x; })(parseFloat(value))
}