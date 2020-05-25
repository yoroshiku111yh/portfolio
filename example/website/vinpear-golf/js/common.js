$(document).ready(function(){

	var owl = $('.lst-banner');
	var owl_offer = $('.spec-offer');
	var owl_testi = $('.lst-testimonial');

	$('.lst-banner').owlCarousel({
		singleItem : true,
		autoPlay: true,
		pagination: false,
		rewindNav: false,
		addClassActive: true,
		responsive: true
	});

	$('.spec-offer').owlCarousel({
		singleItem : true,
		autoPlay: true,
		pagination: false,
		addClassActive: true,
		rewindNav: false,
		responsive: true
	});

	$('.lst-testimonial').owlCarousel({
		singleItem : true,
		autoPlay: true,
		addClassActive: true,
		responsive: true,
		rewindSpeed: 2000,
		rewindNav: false,
		pagination: true
	});

	var owl_reciprocal = $('.lst-reciprocal');
	owl_reciprocal.owlCarousel({
		items : 2,
		autoPlay: false,
		addClassActive: true,
		responsive: true,
		rewindSpeed: 2000,
		rewindNav: false,
		pagination: true
	});


	var owl_pack = $('.lst-packages');
	owl_pack.owlCarousel({
		items : 3,
		center: true,
		addClassActive: true,
		responsive: true,
		rewindSpeed: 2000,
		rewindNav: false,
		itemsDesktop : [1199,3],
		itemsDesktopSmall : [640,1],
		pagination: false
	});

	var owl_promotion = $('.SlidePromotion');
	owl_promotion.owlCarousel({
		items : 3,
		autoPlay: true,
		addClassActive: true,
		responsive: true,
		rewindSpeed: 2000,
		rewindNav: false,
		itemsDesktop : [1199,3],
		itemsDesktopSmall : [640,1],
		pagination: false
	});

	//gallery media
	var gallery1_thumb = $("#gallery1_thumb");
	//var activeslide = document.getElementsByClassName('active')[1];
	//activeslide.getElementsByTagName('a')[0].click();

	gallery1_thumb.owlCarousel({
		items : 3,
		itemsDesktop      : [1199,3],
		itemsDesktopSmall     : [979,3],
		itemsTablet       : [768,2],
		itemsMobile       : [479,1],
		pagination:false,
		rewindNav: false,
		responsiveRefreshRate : 100
	});

	$(window).resize(function(){
		var countChild = $('#gallery1_thumb .owl-item, .lst-packages .owl-item').length;
		var winW = $(window).width();
		if(countChild <= 3 && winW > 479) {
			var wrapChild = $('#gallery1_thumb .owl-wrapper-outer .owl-wrapper, .lst-packages .owl-wrapper-outer .owl-wrapper');
			wrapChild.addClass('min-slider');
			$('.sld-packages, .gallery .thumb-gallery').find('.controls-banner-hp').stop().hide();
		}else {
			$('#gallery1_thumb .owl-wrapper-outer, .lst-packages .owl-wrapper-outer').find('.owl-wrapper').removeClass('min-slider');
			$('.sld-packages, .gallery .thumb-gallery').find('.controls-banner-hp').stop().show();
		}
	});


	//active gallery1_thumb
	$('#gallery1_thumb .owl-item').click(function () {
		$(this).parent().find('.item_gallery').removeClass('active');
		$(this).find('.item_gallery').addClass('active');
	})
	//END active gallery1_thumb

	var gallery2 = $("#gallery2");
	var gallery2_thumb = $("#gallery2_thumb");
	gallery2.owlCarousel({
		singleItem : true,
		slideSpeed : 1000,
		navigation: false,
        autoPlay: false, // tat autoslide cua video
		pagination:false,
		rewindNav: false,
		afterAction : syncPosition2,
		responsiveRefreshRate : 200
	});

	gallery2_thumb.owlCarousel({
		items : 4,
		itemsDesktop      : [1199,4],
		itemsDesktopSmall     : [979,3],
		itemsTablet       : [768,2],
		itemsMobile       : [479,1],
		pagination:false,
		rewindNav: false,
		responsiveRefreshRate : 100,
		afterInit : function(el){
			el.find(".owl-item").eq(0).addClass("synced");
		}
	});

	//gallery - sync2
	function syncPosition2(el){
		var current = this.currentItem;
        $("#gallery2")
            .find(".owl-item")
            .removeClass("synced")
            .eq(current)
            .addClass("synced");
        /**/
		$("#gallery2_thumb")
			.find(".owl-item")
			.removeClass("synced")
			.eq(current)
			.addClass("synced");
		if($("#gallery2_thumb").data("owlCarousel") !== undefined){
			center2(current)
		}
        setTimeout( stopVideo , 1250);
	}

    function stopVideo()
    {
        $('#gallery2 .owl-item').each(function(){
            var iframe = $(this).find('iframe');
            if( !$(this).hasClass('synced') )
            {
                if(iframe.length != 0)
                {
                    var url = iframe.prop('src');
                    var find = url.indexOf("&autoplay=");
                    var id =  parseInt(url.substring(find+10 , find+11 ));
                    console.log('stop');
                    if(id == 0)
                    {
                        url = url.replace("&autoplay=0" , "&autoplay=0");
                        iframe.prop('src' , '');
                        iframe.prop('src' , url);
                    }
                    else if (id == 1)
                    {
                        url = url.replace("&autoplay=1" , "&autoplay=0");
                        iframe.prop('src' , '');
                        iframe.prop('src' , url);
                    }

                }
            }
            else
            {
                if(iframe.length != 0)
                {
                    url = iframe.prop('src');
                    find = url.indexOf("&autoplay=");
                    id = parseInt(url.substring(find + 10, find + 11));
                    console.log('play');
                    if (id == 0) {
                        url = url.replace("&autoplay=0", "&autoplay=1");
                        iframe.prop('src', '');
                        iframe.prop('src', url);
                    }
                    else if (id == 1) {
                        url = url.replace("&autoplay=1", "&autoplay=1");
                        iframe.prop('src', '');
                        iframe.prop('src', url);
                    }
                }
            }
            console.log('--restart--');
        });
    }

    function playVideo(element)
    {
        console.log('play');
        var iframe = $(element).find('iframe');
        console.log(iframe);
        if(iframe.length != 0)
        {
            var url = iframe.prop('src');
            var find = url.indexOf("&autoplay=");
            var id =  parseInt(url.substring(find+10 , find+11 ));
            console.log(id+'playvideo()');
            console.log(url);
            if(id)
            {
                if(id == 0 )
                {
                    console.log(id);
                    url = url.replace("&autoplay=0" , "&autoplay=1");
                    console.log(url);
                    iframe.prop('src' , '');
                    iframe.prop('src' , url);
                }
                else if (id == 1)
                {
                    console.log(id);
                    url = url.replace("&autoplay=1" , "&autoplay=1");
                    console.log(url);
                    iframe.prop('src' , '');
                    iframe.prop('src' , url);
                }

            }
            $(element).find('iframe').prop('src' , '');
            $(element).find('iframe').prop('src' , url);
        }
    }

	$("#gallery2_thumb").on("click", ".owl-item", function(e){
		e.preventDefault();
		var number = $(this).data("owlItem");
		gallery2.trigger("owl.goTo",number);
	});

	function center2(number){
		var sync3visible = gallery2_thumb.data("owlCarousel").owl.visibleItems;
		var num = number;
		var found = false;
		for(var i in sync3visible){
			if(num === sync3visible[i]){
				var found = true;
			}
		}

		if(found===false){
			if(num>sync3visible[sync3visible.length-1]){
				gallery2_thumb.trigger("owl.goTo", num - sync3visible.length+2)
			}else{
				if(num - 1 === -1){
					num = 0;
				}
				gallery2_thumb.trigger("owl.goTo", num);
			}
		} else if(num === sync3visible[sync3visible.length-1]){
			gallery2_thumb.trigger("owl.goTo", sync3visible[1])
		} else if(num === sync3visible[0]){
			gallery2_thumb.trigger("owl.goTo", num-1)
		}

	}
	//END gallery - sync2

	//END gallery media


	$('.next-banner-hp').click(function(){
		owl.trigger('owl.next');
		owl_reciprocal.trigger('owl.next');
	});

	$('.prev-banner-hp').click(function(){
		owl.trigger('owl.prev');
		owl_reciprocal.trigger('owl.prev');
	});

	$('.next-banner-hp-gallery').click(function(){
		gallery2.trigger('owl.next');
	});

	$('.prev-banner-hp-gallery').click(function(){
		gallery2.trigger('owl.prev');
	});

	$('.next-banner-hp').click(function(){
		owl_testi.trigger('owl.next');
		owl_pack.trigger('owl.next');
		owl_promotion.trigger('owl.next');
		gallery1_thumb.trigger('owl.next');
	});

	$('.prev-banner-hp').click(function(){
		owl_testi.trigger('owl.prev');
		owl_pack.trigger('owl.prev');
		owl_promotion.trigger('owl.prev');
		gallery1_thumb.trigger('owl.prev');
	});

	$('.next-offer').click(function(){
		owl_offer.trigger('owl.next');
	});

	$('.prev-offer').click(function(){
		owl_offer.trigger('owl.prev');
	});



	//images offer
	$(window).load(function(){
		$(function () {
			//width height cover
			$(window).resize(function(){
				var wResize = $(window).width();
				var hWin = $(window).height();
				var hHeader = $('#header').height();
				var hResize = $(window).height();
				var heightCover = $('.section-cover').height();
				if (wResize <= heightCover){
					$('section.section-cover > div, #gallery1 .lg_gallery, #gallery2 .lg_gallery').css('height',wResize);
				}else {
					$('section.section-cover > div, #gallery1 .lg_gallery, #gallery2 .lg_gallery, .item-banner').css('max-height',hWin - hHeader);
				}

				if (wResize >= hResize && wResize < 1024){
					$('.smPopup .bookBox').css('height','80%')
				}

			//END width height cover


				//map VinpearlGolf
				var width_doc = $(window).width();
				var width_control_testi = $('.lst-testimonial .owl-controls').width();
				if (width_doc > 767) {
					$('.img-offer').css({
						'width': width_doc/2
					});
				}
				if (width_doc < 768) {
					$('.lst-testimonial .owl-controls').css({
						'margin-left': -(width_control_testi/2)
					});
				}
				var height_cover = $('section.section-cover > .cover-vpg').height();
				var width_imgMap = $('.map-plcVpg > img').outerWidth();
				var height_imgMap = $('.map-plcVpg > img').outerHeight();
				var widthMap = $('.map-plcVpg').outerWidth();
				var heightMap = $('.map-plcVpg').outerHeight();
				var bwW = widthMap - width_imgMap;
				var bwH = heightMap - height_imgMap;

				$('.plc-onMap-nt, .plc-onMap-pq').css({
					'height' : (53 * height_cover) / 625,
					'width' : (108 * height_cover) / 625
				})

				if( width_imgMap >= 499){
					$('.plc-onMap-nt').css({
						'right' : 38
					})
					$('.plc-onMap-pq').css({
						'left' : 53
					})
				}else {
					$('.plc-onMap-nt').css({
						'right' : bwW/2 + ((18 * width_imgMap)/499),
						'bottom' : bwH/2 + ((133 * height_imgMap)/551)
					})
					$('.plc-onMap-pq').css({
						'left' : bwW/2 + ((33 * width_imgMap)/499),
						'bottom' : bwH/2 + ((41 * height_imgMap)/551)
					})
				}
				//END map VinpearlGolf

			}).resize();
		});
	});
	//END images offer

	//select
	$('.form-select').click(function(e){
		e.stopPropagation();
		if($(this).find('.expand-select').is(':hidden')){
			$(this).parent().find('.expand-select').stop(true).slideUp(150);
			$(this).find('.expand-select').stop().slideDown();
			$(this).parent().find('.form-select').removeClass('active');
			$(this).addClass('active');
		}else {
			$(this).removeClass('active');
			$(this).find('.expand-select').stop().slideUp();
		}

		//$(this).parent().find('.expand-select').slideUp(120);
		//$(this).parent().find('.form-select').removeClass('active');
		/*$(this).find('.expand-select').slideToggle(300);
		$(this).toggleClass('active');*/
	});


	$('.item-select').click(function(e){
		e.stopPropagation();
		var child_select = $(this).html();
		var value_child_select = $(this).attr('data-value');
		var child_current = $("#replace-select").empty();
		var child_current_class = $(this).parents('.form-select').find(".replace-select").empty();
		child_current.append(child_select);
		child_current_class.append(child_select);
		child_current_class.attr('data-value', value_child_select);
        var value = $('#replace-select .decrp-select').html();
        var key = $('#replace-select .title-select').html();
        $('#replace-select').attr('key' , key );
        $('#replace-select').attr('value' , value);

        var function_actived = $('#replace-select').attr('callback');

		$(this).parents('.expand-select').slideUp();
        //console.log(function_actived);
        if(function_actived)
        {
           var fn = eval(function_actived);
            fn();
        }
		/*changeContinent();*/
		$(this).parents('.form-select').removeClass('active');
	});

	$('body').click(function(){
		if($('.form-select').hasClass('active')){
			$('.form-select').removeClass('active');
			$('.expand-select').slideUp();
		}
	});
	//END select

	//nav

    //editNav


    $(window).resize(function(){
        //var wResize = $(window).width();
        //console.log('wResize '+ wResize);
        resizeMenu();

    })

    function resizeMenu(){
        var wResize = $(window).width();
        $('.item-nav').unbind('mouseenter mouseleave hover');
        $('.item-nav').on('mouseenter mouseleave',function(e){
            e.stopPropagation();
            if(wResize > 923){
                if(!$('.item-nav').hasClass('visible-lv2')){
                    if($(this).find('.sub-one').is(':hidden')){
                        $(this).parent().parent().find('.sub-one').stop().slideUp(80);
                        $(this).find('.sub-one').stop().slideDown(80);
                        $(this).parent().find('.item-nav').removeClass('current-nav');
                        $(this).stop().addClass('current-nav');
                    }else {
                        $(this).find('.sub-one').stop().slideUp(80);
                        $(this).stop().removeClass('current-nav');
                    }
                }
            }
        });
        $('.wrap-sub').unbind('mouseenter mouseleave hover');
        $('.wrap-sub').on('mouseenter mouseleave',function (e) {
            e.stopPropagation();
            if(wResize > 923){
                if(!$('.item-nav').hasClass('visible-lv2')){
                    if($(this).find('div.wrap-sub-inner').length != 0) {
                        trace(true)
                        if($(this).find('.wrap-sub-inner').is(':hidden')){
                            $(this).parent().parent().find('.wrap-sub-inner, .child-subNav').stop(true, true).slideUp(80);
                            $(this).find('.wrap-sub-inner').stop(true, true).slideDown(80).css('width', wResize);
                            $(this).find('.child-subNav').stop(true, true).slideDown(80);
                            $(this).find('.plc-golf').stop(true, true).addClass('currentHover');
                            $(this).parents('.navbar').find('.item-nav').removeClass('current-nav');
                            $(this).parents('.item-nav').addClass('current-nav');
                        }else {
                            $(this).find('.wrap-sub-inner, .child-subNav').stop(true, true).slideUp(80);
                            $(this).find('.plc-golf').stop(true, true).removeClass('currentHover');
                            $(this).parents('.item-nav').removeClass('current-nav');
                            /*if($(this).find('.wrap-sub-inner').is(':hidden')){
                             $(this).parents('.sub-one').slideUp(80);
                             }*/
                        }
                    }

                }
            }else {
                $(this).find('.wrap-sub-inner').stop(true, true).css('width', '');
            }
        });


        $('.inner-subNav > .expand-mobile').unbind('click');
        $('.inner-subNav > .expand-mobile').click(function(){
            //e.stopPropagation();
            if(wResize <= 923){
                $(this).find('.wrap-sub-inner').stop(true, true).css('width', '');
                if($(this).parent().find('.sub-one').is(':hidden')){
                    $(this).parent().parent().find('.sub-one, .child-subNav').stop().slideUp();
                    $(this).parent().find('.sub-one').stop().slideDown();
                    $(this).parent().parent().find('.item-nav, .current-child-subNav').removeClass('active');
                    $(this).parent().parent().find('.expand-mobile').removeClass('current-child-subNav');
                    $(this).parent().addClass('active');
                }else {
                    $(this).parent().find('.sub-one').stop().slideUp();
                    $(this).parent().removeClass('active');
                }

                if($(this).parents('.inner-subNav').find('.subNav .child-subNav').length != 0){
                    $(this).parent().find('.sub-one').removeClass('activeSub-one');
                }else {
                    $(this).parent().find('.sub-one').addClass('activeSub-one');
                }
            }
        })

        $('.plc-golf > .expand-mobile').unbind('click');
        $('.plc-golf > .expand-mobile').click(function () {
            //e.stopPropagation();
            if(wResize <= 923){
                if($(this).parent().parent().find('.child-subNav').is(':hidden')){
                    $(this).parents('.subNav').find('.child-subNav').stop(true).slideUp();
                    $(this).parent().parent().find('.child-subNav').stop(true).slideDown();
                    $(this).parent().parent().parent().find('.expand-mobile').removeClass('current-child-subNav');
                    $(this).addClass('current-child-subNav');
                }else {
                    $(this).parent().parent().find('.child-subNav').stop(true).slideUp();
                    $(this).removeClass('current-child-subNav');
                }
            }
        })
    }


    //END editNav

	var item_subNav = $('.item-subNav > a');
	item_subNav.click(function(){
		$(this).parent().parent().parent().parent().find('.item-subNav').removeClass('active');
		$(this).parent().addClass('active');
	});

	//END nav


	$('.btnMobile, .overlayPush').click (function(){
		pushMenu();
	});

	fixnav();
	scrollMenu();

	//seemore news media
	var height3Items = $('.parent-news .item-nw-media, .parent-news .brochures').outerHeight(true)*3;
	var heightItems_all = $('.parent-news').outerHeight(true);
	if(heightItems_all <= height3Items ){
		$('.parent-news').css('height', '');
		$('.see-down').hide();
	}else {
		$('.parent-news').css('height', height3Items);
	}
	//console.log(heightItems_all);
	$('.see-down').click(function(){
		$(this).parent().find('.parent-news').toggleClass('active');
		if ($(this).parent().find('.parent-news').hasClass('active')){
			$(this).parent().find('.parent-news').animate({height: heightItems_all});
			$(this).addClass('active');
		}else {
			$(this).parent().find('.parent-news').animate({height: height3Items});
			$(this).removeClass('active');
		}
	});
	//END seemore news media

	//check value form contact Homepage


	var checkFalse = true;
	$('.btnCfrm').on('click',function(){
		var nameInput = $('input, textarea').val();
		if(nameInput == ''){
			$('#popupGal input, #popupGal textarea').addClass('error_ct');
			checkFalse = false;
		}else {
			$('#popupGal input, #popupGal textarea').removeClass('error_ct');
		}
	});

	$('.form-contact input, .form-contact textarea').blur(function(){
		if($(this).val()){
			$(this).removeClass('error_ct');
		}else {
			$(this).addClass('error_ct');
		}
	});
	//check value form contact Homepage

});


