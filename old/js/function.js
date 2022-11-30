/**
 * Created by minhvu on 3/15/2016.
 */

var wook;

$(document).ready(function(){
    $(window).load(function(){
        init();
    });
});

function init()
{
    setPosDetailItem();
    setHeightContentProject();
}



$('.dropDown-wrapper .dropdown .value').click(function(){
    var wrapper = $('.dropDown-wrapper .dropdown');
    var ul = $('.dropDown-wrapper .dropdown .ul-dropdown');
    var value = $('.dropDown-wrapper .dropdown .value');
    wrapper.css({'height' : ul.outerHeight() +  value.outerHeight()});
});
$('body').click(function(e){
    var $target = $(e.target);
    var wrapper = $('.dropDown-wrapper .dropdown');
    if(!$target.is(".dropDown-wrapper") && !$target.parents().is(".dropDown-wrapper"))
    {
        wrapper.css({'height' : ''});
    }
});
$('.ul-dropdown .li-dropdown').click(function(){
    var vals = $(this).attr('tag');
    var txt = $(this).html();
    $('.content .detail-item').css({'width' : '' , 'height' : '' , 'margin' : '' , 'opacity' : '' , 'border' : ''});
    $('.content .detail-item').each(function(){
        var tag = $(this).attr('data-tag');
        if(tag != vals && vals != '')
        {
            $(this).css({'width' : 0 , 'height' : 0 , 'margin' : 0 , 'opacity' : 0 , 'border' : '0px solid white'});
        }
    });
    var value = $('.dropDown-wrapper .dropdown .value .text');
    value.html(txt);
    var wrapper = $('.dropDown-wrapper .dropdown');
    wrapper.css({'height' : ''});

});

function setPosDetailItem()
{
    $('.content .detail-item').each(function(){
        var title = $(this).find('.title');
        var text = $(this).find('.text');
        var line = $(this).find('.line');
        var tag = $(this).find('.tag');
        var content = $(this).find('.contain-text');
        content.css({'height' : title.outerHeight() + text.outerHeight() + line.outerHeight() + tag.outerHeight() });
    });
}


function setHeightContentProject()
{
    var h = $('#wrapper-main #wk').outerHeight();
    $('#wrapper-main .content').css({'min-height' : h});
}