/**
 * Created by minhvu on 3/9/2016.
 */
$(document).ready(function(){
    init_alumni();
});
$(window).resize(function(){
    init_alumni();
});
function init_alumni()
{
    setWidthBannerAlumni();
    setBannerNocAlumni();
}

function setWidthBannerAlumni()
{
    if($('#v02-noc-alumni').length != 0)
    {
        var w_content = $('.v02-wrapper-alumni .v02-content').width();
        var w_window = $(window).width();
        var space = (w_window - w_content)/2
        /*  var shadow_left = $('#v02-noc-award-scholarship .banner-left');
         var shadow_right = $('#v02-noc-award-scholarship .banner-right');*/
        var wave_left = $('#v02-noc-alumni .wave-left');
        var wave_right = $('#v02-noc-alumni .wave-right');
        var w_default = 264;
        var h_default = 374;
        wave_left.css({'width' : space*0.75 , 'left' : -space*0.75 , 'height' : (space*0.75)*h_default/w_default});
        wave_right.css({'width' : space*0.75 , 'right' : -space*0.75 , 'height' : (space*0.75)*h_default/w_default})
    }
}
function setBannerNocAlumni()
{
    var left = $('#v02-noc-alumni .banner-left');
    var right = $('#v02-noc-alumni .banner-right');
    var w_content = $('#v02-noc-alumni .v02-content').width();
    var w_window = $(window).width();
    var size_banner = (w_window - w_content)/2;
    left.css({'width' : size_banner });
    right.css({'width' : size_banner });

}