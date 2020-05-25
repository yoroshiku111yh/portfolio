/**
 * Created by minhvu on 1/25/2016.
 */
var idImg = '#preview';
var idBg = '#img-bg';
var containAll = '.contain';
var bgContain = '.background';
var isHaveImg = false;
var isComplete = false;
var wrapPreview = '.img-upload';
var imgFinal = '#img-final'
var w_bg = 0;
var h_bg = 0;
var w_img = 0;
var h_img = 0;
var w_img_default = 0;
var h_img_default = 0;
var isLoad = false;
var valZoom = 1;
var data = '';
var array_value = {'field1' : 'name' , 'field2' : 'name2' , 'field3' : 'name3' , 'field4' : 'name4' , 'field5' : 'name5' , 'image' : '' };
var base64 = '';
var dragElem;
var pos_x = 0;
var pos_y = 0;
var angle = 0;

var char = '#character';
var places = '#places';
var upload = '#uploadPicture';
var edit = '#editPicture';
var share = '#share';
var classHidden = 'hidden-div';
