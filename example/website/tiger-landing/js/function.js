/**
 * Created by minhvu on 12/21/2015.
 */
$(document).ready(function(){
    function mobile()
    {
        var isMobile = false; //initiate as false
// device detection
        if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
            || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) isMobile = true;
        return isMobile;
    }
    var height_tiger_stand = 0;
    $(window).load(function(){
        setHeightTigerStand();
        setSizeBgStand();
        changeBannerHeader();
        animationCountDown()
        setHeightTigerStand();
        setInterval(animateLight , 150);
    });
    $(window).resize(function(){
        doResizeAll();
    });

    function doResizeAll(){
        setHeightTigerStand();
        setSizeBgStand();
        changeBannerHeader()
        //setCountDownSize();
    }
    var turn = false;
    function animateLight()
    {
        if(turn)
        {
            $('.premium').css({'opacity' : 0});
            turn = false;
        }
        else
        {
            $('.premium').css({'opacity' : 1});
            turn = true;
        }
    }

    function setCountDownSize(){
        var cd = $(".location");
        var scaleRatio = $(window).height()/900;
        console.log("scaleRatio : "+ scaleRatio);
        cd.css({
        '-webkit-transform': 'scale('+scaleRatio+')',
        '-moz-transform': 'scale('+scaleRatio+')',
        '-ms-transform': 'scale('+scaleRatio+')',
        '-o-transform': 'scale('+scaleRatio+')',
        'transform': 'scale('+scaleRatio+')'
        });
    }
    function setHeightTigerStand()
    {
        var height_title = $('.title').outerHeight();
        var height_location = $('.location').outerHeight();
        var height_information = $('.information').outerHeight();
        height_tiger_stand = $(window).height() - height_title - height_location;
        $('.tiger-stand').css({
            'height' : height_tiger_stand
        });
    }

    function animationCountDown()
    {
        var time = 0.75;
        var talent = $('.bg-talent-footer');
        talent.css({'margin-bottom' : 0});

        var talent_responsive = $('.bg-talent-footer-responsive');
        talent_responsive.css({'margin-bottom' : 0});

        $('.cooldown-part').each(function(id){
            var element = $(this);
            element.attr('IDitem', id);
            TweenMax.killTweensOf(element);
            TweenMax.to(element, 0.65, { ease : Back.easeOut, opacity : 1 , transform : 'scale(1)', delay : /*(id+3 + time)/10*/ time });
            time = time + 0.25;
        });
        firework();
    }

    function setSizeBgStand()
    {
        var width = $(window).width();
        var height = $(window).height();
        $('.tiger-stand .bg').css({'width' : ''});
        $('.tiger-stand .bg').css({'height' : '100%'});

        var bgWidth = $('.tiger-stand .bg').width();

        var left = (width - bgWidth)/2;

        if(left < 0)
        {
            $('.tiger-stand .bg').css({'margin-left' : left});
        }
        else
        {
            $('.tiger-stand .bg').css({
                'width' : '100%',
                'height' : 'auto',
                'margin-left' : 0,
                'position': 'absolute',
                'top':"calc(50% - 402px + 120px)"
            });

        }

        if(height <= 500){

            $('.tiger-stand .bg').css({
                'width' : '100%',
                'height' : 'auto',
                /*'margin-left' : 0,*/
                'position': 'absolute',
                'top':"calc(50% - 402px + 200px)"
            });

        }

        if(width <= 321){

            $('.tiger-stand .bg').css({
                'width' : '200%',
                'height' : 'auto',
                'margin-left' : "calc(-50%)",
                'position': 'absolute',
                'top':"0px"
            });
        }
        //setSizeFooterTalent();
    }

    function setSizeFooterTalent()
    {
        $('.bg-talent-footer').css({
            'height' : $('.content').height()/3.5,
            'width'  : 'auto'
        });
        if($('.bg-talent-footer').width() > $('.talent-footer').width())
        {
            var left = $(window).width() - $('.bg-talent-footer').width();
            $('.bg-talent-footer').css({
                'margin-left' : left/2
            });
        }
        else
        {
            $('.bg-talent-footer').css({
                'margin-left' : ''
            });
        }

        $('.bg-talent-footer-responsive').css({
            'height' : $('.content').height()/3.5,
            'width'  : 'auto'
        });
        if($('.bg-talent-footer-responsive').width() > $('.talent-footer').width())
        {
            var left = $(window).width() - $('.bg-talent-footer-responsive').width();
            $('.bg-talent-footer-responsive').css({
                'margin-left' : left/2
            });
        }
        else
        {
            $('.bg-talent-footer-responsive').css({
                'margin-left' : ''
            });
        }

    }

    function changeBannerHeader()
    {
        if($('body').width() < 700)
        {
            $('.bg-banner-header').attr('src' , 'img/banner-header-responsive.png');
        }
        else
        {
            $('.bg-banner-header').attr('src' , 'img/banner-header.png');
        }
    }

    $('.countDay').countdown('2016/01/02 19:00', function(event) {
        //$(this).html(event.strftime('%w weeks %d days %H:%M:%S'));
        $(this).html(event.strftime('%D'));
    });
    $('.countHours').countdown('2016/01/02 19:00', function(event) {
        $(this).html(event.strftime('%H'));
    });
    $('.countMinutes').countdown('2016/01/02 19:00', function(event) {
        $(this).html(event.strftime('%M'));
    });
    $('.countSecond').countdown('2016/01/02 19:00', function(event) {
        $(this).html(event.strftime('%S'));
    });


});