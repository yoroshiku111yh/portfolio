var imageArray = [];
var currentID = 0;
var holder;
var holder_thumb;
var backBtn;
var nextBtn;
var windowW;
var windowH;
var buttonGo;
var zoomIn;
var zoomOut;
var btnShowThumb;
var imageArrayURL;

$(document).ready(function () {

	imageArray = [];
	currentID = 0;
	holder = $(".view-brochures");
    holder_thumb = $("#child-brochures .view-vThumbs");
	backBtn = $(".controls-brochures .prev-banner-hp");
	nextBtn = $(".controls-brochures .next-banner-hp");
    windowW = $(window).width();
    windowH = $(window).height();
    buttonGo = $('.goSteps');
    zoomIn = $('.zoom-ctrl');
    zoomOut = $('.out-ctrl');
    btnShowThumb = $('.lst-ctrl');
});

function initBrochureViewer(imgArrURL) {

    imageArrayURL = imgArrURL;

    for (var i = 0; i < imageArrayURL.length; i++) {
        var url = imageArrayURL[i];
        var childAppend = "<div class='page-vBrochures' item_id=" + i + "> " + "<div class='inner-vBrochures'>" + "<img class='page-vBrochures-image' src=" + url + "></div></div>";
        holder.append(childAppend);
        holder_thumb.append(childAppend);
    }


    holder.parents('body, html').css({
        'height': '100%',
        'background': '#110e46'
    });

    holder.find('.page-vBrochures:first-child').addClass('active');
    holder_thumb.find('.page-vBrochures:first-child').addClass('active');
    holder.find(".page-vBrochures").each(function (e) {
        var itemW = $(this).width();
        var itemH = $(this).height();
        var id = $(this).attr("item_id");
        $(this).css({
            "display": "block",
            "position": "absolute",
            "top": "0",
            "left": itemW * id + "px",
            "width": "100%",
            "height": "90%",
            "text-align": 'center'
        });
        $(this).find('.inner-vBrochures').css({
            "display": "table-cell",
            "vertical-align": "middle",
            "height": windowH - 63
        })
        $(this).find('.inner-vBrochures img').css({
            "max-height": "100%",
            "max-width":"100%"
        })

    });

    var windowRs = (windowW <= 768) ? windowW / 2 : windowW / 4;
    holder_thumb.find(".page-vBrochures").each(function (e) {
        var item_thumbW = $(this).width();
        var id = $(this).attr("item_id");
        $(this).css({
            "display": "block",
            "position": "absolute",
            "top": "0",
            "left": windowRs * id + "px",
            "width": Math.round(windowRs),
            "text-align": 'center'
        });
        $(this).on('click', function () {
            loadActive($(this).attr('item_id'));
        })
    });


    backBtn.on("click", backBtnClick)
    nextBtn.on("click", nextBtnClick)
    buttonGo.on("click", function () {
        var valGo = parseInt($('.ip-steps').val()) - 1;
        loadActive(valGo)
        return false;
    })

    //drag images
    if(holder.find('.page-vBrochures').hasClass('active')){
        holder.find('.page-vBrochures .inner-vBrochures img').draggable();
    }else {
        holder.find('.page-vBrochures').draggable({
            revert: 'invalid'});
    }
    //END drag images

    zoomIn.on('click', function () {
        var itemzoom = holder.find('.active .inner-vBrochures img');
        itemzoom.width(itemzoom.width() * 1.1);
        itemzoom.height(itemzoom.height() * 1.1);
        itemzoom.css({
            'max-height': 'inherit',
            'max-width': 'inherit'
        })
    });
    zoomOut.on('click', function () {
        var itemzoom = holder.find('.active .inner-vBrochures img');
        itemzoom.width(itemzoom.width() * 0.9);
        itemzoom.height(itemzoom.height() * 0.9);
        itemzoom.css({
            'max-height': 'inherit',
            'max-width': 'inherit'
        })
    })

    btnShowThumb.on('click', function () {
        $('#child-brochures, .overlayBlack').toggle();
    });
    $('.overlayBlack').on('click', function () {
        $('#child-brochures, .overlayBlack').toggle();
    });

}

function backBtnClick(e) {
    currentID -= 1
    checkNextBack()
}

function nextBtnClick(e) {
    currentID += 1
    checkNextBack()
}

function checkNextBack() {
    if (currentID < 0) {
        currentID = 0
    }
    if (currentID > imageArrayURL.length - 1) {
        currentID = imageArrayURL.length - 1
    }

    gotoBrochure()
}

function loadActive(sel) {
    currentID = sel
    gotoBrochure()
}

function clickJumb() {

}

function gotoBrochure() {
    var imageW = holder.width();
    TweenMax.to(holder, .3, { x: -(imageW * currentID), ease: Sine.easeOut });
    var image_thumbW = Math.round(holder_thumb.find(".page-vBrochures").width());
    var last_thumbW = Math.round(holder_thumb.find(".page-vBrochures:last-child").offset().left + 3);

    var count_thumb = (windowW <= 768) ? 2 : 4;
    if (imageArrayURL.length - currentID > count_thumb - 1) {
        TweenMax.to(holder_thumb, .3, { x: -(image_thumbW * currentID), ease: Sine.easeOut })
    }


    holder.find('.page-vBrochures')
        .removeClass('active')
        .eq(currentID)
        .addClass('active')

    holder_thumb.find('.page-vBrochures')
        .removeClass('active')
        .eq(currentID)
        .addClass('active')
}

function trace(s) {
    console.log(s)
}