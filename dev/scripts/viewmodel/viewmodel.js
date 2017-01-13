// The application's viewmodel
var ViewModel = function (map) {
  var self = this;
  self.placeList = ko.observableArray([]);
  self.searchString = ko.observable("");
  self.googleMap = map;

  // retrieve a collection of Place objects from the google places api
  var generateLocations = function () {
    service = new google.maps.places.PlacesService(self.googleMap);

    var request = {
      location: model.position,
      radius: model.searchRadius,
      types: model.placesSearchTypes
    };

    // performs the google places api nearbySearch and returns a collection of Places
    service.nearbySearch(request, function (results, status) {
      // TODO: error handling
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i += 1) {
          var place = new Place({
            name: results[i].name,
            latLng: results[i].geometry.location
          }, self.googleMap);
          self.placeList.push(place);
        }
      }
    });
  } ();

  // Returns a filtered place list based on the search string
  self.filteredItems = ko.computed(function () {
    var filter = self.searchString().toLowerCase();
    if (!filter) {
      self.placeList().forEach(function(v,i){
        v.isVisible(true);
      });
      return self.placeList();
    } else {
      return ko.utils.arrayFilter(self.placeList(), function (item) {
        var doesMatch = item.name.toLowerCase().startsWith(filter);
        item.isVisible(doesMatch);
        return doesMatch;
      });
    }
  });
};

// returns a new google map based on the options in model
function createMap() {
  return new google.maps.Map(document.getElementById('map'), {
    center: model.position,
    zoom: model.mapDefaultZoom,
    styles: model.mapStyles,
    disableDefaultUI: true
  });
}

// Object to represent a place
function Place(dataObj, map) {
  var marker;
  this.name = dataObj.name;
  this.latLng = dataObj.latLng;
  marker = new google.maps.Marker({
    // map: map,
    position: this.latLng,
    title: this.name
    //animation: google.maps.Animation.DROP
  });

  this.isVisible = ko.observable(false);

  this.isVisible.subscribe(function (currentState) {
    if (currentState) {
      marker.setMap(map);
    } else {
      marker.setMap(null);
    }
  });

  this.isVisible(true);
}

// initialise the application. This is the callback passed to the google maps api
function init() {
  var googleMap = createMap();
  ko.applyBindings(new ViewModel(googleMap));
}