/*function resizeMenu(){
	var childUp_fst = $('.subNav .sub-one .plc-golf');
	var wResize = $(window).width();
	if(wResize > 923){
		if(!$('.item-nav').hasClass('visible-lv2')){
			$('.item-nav').hover(function(){
				if($(this).find('.sub-one').is(':hidden')){
					$(this).parent().parent().find('.sub-one').stop().slideUp(80);
					$(this).find('.sub-one').stop().slideDown(120);
					$(this).parent().find('.item-nav').removeClass('current-nav');
					$(this).addClass('current-nav');
				}else {
					$(this).find('.sub-one').stop().slideUp(80);
					$(this).removeClass('current-nav');
				}
			});
			$('.wrap-sub').hover(function () {
				if($(this).find('.wrap-sub-inner').is(':hidden')){
					$(this).parent().parent().find('.wrap-sub-inner').stop(true, true).slideUp(80);
					$(this).find('.wrap-sub-inner').stop(true, true).slideDown(120).css('width', wResize);
					$(this).find('.plc-golf').stop(true, true).addClass('active');
				}else {
					$(this).find('.wrap-sub-inner').stop(true, true).slideUp(80);
					$(this).find('.plc-golf').stop(true, true).removeClass('active');
				}
			});
		}

	}else {
        $(window).resize(function(){
            $('.item-nav, .wrap-sub').unbind('mouseenter mouseleave');
            $('.inner-subNav .expand-mobile').click(function(e){
                e.stopPropagation();
                if($(this).parent().find('.sub-one').is(':hidden')){
                    $(this).parent().parent().find('.sub-one, .child-subNav').slideUp();
                    $(this).parent().find('.sub-one').slideDown();
                    $(this).parent().parent().find('.item-nav, .current-child-subNav').removeClass('active');
                    $(this).parent().parent().find('.plc-golf').removeClass('current-child-subNav');
                    $(this).parent().addClass('active');
                }else {
                    $(this).parent().removeClass('active');
                    $(this).parent().find('.sub-one').slideUp();
                }

                if($(this).parents('.inner-subNav').find('.subNav .child-subNav').length != 0){
                    $(this).parent().find('.sub-one').removeClass('activeSub-one');
                }else {
                    $(this).parent().find('.sub-one').addClass('activeSub-one');
                }
            });
            $('.plc-golf').click(function () {
                if($(this).parent().find('.child-subNav').is(':hidden')){
                    $(this).parents('.subNav').find('.child-subNav').stop(true).slideUp();
                    $(this).parent().find('.child-subNav').stop(true).slideDown();
                    childUp_fst.removeClass('current-child-subNav');
                    $(this).addClass('current-child-subNav');
                }else {
                    $(this).parent().find('.child-subNav').stop(true).slideUp();
                    $(this).removeClass('current-child-subNav');
                }
            });
        })
	}
}*/

