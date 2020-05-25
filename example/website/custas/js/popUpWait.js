/**
 * Created by minhvu on 11/23/2015.
 */

var popupWaitBg ;
var contentPopUpWait = new PIXI.Container() ;
var background_black ;
var countingDownTime = 3;
var timeWaiting  ;
var greenNumTimeTextureArray = [];

function initPopUpWait()
{
    countingDownTime = 8;
    position(contentPopUpWait , stageW/2 , stageH/2 - 25*ratio);
    scale(contentPopUpWait , ratio);

    background_black = new PIXI.Sprite.fromImage('asset/bg/bg_black.png');
    anchor(background_black);
    background_black.alpha = 0.75;
    background_black.width = stageW*2;
    background_black.height = stageH*2;


    popupWaitBg = new PIXI.Sprite.fromImage('asset/bg/popupWait.png');
    anchor(popupWaitBg);
    ratioOfWidthHeightItem(popupWaitBg , 1600);

    timeWaiting = new PIXI.Sprite.fromImage('asset/numberGreen/3.png');
    anchor(timeWaiting);
    //ratioOfWidthHeightItem(timeWaiting,1600);
    //scale(timeWaiting, ratio);
    position(timeWaiting , 0 , 55);

    console.log(timeWaiting.width);

    contentPopUpWait.addChild(background_black);
    contentPopUpWait.addChild(popupWaitBg);
    contentPopUpWait.addChild(timeWaiting);

    stage.addChild(contentPopUpWait);

    for(var i = 0; i< 10; i++){
        var texture = PIXI.Texture.fromImage('asset/numberGreen/'+ i +'.png');
        greenNumTimeTextureArray.push(texture);
    }

    setInterval(countingDown , 1000);

}
function countingDown()
{
    if(countingDownTime > 0)
    {
        countingDownTime--;
        timeWaiting.texture = greenNumTimeTextureArray[countingDownTime];
    }
    else if(countingDownTime == 0)
    {
        visibleWithScaleAnimation(contentPopUpWait , 0);
        isPlay = true;
        countingDownTime = -1;
        //isLogin();
    }
}