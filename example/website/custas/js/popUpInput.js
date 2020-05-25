/**
 * Created by minhvu on 11/9/2015.
 */

var backgroundPopUpEnterCode ;
var btn_un_confirm;
var btn_confirm;
function initPopUpEnterCode()
{
    position(containPopUpEnterCode , stageW/2 , stageH/2 - 25*ratio);
    scale(containPopUpEnterCode , ratio);
    visible(containPopUpEnterCode , 0);
    backgroundPopUpEnterCode = new PIXI.Sprite.fromImage('asset/bg/content_success.png');
    anchor(backgroundPopUpEnterCode);
    ratioOfWidthHeightItem(backgroundPopUpEnterCode , 1600);

    var text_please_input = new PIXI.Sprite.fromImage('asset/decorate/inputText.png');
    anchor(text_please_input);
    ratioOfWidthHeightItem(text_please_input , 1600);

    var textInput = new PIXI.Sprite.fromImage('asset/bg/bg_input.png');
    anchor(textInput);
    ratioOfWidthHeightItem(textInput , 1600);

    var btn_replay = new PIXI.Sprite.fromImage('asset/decorate/btn_replay.png');
    anchor(btn_replay);
    ratioOfWidthHeightItem(btn_replay , 1600);

    btn_un_confirm = new PIXI.Sprite.fromImage('asset/decorate/un_accept.png');
    anchor(btn_un_confirm);
    ratioOfWidthHeightItem(btn_un_confirm , 1600);

    btn_confirm = new PIXI.Sprite.fromImage('asset/decorate/btn_confirm_active.png');
    anchor(btn_confirm);
    ratioOfWidthHeightItem(btn_confirm , 1600);
    visible(btn_confirm,0);

    position(textInput , 0 , text_please_input.height + 20);
    position(btn_replay , -btn_replay.width/2 - 5 , text_please_input.height + 20 + textInput.height + 20  );
    position(btn_confirm , btn_confirm.width/2 + 5 , text_please_input.height + 20 + textInput.height + 20  );
    position(btn_un_confirm , btn_confirm.width/2 + 5 , text_please_input.height + 20 + textInput.height + 20  );

    btn_replay.interactive = true;
    btn_confirm.interactive = true;

    btn_replay.tap = replayTheGame;
    btn_replay.click = replayTheGame;

    btn_confirm.tap = activeCode;
    /*btn_confirm.click = activeCode;*/
    btn_confirm.on('mousedown' , activeCode);


    var options = {
        readonly: false,
        maxlength: null,
        placeholder: "",
        placeholderColor:  "rgba(0,0,0,.5)",
        selectionColor:  "#eeeeee",
        value: "",
        type: "text",
        onsubmit: function() {
            activeCode();
        },
        onkeydown: function() {
            checkCode();
        },
        onkeyup: function() {
            /*checkCode()*/
        },
        onfocus: function() {

        },
        onblur: function() {

        },
        onmousedown: function() {},
        onmouseup: function() {},
        width: textInput.width - 30,
        height: textInput.height/2,
        padding: 5,
        borderColor: "rgba(0,0,0,0)",
        borderWidth: 1,
        borderRadius: 0,
        backgroundImage:null,
        backgroundColor: "rgba(0,0,0,0)",
        backgroundGradient: null,
        boxShadow: null,
        innerShadow: null,
        valign: "middle",
        align: "left",
        outline: 0,

        text: {
            //bitmap:false,
            font: "18px Arial",
            fill:"#702f60"
            //align: "left",
            //stroke: "rgba(0,0,0,0)",
            //strokeThickness: 0
        }

    };

    inputCode = new PIXI.Input(options);
    position(inputCode , -textInput.width/2 +10 , text_please_input.height + 4);
    containPopUpEnterCode.addChild(backgroundPopUpEnterCode);
    containPopUpEnterCode.addChild(text_please_input);
    containPopUpEnterCode.addChild(textInput);
    containPopUpEnterCode.addChild(btn_replay);
    containPopUpEnterCode.addChild(btn_un_confirm);
    containPopUpEnterCode.addChild(btn_confirm);
    containPopUpEnterCode.addChild(inputCode);


    stage.addChild(containPopUpEnterCode);
}
function activeCode() // update front end
{
    var codeActive = inputCode.value;
    console.log("codeActive: ");

    /**/
    /**/
    if(codeActive.length > 0 )
    {

        inputCode.blur();
        checkContinue = true;
        activedCode = true;
        lives = lives + 10;
        nextGame();
        for(var i = 0 ; i < containPopUpEnterCode.length ; i++)
        {
            containPopUpEnterCode.removeChild(containPopUpEnterCode.children[i]);
        }
    }
    /**/
    //checking code and continue game
    /**/
    /*will have if here to check continue game*/

}
function checkCode()
{
    if(inputCode.value.length > 0 )
    {
        visible(btn_un_confirm,0);
        visible(btn_confirm,1);
    }
}

