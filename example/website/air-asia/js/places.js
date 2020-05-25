/**
 * Created by minhvu on 2/1/2016.
 */

$(document).ready(function(){

    $('.scroll-btn').draggable({
        axis : 'y',
        containment : '.scroll-bar',
        start: function()
        {

        },
        drag: function()
        {
            var top = scrollBar('.scroll-btn' , '.line-bar', '.scroll-bar' , '.content-place');
            $('#places .content-place ').offset({"top": top});
        }
    });



});

function checkHeightContentPlace()
{
    var height_content = $('#places .content-place ').outerHeight();
    var height_wrap = $('#wrap-place').outerHeight();
    if(height_content <= height_wrap)
    {
        $('.scroll-bar').css({'opacity' : 0 , 'visibility': 'hidden'})
    }
    else
    {
        $('.scroll-bar').css({'opacity' : 1 , 'visibility': 'visible'})
    }
}

function scrollBar ( btn_scroll, bar_scroll, hold, content  ) {
    var scroll = 0;
    var scroller = $(btn_scroll);
    var scrollbar = $(bar_scroll);
    var holder = $(hold) ;
    var bar = $(bar_scroll);
    var y0 = scroller.offset().top - scrollbar.offset().top;
    var h0 = bar.height();
    var per = y0/(h0 - scroller.height());
    var content_ScreenOffsetY = holder.offset().top;
    var y1 = ($(content).height() - holder.height())*per
    scroll = content_ScreenOffsetY - y1;
    console.log(scroll);
    return scroll;
};