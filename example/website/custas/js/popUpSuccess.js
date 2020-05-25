/**
 * Created by minhvu on 11/7/2015.
 */

var containPopUpSuccess;
containPopUpSuccess = new PIXI.Container();

var backgroundPopUpSuccess;

var heightTextCongratulations = 0;
var heightTextClear = 0;

var timeResult_hangchuc_second ;
var timeResult_hangdonvi_second ;

var timeResult_hangchuc_milessecond ;
var timeResult_hangdonvi_milessecond ;

var text_complete_level;

var text_clear_game ;

var level_clear = 1;

var array_id_level_cleard = [];

var arrayTimePlayedOneLevel = [];

var hangtram_total_second ;
var hangchuc_total_second ;
var hangdonvi_total_second;

var hangchuc_total_miliessecond;
var hangdonvi_total_miliessecond;

var giay_txt ;
function initContainPopUpSuccess()
{
    position(containPopUpSuccess , stageW/2 , stageH/2 - 25*ratio);
    scale(containPopUpSuccess , ratio);
    visible(containPopUpSuccess , 0);
    backgroundPopUpSuccess = new PIXI.Sprite.fromImage('asset/bg/content_success.png');
    ratioOfWidthHeightItem(backgroundPopUpSuccess , 1600);
    anchor(backgroundPopUpSuccess);
    var text_success = new PIXI.Sprite.fromImage('asset/decorate/congratulation_text.png');
    anchor(text_success);

    ratioOfWidthHeightItem(text_success , 1600);

    level_clear = new PIXI.Sprite.fromImage('asset/numberLevel/'+level+'.png');
    anchor(level_clear);
    ratioOfWidthHeightItem(level_clear , 1600);

    text_complete_level = new PIXI.Sprite.fromImage('asset/decorate/finishTxt.png');
    anchor(text_complete_level);
    ratioOfWidthHeightItem(text_complete_level , 1600);

    text_clear_game = new PIXI.Sprite.fromImage('asset/decorate/complete_game_text.png');
    anchor(text_clear_game);
    ratioOfWidthHeightItem(text_clear_game , 1600);
    visible(text_clear_game , 0);

    position(text_complete_level , -level_clear.height , text_success.height);

    position(text_clear_game , 0 , text_success.height);

    position(level_clear , text_complete_level.width/2 , text_success.height );

    containPopUpSuccess.addChild(backgroundPopUpSuccess);
    containPopUpSuccess.addChild(text_success);
    containPopUpSuccess.addChild(text_clear_game);
    containPopUpSuccess.addChild(text_complete_level);
    containPopUpSuccess.addChild(level_clear);

    heightTextCongratulations = text_success.height;
    heightTextClear = text_complete_level.height;

    stage.addChild(containPopUpSuccess);
}

function hangchuc(number)
{
    var hangDonVi = number%10;
    var SohangChuc  = (number*10 - hangDonVi*10)/100;
    return SohangChuc;
}

function hangtram(number)
{
    var hangdonvi = number%100;
    var Sohangtram  = ( number*100 - hangdonvi*100 )/10000;
    return Sohangtram;
}

