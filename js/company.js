CompanyMobi = {
    stockIndex: ["VN", "VN30", "HNX", "HNX30", "UPCOM"],
    params:{},
    getMarketOnline: function (idRender, fn) {
        var now = new Date();
        var time = now.getTime();
        var marketOnline = new Servicemobi('marketinfoapi/getmarketinfor?since='+time, {}, function (data) {
            console.log(data);
            console.log(time);
            time = new Date().getTime();
            for (var i in data) {
                var pecent = ((data[i]["I"] - data[i]["P"] )/ data[i]["P"]) * 100;
                var html = '<div><table id="stock-index"><thead><tr><th id="' + i + '-price" width="50%"><span style="font-size:18px;float:left;margin-left:25%;"><i id="'+i+'-updown" class="lq-data-uarr-market-equal"></i>' + LqUtils.Pow(pecent, 2) + '%</span><div class="clear">' + LqUtils.Pow(data[i]["I"], 2) + '</div></th><th>' + i + '</th></tr></thead>';
                html += '<tbody><tr><td colspan="2">Tóm lược</td></tr><tr><td>' + i + '-INDEX</td><td id="' + i + '-c">' + LqUtils.Pow(data[i]["C"],2) + '</td></tr>';
                html += '<tr><td>KLGD</td><td>' + data[i]["K"] + '</td></tr>';
                html += '<tr><td>GTGD</td><td>' + LqUtils.Pow(data[i]["G"],2) + ' tỷ</td></tr>';
                html += '<tr><td>NN Mua</td><td>' + LqUtils.ConvertUnit(data[i]["M"]) + '</td></tr>';
                html += '<tr><td>NN Bán</td><td>' + LqUtils.ConvertUnit(data[i]["B"]) + '</td></tr>';
                html += '<tr><td>Room</td><td>' + LqUtils.ConvertUnit(data[i]["R"]) + '</td></tr>';
                html += '</tbody></table>';

                html += '<table id="stock-charts"><thead><tr><th  colspan="8">Biểu đồ</th></tr>';
                html += '<tr><th id="' + i + '-0" class="click-time">1 ngày</th><th id="' + i + '-5">1 tuần</th><th id="' + i + '-20">1 tháng</th><th id="' + i + '-60">3 tháng</th><th id="' + i + '-120">6 tháng</th><th id="' + i + '-240">1 năm</th><th id="' + i + '-720">3 năm</th><th id="' + i + '-9999">Tất cả</th></tr></thead>';
                html += '<tbody><tr><td id="' + i + '-charts" colspan="8"></td></tr></tbody></table>';
                
                $("#" + idRender + i).html(html);
                
                $("#" + i + "-updown").removeClass();
                if (data[i]["C"] > 0) {
                    $("#" + i + "-c").css("color", "green");
                    $("#" + i + "-price").css("background-color", "green");
                    $("#" + i + "-updown").addClass("lq-data-uarr-market-up");
                } else if (data[i]["C"] < 0) {
                    $("#" + i + "-c").css("color", "red");
                    $("#" + i + "-price").css("background-color", "red");
                    $("#" + i + "-updown").addClass("lq-data-uarr-market-down");
                } else if (data[i]["C"] == 0) {
                    $("#" + i + "-updown").addClass("lq-data-uarr-market-equal");
                }
                CompanyMobi.HighChartsStock(i+"-charts", i, 0);
            }
            if (fn) fn();
        });
        //setInterval(function() {
             marketOnline.run();
        //}, 6000);
    },
    chartTechnicalOverview : function(config) {
        Highcharts.setOptions({
            global: {
                useUTC: false
            }
        });
        if (config.data.length <= 0) return;
        $('#' + config.renderTo).html('');
        var LQchartOverview = new Highcharts.StockChart({
            chart: {
                marginLeft: 8,
                renderTo: config.renderTo,
            },
            scrollbar: {
                enabled: false
            },
            navigator: {
                enabled: false
            },
            legend: {
                enabled: false
            },
            xAxis: {
                gapGridLineWidth: 0,
                enabled: false
            },
            yAxis: [{
                title: {
                    text: ''
                },

                plotLines: [{
                    value: config.data[0][1],
                    color: '#FF751A',
                    dashStyle: 'shortdash',
                    width: 2,
                    label: {
                        text: ''
                    }
                }],
                height: 124,
                lineWidth: 2
            }],
            rangeSelector: {
                buttons: [{
                    type: 'minute',
                    count: 1,
                    text: '1m'
                },
                    {
                        type: 'minute',
                        count: 5,
                        text: '5m'
                    }],
                selected: 1,
                inputEnabled: false,
                enabled: false
            },

            series: [{
                type: 'area',
                name: 'Điểm',
                data: (function() {
                    return config.data;
                })(),
                tooltip: {
                    valueDecimals: 2
                },
                fillColor: {
                    linearGradient: {
                        x1: 0,
                        y1: 0,
                        x2: 0,
                        y2: 1
                    },
                    stops: [[0, Highcharts.getOptions().colors[0]], [1, 'rgba(0,0,0,0)']]
                },
                threshold: null
            }]
        });
        return LQchartOverview;
    },

    HighChartsStock: function (idRender, at, since) {
        var loadCharts = new Servicemobi('MarketInfoAPI/GetChartMarketInfo', { ExChangeId: at, Since: since }, function (data) {
            var dataVolumeChart = [];
            for (var i = 0, len = data.length; i < len; i++) {
                var dateStampChart = data[i].D;
                dataVolumeChart.push([
                    parseInt(dateStampChart), parseFloat(LqUtils.Pow(data[i].I,2))
                ]);
                
            }
            //console.log(dataVolumeChart);
            if (dataVolumeChart.length <= 0) return;
            /*Highcharts.setOptions({
                global: {
                    useUTC: false
                }
            });*/
            $('#' + idRender).highcharts('StockChart', {
                
                scrollbar: {
                    enabled: false
                },
                /*navigator: {
                    enabled: false
                },*/
                xAxis: {
                    type: 'datetime',
                    dateTimeLabelFormats: {
                        second: '%H:%M:%S',
                        minute: '%H:%M',
                        hour: '%H:%M',
                        day: '%e. %b',
                        week: '%e. %b',
                        month: '%b \'%y',
                        year: '%Y'
                    },
                    gapGridLineWidth: 0,
                    enabled: false
                },
                yAxis: [{
                    title: {
                        text: ''
                    },

                    plotLines: [{
                        value: dataVolumeChart[0][1],
                        color: '#FF751A',
                        dashStyle: 'shortdash',
                        width: 2,
                        label: {
                            text: ''
                        }
                    }],
                    //height: 124,
                    lineWidth: 2
                }],
                chart: {
                    marginLeft: 6,
                    renderTo: idRender,
                },
                
                legend: {
                    enabled: false
                },
                
                rangeSelector: {
                    buttons: [{
                        type: 'minute',
                        count: 1,
                        text: '1m'
                    },
                        {
                            type: 'minute',
                            count: 5,
                            text: '5m'
                        }],
                    selected: 1,
                    inputEnabled: false,
                    enabled: false
                },

                series: [{
                    name : 'Điểm',
                    data: dataVolumeChart,
                    type : 'area',
                    threshold : null,
                    tooltip : {
                        valueDecimals : 2
                    },
                    fillColor : {
                        linearGradient : {
                            x1: 0, 
                            y1: 0, 
                            x2: 0, 
                            y2: 1
                        },
                        stops : [[0, Highcharts.getOptions().colors[0]], [1, 'rgba(0,0,0,0)']]
                    },
                }]
            });
            //var _chart = CompanyMobi.chartTechnicalOverview({ 'data': dataVolumeChart[0], 'renderTo': 'imgChart' });
            //_chart.series[0].setData(dataVolumeChart);
        });
        loadCharts.run();
    },
    //http://lequang.vn/api/companyprofile/getlqtechnicalchart?stockcode=NBB&exchange=HOSE&getdays=1&
    HighStocks: function (code, exchange, day, fn) {
        var loadCharts = new Servicemobi('companyprofile/getlqtechnicalchart', { stockcode: code, exchange: exchange, getdays: day }, function (data) {
            var transaction10Ver = 0;
            
            if(day>10) {
                for (var j = 0; j < 10; j++) {
                    transaction10Ver += data[j].LASTVOL;
                }
            }
            
            var d = "Giá", decimal = 0,unit=1000;
            if (code == "VN" || code == "UPCOM" || code == "HNX" || code == "VN30" || code == "HNX30" || exchange == "HNX") {
                d = "Điểm";
                decimal = 2;
                unit = 1;
            }
            
            var dataIndexStock = [];
            var dataVolumeStock = [];
            var len = data.length;
            var typeCharts = "area";
            
            if (day == 1) {
                console.log(data[0].LAST);
                typeCharts = "line";
                for (var l = len - 1; l >= 0; l--) {
                    var dateStamp_CHART1 = LqUtils.getDateTimeUTC(data[l].NGD2.toString());
                    console.log("a:"+dateStamp_CHART);
                    dataIndexStock.push([
                        dateStamp_CHART1,
                        LqUtils.Pow(parseFloat(data[l].LAST) * unit, 2)
                    ]);

                    dataVolumeStock.push([
                        dateStamp_CHART1,
                        data[l].LASTVOL
                    ]);
                }
            } else {
                for (var i = len - 1; i >= 0; i--) {
                    var dateStamp_CHART = LqUtils.getDateUTC(data[i].NGD2.toString());
                    dataIndexStock.push([
                        dateStamp_CHART,
                        LqUtils.Pow(parseFloat(data[i].LAST) * unit, 2)
                    ]);

                    dataVolumeStock.push([
                        dateStamp_CHART,
                        data[i].LASTVOL
                    ]);
                }
            }

            
            
            $('#' + code + "-charts").highcharts('StockChart', {
                title: {
                    text: '',
                },

                scrollbar: {
                    enabled: false
                },
                navigator: {
                    enabled: false
                },
                yAxis: [{
                    title: {
                        text: d
                    },
                    plotLines: [{ value: data[0].LAST, color: '#FF751A', dashStyle: 'shortdash', width: 2, label: { text: '' } }],
                    height: 226,
                    lineWidth: 2
                }, {
                    title: {
                        text: 'Khối lượng'
                    },
                    top: 250,
                    height: 100,
                    offset: 0,
                    lineWidth: 1
                }],

                legend: {
                    enabled: false
                },
                xAxis: {
                    type: 'datetime',
                    dateTimeLabelFormats: {
                        second: '%H:%M:%S',
                        minute: '%H:%M',
                        hour: '%H:%M',
                        day: '%e. %b',
                        week: '%e. %b',
                        month: '%b \'%y',
                        year: '%Y'
                    },
                    gapGridLineWidth: 0,
                    enabled: false
                },
                
                rangeSelector: {
                    buttons: [{
                        type: 'minute',
                        count: 1,
                        text: '1m'
                    },
                        {
                            type: 'minute',
                            count: 5,
                            text: '5m'
                        }],
                    selected: 1,
                    inputEnabled: false,
                    enabled: false
                },

                series: [{
                    name: d,
                    data: dataIndexStock,
                    type: typeCharts,
                    //threshold: null,
                    tooltip: {
                        valueDecimals: decimal
                    },
                    fillColor: {
                        linearGradient: {
                            x1: 0,
                            y1: 0,
                            x2: 0,
                            y2: 1
                        },
                        stops: [[0, Highcharts.getOptions().colors[0]], [1, 'rgba(0,0,0,0)']]
                    }
                }, {
                    type: 'column',
                    name: 'Khối lượng',
                    data: dataVolumeStock,
                    yAxis: 1,
                    color: 'rgba(255, 80, 80, 0.8);'
                    
                }]
            });
            if (fn) fn(transaction10Ver/10);
        });
        loadCharts.run();
    },
    
    getDetailsCompany: function (idRender,stockcode, exchange, since, fn) {
        //var now = new Date();
        //var time = now.getTime();
        var marketOnline = new Servicemobi('companyprofile/getlqcompanyprofileindex', { stockcode: stockcode, exchangeid: exchange, since: since }, function (data) {
            //console.log(data);
            
            if (exchange == "HOSE") {
                data.PriceChanges = data.PriceChanges * 1000;
                data.OpeningPrice = data.OpeningPrice * 1000;
                data.HighestPrice = data.HighestPrice * 1000;
                data.LowestPrice = data.LowestPrice * 1000;
                data.AveragePrice = data.AveragePrice * 1000;
                data.ReferencePrice = data.ReferencePrice * 1000;
                data.OlderPrice = data.OlderPrice * 1000;
            }
            //console.log(time);
            //time = new Date().getTime();
            var pecent = ((data.OlderPrice - data.ReferencePrice) / data.ReferencePrice) * 100;
            var html = '<div><table id="company-information" class="tb-team"><thead><tr><th id="company-price" width="50%" ><span style="font-size:18px;float:left;margin-left:25%;font-weight: normal;"><i id="company-updown" class="lq-data-uarr-market-equal"></i>' + LqUtils.ConvertUnit(Math.round(data.PriceChanges)) + '(' + LqUtils.Pow(pecent, 2) + '%)</span><div class="clear">' + LqUtils.ConvertUnit(Math.round(data.OlderPrice)) + '</div></th><th>' + stockcode.toUpperCase() + ' : ' + CompanyMobi.LoadCompanybyIdCompany(stockcode) + '<br/><i>Sàn:' + CompanyMobi.LoadExchangeCompanyBycode(stockcode) + ', </i><i id="info-sector-name"></i></th></tr></thead>';
            html += '<tbody>';
            html += '<tr><td>Giá mở cửa</td><td>' + LqUtils.ConvertUnit(data.OpeningPrice) + '</td></tr>';
            html += '<tr><td>Giá cao nhất</td><td>' + LqUtils.ConvertUnit(data.HighestPrice) + '</td></tr>';
            html += '<tr><td>Giá thấp nhất</td><td>' + LqUtils.ConvertUnit(data.LowestPrice) + '</td></tr>';
            html += '<tr><td>Giá đóng cửa</td><td>' + LqUtils.ConvertUnit(data.AveragePrice) + '</td></tr>';
            html += '<tr><td>Tổng khối lượng</td><td>' + LqUtils.ConvertUnit(data.TotalVolume) + '</td></tr>';
            html += '<tr><td>Nước ngoài mua</td><td>' + LqUtils.ConvertUnit(data.BuyForeign) + '</td></tr>';
            html += '<tr><td>Nước ngoài bán</td><td>' + LqUtils.ConvertUnit(data.SellForeign) + '</td></tr>';
            html += '<tr><td>Room NN còn lại<i>(KL)</i></td><td>' + LqUtils.ConvertUnit(data.RemainForeign) + '</td></tr>';
            html += '</tbody></table>';

            html += '<table id="company-charts" class="tb-team" style="width:90%;margin:10px auto;"><thead><tr><th colspan="8">Biểu đồ kỹ thuật</th></tr>';
            html += '<tr><th id="' + stockcode + '-1">1 ngày</th><th id="' + stockcode + '-5">1 tuần</th><th id="' + stockcode + '-20">1 tháng</th><th id="' + stockcode + '-60" class="click-time">3 tháng</th><th id="' + stockcode + '-120">6 tháng</th><th id="' + stockcode + '-240">1 năm</th><th id="' + stockcode + '-720">3 năm</th><th id="' + stockcode + '-9999">Tất cả</th></tr></thead>';
            html += '<tbody><tr><td id="' + stockcode + '-charts" colspan="8"></td></tr></tbody></table>';
            CompanyMobi.PriceNow = data.OlderPrice;
            $("#" + idRender).html(html);

            $("#company-updown").removeClass();
            if (data.PriceChanges > 0) {
                $("#company-price").css("background-color", "green");
                $("#company-updown").addClass("lq-data-uarr-market-up");
            } else if (data.PriceChanges < 0) {
                $("#company-price").css("background-color", "red");
                $("#company-updown").addClass("lq-data-uarr-market-down");
            } else if (data.PriceChanges == 0) {
                $("#company-updown").addClass("lq-data-uarr-market-equal");
            }
            CompanyMobi.HighStocks(stockcode, exchange, 60, function (transaction) {
                setTimeout(function() {
                    $("#transaction-10").html(LqUtils.ConvertUnit(transaction));
                },1000);
            });
            if (fn) fn();
        });
        //setInterval(function() {
        marketOnline.run();
        //}, 6000);
    },
    /*chi so co ban*/
    LoadCompanyProfileoverview:function (idRender, stockcode, fn) {
        var html = '<table class="tb-team"><thead><tr><th colspan="2" style="text-align:left">Chỉ số cơ bản</th></tr></thead><tbody>';
        console.log(CompanyMobi.PriceNow);
        var getCompanyProfile = new Servicemobi('companyprofile/getlqcompanyprofileoverview', {stockcode:stockcode, getnext:true}, function (data) {
            html += '<tr><td>EPS 4 quí gần nhất<i>(VNĐ)</i></td><td>' + LqUtils.Pow(data.EPS,0) + '</td></tr>';
            html += '<tr><td>P/E<i>(lần)</i> </td><td>' + LqUtils.Pow(LqUtils.ConvertUnit(CompanyMobi.PriceNow / data.EPS),3) + '</td></tr>';
            html += '<tr><td>Giá trị sổ sách<i>(VNĐ)</i></td><td>' + LqUtils.Pow(data.BookValue, 3) + '</td></tr>';
            html += '<tr><td>P/B<i>(lần)</i></td><td>' + LqUtils.ConvertUnit(LqUtils.Pow(CompanyMobi.PriceNow / data.BookValue, 3)) + '</td></tr>';
            html += '<tr><td>Hệ số beta</td><td>' + data.BETA + '</td></tr>';
            html += '<tr><td>KLGDKL TB 10 phiên</td><td id="transaction-10"></td></tr>';
            html += '<tr><td colspan="2" style="background-color:#636363; color:white;">Thông tin cơ bản</td></tr>';
            html += '<tr><td>Ngày giao dịch đầu tiên</td><td>' + LqUtils.getFormatDate(data.FirstTradingDay,"d") + '</td></tr>';
            html += '<tr><td>Giá ĐC phiên GD đầu tiên<i>(VNĐ)</i></td><td>' + LqUtils.ConvertUnit(data.FirstTradingPrice) + '</td></tr>';
            html += '<tr><td>Khối lượng CP phát hành lần đầu</td><td>' + LqUtils.ConvertUnit(data.FirstTradingVolume) + '</td></tr>';
            html += '<tr><td>KLCP đang niêm yết</td><td id="WL_V"></td></tr>';
            html += '<tr><td>KLCP đang lưu hành</td><td id="WC_V"></td></tr>';
            html += '<tr><td>Vốn hóa thị trường<i>(tỷ đồng)</i> </td><td id="P_M"></td></tr>';
            html += '<tr><td>Lịch sử trả cổ tức và chia thưởng</td><td></td></tr>';
            html += '</tbody></table>';
            $("#" + idRender).html(html);
            $("#info-sector-name").html("Ngành: "+data.SubSectorName);
            var getCompanyProfile1 = new Servicemobi('companyprofile/getlqcompanyprofileoverview', { stockcode: stockcode }, function (data1) {
                CompanyMobi.params["WeightListing"] = data1.WeightListing;
                CompanyMobi.params["SubSectorID"] = data1.SubSectorID;
                CompanyMobi.params["FinancialTag"] = data1.FinancialTag;
                console.log(CompanyMobi.params);
                $("#WL_V").html(LqUtils.ConvertUnit(data1.WeightListing));
                $("#WC_V").html(LqUtils.ConvertUnit(data1.WeightCirculation));
                var vh = (data1.WeightListing * CompanyMobi.PriceNow).toString();
                $("#P_M").html(LqUtils.ConvertUnit(vh.substring(0, vh.length-9)));
            });
            getCompanyProfile1.run();
            setTimeout(function() { if (fn) fn(); },2000);
        });
        getCompanyProfile.run();
    },
    
    /*Tin tuc cong ty*/
    LoadNewsSeventView: function (idRender, companyId, newsEventId, page, fn) {
        var timeday = "";
        LqUtils.getTimeServer(function (timeserver) {
            timeday = LqUtils.getFormatDate(timeserver, "d");
        });
        var html = '<div class="pop-detail-news"><div class="title-pop-news"><span>Tin Tức</span><img src="http://lequang.vn/Content/Images/ImageSite/icon-popover-close.png" id="close-pop-news"/></div><div id="content-news-detail"><img src="http://lequang.vn/Content/Images/ImageSite/loader-bert-icon.gif"/ style="padding:45% 0 0 49%;"></div></div><table class="tb-team"><thead><tr><th width="65px">Ngày</th><th>Nội dung</th></tr></thead><tbody>';
        var getNewsSeventView = new Servicemobi('companyprofile/getlqnewseventview', { companyid: companyId, newseventid: newsEventId, pageindex: page }, function (data) {
            for (var i in data) {
                var imgnew = "";
                if (LqUtils.getFormatDate(data[i].PostDate, "d") == timeday) {
                    imgnew = "<img src='http://lequang.vn/Content/Images/Icons/new.gif?7200' />";
                }
                html += '<tr><td>' + LqUtils.getFormatDate(data[i].PostDate) + '</td><td id="news-' + data[i].LinkReference + '" class="view-detail-news">' + data[i].Title + ' '+imgnew+'</td></tr>';
            }
            html += '</tbody></table>';
            $("#" + idRender).html(html);
/**/
            $(".view-detail-news").click(function () {
                console.log(this);
                var idNews = this.id.split("-")[1];
                $("#content-news-detail").slimscroll({
                    height: '96%',
                    width:'100%'
                });
                CompanyMobi.LoadNewsDetailsView("content-news-detail", idNews, function() {
                    CompanyMobi.ClickCodeCompany("#content-news-detail a");
                });
                //$("#content-news-detail").scro
                $(".pop-detail-news").css("display", "block");
            });
            $("#close-pop-news").click(function() {
                $(".pop-detail-news").css("display", "none");
                LqUtils.IconLoadClock("#content-news-detail", "padding:45% 0 0 49%;");
            });
            
            if (fn) fn();
        });
        getNewsSeventView.run();
    },
    //http://lequang.vn/api/companyprofile/getlqnewseventcount?companyid=867&newseventid=99&pageindex=1&
    CountNewsSeventView:function (companyId, newsEventId, fn) {
        var getCountNews = new Servicemobi('companyprofile/getlqnewseventcount', { companyid: companyId, newseventid: newsEventId, pageindex: 1 }, function(data) {

            if (fn) fn(data);
        });
        getCountNews.run();
    },
    //http://lequang.vn/api/companyprofile/getlqnewseventdetailsview?newsid=104257&
    LoadNewsDetailsView:function (idRender, newId, fn) {
        var html = '';
        var getNewDetailsById = new Servicemobi('companyprofile/getlqnewseventdetailsview', {newsid:newId}, function(data) {
            html += data.MainContent;
            html += '<div style="text-align:right;padding-bottom:5px;"><b>' +LqUtils.formatUndefined(data.Author.split("::")[0]) + '</b><br/><i>'+LqUtils.formatUndefined(data.Author.split("::")[1])+'</i></div>';
            $("#" + idRender).html(html);
            if (fn) fn();
        });
        getNewDetailsById.run();
    },
    
    /*Tỉ lệ ký quỹ*/
    
    LoadMarginRatio: function (idRender, stock1, stock2, stockCode, tradingFloor, escrowcId, page, fn) {
        var html = '';
        var stt = page * 50-49;
        var getMarginRatio = new Servicemobi('lqescrowcompanies/getallescrowvaluebyview', { stockcode: stockCode, tradingfloor: tradingFloor, escrowcid: escrowcId, pageindex: page }, function(data) {
            for (var i = 0; i < data.length; i++) {
                //html += '<tr><td>' + (i + stt) + '</td><td>' + data[i].MCK + '</td><td>' + data[i].Ex + '</td><td title="' + LqUtils.formatTitleRatio(data[i][stock1]) + '">' + LqUtils.formatPercent(data[i][stock1]) + '</td><td title="' + LqUtils.formatTitleRatio(data[i][stock2]) + '">' + LqUtils.formatPercent(data[i][stock2]) + '</td></tr>';
                html += '<tr><td>' + (i + stt) + '</td><td>' + data[i].MCK + '</td><td>' + data[i].Ex + '</td><td class="circle" ><div title="' + LqUtils.formatTitleRatio(data[i][stock1]) + '" class=" box-sizing" style="height:100%;background-color: #267DD4;width: 50%;margin: 0 auto;"><div style="position: absolute;color: rgb(255, 184, 0);font-size: 10px;margin:3% 0 0 4%;">' + LqUtils.formatPercent(data[i][stock1]) + '%</div><div style="background-color:white;height: ' + (100 - LqUtils.formatPercent(data[i][stock1])) + '%;"></div></div></td><td class="circle" ><div title="' + LqUtils.formatTitleRatio(data[i][stock2]) + '" class=" box-sizing" style="height:100%;background-color: #267DD4;width: 50%;margin: 0 auto;"><div style="position: absolute;color: rgb(255, 184, 0);font-size: 10px;margin:3% 0 0 4%;">' + LqUtils.formatPercent(data[i][stock2]) + '%</div><div style="background-color:white;height: ' + (100 - LqUtils.formatPercent(data[i][stock2])) + '%;"></div></div></td>';
            }
            $("#" + idRender).html(html);
            var wid = $(".circle").width() / 2;
            $(".circle").height(wid);
            if (fn) fn();
        });
        getMarginRatio.run();
    },

    arrayStockCompany: ['APEC', 'APSI', 'CTS', 'ECC', 'FPTS', 'HSC', 'MBS', 'MSBS', 'SSI', 'TVSI', 'VNDS'],
    loadStockCompany: function (idRender, stockCompany, fn) {
        var html = '';
        for (var i in CompanyMobi.arrayStockCompany) {
            if (CompanyMobi.arrayStockCompany[i]!=stockCompany) {
                html += '<option value="' + CompanyMobi.arrayStockCompany[i] + '">' + CompanyMobi.arrayStockCompany[i] + '</option>';
            }
        }
        $("#" + idRender).html(html);
        if (fn) fn();
    },
    CountMarginRatio:function (idRender, stock1, stock2, stockCode, tradingFloor, escrowcId, fn) {
        var getCountRatio = new Servicemobi('lqescrowcompanies/getallescrowvaluebycount', { stockcode: stockCode, tradingfloor: tradingFloor, escrowcid: 99, pageindex: 1 }, function (ret) {
            var paging = new LqPaging({
                toHTML: 'CS-paging',
                extclasses: 'lq-table-width-small',
                totalRec: ret[1],
                numRPP: ret[0],
                numButton: 5,
                pageSelected: function (i) {
                    CompanyMobi.LoadMarginRatio(idRender, stock1, stock2, stockCode, tradingFloor, escrowcId, (i || 1), function () { });
                }
            });
            paging.render();
            if(fn) fn();
        });
        getCountRatio.run();
    },

/**/
    LoadInfomationFinancial: function (idRender, companyId, type, page, financialTag, fn) {
        var html = '';
        CompanyMobi.params["page"] = page;
        if (financialTag == "Bank") {
            console.log("Báo cáo ngân hàng");
            var getInfomationFinancialBank = new Servicemobi('CompanyProfile/GetFinancialOfBankBy', { CompanyId: companyId, Type: type, PageIndex: page }, function (data) {
                if (data == undefined || data == "") {
                    alert('Hết thông tin tài chính');
                    CompanyMobi.params["page"]--;
                } else {
                    var len = data.length - 1;
                    html = '<table class="tb-team"><thead></tr><tr><th style="height:30px;line-height:10px;" colspan="2"><button id="by-quarter">Theo quý</button><button id="by-year">Theo năm</button></th><th style="line-height:10px;"><span class="pre-next-financical"><img src="http://lequang.vn//LqIframe/profileCompany/Content/dist/previous.png" id="pre-financical"/><img src="http://lequang.vn//LqIframe/profileCompany/Content/dist/next.png" id="next-financical"/></span></th></tr></thead><tbody>';
                    html += '<tr class="title-tr"><td >Kết quả kinh doanh</td><td>' + data[len - 1].SinceVal + '</td><td>' + data[len].SinceVal + '</td></tr>';
                    html += '<tr><td><b>+Tổng doanh thu</b></td><td>' + LqUtils.ConvertUnit(data[len - 1].TDT1) + '</td><td>' + LqUtils.ConvertUnit(data[len].TDT1) + '</td></tr>';
                    html += '<tr><td>-Chi phí lãi</td><td>' + LqUtils.ConvertUnit(data[len - 1].CPL11) + '</td><td>' + LqUtils.ConvertUnit(data[len].CPL11) + '</td></tr>';
                    html += '<tr><td>-Thu nhập lãi thuần</td><td>' + LqUtils.ConvertUnit(data[len - 1].TNLT12) + '</td><td>' + LqUtils.ConvertUnit(data[len].TNLT12) + '</td></tr>';
                    html += '<tr><td>Chi phí hoạt động</td><td>' + LqUtils.ConvertUnit(data[len - 1].CPHD13) + '</td><td>' + LqUtils.ConvertUnit(data[len].CPHD13) + '</td></tr>';
                    html += '<tr><td>+Tổng LN trước thuế</td><td>' + LqUtils.ConvertUnit(data[len - 1].TLNTT2) + '</td><td>' + LqUtils.ConvertUnit(data[len].TLNTT2) + '</td></tr>';
                    html += '<tr><td>+Tổng LN sau thuế</td><td>' + LqUtils.ConvertUnit(data[len - 1].TLNST2) + '</td><td>' + LqUtils.ConvertUnit(data[len].TLNST2) + '</td></tr>';
                    html += '<tr><td>Chỉ số ROA</td><td>' + LqUtils.Pow((data[len - 1].TLNST2 / data[len - 1].TTS3 * 100), 2) + '%</td><td>' + LqUtils.Pow((data[len].TLNST2 / data[len].TTS3 * 100), 2) + '%</td></tr>';
                    html += '<tr><td>Chỉ số ROE</td><td>' + LqUtils.Pow((data[len - 1].TLNST2 / data[len - 1].V_CQ5 * 100), 2) + '%</td><td>' + LqUtils.Pow((data[len].TLNST2 / data[len].V_CQ5 * 100), 2) + '%</td></tr>';
                    html += '<tr class="title-tr"><td>Tài sản</td><td>' + data[len - 1].SinceVal + '</td><td>' + data[len].SinceVal + '</td></tr>';
                    html += '<tr><td><b>+Tổng tài sản</b></td><td>' + LqUtils.ConvertUnit(data[len - 1].TTS3) + '</td><td>' + LqUtils.ConvertUnit(data[len].TTS3) + '</td></tr>';
                    html += '<tr><td>-Tiền, vàng gửi & cho vay TCTD</td><td>' + LqUtils.ConvertUnit(data[len - 1].TVG_CV31) + '</td><td>' + LqUtils.ConvertUnit(data[len].TVG_CV31) + '</td></tr>';
                    html += '<tr><td>-Tiền cho vay KH</td><td>' + LqUtils.ConvertUnit(data[len - 1].TCV32) + '</td><td>' + LqUtils.ConvertUnit(data[len].TCV32) + '</td></tr>';
                    html += '<tr><td>-Đầu tư chứng khoán</td><td>' + LqUtils.ConvertUnit(data[len - 1].DTCK33) + '</td><td>' + LqUtils.ConvertUnit(data[len].DTCK33) + '</td></tr>';
                    html += '<tr><td>-Góp vốn đầu tư dài hạn</td><td>' + LqUtils.ConvertUnit(data[len - 1].DTDH34) + '</td><td>' + LqUtils.ConvertUnit(data[len].DTDH34) + '</td></tr>';
                    html += '<tr><td>-Tài sản cố định và tài sản khác</td><td>' + LqUtils.ConvertUnit(data[len - 1].TSCD_TSK35) + '</td><td>' + LqUtils.ConvertUnit(data[len].TSCD_TSK35) + '</td></tr>';
                    html += '<tr><td><b>+Tổng nợ phải trả*</b></td><td>' + LqUtils.ConvertUnit(data[len - 1].TNPT4) + '</td><td>' + LqUtils.ConvertUnit(data[len].TNPT4) + '</td></tr>';
                    html += '<tr><td>-Tiền gửi và vay TCTD khác</td><td>' + LqUtils.ConvertUnit(data[len - 1].TG_VK41) + '</td><td>' + LqUtils.ConvertUnit(data[len].TG_VK41) + '</td></tr>';
                    html += '<tr><td>-Tiền gửi của khách hàng</td><td>' + LqUtils.ConvertUnit(data[len - 1].TGCKH42) + '</td><td>' + LqUtils.ConvertUnit(data[len].TGCKH42) + '</td></tr>';
                    html += '<tr><td>-Khoản nợ khác</td><td>' + LqUtils.ConvertUnit(data[len - 1].KNK43) + '</td><td>' + LqUtils.ConvertUnit(data[len].KNK43) + '</td></tr>';
                    html += '<tr><td><b>+Vốn và các quỹ</b></td><td>' + LqUtils.ConvertUnit(data[len - 1].V_CQ5) + '</td><td>' + LqUtils.ConvertUnit(data[len].V_CQ5) + '</td></tr>';
                    html += '<tr><td>-Vốn của tổ chức tín dụng</td><td>' + LqUtils.ConvertUnit(data[len - 1].VTCTD51) + '</td><td>' + LqUtils.ConvertUnit(data[len].VTCTD51) + '</td></tr>';
                    html += '<tr><td>-Lợi nhuận chưa phân phối</td><td>' + LqUtils.ConvertUnit(data[len - 1].LNCPP52) + '</td><td>' + LqUtils.ConvertUnit(data[len].LNCPP52) + '</td></tr>';

                    html += '<tr class="title-tr"><td>Cơ cấu nợ</td><td>' + data[len - 1].SinceVal + '</td><td>' + data[len].SinceVal + '</td></tr>';
                    html += '<tr><td>+Chất lượng nợ cho vay</td><td></td><td>' + LqUtils.ConvertUnit(data[len].NDTC61 + data[len].NCCY62 + data[len].NDTC63 + data[len].NNN64 + data[len].NCKNMV65) + '</td></tr>';
                    html += '<tr><td>-Nợ đủ tiêu chuẩn</td><td>' + LqUtils.ConvertUnit(data[len - 1].NDTC61) + '</td><td>' + LqUtils.ConvertUnit(data[len].NDTC61) + '</td></tr>';
                    html += '<tr><td>-Nợ cần chú ý</td><td>' + LqUtils.ConvertUnit(data[len - 1].NCCY62) + '</td><td>' + LqUtils.ConvertUnit(data[len].NCCY62) + '</td></tr>';
                    html += '<tr><td>-Nợ dưới tiêu chuẩn</td><td>' + LqUtils.ConvertUnit(data[len - 1].NDTC63) + '</td><td>' + LqUtils.ConvertUnit(data[len].NDTC63) + '</td></tr>';
                    html += '<tr><td>-Nợ nghi ngờ</td><td>' + LqUtils.ConvertUnit(data[len - 1].NNN64) + '</td><td>' + LqUtils.ConvertUnit(data[len].NNN64) + '</td></tr>';
                    html += '<tr><td>-Nợ có khả năng mất vốn</td><td>' + LqUtils.ConvertUnit(data[len - 1].NCKNMV65) + '</td><td>' + LqUtils.ConvertUnit(data[len].NCKNMV65) + '</td></tr>';

                    html += '<tr><td><b>+Dư nợ theo thời gian</b></td><td></td><td>' + LqUtils.ConvertUnit(data[len].NNH71 + data[len].NTH72 + data[len].NDH73) + '</td></tr>';
                    html += '<tr><td>-Nợ ngắn hạn</td><td>' + LqUtils.ConvertUnit(data[len - 1].NNH71) + '</td><td>' + LqUtils.ConvertUnit(data[len].NNH71) + '</td></tr>';
                    html += '<tr><td>-Nợ trung hạn</td><td>' + LqUtils.ConvertUnit(data[len - 1].NTH72) + '</td><td>' + LqUtils.ConvertUnit(data[len].NTH72) + '</td></tr>';
                    html += '<tr><td>-Nợ dài hạn</td><td>' + LqUtils.ConvertUnit(data[len - 1].NDH73) + '</td><td>' + LqUtils.ConvertUnit(data[len].NDH73) + '</td></tr>';

                    $("#" + idRender).html(html);
                    CompanyMobi.clickInfomationFinancial();
                    if (fn) fn();
                }
                
            });
            getInfomationFinancialBank.run();
        } else if (financialTag == "Funds") {
            console.log("Quỹ đầu tư");
            var getInfomationFinancialOfFunds = new Servicemobi('CompanyProfile/GetFinancialOfFundsBy', { CompanyId: companyId, Type: type, PageIndex: page }, function (data) {
                if (data == undefined || data == "") {
                    alert('Hết thông tin tài chính');
                    CompanyMobi.params["page"]--;
                } else {
                    var len = data.length - 1;
                    html = '<table class="tb-team"><thead></tr><tr><th style="height:30px;line-height:10px;" colspan="2"><button id="by-quarter">Theo quý</button><button id="by-year">Theo năm</button></th><th style="line-height:10px;"><span class="pre-next-financical"><img src="http://lequang.vn//LqIframe/profileCompany/Content/dist/previous.png" id="pre-financical"/><img src="http://lequang.vn//LqIframe/profileCompany/Content/dist/next.png" id="next-financical"/></span></th></tr></thead><tbody>';
                    html += '<tr class="title-tr"><td>Kết quả kinh doanh</td><td>' + data[len - 1].SinceVal + '</td><td>' + data[len].SinceVal + '</td></tr>';
                    html += '<tr><td>Thu nhập từ HĐ đầu tư đã TH</td><td>' + LqUtils.ConvertUnit(data[len - 1].TNTHĐT) + '</td><td>' + LqUtils.ConvertUnit(data[len].TDT) + '</td></tr>';
                    html += '<tr><td>Tổng chi phí</td><td>' + LqUtils.ConvertUnit(data[len - 1].TCP) + '</td><td>' + LqUtils.ConvertUnit(data[len].DTTBH) + '</td></tr>';
                    html += '<tr><td>Lãi/lỗ từ HDĐT chưa TH</td><td>' + LqUtils.ConvertUnit(data[len - 1].LLTHDKD) + '</td><td>' + LqUtils.ConvertUnit(data[len].LNTBH) + '</td></tr>';
                    html += '<tr><td>Chỉ số ROA</td><td>' + LqUtils.Pow(data[len - 1].TNTHĐT / data[len - 1].TTS * 100, 2) + '%</td><td>' + LqUtils.Pow(data[len].TLNST / data[len].TTS * 100, 2) + '%</td></tr>';
                    html += '<tr><td>Chỉ số ROE</td><td>' + LqUtils.Pow(data[len - 1].TCP / data[len - 1].TM_TDT * 100, 2) + '%</td><td>' + LqUtils.Pow(data[len].TLNST / data[len].VCSH * 100, 2) + '%</td></tr>';
                    html += '<tr class="title-tr"><td colspan="3">Tài sản</td></tr>';
                    html += '<tr><td>Tổng tài sản</td><td>' + LqUtils.ConvertUnit(data[len - 1].TTS) + '</td><td>' + LqUtils.ConvertUnit(data[len].TTS) + '</td></tr>';
                    html += '<tr><td>Tiền mặt & tương đương tiền</td><td>' + LqUtils.ConvertUnit(data[len - 1].TM_TDT) + '</td><td>' + LqUtils.ConvertUnit(data[len].NNH) + '</td></tr>';
                    html += '<tr class="title-tr"><td>Đầu tư trái phiếu</td><td></td><td></td></tr>';
                    html += '<tr><td>Đầu tư cổ phiếu niêm yết</td><td>' + LqUtils.ConvertUnit(data[len - 1].DTCPNY) + '</td><td>' + LqUtils.ConvertUnit(data[len].VCSH) + '</td></tr>';
                    html += '<tr><td>Đầu tư cổ phiếu chưa niêm yết</td><td>' + LqUtils.ConvertUnit(data[len - 1].DTCPCNY) + '</td><td>' + LqUtils.ConvertUnit(data[len].VCSH) + '</td></tr>';
                    html += '<tr><td>Tổng số đơn vị quỹ</td><td>' + LqUtils.ConvertUnit(data[len - 1].TSDVQ) + '</td><td>' + LqUtils.ConvertUnit(data[len].VCSH) + '</td></tr>';
                    html += '<tr><td>Giá trị của một đơn vị quỹ</td><td>' + LqUtils.ConvertUnit(data[len - 1].GT1DVQ) + '</td><td>' + LqUtils.ConvertUnit(data[len].VCSH) + '</td></tr>';
                    html += '</tbody></table>';
                    $("#" + idRender).html(html);
                    CompanyMobi.clickInfomationFinancial();
                }
                if (fn) fn();
            });
            getInfomationFinancialOfFunds.run();
        } else if (financialTag == "Insurance") {
            console.log("Bảo hiểm");
            var getInfomationFinancialOfInsurance = new Servicemobi('CompanyProfile/GetFinancialOfInsuranceBy', { CompanyId: companyId, Type: type, PageIndex: page }, function (data) {
                if (data == undefined ||data=="") {
                    alert('Hết thông tin tài chính');
                    CompanyMobi.params["page"]--;
                } else {
                    var len = data.length - 1;
                    html = '<table class="tb-team"><thead></tr><tr><th style="height:30px;line-height:10px;" colspan="2"><button id="by-quarter">Theo quý</button><button id="by-year">Theo năm</button></th><th style="line-height:10px;"><span class="pre-next-financical"><img src="http://lequang.vn//LqIframe/profileCompany/Content/dist/previous.png" id="pre-financical"/><img src="http://lequang.vn//LqIframe/profileCompany/Content/dist/next.png" id="next-financical"/></span></th></tr></thead><tbody>';
                    html += '<tr class="title-tr"><td>Kết quả kinh doanh</td><td>' + data[len - 1].SinceVal + '</td><td>' + data[len].SinceVal + '</td></tr>';
                    html += '<tr><td>Tổng doanh thu</td><td>' + LqUtils.ConvertUnit(data[len - 1].TDT) + '</td><td>' + LqUtils.ConvertUnit(data[len].TDT) + '</td></tr>';
                    html += '<tr><td>Doanh thu thuần HĐKD BH</td><td>' + LqUtils.ConvertUnit(data[len - 1].DTTBH) + '</td><td>' + LqUtils.ConvertUnit(data[len].DTTBH) + '</td></tr>';
                    html += '<tr><td>Lợi nhuận thuần từ HĐKD BH</td><td>' + LqUtils.ConvertUnit(data[len - 1].LNTBH) + '</td><td>' + LqUtils.ConvertUnit(data[len].LNTBH) + '</td></tr>';
                    html += '<tr><td>Lợi nhuận từ HĐTC</td><td>' + LqUtils.ConvertUnit(data[len - 1].LNTHDTC) + '</td><td>' + LqUtils.ConvertUnit(data[len].LNTHDTC) + '</td></tr>';
                    html += '<tr><td>Tổng lợi nhuận trước thuế</td><td>' + LqUtils.ConvertUnit(data[len - 1].TLNTT) + '</td><td>' + LqUtils.ConvertUnit(data[len].TLNTT) + '</td></tr>';
                    html += '<tr><td>Lợi nhuận sau thuế</td><td>' + LqUtils.ConvertUnit(data[len - 1].TLNST) + '</td><td>' + LqUtils.ConvertUnit(data[len].TLNST) + '</td></tr>';
                    html += '<tr><td>Chỉ số ROA</td><td>' + LqUtils.Pow(data[len - 1].TLNST / data[len - 1].TTS * 100, 2) + '%</td><td>' + LqUtils.Pow(data[len].TLNST / data[len].TTS * 100, 2) + '%</td></tr>';
                    html += '<tr><td>Chỉ số ROE</td><td>' + LqUtils.Pow(data[len - 1].TLNST / data[len - 1].VCSH * 100, 2) + '%</td><td>' + LqUtils.Pow(data[len].TLNST / data[len].VCSH * 100, 2) + '%</td></tr>';
                    html += '<tr class="title-tr"><td colspan="3">Tài sản</td></tr>';
                    html += '<tr><td>Tổng tài sản lưu động ngắn hạn</td><td>' + LqUtils.ConvertUnit(data[len - 1].TTSLDNH) + '</td><td>' + LqUtils.ConvertUnit(data[len].TTSLDNH) + '</td></tr>';
                    html += '<tr><td>Tổng tài sản</td><td>' + LqUtils.ConvertUnit(data[len - 1].TTS) + '</td><td>' + LqUtils.ConvertUnit(data[len].TTS) + '</td></tr>';
                    html += '<tr><td>Nợ ngắn hạn</td><td>' + LqUtils.ConvertUnit(data[len - 1].NNH) + '</td><td>' + LqUtils.ConvertUnit(data[len].NNH) + '</td></tr>';
                    html += '<tr><td>Tổng nợ</td><td>' + LqUtils.ConvertUnit(data[len - 1].TN) + '</td><td>' + LqUtils.ConvertUnit(data[len].TN) + '</td></tr>';
                    html += '<tr><td>Vốn chủ sở hữu</td><td>' + LqUtils.ConvertUnit(data[len - 1].VCSH) + '</td><td>' + LqUtils.ConvertUnit(data[len].VCSH) + '</td></tr>';
                    html += '</tbody></table>';
                    $("#" + idRender).html(html);
                    CompanyMobi.clickInfomationFinancial();
                }
                if (fn) fn();
            });
            getInfomationFinancialOfInsurance.run();
        } else if (financialTag == "Company") {
            console.log("báo cáo công ty");
            var getInfomationFinancial = new Servicemobi('CompanyProfile/GetFinancialOfCompanyBy', { CompanyId: companyId, Type: type, PageIndex: page }, function (data) {
                if (data == undefined || data == "") {
                    alert('Hết thông tin tài chính');
                    CompanyMobi.params["page"]--;
                    
                }
                else if (data != undefined || data != "" || data != null) {
                    var len = data.length - 1;
                    html = '<table class="tb-team"><thead></tr><tr><th style="height:30px;line-height:10px;" colspan="2"><button id="by-quarter">Theo quý</button><button id="by-year">Theo năm</button></th><th style="line-height:10px;"><span class="pre-next-financical"><img src="http://lequang.vn//LqIframe/profileCompany/Content/dist/previous.png" id="pre-financical"/><img src="http://lequang.vn//LqIframe/profileCompany/Content/dist/next.png" id="next-financical"/></span></th></tr></thead><tbody>';
                    html += '<tr class="title-tr"><td >Kết quả kinh doanh</td><td>' + data[len - 1].SinceVal + '</td><td>' + data[len].SinceVal + '</td></tr>';
                    html += '<tr><td>Tổng doanh thu</td><td>' + LqUtils.ConvertUnit(data[len - 1].TDT) + '</td><td>' + LqUtils.ConvertUnit(data[len].TDT) + '</td></tr>';
                    html += '<tr><td>Tổng lợi nhuận trước thuế</td><td>' + LqUtils.ConvertUnit(data[len - 1].TLNTT) + '</td><td>' + LqUtils.ConvertUnit(data[len].TLNTT) + '</td></tr>';
                    html += '<tr><td>Lợi nhuận thuần từ HĐKD</td><td>' + LqUtils.ConvertUnit(data[len - 1].LNT) + '</td><td>' + LqUtils.ConvertUnit(data[len].LNT) + '</td></tr>';
                    html += '<tr><td>Lợi nhuận ròng(**)</td><td>' + LqUtils.ConvertUnit(data[len - 1].LNR) + '</td><td>' + LqUtils.ConvertUnit(data[len].LNR) + '</td></tr>';
                    html += '<tr><td>Chỉ số ROA</td><td>' + LqUtils.Pow((data[len - 1].LNR / data[len - 1].TTS * 100), 2) + '%</td><td>' + LqUtils.Pow((data[len].LNR / data[len].TTS * 100), 2) + '%</td></tr>';
                    html += '<tr><td>Chỉ số ROE</td><td>' + LqUtils.Pow((data[len - 1].LNR / data[len - 1].VCSH * 100), 2) + '%</td><td>' + LqUtils.Pow((data[len].LNR / data[len].VCSH * 100), 2) + '%</td></tr>';
                    html += '<tr class="title-tr"><td colspan="3">Tài sản</td></tr>';
                    html += '<tr><td>Tổng tài sản lưu động</td><td>' + LqUtils.ConvertUnit(data[len - 1].TTSLDNH) + '</td><td>' + LqUtils.ConvertUnit(data[len].TTSLDNH) + '</td></tr>';
                    html += '<tr><td>Tổng tài sản</td><td>' + LqUtils.ConvertUnit(data[len - 1].TTS) + '</td><td>' + LqUtils.ConvertUnit(data[len].TTS) + '</td></tr>';
                    html += '<tr><td>Nợ ngắn hạn</td><td>' + LqUtils.ConvertUnit(data[len - 1].NNH) + '</td><td>' + LqUtils.ConvertUnit(data[len].NNH) + '</td></tr>';
                    html += '<tr><td>Tổng nợ</td><td>' + LqUtils.ConvertUnit(data[len - 1].TN) + '</td><td>' + LqUtils.ConvertUnit(data[len].TN) + '</td></tr>';
                    html += '<tr><td>Vốn chủ sở hữu</td><td>' + LqUtils.ConvertUnit(data[len - 1].VCSH) + '</td><td>' + LqUtils.ConvertUnit(data[len].VCSH) + '</td></tr>';

                    $("#" + idRender).html(html);
                    CompanyMobi.clickInfomationFinancial();
                    if (fn) fn();
                }
            });
            getInfomationFinancial.run();
        }
        
        /*$("#pre-financical").click(function () {
            page++;
            CompanyMobi.LoadInfomationFinancial("profile-company-id", CompanyMobi.params["idCompany"], 0, page, CompanyMobi.params["FinancialTag"], function () { });
        });
        $("#next-financical").click(function () {
            page--;
            if (page < 0) {
                alert("Hết thông tin tài chính!");
                page = 0;
            } else {
                CompanyMobi.LoadInfomationFinancial("profile-company-id", CompanyMobi.params["idCompany"], 0, page, CompanyMobi.params["FinancialTag"], function () {
                });
            }
        });
        $("#by-quarter").click(function () {
            CompanyMobi.LoadInfomationFinancial("profile-company-id", CompanyMobi.params["idCompany"], 0, page, CompanyMobi.params["FinancialTag"], function () {
            });
        });
        $("#by-year").click(function () {
            CompanyMobi.LoadInfomationFinancial("profile-company-id", CompanyMobi.params["idCompany"], 1, page, CompanyMobi.params["FinancialTag"], function () { });
        });*/
    },


    /*Lịch sử hình thành*/
   LoadHistoryByCompanyId:function (idRender, idCompany, fn) {
       var html = '';
       var getHistoryByCompanyId = new Servicemobi('CompanyProfile/GetCompanyHistory', { CompanyId: idCompany }, function(data) {
           html += '<table class="tb-team tb-simple"><tbody><tr><td colspan="2" style="background-color: #e4e4e4;font-weight: bold;color: black;font-size: 14px;">Thông tin tóm tắt</td></tr>';
           html += '<tr><td width="30%">Nhóm ngành</td><td>' + data.SectorName + '</td></tr>';
           html += '<tr><td>Ngành</td><td>' + data.SubSectorName + '</td></tr>';
           html += '<tr><td>Vốn Điều Lệ</td><td>' + LqUtils.ConvertUnit(data.CharterCapital) + ' đồng</td></tr>';
           html += '<tr><td>Khối lượng niêm yết</td><td>' + LqUtils.ConvertUnit(data.WeightCirculation) + ' cp</td></tr>';
           html += '<tr><td>Khối lượng lưu hành</td><td>' + LqUtils.ConvertUnit(data.WeightListing) + ' cp</td></tr>';
           html += '<tr><td>Tổ chức tư vấn niêm yết</td><td>-' + data.ListedOrganizations.split("::")[0] + ' - MCK:' + data.ListedOrganizations.split("::")[1] + '</td></tr>';
           html += '<tr><td>Tổ chức kiểm toán</td><td>- ' + data.AuditOrganizations.split("::")[0] + '<br/>- ' + data.AuditOrganizations.split("::")[1] + '</td></tr>';
           html += '<tr><td>Địa chỉ</td><td>' + data.Address + '</td></tr>';
           html += '<tr><td>Số điện thoại</td><td>' + data.NumberPhone + '</td></tr>';
           html += '<tr><td>Địa chỉ mail</td><td>' + data.Email + '</td></tr>';
           html += '<tr><td>Trang chủ</td><td>' + data.Website + '</td></tr>';
           html += '<tr><td>Người công bố</td><td>' + data.PersonDisclosure + '</td></tr>';
           html += '<tr><td colspan="2" style="background-color: #e4e4e4;font-weight: bold;color: black;font-size: 14px;">Giới thiệu công ty</td></tr>';
           html += '<tr><td colspan="2">' + data.Introduction + '</td></tr>';

           $("#" + idRender).html(html);
           if (fn) fn();
       });
       getHistoryByCompanyId.run();
   },
    /*Ban lanh dao*/
   LoadLeaderByCompany: function (idRender, companyId, fn) {
       var html = '<table class="tb-team"><thead><tr><th colspan="4" style="background: #B4B4B4;color: black;text-align: left;">Hội đồng quản trị</th></tr><tr><th>Chức vụ</th><th>Họ và tên</th><th></th><th>Tuổi</th></tr></thead><tbody>';
       var html1 = '<table class="tb-team"><thead><tr><th colspan="4" style="background: #B4B4B4;color: black;text-align: left;">Ban giám đốc/Kế toán trưởng</th></tr><tr><th>Chức vụ</th><th>Họ và tên</th><th></th><th>Tuổi</th></tr></thead><tbody>';
       var empty1 = '<table class="tb-team"><thead><tr><th colspan="4" style="background: #B4B4B4;color: black;text-align: left;">Ban giám đốc/Kế toán trưởng</th></tr><tr><th>Chức vụ</th><th>Họ và tên</th><th></th><th>Tuổi</th></tr></thead><tbody></tbody></table>';
       var html2 = '<table class="tb-team"><thead><tr><th colspan="4" style="background: #B4B4B4;color: black;text-align: left;">Ban kiểm soát</th></tr><tr><th>Chức vụ</th><th>Họ và tên</th><th></th><th>Tuổi</th></tr></thead><tbody>';
       var empty2 = '<table class="tb-team"><thead><tr><th colspan="4" style="background: #B4B4B4;color: black;text-align: left;">Ban kiểm soát</th></tr><tr><th>Chức vụ</th><th>Họ và tên</th><th></th><th>Tuổi</th></tr></thead><tbody></tbody></table>';
       var html3 = '<table class="tb-team"><thead><tr><th colspan="4" style="background: #B4B4B4;color: black;text-align: left;">Vị trí khác</th></tr><tr><th>Chức vụ</th><th>Họ và tên</th><th></th><th>Tuổi</th></tr></thead><tbody>';
       var empty3 = '<table class="tb-team"><thead><tr><th colspan="4" style="background: #B4B4B4;color: black;text-align: left;">Vị trí khác</th></tr><tr><th>Chức vụ</th><th>Họ và tên</th><th></th><th>Tuổi</th></tr></thead><tbody></tbody></table>';
       var getLeaderById = new Servicemobi('CompanyProfile/GetLeader', { CompanyId: companyId }, function (data) {
           for (var i in data) {
               var age = new Date().getFullYear() - parseInt(data[i].BirthDay.substring((data[i].BirthDay.length - 4), data[i].BirthDay.length));
               data[i].PhotoCard == "Empty" ? null : data[i].PhotoCard;
               if (age > 100) {
                   age = "";
               }
               if (data[i].LeaderCategoryId == 1)
                   html += '<tr><td>' + data[i].PositionName + '</td><td id="leader-' + data[i].LeaderDetailsId + '"><a>' + data[i].LeaderDetailsName + '</a></td><td><img src="' + LqUtils.CheckImage(data[i].PhotoCard) + '" width="45px" height="50px"/></td><td>' + age + '</td></tr>';
               else if (data[i].LeaderCategoryId == 2)
                   html1 += '<tr><td>' + data[i].PositionName + '</td><td id="leader-' + data[i].LeaderDetailsId + '"><a>' + data[i].LeaderDetailsName + '</a></td><td><img src="' + LqUtils.CheckImage(data[i].PhotoCard) + '" width="45px" height="50px"/></td><td>' + age + '</td></tr>';
               else if (data[i].LeaderCategoryId == 3)
                   html2 += '<tr><td>' + data[i].PositionName + '</td><td id="leader-' + data[i].LeaderDetailsId + '"><a>' + data[i].LeaderDetailsName + '</a></td><td><img src="' + LqUtils.CheckImage(data[i].PhotoCard) + '" width="45px" height="50px"/></td><td>' + age + '</td></tr>';
               else if (data[i].LeaderCategoryId == 4)
                   html3 += '<tr><td>' + data[i].PositionName + '</td><td id="leader-' + data[i].LeaderDetailsId + '"><a>' + data[i].LeaderDetailsName + '</a></td><td><img src="' + LqUtils.CheckImage(data[i].PhotoCard) + '" width="45px" height="50px"/></td><td>' + age + '</td></tr>';
           }
           html += '</tbody></table>';
           html1 += '</tbody></table>';
           html2 += '</tbody></table>';
           html3 += '</tbody></table>';
           if (html1 == empty1)
               html1 = '';
           if (html2 == empty2)
               html2 = '';
           if (html3 == empty3)
               html3 = '';
           $("#" + idRender).html(html + html1+ html2+html3);
           if (fn) fn();
       });
       getLeaderById.run();
       
   },
    /*Co dong so huu*/
    LoadShareHolders:function (idRender, companyId, fn) {
        var html = '<table id="tb-share-holders" class="tb-team"><thead><tr><th>Tên cổ đông</th><th>Số phiếu</th><th width="45px">Tỷ lệ(%)</th><th>Tính đến</th></tr></thead><tbody>';
        var getShareHolder = new Servicemobi('CompanyProfile/GetShareHolders', { CompanyId: companyId }, function (data) {
            for (var i in data) {
                var percent = (data[i].NumStock / CompanyMobi.params["WeightListing"]) * 100;
                html += '<tr><td>' + data[i].ShareHoldersName + '</td><td>' + LqUtils.ConvertUnit(data[i].NumStock) + '</td><td>' + LqUtils.Pow(percent, 2) + '%</td><td>' + data[i].UpToDate + '</td></tr>';
            }
            html += '</tbody></table>';
            html += '<div id="container" style="min-width: 310px; height: 400px; margin: 0 auto"></div>';
            $("#" + idRender).html(html);
            if (fn) fn();
        });
        getShareHolder.run();
    },
    /*cong ty con va lien ket*/
    LoadCompanyChildren : function (idRender, companyId, fn) {
        var html = '<table class="tb-companys-children"><thead><tr><th>Đầu tư vào công ty con</th><th>Vốn góp (tỷ VNĐ)</th><th>Tỷ lệ sở hữu(%)</th></tr></thead><tbody>',
            empty = '<table class="tb-companys-children"><thead><tr><th>Đầu tư vào công ty con</th><th>Vốn góp (tỷ VNĐ)</th><th>Tỷ lệ sở hữu(%)</th></tr></thead><tbody></tbody></table>',
            html1 = '<table class="tb-companys-children"><thead><tr><th>Đầu tư vào công ty liên kết</th><th>Vốn góp (tỷ VNĐ)</th><th>Tỷ lệ sở hữu(%)</th></tr></thead><tbody>',
            empty1 = '<table class="tb-companys-children"><thead><tr><th>Đầu tư vào công ty liên kết</th><th>Vốn góp (tỷ VNĐ)</th><th>Tỷ lệ sở hữu(%)</th></tr></thead><tbody></tbody></table>',
            html2 = '<table class="tb-companys-children"><thead><tr><th>Khoản đầu tư dài hạn khác</th><th>Vốn góp (tỷ VNĐ)</th><th>Tỷ lệ sở hữu(%)</th></tr></thead><tbody>',
            empty2 = '<table class="tb-companys-children"><thead><tr><th>Khoản đầu tư dài hạn khác</th><th>Vốn góp (tỷ VNĐ)</th><th>Tỷ lệ sở hữu(%)</th></tr></thead><tbody></tbody></table>';
        
        var getCompanyChildren = new Servicemobi('CompanyProfile/GetCompanyChildren', { CompanyId: companyId }, function (data) {
            if (data != undefined) {
                for (var i in data) {
                    data[i].ContributedCapital == undefined ? null : data[i].ContributedCapital;
                    if (data[i].TypeName == "Đầu tư vào công ty con") {
                        html += '<tr><td>' + data[i].CompanyChildName + '</td><td>' + LqUtils.ConvertUnit(data[i].ContributedCapital) + '</td><td>' + data[i].OwnedRatio + '%</td></tr>';
                    } else if (data[i].TypeName == "Đầu tư vào công ty liên kết") {
                        html1 += '<tr><td>' + data[i].CompanyChildName + '</td><td>' + LqUtils.ConvertUnit(data[i].ContributedCapital) + '</td><td>' + data[i].OwnedRatio + '%</td></tr>';
                    } else if (data[i].TypeName == "Khoản đầu tư dài hạn khác") {
                        html2 += '<tr><td>' + data[i].CompanyChildName + '</td><td>' + LqUtils.ConvertUnit(data[i].ContributedCapital) + '</td><td>' + data[i].OwnedRatio + '%</td></tr>';
                    }
                }
                html += '</tbody></table>';
                html1 += '</tbody></table>';
                html2 += '</tbody></table>';
                if (html == empty) html = '';
                if (html1 == empty1) html1 = '';
                if (html2 == empty2) html2 = '';
                $("#" + idRender).html(html + html1 + html2);
            }
            if (fn) fn();
        });
        getCompanyChildren.run();
    },

    LoadCompanySector: function (idRender, fn) {
        var html = '<option value="ALL">---Chọn tất cả---</option>';
        var getCompanySector = new Servicemobi('companyprofile/getlqcompanysector', {}, function (data) {
            for (var i in data) {
                html += '<option value=' + data[i].SectorID + '>' + data[i].SectorName + '</option>';
            }
            $("#" + idRender).html(html);
            if (fn) fn();
        });
        getCompanySector.run();
    },
    LoadCompanySectorId :function (idRender, sectorId, level, fn) {
        var html = '<option value="ALL">---Chọn tất cả---</option>';
        var getCompanySectorId = new Servicemobi('companyprofile/getlqcompanysubsector', { sectorid: sectorId, level: level }, function(data) {
            for(var i in data) {
                html += '<option value=' + data[i].SubSectorID + '>' + data[i].SubSectorName + '</option>';
            }
            $("#" + idRender).html(html);
            if(fn) fn();
        });
        getCompanySectorId.run();
    },
    
    LoadCompanySubSector:function (idRender, sectorId, fn) {
        var html = '<option value="ALL">---Chọn tất cả---</option>';
        var getCompanySubSector = new Servicemobi('companyprofile/getlqcompanysubsector', { sectorid: sectorId }, function (data) {
            for (var i in data) {
                html += '<option value=' + data[i].SubSectorID + '>' + data[i].SubSectorName + '</option>';
            }
            $("#" + idRender).html(html);
            if (fn) fn();
        });
        getCompanySubSector.run();
    },
    ClickCompany :function () {
        $(".click-company").click(function () {
            CompanyMobi.params["stockCode"] = $(this).data('codecompany');
            window.location.href = LqUtils.linkweb + "?du-lieu/cong-ty/tq-"+CompanyMobi.params["stockCode"]+"/";
            //$("#body").load('ajax/company/index.htm', function () { });
        });
    },
    LoadDataCompany: function (idRender, stockcode, tradingfloor, sectorid, sector2Id, sector3Id, subSector, page, fn) {
        var html = '<table id="tb-data-companys" class="tb-team"><thead><tr><th width="25px">STT</th><th width="50px;">Mã CK</th><th>Tên công ty</th></tr></thead><tbody>';
        var getDataCompany = new Servicemobi('marketinfoapi/getcompanyindexsview', { stockcode: stockcode, tradingfloor: tradingfloor, sectorid: sectorid, sectorx2id: sector2Id, sectorx3id: sector3Id, subsectorid: subSector, pageindex: page }, function(data) {
            var stt = page * 50 - 49;
            for (var i in data) {
                html += '<tr><td>' + stt + '</td><td data-codecompany="' + data[i].MCK + '" class="click-company">' + data[i].MCK + '</td><td>' + CompanyMobi.LoadCompanybyIdCompany(data[i].MCK) + '</td></tr>';
                stt++;
            }
            html += '</tbody></table>';
            $("#" + idRender).html(html);
            CompanyMobi.ClickCompany();
            if (fn) fn();
        });
        getDataCompany.run();
    },
    CountDataCompany: function (idRender, idPaging, stockcode, tradingfloor, sectorid, sector2Id, sector3Id, subSector, fn) {
        var countData = new Servicemobi('marketinfoapi/getcompanyindexscount', { stockcode: stockcode, tradingfloor: tradingfloor, sectorid: sectorid, sectorx2id: sector2Id, sectorx3id: sector3Id, subsectorid: subSector }, function (ret) {
                var paging = new LqPaging({
                    toHTML: idPaging,
                    extclasses: 'lq-table-width-small',
                    totalRec: ret[1],
                    numRPP: ret[0],
                    numButton: 5,
                    pageSelected: function (i) {
                        CompanyMobi.LoadDataCompany(idRender, stockcode, tradingfloor, sectorid, sector2Id, sector3Id, subSector, (i || 1), function () { });
                    }
                });
                paging.render(1, false);
            if (fn) fn();
        });
        countData.run();
    },
    
    LoadNewsCompanys:function (idRender, stockcode, tradingfloor, eventtype, page, fn) {
        var html = '<div class="pop-detail-news"><div class="title-pop-news"><span>Tin Tức</span><img src="http://lequang.vn/Content/Images/ImageSite/icon-popover-close.png" id="close-pop-news"/></div><div id="content-news-detail"><img src="http://lequang.vn/Content/Images/ImageSite/loader-bert-icon.gif"/ style="padding:45% 0 0 49%;"></div></div><table id="tb-data-companys" class="tb-team"><thead><tr><th width="20px">STT</th><th width="40px;">Mã CK</th><th>Nội dung tin</th><th width="60px;">Ngày đăng</th></tr></thead><tbody>';
        var stt = page * 50 - 49;
        var getNewsCompanys = new Servicemobi('marketinfoapi/getcompanynewsview', { stockcode: stockcode, tradingfloor: tradingfloor, eventtypeid: eventtype, pageindex: page }, function (data) {
            for (var i in data) {
                var imgnew = "";
                if (LqUtils.getFormatDate(data[i].Pd,"d") == LqUtils.timeday) {
                    imgnew = "<img src='http://lequang.vn/Content/Images/Icons/new.gif?7200' />";
                }
                html += '<tr><td>' + stt + '</td><td data-codecompany="' + data[i].MCK + '" class="click-company">' + data[i].MCK + '<br/><i>(' + data[i].Ex + ')<i/></td><td id="news-' + data[i].LinkReference + '" class="view-detail-news">' + data[i].Title + ' ' + imgnew + '</td><td>' + LqUtils.getFormatDate(data[i].Pd) + '</td></tr>';
                stt++;
            }
            html += '</tbody></table>';
            $("#" + idRender).html(html);
            CompanyMobi.ClickCompany();
            
            $(".view-detail-news").click(function () {
                console.log(this);
                var idNews = this.id.split("-")[1];
                $("#content-news-detail").slimscroll({
                    height: '96%',
                    width: '100%'
                });
                CompanyMobi.LoadNewsDetailsView("content-news-detail", idNews, function () {
                    CompanyMobi.ClickCodeCompany("#content-news-detail a");
                });
                $(".pop-detail-news").css("display", "block");
            });
            $("#close-pop-news").click(function () {
                $(".pop-detail-news").css("display", "none");
                LqUtils.IconLoadClock("#content-news-detail", "padding:45% 0 0 49%;");
            });

            if (fn) fn();
        });
        getNewsCompanys.run();
    },
    CountNewsCompanys: function (idRender, idPaging, stockcode, tradingfloor, eventtype, fn) {
        var countNewsCompanys = new Servicemobi('marketinfoapi/getcompanynewscount', { stockcode: stockcode, tradingfloor: tradingfloor, eventtypeid: eventtype }, function (ret) {
            var paging = new LqPaging({
                toHTML: idPaging,
                extclasses: 'lq-table-width-small',
                totalRec: ret[1],
                numRPP: ret[0],
                numButton: 5,
                pageSelected: function (i) {
                    CompanyMobi.LoadNewsCompanys(idRender, stockcode, tradingfloor, eventtype, (i || 1), function () { });
                }
            });
            paging.render();
            //CompanyMobi.LoadNewsCompanys(idRender, stockcode, tradingfloor, eventtype, 1, function () { });

            if (fn) fn();
        });
        countNewsCompanys.run();
    },
    LoadEventType: function (idRender, fn) {
        var html = '<option value="99">Chọn tất cả</option>';
        var getEventType = new Servicemobi('lqnews/geteventstypecategory', {}, function (data) {
            for(var i in data) {
                html += '<option value="' + data[i].EventTypeId + '">' + data[i].EventTypeName + '</option>';
            }
            $("#" + idRender).html(html);
            if (fn) fn();
        });
        getEventType.run();
    },
    

    CompanyCache: {
        company: LqUserStatus.Search__dataCompany == null ? undefined : JSON.parse(LqUserStatus.Search__dataCompany),
        project: LqUserStatus.Search__dataProjects == null ? undefined : JSON.parse(LqUserStatus.Search__dataProjects)
    },

    CheckCodeCompanyExist:function (stockCode) {
        for(var i = 0, len = CompanyMobi.CompanyCache["company"].length;i<len;i++) {
            if (CompanyMobi.CompanyCache["company"][i]["C"] == stockCode)
                console.log(CompanyMobi.CompanyCache["company"][i]["C"]);
                return true;
        }
        return false;
    },
    LoadCompanybyIdCompany: function (idCompany) {
        for (var i = 0, len = CompanyMobi.CompanyCache["company"].length; i < len; i++) {
            if (CompanyMobi.CompanyCache["company"][i]["C"] == idCompany) {
                //console.log(CompanyMobi.CompanyCache["company"][i]["C"]);
                return CompanyMobi.CompanyCache["company"][i]["N"];
            }
        }
        return "Không có thông tin";
    },
    LoadIdCompanyBycode:function (code) {
        for (var i = 0, len = CompanyMobi.CompanyCache["company"].length; i < len; i++) {
            if (CompanyMobi.CompanyCache["company"][i]["C"] == code) {
                console.log(CompanyMobi.CompanyCache["company"][i]);
                //console.log(CompanyMobi.CompanyCache["company"][i]["C"]);
                return CompanyMobi.CompanyCache["company"][i]["I"];
            }
        }
        return 0;
    },
    LoadExchangeCompanyBycode: function (code) {
        for (var i = 0, len = CompanyMobi.CompanyCache["company"].length; i < len; i++) {
            if (CompanyMobi.CompanyCache["company"][i]["C"] == code) {
                console.log(CompanyMobi.CompanyCache["company"][i]);
                //console.log(CompanyMobi.CompanyCache["company"][i]["C"]);
                return CompanyMobi.CompanyCache["company"][i]["E"];
            }
        }
        return 0;
    },

    LoadCommodity: function (idRender, fn) {
        var nameCommodity = ["Gold", "Silver", "Copper", "Platinum", "Palladium", "Crude Oil", "Brent Oil", "Natural Gas", "Heating Oil", "London Gas Oil", "Carbon Emissions", "US Wheat", "London Wheat", "US Corn", "US Soybeans", "US Soybean Oil", "US Cotton No.2", "US Cocoa", "London Cocoa", "US Coffee C", "London Coffee", "US Sugar No11", "London Sugar", "Orange Juice", "Live Cattle"];
        var html = '<table class="tb-team"><thead><tr><th colspan="4" style="color:white;background:#666; font-size:18px;line-height:26px;text-align:left;">Giá cả hàng hóa</th></tr><tr><th>Tên</th><th>Tiền(USD)</th><th>Thay đổi(USD)</th><th>Thay đổi(%)</th></tr></thead></tbody>';
        var getCommodity = new Servicemobi('service/getcommodity', {}, function (data) {
            var str = data;
            var str2 = str;
            var n = str.length;
            var tr3 = str2.substring(0, n - 3);
            var temp = str.substring(n, n - 2);
            var dataTemp = tr3 + temp;
            var json_parsed = JSON.parse(dataTemp);
            json_parsed = json_parsed['Commodity'];

            var color = "color:#f90";
            for (var i in json_parsed) {
                if (json_parsed[i].Changedata > 0) color = "color:green";
                else if (json_parsed[i].Changedata < 0) color = "color:red";
                html += '<tr><td>' + nameCommodity[i] + '</td><td>' + json_parsed[i].price + '</td><td style="' + color + '">' + json_parsed[i].Changedata + '</td><td style="' + color + '">' + json_parsed[i].Perc_change + '</td></tr>';
            }
            html += '</tbody></table>';
            $("#" + idRender).html(html);
            
            if (fn) fn();
        });
        getCommodity.run();
    },
    
    getExchangeRate: function (toHtml) {
        var mappingTitle = {
            'US DOLLAR': 'USD',
            'EURO': 'EURO',
            'BRITISH POUND': 'Bảng Anh',
            'JAPANESE YEN': 'Yên Nhật',
            'AUST.DOLLAR': 'Đô la Úc',
            'CANADIAN DOLLAR': 'Đô la Canada',
            'HONGKONG DOLLAR': 'Đô la Hồng Kông',
            'SINGAPORE DOLLAR': 'Đô la Singapore',
            'THAI BAHT': 'Bạt Thái',
            'SWISS FRANCE': 'SWISS France'
        };
        $("#ExchangeRates").html("<div id='CS-loading' class='lq-loading-div' style='position: relative;width: 300px;margin-left:50%;'><img src='http://lequang.vn/Content/Images/ImageSite/loader-bert-icon.gif' style='margin-top:190px;'></div>");
        var srvgetExchangeRate = new Servicemobi("Service/getExchangeRates", {},
            function (data) {
                var res = "";
                res = '<table class="tb-team tb-thead" style="background:white;margin-top:10px;"><thead><tr><th colspan="3" style="text-align:left">Tỉ giá ngoại tệ</th></tr><tr><th>Tên</th><th>Mua vào</th><th>Bán ra</th></tr> </thead><tbody>';
                if (data != null) {
                    var str = data;
                    var str2 = str;
                    var n = str.length;

                    var tr3 = str2.substring(0, n - 3);
                    var temp = str.substring(n, n - 2);
                    var dataTemp = tr3 + temp;

                    var json_parsed = JSON.parse(dataTemp);
                    json_parsed = json_parsed['ExchangeRates'];

                    for (var j in mappingTitle) {
                        for (var i in json_parsed) {
                            if (j == json_parsed[i].CurrencyName) {
                                if (json_parsed[i].Buy != 0) {
                                    res += '<tr>' + '<td >' + mappingTitle[j] + '</td>' + '<td >' + json_parsed[i].Buy + '</td>' + '<td>' + json_parsed[i].Sell + '</td>' + '</tr>';
                                }
                            }
                        }
                    }
                    res += '</tbody></table>';
                    $('#' + toHtml).html(res);

                } else {
                    $.getJSON("http://vnexpress.net/block/crawler?arrKeys%5B%5D=ty_gia",
                        function (data) {
                            var dataChangeRate = data.ty_gia['data'];
                            for (var a in dataChangeRate) {
                                if (dataChangeRate[a].typename != "Loại ngoại tệ") {
                                    res += '<tr>' + '<td >' + dataChangeRate[a]["typename"] + '</td>' + '<td>' + dataChangeRate[a]["buytm"] + '</td>' + '<td >' + dataChangeRate[a]["sell"] + '</td>' + '</tr>';
                                }
                            }
                            res += '</tbody></table>';
                            $('#' + toHtml).html(res);
                        });
                }
            }
        );
        srvgetExchangeRate.run();
    },


    /*company details*/
    LoadHistoryPrice:function (idRender, idCompany, startDate, endDate, page, fn) {
        var html = '<table class="tb-team"><thead><tr><th>Ngày</th><th>Giá</th><th>Thay đổi</th><th>KL</th><th>GT</th></tr></thead><tbody>';
        var getHistoryPrice = new Servicemobi('lqstockapi/getlqstockpricehistoryview', { stockcode: idCompany, startdate: startDate, enddate: endDate, pageindex: page }, function (data) {
            for (var i in data) {
                var a = LqUtils.Pow((data[i].GDC - data[i].GTC), 2);
                var b = LqUtils.Pow((data[i].GDC - data[i].GTC) / data[i].GTC * 100, 2);
                var date = data[i].NGD.substring(5, 10).split("-")[1]+"-"+data[i].NGD.substring(5, 10).split("-")[0];
                //html += '<tr><td>' + data[i].NGD + '</td><td>' + data[i].GDC + '</td><td>' + (data[i].GDC - data[i].GTD) - + '</td><td>' + data[i].TKLKL + '</td><td>' + data[i].TKLGT + '</td></tr>';
                if(a==0)
                    html += '<tr><td>' + date + '</td><td>' + data[i].GDC + '</td><td style="color:#f90">' + a + '(' + b + '%)</td><td>' + LqUtils.ConvertUnit(data[i].TKLKL) + '</td><td>' + LqUtils.ConvertUnit(data[i].TKLGT) + '</td></tr>';
                else if(a>0)
                    html += '<tr><td>' + date + '</td><td>' + data[i].GDC + '</td><td style="color:green">+' + a + '(+' + b + '%)</td><td>' + LqUtils.ConvertUnit(data[i].TKLKL) + '</td><td>' + LqUtils.ConvertUnit(data[i].TKLGT) + '</td></tr>';
                else if(a<0)
                    html += '<tr><td>' + date + '</td><td>' + data[i].GDC + '</td><td style="color:red">' + a + '(' + b + '%)</td><td>' + LqUtils.ConvertUnit(data[i].TKLKL) + '</td><td>' + LqUtils.ConvertUnit(data[i].TKLGT) + '</td></tr>';
            }
            html += '</tbody></table>';
            $("#" + idRender).html(html);
            if (fn) fn();
        });
        getHistoryPrice.run();
    },
    CountHistoryPrice: function (idCompany, startDate, endDate, page, fn) {
        var getCount = new Servicemobi('lqstockapi/getlqstockpricehistorycount', { stockcode: idCompany, startdate: startDate, enddate: endDate, pageindex: page}, function (data) {
            if (fn) fn(data);
        });
        getCount.run();
    },
    LoadOrderStatic: function (idRender, codeCompany, startDate, endDate, page, fn) {
        var html = '<table class="tb-team"><thead><tr><th>Ngày</th><th>Dư mua</th><th>Dư bán</th><th>Tổng KL</th></tr></thead><tbody>';
        var getOrderStatic = new Servicemobi('lqstockapi/getlqstockorderstatisticview', { stockcode: codeCompany, startdate: startDate, enddate: endDate, pageindex: page }, function (data) {
            for (var i in data) {
                html += '<tr><td>' + LqUtils.getFormatDate(data[i].NGD,"d") + '</td><td>' + LqUtils.ConvertUnit(data[i].KLDM - data[i].TKLKL) + '</td><td>' + LqUtils.ConvertUnit(data[i].KLDB - data[i].TKLKL) + '</td><td>' + LqUtils.ConvertUnit(data[i].TKLKL) + '</td></tr>';
            }
            html += '</tbody></table>';
            $("#" + idRender).html(html);
            if (fn) fn();
        });
        getOrderStatic.run();
    },
    CountOrderStatic: function (codeCompany, startDate, endDate, page, fn) {
        var getCount = new Servicemobi('lqstockapi/getlqstockorderstatisticcount', { stockcode: codeCompany, startdate: startDate, enddate: endDate, pageindex: page }, function (ret) {
            var _lqPaging = new LqPaging({
                toHTML: 'CS-paging',
                extclasses: 'lq-table-width-small',
                totalRec: ret[1],
                numRPP: ret[0],
                numButton: 4,
                pageSelected: function (i) {
                    CompanyMobi.LoadOrderStatic("order-statistic-details", CompanyMobi.params["stockCode"], startDate, endDate, (i || 1), function () { });
                }
            });
            _lqPaging.render();
            //CompanyMobi.LoadOrderStatic("order-statistic-details", CompanyMobi.params["stockCode"], startDate, endDate, 1, function () { });
            if (fn) fn();
        });
        getCount.run();
    },
    /*khop lenh theo lo*/
    //http://lequang.vn/api/lqstockapi/getlqstockbatchmatchingrtsview?stockcode=OGC&exchange=HOSE&datebatch=11/07/2013&
    LoadStockBatchMatching:function (idRender, stockCode, exchange, dateBatch, fn) {
        var html = '';
        var getInformationPrice = new Servicemobi('lqstockapi/getlqstockbatchmatchingrtsview', { stockcode: stockCode, exchange: exchange, datebatch: dateBatch }, function (data) {
            if(exchange=="HOSE") {
                data.GTC = data.GTC * 1000;
                data.GCN = data.GCN * 1000;
                data.GTN = data.GTN * 1000;
                data.GMC = data.GMC * 1000;
                data.GDC = data.GDC * 1000;
            }
            var changePrice = data.GDC - data.GTC;
            var style;
            if (changePrice > 0)
                style = "background-color:green";
            else if (changePrice < 0)
                style = "background-color:red";
            else {
                style = "background-color:#c60";
            }
            html += '<table class="tb-team"><thead><tr><th colspan="2" style="text-align:left; ">Thông tin giá</th></tr>';
            html += '<tr><th width="50%" height="120px" style="color:white;font-size:24px;'+style+'">' + LqUtils.ConvertUnit(data.GDC) + '(VNĐ)</th><th style="color:white;background-color:#666;">'+stockCode+':'+CompanyMobi.LoadCompanybyIdCompany(stockCode)+'</th></tr></thead><tbody>';
            html += '<tr><td>Tham chiếu</td><td>' + LqUtils.ConvertUnit(data.GTC) + '</td></tr>';
            html += '<tr><td>Giá cao nhất</td><td>' + LqUtils.ConvertUnit(data.GCN) + '</td></tr>';
            html += '<tr><td>Giá thấp nhất</td><td>' + LqUtils.ConvertUnit(data.GTN) + '</td></tr>';
            html += '<tr><td>Giá mở cửa</td><td>' + LqUtils.ConvertUnit(data.GMC) + '</td></tr>';
            html += '<tr><td>Giá đóng cửa</td><td>' + LqUtils.ConvertUnit(data.GDC) + '</td></tr>';
            if (changePrice > 0) {
                html += '<tr><td>Thay đổi</td><td style="color:green">+' + LqUtils.Pow(changePrice, 2) + '(+' + LqUtils.Pow(changePrice / data.GTC * 100, 2) + '%)</td></tr>';
                
            }
            if (changePrice < 0) {
                html += '<tr><td>Thay đổi</td><td style="color:red">' + LqUtils.Pow(changePrice, 2) + '(' + LqUtils.Pow(changePrice / data.GTC * 100, 2) + '%)</td></tr>';
                
            }
            if(changePrice==0) {
                html += '<tr><td>Thay đổi</td><td style="#f90">' + LqUtils.Pow(changePrice, 2) + '(' + LqUtils.Pow(changePrice / data.GTC * 100, 2) + '%)</td></tr>';
                
            }
            html += '<tr><td>Khối lượng</td><td>' + LqUtils.ConvertUnit(data.TKLKL) + '</td></tr>';
            html += '</tbody></table>';
            CompanyMobi.PriceYesterday = data.GTC;
            $("#" + idRender).html(html);
            if (fn) fn();
        });
        getInformationPrice.run();
    },
    //http://lequang.vn/api/lqstockapi/getlqstockbatchmatchingrt?stockcode=OGC&exchange=HOSE&datebatch=11/08/2013&
    LoadDetailsBatchMatching: function (idRender, stockCode, exchange, dateBatch, fn) {
        console.log("test load");
        var dataIndexStock = [];
        var dataVolumeStock = [];
        var html = '<table id="tb-details-batch"><thead><tr><th width="21%"></th><th width="19%"></th><th width="20%"></th><th width="18%"></th><th width="22%"></th></tr></thead><tbody>';
        var getDetailsBatchMatching = new Servicemobi('lqstockapi/getlqstockbatchmatchingrt', { stockcode: stockCode, exchange: exchange, datebatch: dateBatch }, function (data) {
            var unit;
            exchange == "HOSE" ? unit = 1000 : unit=1;
            for (var i = data.length - 1; i >= 0; i--) {
                var changePrice = data[i].LAST * unit - CompanyMobi.PriceYesterday;
                if(changePrice>0) {
                    html += '<tr><td>' + LqUtils.getFormatDate(data[i].NGD, "t") + '</td><td>' + LqUtils.ConvertUnit(data[i].LAST * unit) + '</td><td style="color:green">+' + LqUtils.ConvertUnit(changePrice) + '(+' + LqUtils.Pow(changePrice / CompanyMobi.PriceYesterday * 100, 2) + '%)</td><td>' + LqUtils.ConvertUnit(data[i].LASTVOL) + '</td><td>' + LqUtils.ConvertUnit(data[i].NMM) + '</td></tr>';
                } else if(changePrice<0) {
                    html += '<tr><td>' + LqUtils.getFormatDate(data[i].NGD, "t") + '</td><td>' + LqUtils.ConvertUnit(data[i].LAST * unit) + '</td><td style="color:red">' + LqUtils.ConvertUnit(changePrice) + '(' + LqUtils.Pow(changePrice / CompanyMobi.PriceYesterday * 100, 2) + '%)</td><td>' + LqUtils.ConvertUnit(data[i].LASTVOL) + '</td><td>' + LqUtils.ConvertUnit(data[i].NMM) + '</td></tr>';
                } else {
                    html += '<tr><td>' + LqUtils.getFormatDate(data[i].NGD, "t") + '</td><td>' + LqUtils.ConvertUnit(data[i].LAST * unit) + '</td><td style="color:#f90">' + LqUtils.ConvertUnit(changePrice) + '(' + LqUtils.Pow(changePrice / CompanyMobi.PriceYesterday * 100, 2) + '%)</td><td>' + LqUtils.ConvertUnit(data[i].LASTVOL) + '</td><td>' + LqUtils.ConvertUnit(data[i].NMM) + '</td></tr>';
                }
            }
            for (var j in data) {
                var dateTime = new Date(data[j].NGD.substring(0, 4), parseInt(data[j].NGD.substring(5, 7))-1, data[j].NGD.substring(8, 10), data[j].NGD.substring(11, 13), data[j].NGD.substring(8, 10), data[j].NGD.substring(14, 16), data[j].NGD.substring(17, 19), data[j].NGD.substring(20, 23));
                var time = dateTime.getTime();
                dataIndexStock.push([
                    time,
                    parseFloat(LqUtils.Pow(data[j].LAST*unit, 0))
                ]);
                dataVolumeStock.push([
                    time,
                    LqUtils.Pow(data[j].LASTVOL, 1)
                ]);
            }
            console.log(dataIndexStock);
            console.log(dataVolumeStock);
            html += '</tbody></table>';
            $("#" + idRender).html(html);

            $('#' + idRender + "-charts").highcharts('StockChart', {
                title: {
                    text: 'Biểu đồ kỹ thuật '+stockCode,
                },

                scrollbar: {
                    enabled: false
                },
                navigator: {
                    enabled: false
                },
                
                yAxis: [{
                        title: {
                            text: 'Giá'
                        },
                        plotLines: [{ value: dataIndexStock[0][1], color: '#FF751A', dashStyle: 'shortdash', width: 2, label: { text: '' } }],
                        height: 210,
                        lineWidth: 2
                    }, {
                        title: {
                            text: 'Khối lượng'
                        },
                        top: 260,
                        height: 100,
                        offset: 0,
                        lineWidth: 0
                    }],

                legend: {
                    enabled: false
                },
                xAxis: {
                    type: 'datetime',
                    dateTimeLabelFormats: {
                        second: '%H:%M:%S',
                        minute: '%H:%M',
                        hour: '%H:%M',
                        day: '%e. %b',
                        week: '%e. %b',
                        month: '%b \'%y',
                        year: '%Y'
                    },
                    gapGridLineWidth: 1,
                    enabled: false
                },

                rangeSelector: {
                    buttons: [{
                            type: 'minute',
                            count: 1,
                            text: '1m'
                        },
                        {
                            type: 'minute',
                            count: 5,
                            text: '5m'
                        }],
                    selected: 1,
                    inputEnabled: false,
                    
                    enabled: false
                },

                series: [{
                        name: 'Giá',
                        data: dataIndexStock,
                        type: 'line',
                        threshold: null,
                        tooltip: {
                            valueDecimals: 0
                        },
                        /*fillColor: {
                            linearGradient: {
                                x1: 0,
                                y1: 0,
                                x2: 0,
                                y2: 1
                            },
                            stops: [[0, Highcharts.getOptions().colors[0]], [1, 'rgba(0,0,0,0)']]
                        }*/
                    }, {
                        type: 'column',
                        name: 'Khối lượng',
                        data: dataVolumeStock,
                        yAxis: 1,
                        color: 'rgba(255, 80, 80, 0.8);'
                    }]
            });

            if (fn) fn();
        });
        getDetailsBatchMatching.run();
    },

    /*Giao dịch khối ngoại*/
    LoadStockTrading:function (idRender, idCompany, startDate, endDate, page, fn) {
        var html = '<table class="tb-team"><thead><tr><th>Ngày</th><th>KL Mua</th><th>KL Bán</th><th>Room còn lại</th></tr></thead>';
        var getStockTrading = new Servicemobi('lqstockapi/getlqstocktradingforeignview', { stockcode: idCompany, startdate: startDate, enddate: endDate, pageindex: page }, function (data) {
            for (var i in data) {
                html += '<tr><td>' + LqUtils.getFormatDate(data[i].NGD, "d") + '</td><td>' + LqUtils.ConvertUnit(data[i].MUAKL) + '</td><td>' + LqUtils.ConvertUnit(data[i].BANKL) + '</td><td>' + LqUtils.ConvertUnit(data[i].ROOM) + '</td></tr>';
            }
            html += '</tbody></table>';
            if (fn) fn();
            $("#" + idRender).html(html);
        });
        getStockTrading.run();
    },
    //http://lequang.vn/api/lqstockapi/getlqstocktradingforeigncount?stockcode=OGC&startdate=04/13/2013&enddate=11/13/2013&pageindex=1&
    CountStockTrading: function (idRender, idPaging, stockCode, startDate, endDate, fn) {
        var countPaging = new Servicemobi('lqstockapi/getlqstocktradingforeigncount', {stockcode:stockCode,startdate:startDate,enddate:endDate}, function(ret) {
            var paging = new LqPaging({
                toHTML: idPaging,
                extclasses: 'lq-table-width-small',
                totalRec: ret[1],
                numRPP: ret[0],
                numButton: 4,
                pageSelected: function (i) {
                    LqUtils.IconLoadClock("#" + idRender, "padding:70px 48%");
                    CompanyMobi.LoadStockTrading(idRender, stockCode, startDate, endDate, (i || 1), function () { });
                }
            });
            paging.render(1, false);
            //CompanyMobi.LoadStockTrading(idRender, stockCode, startDate, endDate, 1, function () { });
            if (fn) fn();
        });
        countPaging.run();
    },

    /*Click company*/
    ClickCodeCompany: function (render) {
        $(render).attr("href", function () {
            if (this.href == "http://link-company/") {
                $(this).removeAttr("target").removeAttr("href");
                $(this).css("color", "blue");
                $(this).click(function () {
                    CompanyMobi.params["stockCode"] = this.innerHTML;
                    window.location.href = LqUtils.linkweb + "?du-lieu/cong-ty/tq-" + CompanyMobi.params["stockCode"] + "/";
                    //$("#body").load('ajax/company/index.htm', function () { });
                });
            } else if (this.href.indexOf("http://lequang.vn/") != -1) {
                $(this).attr("target", "_parent");
                var linkMobile = this.href.replace("http://lequang.vn/", LqUtils.linkweb+"?");
                $(this).attr("href", linkMobile);
            }
        });
            
    },

}
