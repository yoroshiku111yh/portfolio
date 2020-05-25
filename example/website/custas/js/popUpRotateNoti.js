/**
 * Created by minhvu on 11/7/2015.
 */
var containPopUpbackGround;
var containPopUpRotateNoti;
containPopUpRotateNoti = new PIXI.Container();
containPopUpbackGround = new PIXI.Container();

var background_white ;

function initContainPopUpbackGround()
{
    background_white = new PIXI.Sprite.fromImage('asset/bg/bg_white.png');
    anchor(background_white);

    background_white.width = stageW*2;
    background_white.height = stageH*2;
    background_white.alpha = 0;

    position(containPopUpbackGround , stageW/2 , stageH/2);
    scale(containPopUpbackGround , ratio);
    containPopUpbackGround.addChild(background_white);
    visible(containPopUpbackGround , 0);
    stage.addChild(containPopUpbackGround);
}


function initContainPopUpRotateNoti()
{
    position(containPopUpRotateNoti , stageW/2 , stageH/2);
    scale(containPopUpRotateNoti , ratio);
    var background = new PIXI.Sprite.fromImage('asset/bg/rotate_noti.png');
    anchor(background);
    ratioOfWidthHeightItem(background , 2200);
    containPopUpRotateNoti.addChild(background);
    visible(containPopUpRotateNoti , 0);
    stage.addChild(containPopUpRotateNoti);
}
function showPopUpRotate()
{
    if(stopToRotate )
    {
        visible(containAllExceptPopUpContain , 0);
        visible(containPopUpSuccess , 0);
        visible(containPopUpEnterCode , 0);
        visible(containPopUpbackGround , 1);
        visible(containPopUpRotateNoti , 1);
    }
    else
    {
        if(!win)
        {
            visible(containAllExceptPopUpContain , 1);
            visible(containPopUpbackGround , 0);
            visible(containPopUpRotateNoti , 0);
            visible(containPopUpSuccess , 0);
            visible(containPopUpEnterCode , 0);
        }
        else
        {
            visible(containAllExceptPopUpContain , 0);
            visible(containPopUpRotateNoti , 0);
            visible(containPopUpbackGround , 1);
            visible(containPopUpSuccess , 1);
            console.log(level+'current');
            if(level == 2 && !checkContinue) //
            {
                console.log('goal');
                visible(containPopUpSuccess , 0);
                visible(containPopUpEnterCode , 1);
            }
        }
    }
}

