/**
 * Created by minhvu on 9/10/2015.
 */
/*NOTE*/
/*  - PLEASE USE WITH JQUERY PLUGIN
    - PLEASE INSERT TWEENMAX
    - PLEASE SET OPTIONS SETTING
    - THIS PLUGIN WORK WITH TWEENMAX
    - IF YOU USE WIDTH FULL SCREEN , BECAREFUL BECAUSE WIDTH PARENT DIV DIFFERENT WIDTH SCREEN . NEED CHECK TO CALC WHEN MEDIA SCREEN
    - SEARCH "CUSTOM" TO SEE CODE NEW APPEND IF ERROR NOT FOUND SOMETHING
    <div id/class parent>
        <div id/class imageBig>
             <div class contentImageBigChild>
                 div class imageBigChild
                 div class description
             </div>
             <div class contentImageBigChild>
                 div class imageBigChild
                 div class description
             </div>
             <div class contentImageBigChild>
                 div class imageBigChild
                 div class description
             </div>
             ...
            <div id/class pargination>
                span.actived > actived slide
                span > unactived slide
            </div>
        </div>
        <div id/class slideImage class content_slideImg>
            div  item
            div  item
        </div>
        or
        <div id/class content_slideImg>
            <!--div otherContain-->
             <div id/class slideImage class>
                 div  item
                 div  item
             </div>
            <!--div otherContain-->
         </div>
    </div>
*/
/*NOTE*/
(function ($){
    $.fn.slideShowColumn = function(setting)
    {
        var defaults = {
            'imageBig'              : '',
            'slideImage'            : '',
            'contentSlideImg'       : '',
            'description'           : '',
            'imageBigChild'         : '',
            'contentImageBigChild'  : '',
            'widthContent'          : 'auto',
            'widthColumn'           : 0,
            'heightContent'         : 0,
            'totalItemInOneSlideSmall' : 0,
            'floatColumn'           : 'right',
            'resizeMobile'          : 0,
            'pargination'           : '',
            'childPargination'      : ''
        };
        var parentContent = this;
        var options = $.extend({} , defaults, setting);
        var slide_left_small = 0;
        var slide_top_small  = 0;
        var default_height = 810;
        /*check resize */
        var window_resize_old = $(window).width();
        var heightContent = $(window).height(); // khi nao muon fix cung thay doi height cua content thi cu thay doi gia tri heightcontent
        console.log(window_resize_old);
        /**/
        slideShow(options);
        /*resize*/
        $(window).resize(function(){
            var window_resize_new = $(window).width();
            var heightContent_new = $(window).height(); // khi nao muon fix cung thay doi height cua content thi cu thay doi gia tri heightcontent
            console.log(heightContent);
            if( (window_resize_new != window_resize_old)/* || ( heightContent_new != heightContent)*/)
            {
                /*alert(window_resize_old+' old / new '+ window_resize_new);*/
                slideShow(options);
                window_resize_old = window_resize_new;
                //heightContent = heightContent_new;
            }
        });
        /**/
        function slideShow(a)
        {
            /*var heightContent = a.heightContent;*/ // check khung hinh
            //heightContent = $(window).height(); // check khung hinh auto resize
            if(heightContent > 810)
            {
                heightContent = 810;
            }
            else if(heightContent < 600)
            {
                heightContent = 600
            }
            $(parentContent).css({
                'width' : a.widthContent ,
                'overflow' : 'hidden' ,
                'height' : /*a.heightContent*/ heightContent ,
                'margin' : '0 auto'
            });
            var float_1 = a.floatColumn;
            var float_2 = a.floatColumn;
            var divChild = $(a.imageBig).find(a.contentImageBigChild);
            var description = $(divChild).find(a.description);
            var widthImageMain ;
            /*var heightDescription = $(description).outerHeight();*/
            var max = 0;
            $(a.description).each(function(){
                if($(this).outerHeight() > max)
                {
                    max = $(this).outerHeight();
                }
            });
            var heightDescription = max;
            //console.log(heightDescription+'height description');
            if($(parentContent).width() > a.resizeMobile)
            {

                $(parentContent).css({
                    'height' : heightContent
                });

                if(float_1 == 'left')
                {
                    float_1 = 'right';
                }
                else if(float_1 == 'right')
                {
                    float_1 = 'left';
                }
                else
                {
                    float_1 = 'left';
                }
                widthImageMain = $(parentContent).width() - a.widthColumn;
            }
            else
            {
                heightContent = default_height ;
                $(parentContent).css({
                    'height' : 'auto'
                });
                float_1 = 'none';
                float_2 = 'none';
                widthImageMain = $(parentContent).width();
            }
            /*make width height div content big img */
            $(a.imageBig).css({
                'height'    : /*a.heightContent*/ heightContent ,
                'width'     : widthImageMain ,
                'float'     : float_1 ,
                'overflow'  :   'hidden'
            });
            if($(a.imageBig).find('.wrapBig').length == 0)
                $(a.contentImageBigChild).wrapAll("<div class='wrapBig'></div>");
            function setWidthWrapBig()
            {
                var width_item = 0;
                $(a.contentImageBigChild).each(function(){
                    width_item += widthImageMain;
                });
                return width_item;
            }
            $('.wrapBig').css({

                'width'     : setWidthWrapBig(),
                'position'  : 'absolute',
                'height'    : /*a.heightContent*/ heightContent,
                'left'      : 0

            });
            /*resize mobile */

            function changeColumnWhenResizeAndSlideColumn()
            {
                var childSlde = $('.wrapSlide').children().children();
                var childSlde = $(childSlde).parent();
                var slide_range = 0;
                var total = 0;
                var inStock = 0;
                var out = 0; // neu muon khong slide het out >= a.totalItemInOneSlideSmall
                $(childSlde).each(function (){
                    total++;
                });
                //console.log(total);
                if($(parentContent).width() <= a.resizeMobile) {
                    console.log('result 1');
                    var checkingHaveChilSlide = false;
                    $(childSlde).each(function () {
                        if ($(this).hasClass('actived')) {
                            checkingHaveChilSlide = true;
                            return false;
                        }
                        slide_range += $(this).width();
                    });
                    if(!checkingHaveChilSlide)
                    {
                        slide_range = 0;
                    }
                    var timeLine = new TimelineLite();
                    var wrapSlide = $('.wrapSlide');
                    slide_left_small = (-1)*slide_range;
                    slide_top_small  = 0;
                    if($(parentContent).width() < $('.wrapSlide').width())
                        TweenMax.to(wrapSlide,0.5 ,{'top' : slide_top_small ,'left' : slide_left_small, ease: Linear.easeInOut}, 0);

                }
                else
                {
                    console.log('result 2');
                    var checkingHaveChilSlide = false;
                    $(childSlde).each(function () {
                        if ($(this).hasClass('actived')) {
                            out = total - inStock;
                            checkingHaveChilSlide = true;
                            return false;
                        }
                        inStock++;
                        slide_range += $(this).outerHeight();
                    });
                    if(!checkingHaveChilSlide)
                    {
                        slide_range = 0;
                    }
                    var timeLine = new TimelineLite();
                    var wrapSlide = $('.wrapSlide');
                    slide_top_small = (-1)*slide_range;
                    slide_left_small = 0;
                    if(/*a.heightContent*/ heightContent < $('.wrapSlide').height() /*&& out >= a.totalItemInOneSlideSmall*/)
                        TweenMax.to(wrapSlide,0.5 ,{'top' : (-1)*slide_range ,'left': slide_left_small , ease: Linear.easeInOut}, 0);
                }
                pargination();
            }

            /**/

            /*div content image Big slide*/
            $(divChild).addClass('slide');

            $(divChild).css({
                'display' : 'inline-block',
                'position' : 'relative',
                'width' : widthImageMain,
                'height' : /*a.heightContent*/ heightContent,
                'overflow' : 'hidden'
            });

            $(divChild).find(a.imageBigChild).css({
                'height'    : /*a.heightContent*/ heightContent - heightDescription, // let height auto image
                'overflow'  : 'hidden'
            });

            if($(parentContent).width() > a.resizeMobile)
            {
                $(divChild).find('img').css({
                    'min-height' : /*a.heightContent*/ heightContent - heightDescription,
                    'width'      : '100%'
                });
            }
            else
            {
                $(divChild).find('img').css({
                    'min-height' : /*a.heightContent*/ heightContent - heightDescription,
                    'width'      : 'auto'
                    /*'width'        : '100%'*/
                });
            }


            /*div content slide column*/
            if($(parentContent).find('.wrapSlide').length == 0)
                $(parentContent).find(a.slideImage).children().wrapAll("<div class='wrapSlide'></div>");
            var height_item = 0;
            var childSlde = $('.wrapSlide').children().children();
            var childSlde = $(childSlde).parent();
            $(childSlde).each(function(){
                height_item+= $(this).outerHeight();
            });

            if($(parentContent).width() > a.resizeMobile)
            {
                var heightTotalSlide = 160; // total padding to and left of arrow slide bottom
                while(heightContent > heightTotalSlide + 160)
                {
                    heightTotalSlide += childSlde.outerHeight();
                }
                /*console.log(heightTotalSlide);*/
                heightTotalSlide = heightTotalSlide - childSlde.outerHeight();
                $(childSlde).each(function(){
                    $(this).css({
                        'display': 'block'
                    });
                });
                $(parentContent).find('.wrapSlide').css({
                    'display'   : 'block',
                    'position'  : 'absolute',
                    'width'     : a.widthColumn,
                    'height'    : height_item,
                    'top'       : 0,
                    'left'      : 0
                });
                $(a.contentSlideImg).css({
                    'float'     : float_2,
                    'width'     : a.widthColumn,
                    'height'    : /*a.heightContent*/ heightContent,
                    'display'   : 'block',
                    'position'  : 'relative'
                });
                $(parentContent).find(a.slideImage).css({
                    'width'     : a.widthColumn,
                    'height'    : /*a.totalItemInOneSlideSmall*childSlde.outerHeight()*/ heightTotalSlide,
                    'overflow'  : 'hidden',
                    'position'  : 'relative'
                });
            }
            else
            {
                var width_item_slide = 0;
                var height_item_slide = 0;
                var width_slide       = 0;
                var padding_bottom = 20; //default
                $(childSlde).each(function(){
                    $(this).css({
                        'display': 'inline-block'
                    });
                    width_item_slide+= $(this).width();
                    if($(parentContent).width() > width_item_slide)
                    {
                        width_slide += $(this).width();
                    }
                    height_item_slide = $(this).height() + padding_bottom;
                });
                $(parentContent).find('.wrapSlide').css({
                    'display'   : 'block',
                    'position'  : 'absolute',
                    'width'     : width_item_slide,
                    'height'    : height_item_slide, // padding 20px;
                    'top'       : 0,
                    'left'      : 0
                });
                $(a.contentSlideImg).css({
                    'float'     : float_2,
                    'width'     : a.widthContent,
                    'height'    : 'auto',
                    'display'   : 'block',
                    'position'  : 'relative'
                });
                $(parentContent).find(a.slideImage).css({
                    'width'     : width_slide,
                    'height'    : height_item_slide + 20, // padding 20px;
                    'overflow'  : 'hidden',
                    'position'  : 'relative'
                });
            }

            changeColumnWhenResizeAndSlideColumn();
            /*slide*/
            var count = 0;
            var checkActived = false;
            var item = $(a.slideImage).children().children();
            $(a.contentImageBigChild).each(function(){
                $(a.contentImageBigChild).each(function(){
                    if($(this).hasClass('actived'))
                    {
                        checkActived = true;
                        return false;
                    }
                });
                if(checkActived == false)
                {
                    $(this).addClass('actived');
                    return false;
                }
            });
            /*add class slide small*/
            var divChildColumn = $(a.slideImage).children().children();
            $(divChildColumn).each(function(){
                count++;
                var id = 'slide_m_'+count;
                if(!$(this).hasClass('slide_small'))
                {
                    $(this).addClass(id);
                    $(this).addClass('slide_small');
                    $(this).attr('slide_big' , id);
                }
            });
            count = 0;
            /*add class slide big*/
            slideAnimate();
            function slideAnimate()
            {
                $(a.contentImageBigChild).each(function(){
                    count++;

                    var id = 'slide_m_'+count;
                    var with_item_big_image = $(this).width();
                    var timeLine = new TimelineLite();
                    if(!$(this).hasClass('slide_big'))
                    {
                        $(this).addClass(id);
                        $(this).addClass('slide_big');
                        $(this).attr('slide_small',id);
                    }
                    if($(this).hasClass('actived'))
                    {
                        var find_actived = 0;
                        $(a.contentImageBigChild).each(function(){
                            if($(this).hasClass('actived'))
                            {
                                return false;
                            }
                            find_actived++;
                        });
                        find_actived = find_actived*(-1);
                        var wrapSlide = $('.wrapBig');
                        TweenMax.to(wrapSlide,0.5 ,{'left' : find_actived*with_item_big_image, ease: Linear.easeInOut}, 0);
                        /*$('.wrapBig').css({
                            'left' : find_actived*with_item_big_image
                        });*/

                        $(a.slideImage).find('.'+ $(this).attr('slide_small')).addClass('actived');
                    }
                });
            }
            /*click item in slide column*/
            $(item).click(function(){
                var slide = $(this).attr('slide_big');
                $(a.contentImageBigChild).removeClass('actived');
                $(item).removeClass('actived');
                $(a.imageBig).find('.'+slide).addClass('actived');
                $(this).addClass('actived');
                changeColumnWhenResizeAndSlideColumn();
                slideAnimate();
            });
            /**/

            /*click to slide*/
            $.fn.slideNext = function(){
                var item = $(a.slideImage).children().children();
                if(!$(a.contentImageBigChild+':last-child').hasClass('actived')) {
                    $(a.contentImageBigChild).each(function () {
                        if ($(this).hasClass('actived')) {
                            $(this).removeClass('actived');
                            $(this).next().addClass('actived');
                            $(item).each(function () {
                                if ($(this).hasClass('actived')) {
                                    $(this).removeClass('actived');
                                    $(this).next().removeClass('actived');
                                }
                            });
                            return false;
                        }
                    });
                    slideAnimate();
                    changeColumnWhenResizeAndSlideColumn();
                }
            }
            $.fn.slidePrev = function()
            {
                var item = $(a.slideImage).children().children();
                if(!$(a.contentImageBigChild+':first-child').hasClass('actived'))
                {
                    $(a.contentImageBigChild).each(function(){
                        if($(this).hasClass('actived'))
                        {
                            $(this).removeClass('actived');
                            $(this).prev().addClass('actived');
                            $(item).each(function(){
                                if($(this).hasClass('actived'))
                                {
                                    $(this).removeClass('actived');
                                    $(this).prev().removeClass('actived');
                                }
                            });
                            return false;
                        }
                    });
                    slideAnimate();
                    changeColumnWhenResizeAndSlideColumn();
                }
            }

            /*touch slide*/
            function TouchSlideNext()
            {
                var item = $(a.slideImage).children().children();
                if(!$(a.contentImageBigChild+':last-child').hasClass('actived')) {
                    $(a.contentImageBigChild).each(function () {
                        if ($(this).hasClass('actived')) {
                            $(this).removeClass('actived');
                            $(this).next().addClass('actived');
                            $(item).each(function () {
                                if ($(this).hasClass('actived')) {
                                    $(this).removeClass('actived');
                                    $(this).next().removeClass('actived');
                                }
                            });
                            return false;
                        }
                    });
                    slideAnimate();
                    changeColumnWhenResizeAndSlideColumn();
                }
            }

            function TouchSlidePrev()
            {
                var item = $(a.slideImage).children().children();
                if(!$(a.contentImageBigChild+':first-child').hasClass('actived'))
                {
                    $(a.contentImageBigChild).each(function(){
                        if($(this).hasClass('actived'))
                        {
                            $(this).removeClass('actived');
                            $(this).prev().addClass('actived');
                            $(item).each(function(){
                                if($(this).hasClass('actived'))
                                {
                                    $(this).removeClass('actived');
                                    $(this).prev().removeClass('actived');
                                }
                            });
                            return false;
                        }
                    });
                    slideAnimate();
                    changeColumnWhenResizeAndSlideColumn();
                }
            }


            /*$(a.imageBigChild).on("swipeleft" , function(){
                TouchSlideNext();
            });
            $(a.imageBigChild).on("swiperight" , function(){
                TouchSlidePrev();
            });*/
            $(a.imageBigChild).swipe({
                swipe:function(event, direction, distance, duration, fingerCount, fingerData)
                {
                  if(direction == 'left')
                      TouchSlideNext();
                  else
                      TouchSlidePrev();

                },
                threshold : 0
            });

            /**/
            /**/
            /*  CUSTOM have Pagination ? */
            pargination();
            function pargination()
            {
                var width_pargination = 0;
                if(a.pargination != '')
                {
                    var childSlde = $('.wrapSlide').children().children();
                    var childSlde = $(childSlde).parent();
                    var nameChildPargination = a.childPargination.substring(1);
                    $(a.pargination).empty();
                    $(childSlde).each(function () {
                        if ($(this).hasClass('actived')) {
                            $(a.pargination).append('<span class="actived ' + nameChildPargination + '"></span>');
                        }
                        else {
                            $(a.pargination).append('<span class="' + nameChildPargination + '"></span>');
                        }
                        width_pargination += $(a.childPargination).width();
                        $(a.pargination).css({
                            'width': width_pargination,
                            'height': $(a.childPargination).outerHeight() * 2,
                            /*'top'   : a.heightContent - heightDescription  - 30*/
                            'top'     : $(a.imageBigChild).outerHeight() - $(a.childPargination).outerHeight() * 2
                        });
                    });

                    /*click active parginator*/

                    $(a.childPargination).click(function(){

                        var count_parginator = 0;
                        $(a.childPargination).removeClass('actived');
                        $(this).addClass('actived');
                        $(a.childPargination).each(function(){
                            if($(this).hasClass('actived'))
                            {
                                var count_slide_big = 0;
                                $(a.contentImageBigChild).removeClass('actived');
                                $(a.contentImageBigChild).each(function(){
                                    if(count_slide_big == count_parginator)
                                    {
                                        $(this).addClass('actived');
                                        slideAnimate();
                                        thumbNailSlide($(this).attr('slide_small'));
                                        return false;
                                    }
                                    count_slide_big++;
                                });
                                return false;

                            }
                            count_parginator++;
                        });

                    });

                    /**/
                }
            }
            /*check slide thumbNail img*/
            function thumbNailSlide(thumbnal_slide)
            {
                $(a.childPargination).each(function() {

                    if($(this).hasClass('actived'))
                    {
                        console.log('result 3');
                        var range = 0;
                        $('.wrapSlide .slide_small').removeClass('actived');
                        $('.wrapSlide').find('.'+thumbnal_slide).addClass('actived');
                        $('.wrapSlide .slide_small').each(function(){
                            if($(this).hasClass('actived'))
                            {
                                var wrapSlide = $('.wrapSlide');
                                if($(parentContent).width() > a.resizeMobile)
                                    TweenMax.to(wrapSlide,0.5 ,{'top' : (-1)*range ,'left': 0 , ease: Linear.easeInOut}, 0);
                                else
                                    TweenMax.to(wrapSlide,0.5 ,{'top' : 0 ,'left': (-1)*range , ease: Linear.easeInOut}, 0);
                            }
                            if($(parentContent).width() > a.resizeMobile)
                                range += $(this).outerHeight();
                            else
                                range += $(this).outerWidth();
                            return false;
                        });
                    }

                });
            }
            /**/

        }
    };
}(jQuery));
