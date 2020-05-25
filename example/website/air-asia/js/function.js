/**
 * Created by minhvu on 1/25/2016.
 */
var cv ;
window.URL = (window.URL||window.webkitURL||window.mozURL||window.msURL);
var URL = window.URL;
$(document).ready(function(){
    $(window).load(function(){
        init();
    });
});

$('.btn.btn-gender').click(function(){
    var gender = $(this).attr('gender');
    $(char).addClass(classHidden);
    $(places).removeClass(classHidden);
});

$('.content-place .thumbnail-place').click(function(){
    var place = $(this).attr('place').toString();
    $(places).addClass(classHidden);
    $(upload).removeClass(classHidden);
    setImg(idBg , place);
});

function setImg(img , valImg)
{
    $(img).attr('src' , 'images/'+valImg);
}

$('.bar-line.zoom').change(function(){
    valZoom = $(this).val();
    if(isHaveImg)
    {
        $(idImg).css({'width' : w_img_default*valZoom  , 'height' : h_img_default*valZoom });
    }
});
$('.bar-line.rotate').change(function(){
    angle = $(this).val();
    if(isHaveImg)
    {
        cv.setAngle(angle);
        rotate();
    }
});

function init()
{
    cv = new canvas('#canvas');
}
function loadPreview (event)
{
    hiddenUpload();
    var output = $(idImg).get(0);
    output.src = URL.createObjectURL(event.target.files[0]);
    var src= $(idImg).attr('src');
    $(idImg).load(function(){
        $(wrapPreview).css({
            'height' : $(idBg).height(),
            'width'  : $(idBg).width(),
            'z-index' : 50,
            'opacity' : 0.5
        });
        $('.picture-edit').css({
            'min-height' : $(idBg).height()
        });
        w_img = $(idImg).width();
        h_img = $(idImg).height();
        w_bg = $(idBg).width();
        h_bg = $(idBg).height();
        w_img_default = w_img;
        h_img_default = h_img;

        isLoad = true;
        isHaveImg = true;
        //setRotate();
        dragDrop();
        canvasDraw();
    });
}

function hiddenUpload()
{
    $(upload).addClass(classHidden);
    $(edit).removeClass(classHidden);
}

function canvasDraw()
{
    if(isHaveImg)
    {
        cv.getContext();
        cv.save();
        cv.saveImg(idImg);
        cv.restore();
    }
}

$('.done-btn').click(function(){
    $(edit).addClass(classHidden);
    $(share).removeClass(classHidden);
    $(imgFinal).css({'opacity' : 0});
    console.log(isLoad);
    if(isLoad)
    {
        alert('load');
        cv.clearRect();

        w_img = $(idImg).width();
        h_img = $(idImg).height();

        /**/
        cv.setWidth(w_bg);
        cv.setHeight(h_bg);

        /**/
        cv.save();
        if(angle != 0)
        {
            cv.rotate(w_img , h_img);
            cv.drawRotate(w_img , h_img);
        }
        else
        {
            cv.draw(w_img , h_img);
        }
        cv.restore();
        $(imgFinal).get(0).src = cv.data.toDataURL('image/png'); // draw image was rotated
        cv.resetTranslate(); // reset rotate
        var src = $(imgFinal).attr('src');
        $(imgFinal).load(function(){
            cv.clearRect();
            cv.setWidth(w_bg);
            cv.setHeight(h_bg);
            cv.save();
            cv.joinImages(imgFinal , w_bg , h_bg); // draw image was output
            cv.joinImages(idBg , w_bg , h_bg); // draw bg
            cv.restore();
            $(imgFinal).get(0).src = cv.data.toDataURL('image/png');
            base64 = $(imgFinal).get(0).src;
            isComplete = true;
            $(imgFinal).load(function(){
                $(imgFinal).css({'opacity' : 1});
            });
        });
        //document.getElementById('final').src = cv.data.toDataURL('image/web'); // output result
        /**/
    }


});

$('.post-btn').click(function(){
    if(isComplete)
    {
        array_value.image = base64;
        console.log(array_value);
        $.ajax({
            'url' : 'asia.php',
            'type' : 'post',
            'dataType' : 'text',
            data : array_value,
            success : function (result){
                console.log(result);
            }
        });
    }
});