function settingSuccess() {
    array_id_level_cleard.push(idOfLevelCurrent);

    arrayTimePlayedOneLevel.push({'level': level, 'second': time, 'milessecond': milesSecond});
    //console.log(arrayTimePlayedOneLevel);
    /*if (result_time_milesSecond == 99)
    {
        result_time_second++;
        result_time_milesSecond = 0;
    }*/

    //console.log(wrongTimes);

    var hangchuc_second = hangchuc(result_time_second);
    var hangdonvi_second = result_time_second%10;
    var hangchuc_milesSecond = hangchuc(result_time_milesSecond);
    var hangdonvi_milesSecond = result_time_milesSecond%10;

    var max_heigth = 0;
    var heightLivesItem = 0;

    var img_hangchuc_second = new PIXI.Sprite.fromImage('asset/numberResult/'+hangchuc_second+'.png');
    var img_hangdonvi_second = new PIXI.Sprite.fromImage('asset/numberResult/'+hangdonvi_second+'.png');

    var img_hangchuc_milesSecond = new PIXI.Sprite.fromImage('asset/numberResult/'+hangchuc_milesSecond+'.png');
    var img_hangdonvi_milesSecond = new PIXI.Sprite.fromImage('asset/numberResult/'+hangdonvi_milesSecond+'.png');

    var period= new PIXI.Sprite.fromImage('asset/decorate/period.png');

    var giayTxt = new PIXI.Sprite.fromImage('asset/decorate/giayTxt.png');

    anchor(img_hangchuc_second);
    anchor(img_hangdonvi_second);
    anchor(img_hangchuc_milesSecond);
    anchor(img_hangdonvi_milesSecond);
    anchor(period);
    anchor(giayTxt);

    timeResult_hangchuc_second = img_hangchuc_second;
    timeResult_hangdonvi_second = img_hangdonvi_second;

    timeResult_hangchuc_milessecond = img_hangchuc_milesSecond;
    timeResult_hangdonvi_milessecond = img_hangdonvi_milesSecond;

    giay_txt = giayTxt;

    ratioOfWidthHeightItem(img_hangchuc_second , 1600);
    if(img_hangchuc_second.height > max_heigth)
        max_heigth = img_hangchuc_second.height;
    ratioOfWidthHeightItem(img_hangdonvi_second , 1600);
    if(img_hangdonvi_second.height > max_heigth)
        max_heigth = img_hangdonvi_second.height;
    ratioOfWidthHeightItem(img_hangchuc_milesSecond , 1600);
    if(img_hangchuc_milesSecond.height > max_heigth)
        max_heigth = img_hangchuc_milesSecond.height;
    ratioOfWidthHeightItem(img_hangdonvi_milesSecond , 1600);
    if(img_hangdonvi_milesSecond.height > max_heigth)
        max_heigth = img_hangdonvi_milesSecond.height;
    ratioOfWidthHeightItem(period , 1600);
    ratioOfWidthHeightItem(giayTxt , 1600);



    var positionY  = heightTextClear + heightTextCongratulations + 15*ratio;
    position(img_hangchuc_second , -img_hangdonvi_second.width-period.width-giayTxt.width/2 , positionY);
    position(img_hangdonvi_second , -period.width - 5 - giayTxt.width/2 , positionY);

    position(period , -giayTxt.width/2 , positionY);

    position(img_hangchuc_milesSecond , img_hangdonvi_second.width - period.width/2 - giayTxt.width/2 , positionY);
    position(img_hangdonvi_milesSecond , img_hangchuc_milesSecond.width + img_hangdonvi_second.width - period.width/2 - giayTxt.width/2 , positionY);

    position(giayTxt , img_hangchuc_milesSecond.width + img_hangdonvi_second.width - period.width/2 + giayTxt.width/2 , positionY);


    var btn_replay = new PIXI.Sprite.fromImage('asset/decorate/btn_replay.png');
    anchor(btn_replay);
    ratioOfWidthHeightItem(btn_replay , 1600);
    btn_replay.interactive = true;


    var btn_next = new PIXI.Sprite.fromImage('asset/decorate/btn_next.png');
    anchor(btn_next);
    ratioOfWidthHeightItem(btn_next , 1600);
    btn_next.interactive = true;

    var btn_rank = new PIXI.Sprite.fromImage('asset/decorate/btn_rank.png');
    anchor(btn_rank);
    ratioOfWidthHeightItem(btn_rank , 1600);
    btn_rank.interactive = true;
    visible(btn_rank, 0);

    btn_next.tap = nextGame;
    /*btn_next.click = nextGame;*/
    btn_next.on('mouseup' , nextGame);

    btn_replay.tap = replayTheGame;
    btn_replay.click = replayTheGame;

    btn_rank.tap = goPageRank;
    btn_rank.on('mouseup' , goPageRank);

    var lives_ico_item = new PIXI.Sprite.fromImage('asset/decorate/ico_lives.png');
    var width_ico_lives = lives_ico_item.width;
    heightLivesItem = lives_ico_item.height;

    if(level > 2)
    {
        //var live_lost = 3 - lives;
        //update front end
        anchor(lives_ico_item);
        ratioOfWidthHeightItem(lives_ico_item , 1600);
        var position_lives_x = -lives_ico_item.width;
        /*new*/
        position(lives_ico_item , position_lives_x , positionY + max_heigth + 5*ratio);

        var x = new PIXI.Sprite.fromImage('asset/decorate/x.png');
        anchor(x);
        ratioOfWidthHeightItem(x , 1600);
        position(x , -x.width , positionY + max_heigth + 5*ratio);

        var first = hangchuc(lives);
        var second = lives%10;
        var first_img = new PIXI.Sprite.fromImage('asset/numberRed/'+first+'.png');
        anchor(first_img);
        ratioOfWidthHeightItem(first_img , 1600);
        var second_img = new PIXI.Sprite.fromImage('asset/numberRed/'+second+'.png');
        anchor(second_img);
        ratioOfWidthHeightItem(second_img , 1600);

        position(first_img , x.width , positionY + max_heigth + 5*ratio);
        position(second_img , x.width + first_img.width , positionY + max_heigth + 5*ratio);

        containPopUpSuccess.addChild(lives_ico_item);
        containPopUpSuccess.addChild(x);
        containPopUpSuccess.addChild(first_img);
        containPopUpSuccess.addChild(second_img);
        /*end*/

        /*old*/
        /*for (var i = 0 ; i < lives ; i++)
        {
            var lives_ico = new PIXI.Sprite.fromImage('asset/decorate/ico_lives.png');
            anchor(lives_ico);
            ratioOfWidthHeightItem(lives_ico , 1600);
            position(lives_ico , position_lives_x , positionY + max_heigth + 5*ratio);
            containPopUpSuccess.addChild(lives_ico);
            heightLivesItem = lives_ico.height;
            position_lives_x += lives_ico.width;
        }
        if(live_lost > 0)
        {
            for(var i = 0 ; i < live_lost ; i++)
            {
                var lives_ico = new PIXI.Sprite.fromImage('asset/decorate/ico_lost_lives.png');
                anchor(lives_ico);
                ratioOfWidthHeightItem(lives_ico , 1600);
                position(lives_ico , position_lives_x , positionY + max_heigth + 5*ratio);
                containPopUpSuccess.addChild(lives_ico);
                heightLivesItem = lives_ico.height;
                position_lives_x += lives_ico.width;
            }
        }*/
        /*end*/
    }

    position(btn_rank , btn_rank.width/2 + 5*ratio , max_heigth + positionY + 15*ratio + heightLivesItem);
    position(btn_next , btn_next.width/2 + 5*ratio , max_heigth + positionY + 15*ratio + heightLivesItem);
    position(btn_replay , -btn_replay.width/2 - 5*ratio , max_heigth + positionY + 15*ratio + heightLivesItem);
    /*if(level == 5)
    {*/
        if(level == 5)
        {
            //console.log(arrayTimePlayedOneLevel);
            visible(text_complete_level , 0);
            visible(level_clear , 0);
            visible(text_clear_game , 1);
            visible(btn_rank , 1);
            visible(btn_next , 0);
        }

        /**/

        if(level != 5)
        {
            visible(btn_rank , 0);
            visible(btn_next , 1);
            visible(text_complete_level , 1);
            visible(level_clear , 1);
            visible(text_clear_game , 0);
        }

        /**/

        var hangtram_total_second;
        var hangchuc_total_second;
        var hangdonvi_total_second;
        var hangchuc_total_milessecond;
        var hangdonvi_total_milessecond;
        var total_second = 0;
        var total_milessecond = 0 ;
        //console.log(arrayTimePlayedOneLevel);
        for(var i = 0 ; i < arrayTimePlayedOneLevel.length ; i++)
        {
            total_second += parseInt(arrayTimePlayedOneLevel[i].second);
            total_milessecond += parseInt(arrayTimePlayedOneLevel[i].milessecond);
        }
        if(total_milessecond > 98)
        {
            var secondFrMilessecond = parseInt(total_milessecond/99);
            total_milessecond = total_milessecond - secondFrMilessecond*99;
            total_second += secondFrMilessecond;
        }
        var string = total_second+'.'+total_milessecond;
        console.log('total time :'+string );
        hangtram_total_second = hangtram(total_second);
        hangchuc_total_second = hangchuc(total_second - hangtram_total_second*100);
        hangdonvi_total_second = total_second - hangtram_total_second*100 - hangchuc_total_second*10;

        hangchuc_total_milessecond = hangchuc(total_milessecond);
        hangdonvi_milesSecond = hangchuc_total_milessecond%10;


        //console.log(hangtram_total_second+'_'+hangchuc_total_second+'_'+hangdonvi_total_second);

        var img_hangtram = new PIXI.Sprite.fromImage('asset/numberResult/'+hangtram_total_second+'.png');
        anchor(img_hangtram);
        ratioOfWidthHeightItem(img_hangtram , 1600);
        var img_hangchuc = new PIXI.Sprite.fromImage('asset/numberResult/'+hangchuc_total_second+'.png');
        anchor(img_hangchuc);
        ratioOfWidthHeightItem(img_hangchuc , 1600);
        var img_hangdonvi = new PIXI.Sprite.fromImage('asset/numberResult/'+hangdonvi_total_second+'.png');
        anchor(img_hangdonvi);
        ratioOfWidthHeightItem(img_hangdonvi , 1600);

        var img_hangchuc_total_milessecond = new PIXI.Sprite.fromImage('asset/numberResult/'+hangchuc_total_milessecond+'.png');
        anchor(img_hangchuc_total_milessecond);
        ratioOfWidthHeightItem(img_hangchuc_total_milessecond , 1600);
        var img_hangdonvi_total_milessecond = new PIXI.Sprite.fromImage('asset/numberResult/'+hangdonvi_milesSecond+'.png');
        anchor(img_hangdonvi_total_milessecond);
        ratioOfWidthHeightItem(img_hangdonvi_total_milessecond , 1600);

        position(period , -width_ico_lives/3  , positionY);
        position(img_hangchuc_total_milessecond , -width_ico_lives/3 + period.width*1.5 , positionY);
        position(img_hangdonvi_total_milessecond , -width_ico_lives/3 + period.width*1.5 + img_hangchuc_total_milessecond.width  , positionY);
        position(giayTxt , -width_ico_lives/3 + period.width*1.5 + img_hangchuc_total_milessecond.width + img_hangdonvi_total_milessecond.width + giayTxt.width/2 , positionY);
        position(img_hangtram , -width_ico_lives/3 - period.width*1.5 - img_hangchuc.width - img_hangdonvi.width, positionY);
        position(img_hangchuc , -width_ico_lives/3 - period.width*1.5 - img_hangdonvi.width, positionY);
        position(img_hangdonvi , -width_ico_lives/3 - period.width*1.5 , positionY);
    /*}*/

    containPopUpSuccess.addChild(period);
    if(level < /*5*/ 0 )
    {
        containPopUpSuccess.addChild(img_hangchuc_second);
        containPopUpSuccess.addChild(img_hangdonvi_second);
        containPopUpSuccess.addChild(img_hangdonvi_milesSecond);
        containPopUpSuccess.addChild(img_hangchuc_milesSecond);
    }
    /*else if(level == 5)
    {
        containPopUpSuccess.addChild(img_hangchuc_total_milessecond);
        containPopUpSuccess.addChild(img_hangdonvi_total_milessecond);

        containPopUpSuccess.addChild(img_hangtram);
        containPopUpSuccess.addChild(img_hangchuc);
        containPopUpSuccess.addChild(img_hangdonvi);
    }*/

    containPopUpSuccess.addChild(img_hangchuc_total_milessecond);
    containPopUpSuccess.addChild(img_hangdonvi_total_milessecond);

    containPopUpSuccess.addChild(img_hangtram);
    containPopUpSuccess.addChild(img_hangchuc);
    containPopUpSuccess.addChild(img_hangdonvi);


    containPopUpSuccess.addChild(giayTxt);

    containPopUpSuccess.addChild(btn_replay);
    containPopUpSuccess.addChild(btn_next);
    containPopUpSuccess.addChild(btn_rank);
    stage.addChild(containPopUpSuccess);

}

