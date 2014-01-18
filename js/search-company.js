SearchCompany = {};
SearchCompany.Properties = {};
SearchCompany.Properties.VT = "tq";
SearchCompany.Properties.MCK = "";
SearchCompany.Properties.MDA = "";
SearchCompany.Properties.MTT = "";

SearchCompany.files = {
    company: 'http://lequang.vn/content/temps/ComapanyJsonStore.json'
};

SearchCompany.dataCache = {
    company: LqUserStatus.Search__dataCompany == null ? undefined : JSON.parse(LqUserStatus.Search__dataCompany)
};

SearchCompany.loadActive = function (fn) {
    var arrJson = [];
    var tagSelected = LqUserStatus.LqSearch__tagSelected;
    SearchCompany.searchInput.val("").setOptions({
        data: arrJson
    }).focus();
    this.selected = 'company';
    if (!SearchCompany.dataCache.company) {
        LqUtils.LoadJson(SearchCompany.files.company, function (data) {
            SearchCompany.dataCache["company"] = data;
            LqUserStatus.Search__dataCompany = JSON.stringify(SearchCompany.dataCache["company"]);
            SearchCompany.SetDataSearch('#search-company', LqUserStatus.Search__dataCompany);
        });
    } else
        SearchCompany.SetDataSearch('#search-company', SearchCompany.dataCache.company);
    if (fn) fn();

};

SearchCompany.goTo = function () {
    if (SearchCompany.searchInput.val() == "") return;
    else {
        console.log(SearchCompany.searchInput.val().split("-")[0]);
        console.log(SearchCompany.searchInput.val().split("-")[1]);
        if (CompanyMobi.CheckCodeCompanyExist(SearchCompany.searchInput.val().split("-")[0].toUpperCase()) == false) return;
        else if (CompanyMobi.CheckCodeCompanyExist(SearchCompany.searchInput.val().split("-")[0].toUpperCase()) == true) {
            CompanyMobi.params["stockCode"] = SearchCompany.searchInput.val().split("-")[0].toUpperCase();
            window.location.href = LqUtils.linkweb + "?du-lieu/cong-ty/tq-" + CompanyMobi.params["stockCode"] + "/";
            //$("#body").load('ajax/company/index.htm', function () { });
        }
    }
};

SearchCompany.setupEvent = function () {
    SearchCompany.searchInput = $("#search-company");
    SearchCompany.searchInput.on('keyup', function (e) {
        if (e.which == 13) {
            SearchCompany.goTo();
        } else if (e.which == 46) $(this).val("");
    });
    SearchCompany.searchInput.on('click', function (e) {
        $(this).val("");
    });


    function resulfSeach(event, data, formatted) {
        switch (SearchCompany.selected) {
            case 'company':
                _key = "MCK";
                LqPublic.Properties[_key] = formatted.split('-')[0];
                break;
        }
    }
    $(":text, textarea").result(resulfSeach).next().click(function () {
        $(this).prev().search();
    });

    setTimeout(function () {
        console.log(SearchCompany.Properties);
        SearchCompany.searchInput.val(SearchCompany.Properties.MCK);
    }, 100);
};

SearchCompany.regEvent = function (events) {
    this.listRegEvents = [];
    for (var i in events) {
        this.listRegEvents.push(events[i]);
    }
};


AutoInjectedLink = function (_InjectedTo) {
    var _a, _sk;
    var _as = $(_InjectedTo).find('a');
    var _end = _as.length;
    var _start = 0;
    for (var i = 0; i <= _as.length; i++) {
        _a = $(_as[i]);
        if (_start == _end) return;
        _start++;
        if (_a.attr('href') && _a.attr('href').indexOf("link-company") != -1) {
            _sk = _a.html();
            var _name = FindNameByCode(_sk);
            _a.attr('href', AppConfigs.host + "/du-lieu/cong-ty/" + 'tq' + '-' + _sk.toLowerCase() + "/" + LqUtils.UnSign(_name) + '.csvh').attr('title', _name);
        }
    }
};

FindNameByCode = function (code) {
    var select = SearchCompany.selected;
    if (select == 'company') {
        for (var i = 0, len = SearchCompany.dataCache["company"].length; i < len; i++) {
            if (SearchCompany.dataCache["company"][i]["C"] == code) {
                return SearchCompany.dataCache["company"][i]["N"];
            }
        }
    } else if (select == 'news') {

    }
    return "Không có thông tin...";
};

FindCodeById = function (id, fn) {
    if (SearchCompany.dataCache["company"]) {
        var result = "";
        for (var i = 0, len = SearchCompany.dataCache["company"].length; i < len; i++) {
            if (SearchCompany.dataCache["company"][i]["I"] == id) {
                result = SearchCompany.dataCache["company"][i]["C"];
                if (fn) fn(result);
                return result;
            }
        }
    }
    return "UNDEFINE";
};

FindTradingFloorByCode = function (code, fn) {

    if (code == undefined) return "UNDEFINE";
    var _pairTrading = "";
    _tryTw = 0;
    var _tryPair = setInterval(function () {
        if (SearchCompany.dataCache["company"]) {
            for (var i = 0, len = SearchCompany.dataCache["company"].length; i < len; i++) {
                if (SearchCompany.dataCache["company"][i]["C"] == code) {
                    _pairTrading = SearchCompany.dataCache["company"][i]["E"];
                }
            }
        }
        _tryTw++;
        if (_pairTrading != "") {
            clearInterval(_tryPair);
            if (fn) fn(_pairTrading);
            return _pairTrading;
        } else if (_tryTw > 9) {
            clearInterval(_tryPair);
            return "UNDEFINE";
        }
    }, 120);
};

FindQuickTradingFloorByCode = function (code) {

    var _pairTrading = "UNDEFINE";
    if (SearchCompany.dataCache["company"] && code != undefined) {
        for (var i = 0, len = SearchCompany.dataCache["company"].length; i < len; i++) {
            if (SearchCompany.dataCache["company"][i]["C"] == code) {
                _pairTrading = SearchCompany.dataCache["company"][i]["E"];
            }
        }
    }
    return _pairTrading;
};

var accentMap = {
    "á": "a",
    "ö": "o"
};
var normalize = function (term) {
    var ret = "";
    for (var i = 0; i < term.length; i++) {
        ret += accentMap[term.charAt(i)] || term.charAt(i);
    }
    return ret;
};
SearchCompany.SetDataSearch = function (IdHtmlSearch, arr) {
    $(IdHtmlSearch).autocomplete(arr, {
        width: 150,
        minlength:2,
        max: 5,
        source: function (request, response) {
            var matcher = new RegExp($.ui.autocomplete.escapeRegex(request.term), "i");
            response($.grep(arr, function (value) {
                value = value.label || value.value || value;
                console.log(matcher.test(normalize(value)));
                return matcher.test(value) || matcher.test(normalize(value));
            }));
        },
        select: function (event, ui) {

        },
        focus: function () {
            return false;
        },
        formatItem: function (row, i, max) {
            if (row.C == undefined) return row.N;
            else {
                return row.C + '-' + row.N;
            }
        },
        formatMatch: function (row, i, max) {
            return row.C + '-' + LqUtils.UnSign(row.N);
        },
        formatResult: function (row) {
            if (row.C == undefined) return row.N;
            else {
                return row.C + '-' + row.N;
            }
        }
        
    });
};
