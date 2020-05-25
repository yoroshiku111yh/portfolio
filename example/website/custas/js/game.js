/**
 * Created by minhvu on 10/21/2015.
<<<<<<< HEAD
 *
 *
=======
 * game v1.1
>>>>>>> 267ea9773767c0cd1c4dcb65bfc8e47a064e5e2e
 */



$(document).ready(function(){
    init();
});


/**
 * STAGE INIT
 */
var stageW;
var stageH;
var renderer;
var stage ;
/*
 PRELOADER
 */
var preloadTxt;
var preLoadLoader;
var preloadMainfest;

var loader;
var loadManifest;

/*
 DEBUG
 */
var isDebug;
var traceText;
var debugPositionIndicator;
var debugSelectedTarget;

/*
 PAGE VAR
 */
var isPlay = false;
var firstLoaded;
var time = 0;
var level = 1; // level playing
var idOfLevelCurrent = 0;
var time_replay = 0;
var milesSecond = 99;
var ratio = 1;
var contain_background;
var background;
var contain_item;
/*var contain_cd;*/
var timeID ;
var containLives;
var score = 0;
var scoreToWin = 0;
var currentBtn = -1;
var stopCd = false;
var stopToRotate = false;
var win = false;
var btnRestart ;
var btnNext;
var checkPopUpResult = false;
var lives = 0;  // DEFAULT LIVES = 3
var result_time = '';
var result_time_second = 0;
var result_time_milesSecond = 0;
var loseText = 'You Lose';
var winText  = 'You Win';

var background_base;

var timerFirstNum;
var timerSecNum;
var greenNumTextureArray = [];

var pointIndicator;

var wrongTimes = 0;


var popUpResult;
var containBackgroundForAll;
var containBase;
var containTimeAndLives
var containTime;
var containLevel ;
var containBtn ;
var wrapBtn ;
var ItemNameCurrent = '';
var totalItemInListMenuActive = 0;
var contain_popup;
var backgroundWindow ;

var containAllExceptPopUpContain;
var containPopUpEnterCode;

var inputCode ;
var checkContinue = true;
var activedCode = false;

var menuBg;
var menuOffsetX;
var menuDisPerItem;

var arraySortListMenu = [];
var arraySorted = [];

contain_item = new PIXI.Container();
containLives = new PIXI.Container();
contain_popup = new PIXI.Container();
popUpResult = new PIXI.Container();
containBackgroundForAll = new PIXI.Container();
containBase = new PIXI.Container();
containTimeAndLives = new PIXI.Container();
containTime = new PIXI.Container();
containLevel = new PIXI.Container();
containBtn = new PIXI.Container();
wrapBtn = new PIXI.Container();
containAllExceptPopUpContain = new PIXI.Container();
containPopUpEnterCode = new PIXI.Container();
/*array object choice*/

var arrayNumberGreenHangChuc = [];
var arrayNumberGreenHangDonVi = [];
var arrayNumberRed = [];
var arrayItemMenuActive = [];
var arrayItemMenuUnactive = [];
var arrayCheck = [];
var arrayLighting = [];

var arrayHolding = [];
var arrayHolder = [];

var arrayHoleItem = [];
var arrayComplete = [];

var array_level_total = new Array() ;

/*---------------*/
var debuging = false;
/*---------------*/
/**/

function checkMobile()
{
    var isMobile = false; //initiate as false
// device detection
    if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
        || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) isMobile = true;
    return isMobile;
}

function init()
{
    stage = new PIXI.Container();
    stageW = 800;
    stageH = 600;
    var w = $(window).width();
    var h = $(window).height();
    if(w  > 1199)
        h -= $('header').outerHeight();
    if(!debuging)
    {
        stageW = w;
        stageH = h;
    }
    if(w > h)
    {
        console.log('landscape');
        stopToRotate = false;
        showPopUpRotate();
    }
    else
    {
        console.log('portrait');
        stopToRotate = true;
        showPopUpRotate();
        //askForRotateScreenToPlayTheGame();
    }
    ratio = stageH/600;
    if(checkMobile())
    {
        ratio = ratio + 0.25;
    }
    //console.log(ratio+' ratio');
    renderer = PIXI.autoDetectRenderer(stageW,stageH, {antialias:true});
    renderer.resize(stageW, stageH);
    document.body.appendChild(renderer.view);
    animate();
    initPreload();
}