function trace(s){
	console.log(s);
}


function pushMenu(){
    var menuBtn = $('.btnMobile');
    var pushLeft = $('.navMobile');
    var heightOvelay = $(document).height();
    $('body').toggleClass('active-body');
    menuBtn.toggleClass('activePush');
    $('.overlayPush').toggleClass('push_body');
    pushLeft.toggleClass('pushMenu_show');
    if ($('.overlayPush').hasClass('push_body')) {
        $('.overlayPush').css({'height': heightOvelay});
    }else {
        $('.overlayPush').css({'height':''});
    }
}

function scrollMenu() {
	$(window).load(function(){
		var link_scroll = $('a[href*=#]:not([href=#])').not('.register');
		//var pathname = window.location.pathname; // Returns path only
		var url      = window.location.href;     // Returns full URL
		var pathnameHash = window.location.hash;
		//console.log('loadPathname '+pathname);
		//console.log('pathnameHash '+pathnameHash);
		//console.log('loadUrlname '+url);

		link_scroll.click(function() {
			if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
				var target = $(this.hash);
				//target = target.length ? target : $('[name=' + this.hash.slice(1) +']');

				if (target.length) {
					var yScroll = target.offset().top - 100;
					$('html,body').animate({
						scrollTop: yScroll
					}, 700);


					ChangeUrl(url,"#"+target.attr("id"));

					return false;
				}
			}
		});
	});
}


