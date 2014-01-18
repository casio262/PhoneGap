LandMobi = {
    CategoryId: { 1: "Khu đô thị", 2: "Tổ hợp Văn phòng - Thương mại - Phức hợp", 3: "Sinh thái - Nghỉ dưỡng", 4: "Khu công nghiệp", 5: "Chung cư" },
    FloorParams: { form: "1", categoryId: "0", provinceId: "0", districtId: "0", area: "0-0", price: "0-0", direction: "0" },
    StringFloorParams: { form: "1", categoryId: "0", provinceId: "0", districtId: "0", area: "0-0", price: "0-0", direction: "0" },
    /*FloorParams: ['form', 'category', 'province', 'district', 'project', 'areamin', 'areamax', 'pricemin', 'pricemax', 'orientedhousing', 'forviews', 'page', 'insteadnumberclassified'],*/
    ImgSwipeParams: {},
    Property : { },
    /*Property.Lat : { },
    Property.Lat.Value : { },*/
    setupDomObjects:function () {
        LandMobi.viewTitle = $("#title_floor");
        LandMobi.viewForm = $("#view_form_id_ads");
        LandMobi.viewCategory = $("#view_category_id_ads");
        LandMobi.viewProvince = $("#view_province_id_ads");
        LandMobi.viewDistrict = $("#view_district_id_ads");
        LandMobi.viewProject = $("#view_project_id_ads");
        LandMobi.viewTypeClassified = $("#view_type_classified_id_ads");
        LandMobi.viewDateStart = $("#view_date_start_ads");
        LandMobi.viewDateEnd = $("#view_date_end_ads");
        LandMobi.viewContent = $("#view_content_ad_id_ads");
        LandMobi.viewUnitPrice = $("#view_unit_view_price_id_ads");
        LandMobi.viewLandAddess = $("#view_land_address_id_ads");
        LandMobi.viewArea = $("#view_area_id_ads");
        LandMobi.viewUnitMeasure = $("#view_unit_measure_id_ads");
        LandMobi.viewPrice = $("#view_price_id_ads");
        LandMobi.viewFront = $("#view_front_id_ads");
        LandMobi.viewRoad = $("#view_road_id_ads");
        LandMobi.viewNumberFloor = $("#view_number_floor_id_ads");
        LandMobi.viewNumberRoom = $("#view_number_room_id_ads");
        LandMobi.viewNumberToilet = $("#view_number_toilet_id_ads");
        LandMobi.viewInterior = $("#view_interior_id_ads");
        LandMobi.viewSellerName = $("#view_seller_name_id_ads");
        LandMobi.viewSellerAddress = $("#view_seller_address_id_ads");
        LandMobi.viewNumberPhone = $("#view_number_phone_id_ads");
        LandMobi.viewEmailAddress = $("#view_email_address_ads");
        LandMobi.viewDirectionHouse = $("#view_direction_house_ads");
        LandMobi.viewDirectionBalcony = $("#view_direction_balcony_ads");
        LandMobi.viewTotalPrice1st = $("#lq-id-total-price1");
        LandMobi.viewTotalPrice2nd = $("#lq-id-total-price");
    },
    

    FormSearchLands: function (idRender, fn) {
        var html0 = '<div class="text-title title-category-click" data-category="SBDS">Sàn bất động sản</div>';
        var html1 = '<div class="text-title title-category-click" data-category="BDS">Bất động sản</div>';
        var html = '';
        html += '<div id="box-search-land"><div class="lq-land-box-search"> <div class="lq-text-TKBDS"></div> <div class="lq-land-box-content"> <div class="lq-land-box-content-header"> <button id="lq-bnt-searchLandSales" class="lq-stock-view-button flagSeach">&nbsp;&nbsp; Nhà đất bán &nbsp;&nbsp;</button> <button id="lq-bnt-searchLandforRent" class="lq-clear-button flagSeach">Nhà đất cho thuê</button> </div> <div class="lq-land-box-contents"> <label class="lq-stock-select-arrow-down"> <select id="selectTypeHouse" class="lq-select-land-width" selected="selected" name="1"><option value="0">---Chọn loại nhà đất---</option></select> </label> <label class="lq-stock-select-arrow-down"> <select id="selectProvince" class="lq-select-land-width" selected="selected"><option value="0">---Chọn Tỉnh/TP---</option></select> </label> <label class="lq-stock-select-arrow-down"> <select id="selectDistrict" class="lq-select-land-width"> <option value="0" selected="selected">---Chọn Quận/Huyện---</option> </select> </label> <label class="lq-stock-select-arrow-down"> <select id="slArea" class="lq-select-land-width" selected="selected"> <option value="0-0">---Chọn diện tích---</option> <option value="01-01">--Không xác định--</option> <option value="0-30">&lt;=30 m2</option> <option value="30-50">30-&gt;50 m2</option> <option value="50-80">50-&gt;80 m2</option> <option value="80-100">80-&gt;100 m2</option> <option value="100-150">100-&gt;150 m2</option> <option value="150-200">150-&gt;200 m2</option> <option value="200-250">200-&gt;250 m2</option> <option value="250-300">250-&gt;300 m2</option> <option value="300-500">300-&gt;500 m2</option> <option value="500-0">&gt;=500 m2</option> </select> </label> <label class="lq-stock-select-arrow-down"> <select id="slPrice" class="lq-select-land-width" selected="selected"> <option value="0-0" selected="selected">---Chọn mức giá---</option> <option value="01-01">--Thỏa thuận--</option> <option value="0-500">&lt;=500 Triệu</option> <option value="500-800">500-&gt;800 Triệu</option> <option value="800-1000">800-&gt;1 Tỷ</option> <option value="1000-2000">1-&gt;2 Tỷ</option> <option value="2000-3000">2-&gt;3 Tỷ</option> <option value="3000-5000">3-&gt;5 Tỷ</option> <option value="5000-7000">5-&gt;7 Tỷ</option> <option value="7000-10000">7-&gt;10 Tỷ</option> <option value="10000-20000">10-&gt;20 Tỷ</option> <option value="20000-30000">20-&gt;30 Tỷ</option> <option value="30000-0">&gt;=30 Tỷ</option> </select> </label> <label class="lq-stock-select-arrow-down"> <select id="view_direction_house_ads2" class="lq-select-land-width" selected="selected"><option value="0">---Chọn huớng nhà---</option><option value="2">Đông</option><option value="3">Tây</option><option value="4">Nam</option><option value="5">Bắc</option><option value="6">Đông-Bắc</option><option value="7">Tây-Bắc</option><option value="8">Tây-Nam</option><option value="9">Đông-Nam</option></select> </label> <button id="lq-bnt-search" class="lq-button-ios"> Tìm kiếm</button> </div> </div> </div> </div>';
        if (idRender)
            $("#" + idRender).html(html);
        else {
            $("#category").append(html0+html);
        }
        if (fn) fn();
    },
    LoadTypeSaleLand:function (selectTypeHose, typeLand, fn) {
        var html = '<option value="0">---Chọn loại nhà đất---</option>';
        var getlandcategorybyform = new Servicemobi('land/getlandcategorybyform', { formid: typeLand }, function(data) {
            for (var i in data) {
                html += '<option value="' + data[i].CategoryId + '">' + data[i].CategoryName + '</option>';
            }
            $("#" + selectTypeHose).html(html);
            $("#" + selectTypeHose).attr("name", typeLand);
            if (fn) fn();
        });
        getlandcategorybyform.run();
    },
    FormFloorLand:function (idRender, formId, page, fn) {
        var html = '';
        var count = 0;
        var get10viewlandclassifiedadview = new Servicemobi('land/get10viewlandclassifiedadview', { formid: formId, forviews: 'forFloor', pageindex: page }, function(data) {
            for (var i in data) {
                count++;
                var image = data[i].UrlImage;
                if (image == undefined) image = 'http://lequang.vn/Content/Images/Icons/thumb.iconDefaultLand.png?7200';
                html += '<div class="summary-content" data-id="' + data[i].SmallAdId + '"><div class="title-floor">' + data[i].Title + '</div>';
                html += '<img src="' + image + '"/><div class="summary"><span>Giá: ' + data[i].NameTotalPrice + '</span><span>Diện tích: ' + Mainjs.FormatUndefined(data[i].Area) + ' m²</span><span>Địa chỉ: ' + data[i].DistrictName + '-' + data[i].ProvinceName + '</span></div></div>';
            }
            /*html += '<div class="btn-post"><button>Đăng tin rao</button></div>';*/
            $("#" + idRender).html(html);
            if (count == data.length) {
                if (fn) fn();
            }
        });
        get10viewlandclassifiedadview.run();
    },
    IdFloor:{},
    ClickIdFloor:function (clsClick) {
        $("."+clsClick).click(function() {
            LandMobi.IdFloor['id'] = $(this).data('id');
            //console.log(LandMobi.IdFloor+"+"+$(this).data('id'));
            $("#body").load('ajax/land/details-floor.htm');
        });
    },
    DetailsFloor:function (smallId,  fn) {
        var tbHouse = '', tbPerson = '';
        var getdetailslandclassifiedad = new Servicemobi('land/getdetailslandclassifiedad', { smalladid: smallId }, function(data) {
            $("#title-floor").html("<li>" + data.Title + "</li>");
            $("#lq-id-lqbox-dcontent").append('<span>&nbsp;' + data.ContentAd + '</span>');

            /*tbHouse += '<div class="width lq-header-small-add" colspan="2" ><span>Thông tin nhà đất</span></div>';*/

            tbHouse += '<div class="lq-thong-tin-giao"><table class="tbLQSmall lq-wthong-tin-dat"><thead><tr><th colspan="2">Thông tin nhà đất</th></tr></thead>';

            tbHouse += '<tbody><tr>';
            tbHouse += '<td>Mã số:</td>';
            tbHouse += '<td class="adjacent">&nbsp;' + data.SmallAdId + '</td>';
            tbHouse += '</tr>';

            tbHouse += '<tr>';
            tbHouse += '<td>Ðịa chỉ:</td>';
            tbHouse += '<td class="adjacent">&nbsp;' + data.LandAddress + '</td>';
            tbHouse += '</tr>';

            tbHouse += '<tr>';
            tbHouse += '<td>Quận huyện:</td>';
            tbHouse += '<td class="adjacent">&nbsp;' + data.DistrictName + ' -' + data.ProvinceName + '</td>';
            tbHouse += '</tr>';

            tbHouse += '<tr>';
            tbHouse += '<td>Loại tin rao:</td>';
            tbHouse += '<td class="adjacent">&nbsp;' + data.CategoryName + '</td>';
            tbHouse += '</tr>';

            tbHouse += '<tr>';
            tbHouse += '<td>Giá:</td>';
            tbHouse += '<td class="adjacent">&nbsp;' + data.NameTotalPrice + '</td>';
            tbHouse += '</tr>';

            tbHouse += '<tr>';
            tbHouse += '<td>Diện tích:</td>';
            tbHouse += '<td class="adjacent">&nbsp;' + data.Area + ' m²</td>';
            tbHouse += '</tr>';

            if (data.NumberRoom != undefined && data.NumberRoom != "") {
                tbHouse += '<tr>';
                tbHouse += '<td>Số phòng:</td>';
                tbHouse += '<td class="adjacent">' + data.NumberRoom + '</td>';
                tbHouse += '</tr>';
            }
            if (data.Road != undefined && data.Road != "") {
                tbHouse += '<tr>';
                tbHouse += '<td>Ðường vào:</td>';
                tbHouse += '<td class="adjacent">' + data.Road + ' (m)</td>';
                tbHouse += '</tr>';
            }
            if (data.NumberFloor != undefined && data.NumberFloor != "") {
                tbHouse += '<tr>';
                tbHouse += '<td>Số tầng:</td>';
                tbHouse += '<td class="adjacent">' + data.NumberFloor + ' Tầng</td>';
                tbHouse += '</tr>';
            }

            if (data.NumberToilet != undefined && data.NumberToilet != "") {
                tbHouse += '<tr>';
                tbHouse += '<td>Số Toilet:</td>';
                tbHouse += '<td class="adjacent">' + data.NumberToilet + '</td>';
                tbHouse += '</tr>';
            }

            if (data.Interior != undefined && data.Interior != "") {
                tbHouse += '<tr>';
                tbHouse += '<td>Nội thất:</td>';
                tbHouse += '<td class="adjacent">' + data.Interior + '</td>';
                tbHouse += '</tr>';
            }
            if (data.Front != undefined && data.Front != "") {
                tbHouse += '<tr>';
                tbHouse += '<td>Mặt tiền:</td>';
                tbHouse += '<td class="adjacent">' + data.Front + ' (m)</td>';
                tbHouse += '</tr>';
            }

            if (data.DirectionName != undefined && data.DirectionName != "") {
                tbHouse += '<tr>';
                tbHouse += '<td>Hướng nhà:</td>';
                tbHouse += '<td class="adjacent">' + data.DirectionName + '</td>';
                tbHouse += '</tr>';
            }

            if (data.BalconyName != undefined && data.BalconyName != "") {
                tbHouse += '<tr>';
                tbHouse += '<td>Ban công: </td>';
                tbHouse += '<td class="adjacent">' + data.BalconyName + '</td>';
                tbHouse += '</tr>';
            }
            if (data.ProjectName != undefined && data.ProjectName != "") {
                tbHouse += '<tr>';
                tbHouse += '<td>Thuộc dự án: </td>';
                tbHouse += '<td class="adjacent"><a Style="color:blue">' + data.ProjectName + '</a></td>';
                tbHouse += '</tr>';
            }
            tbHouse += '</tbody></table></div>';
            $("#lq-tb-thong-tin-nha-dat").html(tbHouse);
            /*tbPerson += '<div class="width lq-header-small-add" colspan="2" ><span>Thông tin người bán</span></div>';*/
            tbPerson += '<div class="lq-thong-tin-giao"><table class="tbLQSmall lq-wthong-tin-nguoi-ban"><thead><tr><th colspan="2">Thông tin người bán</th></tr><tbody>';

            if (data.SellerName != undefined && data.SellerName != "") {
                tbPerson += '<tr>';
                tbPerson += '<td>Tên liên hệ: </td>';
                tbPerson += '<td class="adjacent">&nbsp;' + data.SellerName + '</td>';
                tbPerson += '</tr>';
            }
            if (data.SellerAddress != undefined && data.SellerAddress != "") {
                tbPerson += '<tr>';
                tbPerson += '<td>Ðịa chỉ: </td>';
                tbPerson += '<td class="adjacent">&nbsp;' + data.SellerAddress + '</td>';
                tbPerson += '</tr>';
            }
            if (data.MobilePhone != undefined && data.MobilePhone != "") {
                tbPerson += '<tr>';
                tbPerson += '<td>Di động: </td>';
                tbPerson += '<td class="adjacent">&nbsp;' + data.MobilePhone + '</td>';
                tbPerson += '</tr>';
            }
            if (data.NumberPhone != undefined && data.NumberPhone != "") {
                tbPerson += '<tr>';
                tbPerson += '<td>Điện Thoại: </td>';
                tbPerson += '<td class="adjacent">&nbsp;' + data.NumberPhone + '</td>';
                tbPerson += '</tr>';
            }
            if (data.Email != undefined && data.Email != "") {
                tbPerson += '<tr>';
                tbPerson += '<td>Email: </td>';
                tbPerson += '<td class="adjacent email">' + data.Email + '</td>';
                tbPerson += '</tr>';
            }
            tbPerson += '<tr>';
            tbPerson += '<td>Ngày đăng:</td>';
            tbPerson += '<td class="adjacent">' + Mainjs.FormatDate(data.DateStart) + '</td>';
            tbPerson += '</tr>';
            tbPerson += '<tr>';
            tbPerson += '<td>Ngày hết hạn:</td>';
            tbPerson += '<td class="adjacent">' + Mainjs.FormatDate(data.DateEnd) + '</td>';
            tbPerson += '</tr>';
            tbPerson += '<tr>';
            tbPerson += '<td colspan="2" Style="font-size:10pt;padding-top: 6px;padding-bottom: 6px;"><Strong>Lưu ý:</Strong> Quý vị đang xem nội dung tin rao <span Style="color: blue; font-size:10pt;">' + data.Title + '</span>. Mọi thông tin liên quan tới tin rao này là do người đăng tin đăng tải và chịu trách nhiệm. Chúng tôi không chịu trách nhiệm về bất kỳ nội dung nào liên quan tới tin rao này.</td>';
            tbPerson += '</tr>';
            tbPerson += '</tbody></table></div>';
            $("#lq-tb-thong-tin-nguoi-ban").html(tbPerson);
            $("#IdQuanHuyen1").html(data.DistrictId);
            $("#IdFormId1").html(data.FormId);
            $("#IdStatusLand").html(data.FormName + ' ' + data.DistrictName);
            /*Land.Property.FormId.setValue(data.FormId);
            Land.Property.DistrictId.setValue(data.DistrictId);
            Land.Property.Lat.setValue(data.Lat);
            Land.Property.Lng.setValue(data.Lng);
            var image = AppConfigs.host + "/Content/Images/Icons/thumb.iconDefaultLand.png?7200";
            if (data.UrlImage != undefined || data.UrlImage != "")
                image = data.UrlImage;

            Land.Property.ContentAd.setValue(LqGoogleMap.LandFloorWinDow(data.SmallAdId, data.Title, data.LandAddress, image, data.ProvinceName));
            window.document.title = LqUtils.ToTitleCaseFirstWord(data.Title) + " | " + window.document.title;*/
            
            if (fn) fn(data);
        });
        getdetailslandclassifiedad.run();
    },
    indicatorOnmap : function(tags, val, callbacks) {
            var geocoder = new google.maps.Geocoder();
            if (tags == 'ads') {
                LqGoogleMap.PostMapInit(val, geocoder, 'lq-map-canvas', 13, callbacks, function(latLng) {
                    LandMobi.Lat = latLng.lat();
                    LandMobi.Lng = latLng.lng();
                });
            } else {
                LqGoogleMap.PostMapInitForPos(val.lat, val.lng, geocoder, 'lq-map-canvas', 17, callbacks, function(latLng) {
                    LandMobi.Lat = latLng.lat();
                    LandMobi.Lng = latLng.lng();
                });
            }
        return;
    },
    SearchFloorByParams: function (idRender, formId, categoryId, provinceId, districtId, projectId, area, price, orientedhousing, forview, page, insteadnumberclassified, fn) {
        var html = '';
        var count = 0;
        var gettotallandclassifiedadview = new Servicemobi('land/gettotallandclassifiedadview', { formid: formId, categoryid: categoryId, provinceid: provinceId, districtid: districtId, projectid: projectId, areamin: area.split("-")[0], areamax: area.split("-")[1], pricemin: price.split("-")[0], pricemax: price.split("-")[0], orientedhousing: orientedhousing, forviews: forview, pageindex: page, insteadnumberclassified: insteadnumberclassified }, function (data) {
            count++;
            for (var i in data) {
                var image = data[i].UrlImage;
                if (image == undefined) image = 'http://lequang.vn/Content/Images/Icons/thumb.iconDefaultLand.png?7200';
                html += '<div class="summary-content" data-id="' + data[i].SmallAdId + '"><div class="title-floor">' + data[i].Title + '</div>';
                html += '<img src="' + image + '"/><div class="summary"><span>Giá: ' + data[i].NameTotalPrice + '</span><span>Diện tích: ' + Mainjs.FormatUndefined(data[i].Area) + ' m²</span><span>Địa chỉ: ' + data[i].DistrictName + '-' + data[i].ProvinceName + '</span></div></div>';
            }
            html += '';

            $("#" + idRender).html(html);
            if (fn) fn();
        });
        gettotallandclassifiedadview.run();
        
    },
    
    GetImageByListId:function (listId, fn) {
        var getlandprojectmaincontentviewimage = new Servicemobi('land/getlandprojectmaincontentviewimage', { listprojectid: listId }, function (data) {
            for (var i in data) {
                $("#image-" + data[i].ProjectId).attr("src", data[i].ImageUrl);
            }
            if (fn) fn();
        });
        getlandprojectmaincontentviewimage.run();
    },
    DetailProject: function (idProject, fn) {
        var html = '';
        var getlandprojectviewdetail = new Servicemobi('land/getlandprojectviewdetail', { projectid: idProject }, function (data) {
            for(var i in data) {
                console.log(data[i]);
            }
            html += '';
            
            if (fn) fn();
            
        });
        getlandprojectviewdetail.run();
    },
    Get10Floor:function (idRender, fn) {
        var html = '';
        var get10viewlandclassifiedadview = new Servicemobi('land/get10viewlandclassifiedadview', { formid: 1, forviews: 'forFloor', pageindex: 1 }, function (data) {
            console.log(data);
            for (var i in data) {
                html += '<div>' + data[i].Title + '</div>';
                html += '<div><span>Giá: ' + data[i].NameTotalPrice + '</span><span>Diện tích: ' + data[i].Area + ' m²</span><span>Địa chỉ: ' + data[i].DistrictName + '-' + data[i].ProvinceName + '</span></div>';
            }
            $("#" + idRender).html(html);
            if (fn) fn();
        });
        get10viewlandclassifiedadview.run();
    },
    /*Đăng tin*/
    OnclickAddFloor: function () {
        if (UserMobi.credits.AuthenticationToken == undefined || UserMobi.credits.AuthenticationToken==null) {
            $("#body").load("ajax/user/login.htm");
        } else {
            $("#body").load("ajax/land/add-floor.htm");
        }
    },
    GetLandForm:function (idRender, fn) {
        var html = '';
        var getlandform = new Servicemobi('land/getlandform', undefined, function(data) {
            for(var i in data) {
                html += '<option value="' + data[i].FormId + '">' + data[i].FormName + '</option>';
            }
            $("#" + idRender).html(html);
            if (fn) fn();
        });
        getlandform.run();
    },
    GetTypeFloor:function (idRender, fn) {
        var html = '';
        var getalllandtypeclassified = new Servicemobi('land/getalllandtypeclassified', undefined, function (data) {
            for(var i in data) {
                html += '<option value="' + data[i].TypeClassifiedId + '">' + data[i].TypeClassifiedName + '</option>';
            }
            $("#" + idRender).html(html);
            if (fn) fn(data);
        });
        getalllandtypeclassified.run();
    },
    GetUnitPrice: function (idRender, form, fn) {
        var html = '<option value="0">Thỏa thuận</option>';
        var getlandunitprice = new Servicemobi('land/getlandunitprice', { formid: form }, function (data) {
            for(var i in data) {
                html += '<option value="' + data[i].UnitPriceId + '" unitpricestep="' + data[i].UnitPriceStep + '" view_unit_price_id_adsc="' + data[i].UnitPriceIdC + '">' + data[i].UnitPriceName + '</option>';
            }
            $("#" + idRender).html(html);
            if (fn) fn();
        });
        getlandunitprice.run();
    },
    GetProjectByProvinceDistrict:function (idRender,provinceId, districtId, fn) {
        var html = '<option value="0">Chọn dự án</option>';
        var getlandprojectviewtitle = new Servicemobi('land/getlandprojectviewtitle', { provinceid: provinceId, districtid: districtId }, function (data) {
            for(var i in data) {
                html += '<option value="' + data[i].ProjectId + '">' + data[i].ProjectName + '</option>';
            }
            $("#" + idRender).html(html);
            if(fn) fn(data);
        });
        getlandprojectviewtitle.run();
    },
    DateStartChanges : function (idDateStart, idDateEnd, numberDay) {
        var date = $('#'+idDateStart).datepicker('getDate');
        var dateNows = new Date(date.getTime());
        dateNows.setDate(date.getDate() + numberDay);
        $("#"+idDateEnd).datepicker("option", "minDate", dateNows);
        //$('#view_type_classified_id_ads').trigger('change');
    },
    DateEndChange:function () {
        
    },
    
    ValidateForm:function () {
        var formCheck = $("#form_post_classify_ads");
        LandMobi.validator = formCheck.validate({
            rules: {
                view_email_address_ads: {
                    required: true,
                    min:1,
                    email: true
                },
                view_type_classified_id_ads: {
                    min: 1
                },
                view_district_id_ads: {
                    min: 1
                },
                view_category_id_ads: {
                    min: 1
                },

                view_land_address_id_ads: "required",
                view_number_phone_id_ads: {
                    number: true,
                    min:1,
                    required: true
                },
                inputCatcha: {
                    maxlength:6
                },
                view_province_id_ads: {
                    min: 1
                },

                title_floor: {
                    required: true,
                    minlength: 30
                },
                view_front_id_ads: {
                    number: true
                },
                view_road_id_ads: {
                    number: true
                },
                view_number_toilet_id_ads: {
                    number: true
                },
                view_area_id_ads: {
                    required:true,
                    number:true
                },
                view_number_floor_id_ads: {
                    number: true
                },
                view_number_room_id_ads: {
                    number: true
                },
                view_price_id_ads: {
                    number: true
                },
                view_unit_view_price_id_ads: {
                    number:true,
                    min: 1
                },
                view_unit_measure_id_ads: {
                    min: 1
                },
                view_seller_name_id_ads: {
                    required: true
                }
            }
        });
    },
    GetLandTypeClassified : function(callbacks) {
        var htmls = '';
        var srvLandDirectionBalcony = new Servicemobi("Land/GetAllLandTypeClassified", { },
            function (data) {
                $.each(data, function(key, val) {
                    htmls += '<option value="' + val.TypeClassifiedId + '">' + val.TypeClassifiedName + '</option>';
                });
                
                $('#view_type_classified_id_ads').html(htmls);
                var secondCombo = document.getElementById('view_type_classified_id_ads');
                secondCombo.value = data[0].TypeClassifiedId;
                LandMobi.GetLandTypeClassifiedData = data;
                LandMobi.TypeClassifiedChanges();
                LandMobi.step++;
                if (callbacks) callbacks(data);
            });
        srvLandDirectionBalcony.run();
    },
    /*GetLandTypeClassified: function(ref) {
        LandMobi.GetLandTypeClassifiedData = ref;
        LandMobi.TypeClassifiedChanges();
        LandMobi.step++;
    },*/
    /*regEvent : function() {
        $('[rel=tooltip_upload_imgs_ads]').bind('mousemove', function() {
            if (LandMobi.activePupop == undefined) {
                LandMobi.activePupop = true;
                $('div.tooltip_upload_imgs_ads').remove();
                $('<div class="tooltip_upload_imgs_ads" style="display:none" >' + "<iframe src='http://lequang.vn/LqIframe/upfile.1.1/index.html' height='300px' frameborder='0' scrolling='0'></iframe>" + '</div>').appendTo('body');
                $(this).bind('click', function(e) {
                    $('div.tooltip_upload_imgs_ads').css({
                        'top': $('#lq-upload-imgs-view').offset().top,
                        'left': '456px',
                        'z-index': 9999,
                        'display': 'block'
                    });
                });
            }
        }),

        $("#content-add-floor").collapse({
            open: function() {
                this.addClass("open");
                this.css({ height: this.children().outerHeight() });
            },
            close: function() {
                this.css({ height: "0px" });
                this.removeClass("open");
            }
        });
    },*/
    closePupop : function() {
        $("#lq-dialog-add-adsmall").remove();
        $('#lq-box-focus-cont-land-ad').css("height", "auto");
        LandMobi.closePupopUpFiles();
        LqUtils.scrollTo(230);
        LqUtils.hideCover();
    },

    closePupopUpFiles : function() {
        $('div.tooltip_upload_imgs_ads').fadeOut('fast', function() {
            $(this).remove();
            LandMobi.activePupop = undefined;
            $(document).tooltip = function() {
            };
        });
    },

    TotalAmount: function () {
        var TypeClassifiedId = $('#view_type_classified_id_ads option:selected').val();
        for (var i in LandMobi.GetLandTypeClassifiedData) {
            if (LandMobi.GetLandTypeClassifiedData[i]['TypeClassifiedId'] == TypeClassifiedId) {
                var numberDays = Mainjs.GetDifferentDate($("#view_date_start_ads").val(), $("#view_date_end_ads").val());
                var total = Mainjs.FormatNumber(LandMobi.MoneyDay * numberDays);
                console.log(numberDays, total);
                var fnEnough = function(numberDays) {
                    var amountStr = numberDays + " * " + Mainjs.FormatNumber(LandMobi.GetLandTypeClassifiedData[i]['TotalAmount']) + " = " + Mainjs.FormatNumber(numberDays * LandMobi.GetLandTypeClassifiedData[i]['TotalAmount']) + " (VNĐ)";
                    if (TypeClassifiedId == -99) {
                        amountStr = numberDays + " * 0.000 = 0.000 (VNĐ)";
                    }
                    $('#total-amount').html(amountStr);
                    delete LandMobi.skipPostClassified;
                };
                console.log(LqUtils.DataTranfer.modeViewModify);
                console.log(UserMobi.credits.AuthenticationToken);
                if (LqUtils.DataTranfer.modeViewModify == true) {
                    fnEnough(0);
                } else {
                    console.log(LandMobi.GetLandTypeClassifiedData[i]['TotalAmount'] * numberDays);
                    UserMobi.CheckAccountBalance(1, (LandMobi.GetLandTypeClassifiedData[i]['TotalAmount'] * numberDays), function () {
                        fnEnough(numberDays);
                        $("#lq-btn-submit-tradingfloor").css("visibility", "visible");
                    }, function (__b) {
                        console.log('check pass:' + LqUtils.FormatNumber(__b));
                        $('#total-amount').html('<span style="color: red;"> * Tài khoản còn ' + LqUtils.FormatNumber(__b) + ' không đủ!</span>');
                        LandMobi.skipPostClassified = { reason: "Tài khoản của bạn không đủ thanh toán!" };
                        $("#lq-btn-submit-tradingfloor").css("visibility", "hidden");
                    });
                }
                $('#DescriptionOfClassified').html(LandMobi.GetLandTypeClassifiedData[i]['DescriptionOfClassified']);
                break;
            }
        };

        /*UserMobi.CheckAccountBalance(1, LandMobi.MoneyDay * numberDays, function () {
            fnEnough(numberDays);
            $("#lq-btn-submit-tradingfloor").css("visibility", "visible");
        }, function (__b) {
            $('#total-amount').html('<span style="color: red;"> * Tài khoản còn ' + Mainjs.FormatNumber(__b) + ' không đủ!</span>');
            LandMobi.skipPostClassified = { reason: "Tài khoản của bạn không đủ thanh toán!" };
            $("#lq-btn-submit-tradingfloor").css("visibility", "hidden");
        });*/
    },
    AdsModel : function() {

        this.Username;
        this.FormId;
        this.CategoryId;
        this.ProvinceId;
        this.DistrictId;
        this.ProjectId;
        this.DateStart;
        this.DateEnd;
        this.Title;
        this.ImageUrl;

        this.ContentAd;
        this.LandAddress;
        this.Area;
        this.Price;
        this.Unitview_price_id_ads;
        this.Front;
        this.Road;
        this.NumberFloor;
        this.NumberRoom;
        this.NumberToilet;
        this.Interior;

        this.SellerName;
        this.SellerAddress;
        this.NumberPhone;
        this.MobilePhone;
        this.Email;

        this.Video;
        this.NumberImage;
        this.Lat;
        this.Lng;
        this.DirectionId;
        this.BalconyId;
        this.TotalPrice;
        this.view_unit_price_id_adsC;
        this.NameTotalPrice;
    },
    onSubmit: function () {
        if (LandMobi.skipPostClassified) {
            return false;
        }
        //var result = LandMobi.ValidateForm();
        var result = true;
        if (result == true) {

            var sessionVal = $('#inputCatcha').val();
            $.getJSON(LqUtils.linkweb+'capcha/check.php?captcha=' + sessionVal,
                
            //var srvCheckCap = new Servicemobi("Service/validateCapterCha", { value: sessionVal },
                function(match) {
                    console.log("check result:", match, ", and value:", sessionVal);
                    if (match == true) {
                        if (!LandMobi.Model)
                            LandMobi.Model = new LandMobi.AdsModel();
                        {
                            LandMobi.Model.FormId = LandMobi.viewForm.val();
                            LandMobi.Model.CategoryId = LandMobi.viewCategory.val();
                            LandMobi.Model.ProvinceId = LandMobi.viewProvince.val();
                            LandMobi.Model.DistrictId = LandMobi.viewDistrict.val();
                            LandMobi.Model.ProjectId = LandMobi.viewProject.val();
                            LandMobi.Model.TypeClassifiedId = LandMobi.viewTypeClassified.val();
                            LandMobi.Model.DateStart = Mainjs.ConvertDateSearch(LandMobi.viewDateStart.val(), 'full');
                            LandMobi.Model.DateEnd = Mainjs.ConvertDateSearch(LandMobi.viewDateEnd.val(), 'full');
                            LandMobi.Model.Title = LandMobi.viewTitle.val();
                            LandMobi.Model.ContentAd = LandMobi.viewContent.val();
                            LandMobi.Model.LandAddress = LandMobi.viewLandAddess.val();
                            LandMobi.Model.Area = LandMobi.viewArea.val();
                            LandMobi.Model.UnitMeasureId = LandMobi.viewUnitMeasure.val();

                            var __nameprice = $('#view_unit_view_price_id_ads option:selected').text();
                            var n = __nameprice.match(/m2/g);
                            if (n != 0 && LandMobi.viewPrice.val() != "") {

                                LandMobi.Model.Price = LandMobi.viewPrice.val();
                                LandMobi.Model.UnitPriceId = LandMobi.viewUnitPrice.val();
                                LandMobi.Model.UnitPriceIdC = $('#view_unit_view_price_id_ads option:selected').attr("view_unit_price_id_adsC");
                            }
                            LandMobi.Model.Front = LandMobi.viewFront.val();
                            LandMobi.Model.Road = LandMobi.viewRoad.val();
                            LandMobi.Model.NumberFloor = LandMobi.viewNumberFloor.val();
                            LandMobi.Model.NumberRoom = LandMobi.viewNumberRoom.val();
                            LandMobi.Model.NumberToilet = LandMobi.viewNumberToilet.val();
                            LandMobi.Model.Interior = LandMobi.viewInterior.val();

                            LandMobi.Model.SellerName = LandMobi.viewSellerName.val();
                            LandMobi.Model.SellerAddress = LandMobi.viewSellerAddress.val();
                            LandMobi.Model.NumberPhone = LandMobi.viewNumberPhone.val();
                            LandMobi.Model.Email = LandMobi.viewEmailAddress.val();

                            LandMobi.Model.Lat = LandMobi.Lat;
                            LandMobi.Model.Lng = LandMobi.Lng;

                            if (LandMobi.viewDirectionHouse.val() != 0) {
                                LandMobi.Model.DirectionId = LandMobi.viewDirectionHouse.val();
                            }
                            if (LandMobi.viewDirectionBalcony.val() != 0) {
                                LandMobi.Model.BalconyId = LandMobi.viewDirectionBalcony.val();
                            }
                            LandMobi.Model.TotalPrice = LandMobi.viewTotalPrice1st.text();
                            LandMobi.Model.NameTotalPrice = LandMobi.viewTotalPrice2nd.text();

                            LandMobi.Model.LandAlbumImages = [];
                            var imgs = $("#selectedFiles span img");
                            for (var i = 0, len = imgs.length; i < len; i++) {
                                var obj = { SmallAdId: AddFloor.Model.SmallAdId, ImageId: '', ImageNote: '', ImageUrl: $(imgs[i]).attr("src") };
                                LandMobi.Model.LandAlbumImages.push(obj);
                            }
                            
                            //LandMobi.Model.LandAlbumImages.ImageUrl= $("#selectedFiles span img").attr('src');
                            /*for (var i in fsupfile.files.data) {
                                var _obj = { SmallAdId: LandMobi.Model.SmallAdId, ImageId: fsupfile.files.data[i]['ImageId'], ImageNote: fsupfile.files.data[i]['ImageNote'], ImageUrl: fsupfile.files.data[i]['ImageUrl'] };
                                LandMobi.Model.LandAlbumImages.push(_obj);
                            }*/
                            console.log(LandMobi.Model);
                        }
                        UserMobi.CheckAccountBalance(1, LandMobi.amount, function() {
                            LandMobi.Model.LandAlbumImagesStr = JSON.stringify(LandMobi.Model.LandAlbumImages);
                            if (LandMobi.lengthData == LandMobi.Model.LandAlbumImagesStr.length) {
                                delete LandMobi.Model.LandAlbumImages;
                                LandMobi.Model.LandAlbumImagesStr = "[]";
                            }
                            UserMobi.srvCertified("Land/PostLandClassifiedAd", "post", LandMobi.Model, function(flagRef) {
                                if (flagRef == 0) {
                                    $('#wait-submit').remove();
                                    alert("Xin lỗi không thế đăng tin lúc này, bạn vui lòng thử lại sau!");
                                    return false;
                                } else if (flagRef < 0) {
                                    LandMobi.closePupop();
                                    alert("Thông tin mới về Tin rao đã được được cập nhật thành công!");
                                    return true;
                                } else {
                                    LandMobi.closePupop();
                                    UserMobi.srvCertified("LQUsersTradingClassifiedAds/PostPayment", "post", { TradingFormId: -2, Amount: LandMobi.amount, SmallAdId: flagRef, Notes: "- Đăng tin mới -" }, function() {
                                        alert("Đăng tin thành công!");
                                    });
                                    return true;
                                }
                            });
                        }, function(amount) {
                            if (LqUtils.DataTranfer.modeViewModify == true) {
                                UserMobi.srvCertified("Land/PostLandClassifiedAd", "post", LandMobi.Model, function() {
                                    alert("Bạn đã cập nhật thành công");
                                    //location.reload();
                                    return true;
                                });
                            } else {
                                alert("Bạn đang có " + amount + " không đủ cho giao dịch này");
                                return false;
                            }
                        });
                    } else {
                        $('#wait-submit').remove();
                        alert("Bạn vui lòng xem lại mã bảo mật!");
                        LandMobi.refreshCap();
                        return false;
                    }
                });
            //srvCheckCap.host = "http://lequang.vn/";
            //srvCheckCap.host = "http://192.168.1.88/LQProjects_Debug/";
            //srvCheckCap.run();
            return false;
        } else {
            LandMobi.refreshCap();
            alert("Bạn vui lòng xem lại các thông tin đã nhập!");
            return false;
        }
    },
    refreshCap: function () {
        /*$('#imgCaptcha').html('<img alt="Captcha" src="http://lequang.vn/Service/CaptchaImage?"' + new Date().getTime() + '" />');*/
        $('#imgCaptcha').html('<img alt="Captcha" src=' + LqUtils.linkweb + 'capcha/get.php?' + new Date().getTime() + ' />');
        /*$('#imgCaptcha').html('<img alt="Captcha" src="http://192.168.1.88/LQProjects_Debug/Service/CaptchaImage?' + new Date().getTime() + '" />');*/
    },

    MoneyShowIn: function (__a, ___t) {
        var ____ups = $('#sl-unit option:selected').attr("unitpricestep");
        var __hhh = ["", "Nghìn", "Trăm nghìn", "Triệu", "Tỷ"];
        var __nameprice = $('#sl-unit option:selected').text();
        var __tgsip = "";
        var __vtdp = __a.indexOf('.');
        var ___tt = $('#sl-unit').val();

        if (___tt != 0 && __a != "" && __a != "0") {
            //Co dau phay
            if (__vtdp != -1) {
                var __sdp = __a.substring(__vtdp + 1, __a.length);
                if (__sdp.length >= 4) {
                    __sdp = __sdp.substring(0, 4);
                }
                var __tdp = __a.substring(0, __vtdp);
                var ____ssk = ____ups.toString().substring(0, ____ups.toString().length - __sdp.toString().length);


                var __tdpLength = __tdp.toString().length;

                __tgsip = __tdp + __sdp + ____ssk;
                //__tgsip = __a.toString();
                if (__tdpLength > 3) {
                    __tgsip = parseFloat(__a).toFixed().toString() + ____ssk;
                    __sdp = "";
                }

                __tgsipLength = __tgsip.toString().length;
                var __tgsipLength = parseInt(__tgsip.toString().length);

                //9000 Ngan
                if (__tgsipLength <= 5) {
                    var __th2dsdp = __tgsip.substring(__tgsip.length - 3);
                    var __th2dtdp = __tgsip.substring(0, __tgsip.length - 3);
                    var __th2dsdpCutZero = LandMobi.CutZeroResult(__th2dsdp);
                    if (__th2dsdpCutZero == "") {
                        __a = __th2dtdp + " " + __hhh[1] + ___t;
                    } else {

                        __a = __th2dtdp + "." + LandMobi.CutZeroResult(__th2dsdp) + " " + __hhh[1] + ___t;
                    }
                }
                    //900 000 Tram ngan
                else if (__tgsipLength == 6) {

                    var __th2dsdp = __tgsip.substring(__tgsip.length - 5);
                    var __th2dtdp = __tgsip.substring(0, __tgsip.length - 5);
                    var __th2dsdpCutZero = LandMobi.CutZeroResult(__th2dsdp);
                    if (__th2dsdpCutZero == "") {
                        __a = __th2dtdp + " " + __hhh[2] + ___t;
                    } else {

                        __a = __th2dtdp + "." + LandMobi.CutZeroResult(__th2dsdp) + " " + __hhh[2] + ___t;
                    }

                }
                    //9 000 000 -> 900 000 000 Trieu
                else if (__tgsipLength >= 7 && __tgsipLength <= 9) {

                    var __th2dsdp = __tgsip.substring(__tgsip.length - 6);
                    var __th2dtdp = __tgsip.substring(0, __tgsip.length - 6);
                    var __th2dsdpCutZero = LandMobi.CutZeroResult(__th2dsdp);
                    if (__th2dsdpCutZero == "") {
                        __a = __th2dtdp + " " + __hhh[3] + ___t;
                    } else {

                        __a = __th2dtdp + "." + LandMobi.CutZeroResult(__th2dsdp) + " " + __hhh[3] + ___t;
                    }
                }
                    // Ty
                else if (__tgsipLength > 9) {
                    var __th2dsdp = __tgsip.substring(__tgsip.length - 9);
                    var __th2dtdp = __tgsip.substring(0, __tgsip.length - 9);
                    var __th2dsdpCutZero = LandMobi.CutZeroResult(__th2dsdp);
                    if (__th2dsdpCutZero == "") {
                        __a = __th2dtdp + " " + __hhh[4] + ___t;
                    } else {
                        __a = __th2dtdp + "." + LandMobi.CutZeroResult(__th2dsdp) + " " + __hhh[4] + ___t;
                    }
                }
            }
                //Khong co dau Phay
            else {
                // alert('Khong co dau phay' + ____ups.toString());
                __tgsip = __a + ____ups;

                //9000 Ngan
                var __tgsipLength = parseInt(__tgsip.toString().length);

                //__hhh nghin
                if (__tgsipLength <= 5) {
                    var __th2dsdp = __tgsip.substring(__tgsip.length - 3);
                    var __th2dtdp = __tgsip.substring(0, __tgsip.length - 3);
                    var __th2dsdpCutZero = LandMobi.CutZeroResult(__th2dsdp);
                    if (__th2dsdpCutZero == "") {
                        __a = __th2dtdp + " " + __hhh[1] + ___t;
                    } else {

                        __a = __th2dtdp + "." + LandMobi.CutZeroResult(__th2dsdp) + " " + __hhh[1] + ___t;
                    }
                }
                    //__hhh Tram
                else if (__tgsipLength == 6) {

                    var __th2dsdp = __tgsip.substring(__tgsip.length - 5);
                    var __th2dtdp = __tgsip.substring(0, __tgsip.length - 5);
                    var __th2dsdpCutZero = LandMobi.CutZeroResult(__th2dsdp);
                    if (__th2dsdpCutZero == "") {
                        __a = __th2dtdp + " " + __hhh[2] + ___t;
                    } else {
                        __a = __th2dtdp + "." + LandMobi.CutZeroResult(__th2dsdp) + " " + __hhh[2] + ___t;
                    }
                }
                    //__hhh Trieu
                else if (__tgsipLength >= 7 && __tgsipLength <= 9) {

                    var __th2dsdp = __tgsip.substring(__tgsip.length - 6);
                    var __th2dtdp = __tgsip.substring(0, __tgsip.length - 6);
                    var __th2dsdpCutZero = LandMobi.CutZeroResult(__th2dsdp);
                    if (__th2dsdpCutZero == "") {
                        __a = __th2dtdp + " " + __hhh[3] + ___t;
                    } else {

                        __a = __th2dtdp + "." + LandMobi.CutZeroResult(__th2dsdp) + " " + __hhh[3] + ___t;
                    }

                } else if (__tgsipLength > 9) {
                    var __th2dsdp = __tgsip.substring(__tgsip.length - 9);
                    var __th2dtdp = __tgsip.substring(0, __tgsip.length - 9);
                    var __th2dsdpCutZero = LandMobi.CutZeroResult(__th2dsdp);
                    if (__th2dsdpCutZero == "") {
                        __a = __th2dtdp + " " + __hhh[4] + ___t;
                    } else {

                        __a = __th2dtdp + "." + LandMobi.CutZeroResult(__th2dsdp) + " " + __hhh[4] + ___t;
                    }
                }
            }
        } else {
            __tgsip = 0;
            __a = "Thỏa thuận";
        }
        
        LandMobi.viewTotalPrice1st.html(__a);
        //LandMobi.viewTotalPrice2nd.html(__a);
    },
    MoneyShowIn2nd : function(__a) {
        var __nameprice = $('#sl-unit option:selected').text();
        var __hhh = ["", "Nghìn", "Triệu", "Tỷ"];

        var __tgsip = "";
        var __vtdp = __a.indexOf('.');
        //--------------Chuyen doi dau . ve gia------//
        var ___tt = $('#sl-unit').val();
        if (___tt != 0 && __a != "" && __a != "0") {
            //Co dau phay
            if (__vtdp != -1) {
                var __sdp = __a.substring(__vtdp + 1, __a.length);
                if (__sdp.length >= 4) {
                    __sdp = __sdp.substring(0, 4);
                }
                var __tdp = __a.substring(0, __vtdp);
                var __tdpLength = __tdp.toString().length;

                __tgsip = __a.toString();
                if (__tdpLength > 3) {
                    __tgsip = parseFloat(__a).toFixed().toString();
                    __sdp = "";
                }

                var __tgsipLength = __tgsip.toString().length;


                //9->90Le
                if (__tdpLength >= 1 && __tdpLength <= 3) {
                    __a = __tdp + "." + LandMobi.CutZeroResult(__sdp) + " " + __hhh[0] + " " + __nameprice.replace("/m2", "");
                }

                //9000 Nghin
                if (__tdpLength > 3 && __tdpLength < 7) {
                    var __th2dsdp = __tgsip.substring(__tgsip.length - 3);
                    var __th2dtdp = __tgsip.substring(0, __tgsip.length - 3);
                    var __th2dsdpCutZero = LandMobi.CutZeroResult(__th2dsdp);
                    if (__th2dsdpCutZero == "") {
                        __a = __th2dtdp + " " + __hhh[1] + " " + __nameprice.replace("/m2", "");
                    } else {

                        __a = __th2dtdp + "." + LandMobi.CutZeroResult(__th2dsdp) + " " + __hhh[1] + " " + __nameprice.replace("/m2", "");
                    }
                }
                //9000 Trieu
                if (__tdpLength >= 7 && __tdpLength <= 9) {
                    var __th2dsdp = __tgsip.substring(__tgsip.length - 6);
                    var __th2dtdp = __tgsip.substring(0, __tgsip.length - 6);
                    var __th2dsdpCutZero = LandMobi.CutZeroResult(__th2dsdp);
                    if (__th2dsdpCutZero == "") {
                        __a = __th2dtdp + " " + __hhh[2] + " " + __nameprice.replace("/m2", "");
                    } else {

                        __a = __th2dtdp + "." + LandMobi.CutZeroResult(__th2dsdp) + " " + __hhh[2] + " " + __nameprice.replace("/m2", "");
                    }
                }
                    //9 000 000 000 Ty
                else if (__a > 9) {
                    var __th2dsdp = __tgsip.substring(__tgsip.length - 9);
                    var __th2dtdp = __tgsip.substring(0, __tgsip.length - 9);
                    var __th2dsdpCutZero = LandMobi.CutZeroResult(__th2dsdp);
                    if (__th2dsdpCutZero == "") {
                        __a = __th2dtdp + " " + __hhh[3] + " " + __nameprice.replace("/m2", "");
                    } else {

                        __a = __th2dtdp + "." + LandMobi.CutZeroResult(__th2dsdp) + " " + __hhh[3] + " " + __nameprice.replace("/m2", "");
                    }
                }

            }
                //End co dau phay
                //Khong co dau Phay
            else {

                __tgsip = __a;
                //9000 Ngan
                var __tgsipLength = parseInt(__tgsip.toString().length);

                //__hhh Don vi
                if (__tgsipLength >= 1 && __tgsipLength <= 3) {
                    __a = __tgsip + " " + __hhh[0] + " " + __nameprice.replace("/m2", "");
                }
                    //__hhh Nghin
                else if (__tgsipLength > 3 && __tgsipLength < 7) {

                    var __th2dsdp = __tgsip.substring(__tgsip.length - 3);
                    var __th2dtdp = __tgsip.substring(0, __tgsip.length - 3);
                    var __th2dsdpCutZero = LandMobi.CutZeroResult(__th2dsdp);
                    if (__th2dsdpCutZero == "") {
                        __a = __th2dtdp + " " + __hhh[1] + " " + __nameprice.replace("/m2", "");
                    } else {

                        __a = __th2dtdp + "." + LandMobi.CutZeroResult(__th2dsdp) + " " + __hhh[1] + " " + __nameprice.replace("/m2", "");
                    }

                }
                    //__hhh Trieu
                else if (__tgsipLength >= 7 && __tgsipLength <= 9) {

                    var __th2dsdp = __tgsip.substring(__tgsip.length - 6);
                    var __th2dtdp = __tgsip.substring(0, __tgsip.length - 6);
                    var __th2dsdpCutZero = LandMobi.CutZeroResult(__th2dsdp);
                    if (__th2dsdpCutZero == "") {
                        __a = __th2dtdp + " " + __hhh[2] + " " + __nameprice.replace("/m2", "");
                    } else {

                        __a = __th2dtdp + "." + LandMobi.CutZeroResult(__th2dsdp) + " " + __hhh[2] + " " + __nameprice.replace("/m2", "");
                    }

                } else if (__tgsipLength > 9) {
                    var __th2dsdp = __tgsip.substring(__tgsip.length - 9);
                    var __th2dtdp = __tgsip.substring(0, __tgsip.length - 9);
                    var __th2dsdpCutZero = LandMobi.CutZeroResult(__th2dsdp);
                    if (__th2dsdpCutZero == "") {
                        __a = __th2dtdp + " " + __hhh[3] + " " + __nameprice.replace("/m2", "");
                    } else {

                        __a = __th2dtdp + "." + LandMobi.CutZeroResult(__th2dsdp) + " " + __hhh[3] + " " + __nameprice.replace("/m2", "");
                    }
                }
            }
        } else {
            __tgsip = 0;
            __a = "Thỏa thuận";
        }
        LandMobi.viewTotalPrice1st.html(__a);
    },
//-------------------------------------------------------LandAds.Utils.MoneyShowOut-----------------------------------------

MoneyShowOut : function(__a) {
    var __nameprice = $('#sl-unit option:selected').text();
    var __hhh = ["", "Nghìn", "Triệu", "Tỷ"];

    var __tgsip = "";
    var __vtdp = __a.indexOf('.');
    //--------------Chuyen doi dau . ve gia------//
    var ___tt = $('#sl-unit').val();
    if (___tt != 0 && __a != "" && __a != "0") {
        //Co dau phay
        if (__vtdp != -1) {
            var __sdp = __a.substring(__vtdp + 1, __a.length);
            if (__sdp.length >= 4) {
                __sdp = __sdp.substring(0, 4);
            }
            var __tdp = __a.substring(0, __vtdp);
            var __tdpLength = __tdp.toString().length;

            __tgsip = __a.toString();
            if (__tdpLength > 3) {
                __tgsip = parseFloat(__a).toFixed().toString();
                __sdp = "";
            }

            var __tgsipLength = __tgsip.toString().length;


            //9->90Le
            if (__tdpLength >= 1 && __tdpLength <= 3) {
                __a = __tdp + "." + LandMobi.CutZeroResult(__sdp) + " " + __hhh[0] + " " + 'Cây vàng';
            }

            //9000 Nghin
            if (__tdpLength > 3 && __tdpLength < 7) {
                var __th2dsdp = __tgsip.substring(__tgsip.length - 3);
                var __th2dtdp = __tgsip.substring(0, __tgsip.length - 3);
                var __th2dsdpCutZero = LandMobi.CutZeroResult(__th2dsdp);
                if (__th2dsdpCutZero == "") {
                    __a = __th2dtdp + " " + __hhh[1] + " " + 'Cây vàng';
                } else {

                    __a = __th2dtdp + "." + LandMobi.CutZeroResult(__th2dsdp) + " " + __hhh[1] + " " + 'Cây vàng';
                }
            }
            //9000 Trieu
            if (__tdpLength >= 7 && __tdpLength <= 9) {
                var __th2dsdp = __tgsip.substring(__tgsip.length - 6);
                var __th2dtdp = __tgsip.substring(0, __tgsip.length - 6);
                var __th2dsdpCutZero = LandMobi.CutZeroResult(__th2dsdp);
                if (__th2dsdpCutZero == "") {
                    __a = __th2dtdp + " " + __hhh[2] + " " + 'Cây vàng';
                } else {

                    __a = __th2dtdp + "." + LandMobi.CutZeroResult(__th2dsdp) + " " + __hhh[2] + " " + 'Cây vàng';
                }
            }
                //9 000 000 000 Ty
            else if (__a > 9) {
                var __th2dsdp = __tgsip.substring(__tgsip.length - 9);
                var __th2dtdp = __tgsip.substring(0, __tgsip.length - 9);
                var __th2dsdpCutZero = LandMobi.CutZeroResult(__th2dsdp);
                if (__th2dsdpCutZero == "") {
                    __a = __th2dtdp + " " + __hhh[3] + " " + 'Cây vàng';
                } else {

                    __a = __th2dtdp + "." + LandMobi.CutZeroResult(__th2dsdp) + " " + __hhh[3] + " " + 'Cây vàng';
                }
            }

        }
            //End co dau phay
            //Khong co dau Phay
        else {

            __tgsip = __a;
            //9000 Ngan
            var __tgsipLength = parseInt(__tgsip.toString().length);

            //__hhh Don vi
            if (__tgsipLength >= 1 && __tgsipLength <= 3) {
                __a = __tgsip + " " + __hhh[0] + " " + 'Cây vàng';
            }
                //__hhh Nghin
            else if (__tgsipLength > 3 && __tgsipLength < 7) {

                var __th2dsdp = __tgsip.substring(__tgsip.length - 3);
                var __th2dtdp = __tgsip.substring(0, __tgsip.length - 3);
                var __th2dsdpCutZero = LandMobi.CutZeroResult(__th2dsdp);
                if (__th2dsdpCutZero == "") {
                    __a = __th2dtdp + " " + __hhh[1] + " " + 'Cây vàng';
                } else {

                    __a = __th2dtdp + "." + LandMobi.CutZeroResult(__th2dsdp) + " " + __hhh[1] + " " + 'Cây vàng';
                }

            }
                //__hhh Trieu
            else if (__tgsipLength >= 7 && __tgsipLength <= 9) {
                var __th2dsdp = __tgsip.substring(__tgsip.length - 6);
                var __th2dtdp = __tgsip.substring(0, __tgsip.length - 6);
                var __th2dsdpCutZero = LandMobi.CutZeroResult(__th2dsdp);
                if (__th2dsdpCutZero == "") {
                    __a = __th2dtdp + " " + __hhh[2] + " " + 'Cây vàng';
                } else {

                    __a = __th2dtdp + "." + LandMobi.CutZeroResult(__th2dsdp) + " " + __hhh[2] + " " + 'Cây vàng';
                }

            } else if (__tgsipLength > 9) {
                var __th2dsdp = __tgsip.substring(__tgsip.length - 9);
                var __th2dtdp = __tgsip.substring(0, __tgsip.length - 9);
                var __th2dsdpCutZero = LandMobi.CutZeroResult(__th2dsdp);
                if (__th2dsdpCutZero == "") {
                    __a = __th2dtdp + " " + __hhh[3] + " " + 'Cây vàng';
                } else {

                    __a = __th2dtdp + "." + LandMobi.CutZeroResult(__th2dsdp) + " " + __hhh[3] + " " + 'Cây vàng';
                }
            }
        }
    } else {
        __tgsip = 0;
        __a = "Thỏa thuận";
    }

    LandMobi.viewTotalPrice1st.html(__a);
},
CutZeroResult : function(__tgsip) {
    var index = __tgsip.toString().length;
    var index0 = 0;
    var __flag0 = "false";
    var __result = "";
    while (index > 0) {
        if (__tgsip.substring(index, index - 1) == "0" && __flag0.toString() == "false") {
            index0++;
        } else {
            __flag0 = "true";
        }
        index--;
    }
    //alert('Index0'+index0.toString());
    __result = __tgsip.substring(0, __tgsip.toString().length - index0);
    return __result;
},
CalMoneyView : function(__idp, __ida, __idrender, level) {
    var ____ups = $('#sl-unit option:selected').attr("unitpricestep");
    var __hhh = ["", "nghìn", "trăm nghìn", "triệu", "tỷ"];
    //Gia va Dien tich
    var var__idp = $(__idp).val();
    var var__ida = $(__ida).val();

    //Tong gia xuat va Tong Gia Hien thi
    var __tgsip = "";
    var __a = "";

    //------Match m2 co ton tai hay khong?-----//
    var __nameprice = $('' + level + ' option:selected').text();
    var mathch___t = __nameprice.match(/Tháng/g);
    var mathchChivang = __nameprice.match(/Chỉ/g);
    var n = __nameprice.match(/m2/g);

    //Neu co chua so 0
    if (____ups != "undefined") {
        //Neu co m2
        if (n != null) {
            //Neu co dien tich
            if (var__ida != "") {
                __a = (var__idp * var__ida).toString();
            }
                //Neu khong co dien tich
            else {
                __a = var__idp.toString();
            }

            if (mathch___t != null) {
                LandMobi.MoneyShowIn(__a, "/Tháng");
            } else {

                LandMobi.MoneyShowIn(__a, "");
            }
        }
            //End Neu co m2
            //Nguoc lai khong co m2
        else {
            __a = var__idp.toString();
            if (mathch___t != null) {
                LandMobi.MoneyShowIn(__a, "/Tháng");
            } else {

                LandMobi.MoneyShowIn(__a, "");
            }
        }
    }
        //Neu khong co chua so 0
    else {

        //Neu co Chỉ vàng
        if (mathchChivang == null) {
            //Neu co m2
            if (n != null) {
                if (var__ida != "") {
                    __a = (var__idp * var__ida).toString();
                } else {
                    __a = (var__idp).toString();
                }

                LandMobi.MoneyShowIn2nd(__a);
            }
                //Nguoc lai khong co m2
            else {
                __a = (var__idp).toString();
                LandMobi.MoneyShowIn2nd(__a);
            }
        } else {
            if (n != null) {
                if (var__ida != "") {
                    __a = (var__idp * var__ida) / 10;
                } else {
                    __a = (var__idp) / 10;
                }
                //LandMobi.MoneyShowIn2nd(__a);
            }
                //Nguoc lai khong co m2
            else {
                __a = (var__idp) / 10;
                // LandAds.Utils.MoneyShowIn2nd(__a);
            }
        }

    }

},

//------------------------------------------------LandAds.Utils.CalMoney2nd -------------
CalMoney2nd: function (__idp, __ida, __idrender, level) {
    var ____ups = $('#view_unit_view_price_id_ads option:selected').attr("unitpricestep");
    var __hhh = ["", "nghìn", "trăm nghìn", "triệu", "tỷ"];
    //Gia va Dien tich
    var var__idp = $(__idp).val();
    var var__ida = $(__ida).val();

    //Tong gia xuat va Tong Gia Hien thi
    var __tgsip = "";
    var __a = "";

    //------Match m2 co ton tai hay khong?-----//
    var __nameprice = $('' + level + ' option:selected').text();
    var mathchThang = __nameprice.match(/Tháng/g);
    var mathchChivang = __nameprice.match(/Chỉ/g);
    var n = __nameprice.match(/m2/g);
    //Neu co chua so 0
    if (____ups != "undefined") {
        //Neu co m2
        if (n != null) {
            //Neu co dien tich
            if (var__ida != "") {
                __a = (var__idp * var__ida).toString();
            }
                //Neu khong co dien tich
            else {
                __a = var__idp.toString();
            }

            if (mathchThang != null) {
                LandMobi.MoneyShowIn(__a, "/Tháng");
            } else {

                LandMobi.MoneyShowIn(__a, "");
            }
        }
            //End Neu co m2
            //Nguoc lai khong co m2
        else {
            //alert('Khong co m2');
            __a = var__idp.toString();
            if (mathchThang != null) {
                LandMobi.MoneyShowIn(__a, "/Tháng");
            } else {

                LandMobi.MoneyShowIn(__a, "");
            }
        }
    }
        //Neu khong co chua so 0
    else {
        //Neu co Chỉ vàng
        if (mathchChivang == null) {
            //Neu co m2
            if (n != null) {
                if (var__ida != "") {
                    __a = (var__idp * var__ida).toString();
                } else {
                    __a = (var__idp).toString();
                }
                LandMobi.MoneyShowIn2nd(__a);
            }
                //Nguoc lai khong co m2
            else {
                __a = (var__idp).toString();
                LandMobi.MoneyShowIn2nd(__a);
            }
        } else {
            if (n != null) {
                if (var__ida != "") {
                    __a = ((var__idp * var__ida) / 10).toString();
                } else {
                    __a = ((var__idp) / 10).toString();
                }
                //alert('Cong' + __a.toString());
                LandMobi.MoneyShowOut(__a);
            }
                //Nguoc lai khong co m2
            else {
                __a = (var__idp) / 10;
                // alert('Khong cong' + __a.toString());
                LandMobi.MoneyShowOut(__a);
            }
        }
        //LandMobi.viewTotalPrice1st.html(__tgsip);
    }
},



    RefreshCap : function() {
        $('#imgCaptcha').html('<img alt="Captcha" src='+LqUtils.linkweb+'capcha/get.php?' + new Date().getTime() +' />');
    },

    /*Project*/
    ProjectParams:{},
    ClickId: function () {
        $(".click-id-project").click(function() {
            LandMobi.ProjectParams['id'] = $(this).data('id');
            window.location.href = LqUtils.linkweb + "?bat-dong-san/chi-tiet-du-an/da-" + LandMobi.ProjectParams['id'] + "/";
        });
    },
    GetTopSlide: function (idRender, fn) {
        var html = '';
        var getlandprojecttopslider = new Servicemobi('land/getlandprojecttopslider', { asnews: false, take: 3, skip: 0 }, function (data) {
            html += '<div class="top-new-slider click-id-project" data-id="' + data[0].ProjectId + '"><img src="' + data[0].ImageUrl + '" width="250" height="195" alt="' + data[0].ProjectName + '" title="' + LqUtils.showTitle(data[0].ProjectName) + '"><div class="title-image"><a>' + data[0].ProjectName + '</a></div></div>';
            html += '<div class="top2-new-hot"><div class="top2-right click-id-project" data-id="' + data[1].ProjectId + '"><img src="' + data[1].ImageUrl + '" width="250" height="195" alt="' + data[1].ProjectName + '" title="' + LqUtils.showTitle(data[1].ProjectName) + '"><div class="title-image"><a>' + data[1].ProjectName + '</a></div></div><div class="top2-left click-id-project" data-id="' + data[2].ProjectId + '"><img src="' + data[2].ImageUrl + '" width="250" height="195" alt="' + data[2].ProjectName + '" title="' + data[2].ProjectName + '"><div class="title-image"><a>' + data[2].ProjectName + '</a></div></div></div>';
            $("#" + idRender).html(html);
            if (fn) fn();
        });
        getlandprojecttopslider.run();

    },
    LoadProjectLand: function (idRender, fn) {
        var html = '';
        LandMobi.listId = '';
        var count = 0;
        for (var i in LandMobi.CategoryId) {
            (function(i) {
                var getlandprojectmaincontentview = new Servicemobi('land/getlandprojectmaincontentview', { categoryid: i, pageindex: 1 }, function(data) {
                    console.log(LandMobi.CategoryId[i] + ":" + Mainjs.GetCountObj(LandMobi.CategoryId));
                    count++;
                    html = '<div class="text-title">' + LandMobi.CategoryId[i] + '</div><div class="title-category"><div class="top2-left click-id-project" data-id="' + data[0].ProjectId + '" ><img id="image-' + data[0].ProjectId + '" title="' + LqUtils.showTitle(data[0].ProjectName) + '"/><div class="title-image"><a>' + data[0].ProjectName + '</a></div></div>';
                    html += '<div class="top2-right click-id-project" data-id="' + data[1].ProjectId + '"><img id="image-' + data[1].ProjectId + '" title="' + LqUtils.showTitle(data[1].ProjectName) + '"/><div class="title-image"><a>' + data[1].ProjectName + '</a></div></div>';
                    html += '<div class="news-sub-3">';
                    for (var j = 2; j < data.length; j++) {
                        html += '<div class="title-project-land click-id-project" data-id="' + data[j].ProjectId + '"><a>' + data[j].ProjectName + '</a></div>';
                    }
                    html += '</div></div>';

                    for (var l = 0; l < 5; l++) {
                        LandMobi.listId += data[l].ProjectId + ",";
                    }
                    $("#" + idRender).append(html);
                    if (count == Mainjs.GetCountObj(LandMobi.CategoryId)) {
                        LandMobi.ClickId();
                        if (fn) fn();
                    }
                });
                getlandprojectmaincontentview.run();
            })(i);
        }

    },
    LoadTitileProjectLand: function (countProjects, fn) {
        var html = '';
        var getlandprojecttopslider = new Servicemobi('land/getlandprojecttopslider', { asnews: true, take: 10, skip: 0 }, function (data) {
            for (var i = 0; i < countProjects; i++) {

                html += '';
                html = '<div class="text-title title-category-click" data-category="DABDS">Dự án bất động sản</div><div class="title-category" data-category="DABDS"><div class="top2-left click-id-project" data-id="' + data[0].ProjectId + '"><img src="' + data[0].ImageUrl + '" title="' + LqUtils.showTitle(data[0].ProjectName) + '"><div class="title-image"><a>' + data[0].ProjectName + '</a></div></div>';
                html += '<div class="top2-right click-id-project" data-id="' + data[1].ProjectId + '"><img src="' + data[1].ImageUrl + '" title="' + LqUtils.showTitle(data[1].ProjectName) + '"><div class="title-image"><a>' + data[1].ProjectName + '</a></div></div>';
                html += '<div class="news-sub-3">';
                for (var j = 2; j < countProjects; j++) {
                    html += '<span class="click-id-project" data-id="' + data[j].ProjectId + '"><a>' + data[j].ProjectName + '</a></span>';
                }
                html += '</div></div>';
            }
            $("#category").append(html);
            if (fn) fn();
        });
        getlandprojecttopslider.run();
    },
    getterHref : function(obj, _insteadId, _insteadName) {
        if (obj == undefined) {
            obj = { ProjectId: _insteadId, ProjectName: _insteadName };
        }   
        return (LqUtils.linkweb + '?bat-dong-san/chi-tiet-du-an/' + 'da-' + obj.ProjectId + "/" + LqUtils.UnSign(obj.ProjectName) + ".html");
    },
    DetailsProjectById: function (projectId, fn) {
        var html = '';
        var getlandprojectviewdetail = new Servicemobi('land/getlandprojectviewdetail', { projectid: projectId }, function(data) {
            $('#lq-id-lqbox-dcontent').html(data.MainContent);
            LandMobi.ProjectParams["category"] = data.CategoryId;
            $('#name-category').html("Dự án &quot;" + data.CategoryName + "&quot; khác");
            $('#lq-id-title').html("<span>" + data.ProjectName + "</span>");
            if (data.Description == undefined || data.Description.length < 200)
                $('#project-Introduction').hide();
            else {
                $('#DescriptionId').html(data.Description);
            };
            LandMobi.Property["DateStart"] = data.PostDate;
            LandMobi.Property["MainContent"] = data.MainContent;
            LandMobi.Property["ProjectName"] = data.ProjectName;
            LandMobi.Property["ImageUrl"] = data.ImageUrl;
            LandMobi.Property["ProjectId"] = data.ProjectId;
            
            html += '<thead><tr><th colspan="2">Thông tin mô tả</th></tr></thead><tbody>';
            html += '<tr><td class="ThongtinduanIdFirst">Tỉnh thành:</td>';
            html += '<td class="ThongtinduanIdLast">' + data.ProvinceName + '</td></tr>';
            html += '<tr><td>Quận huyện: </td>';
            html += '<td class="adjacent">' + data.DistrictName + '</td></tr>';

            if (data.Address != undefined) {
                html += '<tr><td>Ðịa chỉ: </td>';
                html += '<td class="adjacent">' + data.Address + '</td></tr>';
            }
            if (data.Scale != undefined) {
                html += '<tr><td>Quy mô: </td>';
                html += '<td class="adjacent">' + data.Scale + '</td></tr>';
            }
            if (data.TotalInvestment != undefined) {
                html += '<tr><td>Tổng mức đầu tư: </td>';
                html += '<td class="adjacent">' + data.TotalInvestment + '</td></tr>';
            }
            if (data.StartDate != undefined) {
                html += '<tr><td>Khởi công:</td>';
                html += '<td class="adjacent">' + data.StartDate + '</td></tr>';
            }
            if (data.CompletedDate != undefined) {

                html += '<tr><td>Dự kiến hoàn thành:</td>';
                html += '<td class="adjacent">' + data.CompletedDate + '</td></tr>';
            }
            if (data.CompanyName != undefined) {
                html += '<tr><td> Chủ đầu tư:</td>';
                html += '<td class="adjacent">' + data.CompanyName + '</td></tr>';
            }
            if (data.ConsultantsName != undefined) {
                html += '<tr><td> Ðơn vị tư vấn:</td>';
                html += '<td class="adjacent">' + data.ConsultantsName + '</td></tr>';
            }
            if (data.ConstructionName != undefined) {
                html += '<tr><td> Ðơn vị thi công:</td>';
                html += '<td class="adjacent">' + data.ConstructionName + '</td></tr>';
            }
            if (data.NoteProject != undefined) {
                html += '<tr><td> Ghi chú về tiến độ dự án:</td>';
                html += '<td class="adjacent">' + data.NoteProject + '</td></tr>';
            }
            if (data.Lat != undefined && data.Lng != undefined) {
                LandMobi.Property["Lat"]=data.Lat;
                LandMobi.Property["Lng"] =data.Lng;
            }
            html += '</tbody>';
            //Land.GetLandProjectAlbum(data.ProjectId);
            //Land.GetProjectsOfTheSameCategory(data.CategoryId);
            
            $("#ThongtinduanDetailsId").html(html);
            if (fn) fn();
        });
        getlandprojectviewdetail.run();
    },
    LoadImgaeProject:function (idRender, projectId, fn) {
        var html = '<div id="imgs">';
        var widthImg = $(document).width()-20;
        var getImagesProject = new Servicemobi('land/getlandprojectalbum', { projectid: projectId }, function (data) {
            LandMobi.ImgSwipeParams["len"] = data.length;
            LandMobi.ImgSwipeParams["widthImg"] = 100 / LandMobi.ImgSwipeParams["len"];
            for (var i in data) {
                html += '<a style="width:'+widthImg+'px">' + data[i].ImageNote + '</a>';
                html += '<img src="' + data[i].ImageUrl + '" title="' + data[i].ImageNote + '" />';
            }
            html += '</div>';
            $("#" + idRender).html(html);
            if (fn) fn();
            
            $("#imgs").css("width", (LandMobi.ImgSwipeParams["len"] * 100) + "%");
            $("#imgs img").css("width", (LandMobi.ImgSwipeParams["widthImg"]-0.3) + "%");
            
            
        });
        getImagesProject.run();
    },
    
    TablePriceLand: function (idRender, provinceId, page, fn) {
        var html = '<table class="table-price-land"><thead><tr><th>STT</th><th>Tên bảng giá</th><th>Tỉnh/TP</th><th>Xem</th></tr></thead><tbody>';
        var getlandknowledgetableprice = new Servicemobi('landknowledge/getlandknowledgetableprice', { provinceid: provinceId, numberrecord: 20, numberpage: page, skip: 0 }, function(data) {
            for (var i = 0; i < Object.keys(data).length; i++) {
                html += '<tr><td>' + (i + 1) + '</td><td>' + data[i].Title + '</td><td>' + data[i].ProvinceName + '</td><td><a href="' + data[i].LinkDownload + '" ><img src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRvEKZvr6lAuYCSUOY_ztegC-apvsXpRsY1h5S5UlIPoqT39ihY" width="20px" height="20px"/></a></td></tr>';
            }
            html += '</tbody></table>';
            $("#" + idRender).html(html);
            if (fn) fn();
        });
        getlandknowledgetableprice.run();
    },
    GetProjectThesame:function (idRender, category, fn) {
        var html = '';
        var getProjectThesame = new Servicemobi('land/getprojectsofthesamecategory', { categoryid: category }, function (data) {
            for (var i in data) {
                html += '<div class="descriptions-project click-id-project" data-id="' + data[i].ProjectId + '"><img src="' + data[i].ImageUrl + '" width="100px" height="85px"/><a>' + data[i].ProjectName + '</a><br/><span>' + LqUtils.TrunLength(data[i].MainContent, 150, "...") + '</span></div>';
            }
            $("#" + idRender).html(html);
            if (fn) fn();
        });
        getProjectThesame.run();
    }
    
};
