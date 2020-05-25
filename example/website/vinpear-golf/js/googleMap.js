/**
 * Created by minhvu on 9/9/2015.
 */

$(document).ready(function() {

    var lat = parseFloat($('.DropDownContent .value.where').attr('lat'));
    var lng = parseFloat($('.DropDownContent .value.where').attr('lng'));
    var address = $('.DropDownContent .value.where').attr('address')+'</br>';
    var tel = '<a href="tel:'+$('.DropDownContent .value.where').attr('tel')+'">Tel :'+$('.DropDownContent .value.where').attr('tel')+'</a></br>';
    var mail = '<a href="mailto:'+$('.DropDownContent .value.where').attr('mail')+'">Email :'+$('.DropDownContent .value.where').attr('mail')+'</a></br>';
    var detail = address + tel + mail;
    console.log(detail);
    function map()
    {
        var title = $('.DropDownContent .value.where').html();
        //12.2130528,109.2578774
        var map = new google.maps.Map(document.getElementById('map'), {
            center : {lat : lat , lng : lng},
            scrollwheel: true,
            zoom: 15,
        });
        var marker = new google.maps.Marker({
            map: map,
            position: {lat : lat , lng : lng},
            title: title
        });
        var infowindow = new google.maps.InfoWindow({
            content : detail
        });
        marker.setMap(map);
        infowindow.open(map , marker);
    }
    map();

    $('.DropDownContent .list li').click(function(){

        var value = $(this).find('.value').html();
        lat = parseFloat($(this).find('.value').attr('lat'));
        lng = parseFloat($(this).find('.value').attr('lng'));

        address = $(this).find('.value').attr('address');
        tel     = $(this).find('.value').attr('tel');
        mail    = $(this).find('.value').attr('mail');

        $('.DropDownContent .value.where').html(value);
        $('.DropDownContent .value.where').attr('lat',lat);
        $('.DropDownContent .value.where').attr('lng',lng);
        $('.DropDownContent .value.where').attr('address',address);
        $('.DropDownContent .value.where').attr('tel',tel);
        $('.DropDownContent .value.where').attr('mail',mail);

        address = $('.DropDownContent .value.where').attr('address')+'</br>';
        tel = '<a href="tel:'+$('.DropDownContent .value.where').attr('tel')+'">Tel :'+$('.DropDownContent .value.where').attr('tel')+'</a></br>';
        mail = '<a href="mailto:'+$('.DropDownContent .value.where').attr('mail')+'">Email :'+$('.DropDownContent .value.where').attr('mail')+'</a></br>';
        detail = address + tel + mail;
        map();

        $('.googleMap .DropDownContent').removeClass('actived');
        $('.dropDown').removeAttr('style');
        $('.DropDownContent').removeAttr('style');
    });

    /*googleMap*/

    /*function geocodeAddress(geocoder, resultsMap , address) {
        var address = address;
        geocoder.geocode({'address': address}, function(results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
                resultsMap.setCenter(results[0].geometry.location);
                var marker = new google.maps.Marker({
                    map: resultsMap,
                    position: results[0].geometry.location
                });
            } else {
                alert('Geocode was not successful for the following reason: ' + status);
            }
        });
    }*/


    var directionService = new google.maps.DirectionsService();
    var directionsDisplay;
    var position = new google.maps.LatLng(lat, lng);

    function getGoogleDirection() {
        var start = $('.inputFrom.map').val();
        directionsDisplay = new google.maps.DirectionsRenderer();

        /*
         * switch(mode) {
         case 1:
         TravelMode = google.maps.TravelMode.DRIVING;
         break;
         case 2:
         TravelMode = google.maps.TravelMode.TRANSIT;
         break;
         case 3:
         TravelMode = google.maps.TravelMode.WALKING;
         break;
         default:
         TravelMode = google.maps.TravelMode.DRIVING;
         break;
         }
         * */
        var request = {
            origin: start,
            destination: position,
            travelMode: google.maps.TravelMode.DRIVING
        };
        directionService.route(request, function(response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
            }
        });

        var myOptions = {
            zoom: 18,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            disableDefaultUI:true,
            mapTypeControl:true
        };
        var map = new google.maps.Map(document.getElementById('map'),myOptions);

        directionsDisplay.setMap(map);
    }
    $('.buttonFind').click(function(){
        if($('.inputFrom.map').val())
            getGoogleDirection();
    });
});