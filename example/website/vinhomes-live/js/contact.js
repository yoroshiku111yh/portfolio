/**
 * Created by minhvu on 12/16/2015.
 */
function initMap(lat, lng) {
    var myLatLng = {lat: lat, lng: lng};

    // Create a map object and specify the DOM element for display.
    var map = new google.maps.Map(document.getElementById('mapContact'), {
        center: myLatLng,
        scrollwheel: true,
        zoom: 16
    });

    // Create a marker and set its position.
    var marker = new google.maps.Marker({
        map: map,
        position: myLatLng,
        title: 'Vinhomes Riverside'
    });
}