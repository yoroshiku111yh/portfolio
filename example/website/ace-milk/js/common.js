$(document).ready(function(){


	$('.title-itemTabs').click(function () {
		$(this).closest('.lst-tabs').find('.ctn-tabs').fadeOut(100);
		$(this).parent().find('.ctn-tabs').fadeIn(100);
	})



	var heightWin = $(window).height();
	var widthWin = $(window).width();

	if(widthWin > 640){
		$('.lst-tabs .item-tabs').click(function(){
			switchTabs($(this));
		})
	}
	if(widthWin > 1023 && heightWin > 768){
		$('.article-ace').css('height',heightWin);
	}

	var advanWd = $('#advantages .container').width();
	var leftFin = Math.round((widthWin - advanWd)/2);
	var funResize = function(){
		if(widthWin > 850 && heightWin >= 600){
			if(leftFin - 160 > 0){
				$('.fincf').css({
					'left': leftFin - 160
				})
			}else {
				$('.fincf').css({
					'left': ''
				})
			}
		}
	}
	funResize();
	//$(window).load(function(){
		$(window).resize(funResize());
	//});

	/*var heightContentTabs = $('.container-tabs .ctn-tabs .currentTabs').height();
	if(widthWin > 640){
		$('.container-tabs .ctn-tabs').css('height',heightContentTabs);
	}*/

	var heightTitleTabs = $('.tabs-advant .lst-tabs').height();
	$('.item-tabs .title-itemTabs').css('height', heightTitleTabs - 26 );

	$('.selected').click(function(e){
		e.stopPropagation()
		if($('.lst-select').is(':hidden')){
			$(this).closest('.select-distribute').find('.lst-select').stop().slideDown(100);
			$(this).parent().stop().addClass('active');
		}else {
			$(this).closest('.select-distribute').find('.lst-select').stop().slideUp(100);
			$(this).parent().stop().removeClass('active');
		}
	})

	$('.item-select').click(function(e){
		e.stopPropagation()
		var content_select = $('.inner-select .selected');
		var current_click = $(this).find('.txt-select').html();
		var currentVal = $(this).find('.txt-select').attr('data-value');
		console.log(currentVal);
		content_select.html(current_click);
		content_select.attr('data-name',current_click);
		content_select.attr('data-value', currentVal);
		$(this).closest('.select-distribute').find('.lst-select').stop().slideUp(100);
		$(this).closest('.select-distribute').find('.inner-select').stop().removeClass('active');

		var functions = $('.inner-select .selected').attr('callback');
		if(functions)
		{
			var fn = eval(functions);
			fn();
		}

	})

/*	function test(){
		alert('abs')
	}*/

	$('body').click(function(){
		$('.lst-select').stop().slideUp(100);
		$('.inner-select').stop().removeClass('active');
	});


	var heightTks = $('.content-thanks').height();
	var widthTks = $('.content-thanks').width();
	$('.content-thanks').css({
		'top': '50%',
		'margin-top': Math.round(-heightTks/2)
	});



	$('.submitForm').click(function(){
		var valueEmail = $('input[type=email]').val();
		var valueNumber = $('input.numPhone').val();
		if(!$('#form-contact .ipContact').val()){
			$('.errSup').stop().css('display', 'block');
			$('#form-contact .ipContact, .textarea').stop().addClass('err');
			return false;
		} else if (!IsEmail(valueEmail)) {
			$('input[type=email] + .errSup').stop().css('display', 'block');
			$('input[type=email]').stop().addClass('err');
			return false;
		} else if (!IsPhone(valueNumber)) {
			$('.numPhone + .errSup').stop().css('display', 'block');
			$('input.numPhone').stop().addClass('err');
			return false;
		}else if (!$('.textarea').val()) {
			$('.textarea + .errSup').stop().css('display', 'block');
			$('.textarea').stop().addClass('err');
			return false;
		}else {
			callbackFn($(this));
			$('.thanks').stop().css({
				'opacity': 1,
				'visibility': 'visible'
			});
			return false;
		}

	});

	$('.closeThanks').click(function(){
		$('.thanks').stop().css({
			'opacity': '',
			'visibility': ''
		})
	});

	$('#form-contact .ipContact, .textarea').blur(function(){
		if( !$(this).val() ) {
			//$(this).stop().addClass('err');
			//$('.textarea').stop().addClass('err');
		}else {
			$(this).parent().find('.errSup').stop().css('display', '');
			$(this).stop().removeClass('err');
			$('.textarea').stop().removeClass('err');
		}
	});

	$('.menu-li > a').click(function(){
		$(this).parents('.menu-main').stop().find('a.active').removeClass('active');
		$(this).addClass('active');
	});


	scrollMenu();
	fixnav();

});


function callbackFn(cal){
	var functions = cal.attr('callback');
	if(functions)
	{
		var fn = eval(functions);
		fn();
	}
}

function test(){
	console.log('alo')
}


function IsEmail(email) {
	var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	return regex.test(email);
}
function IsPhone(number) {
	var regex = /^[0-9]{9,11}$/;
	return regex.test(number);
}

function scrollMenu() {
	var link_scroll = $('a[href*=#]:not([href=#])');
	link_scroll.click(function() {
		var nameLink = location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname;
		if (nameLink) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
			if (target.length) {
				var yScroll = target.offset().top;
				$('html,body').animate({
					scrollTop: yScroll
				}, 700);
				return false;
			}
		}
	});
}

function switchTabs(obj){
	obj.parent().find('.title-itemTabs').removeClass('active');
	obj.find('.title-itemTabs').addClass('active');
	var mainTabs = obj.parents('.tabs-advant');
	mainTabs.find('.container-tabs div').hide();
	mainTabs.find('.ctn-tabs').removeClass('showTabs');
	$(".ctn-tabs", mainTabs).each(function(index, element){
		if(index == obj.index())
			$(element).show().addClass('showTabs');

	})
	return false;
}



function fixnav(){
	$(window).scroll(function(){
		var scrollWindow = $(window).scrollTop();
		$('.navMobile').css('top', scrollWindow);
		if(scrollWindow >= 1){
			$('.nav-menu').addClass('fixNav');
			$('body').addClass('activeScroll_bdy');
			/*$('.wrapper section[id]').each(function(i){
				if($(this).position().top <= scrollWindow){
					$('.menu-li > a.currentNav').removeClass('currentNav');
					$('.menu-li > a').eq(i + 1 ).addClass('currentNav');
				}
			});*/
		}else {
			$('.nav-menu').removeClass('fixNav');
			$('body').removeClass('activeScroll_bdy');
		}
	});
}

function pushMenu(){
	var menuBtn = $('.hamburger');
	var pushLeft = $('.navMobile');
	var heightOvelay = $(document).height();
	menuBtn.toggleClass('activePush');
	$('.overlayPush').toggleClass('darkoverlay');
	$('body').toggleClass('push_body');
	pushLeft.toggleClass('pushMenu_show');
	var scrollWindow = $(window).scrollTop();
	if ($('.overlayPush').hasClass('darkoverlay')) {
		$('.overlayPush').css({'height': heightOvelay});
		$('.fixNav ').css({
			'transform': 'translate3d(0,'+ scrollWindow +'px, 0)'
		});
	}else {
		$('.overlayPush').css({'height':''});
		$('.fixNav ').css({
			'transform': 'translate3d(0,0,0)'
		});
	}
}
