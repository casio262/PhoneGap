UserMobi = {
    GetAccountBalance: function (tradingAppId, fncallbacks) {
        console.log(UserMobi.credits.AuthenticationToken, UserMobi.AccountBalance___inf);
        
        if (UserMobi.AccountBalance___inf) {
            if (fncallbacks) fncallbacks(UserMobi.AccountBalance___inf);
        } else {
            var srvCertified = new Servicemobi('LQUsersTrading/GetAccountBalance', { tradingappid: tradingAppId, certificationcodes: UserMobi.credits.AuthenticationToken }, function (ret) {
                console.log(ret);
                UserMobi.AccountBalance___inf = ret;
                if (fncallbacks) fncallbacks(ret);
            });
            srvCertified.run();
            /*UserMobi.srvCertified("LQUsersTrading/GetAccountBalance", "get", {
            /*Servicemobi.run('http://lequang.vn/api/lquserstrading/getaccountbalance', {#1#
                TradingAppId: tradingAppId,
                /*certificationcodes: UserMobi.credits.AuthenticationToken#1#
                },
                function (ret) {
                UserMobi.AccountBalance___inf = ret;
                if (fncallbacks) fncallbacks(ret);
            });*/
        }
    },
    CheckAccountBalance: function (tradingAppId, cashNeed, fnEnough, fnLack) {
        UserMobi.GetAccountBalance(tradingAppId, function (a) {
            if (cashNeed <= a[2]) fnEnough();
            else fnLack(a[2]);
        });
    },
    login : {},
    CheckFieldExits: function (field, value, fn) {
        var getisavailable = new Servicemobi('lqusers/getisavailable', { field: field, value: value }, function (data) {
            
            if (fn) fn(data);
        });

        getisavailable.run();
    },
    ValidateForm: function () {
        var formCheck = $("#form_registers");
        UserMobi.validator = formCheck.validate({
            rules: {
                userName: {
                    required: true,
                    min: 1
                },
                password: {
                    require: true,
                    min: 1
                },
                rePassword: {
                    required: true,
                    equalTo: "#password",
                    min: 1
                },
                mail: {
                    required: true,
                    email: true
                },
                phone: {
                    number: true,
                    min: 1,
                },
                fullName: {
                    min: 1,
                },
                captch: {
                    required: true,
                    number: true
                }

            }
        });
    },
    credits : {
        UserId: null,
        UserName: null,
        Password: null,
        AuthenticationToken: null,
        KeepLogin: null
    },
    processQueue : [],
    initializing: function () {
        UserMobi.credits = {
            UserId: null,
            UserName: null,
            Password: null,
            AuthenticationToken: null,
            KeepLogin: null
        };
        UserMobi.valuesRandom = 9;
        for (var _i in UserMobi.credits) {
            UserMobi.credits[_i] = LqUtils.readCookie(_i);
        }
        UserMobi.btnLogin = $('#login');
        UserMobi.btnLogin.text = "Đăng nhập";
        if (UserMobi.credits.AuthenticationToken != null) {
            UserMobi.btnLogin.text = "" + UserMobi.credits.UserName + "<span id='lq-profiles-userss-by' class='lq-menu-button'>▼</span>";
        }
        UserMobi.btnLogin.html(UserMobi.btnLogin.text).css("visibility", "visible");
        UserMobi.init();
        for (var _ij in UserMobi.processQueue) UserMobi.processQueue[_ij]();
    },
    init: function () {
        if (UserMobi.credits.AuthenticationToken != null) {
            UserMobi.loginAuto();
            UserMobi.loginActionSuccess("Skip-render-welcome");
        }
        if (UserMobi.credits.Password != null && UserMobi.credits.Password.length == 40) {
            UserMobi.TransformId = UserMobi.valuesRandom;
            /*var srvUserTransformed = new LQService("http://lequang.vn/api/LQUsers/GetTransformed", {
                TransformId: UserMobi.TransformId
            },
                function (ref) {
                    eval(ref);
                    UserMobi.credits.Password = UserMobi.credits.Password.transformed();
                });*/
            //srvUserTransformed.run();
        }
        UserMobi.btnLogin.bind('click', function () {
            if (UserMobi.credits.AuthenticationToken != null) UserMobi.changesStates("profiles");
            else UserMobi.changesStates("login");
        });

    },
    loginActionSuccess : function (skipRenderWelcome) {

        if (!skipRenderWelcome)
            UserMobi.btnLogin.html("" + Users.credits.UserName + "<span id='lq-profiles-userss-by' class='lq-menu-button'>▼</span>");

        if (Users.navigatorProfiles == undefined) {
            UserMobi.btnLogin.bind('mousemove', function () {
                UserMobi.iframe__loaded = function () {
                    UserMobi.srvCertified("LQUsers/GetUserProfile", "get", {
                        Field: 'Avatar'
                    },
                        function (data) {
                            $('iframe').contents().find('#user-avatar').attr("src", data.Avatar);
                        });
                    UserMobi.srvCertified("LQUsersMessages/GetMessagesNotify", "get", {},
                        function (ret) {
                            var _subTitle = ret == 0 ? "" : "<span style='color:red;font-size: 10px;position: absolute;padding-left: 4px;'>(" + ret + ")</span>";
                            $('iframe').contents().find('#btn-notify').html("Hộp tin nhắn " + _subTitle)
                                .bind("click", function () {
                                    LqPublic.keepRedirect("profile-page", "$('[rel=private-message]').trigger('click')");
                                    window.location.href = LqUtils.linkweb + "?trang-ca-nhan/";
                                });
                        });
                };
                $('<div class="tooltip-profile-user" style="display:none" >' + "<iframe onload='Users.iframe__loaded();' src='" + AppConfigs.host + "/LqIframe/profileUsers/index.html' width='190px' height='156px' frameborder='0' scrolling='0'></iframe>" + '</div>').appendTo('body');
                UserMobi.navigatorProfiles = $('div.tooltip-profile-user');
                UserMobi.navigatorProfiles.hover(function () { }, function () {
                    $(this).hide();
                });
                $('#lq-profiles-userss-by').bind('click', function (e) {
                    e.stopPropagation();
                    Users.navigatorProfiles.css({
                        'display': 'block'
                    });
                });
                UserMobi.btnLogin.unbind('mousemove');
            });
            UserMobi.navigatorProfiles = '___bind-success___';
        }
        if (UserMobi.fnLoginNext) UserMobi.fnLoginNext();
    },
    changesStates : function (states, positions) {
        Users.position = positions || {};
        if (states == "login" && Users.credits.AuthenticationToken != null) return;
        LqUtils.getCSS("http://lequang.vn/Content/Css/LqBusiness/LqUsers.css");
        switch (states) {
            case "login":
            case "changepass":
                LQUIs.checkObjectExists(window.LqPupop, function () {
                    states == "login" ? Users.login.render() : Users.changePass.render();
                }, function () {
                    LqUtils.getScript('http://lequang.vn/Scripts/LqFrameWorkScripts/LqPupop.js', function () {
                        states == "login" ? Users.login.render() : Users.changePass.render();
                    });
                });
                break;
            case "logout":
                UserMobi.btnLogin.html("Đang thoát...");
                UserMobi.getOnlyToken = "__reject-user-id__";
                UserMobi.srvCertified("LQUsers/GetLogout", "get", {},
                    function () {
                        LqUtils.eraseCookie("AuthenticationToken");
                        delete Users.credits.AuthenticationToken;
                        setTimeout(function () {
                            UserMobi.btnLogin.html("Đăng nhập");
                            UserMobi.btnLogin.unbind('click');
                            UserMobi.btnLogin.bind("click", function () {
                                UserMobi.changesStates('login');
                            });
                            UserMobi.navigatorProfiles.remove();
                            UserMobi.navigatorProfiles = undefined;
                            UserMobi.resetTempsValue(); {
                                if ($("[rel=exit-profile-page]").size() == 1) $("[rel=exit-profile-page]").trigger("click");
                                if ($("#lq-popup-close").size() == 1) $("#lq-popup-close").trigger("click");
                            }
                        }, 120);
                    });
                break;
            case "profiles":
                window.location.href = LqUtils.linkweb + "/trang-ca-nhan/";
                break;
        }
        if (states != "login") Users.navigatorProfiles.hide();
    },

    checkLogin: function (fnLogged, fnNeverLogin) {
        var _waitCredits = setInterval(function () {
            if (UserMobi.credits) {
                clearInterval(_waitCredits);
                if (UserMobi.credits.AuthenticationToken != null) {
                    if (fnLogged) fnLogged();
                } else {
                    if (fnNeverLogin) fnNeverLogin();

                }
            }
        }, 120);
    },
    checkComplete: function (fnComplete, fnInComplete) {

        for (var _i in UserMobi.needFieldComplete) {
            if (UserMobi.needFieldComplete[_i] == false) {
                if (fnInComplete) fnInComplete();
                return;
            }
        }
        if (fnComplete) fnComplete();
    },
    getUserProfile: function (fncallbacks) {
        if (LqUtils.DataTranfer.modeViewModify == true) {
            if (fncallbacks) fncallbacks();
        } else {
            var srvGetUsers = new Servicemobi('LQUsers/GetUserProfile', { Field: 'FullName,Email,PhoneNumber,Address', certificationcodes: UserMobi.credits.AuthenticationToken }, function (data) {
                console.log(data);
                $("#view_seller_name_id_ads").val(data.FullName);
                $("#view_email_address_ads").val(data.Email);
                $("#view_number_phone_id_ads").val(data.PhoneNumber);
                $("#view_seller_address_id_ads").val(data.Address);
                if (fncallbacks) fncallbacks();
            });
            srvGetUsers.run();
            /*UserMobi.srvCertified("LQUsers/GetUserProfile", "get", { Field: 'FullName,Email,PhoneNumber,Address' },
                function(data) {
                    $("#view_seller_name_id_ads").val(data.FullName);
                    /*$("#view_email_address_ads").val(data.Email).prop('disabled', true);#1#
                    $("#view_email_address_ads").val(data.Email);
                    $("#view_number_phone_id_ads").val(data.PhoneNumber);
                    $("#view_seller_address_id_ads").val(data.Address);
                    if (fncallbacks) fncallbacks();
                });*/
        }
    },
    loginAuto: function () {

        var fnExec = function () {
            UserMobi.srvCertified("api/LQUsers/GetLoginAuto", "get", {}, function (ret) {
                if (ret != null && ret != "00000000-0000-0000-0000-000000000000") {
                    delete UserMobi.credits.AuthenticationToken;
                    UserMobi.credits.AuthenticationToken = ret;
                    UserMobi.createCookie("AuthenticationToken", UserMobi.credits.AuthenticationToken, 30);
                }
            });
        };
        if (LqUtils.getLocaltion().indexOf("ma-uy-quyen") != -1) {
            return;
        } else if (LqUtils.getLocaltion().indexOf("trang-ca-nhan") != -1 || LqUtils.getLocaltion().indexOf('preview') != -1) {
            setTimeout(function () {
                UserMobi.waitRefreshToken = fnExec();
            }, 1200);
        } else fnExec();
    },
    createCookie: function (name, value, days) {
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            var expires = "; expires=" + date.toGMTString();
        } else var expires = "";
        document.cookie = name + "=" + value + expires + "; path=/";
    },
    eraseCookie : function (name) {
        UserMobi.createCookie(name, "", -1);
    },


    setFieldNotify: function (_for, invaild, _notify) {
        var _idFor = "#" + _for;
        if (invaild == true) $(_idFor).removeClass('valid').addClass('error');
        else
            $(_idFor).removeClass('error').addClass('vaild');

        $(_idFor + '_notify').attr('title', (invaild == false ? "Giá trị hợp lệ" : _notify));
        $(_idFor + '_notify').attr('src', UserMobi.imgNotify(invaild == false ? 'vaild' : 'error'));
    },

    getCertificationCodes: function () {
        if (UserMobi.getOnlyToken) {
            delete UserMobi.getOnlyToken;
            return UserMobi.credits.AuthenticationToken;
        }
        return UserMobi.credits.AuthenticationToken + UserMobi.credits.UserId; // Users.credits.AuthenticationToken;
    },

    srvCertified: function (srvUrl, method, data, fnSuccess) {
        var _data = data;
        _data["CertificationCodes"] = UserMobi.credits.AuthenticationToken;
        console.log(UserMobi.credits.AuthenticationToken);
        //console.log(LqUtils.readCookie("AuthenticationToken"));
        
        var srvBase = new Servicemobi(srvUrl, data,
            function (refNos) {
                if (refNos == null) {
                    alert("Tài khoản của bạn đã bị đăng nhập trên máy khác, bạn ấn F5 để chứng thực lại phiên đăng nhập!");
                    return;
                }
                if (fnSuccess) {
                    fnSuccess(refNos);
                    if (UserMobi.waitRefreshToken) {
                        UserMobi.waitRefreshToken();
                        delete UserMobi.waitRefreshToken;
                    }
                }
            });
        switch (method) {
            case "post":
                srvBase.post(data);
                break;
            case "get":
                srvBase.run();
                break;
            case "put":
                srvBase.put(data);
                break;
            case "delete":
                srvBase.remove(data);
        }
        if (srvUrl.indexOf("Recharge") != -1 || srvUrl.indexOf("Payment") != -1) UserMobi.resetTempsValue();
    },
    needFieldComplete : {},
    setNotify: function (_for, invaild, _notify, _afterComplete) {

        var _idFor = "#" + _for;
        if (invaild == true) {
            $(_idFor).removeClass('valid').addClass('error');
        } else {
            $(_idFor).removeClass('error').addClass('vaild');
        }
        $(_idFor + '_notify').attr('title', (invaild == false ? "Giá trị hợp lệ" : _notify));
        $(_idFor + '_notify').attr('src', UserMobi.imgNotify(invaild == false ? 'vaild' : 'error'));

        if (!_afterComplete) UserMobi.needFieldComplete[_for] = (invaild == false);
        if (_for == "username_registers") {

            UserMobi.isAvailable("UserName", $(_idFor).val(), function() {
                $(_idFor + '_notify').attr('title', "Tên đăng nhập này đã được sử dụng, bạn đổi tên khác...");
            }, _for);

        } else if (_for == "email_registers") {

            UserMobi.isAvailable("Email", $(_idFor).val(), function() {
                $(_idFor + '_notify').attr('title', "Địa chỉ mail đã được sử dụng, bạn nhập địa chỉ mail khác...");
            }, _for);

        } else if (_for == "username_recharge" || _for == "recipientsname_compose") {
            UserMobi.isAvailable("UserName", $(_idFor).val(), function() {
                $(_idFor).removeClass('error').addClass('vaild');
                $(_idFor + '_notify').attr('title', "Tài khoản đã được xác nhận!");
                $(_idFor + '_notify').attr('src', UserMobi.imgNotify('vaild'));
                UserMobi.needFieldComplete[_for] = true;

            }, _for, function() {

                $(_idFor).removeClass('valid').addClass('error');
                $(_idFor + '_notify').attr('title', "Không thể xác nhận tài vừa nhập, bạn kiểm tra lại!");
                $(_idFor + '_notify').attr('src', UserMobi.imgNotify('error'));
                UserMobi.needFieldComplete[_for] = false;
            });
        }
    },
    imgNotify : function (types) {
        var _relativeUrl = "";
        switch (types) {
            case "error":
                _relativeUrl = "http://lequang.vn/Content/Images/Icons/error.png";
                break;
            case "vaild":
                _relativeUrl = "http://lequang.vn/Content/Images/Icons/clean.png";
                break;
            case "notify":
                _relativeUrl = "http://lequang.vn/Content/Images/Icons/infor-more.png";
                break;
        }
        return  _relativeUrl;
    },
    vaildRequires : function (_eles, fn) {
        var isvaild = true;
        for (var i in _eles) {
            if (_eles[i].val() == "") {
                _eles[i].addClass('error');
                isvaild = false;
            } else _eles[i].removeClass('error');
        }
        if (isvaild == true)
            if (fn) fn();
    },
    isAvailable : function (Field, Value, fnTrue, _for, fnFalse) {

        var srvUserRegs = new Servicemobi("LQUsers/GetIsAvailable", {
            Field: Field,
            Value: Value
        },
            function (ref) {
                if (ref == true) {
                    $('#' + _for + '_notify').attr('src', UserMobi.imgNotify('error'));
                    UserMobi.needFieldComplete[_for] = false;
                    if (fnTrue) fnTrue();
                } else {
                    if (fnFalse) fnFalse();
                }
            });
        srvUserRegs.run();

    },
    resetTempsValue : function () {

        delete UserMobi.AccountBalance___inf;
    },
    getInformationUser: function (certification, fn) {
        var srvInformationUsers = new Servicemobi('LQUsers/GetUserProfile', {Field: 'Avatar, FullName, Birthday, Gender, Email, PhoneNumber, Address ', CertificationCodes: certification }, function (data) {

            if (fn) fn(data);
        });
        srvInformationUsers.run();
    },
    getMessageInbox: function (idRender, type, certifiCationCodes, page, fn) {
        var html = '<table id="tb-inbox" class="tb-team"><thead><tr><td width="22px;"><input type="checkbox" id="all-message-id"/><td>Người gửi</td><td>Tiêu đề</td><td>Thời gian</td></td></tr></thead><tbody>';
        if (type == 'Sender') {
            html = '<table id="tb-inbox" class="tb-team"><thead><tr><td width="22px;"><input type="checkbox" id="all-message-id"/><td>Người nhận</td><td>Tiêu đề</td><td>Thời gian</td></td></tr></thead><tbody>';
        }
        var srvInbox = new Servicemobi('lqusersmessages/getmessagesview', { messagestype: type, certificationcodes: certifiCationCodes , pageindex:page}, function (data) {
            for (var i in data) {
                if (data[i].MessagesStatus == "sent")
                    html += '<tr style="font-weight:bold;"><td><input type="checkbox" id="message-' + data[i].MessagesId + '" class="choice-message-id" value="' + data[i].MessagesId + '"></input></td><td>' + data[i].MessagesObject + '</td><td onclick=' + "'" + 'Messages.ViewMessage("' + data[i].MessagesObject + '", "' + type + '", "' + data[i].MessagesId + '", "' + data[i].MessagesTitle + '")' + "'" + ';>' + data[i].MessagesTitle + '</td><td>' + LqUtils.getFormatDate(data[i].SendDatetime, 'd') + '</td></tr>';
                else {
                    html += '<tr><td><input type="checkbox" id="message-' + data[i].MessagesId + '" class="choice-message-id" value="' + data[i].MessagesId + '"></input></td><td>' + data[i].MessagesObject + '</td><td onclick=' + "'" + 'Messages.ViewMessage("' + data[i].MessagesObject + '","' + type + '", "' + data[i].MessagesId + '", "' + data[i].MessagesTitle + '");' + "'" + '>' + data[i].MessagesTitle + '</td><td>' + LqUtils.getFormatDate(data[i].SendDatetime, 'd') + '</td></tr>';
                }
            }
            html += '</tbody></table>';
            $("#" + idRender).html(html);
            if (fn) fn();
        });
        srvInbox.run();
    },
    getMessageById:function (messageId, certification, fn) {
        var srvMessageId = new Servicemobi('lqusersmessages/getmessagesdetails', { messagesid: messageId, certificationcodes: certification }, function (data) {
        //$.getJSON('http://192.168.1.88/lqprojects_debug/api/lqusersmessages/getmessagesdetails' + "?" + $.param({ messagesid: messageId, certificationcodes: certification }), function (data) {
            if (fn) fn(data);
        });
        srvMessageId.run();
    },
    getTradingClassified: function (idRender, type, certification, page, fn) {
        var html = '<table class="lq-stock-table-overview tb-team"><thead><tr><th>STT</th><th>Tiêu đề</th><th width="80px">Loại tin</th><th width="55px";>Ngày đăng</th></tr></thead><tbody>';
        
        var srvTradingClassified = new Servicemobi('lquserstradingclassifiedads/gettradingclassifiedadsview', { typeclassifiedid: type, certificationcodes: certification, pageindex: page }, function (data) {
            for (var i = 0; i < data.length; i++) {
                html += '<tr><td>' + (page * 15 + i - 14) + '</td><td >' + data[i].Title + '</td><td>' + data[i].TypeClassified + ' <i>(Phí:' + LqUtils.FormatNumber(data[i].Amount) + 'VND)</i></td><td>' + LqUtils.getFormatDate(data[i].TradingDateTime, 'd').substring(0, 5) + '</td></tr>';
            }
            html += '<tbody></table>';
            $("#" + idRender).html(html);
            if (fn) fn();
        });
        srvTradingClassified.run();
    },
    countTradingClassified:function (idRender, type, certification, fn) {
        var srvCountTrading = new Servicemobi('lquserstradingclassifiedads/gettradingclassifiedadscount', { typeclassifiedid: type, certificationcodes: certification }, function (ret) {
            var paging = new LqPaging({
                toHTML: 'paging-trading-ads',
                extclasses: 'lq-table-width-small',
                totalRec: ret[1],
                numRPP: ret[0],
                numButton: 4,
                pageSelected: function (i) {
                    UserMobi.getTradingClassified(idRender, type, certification, (i || 1), function () { });
                }
            });
            paging.render(1, false);
            if (fn) fn();
        });
        srvCountTrading.run();
    },
    getAccountBanlance: function (idRender, tradingappid, certificationcodes, fn) {
        var html = '';
        var srvBanlance = new Servicemobi('lquserstrading/getaccountbalance', { tradingappid: tradingappid, certificationcodes: certificationcodes }, function (data) {
            html += 'Tổng tiền nạp : <span style="color: blue">' + LqUtils.FormatNumber(data[0]) + '</span>, Thanh toán: <span style="color: red">' + LqUtils.FormatNumber(data[1]) + '</span>, Còn lại: <span style="color: #f60">' + LqUtils.FormatNumber(data[2]) + '</span> <span style="font-size: 9px;font-style: italic;">(Đơn vị VNĐ) </span>';
            $("#" + idRender).html(html);
            if (fn) fn();
        });
        
        srvBanlance.run();
    },
    getAccountTrading:function (idRender, appId, type, certification, page, fn) {
        var html = '<table class="lq-stock-table-overview tb-team"><thead><tr><th width="20px">STT</th><th style="width: 78px">Số tiền</th><th width="80px">Thời điểm</th><th width="132px">Ghi chú</th></tr></thead><tbody>';
        var srvAccountTrading = new Servicemobi('lquserstrading/gettradingview', { tradingappid: appId, tradingformid: type, certificationcodes: certification, pageindex: page }, function (data) {
            for (var i = 0; i < data.length; i++) {
                html += '<tr><td>' + (page * 15 + i - 14) + '</td><td>' + LqUtils.FormatNumber(data[i].Amount) + '</td><td>' + LqUtils.getFormatDate(data[i].TradingDateTime, 'd') + '</td><td>' + data[i].TradingNote + '</td></tr>';
            }
            html += '</tbody></table>';
            $("#" + idRender).html(html);
            if (fn) fn();
        });
        srvAccountTrading.run();
    },
    countAccountTrading:function (idRender, appId, type, certification, fn) {
        var srvCountAccount = new Servicemobi('lquserstrading/gettradingcount', { tradingappid: appId, tradingformid: type, certificationcodes: certification }, function (ret) {
            var paging = new LqPaging({
                toHTML: 'paging-trading-ads',
                extclasses: 'lq-table-width-small',
                totalRec: ret[1],
                numRPP: ret[0],
                numButton: 4,
                pageSelected: function (i) {
                    UserMobi.getAccountTrading(idRender,appId, type, certification, (i || 1), function () { });
                }
            });
            paging.render(1, false);
            if (fn) fn();
        });
        srvCountAccount.run();
    },
    getLandClassifyads:function (idRender, type, certication, page, fn) {
        var html = '<table class="lq-stock-table-overview tb-team"><thead id="thead-classify-ads"><tr><th width=20px><input type="checkbox" id="all-classify-id"/></th><th style="width: 38%;">Tiêu đề</th><th>Ngày đăng</th><th>Hết hạn</th><th>Ghi chú</th></tr></thead><tbody>';
        var srvLandClassifyads = new Servicemobi('land/getlandclassifiedadformanagerview', { typeclassifiedid: type, certificationcodes: certication, pageindex: page }, function (data) {
            for (var i = 0; i < data.length; i++)
            {
                html += '<tr><td><input type="checkbox" id="classify-' + data[i].SmallAdId + '" class="choice-classify-id" value="' + data[i].SmallAdId + '"/></td><td onclick="viewFloor(' + data[i].SmallAdId + ')">' + data[i].Title + '</td><td>' + LqUtils.getFormatDate(data[i].DateStart, 'd') + '</td><td>' + LqUtils.getFormatDate(data[i].DateEnd, 'd') + '</td><td>' + data[i].Notify + '</td></tr>';
            }
            html += '</tbody></table>';
            $("#" + idRender).html(html);
            if (fn) fn();
        });
        srvLandClassifyads.run();
    },
    countLandClassifyads:function (idRender, type, certication, fn) {
        var srvCountLandCalssifyads = new Servicemobi('land/getlandclassifiedadformanagercount', { typeclassifiedid: type, certificationcodes: certication }, function (ret) {
            var paging = new LqPaging({
                toHTML: 'paging-classify-ads',
                extclasses: 'lq-table-width-small',
                totalRec: ret[1],
                numRPP: ret[0],
                numButton: 4,
                pageSelected: function (i) {
                    UserMobi.getLandClassifyads(idRender, type, certication, (i || 1), function () {
                        $("#all-classify-id").click(function () {
                            if ($("#all-classify-id").is(':checked') == true) {
                                $.each($(".choice-classify-id"), function (key, val) {
                                    ClassifyAds.params.ClassifyId.push(val.value);
                                });
                                $(".choice-classify-id").attr('checked', 'checked');
                                $(".tb-team tbody tr").addClass('choice-remove-classify');
                            } else if ($("#all-classify-id").is(':checked') == false) {
                                ClassifyAds.params.ClassifyId = [];
                                $(".choice-classify-id").removeAttr('checked');
                                $(".tb-team tbody tr").removeClass('choice-remove-classify');
                            }
                        });

                        $(".choice-classify-id").change(function () {
                            if (this.checked == true) {
                                $(".tb-team tbody").removeClass("choice-remove-classify");
                                $(this).parent().parent().addClass('choice-remove-classify');
                                ClassifyAds.params.ClassifyId.push($(this).val());
                            } else if (this.checked == false) {
                                $(this).parent().parent().removeClass('choice-remove-classify');
                                for (var j in ClassifyAds.params.ClassifyId) {
                                    if ($(this).val() == ClassifyAds.params.ClassifyId[j]) {
                                        ClassifyAds.params.ClassifyId.splice(j, 1);
                                    }
                                }
                            }
                            console.log(ClassifyAds.params.ClassifyId);
                        });
                    });
                }
            });
            paging.render(1, false);
            if (fn) fn();
        });
        srvCountLandCalssifyads.run();
    },
    logoutUsers:function (certification, fn) {
        var srvLogOut = new Servicemobi('lqusers/getlogout', { certificationcodes: certification }, function () {
            LqUtils.eraseCookie("AuthenticationToken");
            delete UserMobi.credits.AuthenticationToken;
            if (fn) fn();
        });
        srvLogOut.run();
    },
    changePass: function (passOld, passNew,certification, fn) {
        console.log(certification, passOld, passNew);
        var srvChangePass = new Servicemobi('LQUsers/PostChangePass', {}, function (data) {
            if (fn) fn(data);
        });
        srvChangePass.post({
            PassOld: passOld,
            PassNew: passNew,
            CertificationCodes: certification
        });
    },
    getClassifiedAds:function (smalladid, certification, fn) {
        var srvClassifiedAds = new Servicemobi('land/getclassifiedads', { smalladid: smalladid, certificationcodes: certification }, function (data) {
            if (fn) fn(data);
        });
        srvClassifiedAds.run();
    }
    

}
