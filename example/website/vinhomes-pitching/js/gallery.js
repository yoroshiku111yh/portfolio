/**
 * Created by minhvu on 10/9/2015.
 */
$(document).ready(function(){
    /*size width content-slider*/
    var width_slider_item  = 0;
    var height_slider_item = $('.slider-content .slider-item').outerHeight();
    var min = 1; // first element in list slide actived
    var max = 1; // last element in list slide actived
    var total = 0; // total slider actived in screen window
    var changePage = false;
    var link = '';
    var left_slide = 0;
    var cubeArray = [];
    var sliderContent = $('.slider-content')


    function widthSliderContent()
    {
        var width = 0;
        $('.slider-content .slider-item').each(function(){
            width += $(this).width();
        });
        $('.slider-content').css({
            'width' : width
        });
    }

    function setWidthSliderItem()
    {
        var count_slide_item = 0;
        $('.slider-content .slider-item').each(function(){
            count_slide_item++;
        });
        var width = Math.round(100/count_slide_item);
        var width_slider_content = $('.slide-wrapper').outerWidth();
        width = Math.round(width_slider_content*width*2/100);
        if(width > $('.slide-wrapper').outerWidth())
            width = $('.slide-wrapper').outerWidth();
        width_slider_item  =  width;
        $('.slider-content .slider-item').css({
            'width' : width
        });
        var cube = $('.slider-item .cube');
        cube.find('img').css({'display' : 'block'});
    }
    function setCubeFace()
    {
        $('.slider-item').find('.cube-face-front').css({
            'transform' : 'translate3d(0px , 0px , '+width_slider_item/2+'px)',
            'width' : width_slider_item,
            'height' : height_slider_item
        });


        $('.slider-item').find('.cube-face-left').css({
            'transform' : 'translate3d(0px , 0px , '+(-1)*width_slider_item/2+'px) rotateY(-90deg)',
            'width' : width_slider_item,
            'height' : height_slider_item
        });

        $('.slider-item').find('.cube-face-right').css({
            'transform' : 'translate3d('+width_slider_item/2+'px , 0px , 0px) rotateY(-90deg)',
            'width' : width_slider_item,
            'height' : height_slider_item
        });
    }
    function offsetMouse()
    {

        var max_slide = 0;
        var width_wrap_slide = $('.slide-wrapper').outerWidth();
        var width_content_slide = $('.slider-content').outerWidth();
        var protortion = width_content_slide / width_wrap_slide;
        var sort = 0;
        max_slide = width_content_slide - width_wrap_slide;
        $('.slide-wrapper').mousemove(function(e){
            /*console.log(e.pageX);*/
            if(!changePage)
            {

                var left_mouse = e.pageX;
                if(left_mouse > max_slide)
                    left_mouse = max_slide;
                var left_mouse_protortion_width = left_mouse*protortion;
                //console.log( Math.round(left_mouse_protortion_width / width_slider_item) );
                sort =  Math.round(left_mouse_protortion_width / width_slider_item);
                if(sort == 0)
                    sort += 1;
                left_slide = (-1)*left_mouse;
                TweenMax.killTweensOf(sliderContent)
                TweenMax.to(sliderContent , 1 , {'left' : left_slide , ease:Sine.easeOut});


                mouseMoveChangeListActive(sort ,min , max ); // when mouse move get new actived slider-item
            }

        });




    }


    function setActiveSlide()
    {
        var width = 0;
       $('.slider-content .slider-item').each(function(){
            if(width < $('.slide-wrapper').outerWidth())
            {
                width += $(this).outerWidth();
                $(this).addClass('actived');
                var cube = $(this).find('.cube');
                TweenMax.to(cube , 0.5 , {'transform' : 'translate3d(0px , 0px , '+(-1)*width_slider_item/2+'px) rotateY(0deg)' , ease:Linear.easeInOut});
                if(min >= $(this).attr('sort') )
                    min = $(this).attr('sort');
                if(max < $(this).attr('sort'))
                    max = $(this).attr('sort');
                total = ( max - min )+ 1;
            }
        });
    }
    function mouseMoveChangeListActive(sort , min_sort , max_sort)
    {
        if(sort)
        {
            //console.log('total :' + total);
            if(sort >= max_sort)
            {
                min = sort;
                max = sort;
                $('.slider-content .slider-item').removeClass('actived');
                for (var i = 0 ; i < total ; i++)
                {
                    var slide = $(".slider-item[sort="+(sort - i)+"]");
                    slide.addClass('actived');
                    if(min >= slide.attr('sort') )
                        min = slide.attr('sort');
                    if(max < slide.attr('sort'))
                        max = slide.attr('sort');
                }
            }
            else if (sort <= min_sort)
            {
                min = sort;
                max = sort;
                $('.slider-content .slider-item').removeClass('actived');
                for (var i = 0 ; i < total ; i++)
                {
                    var slide = $(".slider-item[sort="+(sort + i)+"]");
                    slide.addClass('actived');
                    if(min >= slide.attr('sort') )
                        min = slide.attr('sort');
                    if(max < slide.attr('sort'))
                        max = slide.attr('sort');
                }
            }
            rotateSlideActived(); // animate slider actived
        }
        //console.log('min :' + min+'/'+'max :'+ max +'/'+'sort :'+ sort);
    }
    function rotateSlideActived()
    {


        for(var i in cubeArray){
            var item = cubeArray[i]
            var cube = item.find('.cube');

            TweenMax.killTweensOf(cube)
            if(item.hasClass('actived'))
            {
                TweenMax.to(cube , 0.5 , {'transform' : 'translate3d(0px , 0px , '+(-1)*width_slider_item/2+'px) rotateY(0deg)' , ease:Sine.easeOut});
            }
            else
            {
                TweenMax.to(cube , 0.5 , {'transform' : 'translate3d(0px , 0px , '+(-1)*width_slider_item/2+'px) rotateY(90deg)' , ease:Sine.easeOut, delay:0.1});
            }
        }
        /*
        $('.slider-content .slider-item').each(function(){
            var cube = $(this).find('.cube');
            TweenMax.killTweensOf(cube)
            if($(this).hasClass('actived'))
            {
                TweenMax.to(cube , 0.5 , {'transform' : 'translate3d(0px , 0px , '+(-1)*width_slider_item/2+'px) rotateY(0deg)' , ease:Sine.easeOut});
            }
            else
            {
                TweenMax.to(cube , 0.5 , {'transform' : 'translate3d(0px , 0px , '+(-1)*width_slider_item/2+'px) rotateY(90deg)' , ease:Sine.easeOut});
            }
        });
        */
    }


    init();

    function init(){
        setWidthSliderItem(); // calc and make width for slider-item
        widthSliderContent(); // calc and make width for slider-cotent
        setCubeFace(); // setting cube of slider-item
        offsetMouse(); // calc mouse move and action here
        setActiveSlide(); // set actived slider-item

        $('.slider-content .slider-item').each(function(){

            cubeArray.push($(this));
        });
    }





    $(window).resize(function(){
        height_slider_item = $('.slider-content .slider-item').outerHeight();
        setWidthSliderItem();
        widthSliderContent();
        setCubeFace();
    });

    /*animate before change page*/
    $('.animateLink').click(function(event){
        link = this.href;
        event.preventDefault();
        changePage = true;
        var cube = $('.slider-item .cube');
        cube.css({
            'transform' :'translate3d(0px , 0px , '+(-1)*width_slider_item/2+'px) rotateY(90deg)'
    });
        TweenMax.to(cube , 0.7 , {'transform' : 'translate3d(0px , 0px , '+(-1)*width_slider_item/2+'px) rotateY(90deg)' , ease:Linear.easeNone , onComplete:changeUrl});

        /*$('.slider-item .cube').each(function(e){
            TweenMax.to($(this) , 0.7 , {'transform' : 'translate3d(0px , 0px , '+(-1)*width_slider_item/2+'px) rotateY(90deg)' , ease:Cubic.easeOut , delay:e/10 });
        });

        setTimeout(function(){
            changeUrl();
        }, 700);*/

        //console.log(href);
        //window.location.href = href;
    });
    function changeUrl()
    {
        window.location.href = link;
    }
    /**/
    /*
    * click to see full image
    * */
    /*$('.animateLink').click(function(){
        event.preventDefault();
        var cube = $('.slider-item .cube');
        changePage = true;
        var imgUrl = $(this).find('img').attr('src');
        TweenMax.to(cube , 0.5 , {'transform' : 'translate3d(0px , 0px , '+(-1)*width_slider_item/2+'px) rotateY(90deg)' , ease:Linear.easeInOut});
        changeBackground(imgUrl);
    });*/

    /*function setWidthsliderChangePage()
    {
        var slider_content = $('.detail_page');
        var width = slider_content.width();
        var width_slider_item = width/3;
        var slider_item = $('.detail_page .slider-item');
        slider_item.css({
            'width' : width_slider_item
        });
    }*/
    /**/
});