function ChangeUrl(page, url) {
	if (typeof (history.pushState) != "undefined") {
		var obj = {Page:page,Url:url};
		history.pushState(obj, obj.Page, obj.Url);
	} else {
		alert("Browser does not support HTML5.");
	}
}

$(function () {
	$("#button1").click(function () {
		ChangeUrl('Page1', 'Page1.htm');
	});
	$("#button2").click(function () {
		ChangeUrl('Page2', 'Page2.htm');
	});
	$("#button3").click(function () {
		ChangeUrl('Page3', 'Page3.htm');
	});
});


function fixnav(){
	$(window).on('load scroll',function(){
		var scrollWindow = $(window).scrollTop();
		if(scrollWindow >= 148){
			$('.nav').addClass('fixNav');
		}else {
			$('.nav').removeClass('fixNav');
		}
	});
}

/*see more membership benifit*/
$('.row-corporate .seemore').click(function(){
    var parent = $(this).parent();
    var heightDetail = $(parent).find('.detail').outerHeight();
    $(parent).find('.wrapDetail').css({
        'height' : heightDetail
    })
    $(this).remove();
});
/**/
setBtnGallery();
$(window).resize(function(){
    setBtnGallery();
});
function setBtnGallery()
{
    if($('.next-banner-hp-gallery').length != 0)
    {
        var window_width = $(window).width();
        var gallery_width = $('.container').width();
        var position = window_width - gallery_width;
        var prev = $('.prev-banner-hp-gallery.gallery2');
        var next = $('.next-banner-hp-gallery.gallery2');
        console.log(gallery_width);
        console.log(window_width);
        next.css({
            'right' : Math.round(position/2)
        });
        prev.css({
            'left' : Math.round(position/2)
        });
    }

}

