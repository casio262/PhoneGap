LqSeachfor = {};
LqSeachfor.files = {
    company: 'http://lequang.vn/Content/Temps/ComapanyJsonStore.json',
    project: 'http://lequang.vn/Content/Temps/LandProjectJsonStore.json'
};

LqSeachfor.dataCache = {
    company: LqUserStatus.Search__dataCompany == null ? undefined : JSON.parse(LqUserStatus.Search__dataCompany),
    project: LqUserStatus.Search__dataProjects == null ? undefined : JSON.parse(LqUserStatus.Search__dataProjects)
};
LqUtils.LoadJson(LqSeachfor.files.company, function (data) {
    LqSeachfor.dataCache["company"] = data;
    LqUserStatus.Search__dataCompany = JSON.stringify(LqSeachfor.dataCache["company"]);
    //LqSeachfor.SetDataSearch('#lq-search-input', data);
});










