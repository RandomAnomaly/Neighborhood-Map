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
      center: latLng,
      zoom: 18,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles: [
            {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
            {
              featureType: 'administrative.locality',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi',
              stylers: [{visibility: 'off'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry',
              stylers: [{color: '#38414e'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry.stroke',
              stylers: [{color: '#212a37'}]
            },
            {
              featureType: 'road',
              elementType: 'labels.text.fill',
              stylers: [{color: '#9ca5b3'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry',
              stylers: [{color: '#746855'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry.stroke',
              stylers: [{color: '#1f2835'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'labels.text.fill',
              stylers: [{color: '#f3d19c'}]
            },
            {
              featureType: 'transit',
              elementType: 'geometry',
              stylers: [{color: '#2f3948'}]
            },
            {
              featureType: 'transit.station',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [{color: '#17263c'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.fill',
              stylers: [{color: '#515c6d'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.stroke',
              stylers: [{color: '#17263c'}]
            }
          ]
    };

    mapObj.googleMap = new google.maps.Map(element, mapOptions);
    service = new google.maps.places.PlacesService(mapObj.googleMap);

    var request = {
      location: latLng,
      radius: '500',
      types: ['store']
    };
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

