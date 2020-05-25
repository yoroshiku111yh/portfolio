/**
 * Created by minhvu on 2/2/2016.
 */
defaults = {
    callback      : function() {}
    , decimal       : true
    , disable       : false
    , disableOpacity: 0.5
    , hideRange     : true
    , klass         : ''
    , min           : 0.5
    , max           : 1.5
    , start         : 1
    , step          : null
    , vertical      : false
};

defaults2 = {
    callback      : function() {}
    , decimal       : false
    , disable       : false
    , disableOpacity: 0.5
    , hideRange     : true
    , klass         : ''
    , min           : 0
    , max           : 360
    , start         : 0
    , step          : null
    , vertical      : false
};

var vals = document.querySelector(('.bar-percent .wrap-bar .bar-line.zoom'));
var vals2 = document.querySelector(('.bar-percent .wrap-bar .bar-line.rotate'));

var zoom = new Powerange( vals , defaults);
var rotate = new Powerange( vals2 , defaults2);
