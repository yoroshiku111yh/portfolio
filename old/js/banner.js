$(document).ready(function(){

    /**
     * Created by minhvu on 3/25/2016.
     */
    window.requestAnimFrame = (function(){
        return window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function(callback){
                window.setTimeout(callback, 1000/60);
            }
    })();


    var canvas = document.getElementById('banner');

    var numberCanvas = document.getElementById('number');
    var contextNum = numberCanvas.getContext('2d');
    var context = canvas.getContext('2d');

    var W = $('#bannerWrapper').width();
    var H = $('#bannerWrapper').height();

    var numW = W;
    var numH = H;

    var radius = 2;

    var total = 200;

    var bg = 'rgba(255, 255, 255, 0)';
    var colorArray = ['rgba(45, 116, 204, 0.5)', 'rgba(73, 165, 35, 0.77)', 'rgba(212, 32, 23, 0.77)']

    var array_particle = [];
    var pixelCoordinates = [];

    var font_size = 125;

    var text = 'yoroshiku';

    var min = 50;

    var isDisBand = false;

    var array_text = ['#HTML' , '#CSS' , '#JAVASCRIPT' , '#CANVAS' , '#YOROSHIKU'];
    var count_text = 0;

    var timeDelay = 500;

    canvas.width = W;
    canvas.height = H;

    numberCanvas.width = numW;
    numberCanvas.height = numH;

    numberOffsetX = 0;
    numberOffsetY = 0;

    function getRandomInt (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    createCanvas = function()
    {
        context.fillStyle = bg;
        context.fillRect(0 , 0 , W , H);
    }



    particlesBanner = function()
    {
        this.x = W*Math.random() ;
        this.y = H*Math.random() ;
        this.x1 = 0;
        this.y1 = 0;
        this.radius =  Math.random()*3 + 1;
        this.radius0 = this.radius;
        this.art = false;
        this.disband = false;
        this.color = colorArray[getRandomInt(0 , 2)];
        this.vx = -1 + Math.random()*3;
        this.vy = -1 + Math.random()*3;
        this.vx0 = this.vx ;
        this.vy0 = this.vy ;
        this.draw = function()
        {
            context.fillStyle = this.color;
            context.beginPath();
            context.arc(this.x , this.y , this.radius , 0 , 2*Math.PI);
            context.fill();
        }
    }

    drawNumber  = function(num)
    {
        contextNum.clearRect(0, 0, numW, numH);
        contextNum.fillStyle = '#24282f';
        contextNum.textAlign = 'center';
        contextNum.font = font_size+'px Arial';

        var widthText = contextNum.measureText(num).width;
        if(widthText > W + 50)
        {
            var size = ( ((W - 30)*font_size)/ widthText )
            contextNum.font = size+'px Arial';
        }
        contextNum.fillText(num, numW/2 , numH/2 + font_size/4);
        // get imageData of canvas number
        var context = document.getElementById('number').getContext('2d');
        var imageData = context.getImageData(0, 0, numW, numH).data;

        pixelCoordinates = [] ;

        for(var i = imageData.length ; i >= 0 ; i-= 4)
        {
            if(imageData[i] !== 0)
            {
                var x = (i / 4)%numW;
                var y = Math.floor(Math.floor((i/numW)/4));
                if((x && x%(radius * 2 + 3) == 0) && (y && y%(radius * 2 + 3) == 0))
                {
                    pixelCoordinates.push({x : x , y : y});
                }
            }
        }
    }

    setParticlesNumber = function()
    {
        for(var i = 0 ; i < pixelCoordinates.length ; i++)
        {
            var p = array_particle[i];
            var c = pixelCoordinates[i];
            p.x1 = c.x + numberOffsetX;
            p.y1 = c.y + numberOffsetY;
            p.art = true;
            p.disband = false;
        }
    }
    function Particles()
    {
        for(var i = 0 ; i <  total ; i++)
        {
            array_particle.push(new particlesBanner(i));
        }
    }
    createParticles = function(lengthNumber)
    {
        var sum = 0 ;
        if( total < lengthNumber + min )
        {
            sum = lengthNumber - total + min;
        }
        if(sum > 0)
        {
            for(var i = 0 ; i <  sum ; i++)
            {
                array_particle.push(new particlesBanner(i));
            }
        }
        total = array_particle.length;
    }

    drawParticles = function()
    {
        for(var i = 0 ; i < array_particle.length ; i++ )
        {
            var p = array_particle[i];
            p.draw();
        }
        update();
        makeChar();
        vibrate();
    }

    drawNumber(array_text[count_text]);
    Particles();
    createParticles(pixelCoordinates.length);
    setParticlesNumber();
    initBanner = function()
    {
        context.clearRect(0 , 0 , W , H);
        createCanvas();
        drawParticles();
    }
//init();

    function update()
    {
        for (var i = 0; i < array_particle.length; i++) {
            var p = array_particle[i];
            p.x += p.vx;
            p.y += p.vy
            // We dont want them to leave area so only change position whent hey touch walls
            // là lấy vị trí của hạt và độ lớn của hạt để so sánh với giới hạn của canvas
            if(p.x + p.radius > W)
                p.x = p.radius; // về lại bằng độ lớn hạt

            else if(p.x - p.radius < 0) {
                p.x = W - p.radius;
            }

            if(p.y + p.radius > H)
                p.y = p.radius;

            else if(p.y - p.radius < 0) {
                p.y = H - p.radius;
            }
        }
    }

    function makeChar()
    {
        var spring = 0.07,
            friction = 0.6,
            springLength = 1;
        for (var i = 0 ; i < array_particle.length ; i++)
        {
            var p = array_particle[i];
            if(p.art && !p.disband)
            {
                var dx = p.x - p.x1,
                    dy = p.y - p.y1;
                var angle = Math.atan2(dy, dx);
                var x0 = p.x1 + Math.cos(angle) * springLength;
                var y0 = p.y1 + Math.sin(angle) * springLength;
                p.vx += ( x0 - p.x) * spring;
                p.vy += ( y0 - p.y) * spring;
                p.vx *= friction;
                p.vy *= friction;
                p.x += p.vx;
                p.y += p.vy;
            }
            else if(p.disband)
            {
                p.vx = p.vx0;
                p.vy = p.vy0;
            }
        }
        if(!isDisBand)
        {
            isDisBand = true;
            setTimeout(disband , timeDelay);
        }
    }

    function disband()
    {
        for (var i = 0 ; i < array_particle.length ; i++)
        {
            p = array_particle[i];
            if(p.art)
            {
                p.disband = true;
            }
        }
        if(isDisBand)
        {
            setTimeout(resume , timeDelay);
        }
    }

    function resume()
    {
        if(count_text != array_text.length - 1)
        {
            count_text++;
        }
        else
        {
            count_text = 0;
        }
        drawNumber(array_text[count_text]);
        createParticles(pixelCoordinates.length);
        setParticlesNumber();
        setTimeout(function(){
            isDisBand = false;
        } , timeDelay*2);
    }

    function vibrate()
    {
        for(var i = 0 ; i < array_particle.length ; i++)
        {
            var p = array_particle[i];
            if(p.art && !p.disband)
            {
                if(p.radius < p.radius0*2)
                {
                    p.radius += p.radius/5;
                }
                else
                {
                    p.radius -= p.radius/5;
                }
            }
            else
            {
                p.radius = p.radius0;
            }
        }
    }

    function mouseHover()
    {
        $('#canvas').mousemove(function(e){
            console.log(e.pageX , e.pageY);
        });
    }
    mouseHover();

    function loopBanner()
    {
        context.clearRect(0, 0, W, H);
        W = $('#bannerWrapper').width();
        H = $('#bannerWrapper').height();
        numW = W;
        numH = H;
        canvas.width = W;
        canvas.height = H;
        initBanner();
        requestAnimFrame(loopBanner);
    }
    loopBanner();

});