function clearAllChildrenInContain(contain)
{
    for(var i = 0 ; i < contain.children.length ; i++)
    {
        if(contain.children[i].children.length != 0)
        {
            clearAllChildrenInContainChildren(contain.children[i]);
        }
        else
        {
            visible(contain.children[i] , 0);
        }
    }
}
function clearAllChildrenInContainChildren(containChildren)
{
    for ( var i = 0 ; i < containChildren.children.length ; i++)
    {
        if(containChildren.children[i].children.length != 0)
        {
            clearAllChildrenInContainChildren(containChildren.children[i]);
        }
        else
        {
            visible(containChildren.children[i] , 0);
        }
    }
}

function resetSettingArray()
{
    score = 0;
    arrayHoleItem = [];
    arrayHolder = [];
    arrayComplete = [];
    arrayHolding = [];
    arrayLighting = [];
    arrayItemMenuActive = [];
    arrayCheck = [];
    ItemNameCurrent = '';
    time = 0;
    milesSecond = 99;
    win = false;
    arrayDataLevel = [];
    arrayAnimationDetail = [];
    arrayAnimation = [];
    idArrayAnimation = 0;

    wrongTimes = 0;

    clearInterval(timeAnimation1); // clear to reset interval
    clearInterval(timeAnimation2); // clear to reset interval
    clearInterval(timeAnimation3); // clear to reset interval

    visible(timeResult_hangchuc_second , 0) ;
    visible(timeResult_hangdonvi_second , 0) ;

    visible(timeResult_hangchuc_milessecond , 0) ;
    visible(timeResult_hangdonvi_milessecond , 0) ;
    visible(giay_txt ,0);

    visible(containPopUpSuccess.children,0);
    arraySorted = [];
    arraySortListMenu = [];
}

