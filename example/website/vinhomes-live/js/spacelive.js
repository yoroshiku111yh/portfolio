/**
 * Created by minhvu on 12/11/2015.
 */
$(document).ready(function(){
    $(window).load(function(){
        init();
    });
    $(window).resize(function (){
        setWidthPopupProduct();
        setResolutionItem();
    });
});

function init()
{
    setWidthPopupProduct();
    setResolutionItem();
}

function setResolutionItem()
{
    $('.popup-slide-all .content-slide-all').css({'width' : '' , 'height' : ''});
    $('.popup-slide-all .detail-item').css({'height' : ''});
    $('.popup-slide-all .detail-item .img-detail').css({
        'max-height' : '',
        'position' : 'relative',
        'margin' : '',
        'top' :'',
        'bottom' : '',
        'left' : '',
        'right' : '',
        'display' : ''
    });
    var id = 0;
    $('.popup-slide-all .detail-item').each(function(){
        if($(this).find('.img-detail').length != 0)
        {
            $(this).find('.img-detail').css({
                'max-height' : '100%',
                'position' : 'absolute',
                'margin' : 'auto',
                'top' :0,
                'bottom' : 0,
                'left' : 0,
                'right' : 0,
                'display' : 'block'
            });
            $(this).css({
                'width' : 'auto',
                'height' : 'auto'
            });
            var height = $(this).find('.img-detail').height();
        }
    });
    var max_width = 0;
    var max_height = 0;
    $('.popup-slide-all .detail-item').each(function(){
        if($(this).find('.img-detail').length != 0)
        {
            var img_width = $(this).find('.img-detail').outerWidth();
            var img_height = $(this).find('.img-detail').outerHeight();
            if(img_width > max_width)
            {
                max_width = img_width;
            }
            if(img_height > max_height)
            {
                max_height = img_height;
            }
        }
    });
    $('.popup-slide-all .detail-item').css({'height' : max_height});
    $('.popup-slide-all .content-slide-all').css({
        'width' : max_width,
        'height' : max_height,
        'margin' : 'auto',
        'position' : 'absolute',
        'top' : 0,
        'left' : 0,
        'right' : 0,
        'bottom' : 0
    });
    showDetail('.popup-slide-all .detail-item');
}

function showDetail(detail)
{
    $(detail).each(function(){
        if($(this).hasClass('active'))
        {
            $(this).css({'opacity' : 1 , 'z-index' : 996});
        }
        else
        {
            $(this).css({'opacity' : '' , 'z-index' : -1});
        }
    });
}

function setActive(detail , key)
{
    $(detail).each(function(){
        if($(this).attr('key') == key)
        {
            $(this).addClass('active');
        }
        else
        {
            $(this).removeClass('active');
        }
    });
}

function setWidthPopupProduct()
{
    $('.popup-content').each(function(){
        if($(this).find('.img-detail').length != 0)
        {
            $(this).find('.img-detail').css({
                'max-height' : '100%'
            });
            $(this).find('.detail').css({
                'width' : 'auto',
                'height' : 'auto'
            });
            var width = $(this).find('.img-detail').outerWidth();
            if(width < 50)
            {
                width = 'auto';
            }
            $(this).find('.detail').css({
                'width' : width
            });
            var height = $(this).find('.img-detail').outerHeight();
            $(this).find('.detail').css({
                'height' : height
            });
        }

        if($(this).find('.img-detail').hasClass('full-size-scroll')) {
            if ($(this).find('.wrap-full-size-scroll').length == 0) {
                $(this).find('.img-detail').wrap('<div class="wrap-full-size-scroll"></div>');
            }
            $(this).find('.img-detail').css({
                'max-height': '',
                'position': 'relative'
            });
            $(this).find('.detail').css({
                'width': '',
                'height': ''
            });
            $(this).find('.wrap-full-size-scroll').css({
                'max-width': '100%',
                'height': '100%',
                'overflow-y': 'auto',
                'overflow-x': 'hidden'
            });
        }

    });
}

function showPopUpMap(parent)
{
    setWidthPopupProduct();
    if(parent)
    {
        $(parent).find('.popup').css({
            'display' : 'block',
            'opacity' : 1,
            'visibility' : 'visible',
            'z-index' : 9999
        });
        $(parent).find('.contentPopUp.map').css({
            'display' : 'block',
            'opacity' : 1,
            'visibility' : 'visible'
        });
    }
    else
    {
        $('.popup ').css({
            'z-index' : 9999
        });
        $('.popup , .contentPopUp.map ').css({
            'display' : 'block',
            'opacity' : 1,
            'visibility' : 'visible'
        });
    }
}

