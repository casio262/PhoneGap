LqUtils = { };
LqUtils.getMapScripts = function (_fndone_) {
    (function (w) {
        try {
            google.ack = '_xhex_';
            LqUtils.getScript(AppConfigs.host + '/Scripts/LqImportScripts/infobubble.js', function () {
                if (_fndone_) _fndone_();
            });
        } catch (ex) {
            var d = w.document,
                script = d.createElement('script');
            script.setAttribute(
                'src',
                'http://maps.google.com/maps/api/js?sensor=false&callback=mapOnLoad'
            );
            d.documentElement.firstChild.appendChild(script);
            w.mapOnLoad = function () {
                LqUtils.getScript('http://lequang.vn/Scripts/LqImportScripts/infobubble.js', function () {
                    if (_fndone_) _fndone_();
                });
            };
        }
    }(window));

};
LqUtils.scriptLoaded = {};
LqUtils.LoadJs = function (urlJs, callback, rootLink) {
    var _preLink;
    if (rootLink == "") _preLink = "";
    else _preLink = "~/js/";
    $.ajax({
        type: "GET",
        url: _preLink + urlJs,
        success: callback,
        dataType: "script",
        cache: true
    });
    LqUtils.scriptLoaded[urlJs];
};

LqUtils.getScript = function (urlJs, callbacks) {
    if (!LqUtils.scriptLoaded[urlJs]) {
        LqUtils.LoadJs(urlJs, callbacks, "");
    } else {
        if (callbacks) callbacks();
    }
};
LqUtils.cssLoaded = {};
LqUtils.getCSS = function (urlCss, callbacks) {
    if (!LqUtils.cssLoaded[urlCss]) {

        var stylesheet = document.createElement('link');
        stylesheet.href = urlCss;
        stylesheet.rel = 'stylesheet'; stylesheet.type = 'text/css';
        document.getElementsByTagName('head')[0].appendChild(stylesheet);
        LqUtils.cssLoaded[urlCss] = "__loaded__";
        if (callbacks) callbacks();

    } else {
        if (callbacks) callbacks();
    }
};


LqUtils.formatUndefined = function (string) {
    if (string == undefined)
        return "";
    return string;
};
LqUtils.formatPercent = function (string) {
    if (string == undefined)
        return '0';
    return string.split('~')[0];
};
LqUtils.formatTitleRatio = function(string) {
    if (string == undefined)
        return '';
    return 'Cập nhật lúc: ' + string.split('~')[1];
};
LqUtils.FormatDate = function (DateInput) {
    if (DateInput == undefined || DateInput == "1901-01-01T00:00:00" || DateInput == "0011-01-01T00:00:00") return "N/A";
    var DateDay = DateInput.substring(0, 10);
    return DateDay.split('-')[2] + '/' + DateDay.split('-')[1] + '/' + DateDay.split('-')[0];

};
LqUtils.getFormatDate = function (dateData, get) {
    try {
        if (dateData == undefined) return 'N/A';
        var fulldate = dateData.split('T');
        var date = fulldate[0].split('-');
        var time = fulldate[1].split(':');

        var refDate = date[2] + '/' + date[1] + '/' + date[0];
        var refTime = time[0] + ':' + time[1] + ':' + time[2];
        if (get == 't') return refTime.substring(0, 8);
        else if (get == 'd') return refDate;
        else return refDate + '  ' + refTime.substring(0, 8);
    } catch (ex) {
        return dateData;
    }
};
LqUtils.dateMonthDayYear = function(date) {
    var day = date.getDate(),
        month = date.getMonth()+1,
        year = date.getFullYear();
    if (day < 10) day = '0' + day;
    if (month < 10) month = '0' + month;
    return month + '/' + day + '/' + year;
};

