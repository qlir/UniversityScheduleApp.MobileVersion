(function () {
    function StorageController() {
        var self = this,
            groupListUrl = "LocalStorage/GroupList.json",
            scheduleStorageUrl = "LocalStorage/",

            getGroupsList = function (onsuccess, onerror) {
            },

            getScheduleByGroupId = function (idGroup, onsuccess, onerror) {
                $.get(generateUrlByGroupId(idGroup),function (response) {
                    onsuccess(response);
                }).fail(function (e) {
                        onerror(e);
                    });
            },

            saveSchedule = function (schedule) {

            },

            getLastGroupId = function (onsuccess, onerror) {
                onsuccess("ScheduleGroup-4-42");
            },

            generateUrlByGroupId = function (idGroup) {
                return scheduleStorageUrl + idGroup + ".json";
            };

        this.LoadLastSchedule = function (onsuccess, onerror) {
            getLastGroupId(function (lastGroupId) {
                getScheduleByGroupId(lastGroupId, onsuccess, onerror)
            });
        }
    }

    window.StorageController = new StorageController();
})();