function animate() {
    requestAnimationFrame(animate);
    renderer.render(stage)
}


function initPreload(){
    /*preloadManifest = [];
     preloadLoader = new PIXI.AssetLoader(preloadManifest);
     preloadLoader.on("onComplete", preloadReady);
     preloadLoader.load();*/
    preloadReady();
}
function preloadReady(e)
{
    preloadTxt = new PIXI.Text("0%",{ font: "40px Arial", fill: "#ffffff", align: "center"});
    anchor(preloadTxt)
    preloadTxt.position.x = (stageW)/2;
    preloadTxt.position.y = (stageH)/2;

    for(var i = 0; i < preloadTxt.children.length; i++){
        preloadTxt.children[i].tint = 0xff0000;
    }

    stage.addChild(preloadTxt);

    /*all image*/
    loadManifest = arrayLoadItem;

    loader = new PIXI.loaders.Loader();
    loader.add(loadManifest);

    loader.on("progress", assetLoadProgress);
    loader.on("complete", assetLoadComplete);

    loader.load();
}



function assetLoadProgress(e) {

    var perText = Math.round(e.progress) + "%";
    preloadTxt.text = perText;
}

function isLogin()
{
    $.get('game/start', function(response){
        if(response.code == 1){
            arraySortListMenu = response.data;
            return true;
        }else{
            alert(response.msg);
            return false;
        }
    }, 'json')
}
function assetLoadComplete(e) {

    firstLoaded = true;
    isDebug = false;

    /*if(isLogin())*/
    initStage();

    if(checkMobile())
    {
        $('.sideScroll').css({'display' : 'block'});
        $('body').css({'overflow' : 'auto'});
    }

    var g = new PIXI.Graphics();
    g.lineStyle(2, 0x000000, 1);
    g.beginFill(0x000000, 1);
    g.drawRect(0, 0, stageW, stageH);
    g.endFill();
    stage.addChild(g);
    stage.setChildIndex(preloadTxt, stage.children.length - 1 );

    TweenMax.to(preloadTxt.scale,.5, {x:2, y:2, ease:Quint.easeOut});
    TweenMax.to(preloadTxt,.3, {alpha:0, ease:Sine.easeOut});

    TweenMax.to(g,.3, {alpha:0, ease:Sine.easeOut, onComplete:function(){
        stage.removeChild(g);
        g = null;
    }})


    //in every move check weather there is a matched candy or return the position;
    if(debuging)
    {
        DEBUG();
    }
}

function initStage()
{
    initBackground(); // tao background cho nguyen trinh duyet
    /*background & item*/
    initAllContainexceptPoUpContain();
    initContainItem();
    initLevel();// toan bo setting cua background , item , button cua level game deu nam trong day
    if(!debuging)
    {
        initbase(); // tao background cho khung game
         //time and lives
         initContainTimeAdnLives();
         initContainLevel();

         //play button & setting
         initContainBtn();
         ItemMenuholding();

         //popup
         initContainPopUpbackGround();
         initContainPopUpRotateNoti();

         initContainPopUpSuccess();
         initPopUpEnterCode();

         initPopUpWait();

         $(window).on("resize",fnResize);
         fnResize();
        $(window).on("resize",fnResizeWait);
        fnResizeWait();
    }

    /**/
}
var arrayDataLevel = [];
function dataOfLevel(dataBtn)
{
    for ( var i = 0 ; i < dataBtn.length ; i++)
    {
        arrayDataLevel.push(dataBtn[i].name);
    }
}

function anchor(item)
{
    item.anchor.x = 0.5;
    item.anchor.y = 0.5;
}
function position(item , x , y)
{
    item.position.x = x;
    item.position.y = y;
}
function scale(item , value)
{
    item.scale.x = value;
    item.scale.y = value;
}

function visible(item, value){
    item.visible = (value == 0) ? false : true;
    item.alpha = value;
}

function visibleWithAnimation(item , value)
{
    switch (value){
        case 0:
            TweenMax.to(item,.3, {alpha:value, ease:Sine.easeOut, onCompleteParams:[item], onComplete:function(target){
                target.visible = false;
            }})
            break;
        case 1:
            item.alpha = 0;
            item.visible = true;
            TweenMax.to(item,.3, {alpha:value, ease:Sine.easeOut});
            break;
    }
}