LqUtils.getParams = function (at, decode) {
    $.urlParam = function (name) {
        var results = new RegExp('[\\?&amp;]' + name + '=([^&amp;#]*)').exec(window.location.href);
        if (results) {
            if (decode) return decodeURIComponent(results[1]);
            return results[1] || 0;
        } else return -1;
    };
    return decodeURIComponent((new RegExp('[?|&]' + at + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [, ""])[1].replace(/\+/g, '%20')) || null;
};
LqUtils.scrollTo = function (x) {

    setTimeout(function () { $('body').scrollTop(x); }, 1200);
};
LqUtils.hideCover = function () {
    if ($('#cover-bg').size() == 1) $('#cover-bg').remove();
};



/*company*/

LqUtils.Pow = function (dec, fix) {
    var fixValue = parseFloat(Math.pow(10, fix));
    return parseInt(Math.round(dec * fixValue)) / fixValue;
};
LqUtils.FormatNumber = function (nStr, command) {
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
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + command + '$2');
    }
    var _ref = (x1 + x2);
    return _ref;
};

LqUtils.getDateUTC = function (date) {
    if (date) {
        var _date = date.split("T");
        _date = _date[0].split("-");
        return Date.UTC(_date[0], _date[1] - 1, _date[2]);
    } else return Date.UTC(new date());
};
LqUtils.getDateTimeUTC = function (datetime) {
    var date = datetime.split("T");
    var _date = date[0].split("-");
    var __date = date[1].split(":");
    var ___date = __date[2].split(".");
    return Date.UTC(_date[0], _date[1] - 1, _date[2], __date[0] - 7, __date[1], ___date[0], ___date[1]);
};
LqUtils.getFormatDate = function (date, get) {
    try {
        if (date == undefined) return 'N/A';
        var fulldate = date.split('T');
        var date = fulldate[0].split('-');
        var time = fulldate[1].split(':');

        var refDate = date[2] + '/' + date[1] + '/' + date[0];
        var refTime = time[0] + ':' + time[1] + ':' + time[2];
        if (get == 't') return refTime.substring(0, 8);
        else if (get == 'd') return refDate;
        else return refDate + '  ' + refTime.substring(0, 8);
    } catch (ex) {
        return date;
    }
};
LqUtils.converToDateTime = function (datetime) {
    var date = datetime.split("T");
    var _date = date[0].split("-");
    var __date = date[1].split(":");
    var ___date = __date[2].split(".");
    return new Date(_date[0], _date[1] - 1, _date[2], __date[0], __date[1], ___date[0], ___date[1] == 0);
};
LqUtils.CompareTwoDays = function (date1, date2) {
    var d1, d2;
    d1 = date1.getDate(); d2 = date2.getDate();
    if (d1 != d2)
        return false;
    var m1, m2;
    m1 = date1.getMonth(); m2 = date2.getMonth();
    if (m1 != m2)
        return false;
    var y1, y2;
    y1 = date1.getFullYear(); y2 = date2.getFullYear();
    if (y1 != y2)
        return false;

    return true;
};
LqUtils.ConverDateClineToDateSever = function (ddmmyyyy) {
    var dateSub = ddmmyyyy.split('/');
    var mmddyyyy = new Date(dateSub[2], dateSub[1] - 1, dateSub[0]);
    return mmddyyyy;
};
LqUtils.CheckImage = function(img) {
    if (img == undefined) {
        return 'http://lequang.vn/mobile/img/no_photo.jpg';
    } else {
        return img;
    }
};
LqUtils.GetNumberDate = function (StartDate) {
    var start = StartDate.split('/');
    var now = new Date();
    var DateStart = new Date(start[2], start[1] - 1, start[0]);
    var DateNow = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    var DayStart = DateStart.getTime() / 86400000;
    var DayNow = DateNow.getTime() / 86400000;
    return Math.round(DayStart - DayNow);
};

LqUtils.LoadJson = function (urlJon, callback) {
    $.getJSON(urlJon, {}, function (data) {
        if (callback) callback(data);
    });
};

LqUtils.ConvertUnit = function (nStr, command) {
    if (!nStr) nStr = "";
    command = ".";
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
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + command + '$2');
    }
    var _ref = (x1 + x2);
    return _ref == "0" ? "" : _ref;

};


