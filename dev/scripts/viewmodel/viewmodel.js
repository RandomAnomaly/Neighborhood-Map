var ViewModel = function () {
    var self = this;

    // var uluru = { lat: -25.363, lng: 131.044 };

    // var el = document.createElement('div');

    // var map = new google.maps.Map(el, {
    //     zoom: 4,
    //     center: uluru
    // });

    // this.myMap = ko.observable(el);
    // // initMap = function(){


    // //     var marker = new google.maps.Marker({
    // //       position: uluru,
    // //       map: map
    // //     });
    // // }();

    self.myMap = ko.observable({
        lat: ko.observable(55),
        lng: ko.observable(11)
    });

    
}





// CUSTOM BINDINGS

// Custom binding from http://stackoverflow.com/questions/12722925/google-maps-and-knockoutjs
ko.bindingHandlers.map = {

    init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
        var mapObj = ko.utils.unwrapObservable(valueAccessor());
        var latLng = new google.maps.LatLng(
            ko.utils.unwrapObservable(mapObj.lat),
            ko.utils.unwrapObservable(mapObj.lng));
        var mapOptions = {
            center: latLng,
            zoom: 5,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        mapObj.googleMap = new google.maps.Map(element, mapOptions);
    }


};






var applyBindings = function () {
    ko.applyBindings(new ViewModel());
}