function visibleWithScaleAnimation(item , value){
    item.sx = item.scale.x;
    item.sy = item.scale.y;
    TweenMax.killTweensOf(item)
    switch (value){
        case 0:
            TweenMax.to(item,.3, {alpha:value, ease:Sine.easeOut, onCompleteParams:[item], onComplete:function(target){
                target.visible = false;
            }});
            TweenMax.to(item.scale,.5, {x:item.sx +.3, y:item.sy +.3, ease:Quint.easeOut, onCompleteParams:[item], onComplete:function(target){
                target.scale.x = item.sx
                target.scale.y = item.sy
            }});
            break;
        case 1:
            item.alpha = 0;
            item.visible = true;
            TweenMax.to(item,.3, {alpha:value, ease:Sine.easeOut});
            TweenMax.from(item.scale, 1, {x:item.sx + .3, y:item.sy +.3, ease:Elastic.easeOut})
            break;
    }
}

function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function ratioOfWidthHeightItem(item , design)
{
    // all setting now in 800x600 size
    var ratios = design/800;
    item.width = item.width/ratios;
    item.height = item.height/ratios;
}

function cutStringGetSize(urlBg)
{
    var string = urlBg;
    var find_size = string.indexOf("size");
    var positionSizeInString = find_size + 5;
    var size = parseInt(string.substring(positionSizeInString , string.length - 4 ));
    return size;
}

function initAllContainexceptPoUpContain()
{


    position(containAllExceptPopUpContain, 0, 0);

    stage.addChild(containAllExceptPopUpContain);

}

function initBackground()
{
    var texture = PIXI.Texture.fromImage('asset/bg/background.png');
    backgroundWindow = new PIXI.Sprite(texture);
    position(containBackgroundForAll ,stageW/2 , stageH/2 );
    backgroundWindow.width = stageW+5;
    backgroundWindow.height = stageH;
    anchor(backgroundWindow);
    containBackgroundForAll.addChild(backgroundWindow);
    stage.addChild(containBackgroundForAll);
}

function initContainItem()
{
    position(contain_item, stageW/2 , stageH/2 + 40*ratio);
    scale(contain_item , ratio);

    if(debuging)
    {
        stage.addChild(contain_item); // khi nao debug mo len , tat dong duoi
    }
    else
    {
        containAllExceptPopUpContain.addChild(contain_item);
    }
}

function initbase()
{
    var texture = PIXI.Texture.fromImage('asset/decorate/base.png');
    background_base = new PIXI.Sprite(texture);
    anchor(background_base);

   /* background.width = 1330/ratioOfWidthHeightItem(ba);
    background.height = 970/2;*/
    ratioOfWidthHeightItem(background_base , 1600);

    //position(containBase ,stageW/2 , stageH/2 );
    scale(containBase , ratio);
    containBase.addChild(background_base);
    //stage.addChild(containBase);
    containAllExceptPopUpContain.addChild(containBase);
}

function initBg(bg)
{
    var size = cutStringGetSize(bg);
    var texture = PIXI.Texture.fromImage(bg);
    background = new PIXI.Sprite(texture);
    /*background.width = 954/2;
    background.height = 652/2;*/
    //.log(background.width+'background_level');
    ratioOfWidthHeightItem(background , size);
    //console.log(background.width+'background_level');
    background.name = 'bg';
    anchor(background);
    contain_background = new PIXI.Container();
    position(contain_background , stageW/2 + 5*ratio , stageH/2 + 35*ratio)
    scale(contain_background , ratio);
    contain_background.addChild(background);
    if(debuging)
    {
        stage.addChild(contain_background); // khi nao debug thi mo len , dong dong duoi
    }
    else
    {
        containAllExceptPopUpContain.addChild(contain_background);
    }
}
function findMaxTotalLevel()
{
    var max = 0;
    $.each(array_level , function(key , value){
        if(max < value.level)
            max = value.level;
    });
    return max ;
}
function calcuTotalLevelMap()
{
    var level = 1 ;
    var totalLevel = findMaxTotalLevel();
    for ( var i = 1 ; i < totalLevel+1 ; i++)
    {
        var idLevelSame = [];
        level = i;
        $.each( array_level, function( key, value ){
            if(level == value.level)
            {
                idLevelSame.push(value.id);
            }
        });
        array_level_total.push({'level' : level , 'idArray' : idLevelSame})
    }
}

