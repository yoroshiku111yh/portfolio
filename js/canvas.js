$(document).ready(function(){

    /**
     * Created by minhvu on 3/21/2016.
     */
        // RequestAnimFrame: a browser API for getting smooth animations
    window.requestAnimFrame = (function() {
        return window.webkitRequestAnimationFrame    ||
            window.mozRequestAnimationFrame       ||
            window.oRequestAnimationFrame         ||
            window.msRequestAnimationFrame        ||
            function( callback ){
                window.setTimeout(callback, 1000 / 60);
            };
    })();

// Initializing the canvas
// Using native JS but could use jQuery or anything
    var canvas = document.getElementById("canvasLine");

// Initialize the context
    var ctx = canvas.getContext("2d");


// Some variables for later use
    var colorArray = ['rgba(45, 116, 204, 0.5)', 'rgba(73, 165, 35, 0.77)', 'rgba(212, 32, 23, 0.77)']
    var particleCount = 150,
        particles = [],
        minDist = 100,
        dist,
        loop = 0;
// Set width and height to full window
    var W = 0;
    var H = 0;

    var pMouse = [] ;

    $(window).load(function(){
        W = $('body').width(), H = $('#wrapper-main').outerHeight() + $('#header-main').outerHeight() + $('#bannerWrapper').outerHeight() ;
        canvas.width = W;
        canvas.height = H;

        // Push the particles into an array
        // tạo hạt và push vào array
        for(var i = 0; i < particleCount; i++) {
            particles.push(new Particle(-1 + Math.random()*3 , -1 + Math.random()*3 ));
        }

        animloop();
        pushParticlesforMouse();
        mouseMove();
    });

    function getRandomInt (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

// Function to make canvas
    function paintCanvas() {
        // Set color to black
        //ctx.clearRect(0,0,W,H);
        ctx.fillStyle = "rgba(255, 255, 255, 0)";

        // Rectangle of white from Top Left (0,0) to Bottom Right (W,H)
        ctx.fillRect(0,0,W,H);
    }

// Now make some particles that attract each other when near
// Will set min. distance for it and draw a line between them when near

// Attraction is done by increasing velocity when near each other

// Make a function that will act as a class for the particles

    function Particle( vx , vy ) {
        // Position them randomly
        // Math.random() generates random between 0 and 1, so we multiply this by canvas width and height
        // tạo random điểm xuất hiện trong khoảng W và H
        this.x = Math.random() * W;
        this.y = Math.random() * H;
        // Also need to set some velocity
        // cũng cần phải thiết lập vận tốc
        this.vx = 0;
        this.vy = 0;
        this.vx =  vx ;
        this.vy =  vy ;

        // Now the size of the particles
        // độ lớn của hạt
        this.radius = Math.random() * 1;
        this.color = colorArray[getRandomInt(0, 2)];
        // Now draw the particles, use basic fillStyle and start the path
        // use 'arc' function to draw circle, uses x + y coordinates and then radius, then start angle, and end angle, then boolean
        // False for clockwise
        this.draw = function() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);

            // Fill the arc we just made
            ctx.fill();
        }
    }

    function particlesCircle(angle)
    {
        this.x = Math.sin(angle)*R + center_x;
        this.y = Math.cos(angle)*R + center_y;
        this.default_x = this.x;
        this.default_y = this.y;
        this.radius = Math.random()*5;
        var vx = Math.random()*5;
        var vy = Math.random()*5;

    }




// Function to draw everything on canvas that we'll use when we animate whole scene
    function draw() {
        if(loop > 750)
        {
            ctx.clearRect(0, 0, W, H);
            loop = 0;
        }
        paintCanvas();
        // Call the painCanvas function so it gets repainted each frame
        // Call function to draw particles using a loop
        for (var i = 0; i < particles.length; i++) {
            p = particles[i];
            p.draw();
        }
        // Call up<a href="http://www.jqueryscript.net/time-clock/">date</a> function
        update();
    }

// Give life to the particles
    function update() {
        // This function will update evry particles position according to their velocities
        for (var i = 0; i < particles.length; i++) {
            p = particles[i];

            // change velocities
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

            // Now they need to attract, so check distance then compare to minDistance
            // We will have another loop so it is compared to everyparticles apart from itself
            // lấy vị trí của 2 đối tượng kế nhau và so sánh khoảng cách
            for(var j = i + 1; j < particles.length; j++) {
                p2 = particles[j];
                distance(p, p2);
            }

        }
    }

// Distance calculator between particles
    function distance(p1, p2) {
        var dist,
            dx = p1.x - p2.x;
        var dy = p1.y - p2.y;
        dist = Math.sqrt(dx*dx + dy*dy);

        // Draw line if distance is smaller than minDistance
        if(dist <= minDist) {

            // Draw the line
            ctx.beginPath();
            ctx.strokeStyle = "rgba(255,255,255,"+ (1.2-dist/minDist) +")";
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
            ctx.closePath();

            // Some acceleration depending on distance
            var ax = dx/7500,
                ay = dy/7500;

            // Apply the acceleration
            // xét gia tốc
            p1.vx -= ax;
            p1.vy -= ay;

            p2.vx += ax;
            p2.vy += ay;
        }
    }

// Start main animation loop using requestAnimFrame
    function animloop() {
        draw();
        requestAnimFrame(animloop);
        loop++;
    }

    function pushParticlesforMouse()
    {
        for(var i = 0 ; i < 10 ; i++)
        {
            pMouse.push(new Particle(0 , 0));
        }
    }

    function mouseMove()
    {
        $('body').mouseover(function(){
            console.log('alo');

        });
    }

});