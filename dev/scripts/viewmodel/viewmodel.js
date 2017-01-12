// The application's viewmodel
var ViewModel = function (map, positions) {
  var self = this;
  var markers = ko.observableArray([]);

  self.googleMap = map;

  for (var i = 0; i < positions.length; i += 1) {
    new google.maps.Marker({
      map: self.googleMap,
      position: positions[i].latlng,
      title: positions[i].name
    });
  };

  // retrieve a collection of Place objects from the google places api
  var generateLocations = function () {
    service = new google.maps.places.PlacesService(self.googleMap);

    var request = {
      location: model.position,
      radius: model.searchRadius,
      types: model.placesSearchTypes
    };

    service.nearbySearch(request, function (results, status) {
      // TODO: error handling
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i += 1) {
          new google.maps.Marker({
            map: self.googleMap,
            position: results[i].geometry.location,
            title: results[i].name
          })
        }
      }
    });

  } ();

  console.log(self.googleMap);
}

// returns a new google map based on the options in model
function createMap() {
  return new google.maps.Map(document.getElementById('map'), {
    center: model.position,
    zoom: model.mapDefaultZoom,
    styles: model.mapStyles
  })
}

// Object to represent a place, initially marker is set to null
function Place(dataObj){
  this.name = dataObj.name;
  this.latLng = dataObj.latLng;
  this.marker = null;
}

// initialise the application. This is the callback passed to the google maps api
function init() {
  var locationList = [
    { name: "Wellington", latlng: model.position }
  ]
  var googleMap = createMap();
  ko.applyBindings(new ViewModel(googleMap, locationList));
}