function initLevel()
{
    //console.log('alooo');
    calcuTotalLevelMap();
    var lengthArrayLevelPlayIng = 0;
    var id_level_will_play = 0;
    $.each(array_level_total , function(id , array){
        if(level == array.level)
        {
            lengthArrayLevelPlayIng = array.idArray.length;
            var random_id_in_array = getRandomInt(0 , lengthArrayLevelPlayIng-1); // random map level in same level
            /*console.log(array.idArray);
            console.log(random_id_in_array);*/
            id_level_will_play = array.idArray[random_id_in_array];
            return false;
        }
    });
    /*console.log('id_level_will_play :' + id_level_will_play);
    console.log()*/
    $.each( array_level, function( key, value ) {
        if(!value.complete && id_level_will_play == value.id ) // nếu gặp màn chưa clear thì sẽ lấy giá trị màn đó mà chơi
        {
            var fn = eval(value.data);
            initBg(value.background); // setting backgound of stage level
            settingDataOfLevel(value.data); // setting item of stage level
            settingBtnOfLevel(value.btn); // setting button of stage level
            time = value.time ; // time of level
            time_replay = value.time ; // time to replay .
            level = value.level;
            idOfLevelCurrent = value.id;
            scoreToWin = value.score;
            /*console.log('idPlay :' + idOfLevelCurrent);*/
            return false;
        }
    });
}

function settingDataOfLevel(datalevel)
{
    var fn = eval(datalevel);
    var data = fn();
    $.each( data, function( key, value ) {
        /*var texture = PIXI.Texture.*/
        var Item = new PIXI.Sprite.fromImage(value.url);;
        anchor(Item);
        /*Item.width = Item.width/2;
        Item.height = Item.height/2;*/
        ratioOfWidthHeightItem(Item , 1600);
        Item.name   = value.name;
        Item.type   = value.type;
        var effect = value.effect;
        if(effect != '')
        {
            var fnEffect = eval(effect);
            fnEffect(Item);
        }
        position(Item ,value.positionX , value.positionY );
        Item.interactive = true;
        Item.tap = ItemChoicing;
        Item.click = ItemChoicing;

        Item.on('mouseover', hoverItem);
        Item.on('mouseout', hoverOutItem);

        position(contain_item ,stageW/2 , stageH/2 );
        contain_item.addChild(Item);
        if(debuging)
        {
            stage.addChild(contain_item); // khi nao debug thi mo dong nay , dong dong duoi
        }
        else
        {
            containAllExceptPopUpContain.addChild(contain_item);
        }
    });
}
function hoverItem(e)
{
    var item = this;
    //if($.inArray(item.name,arrayDataLevel) != -1)
    TweenMax.to(item, .3, {alpha:0.5, yoyo:true, repeat:-1, ease:Sine.easeOut});
}

function hoverOutItem()
{
    var item = this;
    //if($.inArray(item.name,arrayDataLevel) != -1)
    TweenMax.to(item, .3, {alpha:1, ease:Sine.easeOut});
}

function sortListMenu(data)
{
    for(var i = 0 ; i < arraySortListMenu.length ; i++)
    {
        $.each(data, function (key, value){
            if(arraySortListMenu[i] == value.name)
            {
                arraySorted.push(value);
            }
        });
    }
}

