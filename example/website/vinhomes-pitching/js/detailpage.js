/**
 * Created by minhvu on 10/22/2015.
 */
$(document).ready(function(){
    var width_slider_item = 0;
    var height_slider_item = 0;


    function setWidthsliderChangePage()
    {
        var slider_content = $('.slide-wrapper');
        var width = slider_content.width();
        width_slider_item = Math.round(width/3);
        $('.detail_page').css({
            'width' : width_slider_item*3
        });
        height_slider_item = $('.detail_page').height();
        var slider_item = $('.detail_page .slider-item');
        slider_item.css({
            'width' : width_slider_item
        });
    }


    function setCubeFace()
    {
        $('.detail_page').find('.cube-face-front').css({
            'transform' : 'translate3d(0px , 0px , '+width_slider_item/2+'px)',
            'width' : width_slider_item,
            'height' : height_slider_item
        });


        $('.detail_page').find('.cube-face-left').css({
            'transform' : 'translate3d(0px , 0px , '+(-1)*width_slider_item/2+'px) rotateY(-90deg)',
            'width' : width_slider_item,
            'height' : height_slider_item
        });

        $('.detail_page').find('.cube-face-right').css({
            'transform' : 'translate3d('+width_slider_item/2+'px , 0px , 0px) rotateY(-90deg)',
            'width' : width_slider_item,
            'height' : height_slider_item
        });
        setpositionBackground();
    }

    function setpositionBackground()
    {
        var width_slider_item = Math.round($('.detail_page .slider-item').width());
        var pos_x = 0;
        var before = 0;
        var i =-1;

        $('.detail_page .slider-item').each(function(){
            $(this).find('.imgDetailPart').css({
                'background-position-x' : pos_x,
                'background-size': 'cover',
                'width' : $('.detail_page').width()
            });
            pos_x = width_slider_item*i;
            if(before != 0)
            {
                //console.log('pos_x :' + pos_x );
                //console.log('before :' + before);
            }
            before = pos_x;
            i--;
        });
    }

    function rotate()
    {
        //var cube = $('.detail_page .cube');
        $('.detail_page .cube').each(function(e){
            TweenMax.to($(this) , 1 , { 'transform' : 'translate3d(0px , 0px , '+(-1)*width_slider_item/2+'px) rotateY(0deg)'  , ease:Cubic.easeInOut, delay:e/10, onCompleteParams:[e], onComplete:function(id){
                if(id == 2){
                    $('.detail_page .imgDetail').css({
                        'opacity' : 1
                    });
                }
            }});
        })

    }

    function init()
    {
        setWidthsliderChangePage()
        setCubeFace();
        //rotate();
        setTimeout(rotate , 3500);

    }
    init();
    $(window).resize(function(){
        init();
    });


    function round(value, i)
    {
        var z = Math.pow(10,i);
        value = Math.round(value*z)/z;
        return value ;
    }
});