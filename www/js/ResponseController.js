function ResponseController() {
    this.getGroupsList =  function (onsuccess, onerror) {
        $.get(groupListUrl, function (response) {
            onsuccess(response);
        }).fail(function (e) {
                onerror(e);
            });
    };

    this.getScheduleOfGroup = function (idGroup, onsuccess, onerror) {
        $.get(this.generateUrlByGroupId(idGroup),function (response) {
            onsuccess(response);
        }).fail(function (e) {
                onerror(e);
            });
    };
}