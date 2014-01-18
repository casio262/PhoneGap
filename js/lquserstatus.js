function addProperty(obj, name, onGet, onSet) {
    var oldValue = obj[name],
        getFn = function () {
            return onGet.apply(obj, [oldValue]);
        },
        setFn = function (newValue) {
            return oldValue = onSet.apply(obj, [newValue]);
        };
    if (Object.defineProperty) {

        Object.defineProperty(obj, name, {
            get: getFn,
            set: setFn,
            configurable: true
        });

    } else if (obj.__defineGetter__) {

        obj.__defineGetter__(name, getFn);
        obj.__defineSetter__(name, setFn);

    } else {

        var onPropertyChange = function () {

            if (event.propertyName == name) {
                obj.detachEvent("onpropertychange", onPropertyChange);
                obj[name] = getFn;
                obj[name].toString = getFn;

                obj.attachEvent("onpropertychange", onPropertyChange);
            }
        };
        obj[name] = getFn;
        obj[name].toString = getFn;

        obj.attachEvent("onpropertychange", onPropertyChange);
    }
}

LqUserStatus = {};
LqUserStatus.registerSetterGetter = function (obj, localSaved) {
    for (var i in obj) {
        (function (i) {
            try {
                var localSavedData = localSaved == "SessionStorage" ? window.sessionStorage : window.localStorage;
                window.LqUserStatus.__defineGetter__(i, function () {
                    return localSavedData.getItem(i);
                });
                window.LqUserStatus.__defineSetter__(i, function (val) {
                    try {
                        localSavedData.setItem(i, val);
                    } catch (ex) {
                        localSavedData.setItem(i, '[]');
                    }
                });
            } catch (ex) {
                addProperty(window.LqUserStatus, i, function () {
                    return localSavedData.getItem(i);
                }, function (val) {
                    localSavedData.setItem(i, val);
                });
            }
        })(i);
    }
};

// __defineSetter__, __defineGetter__ 
LqUserStatus.registerSetterGetter({ "ApiData__dataCaches": 1 }, "SessionStorage");
LqUserStatus.registerSetterGetter({ "Search__dataCompany": 1, "Search__dataProjects": 1 }, "SessionStorage");
LqUserStatus.registerSetterGetter({ "LqSearch__tagSelected": 1 });
LqUserStatus.registerSetterGetter({ "IndexOfCompanies__needSCs": 1 });
LqUserStatus.registerSetterGetter({ "NewsReader__tag": 1 });
LqUserStatus.registerSetterGetter({ "NewsReader__haveReaded": 1 });
LqUserStatus.registerSetterGetter({ "NewsOther__currentPage": 1, "NewsOther__currentDate": 1, "NewsOther__currentLocal": 1 }, "SessionStorage");
