/**
 * Created by minhvu on 8/28/2015.
 */
function firework()
{
    init();
}
function init()
{
    var width = $(window).width();
    var height = $(window).height();
    var renderer = PIXI.autoDetectRenderer(width, height , {transparent: true});
    $('#firework').append(renderer.view);
    var stage = new PIXI.Container;
    var bg   = new PIXI.Graphics;
    bg.beginFill(0xffffff,0);
    bg.drawRect(0 , 0 , width , height);
    bg.endFill();
    stage.addChild(bg);
    bg.interactive = true;
    var line = new PIXI.Graphics;
    var fireWork = new PIXI.Graphics;
    var arrayFireWorkCircle = [];
    var index = 0;
    stage.addChild(line);
    stage.addChild(fireWork);
    var weight = 4; // default 2
    var max = 0;
    var PartOfOneLine = 10; // default 5
    var totalLineFireWork         = 60; //default 5;
    var delay = 0;
    function getRandomInt (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /*function getRandomColor() {
        var letters = '0123456789ABCDEF'.split('');
        var color = '0x'; // default #
        for (var i = 0; i < 6; i++ ) {
            color += letters[Math.round(Math.random() * 15)];
        }
        return color;
    }*/
    function getRandomColorInArray()
    {
        var choice;
        var color = ['0xff9f9f' , '0x1bdf84' , '0x5affff' , '0xa978ff' , '0xa978ff' , '0xa858ff' ];
        return choice = color[getRandomInt(0 , 5)];
    }
    function getRandomPosition()
    {
        var random_x = getRandomInt(0 , width);
        var random_y = getRandomInt(0 , height);
        var colorLine = getRandomColorInArray();
        for (var j = 0; j < totalLineFireWork; j++) {
            var range = getRandomInt(50,200);
            var getRandomX = getRandomInt(random_x - range, random_x + range); // default 150
            var getRandomY = getRandomInt(random_y - range, random_y + range); // default 150
            arrayFireWorkCircle.push({
                'id'     : index,
                'end_x'  : getRandomX,
                'end_y'  : getRandomY,
                'start_x': random_x,
                'start_y': random_y,
                'color'  : colorLine,
                'done'   : false
            });
        }
    }
    function drawningFireWork()
    {
        if(delay % 10 == 0) // delay 50 lan moi add 1 phao bong
        {
            getRandomPosition();
        }
        var length = arrayFireWorkCircle.length;
        if(length != 0)
        {
            fireWork.clear();
            for (var h = 0; h < arrayFireWorkCircle.length ; h++) {
                if(arrayFireWorkCircle[h].done == false)
                {
                    fireWork.lin
                    fireWork.lineStyle(weight, arrayFireWorkCircle[h].color, 0.5);
                    if (Math.round(arrayFireWorkCircle[h].start_x) != Math.round(arrayFireWorkCircle[h].end_x) && Math.round(arrayFireWorkCircle[h].start_y) != Math.round(arrayFireWorkCircle[h].end_y))
                    {
                        fireWork.moveTo(arrayFireWorkCircle[h].start_x, arrayFireWorkCircle[h].start_y);
                        arrayFireWorkCircle[h].start_x += (arrayFireWorkCircle[h].end_x - arrayFireWorkCircle[h].start_x) / PartOfOneLine;
                        arrayFireWorkCircle[h].start_y += (arrayFireWorkCircle[h].end_y - arrayFireWorkCircle[h].start_y) / PartOfOneLine;
                        fireWork.lineTo(arrayFireWorkCircle[h].start_x, arrayFireWorkCircle[h].start_y);
                    }
                    else
                    {
                        arrayFireWorkCircle[h].done = true;
                    }
                }
            }
        }
    }

    animate();
    function animate()
    {
        renderer.render(stage);
        drawningFireWork();
        delay++;
        requestAnimationFrame( animate );
    }
}