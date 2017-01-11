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

// Custom binding from http://stackoverflow.com/questions/12722925/google-maps-and-knockoutjs
ko.bindingHandlers.map = {

	init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
		var mapObj = ko.utils.unwrapObservable(valueAccessor());
		var latLng = new google.maps.LatLng(
			ko.utils.unwrapObservable(mapObj.lat),
			ko.utils.unwrapObservable(mapObj.lng));
		var mapOptions = {
			center: latLng,
			zoom: 18,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};

		mapObj.googleMap = new google.maps.Map(element, mapOptions);


		mapObj.marker = new google.maps.Marker({
			map: mapObj.googleMap,
			position: latLng,
			title: "Title"
		});

	}


};

var applyBindings = function () {
	ko.applyBindings(new ViewModel());
}

