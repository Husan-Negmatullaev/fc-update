import { isMobile, getResource } from "../functions.js";
import { MarkerClusterer } from "@googlemaps/markerclusterer";




export async function pageMap() {

  // Get the modal

  // Fakes the loading setting a timeout




  const body = document.body;
  if (location.pathname === "/map.html") {
    
    // const dataText = await getResource("/text/");
    // document.querySelector("meta[name='keywords']").setAttribute("content", dataText[0].key_text)

    // const data = await getResource("/an_object/");

    // setTimeout(function() {
    //   $('body').addClass('loaded');
    //   console.log('map.html')
    // }, 5000);

    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 10,
      center: { lat: 25.0990514, lng: 55.2840639 },
    });

    var locations = [];
    var markers = [];
    var marker1 = [];
    var title = [];
    var img = [];
    var infowindow = new google.maps.InfoWindow();
    //  console.log(data.length);
    for (var i = 0; i < data.length; i++) {
      locations[i] = { lat: parseFloat(data[i].latitude), lng: parseFloat(data[i].longitude) }


      marker1[i] = new google.maps.Marker({ position: locations[i], map: map });

      markers.push(marker1[i])
    }
    for (var i = 0; i < data.length; i++) {
      title[i] = data[i].title
      img[i] = data[i].mainphoto
      google.maps.event.addListener(markers[i], 'click', (function (markers, i) {
        return function () {
          infowindow.setContent("<div style='float:left'><a href='/project.html#" + data[i].id + "'><img src='" + img[i] + "' width='200px' height='200px'></a></div><div style='float:right; padding: 10px;'><b>" + title[i] + "</b><br/>" + data[i].starting_price + "<br/>" + data[i].area + "</div>");
          infowindow.open(map, markers[i]);
        }
      })(markers, i));
    }

    const imagePath = "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m";
    const clusterOptions = {

      zoomOnClick: true,

    };
    new MarkerClusterer({ markers, map, clusterOptions });
  }
}
