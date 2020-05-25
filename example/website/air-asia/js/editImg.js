/**
 * Created by minhvu on 1/25/2016.
 */
function getRadianAngle(degreeValue) {
    return degreeValue * Math.PI / 180;
}
function canvas(idCanvas)
{
    this.data = $(idCanvas).get(0);
    this.x = 0;
    this.y = 0;
    this.setAngle = function(angle)
    {
        this.angle = angle;
    }
    this.setPosition = function(x , y)
    {
        this.x = x;
        this.y = y;
    }
    this.setHeight = function(h)
    {
        this.data.height = h;
        //this.height = h;
    }
    this.setWidth = function(w)
    {
        this.data.width = w;
        //this.width = w;
    }
    this.saveImg = function(idVid)
    {
        var v = $(idVid).get(0);
        this.img = v;
    }
    this.getContext = function()
    {
        this.context = this.data.getContext("2d");
    }
    this.draw = function(w , h, idImg )
    {
        if(idImg)
        {
            var img = $(idImg).get(0);
        }
        else
        {
            var img = this.img;
        }
        this.context.drawImage(img, this.x , this.y , w, h);
    }
    this.drawRotate = function(w, h)
    {
        this.context.drawImage(this.img, -w/2, -h/2, w , h);
    }


    this.rotate = function(w , h)
    {
        this.context.translate(w/2 + this.x, h/2 + this.y); // cap nhap goc toa do (0,0) , tai diem vi tri moi cap nhap
        this.context.rotate(getRadianAngle(this.angle));
    }
    this.joinImages = function(image , w , h)
    {
        //this.context.globalAlpha = 0.5;
        var img = $(image).get(0);
        this.context.drawImage(img, 0, 0, w , h);
    }
    this.clearRect = function()
    {
        this.context.clearRect(0 , 0 , this.data.width, this.data.height);
    }
    this.resetTranslate = function()
    {
        /*this.context.translate(x ,y);*/
        this.context.setTransform(1, 0, 0, 1, 0.5, 0.5);
    }
    this.save = function()
    {
        this.context.save();
    }
    this.restore = function()
    {
        this.context.restore()
    }
}