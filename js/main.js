Mainjs = {
    Scroll: function (idClick, idScroll, delay) {
        var scroll = $("#" + idScroll).offset().top;
        $("#" + idClick).click(function () {
            $('html, body').stop().animate({
                scrollTop: scroll
            }, delay);
        });
    },
    GetProvince: function (selectedId, fn) {
        var html = '<option value="0">---Chọn Tỉnh/TP---</option>';
        var getlqprovince = new Servicemobi('land/getlqprovince', undefined, function (data) {
            for(var i in data) {
                html += '<option value="' + data[i].ProvinceId + '">' + data[i].ProvinceName + '</option>';
            }
            $("#" + selectedId).html(html);
            if (fn) fn();
        });
        getlqprovince.run();
    },
    GetDistrict:function (selectedId, provinceId, fn) {
        var html = '<option value="0">---Chọn Quận/Huyện---</option>';
        var getlqdistrictbyprovinceid = new Servicemobi('land/getlqdistrictbyprovinceid', { provinceid: provinceId }, function(data) {
            for(var i in data) {
                html += '<option value="' + data[i].DistrictId + '">' + data[i].DistrictName + '</option>';
            }
            $("#" + selectedId).html(html);
            $("#" + selectedId).attr("name", provinceId);
            if (fn) fn();
        });
        getlqdistrictbyprovinceid.run();
    },
    GetCountObj:function (obj) {
        var count = 0;
        /*var aaa = Object.keys(obj).length();*/
        for(var i in obj) {
            count++;
        }
        return count;
    },
    FormatUndefined:function (str) {
        if (str == undefined)
            return "";
        else return str;
    },
    FormatDate : function(dateInput) {
        if (dateInput == undefined || dateInput == "1901-01-01T00:00:00" || dateInput == "0011-01-01T00:00:00") return "N/A";
        var dateDay = dateInput.substring(0, 10);
        return dateDay.split('-')[2] + '/' + dateDay.split('-')[1] + '/' + dateDay.split('-')[0];
    },
    FormatNumber : function(nStr, command) {
        var nStr = nStr || "";
        if (nStr.toString().indexOf(".") != -1) {
            nStr = nStr.toString().substring(0, nStr.toString().indexOf("."));
        }
        nStr = nStr || 0;
        nStr = nStr.toString();
        nStr = nStr.replace(/,/g, '');
        nStr = nStr.replace('.', '');
        command = command || ".";
        nStr += '';
        x = nStr.split('.');
        x1 = x[0];
        x2 = x.length > 1 ? '.' + x[1] : '';
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1)) { x1 = x1.replace(rgx, '$1' + command + '$2');
        }
        var _ref = (x1 + x2);
        return _ref;
    },
    converToDateTime : function(datetime) {
        var date = datetime.split("T");
        var _date = date[0].split("-");
        var __date = date[1].split(":");
        var ___date = __date[2].split(".");
        return new Date(_date[0], _date[1] - 1, _date[2], __date[0], __date[1], ___date[0], ___date[1] == 0);
    },
    FormatDateFull : function(datetime) {
        var date = datetime.split("T");
        var addZero = function(d) {
            if (d.toString().length == 1) return "0" + d;
            else return d;
        };
        var dayMapping = { 1: 'Thứ hai', 2: 'Thứ ba', 3: 'Thứ tư', 4: 'Thứ năm', 5: 'Thứ sáu', 6: 'Thứ bẩy', 0: 'Chủ nhật' };
        var _date = date[0].split("-");
        var __date = date[1].split(":");
        var ___date = Mainjs.converToDateTime(datetime);

        return dayMapping[___date.getDay()] + ', ' + (addZero(_date[2]) + '/' + addZero(_date[1]) + '/' + addZero(_date[0]) + '   ' + addZero(__date[0]) + ':' + addZero(__date[1]) + ':' + addZero(__date[2]).substring(0, 2));
    },
    GetDifferentDate : function(dateFrom, dateTo) {
        if (!dateFrom) return -1;
        var from = dateFrom.split('/');
        var dateStart = new Date(from[2], from[1] - 1, from[0]);
        var dateEnd;
        if (dateTo != undefined) {
            var end = dateTo.split('/');
            dateEnd = new Date(end[2], end[1] - 1, end[0]);
        } else {
            var now = new Date();
            dateEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        }
        var _DateStart = dateStart.getTime() / 86400000;
        var _DateEnd = dateEnd.getTime() / 86400000;
        if (_DateEnd < _DateStart) return undefined;
        return Math.round(_DateEnd - _DateStart);
    },
    NameCategory: function (groupId, categoryId) {
        for (var i in News.mappingSubCategory[groupId]) {
            if (Object.keys(News.mappingSubCategory[groupId][i]) == categoryId) {
                return News.mappingSubCategory[groupId][i][categoryId];
            }
        }
    },
    BeforeAfterDatePicker : function (startDate, endDate, valueDate) {
        $("#" + startDate).datepicker({
            minDate: 0,
            maxDate: '+30Y',
            showOn: "button",
            buttonImage: "http://jqueryui.com/resources/demos/datepicker/images/calendar.gif",
            buttonImageOnly: true
        });
        $("#" + startDate).datepicker('setDate', new Date());
        $("#" + endDate).datepicker({
            minDate: '+3D',
            maxDate: '+3Y',
            showOn: "button",
            buttonImage: "http://jqueryui.com/resources/demos/datepicker/images/calendar.gif",
            buttonImageOnly: true
        });
        $("#" + endDate).datepicker('setDate', '"+'+valueDate+'D"');
        $('#' + startDate).datepicker();
        $("#" + endDate).datepicker();
    },
    DataTranfer: {},
    
    ConvertDateSearch : function(dateFormat, gets) {
        if (dateFormat == undefined) return 'N/A';
        var _char = (dateFormat.indexOf('/') == -1) ? "-" : "/";
        var dateSplit = dateFormat.split(_char);
        if (dateSplit[1] == undefined) return 'N/A';
        if (gets == 'full') {
            return dateSplit[1] + '/' + dateSplit[0] + '/' + dateSplit[2];
        } else {
            return dateSplit[1] + '/' + dateSplit[0] + '/' + dateSplit[2];
        }
    },
    
    
};
