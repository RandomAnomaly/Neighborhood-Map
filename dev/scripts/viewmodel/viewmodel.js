var ViewModel = function (map, positions) {
  var self = this;

  self.googleMap = map;

  for(var i = 0; i < positions.length; i += 1){
    new google.maps.Marker({
      map: self.googleMap,
      position: positions[i].latlng,
      title: positions[i].name
    })
  }

}


function createMap() {
  return new google.maps.Map(document.getElementById('map'), {
    center: model.position,
    zoom: model.mapDefaultZoom,
    styles: model.mapStyles
  })
}

function init() {
  var locationList = [
    { name: "Wellington", latlng: model.position }
  ]
  var googleMap = createMap();

  ko.applyBindings(new ViewModel(googleMap, locationList));
}