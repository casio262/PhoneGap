LqGoogleMap = {};
LqGoogleMap.LandProjectWinDow = function (LandProjectId, NameProject, Date, ImageUrl, MainContent) {
    var ContentHtmlShow = '<div class="lq-box-google-map">';
    ContentHtmlShow += '<div class="lq-box-google-map-title lq-header-small-add">';
    ContentHtmlShow += '<a href="' + LandMobi.getterHref(undefined, LandProjectId, NameProject) + '">' + LqUtils.TrunLength(NameProject, 40, '...') + '</a>';
    ContentHtmlShow += '</div>';
    ContentHtmlShow += '<div class="lq-box-google-map-content">';
    ContentHtmlShow += '<div class="lq-box-google-map-content-image">';
    ContentHtmlShow += '<img src="' + ImageUrl + '" width="80px" height="70px" />';
    ContentHtmlShow += '</div>';
    ContentHtmlShow += '<div class="lq-box-google-map-content-main">';
    ContentHtmlShow += LqUtils.TrunLength(MainContent, 100, "...");
    ContentHtmlShow += '</div>';
    ContentHtmlShow += '</div>';
    ContentHtmlShow += '</div>';
    return ContentHtmlShow;
};

LqGoogleMap.ATMWinDow = function (bankId, address) {
    var ContentHtmlShow = '<div class="lq-box-google-map">';
    ContentHtmlShow += '<div class="lq-box-google-map-title lq-header-small-add">';
    ContentHtmlShow += '<a>' + FinancialMobi.GetBankHomeCacheGetName(bankId) + '</a>';
    ContentHtmlShow += '</div>';
    ContentHtmlShow += '<div class="lq-box-google-map-content">';
    ContentHtmlShow += '<div class="BankItem lq-box-bank-ATM-item">';
    ContentHtmlShow += '<img class="lq-bank-ATM-item-img" src="' + FinancialMobi.GetImages(FinancialMobi.GetBankHomeCacheGetImg(bankId)) + '" alt="' + FinancialMobi.GetBankHomeCacheGetName(bankId) + '" width="101px" height="43px"/>';
    ContentHtmlShow += '</div>';
    ContentHtmlShow += '<div class="lq-box-google-map-content-main">';
    ContentHtmlShow += address;
    ContentHtmlShow += '</div>';
    ContentHtmlShow += '</div>';
    ContentHtmlShow += '</div>';
    return ContentHtmlShow;
};

LqGoogleMap.LandFloorWinDow = function (LandSmallId, Title, LandAddress, imgFloor) {
    var img = "";
    var ContentHtmlShow = '';
    if (imgFloor != undefined)
        img = imgFloor;
    else if (imgFloor == undefined || imgFloor == null || imgFloor == "")
        img = "http://lequang.vn/Content/Images/Icons/thumb.iconDefaultLand.png?7200";
    ContentHtmlShow = '<div class="lq-box-google-map">';
    ContentHtmlShow += '<div class="lq-box-google-map-title lq-header-small-add">';
    ContentHtmlShow += '<a href="http://lequang.vn/bat-dong-san/san-bat-dong-san/tin-"' + LandSmallId + '/' + LqUtils.UnSign(Title) + '.vhtml" title="' + Title + '">' + LqUtils.TrunLength(Title, 35, '...') + '</a>';
    ContentHtmlShow += '</div>';
    ContentHtmlShow += '<div class="lq-box-google-map-content">';
    ContentHtmlShow += '<div class="lq-box-google-map-content-image">';
    ContentHtmlShow += '<img src="' + img + '" width="80px" height="70px" alt="" title="' + Title + '"/>';
    ContentHtmlShow += '</div>';
    ContentHtmlShow += '<div class="lq-box-google-map-content-main">';
    ContentHtmlShow += LandAddress;
    ContentHtmlShow += '</div>';
    ContentHtmlShow += '</div>';
    ContentHtmlShow += '</div>';
    return ContentHtmlShow;
};

LqGoogleMap.Marker = function (title, Lat, Lng, map) {
    return new google.maps.Marker({
        position: new google.maps.LatLng(Lat, Lng),
        map: map,
        title: title,
        icon:'http://lequang.vn/Content/Images/Icons/buildings.png?7200',
        draggable: true
    });
};

