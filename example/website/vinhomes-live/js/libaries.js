/**
 * Created by minhvu on 12/16/2015.
 */
$('.dropdown_value').click(function()
{
    $(".dropdown_content .dropdown_box").css({
        'height' : 0,
        'z-index' : 1
    });
    $(".dropdown_content .line").css({
        'width' : 0
    });
    var parent = $(this).parent();
    var height = 0;
    var li = parent.find('.ul-list ');
    var line = parent.find('.line');
    li.each(function()
    {
        height += $(this).outerHeight();

    });
    parent.find('.dropdown_box').css({
        'height' : height,
        'z-index' : 99
    });
    if(line.length != 0)
    {
        line.css({
            'width' : 50
        });
    }
});

$('.dropdown_box .ul-list .li-list').click(function(){
    var parent = $(this).parent().parent().parent();
    console.log(parent);
    var value = $(this).attr('val');
    var key = $(this).attr('key');
    var text = $(this).html();
    var dropdown_box = parent.find('.dropdown_box');
    var line = parent.find('.line');
    var divValue = parent.find('.dropdown_value');
    divValue.attr('val' , value);
    divValue.attr('key' , key);
    divValue.find('.value').html(text);
    dropdown_box.css({
        'height' : 0,
        'z-index' : 1
    });
    line.css({
        'width' : 0
    });
});

$(document).click(function(event){
    var $target = $(event.target);
    if(!$target.is(".dropdown_content") && !$target.parents().is(".dropdown_content"))
    {
        $('.dropdown_box').css({
            'height' : 0,
            'z-index' : 1
        });
        $('.dropdown_content .line').css({
           'width' : 0
        });
    }
});