function settingBtnOfLevel(btn)
{

    menuBg = new PIXI.Sprite.fromImage('asset/decorate/bg_containt_btn.png');
    anchor(menuBg);
    /*menuBg.width = menuBg.width/2;
    menuBg.height = menuBg.height/2;*/
    ratioOfWidthHeightItem(menuBg , 1600);
    containBtn.addChild(menuBg);

    menuOffsetX = 25;
    menuDisPerItem = (menuBg.width/2 - menuOffsetX*2)/2 ;


    var fn = eval(btn);
    var data = fn();
    sortListMenu(data);
    var item_count = 1;
    var positionX = -100/ratio;

    var menuItemArray = [];
    var currentItemID = 0;

    dataOfLevel(data);

    //scale(wrapBtn , ratio);
    position(wrapBtn , 0, 0 );
    $.each(data, function( key, value){
        var bg_btn = new PIXI.Sprite.fromImage('asset/decorate/base_btn.png');
        anchor(bg_btn);
        var bg_btn_holding = new PIXI.Sprite.fromImage('asset/decorate/base_btn_holding.png');
        anchor(bg_btn_holding);
        var check = new PIXI.Sprite.fromImage('asset/decorate/ico_check.png');
        anchor(check);
        check.name = 'check';

        var imgActive = new PIXI.Sprite.fromImage(value.url_actived);
        imgActive.name = value.name;
        anchor(imgActive);

        var imgUnactive = new PIXI.Sprite.fromImage(value.url_unactived);
        imgUnactive.name = value.name;
        anchor(imgUnactive);
        var menuItem = new PIXI.Container();

        var lighting = new PIXI.Sprite.fromImage('asset/decorate/lighting.png');
        anchor(lighting);
        lighting.width = lighting.width/2;
        lighting.height = lighting.height/2;
        position(lighting , -2 , 1);
        visible(lighting,0);

        /*bg_btn_holding.width = bg_btn_holding.width/2 ;
        bg_btn_holding.height = bg_btn_holding.height/2;*/
        ratioOfWidthHeightItem(bg_btn_holding , 1600);
        bg_btn_holding.alpha = 0;
        bg_btn_holding.visible = false;

        /*bg_btn.width = bg_btn.width/2;
        bg_btn.height = bg_btn.height/2;*/
        ratioOfWidthHeightItem(bg_btn , 1600);
        bg_btn.alpha = 1;
        bg_btn.visible = true;

        if(level < 2)
        {
            visible(imgActive , 0);
            visible(imgUnactive , 1);
        }
        else
        {
            visible(imgActive , 1);
            visible(imgUnactive , 0);
        }

        /*imgActive.width = imgActive.width/2;
        imgActive.height = imgActive.height/2;*/
        ratioOfWidthHeightItem(imgActive , 1600);

        /*imgUnactive.height = imgUnactive.height/2;
        imgUnactive.width = imgUnactive.width/2;*/
        ratioOfWidthHeightItem(imgUnactive , 1600);

        position(imgUnactive , -3 , 1);
        position(imgActive , -3 , 1);

        /*check.visible = false;
        check.alpha = 0;*/
        visible(check , 0);
        /*check.width = check.width/2 ;
        check.height = check.height/2;*/
        ratioOfWidthHeightItem(check , 1600);
        position(check , 11, -8);
        bg_btn.name = value.name;
        menuItem.addChild(bg_btn);
        menuItem.addChild(bg_btn_holding);
        menuItem.addChild(lighting);
        menuItem.addChild(imgUnactive);
        menuItem.addChild(imgActive);
        menuItem.addChild(check);
        menuItem.name = value.name;
        if(item_count <= 3)
        {
            menuItem.alpha = 1;
            menuItem.visible = true;
        }
        else
        {
            menuItem.alpha = 0;
            menuItem.visible = false;
        }

        menuItem.position.x = menuOffsetX - menuBg.width/4 + menuDisPerItem*value.id;
        menuItem.x0 = menuItem.position.x;

        item_count++;
        arrayItemMenuActive.push(imgActive);
        arrayItemMenuUnactive.push(imgUnactive);

        arrayHolder.push(bg_btn);
        arrayHolding.push(bg_btn_holding);

        arrayHoleItem.push(menuItem);

        arrayCheck.push(check);

        wrapBtn.addChild(menuItem);

        //menuItemArray.push(menuItem);

        arrayLighting.push(lighting);

    });

}
var audioElement = document.createElement('audio');
function soundEffect(sound)
{
    var audio = sound;
    audioElement.setAttribute('src', audio);
    audioElement.setAttribute('autoplay' , 'autoplay');
    audioElement.addEventListener('load' , function(){
        audioElement.play();
    }, true);
    audioElement.addEventListener('ended' , function(){
        end = true;
    });
    audioElement.volume = 0.5;
}