LqGoogleMap.InitMapLandProject = function (Lat, Lng) {

    var options = {
        zoom: 15,
        center: new google.maps.LatLng(Lat, Lng),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var map = new google.maps.Map(document.getElementById('lq-map-canvas-details'), options);
    var places = [];

    places.push(new google.maps.LatLng(Lat, Lng));

    var infowindow = new InfoBubble({
        position: new google.maps.LatLng(Lng, Lat),
        borderRadius: 5,
        left: 0,
        top: 0,
        padding: 15,
        width: 346,
        height: 135,
        backgroundColor: 'rgb(255, 255, 255)',
        maxWidth: 350
    });

    var srvLandProjectMap = new Servicemobi("Land/GetLandProjectMap", {
        Lng: Lng,
        Lat: Lat
    },
        function (data) {
            

            infowindow = new InfoBubble({
                position: new google.maps.LatLng(Lng, Lat),
                borderRadius: 5,
                left: 0,
                top: 0,
                padding: 15,
                width: 346,
                height: 135,
                backgroundColor: 'rgb(255, 255, 255)',
                maxWidth: 350
            });

            $.each(data, function (key, val) {
                places.push(new google.maps.LatLng(val.Lat, val.Lng));
                var marker = new google.maps.Marker({
                    position: new google.maps.LatLng(val.Lat, val.Lng),
                    map: map,
                    draggable: false,
                    icon: 'http://lequang.vn/Content/Images/Icons/buildings.png?7200',
                    title: 'Place number'
                });

                google.maps.event.addListener(marker, 'click', function () {
                    if (!infowindow) {
                        infowindow = new InfoBubble({});
                    }
                    infowindow.setContent(LqGoogleMap.LandProjectWinDow(val.ProjectId, val.ProjectName, LandMobi.Property["DateStart"].substring(0, 10), val.ImageUrl, val.MainContent));
                    infowindow.open(map, marker);
                });
            });
        });

    srvLandProjectMap.run();
    var marker = LqGoogleMap.Marker('Địa điểm bất động sản ', Lat, Lng, map);
    infowindow = new InfoBubble();
    infowindow.setContent(LqGoogleMap.LandProjectWinDow(LandMobi.Property["ProjectId"], LandMobi.Property["ProjectName"], LandMobi.Property["DateStart"].substring(0, 10), LandMobi.Property["ImageUrl"], LandMobi.Property["MainContent"]));
    infowindow.open(map, marker);

    google.maps.event.addListener(marker, 'click', function () {
        if (!infowindow) {
            infowindow = new InfoBubble();
        }
        infowindow = new InfoBubble();
        infowindow.setContent(LqGoogleMap.LandProjectWinDow(LandMobi.Property["ProjectId"], LandMobi.Property["ProjectName"], LandMobi.Property["DateStart"].substring(0, 10), LandMobi.Property["ImageUrl"], LandMobi.Property["MainContent"]));
        infowindow.open(map, marker);
    });
};

LqGoogleMap.Initialize = function (Lat, Lng, ContentAds) {

    var options = {
        zoom: 15,
        center: new google.maps.LatLng(Lat, Lng),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var map = new google.maps.Map(document.getElementById('lq-map-canvas-details'), options);
    var marker = LqGoogleMap.Marker('Địa điểm bất động sản ', Lat, Lng, map);
    var infowindow = new InfoBubble({
        content: ContentAds
    });
    infowindow.open(map, marker);

    google.maps.event.addListener(marker, 'click', function () {
        infowindow.open(map, marker);
    });

};

LqGoogleMap.GetLatLng = function (Lat, Lng, ContentAds, renderTo) {

    var options = {
        zoom: 15,
        center: new google.maps.LatLng(Lat, Lng),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var map = new google.maps.Map(document.getElementById(renderTo), options);

    var marker = LqGoogleMap.Marker('Địa chỉ', Lat, Lng, map);

    var infowindow = new InfoBubble({
        content: ContentAds
    });
    infowindow.open(map, marker);
    google.maps.event.addListener(marker, 'click', function () {
        infowindow.open(map, marker);
    });
};

/*-------------------------------------------Map Post-------------------------------------------*/
LqGoogleMap.geocodePosition = function (pos, geocoder, infowindow, callbacks) {
    try {
        geocoder.geocode({
            latLng: pos
        }, function (responses) {
            if (responses && responses.length > 0) {
                infowindow.setContent("<div style='width:196px'>" + responses[0].formatted_address + "</div>");
                if (callbacks) callbacks();
            } else {
                infowindow.setContent('Không xác định được vị trí.');
            }
        });
    } catch (ex) { }
};

/*load toa do theo dia chi*/
LqGoogleMap.PostMapInit = function (address, geocoder, htmlResult, zoomSize, failure, succesfull) {
    var lat = 21.027925645771404;
    var lng = 105.85115871429446;
    var latLng = new google.maps.LatLng(lat, lng);
    var infowindow;
    var map = new google.maps.Map(document.getElementById(htmlResult), {
        zoom: zoomSize,
        center: latLng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    if (!geocoder) {
        geocoder = new google.maps.Geocoder();
    }
    var geocoderRequest = {
        address: address
    };
    marker = LqGoogleMap.Marker('Địa điểm chọn', lat, lng, map);
    if (!infowindow)
        infowindow = new InfoBubble();
    geocoder.geocode(geocoderRequest, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            latLng = results[0].geometry.location;
            if (succesfull) succesfull(latLng);
        } else {
            if (failure) failure();
        }
        map.setCenter(latLng);
        marker.setPosition(latLng);
        LqGoogleMap.geocodePosition(latLng, geocoder, infowindow, function () {
            infowindow.open(map, marker);
        });
    });

    google.maps.event.addListener(marker, 'dragend', function () {
        LqGoogleMap.geocodePosition(marker.getPosition(), geocoder, infowindow, function () {
            infowindow.open(map, marker);
        });
    });

};

/*load marker theo toa do da biet*/
LqGoogleMap.PostMapInitForPos = function (lat, lng, geocoder, htmlResult, zoomSize, failure, succesfull) {

    var latLng = new google.maps.LatLng(lat, lng);
    var infowindow;
    var map = new google.maps.Map(document.getElementById(htmlResult), {
        zoom: zoomSize,
        center: latLng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    if (!geocoder) {
        geocoder = new google.maps.Geocoder();
    }

    marker = LqGoogleMap.Marker('Địa điểm chọn', lat, lng, map);

    if (!infowindow)
        infowindow = new InfoBubble();

    marker.setPosition(latLng);
    LqGoogleMap.geocodePosition(latLng, geocoder, infowindow, function () {
        infowindow.open(map, marker);

    });

    google.maps.event.addListener(marker, 'dragend', function () {
        LqGoogleMap.geocodePosition(marker.getPosition(), geocoder, infowindow, function () {
            infowindow.open(map, marker);
        });
    });

    if (succesfull) succesfull(latLng);
};


/*-------------------------------------ATM--------------------------------------------------*/
LqGoogleMap.MapATM = function (address, geocoder, htmlResult, zoomSize) {

    var Lat = 21.027925645771404;
    var Lng = 105.85115871429446;
    var latLng = new google.maps.LatLng(Lat, Lng);
    var map = new google.maps.Map(document.getElementById(htmlResult), {
        zoom: zoomSize,
        center: latLng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    if (!geocoder) {
        geocoder = new google.maps.Geocoder();
    }

    var geocoderRequest = {
        address: address
    };
    //marker = LqGoogleMap.Marker('Địa chỉ ATM', Lat, Lng, map);

    geocoder.geocode(geocoderRequest, function (results, status) {

        if (status == google.maps.GeocoderStatus.OK) {
            map.setCenter(results[0].geometry.location);
            latLng = results[0].geometry.location;
        }
    });
};

var markers = [];
LqGoogleMap.MapATM2 = function (address, geocoder, htmlResult, zoomSize, BankId, ProvinceId, DistrictId) {
    markers = [];
    var reHtmlBox = "";
    var latLng = new google.maps.LatLng(21.027925645771404, 105.85115871429446);
    var map = new google.maps.Map(document.getElementById(htmlResult), {
        zoom: zoomSize,
        center: latLng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    if (!geocoder) {
        geocoder = new google.maps.Geocoder();
    }

    var geocoderRequest = {
        address: address
    };

    $("#lq-box-search-map-ATM").show();

    geocoder.geocode(geocoderRequest, function (results, status) {

        if (status == google.maps.GeocoderStatus.OK) {
            var places = [];
            var index = 0;
            var infowindow;
            var srvGetFocusBy = new Servicemobi("AppStore/GetATM", {
                BankId: BankId,
                ProvinceId: ProvinceId,
                DistrictId: DistrictId
            },
                function (data) {
                    if (MapATMBank._delay) clearInterval(MapATMBank._delay);
                    var len = data.length;

                    var i = 0;
                    $("#FindATM").html('Đã tìm thấy ' + (len) + ' địa điểm ATM');
                    if (data == "") {
                        $("#scroll_box").html('- Không có cây ATM nào được tìm thấy.');
                        $("#FindATM").html('Không có cây ATM nào được tìm thấy.');
                        $("#lq-box-search-map-ATM").hide();
                        return;
                    }
                    var location = new google.maps.LatLng(data[0].Lat, data[0].Lng);
                    map.setCenter(location);

                    var _fn = function () {
                        places.push(new google.maps.LatLng(data[i].Lat, data[i].Lng));
                        var marker = LqGoogleMap.Marker('Địa chỉ ATM', data[i].Lat, data[i].Lng, map);
                        markers.push(marker);
                        (function (i) {

                            google.maps.event.addListener(marker, 'click', function () {
                                if (!infowindow) {
                                    infowindow = new InfoBubble();
                                }

                                $('.places').removeClass('lq-focus-address-ATMActice');
                                $('#PlaceId-' + i).addClass("lq-focus-address-ATMActice");

                                infowindow.setContent(LqGoogleMap.ATMWinDow(data[i].BankId, Banks.GetBankHomeCacheGetName(data[i].BankId), Banks.GetBankHomeCacheGetImg(data[i].BankId), data[i].Address));
                                infowindow.open(map, marker);
                            });
                        })(i);
                        reHtmlBox += '<div class="ATMEntitiesItem LqTitleStand" Style="padding:0 5px 3px 0; ">';
                        reHtmlBox += '<div class="places lq-focus-address-ATM"  id="PlaceId-' + index + '" onclick="LqGoogleMap.launchInfoATMWindow(' + index + ');"><span class="lq-ti-li" style="float:left;height: 16px;margin-top: -3px;"></span><div style="padding-left:10px">' + data[i].PlaceName + '</div></div>';
                        reHtmlBox += '<h4 style="padding-left:10px;">' + data[i].Address + '</h4>';
                        reHtmlBox += '</div>';
                        $("#scroll_box").html(reHtmlBox);
                        index++;
                    };

                    MapATMBank._delay = setInterval(function () {
                        if (i == len - 1) {
                            clearInterval(MapATMBank._delay);
                            $("#lq-box-search-map-ATM").hide();
                        }
                        _fn();
                        i++;
                    }, 100);
                });

            srvGetFocusBy.run();
        }
    });
};

LqGoogleMap.launchInfoATMWindow = function (lat, lng, placeId) {
    $('html, body').stop().animate({
        scrollTop: $("#find-atm").offset().top
    }, 100);
    
    var options = {
        zoom: 15,
        center: new google.maps.LatLng(lat, lng),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var addressAtm = $("#place-" + placeId + " .address-atm").text();
    
    var map = new google.maps.Map(document.getElementById('map-atm'), options);

    var infowindow = new InfoBubble({
        position: new google.maps.LatLng(lng, lat),
        borderRadius: 5,
        left: 0,
        top: 0,
        padding: 10,
        width: 280,
        height: 135,
        backgroundColor: 'rgb(255, 255, 255)',
        maxWidth: 350
    });

        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(lat, lng),
            map: map,
            draggable: false,
            icon: 'http://lequang.vn/Content/Images/Icons/buildings.png?7200',
            title: 'Place number'
        });
        google.maps.event.addListener(marker, 'click', function () {
            if (!infowindow) {
                infowindow = new InfoBubble({});
            }
            infowindow.setContent(LqGoogleMap.ATMWinDow(FinancialMobi.Params["bankId"], addressAtm));
            infowindow.open(map, marker);
        });
        google.maps.event.trigger(marker, 'click');

};
