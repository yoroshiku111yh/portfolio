/**
 * Created by minhvu on 9/25/2015.
 */
$(document).ready(function(){
        // An array of dates
        var eventDates = {};
        eventDates[ new Date( '10/16/2015' )] = 'Special Friday Promotion';
        eventDates[ new Date( '11/16/2015' )] = 'Special Friday Promotion';
        var array_info_event = [{'day' : 16 , 'month' : 10 , 'year' : 2015 , 'title' : 'Special Friday Promotion' , 'detail' : 'Special Friday Promotion starts from 16 October 2015' , 'link' : '#1' ,'linktitle' : 'name link' ,'description' : 'Special Friday Promotion 1'},
                                {'day' : 16 , 'month' : 11 , 'year' : 2015 , 'title' : 'Special Friday Promotion' , 'detail' : 'Special Friday Promotion starts from 16 October 2015' , 'link' : '#2' ,'linktitle' : 'name link' ,'description' : 'Special Friday Promotion 2'}];
        // datepicker


        /*ngon ngu*/

        $.datepicker.regional['vn'] = {
            closeText: 'Gần',
            prevText: 'Trước',
            nextText: 'Sau',
            currentText: 'Hiện tại',
            monthNames: ['Tháng 1 ', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8',
                'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
            ],
            monthNamesShort: ['Th.1', 'Th.2', 'Th.3', 'Th.4', 'Th.5', 'Th.6', 'Th.7', 'Th.8', 'Th.9', 'Th.10', 'Th.11', 'Th.12'],
            dayNames: ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật'],
            dayNamesShort: ['T 2', 'T 3', 'T 4', 'T 5', 'T 6', 'T 7', 'CN'],
            dayNamesMin: ['T 2', 'T 3', 'T 4', 'T 5', 'T 6', 'T 7', 'CN'],
            weekHeader: 'Tuần', // wk
            dateFormat: 'dd/mm/yy',
            firstDay: 1,
            isRTL: false,
            showMonthAfterYear: false,
            yearSuffix: ''
        };

        $.datepicker.regional['en'] = {
            dayNamesMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
        };

        $.datepicker.setDefaults($.datepicker.regional['vn']);
        /**/

        $("#calendar").datepicker({
            inline: true,
            firstDay: 1,
            showOtherMonths: true,
            beforeShowDay: function(date) {
                var highlight = eventDates[date];
                if( highlight ) {
                    return [true, "eventCalendar", highlight];
                } else {
                    return [true, '', ''];
                }
            },
            onSelect: function(date ) {
                console.log(date);
                if(eventDates[new Date(date)])
                {
                    //

                    setTimeout(function(){
                        var day_selected = $('.ui-datepicker-calendar  tbody td.ui-datepicker-current-day');
                        var pos_par_top = $('#calendar').offset().top;
                        //var pos_par_left = $('#calendar').offset().left;
                        var pos_clicked_top = day_selected.offset().top;
                        //var pos_clicked_left = day_selected.offset().left;
                        var heightTitleandTheard = $('.ui-datepicker-title').outerHeight() + $('.ui-datepicker-calendar thead').outerHeight();
                        var heightTdClicked = $('.ui-datepicker-calendar  tbody td.ui-datepicker-current-day').outerHeight();
                        //var pos_left = pos_clicked_left -  pos_par_left - $('.infoEvent').width()/2;
                        var pos_top = pos_clicked_top - ( pos_par_top + heightTitleandTheard + heightTdClicked*0.5 );
                        var pos_left = 0;
                        var left_total = 0;
                        $('#calendar table tr').each(function(){
                            if($(this).find('td').hasClass('eventCalendar'))
                            {
                                var checking = $(this).find('td.eventCalendar');
                                if(checking.hasClass('ui-datepicker-current-day'))
                                {
                                    $(this).addClass('trClicked');
                                    $('#calendar table .trClicked td').each(function(){
                                        pos_left += $(this).outerWidth();
                                        if($(this).hasClass('ui-datepicker-current-day'))
                                        {
                                            $('#calendar table .trClicked td').each(function(){
                                                left_total+= $(this).outerWidth();
                                            });
                                            pos_left = pos_left - $(this).outerWidth();
                                            if(pos_left < left_total && pos_left > $(this).outerWidth() && pos_left != left_total - $(this).outerWidth())
                                                pos_left = pos_left - $('.infoEvent').outerWidth()/2  ;
                                            else if(pos_left > $(this).outerWidth() && pos_left != left_total - $(this).outerWidth())
                                                pos_left = pos_left - $('.infoEvent').outerWidth();
                                            else if((pos_left == left_total - $(this).outerWidth()))
                                                pos_left = left_total - $('.infoEvent').outerWidth();
                                            return false;
                                        }
                                    });
                                }
                            }
                        });
                        var left_arrow = $('.infoEvent').width()/2;
                        if(pos_left == 0)
                            left_arrow = 0;
                        else if(left_total == pos_left + $('.infoEvent').outerWidth() )
                            left_arrow = $('.infoEvent').outerWidth() - $('.infoEvent .arrow').outerWidth();
                        console.log(pos_left +'""'+ pos_top);
                        left_total = 0;

                        $.each(array_info_event , function(){
                            if(parseInt(this.day) == parseInt(day_selected.find('a.ui-state-default.ui-state-active').html()) && parseInt(this.month) == parseInt(day_selected.attr('data-month')) + 1 && parseInt(this.year) == parseInt(day_selected.attr('data-year')))
                            {
                                $('.infoEvent .title').html(this.title);
                                $('.infoEvent .detail').text(this.detail);
                                if(this.link == '')
                                    $('.infoEvent .linkEvent').css({'display' : 'none'});
                                else
                                    $('.infoEvent .linkEvent').css({'display' : 'block'});
                                $('.infoEvent .linkEvent').attr('href' , this.link);
                                $('.infoEvent .linkEvent').html(this.linktitle);
                                positionPopUpEvent( pos_left , pos_top , left_arrow);
                                $('.infoEvent').css({'display' : 'block' , 'opacity' : 1});
                                return false;
                            }
                        });
                        addDescription();
                        //setTimeout(addDescription , 0);

                    },0);

                    //
                }
                else
                {
                    $('.infoEvent').css({'display' : 'none' , 'opacity' : 0});
                    $('.descriptionEvent').css({'opacity' : 0 , 'display' : 'none'});
                }

                //addDescription();
            }
        });

    function addDescription()
    {
        var day_selected = $('#calendar .eventCalendar.ui-datepicker-current-day');
        console.log(day_selected);
        if(day_selected.length != 0) {
            //day_selected.find('a').html('hello');
            var width_div_selected = day_selected.outerWidth();
            var height_div_selected = day_selected.outerHeight();
            var size_font = parseInt(day_selected.find('a').css('font-size'));
            console.log(size_font);
            var top_seleted_event = day_selected.offset().top;
            var left_seleted_event = day_selected.offset().left;
            var top_div_calendar = $('#calendar').offset().top;
            var left_div_calendar = $('#calendar').offset().left;
            var top = top_seleted_event - top_div_calendar;
            var left = left_seleted_event - left_div_calendar;
            $('.descriptionEvent').css({
                'top': top + size_font,
                'left': left,
                'width': width_div_selected,
                'height': height_div_selected - size_font - 15 // 15 is a padding top in css
            });
            $.each(array_info_event, function () {
                if (parseInt(this.day) == parseInt(day_selected.find('a.ui-state-default.ui-state-active').html()) && parseInt(this.month) == parseInt(day_selected.attr('data-month')) + 1 && parseInt(this.year) == parseInt(day_selected.attr('data-year'))) {
                    $('.descriptionEvent').html(this.description);
                    $('.descriptionEvent').css({'opacity': 1, 'display': 'block'});
                    return false;
                }
            });
        }
    }

    function positionPopUpEvent( p_l , p_t  , l_r )
    {

        $('.infoEvent').css({
            'top' : p_t,
            'left' : p_l
        });
        $('.infoEvent .arrow').css({
            'left' : l_r
        });
    }

    $(document).on('click' , '.ui-datepicker-next', function(){
        $('.infoEvent').css({'display' : 'none' , 'opacity' : 0});
        $('.descriptionEvent').css({'opacity' : 0 , 'display' : 'none'});
    });
    $(document).on('click' , '.ui-datepicker-prev', function(){
        $('.infoEvent').css({'display' : 'none' , 'opacity' : 0});
        $('.descriptionEvent').css({'opacity' : 0 , 'display' : 'none'});
    });
    $(window).resize(function(){
        addDescription();
        positionPopUpEvent();
    });
});