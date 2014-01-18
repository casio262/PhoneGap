LqTableSpecial = Class.extend({
    init: function (service, columns, customs, normalization) {
        this.service = service;
        this.columns = columns;
        this.customs = customs || {};
        if (!this.customs.colstyles) this.customs.colstyles = [];
        if (!this.customs.colclasses) this.customs.colclasses = [];
        this.normalization = normalization;
        if (this.the2nd) delete this.the2nd;
    },

    wait: function () {
        if (this.loadingTo) {
            LqUtils.IconLoadClock("#" + this.loadingTo, '');
        }
    },

    format: function (type, inputs) {
        switch (type) {
            case 'n':
                return LqUtils.FormatNumber(inputs[0]);
            case 'nt':
                if (inputs[1] == undefined) return;
                var keys = inputs[1].split(',');
                var _ex = inputs[0][keys[0]];
                var _num = inputs[0][(keys[1] || 'P_E')];
                if (_ex.toString() == "HOSE") {
                    _num = _num * 10;
                } else if (_ex.toString() == "HNX") {
                    _num = _num * 1000;
                } else _num = _num;
                var _isNegative = false;
                if (_num < 0) {
                    _num = _num * -1;
                    _isNegative = true;
                }
                _num = LqUtils.Pow(_num, 3);
                _num = _num.toString().replace('.', ',');
                if (_isNegative == true) _num = '-' + _num;
                if (_num.length > 6) _num = _num.substring(0, 6);
                return _num;
            case 'ntf':
                if (inputs[1] == undefined) return;
                var keys = inputs[1].split(',');
                var _ex = FindTradingFloorByCode(inputs[0][keys[0]]) || "HNX";
                var _num = inputs[0][keys[1]];
                if (_ex.toString() == "HOSE") _num = _num * 10;
                else if (_ex.toString() == "HNX") _num = _num * 1000;
                else _num = _num;
                var _isNegative = false;
                if (_num < 0) {
                    _num = _num * -1;
                    _isNegative = true;
                }
                _num = LqUtils.Pow(_num, 3);
                _num = _num.toString().replace('.', ',');
                if (_isNegative == true) _num = '-' + _num;
                if (_num.length > 6) _num = _num.substring(0, 6);
                return _num;
            case 'nh+':
                var _t = (isNaN(inputs[0])) ? 0 : inputs[0];
                if (!window._fTotal) window._fTotal = 0;
                window._fTotal += _t;
                return LqUtils.FormatNumber(_t);
            case 'nh-':
                return LqUtils.FormatNumber(inputs[0] / 1000);
            case 'nh':
                return (LqUtils.FormatNumber(inputs[0]) == 'N/A') ? '0' : LqUtils.FormatNumber(inputs[0]);
            case 'n0':
                return (LqUtils.FormatNumber(inputs[0]) == 'N/A') ? 'Không có' : LqUtils.FormatNumber(inputs[0]);
            case 'ns':
                return (LqUtils.FormatNumber(inputs[0]) == '0') ? 'N/A' : LqUtils.FormatNumber(inputs[0]);
            case 'n-%':
                var _ref = (LqUtils.FormatNumber(inputs[0]) == '0') ? '0' : LqUtils.FormatNumber(inputs[0]);
                return _ref + '%';
            case 'n%':
                var val = (LqUtils.FormatNumber(inputs[0]) == 'N/A') ? '0' : LqUtils.FormatNumber(inputs[0]);
                val = val.split('~');
                var _val = val[0];
                var _lastModified = val[1] || "01/01/0001 00:00:00";
                var _mrgTop = 14;
                var _color = _val > 39 ? 'white' : 'black';
                var _mrgLeft = _val == 100 ? 4 : 8;
                switch (_val) {
                    case '100':
                        _mrgTop = 7;
                        break;
                    case '90':
                        _mrgTop = 8;
                        break;
                    case '80':
                        _mrgTop = 10;
                        break;
                    case '70':
                        _mrgTop = 11;
                        break;
                    case '60':
                        _mrgTop = 12;
                        break;
                    case '50':
                        _mrgTop = 14;
                        break;
                    case '40':
                        _mrgTop = 15;
                        break;
                    case '30':
                        _mrgTop = 8;
                        break;
                    case '20':
                        _mrgTop = 11;
                        break;
                    case '10':
                        _mrgTop = 14;
                        break;
                    case '35':
                        _mrgTop = 7;
                        break;
                    case '25':
                        _mrgTop = 10;
                        break;
                }
                var _class = _val == 0 ? "val-none" : "";
                return "<div title='Cập nhật lúc: " + LqUtils.getFormatDate(_lastModified.replace('.', ''), 'dt') + "' class='" + _class + " box-sizing' style='height:100%;background-color: #267DD4;width: 50%;margin-left: 26%;'><div style='position: absolute;margin-left: " + _mrgLeft + "px;color: " + _color + ";font-size: 10px;margin-top:" + _mrgTop + "px;'>" + (_val + '%') + "</div><div style='background-color:white;height:" + (100 - _val) + "%;'></div></div>";
            case 'd':
                return LqUtils.FormatDate(inputs[0]);
            case 'dt':
                return LqUtils.getFormatDate(inputs[0], 'dt');
            case 'dm':
                return LqUtils.getFormatDate(inputs[0]).substring(0, 5);
            case 'p':
                var _unit = inputs[0] > 200 ? 1 : 1000;
                return LqUtils.FormatNumber((inputs[0] * _unit)) || 'N/A';
            case 'h':
                return inputs[0].toString().length > 5 ? inputs[0].toString().substring(0, 5) : inputs[0];
            case 'mark':
                var _keysWord = LQUIs.DataTranfer.KeysWord || "";
                return LqUtils.MatchingWordSearch(_keysWord, inputs[0].toString(), "", "byHTML5");
            case 'eh':
                var keys = inputs[1].split(',');
                return LqUtils.FormatNumber(inputs[0][keys[0]] - inputs[0][keys[1]]);
            case 'ij':
                return HtmlFomater.getStatusChangeIndex(inputs[0]);
            case 'pow2':
                var _ref = LqUtils.FormatNumber(LqUtils.Pow(inputs[0], 2));
                return _ref.toString().length > 5 ? _ref.toString().substring(0, 5) : _ref;
            case 'pow4':
                return LqUtils.FormatNumber(LqUtils.Pow(inputs[0], 4));
            case 'ejk':
                var keys = inputs[1].split(',');
                return HtmlFomater.getStatusColorChanged(inputs[0][keys[0]], inputs[0][keys[1]], inputs[0][keys[2]], inputs[0]["E"]);
            case 'ek':
                var keys = inputs[1].split(',');
                var ExChange = FindQuickTradingFloorByCode(inputs[0][keys[3]]);
                return HtmlFomater.getStatusColorChanged(inputs[0][keys[0]], inputs[0][keys[1]], inputs[0][keys[2]], ExChange);

            case 'et':
                var keys = inputs[1].split(',');
                var _unit = keys[2] == 'HOSE' ? 1 : 1000;
                return HtmlFomater.getStatusColorChanged(inputs[0][keys[1]] * _unit, (inputs[0][keys[0]] - inputs[0][keys[1]]) * _unit, inputs[0][keys[0]] * _unit, keys[2]);
            case 'em':
                return window[inputs[1]][inputs[0]];
            case 'substring':
                var _len = parseInt(inputs[1]);
                var _val = inputs[0][inputs[2]];
                if (!_val) return "<div title='" + 0 + "'>Không có tiêu đề</div>";
                return "<div title='" + _val + "'>" + (_val.length > _len ? _val.substring(0, _len) + '...' : _val) + "</div>";
            case 'link':
                return '<a href="' + (inputs[0].LinkDownload || inputs[0]) + '" target="_blank" style="color:transparent"><img alt="link-download" src="' + AppConfigs.host + '/Content/Images/Icons/pdf.jpg"></img></a>';
            case 'innerlink':
                var _sp = inputs[1].split(':');
                var id = _sp[0],
                title = _sp[1],
                gr = _sp[2],
                cg = _sp[3];
                var ret = {
                    'NewsId': inputs[0][id],
                    'NewsGroupId': gr,
                    'NewsCategoryId': cg,
                    Title: inputs[0][title]
                };
                return '<a href="' + LqNewsReader.getterHref(ret) + '" >' + LqUtils.TrunLength(inputs[0][inputs[2]], LqUtils.getRandomInt(10, 20), '...') + '</a>';
            case 'actionlinkWNew':
                var _sp = inputs[1].split(':');
                var id = _sp[0];
                var fn = _sp[1];
                _fn = function (val) { window[fn](val); };
                var _new = "";
                if (LqUtils.CompareTwoDays(LqUtils.converToDateTime(inputs[0]['PostDate'] || inputs[0]['Pd']), new Date()) == true)
                    _new = '<img border="0" width="30px" align="absmiddle" src="http://lequang.vn/Content/Images/Icons/new.gif?7200">';
                return "<a id='news-" + inputs[0][id] + "' onclick='_fn(" + inputs[0][id] + ");'>" + LqUtils.TrunLength(inputs[0]['Title'], 102, '...') + _new + "</a>";
            case 'actionlink':
                var _sp = inputs[1].split(':');
                var id = _sp[0];
                var fn = _sp[1];
                _fn = function (val) {
                    window[fn](val);
                };
                return "<a id='news-" + inputs[0][id] + "' onclick='_fn(" + inputs[0][id] + ");'>" + LqUtils.TrunLength(inputs[0]['Title'], 102, '...') + "</a>";
            case 'companylink':
                var mck = inputs[0][inputs[2]];
                var mckName = FindNameByCode(mck);
                var url = AppConfigs.host + "/du-lieu/cong-ty/tq-" + mck.toLowerCase() + "/" + LqUtils.UnSign(mckName) + '.csvh';
                return '<a href="' + url + '" title="' + mckName + '" >' + mck + '</a>';
            case 'find':
                var keysMethod = inputs[1].split(',');
                return window[keysMethod[1]](inputs[0][keysMethod[0]]);
            case 'wait':
                var keysMethod = inputs[1].split(',');
                keysMethod = keysMethod[0].split(':');
                var _mck = inputs[0][keysMethod[0]];
                var __fn = keysMethod[2];
                if (__fn) window[__fn](_mck);

                return "<div class=" + (keysMethod[1] + '-' + _mck) + ">" + '---' + "</div>";
            default:
                if (type.indexOf("Standardized") != -1) {
                    return LqUtils.StandardizedNumber(inputs[0], (type.length - 12));
                }
        }
    },

    utilsEx: function (_format, _data, _key, j) {

    },

    render: function (loadingTo, tableTo, _runat, fncallbacks, skipActiveHover) {

        this.tableTo = tableTo;
        this.loadingTo = loadingTo;
        var tbo = $('#' + tableTo);
        var _self = this;
        var renderBody = function (data) {
            if (tbo) tbo.html("");
            var rows = "",
                row, cell;
            var _key = "";
            _data = "";
            _format = "";
            var _class = "",
                _style = "";
            for (var j = 0, len = data.length; j < len; j++) {
                if (data[j]) {
                    cell = '';
                    row = '<tr>';
                    for (var i = 0, len2 = _self.columns.order.length; i < len2; i++) {
                        _class = "", _style = "";
                        _key = _self.columns.order[i];
                        _data = data[j][_key] || 'N/A';
                        _format = _self.columns.format[_key];
                        if (_format) {
                            if (_format.indexOf('ex->') != -1)
                                _data = _self.format('ex', [data[j], _format.split('->')[1]]);
                            else if (_format.indexOf('nt->') != -1)
                                _data = _self.format('nt', [data[j], _format.split('->')[1]]);
                            else if (_format.indexOf('ntf->') != -1)
                                _data = _self.format('ntf', [data[j], _format.split('->')[1]]);
                            else if (_format.indexOf('eh->') != -1)
                                _data = _self.format('eh', [data[j], _format.split('->')[1]]);
                            else if (_format.indexOf('ejk->') != -1)
                                _data = _self.format('ejk', [data[j], _format.split('->')[1]]);
                            else if (_format.indexOf('ek->') != -1)
                                _data = _self.format('ek', [data[j], _format.split('->')[1]]);
                            else if (_format.indexOf('et->') != -1)
                                _data = _self.format('et', [data[j], _format.split('->')[1]]);
                            else if (_format.indexOf('em->') != -1)
                                _data = _self.format('em', [data[j][_key], _format.split('->')[1]]);
                            else if (_format.indexOf('find->') != -1)
                                _data = _self.format('find', [data[j], _format.split('->')[1]]);
                            else if (_format.indexOf('innerlink->') != -1)
                                _data = _self.format('innerlink', [data[j], _format.split('->')[1], _key]);
                            else if (_format.indexOf('actionlinkWNew->') != -1)
                                _data = _self.format('actionlinkWNew', [data[j], _format.split('->')[1], _key]);

                            else if (_format.indexOf('actionlink->') != -1)
                                _data = _self.format('actionlink', [data[j], _format.split('->')[1], _key]);
                            else if (_format.indexOf('companylink->') != -1)
                                _data = _self.format('companylink', [data[j], _format.split('->')[1], _key]);
                            else if (_format.indexOf('link->') != -1)
                                _data = _self.format('link', [data[j], _format.split('->')[1]]);
                            else if (_format.indexOf('wait->') != -1)
                                _data = _self.format('wait', [data[j], _format.split('->')[1], _key]);
                            else if (_format.indexOf('substring->') != -1)
                                _data = _self.format('substring', [data[j], _format.split('->')[1], _key]);
                            else if (_format.indexOf('order->') != -1)
                                _data = (j + 1) + (LqUtils.DataTranfer.StartOrderIdx || 0);
                            else _data = _self.format(_format, [_data]);
                        }
                        if (_self.customs.colstyles[i]) _style = _self.customs.colstyles[i];
                        if (_self.customs.colclasses[i]) _class = _self.customs.colclasses[i];
                        cell += '<td class="' + _class + '" style="' + _style + '">' + _data + '</td>';
                    }
                    row += (cell + '</tr>');
                    rows += row;
                }
            }
            tbo.html(rows);
            /*if (!skipActiveHover) {
                $(function () {
                    $('#' + tableTo + ' tr').not('.not-hover').hover(function () {
                        /*$(this).css('background-color', 'rgba(255, 255, 153, 0.43)');
                        $(this).contents('td').css({
                            'cursor': 'pointer'
                        });#1#
                    },
                        function () {
                            /*$(this).css('background-color', '#FFFFFF');#1#
                        });
                });
            }*/

            if (fncallbacks) fncallbacks();
        };

        var renderFooter = function (slogan) {
            if (!_self.footerRendered) _self.footerRendered = true;
            else return;
        };

        if (this.service.params)
            this.service.params.PageIndex = 1;
        this.srvContent = new Servicemobi(this.service.srvdata, this.service.params,
            function (ref) {
                if (ref == null) {
                    if (JSON.stringify(_self.service.params).indexOf("CertificationCodes") != -1)
                        LqMessages.show("error", "Cảnh báo:", "Tài khoản của bạn đã bị đăng nhập trên máy khác, bạn ấn F5 để chứng thực lại phiên đăng nhập!");
                    return;
                }
                _self.data = ref;
                if (_self.normalization) {
                    for (var i = 0, len = ref.length; i < len; i++) {
                        for (var j in ref[i]) {
                            if (_self.normalization[j]) {
                                ref[i][j] = _self.normalization[j](ref[i][j]);
                            }
                        }
                    }
                }
                renderBody(ref);
                renderFooter('lequang.vn');
                setTimeout(function () {
                    if (_self.srvCount && !_self.srvCountActived) {
                        _self.srvCount.run(_runat);
                        _self.srvCountActived = true;
                    }
                }, 1200);
                $('#' + _self.loadingTo).html(''); LqUtils.hideCover();
            });
        this.wait();
        this.srvContent.run(_runat);
    },

    paging: function (pagingTo, service, numBtn, type, fn, fakePageLoading) {
        if (type == undefined || fakePageLoading == "fake-page-loading") {
            $('#' + pagingTo).html("<img alt='loading-page' height='100%' src='http://lequang.vn/Content/Images/Icons/loading-page.png?7200'/>");

        }
        else $('#' + pagingTo).html("");
        LqUtils.DataTranfer.StartOrderIdx = 0;
        var _offsetTopLoading = $('#' + this.loadingTo).offset().top;
        if ($('#' + pagingTo).offset().top < _offsetTopLoading + (_offsetTopLoading * 20 / 100)) {
            $('#' + this.loadingTo).html('');
        }
        var _self = this;
        this.srvCount = new Servicemobi(service.srvcount, this.service.params,
            function (ret) {
                if (ret == null || ret[1] == 0) return;
                var _lqPaging = new LqPaging({
                    toHTML: pagingTo,
                    extclasses: (type || 'lq-table-width-big'),
                    totalRec: ret[1],
                    numRPP: ret[0], numButton: numBtn,
                    pageSelected: function (i) {
                        if (_self.the2nd) {
                            if (["company-news-table", "equivalent-table", "samesector-table"].indexOf(_self.tableTo) == -1) {
                                LQUIs.showCover(undefined, undefined, { opacity: 0.1 });
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
    }

});