/*search*/
LqUtils.UnSign = function (str) {
    if (str == undefined)
        return "";
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'| |\"|\&|\#|\[|\]|~|$|_/g, "-");
    str = str.replace(/-+-/g, "-");
    str = str.replace(/^\-+|\-+$/g, "");
    return str;
};
LqUtils.MatchingWord = function (txtSearch, txtInput, classMatch) {

    var result = '';
    txtInput = txtInput.replace(/^\s+|\s+$/g, "");
    txtSearch = txtSearch.replace(/^\s+|\s+$/g, "");

    var SeTxt = txtSearch.toLowerCase();
    var Na = LqUtils.UnSignNo(txtInput.toLowerCase().trim());
    var NaindexOf = Na.indexOf(SeTxt);

    if (NaindexOf != -1) {
        var Naindex = Na.length;
        var NaStr = txtInput;
        var SeTxtLength = SeTxt.length;
        result = NaStr.substring(Naindex - (Naindex - NaindexOf), 0) + '<span class="' + classMatch + '">' + NaStr.substring(NaindexOf, NaindexOf + SeTxtLength) + '</span>' + NaStr.substring(Naindex, NaindexOf + SeTxtLength);
    } else {
        result = txtInput;
    }
    return result;
};
LqUtils.UnSignNo = function (str) {
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'| |\"|\&|\#|\[|\]|~|$|_/g, "-");
    str = str.replace(/^\-+|\-+$/g, "");
    return str;
};
LqUtils.TrunLength = function (str, strLength, StringEnd) {
    var ref = "";
    if (str != undefined) {
        if (str.toString().length <= strLength) {
            return str.toString();
        } else {
            if (str.toString().substring(strLength - 1, strLength) == "") {

                ref = str.toString().substring(0, strLength);
            } else {
                while (strLength > 0) {
                    if (str.toString().substring(strLength - 1, strLength) == ' ') {
                        ref = str.toString().substring(0, strLength).toString();
                        break;
                    }
                    strLength--;
                }
            }
        }
    } else {
        return "";

    }
    try {
        return ref.trim() + StringEnd;
    } catch (ex) {
        return ref + StringEnd;
    }
};

LqUtils.paging = function(pagingTo, service, numBtn, type, fn, fakePageLoading) {
    if (type == undefined || fakePageLoading == "fake-page-loading") {
        $('#' + pagingTo).html("<img alt='loading-page' height='100%' src='http://lequang.vn/Content/Images/Icons/loading-page.png?7200'/>");

    } else $('#' + pagingTo).html("");
    LqUtils.DataTranfer.StartOrderIdx = 0;
    var _offsetTopLoading = $('#' + this.loadingTo).offset().top;
    if ($('#' + pagingTo).offset().top < _offsetTopLoading + (_offsetTopLoading * 20 / 100)) {
        $('#' + this.loadingTo).html('');
    }
    var _self = this;
    this.srvCount = new Servicemobi(service.srvcount, this.service.params,
        function(ret) {
            if (ret == null || ret[1] == 0) return;
            var _lqPaging = new LqPaging({
                toHTML: pagingTo,
                extclasses: (type || 'lq-table-width-big'),
                totalRec: ret[1],
                numRPP: ret[0],
                numButton: numBtn,
                pageSelected: function(i) {
                    if (_self.the2nd) {
                        if (["company-news-table", "equivalent-table", "samesector-table"].indexOf(_self.tableTo) == -1) {
                            LqUtils.showCover(undefined, undefined, { opacity: 0.1 });
                        }
                        _self.service.params.PageIndex = i;
                        _self.wait();
                        _self.srvContent.run();
                    } else _self.the2nd = true;
                }
            });
            if (fn) fn(ret[1]);

            _lqPaging.render(1, false);
        });
};

LqUtils.createCookie = function (name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    } else var expires = "";
    document.cookie = name + "=" + value + expires + "; path=/";
};

LqUtils.readCookie = function (name) {
    try {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
    } catch (ex) {
        return null;
    }
    return null;
};

LqUtils.eraseCookie = function (name) {

    LqUtils.createCookie(name, "", -1);

};

