export async function pageHome() {

  // Get the modal

  if (location.pathname === "/") {

    const mapElement = document.getElementById("map");

    if (mapElement) {
      const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: new google.maps.LatLng(25.0617177, 55.312431),
        mapTypeId: google.maps.MapTypeId.ROADMAP
      });

      const infowindow = new google.maps.InfoWindow();

      let marker, i;

      for (i = 0; i < locations.length; i++) {
        marker = new google.maps.Marker({
          position: new google.maps.LatLng(locations[i][1], locations[i][2]),
          map: map
        });

        google.maps.event.addListener(marker, 'click', (function (marker, i) {
          return function () {
            infowindow.setContent(locations[i][0]);
            infowindow.open(map, marker);
          }
        })(marker, i));
      }
    }
  }
}
