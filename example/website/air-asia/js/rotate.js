/**
 * Created by minhvu on 1/25/2016.
 */
var imgCapture;
function drawRotate()
{
    $(idImg).css({
        'transform': 'rotate('+angle+'deg) translateZ(0px)'
    });
}

function rotate()
{
    if(dragElem)
    {
        $(wrapPreview).css({
            'top' : pos_y,
            'left' : pos_x,
            'position' : 'absolute'
        });
    }
    drawRotate();
}
