function ScheduleController() {
    var schedule,
        storageController,
        responseController,
        currentGroup,

        convertDateToString = function (date) {
            return date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear();
        };

    this.getTextForDisplay = function () {
        return schedule.year + "/" + schedule.groupNumber + " " + schedule.name;
    };

    this.getCurrentGroup = function (onsuccess) {
        if(currentGroup)
        {
            onsuccess(this.currentGroup);
            return;
        }

        storageController.getLastGroup(function (group) {
            currentGroup = group;
            onsuccess(group);
        });
    };

    this.getScheduleByDate = function (date, onsuccess, onerror) {
        storageController.getScheduleOfGroupByDay(currentGroup, date, function (schedule) {
            onsuccess(schedule);
        });
    };

    this.getGroupsList = function (onsuccess, onerror) {
        storageController.getGroupsList( function (groups) {
            if (groups) {
                onsuccess(groups);
                return;
            }

            responseController.getGroupsList( function(groups) {
                onsuccess(groups)
            });

        });
    }

    this.setCurrentGroup = function (group) {
        currentGroup = group;
        storageController.saveLastGroup(group);
    };

    var init = function () {
        storageController = new StorageController();
        responseController = new ResponseController();
    };

    init();
}