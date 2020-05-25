/**
 * Created by minhvu on 2/24/2016.
 */
$(document).ready(function(){
    init();
});

$(window).resize(function(){
    setHeightOptimumGold();
});

function init()
{
    setHeightOptimumGold();
}

function setHeightOptimumGold()
{
    if($('.optimum-gold-special').length != 0)
    {
        var height_content = $('.optimum-gold-special .detail-optimum-gold').outerHeight();
        $('.optimum-gold-special .image-optimum-gold').css({
            //'min-height' : height_content
        });
    }
}