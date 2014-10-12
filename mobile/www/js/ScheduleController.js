function ScheduleController(ready) {
    var self = this,
        schedules = [],
        schedulesArray,
        storageController,
        responseController,
        currentGroup,

        toStringOnlyDate = function (date) {
            return date.toISOString().split("T")[0]
        },
        getWeakNumberForDate = function (date) {
            if (!(date instanceof Date)) return null;
            var newYear = new Date(date.getFullYear(), 0, 1);
            var dayNY = newYear.getWeekDay();
            var time = date.getTime() - newYear.getTime();
            var curDayNum = Math.floor(time / 1000 / 60 / 60 / 24) + dayNY;
            return Math.floor(curDayNum / 7);
        };

    this.getTextForDisplay = function () {
        return schedule.year + "/" + schedule.groupNumber + " " + schedule.name;
    };

    this.loadScheduleForGroup = function (groupId, onsuccess, onerror) {
        storageController.getSchedulesArrayForGroup(groupId,
            function (result) {
                schedulesArray = result;
                if (onsuccess) onsuccess();
            },
            gErr);
    };

    this.getLastGroup = function (onsuccess) {
        if (currentGroup) {
            onsuccess(this.currentGroup);
            return;
        }

        storageController.getLastGroup(function (group) {
            currentGroup = group;
            onsuccess(group);
        });
    };

    this.getScheduleByDate = function (date, onsuccess, onerror) {
        var scheduleId = schedulesArray[toStringOnlyDate(date)];
        if (!scheduleId) {
            onsuccess(null);
            return;
        }
        var schedule = schedules[scheduleId];
        if (schedule) {
            onsuccess(schedule);
            return;
        }

        storageController.getSchedule(scheduleId,
            function (result) {
                schedules[scheduleId] = result;
                onsuccess(result);
            },
            onerror
        );
    };

    this.getGroupsList = function (onsuccess, onerror) {
        storageController.getGroupsList(function (groups) {
            if (groups) {
                onsuccess(groups);
                return;
            }

            responseController.getGroupsList(function (groups) {
                onsuccess(groups)
            });

        });
    }

    this.setCurrentGroup = function (group) {
        currentGroup = group;
        storageController.saveLastGroup(group);
    };

    this.loadLastSchedule = function (onsuccess, onerror) {
        this.getLastGroup(function (group) {
            self.loadScheduleForGroup(group.id, function () {
                if (onsuccess) {
                    onsuccess(group);
                }
            });
        });
    };

    var init = function (ready) {
        storageController = new StorageController(function () {
            if (ready) ready();
        });
        responseController = new ResponseController();
    };

    init(ready);
}