

function createPointIndicator(value){
    var res = new PIXI.Container();
    var pointInString = value.toString();
    var pointStringArray = pointInString.split("");
    var minus = new PIXI.Sprite.fromImage("asset/decorate/red_plus_sign.png");



    for(var i = 0; i < pointStringArray.length; i++){
        var item = new PIXI.Sprite.fromImage('asset/numberRed/'+pointStringArray[i]+'.png');

        var totalWidth = item.width*pointStringArray.length;
        item.position.x = item.width*i - totalWidth/2;
        item.position.y = -item.height/2;
        res.addChild(item);
        minus.position.x = - totalWidth/2 - minus.width;
        minus.position.y = - minus.height/2;

    }


    res.addChild(minus);
    return res;
}


function animatePointIndicator(){
    TweenMax.killTweensOf(pointIndicator);
    pointIndicator.position.x = pointIndicator.x0
    pointIndicator.position.y = pointIndicator.y0
    pointIndicator.alpha = 1;
    TweenMax.to(pointIndicator.position, 0.7, {y:pointIndicator.y0 - pointIndicator.height*2, ease:Sine.easeOut});
    TweenMax.to(pointIndicator,.3, {alpha: 0, ease:Sine.easeOut, delay:0.5});
}



function addCandyEffectAt(xx,yy){

    var glowSprite = PIXI.Sprite.fromImage("asset/decorate/cirEffect.png");

    glowSprite.blendMode = PIXI.BLEND_MODES.OVERLAY;
    stage.addChild(glowSprite);
    glowSprite.anchor.x = glowSprite.anchor.y = 0.5;
    glowSprite.scale.x = 0;
    glowSprite.scale.y = 0;
    glowSprite.position.x = xx;
    glowSprite.position.y = yy;

    for(var i = 0; i< 5; i++){
        var flake = PIXI.Sprite.fromImage("asset/decorate/flower.png");
        stage.addChild(flake);
        flake.anchor.x = flake.anchor.y = 0.5;
        flake.position.x = xx;
        flake.position.y = yy;
        flake.scale.x =flake.scale.y = 0.5 + 0.5*Math.random();
        flake.alpha = 0.5
        var ranDirX = 100*(Math.random() - Math.random());
        var ranDirY = 100*(Math.random() - Math.random());
        TweenMax.to(flake.position,.5, {x:xx+ ranDirX, y:yy+ranDirY, ease:Cubic.easeOut, delay:.1});
        TweenMax.to(flake,.3, {alpha:0, ease:Sine.easeOut, delay:0.2});
        TweenMax.to(flake,0.5, {rotation:Math.PI/2, ease:Cubic.easeOut, delay:0.1});
    }

    TweenMax.to(glowSprite.scale,.5, {x:1, y:1, ease:Cubic.easeOut, onCompleteParams:[glowSprite], onComplete:removeSpriteEffect});
    TweenMax.to(glowSprite,.3, {alpha:0, ease:Sine.easeOut, delay:0.1})
}

function removeSpriteEffect(target){
    stage.removeChild(target);
    target = null;
}