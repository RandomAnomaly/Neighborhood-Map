var ViewModel = function () {
  var self = this;

  var lt = -41.288889;
  var lon = 174.777222;

  self.myMap = ko.observable({
    lat: ko.observable(lt),
    lng: ko.observable(lon)
  });

  this.cl = function () {
  }
}





// CUSTOM BINDINGS

// Based on custom binding from http://stackoverflow.com/questions/12722925/google-maps-and-knockoutjs
ko.bindingHandlers.map = {

  init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
    var mapObj = ko.utils.unwrapObservable(valueAccessor());
    var latLng = new google.maps.LatLng(
      ko.utils.unwrapObservable(mapObj.lat),
      ko.utils.unwrapObservable(mapObj.lng));
    var mapOptions = {
      center: model.position,
      zoom: model.mapDefaultZoom,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles: model.mapStyles
    };

    mapObj.googleMap = new google.maps.Map(element, mapOptions);
    service = new google.maps.places.PlacesService(mapObj.googleMap);

    var request = {
      location: {lat: -41.288889, lng: 174.777222},
      radius: '500',
      types: ['store']
    };

    // TODO move to model
    service.nearbySearch(request, function (results, status) {
      // TODO: error handling
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i += 1) {
          new google.maps.Marker({
            map: mapObj.googleMap,
            position: results[i].geometry.location,
            title: results[i].name
          })
        }
        console.log(results[0]);
      }
    });

    // mapObj.marker = new google.maps.Marker({
    //   map: mapObj.googleMap,
    //   position: latLng,
    //   title: "Title"
    // });

  }


};

var applyBindings = function () {
  ko.applyBindings(new ViewModel());
}

