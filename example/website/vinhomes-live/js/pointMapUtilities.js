/**
 * Created by minhvu on 1/8/2016.
 */
function positionPointsMap(default_img_width , default_img_height , default_position_points)
{
    /*52*/
    var total = 0;
    /*$('.contain-map-points .numberLst').each(function(){
        total++;
        console.log(total);
    });*/
    var map = $('.contain-map-points .map');
    /*console.log($('.contain-map-points .numberLst').css(['top' , 'left']));*/
    var width_img = map.width();
    var height_img = map.height();
    var new_position_points = [];
    if(default_position_points.length != 0)
    {
        for(var i = 0 ; i < default_position_points.length ; i++)
        {
            var x = width_img*default_position_points[i].left/default_img_width;
            var y = height_img*default_position_points[i].top/default_img_height;
            new_position_points.push({'id' : i , 'top' : y , 'left' : x});
        }
        var id = 0;
        $('.contain-map-points .numberLst').each(function(){
            var x = new_position_points[id].left;
            var y = new_position_points[id].top;
            $(this).css({'top' : y , 'left' : x});
            id++;
        });
    }
}

var isDebug = true;
var idDebug = 0;
$('.contain-map-points .map').click(function(e){
    if(isDebug)
    {
        var offset = $(this).offset();
        var top = (e.pageY - offset.top) - $('.contain-map-points .numberLst').height()/2;
        var left = (e.pageX - offset.left) - $('.contain-map-points .numberLst').width()/2;
        var array = [];
        array.push({'id' : idDebug ,'top' :  top, 'left' : left });
        var string = '';
        for(var i = 0 ; i < array.length ; i++)
        {
            string = "{ 'id' : " + idDebug + " , " + " 'top' : " + array[i].top +" , " + "'left' : " + array[i].left + " },";
            console.log(string);
        }
        idDebug++;
    }
});