function nextGame()
{
    // click to next level]
    //level++;
    if(level == 2)
    {
        if(!activedCode)
        {
            visibleWithAnimation(containAllExceptPopUpContain , 0);
            visibleWithScaleAnimation(containPopUpRotateNoti , 0);
            visibleWithScaleAnimation(containPopUpSuccess , 0);
            visibleWithScaleAnimation(containPopUpbackGround , 1);
            visibleWithScaleAnimation(containPopUpEnterCode , 1);
            checkContinue = false;
        }
        else if(lives == 0)
        {
            activedCode = false ;
            checkContinue = false ;
        }
    }
    if(level < findMaxTotalLevel() + 1 && checkContinue)
    {

        level++;
        resetSettingArray();
        inputCode.value = '';
        /*console.log(contain_item.children);*/
        for(var i = 0 ; i < contain_item.children.length ; i++)
        {
            //visible(contain_item.children[i],0); // tat item cua level truoc
            contain_item.removeChild(contain_item.children[i]);
        }
        for(var i = 0 ; i < wrapBtn.children.length ; i++)
        {
            //visible(wrapBtn.children[i],0); // tat item cua level truoc
            wrapBtn.removeChild(wrapBtn.children[i]);
        }
        visible(contain_background.children[0],0);
        clearAllChildrenInContain(containAllExceptPopUpContain);

        initContainItem();
        initLevel();// toan bo setting cua background , item , button cua level game deu nam trong day
        initbase(); // tao background cho khung game
        //time and lives
        initContainTimeAdnLives();
        initContainLevel();

        //play button & setting
        initContainBtn();
        ItemMenuholding();
        //popup
        initContainPopUpSuccess();
        /*console.log(contain_background.children);*/

        visibleWithAnimation(containAllExceptPopUpContain , 1);
        visibleWithScaleAnimation(containPopUpRotateNoti , 0);
        visibleWithScaleAnimation(containPopUpbackGround , 0);
        visibleWithScaleAnimation(containPopUpSuccess , 0);
        visibleWithScaleAnimation(containPopUpEnterCode , 0);

    }
    else
    {
        //level--;
        //console.log('level max :'+ findMaxTotalLevel()+' level curent'+ level);
        //console.log('max level roi!!!!!!!!');
    }
}

