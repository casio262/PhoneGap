var News = {
    mappingIdCategory: { "TTCK": "Chứng khoán", "DN": "Doanh nghiệp", "BDS": "Bất động sản", "TCNH": "Tài chính ngân hàng", "TCTG": "Tài chính thế giới", "KTDT": "Kinh tế đầu tư", "HH": "Hàng hóa", "TTSK": "Tin tức sự kiện", "TN": "Thuật ngữ", "KD": "Kinh doanh", "DNN": "Doanh nhân", "PTDT": "Phân tích đầu tư", "CN": "Công nghệ", "GT": "Giải trí", "KTKD": "Kiến thức kinh doanh", "TH": "Thương hiệu", "KTBDS": "Kiến thức BĐS" },
    mappingSubCategory: {
        "DN": [{ "DNNY": "Doanh nghiệp niêm yết" }, { "DNCNY": "Doanh nghiệp chưa niêm yết" }],

        "BDS": [{ "TTBDS": "Thị trường BĐS" }, { "SBDS": "Sàn bất động sản" }, { "DABDS": "Dự án BĐS" }, { "KTBDS": "Kiến thức BĐS" }],
        "KTBDS": [{ "LDD": "Luật đất đai" }, { "NNT": "Nội ngoại thất" }, { "KTD": "Kiến trúc đẹp" }, { "BGD": "Bảng giá đất" }],

        "TCNH": [{ "TTNH": "Tin tức ngân hàng" }, { "CSTT": "Chính sách tiền tệ" }, { "ATM": "Bản đồ ATM" }, { "LS": "Lãi suất" }],
        "TCTG": [{ "HK": "Hoa Kỳ" }, { "CAU": "Châu Âu" }, { "CAA": "Châu Á" }, { "TC": "Toàn cầu" }],
        "KTDT": [{ "VM": "Vĩ mô" }, { "NN": "Nông nghiệp" }, { "CN": "Công nghiệp" }, { "DV": "Dịch vụ" }],
        "HH": [{ "V_KL": "Vàng - Kim loại" }, { "NL": "Năng lượng" }, { "VLXD": "Vật liệu xây dựng" }, { "NTS": "Nông thủy sản" }, { "HTD": "Hàng tiêu dùng" }, { "TMXNK": "Xuất nhập khẩu" }],

        "TTSK": [{ "XH": "Xã hội" }, { "TG": "Thế giới" }, { "KH": "Khoa học" }, { "CN": "Công nghệ" }, { "QP": "Quốc phòng" }, { "SK": "Sức khỏe" }, { "GT": "Giải trí" }, { "THT": "Thể thao" }],
        "GT": [{ "SAO": "Sao" }, { "DL": "Du lịch" }],
        "CN": [{ "DT": "Điện thoại" }, { "MT": "Máy tính" }, { "PKA": "Phụ kiện âm thanh" }, { "ICT": "Tin ICT" }],

        "KD": [{ "KTKD": "Kiến thức kinh doanh" }, { "TH": "Thương hiệu" }, { "MAK": "Marketing" }, { "HLG": "Học làm giàu" }],
        "KTKD": [{ "TCKD": "Tài chính" }, { "KTH": "Kinh tế học" }, { "QTKD": "Quản trị kinh doanh" }, { "LKD": "Luật kinh doanh" }, { "TLH": "Tâm lý học" }, { "KN": "Khởi nghiệp" }],
        "TH": [{ "TTTH": "Tin tức thương hiệu" }, { "KTTH": "Kiến thức thương hiệu" }, { "THVN": "Thương hiệu Việt Nam" }, { "THTG": "Thương hiệu thế giới" }],

        "DNN": [{ "DNVN": "Doanh nhân Việt Nam" }, { "DNTG": "Doanh nhân thế giới" }],
        "PTDT": [{ "PPDT": "Phương pháp đầu tư" }, { "PTN": "Phân tích ngành" }, { "YTDT": "Ý tưởng đầu tư" }, { "BCPT": "Báo cáo phân tích" }],
    },
    GroupAndCategory: ["CN", "GT", "KTBDS", "KTKD", "TH"],
    /*Load category on select*/
    LoadSubCategory: function(idSelect, idCategory, idSubCategory, fn) {
        var html = '';
        if (idSubCategory != undefined) {
            for (var i in News.mappingSubCategory[idCategory]) {
                for (var j in News.mappingSubCategory[idCategory][i]) {
                    if (j == idSubCategory) {
                        html += '<option value=' + j + ' selected="selected">' + News.mappingSubCategory[idCategory][i][j] + '</option>';
                    } else {
                        html += '<option value=' + j + '>' + News.mappingSubCategory[idCategory][i][j] + '</option>';
                    }
                }
            }
        } else {
            html = '<option value="0">Chọn danh mục</option>';
            for (var m in News.mappingSubCategory[idCategory]) {
                for (var n in News.mappingSubCategory[idCategory][m]) {
                    html += '<option value=' + n + '>' + News.mappingSubCategory[idCategory][m][n] + '</option>';
                }
            }
        }
        $("#" + idSelect).html(html);
        News.SelectMenuChange(idSelect, function() {});
        if (fn) fn();
    },
    SelectMenuChange:function (idSelect, fn) {
        $("#" + idSelect).change(function () {
            var selectVal = $(this).val();
            if (selectVal == "GT" || selectVal == "KTBDS" || selectVal == "KTKD" || selectVal == "TH") {
                News.group = selectVal;
                for (var o in LqUtils.hrefGroup) {
                    if (o == News.group) {
                        var linkwebmobi = LqUtils.linkweb + LqUtils.hrefGroup[o];
                        window.location.href = linkwebmobi;
                    }
                }
            } else if (News.group == "TTSK" && selectVal == "CN") {
                News.group = selectVal;
                for (var o2 in LqUtils.hrefGroup) {
                    if (o2 == News.group) {
                        var linkwebmobi2 = LqUtils.linkweb + LqUtils.hrefGroup[o2];
                        window.location.href = linkwebmobi2;
                    }
                }
            } else if (selectVal == 0) {
            } else {
                News.category = selectVal;
                var subCategory = News.group + "/" + News.category;
                
                for (var l in LqUtils.linkOrther) {
                    if (subCategory == LqUtils.linkOrther[l]) {
                        window.location.href = LqUtils.linkweb + l;
                    }
                }

                for (var s in LqUtils.hrefMapping) {
                    if (subCategory == s) {
                        window.location.href = LqUtils.linkweb + LqUtils.hrefMapping[s];
                    }
                }
            }
        });
        if (fn) fn();
    },
    ClickTitleTop:function (titleTop, fn) {
        $("."+titleTop).attr("data-group", News.group);
        $("." + titleTop).text("<< "+News.mappingIdCategory[News.group]);
        $("." + titleTop).click(function () {
            console.log(News.group);
            if (News.group == "TN" || News.group == "TTCK") {
                News.category = News.group;
                window.location.href = LqUtils.linkweb;
            } else {
                for (var i in LqUtils.hrefGroup) {
                    if (News.group == i) {
                        console.log("i:"+i);
                        window.location.href = LqUtils.linkweb + LqUtils.hrefGroup[i];
                    }
                }
            }
        });
        if (fn) fn();
    },
    ClickId: function() {
        $(".idnews").click(function() {
            if ($(this).data('id'))
                News.id = $(this).data('id');
            if ($(this).data('category'))
                News.category = $(this).data('category');
            if ($(this).data('group'))
                News.group = $(this).data('group');
            $(".title-category").click(function() {
                if ($(this).data('group'))
                    News.group = $(this).data('group');
                if ($(this).data('category'))
                    News.category = $(this).data('category');
            });

            var codeLink = News.group + "/" + News.category;
            console.log("linkss:"+codeLink);
            for (var i in LqUtils.hrefMapping) {
                if (i == codeLink)
                    window.location.href = LqUtils.linkweb + LqUtils.hrefMapping[i] + "tin-" + News.id + "/";
            }
            //$("#body").load("ajax/detail-news.htm");
        });
    },

    ClickTitleCategory: function() {
        $(".title-category-click").bind('click', function () {
            var categoryId = $(this).data('category');
            if ($(this).data('category') == "TTCK" || $(this).data('category')=="TN") {
                News.group = $(this).data('category');
            }
            var idMapping = News.group + "/" + categoryId;
            for (var i in LqUtils.hrefMapping) {
                if(idMapping==i) {
                    window.location.href = LqUtils.linkweb + LqUtils.hrefMapping[i];
                }
            }
            
            for(var e in LqUtils.linkOrther) {
                if (idMapping == LqUtils.linkOrther[e]) {
                    console.log(News.group + ":" + News.category);
                    window.location.href = LqUtils.linkweb + e;
                }
            }
        });
    },
    ClickTitleGroup: function() {
        $(".title-group-click").bind('click', function() {
            News.group = $(this).data('group');
            for(var i in LqUtils.hrefGroup) {
                if (News.group == i)
                    window.location.href = LqUtils.linkweb + LqUtils.hrefGroup[i];
            }
            console.log("group: " + News.group);
            //$("#body").load("ajax/category.htm");
        });
    },

    getdetailsbyid: function(id, fn) {
        var html = "";
        var getnewsdetailsbyid = new Servicemobi('lqnews/getnewsdetailsbyid', { newsid: id }, function(data) {
            html = '<time id="NewsReader_PostDate" name="news-group-delay-show" style="display: block;" class="spanTime">' + Mainjs.FormatDateFull(data.PostDate || "0001-01-01T00:00:00") + ' GMT+7' + '</time>';
            html += '<h1 id="NewsReader_Title" class="details-title">' + News.classifyTitle(data.Title).Title + '</h1>';
            html += data.MainContent;
            html += '<div id="NewsReader_Footer" class="news-author"><b>' + Mainjs.FormatUndefined(data.Author.split("::")[0]) + '</b><br><span>' + Mainjs.FormatUndefined(data.Author.split("::")[1]) + '</span></div>';
            html += '<nav id="Tags" name="news-group-delay-show" class="lqLeft tag-list" style="display: block;"> <span class="tagname">Tags: </span><span class="tags-item" id="tags-item"></span></nav>';
            $(".content-detalis").html(html);
            if (News.classifyTitle(data.Title).Tag == "album") {
                var image = $(".content-detalis img");
                $.each(image, function (key, val) {
                    $(this).after('<a style="line-height:22px;">' + val.title + '</a>');
                });
                image.parent().css('padding-bottom', '10px');
            }
            News.GetTagById(id);
            if (fn) fn();
        });
        getnewsdetailsbyid.run();
    },
    GetTagById:function (newId) {
        var html = '';
        var getTagById = new Servicemobi('LQNews/GetTagsByNewsId', { NewsId: newId }, function (data) {
            for(var i in data) {
                html += '<a title="' + data[i].NewsTagName + '" rel="tag" href="' + LqUtils.linkweb + '?chu-de/mathe=' + data[i].NewsTagId + '">' + data[i].NewsTagName + '</a>, ';
            }
            $("#tags-item").html(html.substring(0, html.length-2));
        });
        getTagById.run();
    },
    GetSearchTagById:function (idRender, tagId, page, fn) {
        var html = '', _days;
        var searchTag = new Servicemobi('lqnews/getnewstagsview', { newstagid: tagId, pageindex: page }, function (data) {
            for (var i in data) {
                _days = "";
                if (LqUtils.CompareTwoDays(Mainjs.converToDateTime(data[i].PostDate), new Date()) == false) _days = " | " + LqUtils.getFormatDate(data[i].PostDate, 'd').substring(0, 5);
                html += '<div class="lq-box-focus-content-item"><img src="' + data[i].Artwork + '" alt="' + data[i].Title + '" width="35%" height="auto" class="float-left idnews" data-group="' + data[i].NewsGroupId + '" data-category="' + data[i].NewsCategoryId + '" data-id="' + data[i].NewsId + '"/>';
                html += '<div class="lq-box-focus-content-item-cont"><a class="idnews" data-group="' + data[i].NewsGroupId + '" data-category="' + data[i].NewsCategoryId + '" data-id="' + data[i].NewsId + '">' + data[i].Title + '</a><time>' + LqUtils.getFormatDate(data[i].PostDate, 't').substring(0, 5) + _days + '</time><br/> <span>' + data[i].NewsSummary + '</span></div>';
                html += '</div>';
            }
            $("#" + idRender).html(html);
            News.ClickId();
            if (fn) fn();
        });
        searchTag.run();
    },
    CountTagById:function (id, fn) {
        var countTag = new Servicemobi('lqnews/getnewstagscount', { newstagid: id }, function(data) {
            if (fn) fn(data);
        });
        countTag.run();
    },
    /**/
    classifyTitle : function (Title) {
        var Tag =  Title.split("::")[1] || "--";
        return { Title: Title.split("::")[0].trim(), Tag: Tag.trim() };
    },
    /*Tin moi*/
    GetNewsPost: function (idRender, take, page, fn) {
        var html = '';
        var getnewspost = new Servicemobi('lqnews/GetNewsByPost', {take:take, page:page}, function (data) {
            NewPost.listImage = "";
            if(page==1) {
                html += html += '<div class="box-top-one-new idnews"  data-group="' + data[0].NewsGroupId + '" data-category="' + data[0].NewsCategoryId + '" data-id="' + data[0].NewsId + '"><img id="image-' + data[0].NewsId + '" src="http://192.168.1.88/LQprojects_debug/Content/Images/ImageSite/loading.gif?7200" /><div class="title-image">' + News.classifyTitle(data[0].Title).Title + '<time class="time">' + LqUtils.getFormatDate(data[0].PostDate, 't').substring(0, 5) + '</time></div></div>';
                NewPost.listImage += data[0].NewsId + ',';
                for (var i = 1; i < data.length; i++) {
                    var timepost = data[i].PostDate;
                    html += '<div class="box-one-new idnews"  data-group="' + data[i].NewsGroupId + '" data-category="' + data[i].NewsCategoryId + '" data-id="' + data[i].NewsId + '"><img id="image-' + data[i].NewsId + '" src="http://192.168.1.88/LQprojects_debug/Content/Images/ImageSite/loading.gif?7200" /><div class="title-image">' + News.classifyTitle(data[i].Title).Title + '<time class="time">' + LqUtils.getFormatDate(timepost, 't').substring(0, 5) + '</time></div></div>';
                    NewPost.listImage += data[i].NewsId + ',';
                }
                $("#" + idRender).html(html);
            } else if (page != 1) {
                for (var j in data) {
                    var timepost = LqUtils.getFormatDate(data[j].PostDate, 't').substring(0, 5);
                    html += '<div class="box-one-new idnews"  data-group="' + data[j].NewsGroupId + '" data-category="' + data[j].NewsCategoryId + '" data-id="' + data[j].NewsId + '"><img id="image-' + data[j].NewsId + '" src="http://192.168.1.88/LQprojects_debug/Content/Images/ImageSite/loading.gif?7200" /><div class="title-image">' + News.classifyTitle(data[j].Title).Title + '<time class="time">' + timepost + '</time></div></div>';
                    NewPost.listImage += data[j].NewsId + ',';
                }
                $("#" + idRender).append(html);
            }
            if (data == "" || data.length < take) {
                $("#addPageNews").hide();
            }
            if (fn) fn();
        });
        getnewspost.run();
    },
    /*Tin tuc noi bat*/
    GetSuggestsGroup: function (categoryid, subCategory, newId, fn) {
        
        if (LqUtils.readCookie("idNewsRead") == null) {
            LqUtils.createCookie("idNewsRead", newId, 20);
        } else {
            if (LqUtils.readCookie("idNewsRead").indexOf(newId)!=-1) {
                LqUtils.createCookie("idNewsRead", LqUtils.readCookie("idNewsRead"), 20);
            } else {
                LqUtils.createCookie("idNewsRead", LqUtils.readCookie("idNewsRead") + "_" + newId, 20);
            }
        }
        var html = '';
        html = '<div class="category"><div class="title-category"><div class="text-title"><span id="note-news" class="title-active" style="float:left;width:50%;border-right:2px solid lavender">Tin nổi bật</span><span id="hot-news" style="padding-left:10px;">Tin nóng</span></div>';
        //$.getJSON('http://lequang.vn/api/lqnews/getsuggestsgroupcategory?newsgroupid=' + categoryid + '&newscategoryid=' + subCategory + '&havereaded=' + LqUtils.readCookie("idNewsRead"), function (data) {
        var getsuggestsgroupcategory = new Servicemobi('lqnews/getsuggestsgroupcategory', { newsgroupid: categoryid, newscategoryid: subCategory, havereaded: LqUtils.readCookie("idNewsRead") }, function (data) {
            for (var i = 0; i < 6; i++) {
                if (i % 2 == 0) {
                    var days = "", days1 = "";
                    if (LqUtils.CompareTwoDays(LqUtils.converToDateTime(data[i].PostDate), new Date()) == false) days = " | " + LqUtils.getFormatDate(data[i].PostDate, 'd').substring(0, 5);
                    if (LqUtils.CompareTwoDays(LqUtils.converToDateTime(data[i + 1].PostDate), new Date()) == false) days1 = " | " + LqUtils.getFormatDate(data[i+1].PostDate, 'd').substring(0, 5);
                    var complexTitle1 = News.classifyTitle(data[i].Title), complexTitle2 = News.classifyTitle(data[i + 1].Title);
                    html += '<div class="clear"><div class="top2-left idnews" data-id="' + data[i].NewsId + '" data-group="' + data[i].NewsGroupId + '" data-category="' + data[i].NewsCategoryId + '"><img src="' + data[i].Artwork + '" alt="' + News.classifyTitle(data[i].Title).Title + '" title="' + LqUtils.showTitle(News.classifyTitle(data[i].Title).Title) + '" /><div class="title-image"><a data-tag="' + complexTitle1.Tag + '">' + complexTitle1.Title + "<time class='time'>" + LqUtils.getFormatDate(data[i].PostDate, 't').substring(0,5) + days + "</time>" + '</a></div></div><div class="top2-right idnews" data-id="' + data[i + 1].NewsId + '" data-group="' + data[i + 1].NewsGroupId + '" data-category="' + data[i + 1].NewsCategoryId + '"><img src="' + data[i + 1].Artwork + '"  alt="' + News.classifyTitle(data[i + 1].Title).Title + '" title="' + LqUtils.showTitle(News.classifyTitle(data[i + 1].Title).Title) + '" /><div class="title-image"><a data-tag="' + complexTitle2.Tag + '">' + complexTitle2.Title + "<time class='time'>" + LqUtils.getFormatDate(data[i+1].PostDate, 't').substring(0,5) + days1 + "</time>" + '</a></div></div></div>';
                }
                    
            }
            html += '</div></div>';
            $(".news-note").html(html);
            /*tin nong*/
            $("#hot-news").click(function () {
                News.Getnewshighlightsofday(function () {
                    News.ClickId();
                });
                $("#note-news").removeClass('title-active');
            });
            //$("title-category").attr("data-category", data[0].NewsCategoryId);
            if (fn) fn();
        });
        
        getsuggestsgroupcategory.run();
    },
    /*Tin nong*/
    //http://lequang.vn/api/lqnews/getnewshighlightsofday
    Getnewshighlightsofday:function (fn) {
        var html = '<div class="category"><div class="title-category"><div class="text-title"><span id="note-news" style="float:left;width:50%;border-right:2px solid lavender">Tin nổi bật</span><span id="hot-news" class="title-active" style="padding-left:10px;">Tin nóng</span></div>';
        //$.getJSON('http://192.168.1.99/lqprojects_debug/api/lqnews/getnewshighlightsofday', function (data) {
        var getnewshighlightsofday = new Servicemobi('lqnews/getnewshighlightsofday', { }, function(data) {
            for (var i = 0; i < 6; i++) {
                if (i % 2 == 0) {
                    var days = "", days1="";
                    if (LqUtils.CompareTwoDays(LqUtils.converToDateTime(data[i].PostDate), new Date()) == false) days = " | " + LqUtils.getFormatDate(data[i].PostDate, 'd').substring(0, 5);
                    if (LqUtils.CompareTwoDays(LqUtils.converToDateTime(data[i+1].PostDate), new Date()) == false) days1 = " | " + LqUtils.getFormatDate(data[i+1].PostDate, 'd').substring(0, 5);
                    var complexTitle1 = News.classifyTitle(data[i].Title), complexTitle2 = News.classifyTitle(data[i + 1].Title);
                    html += '<div class="clear"><div class="top2-left idnews" data-id="' + data[i].NewsId + '" data-group="' + data[i].NewsGroupId + '" data-category="' + data[i].NewsCategoryId + '"><img src="' + data[i].Artwork + '" title="' + LqUtils.showTitle(complexTitle1.Title) + '"><div class="title-image"><a data-tag="'+complexTitle1.Tag+'">' + complexTitle1.Title + "<time class='time'>" + LqUtils.getFormatDate(data[i].PostDate, 't').substring(0,5) + days + "</time>" + '</a></div></div><div class="top2-right idnews" data-id="' + data[i + 1].NewsId + '" data-group="' + data[i + 1].NewsGroupId + '" data-category="' + data[i + 1].NewsCategoryId + '"><img src="' + data[i + 1].Artwork + '" alt="' + LqUtils.UnSign(LqUtils.showTitle(complexTitle2.Title)) + '" title="' + LqUtils.showTitle(complexTitle2.Title) + '" /><div class="title-image"><a data-tag="' + complexTitle2.Tag + '">' + complexTitle2.Title + "<time class='time'>" + LqUtils.getFormatDate(data[i + 1].PostDate, 't').substring(0,5) + days1 + "</time>" + '</a></div></div></div>';
                }
            }
            html += '</div></div>';
            $(".news-note").html(html);
            $("#note-news").click(function () {
                News.GetSuggestsGroup(News.group, News.category, News.id, function () {
                    News.ClickId();
                });
                $("#hot-news").removeClass('title-active');
            });
            //$("a").append(":after");
            if(fn)fn();
        });
        getnewshighlightsofday.run();
    },

    /*5 tin trên đầu*/
    getTop3NewsHot: function(categoryid, subcategoryid, fn) {
        var html = '', htmls = '', htmls1 = '';
        var getnewseventsspecialview1 = new Servicemobi('lqnews/getnewseventsspecialview', { newsgroupid: categoryid, newscategoryid: subcategoryid, pageindex: 1 }, function (data) {
            var day = "";
            var complexTitle = News.classifyTitle(data[0].Title);
            if (LqUtils.CompareTwoDays(LqUtils.converToDateTime(data[0].PostDate), new Date()) == false) day = " | " + LqUtils.getFormatDate(data[0].PostDate, 'd').substring(0, 5);
            html += '<img src="' + data[0].Artwork + '" width="250" height="195" alt="' + LqUtils.UnSign(complexTitle.Title) + '" title="' + LqUtils.showTitle(complexTitle.Title) + '">';
            html += '<div class="title-image"><a data-tag="' + complexTitle.Tag + '">' + complexTitle.Title + "<time class='time'>" + LqUtils.getFormatDate(data[0].PostDate, 't').substring(0, 5) + day + "</time>" + '</a></div>';
            $(".top-new-slider").html(html);
            $(".top-new-slider").attr({ "data-group": data[0].NewsGroupId, "data-category": data[0].NewsCategoryId, "data-id": data[0].NewsId });
        });
        getnewseventsspecialview1.run();
        var getnewseventsspecialview2 = new Servicemobi('lqnews/getnewseventsspecialview', { newsgroupid: categoryid, newscategoryid: subcategoryid, pageindex: 2 }, function (data) {
            var day = "";
            var complexTitle = News.classifyTitle(data[0].Title);
            if (LqUtils.CompareTwoDays(LqUtils.converToDateTime(data[0].PostDate), new Date()) == false) day = " | " + LqUtils.getFormatDate(data[0].PostDate, 'd').substring(0, 5);
            htmls += '<div class="top2-left"><img src="' + data[0].Artwork + '" width="250" height="195" alt="' + LqUtils.showTitle(complexTitle.Title) + '" title="' + LqUtils.showTitle(complexTitle.Title) + '" class="idnews" data-group="' + data[0].NewsGroupId + '" data-category="' + data[0].NewsCategoryId + '" data-id="' + data[0].NewsId + '">';
            htmls += '<div class="title-image idnews" data-group="' + data[0].NewsGroupId + '" data-category="' + data[0].NewsCategoryId + '" data-id="' + data[0].NewsId + '"><a>' + data[0].Title + "<time class='time'>" + LqUtils.getFormatDate(data[0].PostDate, 't').substring(0, 5) + day + "</time>" + '</a></div></div>';
            var getnewseventsspecialview5 = new Servicemobi('lqnews/getnewseventsspecialview', { newsgroupid: categoryid, newscategoryid: subcategoryid, pageindex: 5 }, function (data1) {
                var day1 = "";
                var complexTitle1 = News.classifyTitle(data1[0].Title);
                if (LqUtils.CompareTwoDays(LqUtils.converToDateTime(data1[0].PostDate), new Date()) == false) day1 = " | " + LqUtils.getFormatDate(data1[0].PostDate, 'd').substring(0, 5);
                htmls += '<div class="top2-right"><img src="' + data1[0].Artwork + '" width="250" height="195" alt="' + complexTitle1.Title + '" title="' + LqUtils.showTitle(complexTitle1.Title) + '" class="idnews" data-group="' + data1[0].NewsGroupId + '" data-category="' + data1[0].NewsCategoryId + '" data-id="' + data1[0].NewsId + '">';
                htmls += '<div class="title-image idnews" data-group="' + data1[0].NewsGroupId + '" data-category="' + data1[0].NewsCategoryId + '" data-id="' + data1[0].NewsId + '"><a>' + data1[0].Title + "<time class='time'>" + LqUtils.getFormatDate(data1[0].PostDate, 't').substring(0, 5) + day1 + "</time>" + '</a></div></div>';
                $(".top2-new-hot").append(htmls);
            });
            getnewseventsspecialview5.run();
        });

        var getnewseventsspecialview3 = new Servicemobi('lqnews/getnewseventsspecialview', { newsgroupid: categoryid, newscategoryid: subcategoryid, pageindex: 3 }, function (data) {
            var day = "";
            var complexTitle = News.classifyTitle(data[0].Title);
            if (LqUtils.CompareTwoDays(LqUtils.converToDateTime(data[0].PostDate), new Date()) == false) day = " | " + LqUtils.getFormatDate(data[0].PostDate, 'd').substring(0, 5);
            htmls1 += '<div class="top2-right"><img src="' + data[0].Artwork + '" width="250" height="195" alt="' + data[0].Title + '" title="' + data[0].Title + '" class="idnews" data-group="' + data[0].NewsGroupId + '" data-category="' + data[0].NewsCategoryId + '" data-id="' + data[0].NewsId + '">';
            htmls1 += '<div class="title-image idnews" data-group="' + data[0].NewsGroupId + '" data-category="' + data[0].NewsCategoryId + '" data-id="' + data[0].NewsId + '"><a>' + data[0].Title + "<time class='time'>" + LqUtils.getFormatDate(data[0].PostDate, 't').substring(0, 5) + day + "</time>" + '</a></div></div>';
            
            var getnewseventsspecialview4 = new Servicemobi('lqnews/getnewseventsspecialview', { newsgroupid: categoryid, newscategoryid: subcategoryid, pageindex: 4 }, function (data1) {
                var day1 = "";
                var complexTitle1 = News.classifyTitle(data1[0].Title);
                if (LqUtils.CompareTwoDays(LqUtils.converToDateTime(data1[0].PostDate), new Date()) == false) day1 = " | " + LqUtils.getFormatDate(data1[0].PostDate, 'd').substring(0, 5);
                htmls1 += '<div class="top2-left"><img src="' + data1[0].Artwork + '" width="250" height="195" alt="' + complexTitle1.Title + '" title="' + LqUtils.showTitle(complexTitle1.Title) + '" class="idnews" data-group="' + data1[0].NewsGroupId + '" data-category="' + data1[0].NewsCategoryId + '" data-id="' + data1[0].NewsId + '">';
                htmls1 += '<div class="title-image idnews" data-group="' + data1[0].NewsGroupId + '" data-category="' + data1[0].NewsCategoryId + '" data-id="' + data1[0].NewsId + '"><a>' + data1[0].Title + "<time class='time'>" + LqUtils.getFormatDate(data1[0].PostDate, 't').substring(0, 5) + day1 + "</time>" + '</a></div></div>';
                $(".top2-new-hot").append(htmls1);
            });
            getnewseventsspecialview4.run();
            
        });

        getnewseventsspecialview2.run();
        getnewseventsspecialview3.run();
        if (fn) fn();
    },

    loadCategory1: function (idCategory, subCategory, fn) {
        var htmls = "";
        console.log("category: " + subCategory);
        var e = News.GroupAndCategory.indexOf(subCategory);
        if (e == -1) {
            if (subCategory == "DABDS") {
                LandMobi.LoadTitileProjectLand(5, function () {
                    console.log('Load title project land');
                    LandMobi.ClickId();
                });
                if (fn) fn();
            } else if (subCategory == "SBDS") {
                LandMobi.FormSearchLands(undefined, function (fun) {
                    LandMobi.LoadTypeSaleLand("selectTypeHouse", 1, function () {
                    });
                    $("#lq-bnt-searchLandSales").bind('click', function () {
                        $(this).addClass("lq-stock-view-button").removeClass("lq-clear-button");
                        $("#lq-bnt-searchLandforRent").addClass("lq-clear-button").removeClass("lq-stock-view-button");
                        LandMobi.LoadTypeSaleLand("selectTypeHouse", 1, function () {
                        });
                    });
                    $("#lq-bnt-searchLandforRent").bind('click', function () {
                        $(this).addClass("lq-stock-view-button").removeClass("lq-clear-button");
                        $("#lq-bnt-searchLandSales").addClass("lq-clear-button").removeClass("lq-stock-view-button");
                        LandMobi.LoadTypeSaleLand("selectTypeHouse", 2, function () {
                        });
                    });

                    Mainjs.GetProvince("selectProvince", function () {
                        $("#selectProvince").change(function () {
                            Mainjs.GetDistrict("selectDistrict", $(this).val(), function () {
                            });
                        });
                    });

                    $("#lq-bnt-search").click(function () {
                        LandMobi.FloorParams['form'] = $("#selectTypeHouse").attr('name');
                        LandMobi.FloorParams['categoryId'] = $("#selectTypeHouse").val();
                        LandMobi.FloorParams['provinceId'] = $("#selectProvince").val();
                        LandMobi.FloorParams['districtId'] = $("#selectDistrict").val();
                        LandMobi.FloorParams['area'] = $("#slArea").val();
                        LandMobi.FloorParams['price'] = $("#slPrice").val();
                        LandMobi.FloorParams['direction'] = $("#view_direction_house_ads2").val();
                        console.log(LandMobi.FloorParams);
                        $("#body").load("ajax/land/floor-lands.htm");

                    });
                    if (fun) fun();
                });
                if (fn) fn();
            } else if (subCategory == "BGD") {
                if (fn) fn();
            } else if (subCategory == "ATM") {
                FinancialMobi.FormSearchATM(undefined, function () {
                    FinancialMobi.LoadBank("selectBank", function () { });
                    Mainjs.GetProvince("selectProvince", function () {
                        $("#selectProvince").change(function () {
                            Mainjs.GetDistrict("selectDistrict", $(this).val(), function () {
                            });
                        });
                    });
                    $("#search-address-atm").click(function () {
                        FinancialMobi.Params['bankId'] = $("#selectBank").val();
                        FinancialMobi.Params['provinceId'] = $("#selectProvince").val();
                        FinancialMobi.Params['districtId'] = $("#selectDistrict").val();
                        if (FinancialMobi.Params['bankId'] == 0 || FinancialMobi.Params['provinceId'] == 0) {
                            alert('Yêu cầu nhập đủ ngân hàng và tỉnh thành');
                        } else {
                            window.location.href = '?tai-chinh-ngan-hang/ban-do-atm/nh=' + FinancialMobi.Params['bankId'] + '&tp=' + FinancialMobi.Params['provinceId'] + '&qh=' + FinancialMobi.Params['districtId'];
                        }
                    });
                    if (fn) fn();
                });
            } else if (subCategory == "LS") {
                FinancialMobi.FormInterestRateDeposit(1, true, 1, 10, function () {
                    var pagenow = 1;
                    $("#addPage").click(function () {
                        pagenow++;
                        FinancialMobi.PageInteresRateDeposit(1, true, pagenow, function () { });
                        //FinancialMobi.FormInterestRateDeposit(1, true, pagenow, 5, function () { });
                        console.log(pagenow);
                    });
                    console.log("Lai suat:" + News.mappingSubCategory[idCategory].length);
                    if (fn) fn();
                });
            } else if (subCategory == "BCPT") {
                        
                if (fn) fn();
            } else if (subCategory == "GT" || (subCategory == "CN"&&idCategory=="TTSK") || subCategory == "KTBDS" || subCategory == "TH" || subCategory == "KTKD") {
                var get12Newsbygroup = new Servicemobi('lqnews/get12newsbygroupid', { newsgroupid: subCategory }, function (data) {
                    var day = "", day1 = "";
                    if (LqUtils.CompareTwoDays(LqUtils.converToDateTime(data[0].PostDate), new Date()) == false) day = " | " + LqUtils.getFormatDate(data[0].PostDate, 'd').substring(0, 5);
                    if (LqUtils.CompareTwoDays(LqUtils.converToDateTime(data[1].PostDate), new Date()) == false) day1 = " | " + LqUtils.getFormatDate(data[1].PostDate, 'd').substring(0, 5);
                    htmls = '<div class="text-title title-group-click" data-group="' + subCategory + '">' + News.mappingIdCategory[subCategory] + '</div><div class="title-category" data-category="' + data[0].NewsCategoryId + '"><div class="top2-left idnews" data-id="' + data[0].NewsId + '" data-group="' + data[0].NewsGroupId + '" data-category="' + data[0].NewsCategoryId + '"><img src="' + data[0].Artwork + '" title="' + LqUtils.showTitle(News.classifyTitle(data[0].Title).Title) + '"><div class="title-image"><a data-tag="' + News.classifyTitle(data[0].Title).Tag + '">' + News.classifyTitle(data[0].Title).Title + "<time class='time'>" + LqUtils.getFormatDate(data[0].PostDate, 't').substring(0, 5) + day + "</time>" + '</a></div></div>';
                    htmls += '<div class="top2-right idnews" data-id="' + data[1].NewsId + '" data-group="' + data[1].NewsGroupId + '" data-category="' + data[1].NewsCategoryId + '"><img src="' + data[1].Artwork + '" title="' + LqUtils.showTitle(News.classifyTitle(data[1].Title).Title) + '"><div class="title-image"><a data-tag="' + News.classifyTitle(data[1].Title).Tag + '">' + News.classifyTitle(data[1].Title).Title + "<time class='time'>" + LqUtils.getFormatDate(data[1].PostDate, 't').substring(0, 5) + day1 + "</time>" + '</a></div></div>';
                    htmls += '<div class="news-sub-3">';
                    for (var k = 2; k < 5; k++) {
                        var day2 = "";
                        if (LqUtils.CompareTwoDays(LqUtils.converToDateTime(data[k].PostDate), new Date()) == false) day2 = " | " + LqUtils.getFormatDate(data[k].PostDate, 'd').substring(0, 5);
                        var complexTitle = News.classifyTitle(data[k].Title);
                        htmls += '<span class="idnews" data-id="' + data[k].NewsId + '" data-group="' + data[k].NewsGroupId + '" data-category="' + data[k].NewsCategoryId + '"><a data-tag="' + complexTitle.Tag + '">' + complexTitle.Title + "<time class='time'>" + LqUtils.getFormatDate(data[k].PostDate, 't').substring(0, 5) + day2 + "</time>" + '</a></span>';
                    }
                    htmls += '</div></div>';
                    $("#category").append(htmls);
                    if (fn) fn();
                });
                get12Newsbygroup.run();
            } else {
                var get12NewsByCateGoryid = new Servicemobi('lqnews/get12newsbycategoryid', { newscategoryid: subCategory }, function (data) {
                    var day = "", day1="";
                    if (LqUtils.CompareTwoDays(LqUtils.converToDateTime(data[0].PostDate), new Date()) == false) day = " | " + LqUtils.getFormatDate(data[0].PostDate, 'd').substring(0, 5);
                    if (LqUtils.CompareTwoDays(LqUtils.converToDateTime(data[1].PostDate), new Date()) == false) day1 = " | " + LqUtils.getFormatDate(data[1].PostDate, 'd').substring(0, 5);
                    htmls = '<div class="text-title title-category-click" data-category="' + subCategory + '">' + Mainjs.NameCategory(News.group, data[0].NewsCategoryId) + '</div><div class="title-category" data-category="' + data[0].NewsCategoryId + '"><div class="top2-left idnews" data-id="' + data[0].NewsId + '" data-group="' + data[0].NewsGroupId + '" data-category="' + data[0].NewsCategoryId + '"><img src="' + data[0].Artwork + '" title="' + LqUtils.showTitle(News.classifyTitle(data[0].Title).Title) + '" alt="'+LqUtils.UnSign(News.classifyTitle(data[0].Title).Title)+'"><div class="title-image"><a data-tag="'+News.classifyTitle(data[0].Title).Tag+'">' + News.classifyTitle(data[0].Title).Title +"<time class='time'>" + LqUtils.getFormatDate(data[0].PostDate, 't').substring(0, 5) + day + "</time>"+ '</a></div></div>';
                    htmls += '<div class="top2-right idnews" data-id="' + data[1].NewsId + '" data-group="' + data[1].NewsGroupId + '" data-category="' + data[1].NewsCategoryId + '"><img src="' + data[1].Artwork + '" title="' + LqUtils.showTitle(News.classifyTitle(data[1].Title).Title) + '" alt="' + LqUtils.UnSign(News.classifyTitle(data[1].Title).Title) + '"><div class="title-image"><a data-tag="' + News.classifyTitle(data[1].Title).Tag + '">' + News.classifyTitle(data[1].Title).Title + "<time class='time'>" + LqUtils.getFormatDate(data[1].PostDate, 't').substring(0, 5) + day1 + "</time>" + '</a></div></div>';
                    htmls += '<div class="news-sub-3">';
                    for (var k = 2; k < 5; k++) {
                        var day2 = "";
                        if (LqUtils.CompareTwoDays(LqUtils.converToDateTime(data[k].PostDate), new Date()) == false) day2 = " | " + LqUtils.getFormatDate(data[k].PostDate, 'd').substring(0, 5);
                        var complexTitle = News.classifyTitle(data[k].Title);
                        htmls += '<span class="idnews" data-id="' + data[k].NewsId + '" data-group="' + data[k].NewsGroupId + '" data-category="' + data[k].NewsCategoryId + '"><a data-tag="'+complexTitle.Tag+'">' + complexTitle.Title + "<time class='time'>" + LqUtils.getFormatDate(data[k].PostDate, 't').substring(0, 5) + day2 + "</time>" + '</a></span>';
                    }
                    htmls += '</div></div>';
                    $("#category").append(htmls);
                    if (fn) fn();
                });
                get12NewsByCateGoryid.run();
            }
        } else if (e != -1) {
            var get12Newsbygroupid = new Servicemobi('lqnews/get12newsbygroupid', { newsgroupid: subCategory }, function (data) {
                htmls = '<div class="text-title title-category-click" data-category="' + data[0].NewsGroupId + '">' + Mainjs.NameCategory(News.group, data[0].NewsGroupId) + '</div><div class="title-category" name="' + data[0].NewsGroupId + '"><div class="top2-left idnews" data-id="' + data[0].NewsId + '" data-group="' + data[0].NewsGroupId + '" data-category="' + data[0].NewsCategoryId + '"><img src="' + data[0].Artwork + '" class=""><div class="title-image"><a>' + data[0].Title + '</a></div></div>';
                htmls += '<div class="top2-right idnews" data-id="' + data[1].NewsId + '"><img src="' + data[1].Artwork + '"><div class="title-image"><a>' + News.classifyTitle(data[1].Title).Title + '</a></div></div>';
                htmls += '<div class="news-sub-3">';
                for (var m = 2; m < 5; m++) {
                    var complexTitle = News.classifyTitle(data[m].Title);
                    htmls += '<span class="idnews" data-id="' + data[m].NewsId + '" data-group="' + data[m].NewsGroupId + '" data-category="' + data[m].NewsCategoryId + '"><a>' + complexTitle.Title + '</a></span>';
                }
                htmls += '</div></div>';
                $("#category").append(htmls);
                if (fn) fn();
            });
            get12Newsbygroupid.run();
        }
    },
    
    loadCategory: function(idCategory, fn) {
        var count = 0;
        var htmls = "";
        for (var i in News.mappingSubCategory[idCategory]) {
            for (var j in News.mappingSubCategory[idCategory][i]) {
                console.log("category: " + j);
                var e = News.GroupAndCategory.indexOf(j);
                if (e == -1) {
                    if (j == "DABDS") {
                        count++;
                        LandMobi.LoadTitileProjectLand(5, function() {
                            console.log('Load title project land');
                            LandMobi.ClickId();
                        });
                        if (count == News.mappingSubCategory[idCategory].length) {
                            if (fn) fn();
                        }
                    } else if (j == "SBDS") {
                        count++;
                        //LandMobi.FloorParams = LandMobi.StringFloorParams;
                        LandMobi.FormSearchLands(undefined, function (fun) {
                            LandMobi.LoadTypeSaleLand("selectTypeHouse", 1, function() {
                            });
                            $("#lq-bnt-searchLandSales").bind('click', function() {
                                $(this).addClass("lq-stock-view-button").removeClass("lq-clear-button");
                                $("#lq-bnt-searchLandforRent").addClass("lq-clear-button").removeClass("lq-stock-view-button");
                                LandMobi.LoadTypeSaleLand("selectTypeHouse", 1, function() {
                                });
                            });
                            $("#lq-bnt-searchLandforRent").bind('click', function() {
                                $(this).addClass("lq-stock-view-button").removeClass("lq-clear-button");
                                $("#lq-bnt-searchLandSales").addClass("lq-clear-button").removeClass("lq-stock-view-button");
                                LandMobi.LoadTypeSaleLand("selectTypeHouse", 2, function() {
                                });
                            });

                            Mainjs.GetProvince("selectProvince", function() {
                                $("#selectProvince").change(function() {
                                    Mainjs.GetDistrict("selectDistrict", $(this).val(), function() {
                                    });
                                });
                            });

                            $("#lq-bnt-search").click(function() {
                                LandMobi.FloorParams['form'] = $("#selectTypeHouse").attr('name');
                                LandMobi.FloorParams['categoryId'] = $("#selectTypeHouse").val();
                                LandMobi.FloorParams['provinceId'] = $("#selectProvince").val();
                                LandMobi.FloorParams['districtId'] = $("#selectDistrict").val();
                                LandMobi.FloorParams['area'] = $("#slArea").val();
                                LandMobi.FloorParams['price'] = $("#slPrice").val();
                                LandMobi.FloorParams['direction'] = $("#view_direction_house_ads2").val();
                                console.log(LandMobi.FloorParams);
                                $("#body").load("ajax/land/floor-lands.htm");
                                
                            });
                            if (fun) fun();
                        });
                        if (count == News.mappingSubCategory[idCategory].length) {
                            if (fn) fn();
                        }
                    } else if (j == "BGD") {
                        count++;
                        //$("#body").load("ajax/financial/price-land.htm");
                        if (count == News.mappingSubCategory[idCategory].length) {
                            if (fn) fn();
                        }
                    } else if (j == "ATM") {
                        count++;
                        FinancialMobi.FormSearchATM(undefined, function() {
                            FinancialMobi.LoadBank("selectBank", function() {});
                            Mainjs.GetProvince("selectProvince", function() {
                                $("#selectProvince").change(function() {
                                    Mainjs.GetDistrict("selectDistrict", $(this).val(), function() {
                                    });
                                });
                            });
                            $("#search-address-atm").click(function() {
                                FinancialMobi.Params['bankId'] = $("#selectBank").val();
                                FinancialMobi.Params['provinceId'] = $("#selectProvince").val();
                                FinancialMobi.Params['districtId'] = $("#selectDistrict").val();
                                if(FinancialMobi.Params['bankId']==0||FinancialMobi.Params['provinceId']==0) {
                                    alert('Yêu cầu nhập đủ ngân hàng và tỉnh thành');
                                } else {
                                    $("#body").load("ajax/financial/atm.htm");
                                }
                            });
                            if (count == News.mappingSubCategory[idCategory].length) {
                                if (fn) fn();
                            }
                        });
                    } else if (j == "LS") {
                        count++;
                        FinancialMobi.FormInterestRateDeposit(1, true, 1, 10, function () {
                            var pagenow = 1;
                            $("#addPage").click(function () {
                                pagenow++;
                                FinancialMobi.PageInteresRateDeposit(1, true, pagenow, function () {});
                                //FinancialMobi.FormInterestRateDeposit(1, true, pagenow, 5, function () { });
                                console.log(pagenow);
                            });
                            console.log("Lai suat:" + count + ":" + News.mappingSubCategory[idCategory].length);
                            if (count == News.mappingSubCategory[idCategory].length) {
                                if (fn) fn();
                            }
                        });
                    }else if(j=="BCPT") {
                        
                    }else {
                        var get12NewsByCateGoryid = new Servicemobi('lqnews/get12newsbycategoryid', { newscategoryid: j }, function(data) {
                            count++;
                            htmls = '<div class="text-title title-category-click" data-category="' + data[0].NewsCategoryId + '">' + Mainjs.NameCategory(News.group, data[0].NewsCategoryId) + '</div><div class="title-category" data-category="' + data[0].NewsCategoryId + '"><div class="top2-left idnews" data-id="' + data[0].NewsId + '" data-group="' + data[0].NewsGroupId + '" data-category="' + data[0].NewsCategoryId + '"><img src="' + data[0].Artwork + '" class=""><div class="title-image"><a>' + data[0].Title + '</a></div></div>';
                            htmls += '<div class="top2-right idnews" data-id="' + data[1].NewsId + '"><img src="' + data[1].Artwork + '"><div class="title-image"><a>' + News.classifyTitle(data[1].Title).Title + '</a></div></div>';
                            htmls += '<div class="news-sub-3">';
                            for (var k = 2; k < 5; k++) {
                                var complexTitle = News.classifyTitle(data[k].Title);
                                htmls += '<a class="idnews" data-id="' + data[k].NewsId + '" data-group="' + data[k].NewsGroupId + '" data-category="' + data[k].NewsCategoryId + '">' + complexTitle.Title + '</a>';
                            }
                            htmls += '</div></div>';
                            $("#category").append(htmls);
                            console.log("count1:" + count);
                            if (count == News.mappingSubCategory[idCategory].length) {
                                if (fn) fn();
                            }
                        });
                        get12NewsByCateGoryid.run();
                    }
                } else if (e != -1) {
                    var get12Newsbygroupid = new Servicemobi('lqnews/get12newsbygroupid', { newsgroupid: j }, function(data) {
                        count++;
                        htmls = '<div class="text-title title-category-click" data-category="' + data[0].NewsGroupId + '">' + Mainjs.NameCategory(News.group, data[0].NewsGroupId) + '</div><div class="title-category" name="' + data[0].NewsGroupId + '"><div class="top2-left idnews" data-id="' + data[0].NewsId + '" data-group="' + data[0].NewsGroupId + '" data-category="' + data[0].NewsCategoryId + '"><img src="' + data[0].Artwork + '" class=""><div class="title-image"><a>' + data[0].Title + '</a></div></div>';
                        htmls += '<div class="top2-right idnews" data-id="' + data[1].NewsId + '"><img src="' + data[1].Artwork + '"><div class="title-image"><a>' + data[1].Title + '</a></div></div>';
                        htmls += '<div class="news-sub-3">';
                        for (var m = 2; m < 5; m++) {
                            htmls += '<a class="idnews" data-id="' + data[m].NewsId + '" data-group="' + data[m].NewsGroupId + '" data-category="' + data[m].NewsCategoryId + '">' + data[m].Title + '</a>';
                        }
                        htmls += '</div></div>';
                        $("#category").append(htmls);
                        console.log("count:" + count);
                        if (count == News.mappingSubCategory[idCategory].length) {
                            if (fn) fn();
                        }
                    });
                    get12Newsbygroupid.run();
                }
            }
        }
    },
    /*arrayHome : ["TTCK", "DN", "BDS", "TCNH", "TCTG", "KTDT", "HH", "TTSK", "KD", "DNN"],*/
    LoadNewsHomeByGroup: function(idGroup, fn) {
        var html = '';
        console.log(idGroup);
        var get6Newshomebygroupid = new Servicemobi('lqnews/get6newshomebygroupid', { newsgroupid: idGroup }, function (data) {
            var day0 = "", day1="";
            if (LqUtils.CompareTwoDays(LqUtils.converToDateTime(data[0].PostDate), new Date()) == false) day0 = " | " + LqUtils.getFormatDate(data[0].PostDate, 'd').substring(0, 5);
            if (LqUtils.CompareTwoDays(LqUtils.converToDateTime(data[1].PostDate), new Date()) == false) day1 = " | " + LqUtils.getFormatDate(data[1].PostDate, 'd').substring(0, 5);
            if(idGroup=="TTCK"||idGroup=="TN") {
                html = '<div class="text-title title-category-click" data-group="' + idGroup + '" data-category="' + idGroup + '">' + News.mappingIdCategory[idGroup] + '</div><div class="title-category" data-group="' + idGroup + '"><div class="top2-left idnews" data-id="' + data[0].NewsId + '" data-group="' + data[0].NewsGroupId + '" data-category="' + data[0].NewsCategoryId + '"><img id="image-' + data[0].NewsId + '" src="http://lequang.vn/Content/Images/ImageSite/loading.gif?7200" style="min-height:92px;"/><div class="title-image"><a data-tag="' + News.classifyTitle(data[0].Title).Tag + '">' + News.classifyTitle(data[0].Title).Title + "<time class='time'>" + LqUtils.getFormatDate(data[0].PostDate, 't').substring(0, 5) + day0 + "</time>" + '</a></div></div>';
            } else {
                html = '<div class="text-title title-group-click" data-group="' + idGroup + '">' + News.mappingIdCategory[idGroup] + '</div><div class="title-category" data-group="' + idGroup + '"><div class="top2-left idnews" data-id="' + data[0].NewsId + '" data-group="' + data[0].NewsGroupId + '" data-category="' + data[0].NewsCategoryId + '"><img id="image-' + data[0].NewsId + '" src="http://lequang.vn/Content/Images/ImageSite/loading.gif?7200" style="min-height:92px;" title="' + LqUtils.showTitle(News.classifyTitle(data[0].Title).Title) + '" /><div class="title-image" ><a data-tag="' + News.classifyTitle(data[0].Title).Tag + '">' + News.classifyTitle(data[0].Title).Title + "<time class='time'>" + LqUtils.getFormatDate(data[0].PostDate, 't').substring(0, 5) + day0 + "</time>" + '</a></div></div>';
            }
            html += '<div class="top2-right idnews" data-id="' + data[1].NewsId + '" data-group="' + data[1].NewsGroupId + '" data-category="' + data[1].NewsCategoryId + '"><img id="image-' + data[1].NewsId + '" style="min-height:92px;" title="' + LqUtils.showTitle(News.classifyTitle(data[1].Title).Title) + '" src="http://lequang.vn/Content/Images/ImageSite/loading.gif?7200" /><div class="title-image"><a data-tag="' + News.classifyTitle(data[1].Title).Tag + '">' + News.classifyTitle(data[1].Title).Title + "<time class='time'>" + LqUtils.getFormatDate(data[1].PostDate, 't').substring(0, 5) + day1 + "</time>" + '</a></div></div>';
            html += '<div class="news-sub-3">';
            for (var m = 2; m < 5; m++) {
                var days = "";
                if (LqUtils.CompareTwoDays(LqUtils.converToDateTime(data[m].PostDate), new Date()) == false) days = " | " + LqUtils.getFormatDate(data[m].PostDate, 'd').substring(0, 5);
                html += '<span class="idnews" data-id="' + data[m].NewsId + '" data-group="' + data[m].NewsGroupId + '" data-category="' + data[m].NewsCategoryId + '"><a data-tag="' + News.classifyTitle(data[m].Title).Tag + '">' + News.classifyTitle(data[m].Title).Title + "<time class='time'>" + LqUtils.getFormatDate(data[m].PostDate, 't').substring(0, 5) + days + "</time>" + '</a></span>';
            }
            html += '</div></div>';
            if (idGroup == "TTCK") {
                for (var l = 0; l < 2; l++) {
                    News.listIdImageStock += data[l].NewsId + ",";
                }
            } else {
                for (var j = 0; j < 2; j++) {
                    News.listIdImage += data[j].NewsId + ",";
                }
            }

            $("#category").append(html);
            if (fn) fn();
        });
        get6Newshomebygroupid.run();
        /*if (i<News.arrayHome.length) {
            var get6Newshomebygroupid = new Servicemobi('lqnews/get6newshomebygroupid', { newsgroupid: News.arrayHome[i] }, function (data) {
                html = '<div class="text-title title-group-click" data-group="' + data[0].NewsGroupId + '">' + News.mappingIdCategory[data[0].NewsGroupId] + '</div><div class="title-category" data-group="' + data[0].NewsGroupId + '"><div class="top2-left idnews" data-id="' + data[0].NewsId + '" data-category="' + data[0].NewsCategoryId + '"><img id="image-' + data[0].NewsId + '" style="min-height:92px;"/><div class="title-image"><a>' + data[0].Title + '</a></div></div>';
                html += '<div class="top2-right idnews" data-id="' + data[1].NewsId + '"  data-category="' + data[1].NewsCategoryId + '"><img id="image-' + data[1].NewsId + '" style="min-height:92px;" /><div class="title-image"><a>' + data[1].Title + '</a></div></div>';
                html += '<div class="news-sub-3">';
                for (var m = 2; m < 5; m++) {
                    html += '<a class="idnews" data-id="' + data[m].NewsId + '" data-group="' + data[m].NewsGroupId + '" data-category="' + data[m].NewsCategoryId + '">' + data[m].Title + '</a>';
                }
                html += '</div></div>';
                count++;
                for (var j = 0; j < 5; j++) {
                    News.listIdImage += data[j].NewsId + ",";
                }
                $("#category").append(html);
                if (count == News.arrayHome.length) {
                    if (fn) fn();
                }
            });
            console.log(i);
            console.log(News.arrayHome[i]);
            get6Newshomebygroupid.run(undefined, undefined, undefined, function () {
                i++;
            });
            
        }*/
    },

    LoadImageByListId: function(listIdImage) {
        var getlistimage = new Servicemobi('lqnews/getlistimagenewsbylistnewsid', { listnewsid: listIdImage }, function(data) {
            for (var i in data) {
                $("#image-" + data[i].NewsId).attr("src", LqUtils.CheckImage(data[i].Artwork));
            }
        });
        getlistimage.run();
    },
    /*tra cuu thuat ngu*/
    GetTerminolog: function (idRender, key, page, fn) {
        var getTerminolog = new Servicemobi('lqterminology/getsearchterminologyview', { vietnamterm: key, pageindex: page }, function(data) {
            var html = '<div class="text-title title-group-click" style="margin:0;">Tra cứu thuật ngữ<input type="search" results="5" name="search-terminology" placeholder="Thuật ngữ..." id="search-terminology" class="search-terminology" ></div><table id="tb-termonolog"><thead><tr><th width="50%">Tiếng việt</th><th>Tiếng anh</th></tr></thead><tbody>';
            for(var i in data) {
                html += '<tr class="idnews" data-id="' + data[i].NewsId + '"><td>' + data[i].VietNamTerm + '</td><td>' + data[i].EnglishTerm + '</td></tr>';
            }
            html += '</tbody></table>';
            $("#" + idRender).html(html);
            $("#search-terminology").bind("change", function () {
                key = $(this).val();
                if (key == "") key = "ALL";
                News.GetTerminolog1(key, page, function () { });
            }).on('keyup', function () {
                $(this).trigger('change');
            }).on('focus', function () {
                //$('#TermCode').addClass('aterminology-tab-search-hover');
            }).on('blur', function () {
                //$('#TermCode').removeClass('aterminology-tab-search-hover');
            });
            if (fn) fn();
            
        });
        getTerminolog.run();
    },
    GetTerminolog1: function (key, page, fn) {
        var getTerminolog = new Servicemobi('lqterminology/getsearchterminologyview', { vietnamterm: key, pageindex: page }, function(data) {
            var html = '<thead><tr><th width="50%">Tiếng việt</th><th>Tiếng anh</th></tr></thead><tbody>';
            for (var i in data) {
                html += '<tr class="idnews" data-id="' + data[i].NewsId + '"><td>' + LqUtils.MatchingWordSearch(key, data[i].VietNamTerm,undefined, true) + '</td><td>' + data[i].EnglishTerm + '</td></tr>';
            }
            html += '</tbody>';
            $("#tb-termonolog").html(html);
            if (fn) fn();
            News.ClickId();
        });
        getTerminolog.run();
    },
    CountGetTerminolog:function (newscategoryid, fn) {
        var countPaging = new Servicemobi('lqnews/getnewsothercount', { newscategoryid: newscategoryid, since: "01/01/0001" }, function (data) {
            if (fn) fn(data);
        });
        countPaging.run();
    },
    /*Báo cáo phân tích*/
    /*http://lequang.vn/api/lqreports/getrepositoryreportsview?stockcode=ALL&fortable=bigger&tag=99&sectorid=ALL&subsectorid=ALL&pageindex=1&*/
    GetReport: function (idRender, page, fn) {
        var getReport = new Servicemobi('lqreports/getrepositoryreportsview', {stockcode:"ALL", fortable:"bigger", tag:99, sectorid:"ALL", subsectorid:"ALL",pageindex:page}, function(data) {
            var html = '<table id="report-analysis" class="tb-team"><thead><tr><th>Ngày</th><th>Tiêu đề</th><th>Nguồn</th><th>MCK</th></tr></thead><tbody>';
            for (var i in data) {
                html += '<tr><td>' + LqUtils.getFormatDate(data[i].DateUpfile, 'd').substring(0, 5) + '</td><td style="color: royalblue;">' + data[i].ARTitle + '</td><td>' + data[i].SourceReport + '</td><td style="color:blue;text-decoration: underline;">' + data[i].StocksRelated + '</td></tr>';
            }

            $("#" + idRender).html(html);
            if (fn) fn();
        });
        getReport.run();
    },


    /*for(var i in mappingSubCategory.DNN){console.log(mappingSubCategory.DNN[i].DNVN)}*/
};
