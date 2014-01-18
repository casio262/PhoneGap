FinancialMobi = {
    Params: { deposit: true, type: 1, person: true, page: 1 },
    GetBankHomeCache : [],
    LoadBank:function (selectBank, fn) {
        var html = '<option value="0">---Chọn ngân hàng---</option>';
        var getbank = new Servicemobi('appstore/getbank', { adsflag: 0, numberpage: 0, numberrecord: 0 }, function(data) {
            for(var i in data) {
                html += '<option value="' + data[i].BankId + '">' + data[i].BankName + '</option>';
                FinancialMobi.GetBankHomeCache.push({ id: data[i].BankId, bankName:data[i].BankName, bankLogo: data[i].BankLogo });
            }
            $("#" + selectBank).html(html);
            if (fn) fn();
        });
        
        getbank.run();
    },
    FormSearchATM: function (idRender, fn) {
        var html = '<div class="text-title title-category-click" data-category="ATM">Bản đồ ATM</div>';
        html += '<div class="lq-land-box-search lq-right-land-box-search-ATM"><div class="RLandboxSearchTitleATM">Tìm kiếm ATM</div><div class="lq-right-land-box-contents-ATM"><label class="lq-stock-select-arrow-down"><select id="selectBank" class="SelectWidth lq-marginTopBottom5" selected="selected"><option value="0">---Chọn ngân hàng---</option></select></label><label class="lq-stock-select-arrow-down"><select id="selectProvince" class="SelectWidth lq-marginTopBottom5" selected="selected"><option value="0">---Chọn Tỉnh/TP---</option></select></label><label class="lq-stock-select-arrow-down"><select id="selectDistrict" class="SelectWidth lq-marginTopBottom5"><option value="0">---Chọn Quận/Huyện---</option></select></label><button id="search-address-atm" class="lq-button-ios">Tìm kiếm</button></div></div>';
        var htmlatm = '<div class="lq-land-box-search lq-right-land-box-search-ATM"><div class="RLandboxSearchTitleATM">Tìm kiếm ATM</div><div class="lq-right-land-box-contents-ATM"><label class="lq-stock-select-arrow-down"><select id="selectBank" class="SelectWidth lq-marginTopBottom5" selected="selected"><option value="0">---Chọn ngân hàng---</option></select></label><label class="lq-stock-select-arrow-down"><select id="selectProvince" class="SelectWidth lq-marginTopBottom5" selected="selected"><option value="0">---Chọn Tỉnh/TP---</option></select></label><label class="lq-stock-select-arrow-down"><select id="selectDistrict" class="SelectWidth lq-marginTopBottom5"><option value="0">---Chọn Quận/Huyện---</option></select></label><button id ="search-address-atm" class="lq-button-ios">Tìm kiếm</button></div></div>';
        if (idRender)
            $("#" + idRender).append(htmlatm);
        else
            $("#category").append(html);
        
        if (fn) fn();
    },
    FormInterestRateDeposit: function (type, person, page, record, fn) {
        var htmlPage = '';
        var html = '<div class="text-title title-category-click" data-category="LS">Lãi suất</div><table class="interest-tb"><thead> <tr> <th style="width:105px; height:35px;"><span style="float:left;padding:16px 0 0 2px;">Ngân hàng</span><div style="width:113px;margin-left:-2px; -webkit-transform:rotate(18deg);transform:rotate(18deg);-moz-transform:rotate(18deg);position:absolute;border-bottom:1px solid #D4D0D0;padding-top:16px;"></div><span style="float:right; ">Kỳ hạn</span></th>  <th class="lq-width-bank-deposit">KKH</th>  <th class="lq-width-bank-deposit">1T</th> <th class="lq-width-bank-deposit"><span>2T</span></th> <th class="lq-width-bank-deposit">3T</th> <th class="lq-width-bank-deposit">6T</th> <th class="lq-width-bank-deposit">12T</th> <th class="lq-width-bank-deposit">24T</th></tr> </thead><tbody>';
        var getappbankdeposit = new Servicemobi('appstore/getappbankdeposit', { unitid: type, personal: person, numberpage: page, record: record }, function (data) {
            for (var i in data) {
                html += '<tr><td><img src="' + data[i].BankLogo + '"/></td><td>' + Mainjs.FormatUndefined(data[i].KKH) + '</td><td>' + Mainjs.FormatUndefined(data[i].Thang1) + '</td><td>' + Mainjs.FormatUndefined(data[i].Thang2) + '</td><td>' + Mainjs.FormatUndefined(data[i].Thang3) + '</td><td>' + Mainjs.FormatUndefined(data[i].Thang6) + '</td><td>' + Mainjs.FormatUndefined(data[i].Thang12) + '</td><td>' + Mainjs.FormatUndefined(data[i].Thang24) + '</td></tr>';
                htmlPage += '<tr><td><img src="' + data[i].BankLogo + '"/></td><td>' + Mainjs.FormatUndefined(data[i].KKH) + '</td><td>' + Mainjs.FormatUndefined(data[i].Thang1) + '</td><td>' + Mainjs.FormatUndefined(data[i].Thang2) + '</td><td>' + Mainjs.FormatUndefined(data[i].Thang3) + '</td><td>' + Mainjs.FormatUndefined(data[i].Thang6) + '</td><td>' + Mainjs.FormatUndefined(data[i].Thang12) + '</td><td>' + Mainjs.FormatUndefined(data[i].Thang24) + '</td></tr>';
            }
            html += '</tbody></table>';
            html += '<div id="bntAdd" style="background-color:white; text-align:right;width:100%;padding:3px 0 5px;"><button id="addPage" class="lq-button-ios LqPaddingButton lq-marginTopBottom" onclick="">Thêm</button></div>';
            if(page==1) {
                $("#category").append(html);
            } else {
                $(".interest-tb").append(htmlPage);
            }
            if (fn) fn();
        });
        getappbankdeposit.run();
    },
    PageInteresRateDeposit:function (type, person, page, fn) {
        var html1 = '<thead> <tr> <th style="width:105px; height:35px;"><span style="float:left;padding:16px 0 0 2px;">Ngân hàng</span><div style="width:113px;margin-left:-2px; -webkit-transform:rotate(18deg);transform:rotate(18deg);-moz-transform:rotate(18deg);position:absolute;border-bottom:1px solid #D4D0D0;padding-top:16px;"></div><span style="float:right; ">Kỳ hạn</span></th>  <th class="lq-width-bank-deposit">KKH</th>  <th class="lq-width-bank-deposit">1T</th> <th class="lq-width-bank-deposit"><span>2T</span></th> <th class="lq-width-bank-deposit">3T</th> <th class="lq-width-bank-deposit">6T</th> <th class="lq-width-bank-deposit">12T</th> <th class="lq-width-bank-deposit">24T</th></tr> </thead>';
        var html = '';
        var getallappbankdeposit = new Servicemobi('appstore/getallappbankdeposit', { unitid: type, personal: person, numberpage: page }, function (data) {
            for (var i in data) {
                html += '<tr><td><img src="' + data[i].BankLogo + '"/></td><td>' + Mainjs.FormatUndefined(data[i].KKH) + '</td><td>' + Mainjs.FormatUndefined(data[i].Thang1) + '</td><td>' + Mainjs.FormatUndefined(data[i].Thang2) + '</td><td>' + Mainjs.FormatUndefined(data[i].Thang3) + '</td><td>' + Mainjs.FormatUndefined(data[i].Thang6) + '</td><td>' + Mainjs.FormatUndefined(data[i].Thang12) + '</td><td>' + Mainjs.FormatUndefined(data[i].Thang24) + '</td></tr>';
            }
            if (page == 1)
                $(".interest-tb").html(html1 + html);
            else if(page!=1){
                $(".interest-tb").append(html);
            }
            if (fn) fn();
        });
        getallappbankdeposit.run();
    },
    FormInterestRateLoan: function (type, person, page, fn) {
        var htmls = '<thead> <tr> <th style="width:141px">Ngân hàng</th>  <th style="width:50px">Lãi suất</th>  <th style="width:45px">Tháng</th> <th style="width:60px">Thế chấp</th> <th style="width:85px">Giá trị hỗ trợ</th> <th>Điều kiện</th> <th>Sản phẩm</th> </tr> </thead><tbody>';
        var html = '';
        var getappbankloan = new Servicemobi('appstore/getappbankloan', { bankloancategoryid: type, personal: person, numberpage: page, record: 10 }, function (data) {
            for(var i in data) {
                html += '<tr>';
                html += '<td> <img src="' + data[i].BankLogo + '" width="120px" height="50px" title="' + data[i].BankName + '" alt = "' + data[i].BankName + '"> </td>';
                html += '<td>' + Mainjs.FormatUndefined(data[i].Interest) + '</td>';
                html += '<td>' + Mainjs.FormatUndefined(data[i].Month) + '</td>';
                html += '<td>' + Mainjs.FormatUndefined(data[i].Mortgage) + '</td>';
                html += '<td>' + Mainjs.FormatUndefined(data[i].SupportValue) + '</td>';
                html += '<td ><a name="' + data[i].BankName + '" class="" id="LqBankLoan' + data[i].BankLoanId + '" style="color:transparent; cursor: help;"><img src="http://lequang.vn/Content/Images/ImageSite/icon-i20x20.gif?7200" width="20px" height="20px"/></a></td>';
                html += '<td style="text-align:left; padding-left:3px;">' + Mainjs.FormatUndefined(data[i].Product) + '</td>';
                html += '</tr>';
            }
            html += '</tbody>';
            if (page == 1) {
                $(".interest-tb").html(htmls+html);
            }else if(page!=1)
                $(".interest-tb").append(html);
            if (fn) fn();
        });
        getappbankloan.run();
    },
    
    
    EventClick: function () {
        var slClick = 0;
        $(".menu-header-interes").click(function () {
            $(".menu-header-interes").removeClass("lq-button-interest").addClass("lq-clear-button-interest");
            $(this).addClass("lq-button-interest").removeClass("lq-clear-button-interest");
            
            FinancialMobi.Params['type'] = this.id.charAt(this.id.length - 1);
            FinancialMobi.Params['page'] = 1;
            console.log(FinancialMobi.Params);
            if(FinancialMobi.Params['deposit']==true) {
                FinancialMobi.PageInteresRateDeposit(FinancialMobi.Params['type'], FinancialMobi.Params['person'], FinancialMobi.Params['page']);
            } else if (FinancialMobi.Params['deposit']==false) {
                FinancialMobi.FormInterestRateLoan(FinancialMobi.Params['type'], FinancialMobi.Params['person'], FinancialMobi.Params['page'], function() {

                });
            }
            /*var clickId = this.id;
            var id = clickId.charAt(clickId.length - 1);
            var loai = clickId.substring(0, clickId.length - 1);
            if (loai == "lq-deposits-id-item")
                InterestRate.GetAppBankDeposit(id);
            else if (loai == "lq-loan-id-item") {
                InterestRate.GetAppBankLoan(id);
            }*/
        });
        
        
        $("#sl-deposits").click(function () {
            slClick++;
            FinancialMobi.Params['deposit'] = true;
            console.log(slClick);
            if (slClick != 1) {
                $(this).addClass('select-active');
                $("#sl-loan").removeClass('select-active');
                $("#lq-deposits-id-item1").text('VNĐ');
                $("#lq-deposits-id-item2").text('USD');
                $("#lq-deposits-id-item3").text('Vàng');
                FinancialMobi.Params['person'] = $("#sl-deposits option:selected").val();
                FinancialMobi.Params['type'] = 1;
                FinancialMobi.Params['page'] = 1;
                //FinancialMobi.PageInteresRateDeposit(FinancialMobi.Params['type'], FinancialMobi.Params['person'], FinancialMobi.Params['page'], function () { });
                $("#lq-deposits-id-item1").trigger('click');
                slClick = 0;
            }
            console.log(FinancialMobi.Params);
        });
        $("#sl-loan").click(function () {
            slClick++;
            FinancialMobi.Params['deposit'] = false;
            
            console.log(slClick);
            if (slClick != 1) {
                $(this).addClass('select-active');
                $("#sl-deposits").removeClass('select-active');
                FinancialMobi.Params['person'] = $("#sl-loan option:selected").val();
                FinancialMobi.Params['type'] = 1;
                FinancialMobi.Params['page'] = 1;
                $("#lq-deposits-id-item1").text('Tiêu dùng');
                $("#lq-deposits-id-item2").text('Mua nhà');
                $("#lq-deposits-id-item3").text('Mua xe');
                $("#lq-deposits-id-item1").trigger('click');
                //FinancialMobi.FormInterestRateLoan(FinancialMobi.Params['type'], FinancialMobi.Params['person'], FinancialMobi.Params['page'], function() {});
                slClick = 0;
            }
            console.log(FinancialMobi.Params);
        });
        $("#addPage").click(function () {
            FinancialMobi.Params['page']++;
            if (FinancialMobi.Params['deposit'] == true)
                FinancialMobi.PageInteresRateDeposit(FinancialMobi.Params['type'], FinancialMobi.Params['person'], FinancialMobi.Params['page'], function () { });
            else if (FinancialMobi.Params['deposit'] == false) {
                FinancialMobi.FormInterestRateLoan(FinancialMobi.Params['type'], FinancialMobi.Params['person'], FinancialMobi.Params['page'], function () { });
            }
            console.log('page:'+FinancialMobi.Params['page']);
        });

    },

    GetImages : function(img) {
        return img || LqUtils.linkweb + "/Content/Images/ImageSite/no logo.jpg";
    },
    GetBankHomeCacheGetImg : function(id) {
        for (var i = 0, len = this.GetBankHomeCache.length; i < len; i++) {
            if (this.GetBankHomeCache[i]['id'] == id) {
                return this.GetBankHomeCache[i]['bankLogo'];
            }
        }
        return undefined;
    },

    GetBankHomeCacheGetName : function(id) {

        return $("#selectBank option[value='" + id + "']").text();
    },
    
    SearchATM: function (idRender, bankId, provinceId, districtId, fn) {
        var html = '';
        console.log(idRender, bankId, provinceId, districtId);
        var getatm = new Servicemobi('appstore/getatm', { bankid: bankId, provinceid: provinceId, districtid: districtId }, function (data) {
            if (data == undefined || data == "") {
                $("#find-atm span").html('');
                $("#" + idRender).html('Không tìm thấy địa điểm nào.');
            } else {
                $("#find-atm span").html('Đã tìm thấy ' + data.length + ' địa điểm ATM');
                for (var i in data) {
                    html += '<div id="place-' + data[i].PlaceId + '" ><div class="places title-place" onclick="LqGoogleMap.launchInfoATMWindow(' + data[i].Lat + ', ' + data[i].Lng + ',' + data[i].PlaceId + ');">' + data[i].PlaceName + '</div><div class="address-atm">' + data[i].Address + '</div></div>';
                }
                $("#" + idRender).html(html);
            }
            if (fn) fn();
            $(".title-place").bind('click', function () {
                $(".title-place").css('color', '#833807').css('background-color', '');
                $(this).css('color', 'red').css('background-color', 'antiquewhite');
            });
        });
        getatm.run();
    },
    
    

};