function replayTheGame()
{
    // click to replay Game
    inputCode.blur();
    clearWinAllLevelBeforeLevelWantReplay(idOfLevelCurrent);

    arrayTimePlayedOneLevel = [];

    checkContinue = true;
    if(level > 2)
    {
        if(lives > 0)
            lives--;
        else if (lives)
        {
            activedCode = false;
        }
    }
    level = 1; // replay lai tu man level 1
    resetSettingArray();
    for(var i = 0 ; i < contain_item.children.length ; i++)
    {
        //visible(contain_item.children[i],0); // tat item cua level truoc
        contain_item.removeChild(contain_item.children[i]);
    }
    for(var j = 0 ; j < wrapBtn.children.length ; j++)
    {
        //visible(wrapBtn.children[j],0);
        wrapBtn.removeChild(wrapBtn.children[i]);
    }
    visible(contain_background.children[0],0);
    clearAllChildrenInContain(containAllExceptPopUpContain);
    initContainItem();
    initLevel();// toan bo setting cua background , item , button cua level game deu nam trong day
    initbase(); // tao background cho khung game
    //time and lives
    initContainTimeAdnLives();
    initContainLevel();

    //play button & setting
    initContainBtn();
    ItemMenuholding();
    //popup
    initContainPopUpSuccess();

    visible(containAllExceptPopUpContain , 1);
    visible(containPopUpRotateNoti , 0);
    visible(containPopUpbackGround , 0);
    visible(containPopUpSuccess , 0);
    visible(containPopUpEnterCode , 0);

    /*resetTheGame();
    visible(containAllExceptPopUpContain , 1);
    visible(containPopUpRotateNoti , 0);
    visible(containPopUpbackGround , 0);
    visible(containPopUpSuccess , 0);*/
}

