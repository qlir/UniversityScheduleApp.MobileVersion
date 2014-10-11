function ScheduleController(ready) {
    var self = this,
        schedule,
        storageController,
        responseController,
        currentGroup,
        getNumberOfScheduleForDate = function (date) {
            log(schedule);
            if (schedule.length === 7) {
                return date.getWeekDay();
            } else {
                return ((getWeakNumberForDate(date) % 2) ? 0 : 1 ) * 7 + date.getWeekDay();
            }
        },
        getWeakNumberForDate = function (date) {
            if (!(date instanceof Date)) return null;
            var newYear = new Date(date.getFullYear(), 0, 1);
            var dayNY = newYear.getWeekDay();
            var time = date.getTime() - newYear.getTime();
            var curDayNum = Math.floor(time / 1000 / 60 / 60 / 24) + dayNY;
            return Math.floor(curDayNum/7);
        };
    this.getTextForDisplay = function () {
        return schedule.year + "/" + schedule.groupNumber + " " + schedule.name;
    };

    this.loadScheduleForGroup = function (groupId, onsuccess, onerror) {
        storageController.getScheduleForGroup(groupId, function (result) {
            schedule = result.lessons;
            if (onsuccess) {
                onsuccess();
            }
        }, function (err) {
            log(err);
            if (onerror) onerror(err);
        });
    }

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

    this.getScheduleByDate = function (date) {
        return schedule[getNumberOfScheduleForDate(date)];
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
                log(schedule)
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