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

    this.getCurrentGroupId = function (onSuccess) {
        if(currentGroup)
        {
            onSuccess(this.currentGroup);
            return;
        }

        this.getLastGroupId(function (groupId) {
            currentGroup = groupId;
            onSuccess(groupId);
        });
    };

    this.getScheduleByDate = function (date, onSuccess, onError) {
        storageController.getScheduleOfGroupByDay(currentGroup, date, function (schedule) {
            onSuccess(schedule);
        });
    };

    this.loadScheduleForGroup = function (groupId) {
    };

    this.loadLastSchedule = function () {
    };
    this.getGroupsList = function(onSuccess, onError) {
        storageController.getGroupsList( function (groups) {
            if (groups) {
                onSuccess(groups);
                return;
            }

            responseController.getGroupsList( function(groups) {
                onSuccess(groups)
            });

        });
    }

    var init = function () {
        storageController = new StorageController();
        responseController = new ResponseController();
    };

    init();
}