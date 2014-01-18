Map = Class.extend({
    init: function () {
        this.map = null;
        this.geocoder = new google.maps.Geocoder();
        this.mylat;
        this.mylng;
        this.amk_address;
        this.amk_lat;
        this.amk_lng;
        this.info = new google.maps.InfoWindow();
        this.infoBox = null;

        this.directionsDisplay = new google.maps.DirectionsRenderer();
        this.directionsService = new google.maps.DirectionsService();
        this.watchPositionId;
        this.marker = new google.maps.Marker();
        this.markersArray = [];
        this.circle;
    },

    showMe: function (callbacksAds) {
        var _self = this;
        if (navigator.geolocation)
            navigator.geolocation.getCurrentPosition(function (location) {
                _self.focusLocation(location);
                _self.geocodePosToAddress(location.coords.latitude, location.coords.longitude, callbacksAds);

            }, function (error) {
                switch (error.code) {
                    case error.TIMEOUT:
                        console.log('Time out...');
                        break;
                    case error.POSITION_UNAVAILABLE:
                        console.error('Vị trí của bạn không được tìm thấy');
                        break;
                    case error.PERMISSION_DENIED:
                        console.error('Vị trí của bạn không cho phép truy cập');
                        break;
                    case error.UNKNOWN_ERROR:
                        console.error('Không hiểu lý do tại sao :))');
                        break;
                }
            });
    },

    geocodePosToAddress: function (lat, lng, successCallback) {
        var pos = new google.maps.LatLng(lat, lng);
        this.geocoder.geocode({
            latLng: pos
        }, function (results) {
            if (results && results.length > 0) {
                if (results[1]) {
                    for (var i = 0; i < results[0].address_components.length; i++) {
                        for (var b = 0; b < results[0].address_components[i].types.length; b++) {
                            if (results[0].address_components[i].types[b] == "administrative_area_level_1") {
                                city = results[0].address_components[i];
                                if (successCallback) {
                                    successCallback(city.long_name);
                                    return;
                                }
                            }
                        }
                    }
                }
            }
        });
    },

    focusLocation: function (position) {
        this.focus(position.coords.latitude, position.coords.longitude);
    },

    focus: function (lat, lng) {
        var location = new google.maps.LatLng(lat, lng);
        this.map.setCenter(location);
    },

    focusByAdr: function (adr, fn) {
        var latLng;
        var _self = this;
        this.geocoder.geocode({
            address: adr + ' - Việt Nam'
        }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                latLng = results[0].geometry.location;
                if (fn) fn();
            } else {
                console.log('Không thể chuyển Focus đến địa chỉ này được!');
            }
            _self.map.setCenter(latLng);
        });
    },

    deleteAllMarker: function () {
        if (this.markersArray) {
            for (i in this.markersArray) {
                this.markersArray[i].setMap(null);
            }
            this.markersArray.length = 0;
        }
    }
});


MarkMap = Map.extend({
    init: function () {
        this._super();
        this.circle;
    },

    setMap: function (div_id, options) {
        var self = this;
        $('#div_id').html('');
        var myOptions = options || {
            zoom: 12,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            mapTypeControlOptions: {
                style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
            },
            disableDoubleClickZoom: true
        };
        self.map = new google.maps.Map(document.getElementById(div_id), myOptions);
        self.showMe();
        google.maps.event.addListener(self.map, 'click', function (event) {

        });
        this.defaultLocation = new google.maps.LatLng(21.69847032728747, 105.9514422416687);
        this.mapCanvas = $("#" + div_id);
        this.mapCanvasOriginW = this.mapCanvas.css('width');
        this.mapCanvasOriginH = this.mapCanvas.css('height');
    },
    /*setMapLatLng: function (divId, lat, lng) {
        var self = this;
        $('#div_id').html('');
        var myOptions = {
            zoom: 12,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            mapTypeControlOptions: {
                style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
            },
            disableDoubleClickZoom: true
        };
        self.map = new google.maps.Map(document.getElementById(divId), myOptions);
        self.showMe();
        google.maps.event.addListener(self.map, 'click', function (event) {});
        this.defaultLocation = new google.maps.LatLng(lat, lng);
        this.mapCanvas = $("#" + divId);
        this.mapCanvasOriginW = this.mapCanvas.css('width');
        this.mapCanvasOriginH = this.mapCanvas.css('height');
    },*/
    
    setFullscreen: function () {
        this.map.controls[google.maps.ControlPosition.TOP_RIGHT].push(new FullScreenControl(this.map));
    },

    autoSeach: function () {
        var self = this;
        var input = document.getElementById('amk-searchTextField');
        var autocomplete = new google.maps.places.Autocomplete(input);
        autocomplete.bindTo('bounds', self.map);
        google.maps.event.addListener(autocomplete, 'place_changed', function () {
            var place = autocomplete.getPlace();
            if (place.geometry.viewport) {
                self.map.fitBounds(place.geometry.viewport);
                self.addMarker(place.geometry.location.lat(), place.geometry.location.lng(), "found.png", "Địa điểm được tìm thấy...");
                self.geocodePosition(place.geometry.location);
            } else {
                self.map.setCenter(place.geometry.location);
                self.map.setZoom(10);
            };
        });
    },

    geocodePosition: function (pos) {
        var self = this;
        this.geocoder.geocode({
            latLng: pos
        }, function (results) {
            if (results && results.length > 0) {
                var address = results[0].formatted_address;
            } else {
                console.log('Cannot determine address at this location.');
            }
        });
    },

    addMarker: function (lat, lng, txt, isFocus) {
        var _self = this;
        var img = AppConfigs.host + "/content/Images/Icons/buildings.png";
        var icon = new google.maps.MarkerImage(img, null, null, new google.maps.Point(2, 35), new google.maps.Size(25, 25));
        var mk = new google.maps.Marker({
            icon: icon
        });
        this.markersArray.push(mk);
        mk.setMap(_self.map);
        var location = new google.maps.LatLng(lat, lng);
        mk.setPosition(location);
        var newMark = _self.markersArray[_self.markersArray.length - 1];

        if (isFocus == true) {
            if (!this.infowindow)
                this.infowindow = new InfoBubble();

            this.infowindow.setContent(txt);
            this.infowindow.open(_self.map, newMark);
        }
        google.maps.event.addListener(newMark, 'click', function () {
            _self.infowindow.setContent(txt);
            _self.infowindow.open(_self.map, newMark);
        });
    },

    fullScreen: function (focus) {
        this.mapCanvas.css("position", 'fixed')
                       .css('top', 0)
                       .css('left', 0)
                       .css("width", '100%')
                       .css("height", '100%')
                       .css("z-index", 1);
        google.maps.event.trigger(this.map, 'resize');
        if (focus) this.map.setCenter(this.defaultLocation);
        return false;
    },

    exitFullScreen: function () {
        this.mapCanvas.css("position", 'relative').
        css('top', 0).
        css("width", this.mapCanvasOriginW).
        css("height", this.mapCanvasOriginH);
        google.maps.event.trigger(this.map, 'resize');
        return false;
    }
});
