/**
 * Created by minhvu on 3/8/2016.
 */

$(document).ready(function(){
    init_award();
});

$(window).resize(function(){
    init_award();
});
function init_award()
{
    setWidthBanner();
    checkWidthTimeLine();
}

function setWidthBanner()
{
    if($('#v02-noc-award-scholarship').length != 0)
    {
        var w_content = $('.v02-wrapper-noc-award-scholarship .v02-content').width();
        var w_window = $(window).width();
        var space = (w_window - w_content)/2
      /*  var shadow_left = $('#v02-noc-award-scholarship .banner-left');
        var shadow_right = $('#v02-noc-award-scholarship .banner-right');*/
        var wave_left = $('#v02-noc-award-scholarship .wave-left');
        var wave_right = $('#v02-noc-award-scholarship .wave-right');
        var w_default = 264;
        var h_default = 374;
        wave_left.css({'width' : space*0.75 , 'left' : -space*0.75 , 'height' : (space*0.75)*h_default/w_default});
        wave_right.css({'width' : space*0.75 , 'right' : -space*0.75 , 'height' : (space*0.75)*h_default/w_default})
    }
}


$('.v02-list-milestones .v02-milestones').click(function(){
    timeLine(this);
});

function checkWidthTimeLine()
{
    $('.v02-list-milestones .v02-milestones').each(function(){
        $(this).find('.v02-text').css({ 'color' : '#ef7c00'});
        $(this).find('.v02-circle').css({ 'border' : '3px solid #ef7c00' , 'background-color': 'white' });
        if($(this).hasClass('active'))
        {
            var id = $(this).index();
            var w = $(this).width();
            var line = $('.v02-time-line .v02-line .v02-line-animate');
            line.css({ 'width' : w*id})
            return false;
        }
    });
}

function timeLine(time)
{
    $('.v02-list-milestones .v02-milestones').removeClass('active');
    $(time).addClass('active');
    var count = 0;
    var id = $(time).index();
    var w = $(time).width();
    var line = $('.v02-time-line .v02-line .v02-line-animate');
    line.css({ 'width' : w*$(time).index()})

    $('.v02-list-milestones .v02-milestones').find('.v02-text').css({ 'color' : ''});
    $('.v02-list-milestones .v02-milestones').find('.v02-circle').css({ 'border' : '' , 'background-color': '' });

    /*$(time).find('.v02-text').css({ 'color' : '#ef7c00'});
    $(time).find('.v02-circle').css({ 'border' : '3px solid #ef7c00' , 'background-color': 'white' });*/
    $('.v02-list-milestones .v02-milestones').each(function(){
        $(this).find('.v02-text').css({ 'color' : '#ef7c00'});
        $(this).find('.v02-circle').css({ 'border' : '3px solid #ef7c00' , 'background-color': 'white' });
        if(count == id)
        {
            console.log(count);
            return false;
        }
        count++;
    });
}