function showPopUpImages(parent)
{
    setWidthPopupProduct();
    if(parent)
    {
        $(parent).find('.popup').css({
            'display' : 'block',
            'opacity' : 1,
            'visibility' : 'visible',
            'z-index' : 9999
        });
        $(parent).find('.contentPopUp.images').css({
            'display' : 'block',
            'opacity' : 1,
            'visibility' : 'visible'
        });
    }
    else
    {
        $('.popup ').css({
            'z-index' : 9999
        });
        $('.popup , .contentPopUp.images ').css({
            'display' : 'block',
            'opacity' : 1,
            'visibility' : 'visible'
        });
    }
}
function showPopUp(parent)
{
    if(parent)
    {
        $(parent).find('.popup').css({
            'display' : 'block',
            'opacity' : 1,
            'visibility' : 'visible',
            'z-index' : 9999
        });
        $(parent).find('.contentPopUp').css({
            'display' : 'block',
            'opacity' : 1,
            'visibility' : 'visible'
        });
    }
    else
    {
        $('.popup ').css({
            'z-index' : 9999
        });
        $('.popup , .contentPopUp ').css({
            'display' : 'block',
            'opacity' : 1,
            'visibility' : 'visible'
        });
    }
}
function showPopUpAll(parent)
{
    setWidthPopupProduct();
    if(parent)
    {
        $(parent).find('.popup').css({
            'display' : 'block',
            'opacity' : 1,
            'visibility' : 'visible',
            'z-index' : 9999
        });
        $(parent).find('.contentPopUp').css({
            'display' : 'block',
            'opacity' : 1,
            'visibility' : 'visible'
        });
    }
    else
    {
        $('.popup ').css({
            'z-index' : 9999
        });
        $('.popup , .contentPopUp ').css({
            'display' : 'block',
            'opacity' : 1,
            'visibility' : 'visible'
        });
    }
}

function closePopUp(parent)
{
    if(parent)
    {
        $(parent).find('.popup').css({
            'display' : 'none',
            'opacity' : 0,
            'visibility' : 'hidden',
            'z-index' : -1
        });
        $(parent).find('.contentPopUp').css({
            'display' : 'none',
            'opacity' : 0,
            'visibility' : 'hidden'
        });
    }
    else
    {
        $('.popup ').css({
            'z-index' : -1
        });
        $('.popup , .contentPopUp ').css({
            'opacity' : 0,
            'visibility' : 'hidden'
        });
    }
}
/**/

$('.show-popup.map').click(function(){
    var parent = $(this).parent().parent().parent().parent();
    showPopUpMap(parent);
});

$('.show-popup.images').click(function(){
    var parent = $(this).parent().parent().parent().parent();
    showPopUpImages(parent);
});

$('.btn-show-map').click(function(){
    var parent = $(this).parent().parent().parent();
    showPopUpAll(parent);
});


$('.showPopup').click(function(){
    var parent = $(this).parent();
    showPopUpAll(parent);
});

$('.close-popup').click(function(){
    closePopUp();
});

$('.popup').click(function(event){
    var $target = $(event.target);
    if(!$target.is(".contentPopUp") && !$target.parents().is(".contentPopUp"))
    {
        closePopUp();
    }
});
$('.showpopup-libaries').click(function(){
    var parent = $(this).parent().parent();
    showPopUpAll(parent);
});

$('.show-popup.document').click(function(){
    var parent = $(this).parent().parent();
    showPopUpAll(parent);
});

$('.showpopup-index').click(function(){
    var parent = $(this).parent();
    showPopUpAll(parent);
});

$('.showpopup-slide-all').click(function(){
    var key = $(this).attr('key');
    var length = 0;
    var parent = $(this).parent();
    while(length == 0)
    {
        length = parent.find('.popup-slide-all').length;
        if(length == 0)
            parent = parent.parent();
    }
    setResolutionItem();
    setActive('.popup-slide-all .detail-item' , key);
    showDetail('.popup-slide-all .detail-item');
    showPopUp(parent);
});
$('.prev-btn').click(function(){
    var detail = '.popup-slide-all .detail-item';
    var key = 0;
    $(detail).each(function(){
        if($(this).hasClass('active'))
        {
            key = $(this).prev().attr('key');
            return false;
        }
    });
    if(key)
    {
        setActive('.popup-slide-all .detail-item' , key);
        showDetail('.popup-slide-all .detail-item');
    }
});
$('.next-btn').click(function(){
    var detail = '.popup-slide-all .detail-item';
    var key = 0;
    $(detail).each(function(){
        if($(this).hasClass('active'))
        {
            key = $(this).next().attr('key');
            return false;
        }
    });
    if(key)
    {
        setActive('.popup-slide-all .detail-item' , key);
        showDetail('.popup-slide-all .detail-item');
    }
});

/**/