var ViewModel = function (map) {
  var self = this;

  
}


function createMap() {
  return new google.maps.Map(document.getElementById('map'), {
    center: model.position,
    zoom: model.mapDefaultZoom
  })
}

function init() {
  var locationList = [
    { name: "Wellington", latlng: model.position }
  ]
  var googleMap = createMap();

  ko.applyBindings(new ViewModel(googleMap, locationList));
}