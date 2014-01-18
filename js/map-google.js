MapGoogle = {
    Marker : function (title, lat, lng, map) {
        return new google.maps.Marker({
            position: new google.maps.LatLng(lat, lng),
            map: map,
            title: title,
            icon: 'http://lequang.vn/Content/Images/Icons/buildings.png?7200',
            draggable: true
        });
    },
    GetLatLng : function (lat, lng, contentAds, renderTo) {

        var options = {
            zoom: 15,
            center: new google.maps.LatLng(lat, lng),
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        var map = new google.maps.Map(document.getElementById(renderTo), options);

        var marker = MapGoogle.Marker('Địa chỉ', lat, lng, map);

        var infowindow = new InfoBubble({
            content: contentAds
        });
        infowindow.open(map, marker);
        google.maps.event.addListener(marker, 'click', function () {
            infowindow.open(map, marker);
        });
    },
    Initialize : function (lat, lng, contentAds) {

        var options = {
            zoom: 15,
            center: new google.maps.LatLng(lat, lng),
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        var map = new google.maps.Map(document.getElementById('lq-map-canvas-details'), options);

        var infowindow = new InfoBubble({
            content: contentAds
        });
        infowindow.open(map, marker);

        google.maps.event.addListener(marker, 'click', function () {
            infowindow.open(map, marker);
        });

    },
};