function ItemChoicing(e)
{
    var pos = e.data.getLocalPosition(stage);
    addCandyEffectAt(pos.x,pos.y);

    if(/*!stopCd && */!stopToRotate || !win)
    {

        var item = this;
        var name = item.name;
        if(name == ItemNameCurrent && $.inArray(name,arrayComplete) == -1 && $.inArray(name,arrayDataLevel) != -1)
        {

            soundEffect('sound/correct.mp3');
            audioElement.play();

            visible(arrayLighting[score],0);

            visible(arrayHolder[score] , 1);

            visible(arrayHolding[score] , 0);

            visible(arrayItemMenuActive[score] , 1);

            visible(arrayItemMenuUnactive[score] , 0);

            visible(arrayCheck[score],1);

            ItemMenuUnvisible(score);
            ItemMenuholdNext(score);

            scale(arrayItemMenuActive[score] , 0.5);
            scale(arrayItemMenuUnactive[score] , 0.5);

            score++;
            //console.log('score :' + score);
            if(totalItemInListMenuActive != 2)
                totalItemInListMenuActive++;
            else
                totalItemInListMenuActive = 1;
            arrayComplete.push(name);
            //console.log(totalItemInListMenuActive);
            ItemMenuholding();
            if(score == /*10*/ scoreToWin)
            {

                soundEffect('sound/winning_2.mp3');
                audioElement.play();

                /*stopCd = true;*/
                win = true;
                showPopUpSuccess();
                /**/
                for (var i = 0 ; i < array_level.length ; i++)
                {
                    if(idOfLevelCurrent == array_level[i].id)
                    {
                        array_level[i].complete = true;
                    }
                }
                //console.log(array_level);
                /**/
            }
        }
        else if(name != ItemNameCurrent && $.inArray(name,arrayComplete) == -1)
        {
            soundEffect('sound/wrong_position_4.mp3');
            audioElement.play();
            animatePointIndicator();
            time += 10;
            wrongTimes++;

        }
    }
}

function ItemMenuholding()
{
    //console.log(score);
    if(score < scoreToWin)
    {
        //console.log(arrayHolding[score]);
        visible(arrayHolder[score], 0);
        visibleWithAnimation(arrayHolding[score],1)
        visibleWithAnimation(arrayLighting[score] , 1);
        ItemNameCurrent = arrayItemMenuActive[score].name;
        if(checkMobile() && stageW < 700)
        {
            console.log(arrayItemMenuActive[score].scale.x +'/'+ arrayItemMenuActive[score].scale.y );
            scale(arrayItemMenuActive[score] , ratio*1.05);
            scale(arrayItemMenuUnactive[score] , ratio*1.05);
            console.log(arrayItemMenuActive[score].scale.x +'/'+ arrayItemMenuActive[score].scale.y );
        }
        else
        {
            console.log('hello you miss.');
            scale(arrayItemMenuActive[score] , ratio*0.53);
            scale(arrayItemMenuUnactive[score] , ratio*0.53);
        }
    }
}

function ItemMenuUnvisible(idItem) {
    var offsetX =  menuOffsetX - menuBg.width/4;

    if (idItem < scoreToWin - 1 && idItem > 0) {
        /*visible(arrayHoleItem[idItem-totalItemInListMenuActive] ,0);*/

        for (var i = 0; i < arrayHoleItem.length; i++) {
            var item = arrayHoleItem[i];
            TweenMax.killTweensOf(item);

            if(i == idItem - 1){
                //invisible all useless actived item
                TweenMax.to(item, .1, {alpha:0, ease:Sine.easeOut, onCompleteParams:[item, 0], onComplete:visible});
            }else{
                TweenMax.to(item.position, .5, {x: offsetX + menuDisPerItem*(i - idItem), ease:Back.easeOut});
            }
        }
    }
}
function ItemMenuholdNext(idItem)
{
    if(idItem < scoreToWin - 2 && idItem > 0 )
    {
        /*visible(arrayHoleItem[idItem - totalItemInListMenuActive] , 1);*/
        visibleWithAnimation(arrayHoleItem[idItem + 2] , 1);
    }
}
function initContainTimeAdnLives()
{
    position(containTimeAndLives , stageW/2 ,stageH/2 );
    scale(containTimeAndLives , ratio);
    initTime();
    initLives();
    //stage.addChild(containTimeAndLives);
}
function initTime()
{
    var clock = new PIXI.Sprite.fromImage('asset/decorate/clock.png');
    anchor(clock);
    /*clock.width = clock.width/2;
    clock.height = clock.height/2;*/
    ratioOfWidthHeightItem(clock , 1600);
    position(clock , 94 , -147);
    var hold_clock = new PIXI.Sprite.fromImage('asset/decorate/hold_circle.png');
    anchor(hold_clock);
    /*hold_clock.width = hold_clock.width/2;
    hold_clock.height = hold_clock.height/2;*/
    ratioOfWidthHeightItem(hold_clock , 1600);
    position(hold_clock , 94 , -147);
    var hold_all = new PIXI.Sprite.fromImage('asset/decorate/hold_values.png');
    anchor(hold_all);
    /*hold_all.width  = hold_all.width/2;
    hold_all.height  = hold_all.height/2;*/
    ratioOfWidthHeightItem(hold_all , 1600);
    position(hold_all , 139 , -147);
    containTimeAndLives.addChild(hold_all);
    containTimeAndLives.addChild(hold_clock);
    containTimeAndLives.addChild(clock);


    initTimeCD();
    initTimeAdding();

    clearInterval(timeID); // clear to reset interval

    timeID = setInterval(doCount, 10);


    //timeID = setInterval(doCount, 10);
    //containTimeAndLives.addChild(containTime);
}

