/**
 * Created with JetBrains WebStorm.
 * User: Sergey
 * Date: 08.07.14
 * Time: 22:15
 * To change this template use File | Settings | File Templates.
 */
ResponseController = {
    groupListUrl: "server/GroupList.json",
    scheduleStorageUrl: "server/",

    downloadGroupsList: function (onsuccess, onerror) {
        $.get(groupListUrl,function (response) {
            onsuccess(response);
        }).fail(function (e) {
                onerror(e);
            });
    },

    downloadScheduleByGroupId: function (idGroup, onsuccess, onerror) {
        $.get(this.generateUrlByGroupId(idGroup),function (response) {
            onsuccess(response);
        }).fail(function (e) {
                onerror(e);
            });
    },

    generateUrlByGroupId: function(idGroup) {
        return scheduleStorageUrld + idGroup;
    }
}