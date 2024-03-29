/**
 * Created by minhvu on 10/22/2015.
 */
function fnResize()
{
    if($(window).width() > $(window).height()){
        stageW = $(window).width();
        stageH = $(window).height();
        console.log('landscape');
        stopToRotate = false;
        showPopUpRotate();
     }else{
        stageW = $(window).width();
        stageH = $(window).height();
        console.log('portrait');
        stopToRotate = true;
        showPopUpRotate();
        //askForRotateScreenToPlayTheGame();
     }
    if(stageW  > 1199)
        stageH -= $('header').outerHeight();
    renderer.resize(stageW,stageH);
    ratio = stageH/600;
    if(checkMobile())
    {
        ratio = ratio + 0.25;
    }
    console.log(ratio);
    position(contain_background , stageW/2+5*ratio , stageH/2 + 35*ratio)
    scale(contain_background , ratio);

    position(containBase ,stageW/2 , stageH/2 );
    scale(containBase , ratio);

    position(contain_item, stageW/2 ,stageH/2);
    scale(contain_item , ratio);

    /*if(checkMobile())
    {
        var positionY = (stageH - (266/2)*(ratio-0.25) + 40);
    }
    else
    {
        var positionY = (stageH - (266/2)*(ratio) + 40);
    }
*/


    scale(containBtn, ratio + 0.25);

    var positionY = stageH - (containBtn.height * (3 / 4));

    if (checkMobile()) {
        positionY = stageH - containBtn.height / 4;
    }

    position(containBtn, stageW / 2, positionY);


    containLives.scale.x = ratio;
    containLives.scale.y = ratio;

    position(containLevel, stageW / 2, stageH / 2);
    scale(containLevel, ratio);

    position(containTimeAndLives, stageW / 2, stageH / 2);
    scale(containTimeAndLives, ratio);

    position(containBackgroundForAll, stageW / 2, stageH / 2);
    backgroundWindow.width = stageW + 5;
    backgroundWindow.height = stageH;

    //scale(wrapBtn , ratio);
    //position(wrapBtn , 0, 0 );

    position(contain_popup, stageW / 2, stageH / 2);
    scale(contain_popup, ratio);

    preloadTxt.position.x = (stageW) / 2;
    preloadTxt.position.y = (stageH) / 2;

    position(containPopUpRotateNoti, stageW / 2, stageH / 2);
    scale(containPopUpRotateNoti, ratio);

    position(containPopUpbackGround, stageW / 2, stageH / 2);
    containPopUpbackGround.width = stageW;
    containPopUpbackGround.height = stageH;
    scale(containPopUpbackGround, ratio);

    background_white.width = stageW * 2;
    background_white.height = stageH * 2;

    position(containPopUpSuccess, stageW / 2, stageH / 2 - 25 * ratio);
    scale(containPopUpSuccess, ratio);

    position(containPopUpEnterCode, stageW / 2, stageH / 2 - 25 * ratio);
    scale(containPopUpEnterCode, ratio);

    /*contain_cd.scale.x = ratio;
    contain_cd.scale.y = ratio;*/
}

function fnResizeWait()
{
    if($(window).width() > $(window).height()){
        stageW = $(window).width();
        stageH = $(window).height();
        console.log('landscape');
        stopToRotate = false;
        showPopUpRotate();
    }else{
        stageW = $(window).width();
        stageH = $(window).height();
        console.log('portrait');
        stopToRotate = true;
        showPopUpRotate();
        //askForRotateScreenToPlayTheGame();
    }
    if(stageW  > 1199)
        stageH -= $('header').outerHeight();
    renderer.resize(stageW,stageH);
    ratio = stageH/600;
    if(checkMobile())
    {
        ratio = ratio + 0.25;
    }
    position(containBackgroundForAll, stageW / 2, stageH / 2);
    backgroundWindow.width = stageW + 5;
    backgroundWindow.height = stageH;

    position(contentPopUpWait , stageW/2 , stageH/2 - 25*ratio);
    scale(contentPopUpWait , ratio);
    background_black.width = stageW*2;
    background_black.height = stageH*2;

}