function initTimeAdding(){
    pointIndicator = createPointIndicator(10)
    ratioOfWidthHeightItem(pointIndicator , 1600);
    pointIndicator.position.x = timerFirstNum.position.x + pointIndicator.width/2 - 5;
    pointIndicator.position.y = timerFirstNum.position.y + pointIndicator.height/2;

    pointIndicator.x0 = pointIndicator.position.x;
    pointIndicator.y0 = pointIndicator.position.y;

    containTimeAndLives.addChild(pointIndicator);

    pointIndicator.alpha = 0;
}


function initTimeCD(){

    timerFirstNum = new PIXI.Sprite.fromImage('asset/numberGreen/0.png');
    timerSecNum = new PIXI.Sprite.fromImage('asset/numberGreen/0.png');
    ratioOfWidthHeightItem(timerFirstNum , 1600);
    timerFirstNum.position.x = 129;
    timerFirstNum.position.y = -147 - timerFirstNum.height/2;

    ratioOfWidthHeightItem(timerSecNum , 1600);
    timerSecNum.position.x = 129 + timerFirstNum.width;
    timerSecNum.position.y = -147 - timerSecNum.height/2;

    containTimeAndLives.addChild(timerFirstNum);
    containTimeAndLives.addChild(timerSecNum);


    for(var i = 0; i< 10; i++){
        var texture = PIXI.Texture.fromImage('asset/numberGreen/'+ i +'.png');
        greenNumTextureArray.push(texture);
    }
}


function visualizeTimer(time){
    var hangDonVi = time%10;
    var hangChuc  = (time*10 - hangDonVi*10)/100;

    timerFirstNum.texture = greenNumTextureArray[hangChuc];
    timerSecNum.texture = greenNumTextureArray[hangDonVi];
}


function doCount(){
    if(!stopToRotate && isPlay)
    {
        if(!win)
        {
            var minute = (time - time%60 ) / 60;
            var second = time - minute*60;

            var second_show = time;

            if(milesSecond != 99 /*milesSecond != 0*/)
            {
                /*milesSecond--;*/
                milesSecond++;
            }

            //console.log(milesSecond);

            if(second < 10)
                second = '0' + second;
            if(minute < 10)
                minute = '0' + minute;
            if(milesSecond < 10)
                milesSecond = '0' + milesSecond;
            if(second_show < 10)
                second_show = '0' + second_show;

            /*var result = minute+' : '+second+' : '+ milesSecond;*/

            result_time = second_show +' : '+ milesSecond;
            var result = second_show ;

            result_time_second = time;
            result_time_milesSecond = milesSecond;
            if(milesSecond == 99 /*milesSecond == 0*/ && time < 99 )
            {
                time++;
                /*time--;*/
                milesSecond = 0;
                /*milesSecond = 100;*/
            }
            else if(time >= 99)
            {
                time = 99;
                /*stopCd = true;*/
            }
            /*cd_txt.text = result;*/
            //initTimeCd(time);

            visualizeTimer(time)
        }

    }
}