function clearWinAllLevelBeforeLevelWantReplay(idLeveCurrent , levelCurrent)
{
    for (var i = 0 ; i < array_id_level_cleard.length ; i++)
    {
        for ( var j = 0 ; j < array_level.length ; j++)
        {
            if(array_id_level_cleard[i] == array_level[j].id)
            {
                array_level[j].complete = false;
            }
        }
    }
    //console.log(array_level);
}

function resetTheGame() // replay lai man vua choi xong
{
    arrayComplete = [];
    time = time_replay;
    win = false;
    score = 0;
    /*stopCd = false;*/

    for (var i = 0 ; i < array_level.length ; i++)
    {
        if(idOfLevelCurrent == array_level[i].id)
        {
            array_level[i].complete = false;
        }
    }

    for (var i = 0 ; i < arrayItemMenuActive.length ; i++)
    {
        visible(arrayHolder[i] , 1);
        visible(arrayLighting[i],0);
        visible(arrayHolding[i] , 0);
        visible(arrayItemMenuActive[i] , 0);
        visible(arrayItemMenuUnactive[i] , 1);
        visible(arrayCheck[i],0);
        arrayHoleItem[i].position.x = menuOffsetX - menuBg.width/4 + menuDisPerItem*i ;
        visible(arrayHoleItem[i] , 0);
    }
    for (var i = 0 ; i < 3 ; i++)
    {
        visible(arrayHoleItem[i] ,1);
    }

    visible(arrayHolding[0] , 1);
    visible(arrayHolder[0] , 0);
    visible(arrayLighting[0] , 1);
    ItemNameCurrent = arrayItemMenuActive[0].name;

    visible(timeResult_hangchuc_second , 0) ;
    visible(timeResult_hangdonvi_second , 0) ;

    visible(timeResult_hangchuc_milessecond , 0) ;
    visible(timeResult_hangdonvi_milessecond , 0) ;
    visible(giay_txt ,0);

}

function showPopUpSuccess()
{
    if(win)
    {
        visibleWithAnimation(containAllExceptPopUpContain , 0);
        visibleWithScaleAnimation(containPopUpRotateNoti , 0);
        visibleWithScaleAnimation(containPopUpbackGround , 1);
        visibleWithScaleAnimation(containPopUpSuccess , 1);

        settingSuccess();
    }
    else
    {
        visibleWithAnimation(containAllExceptPopUpContain , 1);
        visibleWithScaleAnimation(containPopUpSuccess , 0);
    }
}

function goPageRank()
{
    window.location.href = 'https://www.google.com/?gws_rd=ssl';
}