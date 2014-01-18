Servicemobi = Class.extend({
    /*getApi: function(api, params, fn) {
        if (params)
            $.getJSON(api + "?" + $.param(params), function(data) { if (fn) fn(data); });
        else {
            $.getJSON(api, function(data) { if (fn) fn(data); });
        }
    },
    postUrl: function(url, data, fn) {
        $.ajax({
            type: 'POST',
            url: url,
            data: data,
            dataType: "json",
            traditional: true,
            success: function(ref) {
                //this.onSuccess(ref);
                if (fn)
                    fn(ref);
            },
            failure: function() {
                //this.onFailure.call(undefined);
                console.log("not successfull");
            }
        });
    },
    putUrl: function(data, fn) {
        $.ajax({
            type: 'PUT',
            data: data,
            dataType: "json",
            success: function(ref) {
                this.onSuccess(ref);
            },
            failure: function() {
                this.onFailure.call(undefined);
            }
        });
        if (fn) fn(data);
    },

    oppParams: function(params) {
        var str = "?";
        if (params) {
            for (var i in params) {
                str += i + "=" + params[i] + "&";
            }
        } else {
            str = "";
        }
        console.log('string:' + str);
        return str;
    },*/

    init: function(endpoint, params, onSuccess) {
        this.endpoint = endpoint;
        this.params = params;
        this.onSuccess = onSuccess;
        this.onFailure = function() {
        };
        this.cross_domain = true;
        this.host = "http://lequang.vn/api/";
        //this.host = "http://192.168.1.88/LQProjects_Debug/";
    },

    run: function(_runat, params, options, fn) {
        if (_runat == 'server') {
            //this.host = "http://lequang.vn/Api/";
        }
        
        if (fn) {
            console.log("fn");
            this.cross_domain == true ? this.runJSONP(params, options) : this.runAjax(params, options, fn);
            fn();
        }
        else {
            this.cross_domain == true ? this.runJSONP(params, options) : this.runAjax(params, options);
        }
    },

    requestMethod: function(data, params, type) {
        var _data, _url;
        if (data) _data = data;
        if (params) {
            var paramStr = "";
            for (var i in params) paramStr += i + "=" + params[i] + "&";
            _url = this.host + this.endpoint + "?" + paramStr;
        } else {
            _url = this.host + this.endpoint;
        }
        console.log(type);
        var _self = this;
        $.ajax({
            type: type,
            url: _url,
            data: _data || { },
            dataType: "json",
            traditional: true,
            success: function(ref) {
                _self.onSuccess(ref);
            },
            failure: function() {
                _self.onFailure.call(undefined);
            }
        });
    },

    put: function(data) {
        this.requestMethod(data, undefined, "PUT");
    },

    post: function(data) {
        this.requestMethod(data, undefined, "POST");
    },

    remove: function(params) {
        this.requestMethod(undefined, params, "DELETE");
    },

    runAjax: function(fn) {
        //if (fn) fn();
    },

    // {cached: memory} ? {cached: localstorage, time: 10}
    runJSONP: function(params, options) {
        if (params) this.params = params;
        for (var i in this.params) {
            if (this.params[i] == undefined) {
                console.log('check again url:', this.host + ':' + this.endpoint, '- param:', this.params);
                return;
            }
        }
        var paramStr = "";
        for (var i in this.params) {
            paramStr += i.toLocaleLowerCase() + "=" + this.params[i] + "&";
        }
        paramStr = paramStr == "" ? "" : "?" + paramStr;
        var _self = this;
        var _url = this.host.toLocaleLowerCase() + this.endpoint.toLocaleLowerCase() + paramStr;
        if (options) {
            if (options.cached == 'memory') {
                if (LQServiceCache.api[_url] == 1) {
                    for (var i = 0, len = LQServiceCache.DataMemory.length; i < len; i++) {
                        if (LQServiceCache.DataMemory[i]['_url'] == _url) {
                            console.log('get from memory cached');
                            _self.onSuccess(LQServiceCache.DataMemory[i]['_data']);
                            return;
                        }
                    }
                }
            } else if (options.cached == 'localstorage') {
                LQServiceCache.DataLocalStorage.init(function() {
                });

                for (var i = 0, len = LQServiceCache.DataLocalStorage.pop().length; i < len; i++) {
                    if (LQServiceCache.DataLocalStorage.pop()[i]['_url'] == _url) {
                        console.log('get from LocalStorage cached');
                        _self.onSuccess(LQServiceCache.DataLocalStorage.pop()[i]['_data']);
                        return;
                    }
                }
            }
        }
        /*console.log('debug:', _url);
        $.getJSON(_url, function (data) { if (_self.onSuccess) _self.onSuccess(data); });
        return;*/
        
        $.ajax({
            type: 'GET',
            url: _url,
            beforeSend: function(xhr) {

            },
            /*contentType: "application/json; charset=utf-8",*/
            data: { },
            statusCode: {
                403: function() {

                },
                404: function() {

                },
                500: function() {

                },
                200: function(ref) {
                    if (_self.onSuccess != undefined) {
                        if (options) {
                            if (options.cached == 'memory') {
                                LQServiceCache.api[_url] = 1;
                                LQServiceCache.DataMemory.push({
                                    _url: _url,
                                    _data: ref
                                });
                            } else if (options.cached == 'localstorage') {
                                var _time = options.time || 3600;
                                LQServiceCache.DataLocalStorage.push({
                                    _url: _url,
                                    _data: ref,
                                    expired: (new Date().valueOf() + (_time * 1000))
                                }, 'asyn');
                            }
                        }
                        /**/
                        _self.onSuccess(ref);
                    }
                },
            },
            error: function() {
                if (_self.onFailure != undefined) {
                    _self.onFailure.call(undefined);
                }
            }
        });
    }
});


LQServiceCache = {};
LQServiceCache.api = {};
LQServiceCache.DataMemory = [];
LQServiceCache.DataLocalStorage = {};
LQServiceCache.DataLocalStorage.init = function (fn) {
    if (!LQServiceCache.DataLocalStorage.data) {
        var _data = LqUserStatus.ApiData__dataCaches;
        if (_data == 'null' || _data == null) _data = "[]";
        LQServiceCache.DataLocalStorage.data = JSON.parse(_data);
    }
    // clear data Expired:
    for (var i in LQServiceCache.DataLocalStorage.data) {
        if (LQServiceCache.DataLocalStorage.data[i]['expired'] < new Date().valueOf()) {
            LQServiceCache.DataLocalStorage.data.splice(i, 1);
        }
    }
    if (fn) fn();
};

LQServiceCache.DataLocalStorage.Asyn = function () {
    // LqUserStatus.ApiData__dataCaches = JSON.stringify(LQServiceCache.DataLocalStorage.data);
};

LQServiceCache.DataLocalStorage.pop = function () {
    return LQServiceCache.DataLocalStorage.data;
};

LQServiceCache.DataLocalStorage.push = function (val, asyn) {
    LQServiceCache.DataLocalStorage.init(function () {
        LQServiceCache.DataLocalStorage.data.push(val);
        if (asyn) LQServiceCache.DataLocalStorage.Asyn();
    });
};