LqUtils.showCover = function (fnClicked, text, extStyles) {

    if ($('#cover-bg').size() == 0) {
        $('body').append('<div id="cover-bg" style="position: fixed;top:0;left:0;width: 100%;height: 100%;z-index:99;opacity:0.4;filter: alpha(opacity = 50);background-color: rgb(5, 4, 4);">' + text + '</div>');
        $('#cover-bg').bind('click', function () { if (fnClicked) fnClicked(); });
        if (extStyles) $('#cover-bg').css(extStyles);
        else
            $('#cover-bg').addClass("cover-show-effect");
    }
};
LqUtils.showTitle = function (title) {
    return title.replace(/"/g, "&quot;");
};
LqUtils.StandardizedNumber = function (num, length) {

    return (Array(length).join('0') + num).slice(-length);
};
LqUtils.DataTranfer = {};
LqUtils.IconLoadDeny = {

    '#lq-search-box': true,
    '#lq-box-home-news-left': true,
    '#lq-box-home-news-right': true, '#ContentDataTrading': true,
    '#content-partial-view': true,
    '#boxHomeAlbumLandProject': true, '#lq-video-content': true
};
LqUtils.IconLoadClock = function (idIconLoad, styles) {
    if (LqUtils.IconLoadDeny[idIconLoad] == true) return;
    styles = styles || "";
    $(idIconLoad).html('<img src="http://lequang.vn/Content/Images/ImageSite/loader-bert-icon.gif?7200" style="' + styles + '" />');
};
LqUtils.MatchingWordSearch = function (txtSearch, txtInput, classMatch, byHTML5) {
    txtSearch = LqUtils.UnSignNo(txtSearch.toLowerCase().trim());
    var result = '';
    txtInput = txtInput.replace(/^\s+|\s+$/g, "");
    txtSearch = txtSearch.replace(/^\s+|\s+$/g, "");

    var SeTxt = txtSearch.toLowerCase();
    var Na = LqUtils.UnSignNo(txtInput.toLowerCase().trim());
    var NaindexOf = Na.indexOf(SeTxt);

    if (NaindexOf != -1) {
        var Naindex = Na.length;
        var NaStr = txtInput;
        var SeTxtLength = SeTxt.length;
        if (byHTML5) result = NaStr.substring(Naindex - (Naindex - NaindexOf), 0) + '<mark>' + NaStr.substring(NaindexOf, NaindexOf + SeTxtLength) + '</mark>' + NaStr.substring(Naindex, NaindexOf + SeTxtLength);
        else
            result = NaStr.substring(Naindex - (Naindex - NaindexOf), 0) + '<span class="' + classMatch + '">' + NaStr.substring(NaindexOf, NaindexOf + SeTxtLength) + '</span>' + NaStr.substring(Naindex, NaindexOf + SeTxtLength);
    } else {
        result = txtInput;
    }
    return result;
};


LqUtils.getTimeServer = function (fncallbacks) {
    if (fncallbacks) {
        if (LqUtils.TimeServer) return fncallbacks(LqUtils.TimeServer);
        else {
            var srvGetTimeServer = new Servicemobi("Service/GetTimeServer", {},
                function (date) {
                    LqUtils.TimeServer = date;
                    fncallbacks(date);
                });
            srvGetTimeServer.host = "http://lequang.vn/";
            srvGetTimeServer.run();
        }
    }
};
LqUtils.getTimeServer1 = function (fncallbacks) {
    $.getJSON('http://lequang.vn/Service/GetTimeServer/', function (data) {
        LqUtils.getTimeServer1 = data;
        if (fncallbacks) fncallbacks(data);
    });
    
};
LqUtils.getTimePost = function (timePost, timeServer) {
    var hoursPost = parseInt(LqUtils.getFormatDate(timePost, 't').substring(0, 2));
    var hoursServer = parseInt(LqUtils.getFormatDate(timeServer, 't').substring(0, 2));
    if (LqUtils.getFormatDate(timePost, 'd') == LqUtils.getFormatDate(timeServer, 'd')) {
        var hours = hoursServer - hoursPost;
        if (hours > 0) return hours+"giờ";
        else {
            return (parseInt(LqUtils.getFormatDate(timeServer, 't').substring(3, 5)) - parseInt(LqUtils.getFormatDate(timePost, 't').substring(3, 5)))+"phút";
        }
    } else {
        return (hoursServer + 24 - hoursPost)+"giờ";
    }
};
/*LqUtils.getNewsId = function () {
    var temps = window.location.href;
    var newsId;
    if (temps.split("/tin-").length >= 3) {
        var arr = temps.split("/tin-");
        console.log(arr);

        for (var i = 0; i <= arr.length; i++) {
            if (arr[i].indexOf("/") != -1) {
                newsId = arr[i].substring(0, arr[i].indexOf("/"));
            }
            else newsId = arr[i];
            console.log(newsId);
            if (isNaN(newsId) == false) return newsId;
        }
    }
    else {
        newsId = temps.substring(temps.indexOf("tin-") + 5);
        if (isNaN(newsId) == false) return newsId;
    }

};*/
LqUtils.getNewsId = function () {
    var temps = window.location.href;
        var arr = temps.split("/tin-");
        console.log(arr);
    var newsId="";
    for (var i in arr) {
        if (isNaN(arr[i].split("/")[0]) == false) {
            newsId = arr[i].split("/")[0];
            console.log(newsId);
        }
    }
    return newsId;
};
AppConfigs = { };
AppConfigs.host = window.location.href.substring(0, window.location.href.indexOf('/LQprojects_debug')) + '/LQprojects_debug';
LqUtils.linkweb = "http://192.168.1.88/LQProjects_Debug/mobile/",
LqUtils.hrefGroup = {
    //"TTCK": "?thi-truong-chung-khoan/",
    "DN": "?doanh-nghiep/",
    "BDS": "?bat-dong-san/",
    "KTBDS": "?bat-dong-san/kien-thuc-bat-dong-san/",
    "KTDT": "?kinh-te-dau-tu/",
    "TCNH": "?tai-chinh-ngan-hang/",
    "TCTG": "?tai-chinh-the-gioi/",
    "HH": "?hang-hoa/",
    "TTSK": "?tin-tuc-su-kien/",
    "CN": "?tin-tuc-su-kien/cong-nghe/",
    "GT": "?tin-tuc-su-kien/giai-tri/",
    "KD": "?kinh-doanh/",
    "KTKD": "?kinh-doanh/kien-thuc-kinh-doanh/",
    "TH": "?kinh-doanh/thuong-hieu/",
    "DNN": "?doanh-nhan/",
    "PT": "?phong-thuy/",
    //"TN": "?thuat-ngu/",
    "PTDT": "?phan-tich-dau-tu/",
},
LqUtils.hrefMapping = {
        "TTCK/TTCK": "?thi-truong-chung-khoan/",
        "DN/DNNY": "?doanh-nghiep/doanh-nghiep-niem-yet/",
        "DN/DNCNY": "?doanh-nghiep/doanh-nghiep-chua-niem-yet/",
        "BDS/TTBDS": "?bat-dong-san/thi-truong-bat-dong-san/",
        "KTBDS/LDD": "?bat-dong-san/kien-thuc-bat-dong-san/luat-dat-dai/",
        "KTBDS/NNT": "?bat-dong-san/kien-thuc-bat-dong-san/noi-ngoai-that/",
        "KTBDS/KTD": "?bat-dong-san/kien-thuc-bat-dong-san/kien-truc-dep/",
        "KTDT/VM": "?kinh-te-dau-tu/vi-mo/",
        "KTDT/CN": "?kinh-te-dau-tu/cong-nghiep/",
        "KTDT/NN": "?kinh-te-dau-tu/nong-nghiep/",
        "KTDT/DV": "?kinh-te-dau-tu/dich-vu/",
        "KTDT/TMXNK": "?kinh-te-dau-tu/xuat-nhap-khau/",
        "TCNH/TTNH": "?tai-chinh-ngan-hang/tin-tuc-ngan-hang/",
        "TCNH/CSTT": "?tai-chinh-ngan-hang/chinh-sach-tien-te/",
        "TCTG/CAA": "?tai-chinh-the-gioi/chau-a/",
        "TCTG/CAU": "?tai-chinh-the-gioi/chau-au/",
        "TCTG/HK": "?tai-chinh-the-gioi/hoa-ky/",
        "TCTG/TC": "?tai-chinh-the-gioi/toan-cau/",
        "HH/NL": "?hang-hoa/nang-luong/",
        "HH/HTD": "?hang-hoa/hang-tieu-dung/",
        "HH/V_KL": "?hang-hoa/vang-kim-loai/",
        "HH/VLXD": "?hang-hoa/vat-lieu-xay-dung/",
        "HH/NTS": "?hang-hoa/nong-thuy-san/",
        "HH/TMXNK": "?hang-hoa/xuat-nhap-khau/",
        "TTSK/QP": "?tin-tuc-su-kien/quoc-phong/",
        "TTSK/SK": "?tin-tuc-su-kien/suc-khoe/",
        "TTSK/TG": "?tin-tuc-su-kien/the-gioi/",
        "TTSK/THT": "?tin-tuc-su-kien/the-thao/",
        /*"TTSK/CN": "?tin-tuc-su-kien/cong-nghe/",*/
        "TTSK/XH": "?tin-tuc-su-kien/xa-hoi/",
        "TTSK/KH": "?tin-tuc-su-kien/khoa-hoc/",
        "CN/DT": "?tin-tuc-su-kien/cong-nghe/dien-thoai/",
        "CN/MT": "?tin-tuc-su-kien/cong-nghe/may-tinh/",
        "CN/PKA": "?tin-tuc-su-kien/cong-nghe/phu-kien-am-thanh/",
        "CN/ICT": "?tin-tuc-su-kien/cong-nghe/tin-ict/",
        "GT/SAO": "?tin-tuc-su-kien/giai-tri/sao/",
        "GT/DL": "?tin-tuc-su-kien/giai-tri/du-lich/",
        "KD/MAK": "?kinh-doanh/marketing/",
        "KD/HLG": "?kinh-doanh/hoc-lam-giau/",
        "KTKD/TCKD": "?kinh-doanh/kien-thuc-kinh-doanh/tai-chinh/",
        "KTKD/KTH": "?kinh-doanh/kien-thuc-kinh-doanh/kinh-te-hoc/",
        "KTKD/QTKD": "?kinh-doanh/kien-thuc-kinh-doanh/quan-tri-kinh-doanh/",
        "KTKD/TLH": "?kinh-doanh/kien-thuc-kinh-doanh/tam-ly-hoc/",
        "KTKD/LKD": "?kinh-doanh/kien-thuc-kinh-doanh/luat-kinh-doanh/",
        "KTKD/KN": "?kinh-doanh/kien-thuc-kinh-doanh/khoi-nghiep/",
        "TH/TTTH": "?kinh-doanh/thuong-hieu/tin-tuc-thuong-hieu/",
        "TH/KTTH": "?kinh-doanh/thuong-hieu/kien-thuc-thuong-hieu/",
        "TH/THVN": "?kinh-doanh/thuong-hieu/thuong-hieu-viet-nam/",
        "TH/THTG": "?kinh-doanh/thuong-hieu/thuong-hieu-the-gioi/",
        "DNN/DNTG": "?doanh-nhan/doanh-nhan-the-gioi/",
        "DNN/DNVN": "?doanh-nhan/doanh-nhan-viet-nam/",
        "PT/VPPT": "?phong-thuy/vat-pham-phong-thuy/",
        "PT/PTCB": "?phong-thuy/phong-thuy-co-ban/",
        "PT/PTLV": "?phong-thuy/phong-thuy-lac-viet/",
        "PT/PTNO": "?phong-thuy/phong-thuy-nha-o/",
        "PT/PTVP": "?phong-thuy/phong-thuy-van-phong/",
        "PT/KTPT": "?phong-thuy/kien-truc-phong-thuy/",
        "TN/TN": "?thuat-ngu/",
        "PTDT/PPDT": "?phan-tich-dau-tu/phuong-phap-dau-tu/",
        "PTDT/PTN": "?phan-tich-dau-tu/phan-tich-nganh/",
        "PTDT/YTDT": "?phan-tich-dau-tu/y-tuong-dau-tu/",
};
LqUtils.SubSectorMapping = {
    "BDSaXDS_BDS": "Bất động sản",
    "BDSaXDS_TDDN": "Tập đoàn đa ngành",
    "BDSaXDS_XD": "Xây dựng",
    "CNaVTS_CNaTT": "Công nghệ và Truyền thông",
    "CNaVTS_PC": "Phần cứng",
    "CNaVTS_PM": "Phần mềm",
    "CNaVTS_TBVT": "Thiết bị viễn thông",
    "CNS_C": "Containers",
    "CNS_CNPH": "Công nghiệp phức hợp",
    "CNS_KBCHC": "Kho bãi ,cảng, hậu cần",
    "CNS_LX": "Săm lốp",
    "CNS_MCN": "Máy công nghiệp",
    "CNS_SXOT": "Sản xuất ô tô",
    "CNS_TBD": "Thiết bị điện",
    "DVS_BLPH": "Bán lẻ phức hợp",
    "DVS_CTaMT": "Chất thải & môi trường",
    "DVS_DTVL": "Đào tạo và việc làm",
    "DVS_DVaTM": "Dịch vụ và thương mại tổng hợp",
    "DVS_DVGT": "Dịch vụ giải trí",
    "DVS_HK": "Dịch vụ hàng không",
    "DVS_KS": "Khách sạn",
    "DVS_N": "Nước",
    "DVS_STBGD": "Sách và ấn bản , thiết bị giáo dục",
    "DVS_TBaDVDK": "Thiết bị và dịch vụ dầu khí",
    "DVS_TVaHT": "Tư vấn và hỗ trợ kinh doanh",
    "DVS_VT": "Dịch vụ vận tải",
    "DVS_VTHK": "Vận tải hành khách và du lịch",
    "DVS_VTT": "Vận tải thủy",
    "HTDS_BK": "Bánh kẹo",
    "HTDS_DTGD": "Điện tử và gia dụng",
    "HTDS_DUGK": "Đồ uống và giải khát",
    "HTDS_GD": "Giầy dép",
    "HTDS_HCN": "Hàng cá nhân",
    "HTDS_HMM": "Hàng may mặc",
    "HTDS_LSCBG": "Lâm sản và chế biến gỗ",
    "HTDS_MD": "Mía đường",
    "HTDS_SXBR": "Sản xuất bia rượu",
    "HTDS_TL": "Thuốc lá",
    "HTDS_TP": "Thực Phẩm",
    "NLS_KDXDKD": "Kinh doanh xăng dầu và khí đốt",
    "NLS_KTT": "Khai thác than",
    "NLS_NDTD": "Nhiệt điện và thủy điện",
    "NNS_CNSH": "Công nghệ sinh học",
    "NNS_HCND": "Hóa chất nông dược",
    "NNS_NTS": "Nông thủy sản",
    "NVLS_BBDG": "Bao bì đóng gói",
    "NVLS_CS": "Cao su",
    "NVLS_KK": "Khai khoáng",
    "NVLS_N": "Nhựa",
    "NVLS_SXG": "Sản xuất giấy",
    "NVLS_T": "Thép",
    "NVLS_XDNT": "Vật liệu xây dựng và nội thất",
    "TC_BH": "Bảo hiểm",
    "TCS_MGCK": "Dịch vụ tài chính",
    "TCS_NHDVTC": "Ngân hàng và dịch vụ tài chính",
    "TCS_QDT": "Quỹ đầu tư",
    "YT_DP": "Dược phẩm và thiết bị y tế"
};
LqUtils.linkLoadOrther = {
    "?bat-dong-san/san-bat-dong-san/": "ajax/land/floor-lands.htm",
    "?bat-dong-san/du-an-bat-dong-san/": "ajax/land/project-land.htm",
    "?bat-dong-san/kien-thuc-bat-dong-san/bang-gia-dat/": "ajax/financial/price-land.htm",
    "?tai-chinh-ngan-hang/ban-do-atm/": "ajax/financial/atm.htm",
    "?tai-chinh-ngan-hang/lai-suat/": "ajax/financial/interest-rate.htm",
    "?phan-tich-dau-tu/bao-cao-phan-tich/": "ajax/report-analysis.htm",
};
LqUtils.linkOrther = {
    "?bat-dong-san/san-bat-dong-san/": "BDS/SBDS",
    "?bat-dong-san/du-an-bat-dong-san/": "BDS/DABDS",
    "?bat-dong-san/kien-thuc-bat-dong-san/bang-gia-dat/": "KTBDS/BGD",
    "?tai-chinh-ngan-hang/ban-do-atm/": "TCNH/ATM",
    "?tai-chinh-ngan-hang/lai-suat/": "TCNH/LS",
    "?phan-tich-dau-tu/bao-cao-phan-tich/": "PTDT/BCPT"
};

/*user*/
LqUtils.reverseString = function (s) {
    return s.split("").reverse().join("");
};

