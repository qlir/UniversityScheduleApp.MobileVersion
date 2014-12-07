function RequestController() {
// https://universchedule.herokuapp.com
    this.getGroupsList = function (onsuccess, onerror) {
        $.ajax({
            type: "GET",
            url: "https://universchedule.herokuapp.com/schedulesList"
        }).done(onsuccess).fail(onerror);
    };

    this.getScheduleByGroupID = function (groupId, onsuccess, onerror) {
        $.ajax({
            type: "GET",
            url: "https://universchedule.herokuapp.com/schedule/",
            data:{
                id:groupId
            }
        }).done(onsuccess).fail(onerror);
    };
}