/*popUp info contact*/

/*$('.popUpinfoContact').click(function(){
    var tel = $(this).attr('tel');
    var mail = $(this).attr('mail');
    if($('#wrapper').find('.popUp_box_thank.infoContact').length == 0)
        $('#wrapper').append('<div class="popUp_box_thank infoContact"><div class="resultBox"><div class="title">'+'Contact'+'</div><div class="detail"><a href="tel:'+tel+'"> Tel :'+tel+'</a></br><a href="mailto:'+mail+'">E :'+mail+'</a></div></div></div>');
    $('.popUp_box_thank.infoContact').css({'opacity' : 1 , 'display' : 'block'});

    $('.popUp_box_thank.infoContact').click(function(e){
        var container = $('.popUp_box_thank.infoContact .resultBox');
        if((!container.is(e.target)  && container.has(e.target).length === 0))
        {
            $('.popUp_box_thank.infoContact').css({'opacity' : 0 , 'display' : 'none'});
        }
    });

});*/

/*end popUp*/


function setHeightlstPackages()
{
    var lstPackages = $('.lst-packages');
    if(lstPackages.length != 0)
    {
        var max_height = 0;
        var packages = lstPackages.find('.item-packages');
        packages.each(function(){
            console.log($(this).height());
            if($(this).find('.ctn-item-packages').height() > max_height)
            {
                max_height = $(this).find('.ctn-item-packages').height();
            }
        });
        packages.each(function(){
            $(this).find('.ctn-item-packages').css({
                'height' : max_height
            });
        });
    }
}
setTimeout(setHeightlstPackages , 1000);