function initLives()
{
    var lives = new PIXI.Sprite.fromImage('asset/decorate/lives.png');
    anchor(lives);
    ratioOfWidthHeightItem(lives , 1600);
    position(lives , -170 , -147);
    var hold_lives = new PIXI.Sprite.fromImage('asset/decorate/hold_circle.png');
    anchor(hold_lives);

    ratioOfWidthHeightItem(hold_lives , 1600);
    position(hold_lives , -170 , -147);
    var hold_all = new PIXI.Sprite.fromImage('asset/decorate/hold_values.png');
    anchor(hold_all);

    ratioOfWidthHeightItem(hold_all , 1600);
    position(hold_all , -125 , -147);
    containTimeAndLives.addChild(hold_all);
    containTimeAndLives.addChild(hold_lives);
    containTimeAndLives.addChild(lives);
    calcuLives(); // tinh luong lives con lai
    containTimeAndLives.addChild(containTime);
}
function calcuLives() // update front end
{
    if(level > 3)
    {
        // tinh toan luong mang khi thua cuoc
    }
    var first = hangchuc(lives);
    var second = lives%10;
    //console.log(lives);
    var linkNumber = 'asset/numberRed/'+second+'.png';
    var number = new PIXI.Sprite.fromImage(linkNumber);
    anchor(number);
    ratioOfWidthHeightItem(number , 1600);
    number.position.x = -130 + number.width;
    number.position.y = -147;

    var zero = new PIXI.Sprite.fromImage('asset/numberRed/'+first+'.png');
    anchor(zero);
    ratioOfWidthHeightItem(zero , 1600);
    zero.position.x = -130;
    zero.position.y = -147;

    containTimeAndLives.addChild(number);
    containTimeAndLives.addChild(zero);
    //stage.addChild(containTimeAndLives);
    containAllExceptPopUpContain.addChild(containTimeAndLives);

}

function initContainLevel()
{
    var background = new PIXI.Sprite.fromImage('asset/bg/bg_level.png');
    anchor(background);
    var nameLevel = new PIXI.Sprite.fromImage('asset/decorate/level.png');
    anchor(nameLevel);
    /*nameLevel.width = nameLevel.width/2;
    nameLevel.height = nameLevel.height/2;*/
    ratioOfWidthHeightItem(nameLevel , 1600);
    position(nameLevel , -228, -147);
    var level_current = new PIXI.Sprite.fromImage('asset/numberGreen/'+level+'.png');
    anchor(level_current);
    position(level_current , -227, -132);

    ratioOfWidthHeightItem(level_current , 1600);
    /*background.width = background.width /2;
    background.height = background.height/2;*/
    ratioOfWidthHeightItem(background , 1600);
    position(background , -221, -130);
    position(containLevel,stageW/2,stageH/2);
    scale(containLevel , ratio);
    containLevel.addChild(background);
    containLevel.addChild(nameLevel);
    containLevel.addChild(level_current);
    //stage.addChild(containLevel);
    containAllExceptPopUpContain.addChild(containLevel);
}

function initContainBtn()
{

    /*position(background,0,230);*/

    var ico_next   = new PIXI.Sprite.fromImage('asset/decorate/ico_next.png');
    anchor(ico_next);
    /*ico_next.width = ico_next.width/2;
    ico_next.height = ico_next.height/2;*/
    ratioOfWidthHeightItem(ico_next , 1600);
    position(ico_next,96,0);
    var ico_prev   = new PIXI.Sprite.fromImage('asset/decorate/ico_prev.png');
    anchor(ico_prev);
    /*ico_prev.width = ico_prev.width/2;
    ico_prev.height = ico_prev.height/2;*/
    ratioOfWidthHeightItem(ico_prev , 1600);
    position(ico_prev,-96,0);
    /*if(checkMobile())
    {
        var positionY = (stageH - (266/2)*(ratio) + 40);
    }
    else
    {
        var positionY = (stageH - (266/2)*(ratio) + 40);
    }*/
    scale(containBtn , ratio + 0.25);


    var positionY = stageH - (containBtn.height*(3/4));
    if(checkMobile()){
        positionY = stageH - containBtn.height/4;
    }
    position(containBtn, stageW/2 ,positionY);


    containBtn.addChild(ico_next);
    containBtn.addChild(ico_prev);
    containBtn.addChild(wrapBtn);
   // stage.addChild(containBtn);
    containAllExceptPopUpContain.addChild(containBtn);
}


