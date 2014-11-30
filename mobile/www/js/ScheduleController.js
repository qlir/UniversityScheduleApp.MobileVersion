function ScheduleController(ready) {
    var self = this,
        schedules = [],
        schedulesArray,
        storageCtrl,
        requestController,
        currentGroup,
        internetGroupsList,
        localGroupsList,

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
        },
        getGroupList = function (type, onsuccess, onerror) {
            var ctrl, varOfGroupList, groupsList;
            switch (type) {
                case 'local':
                    ctrl = storageCtrl;
                    varOfGroupList = 'localGroupsList';
                    break;
                case  'internet':
                    ctrl = requestController;
                    varOfGroupList = 'internetGroupsList';
                    break;
            }

            if (groupsList) {
                onsuccess(groupsList);
                return;
            }

            ctrl.getGroupsList(function (result) {
                    groupsList = result;
                    onsuccess(groupsList);
                }
                , onerror);

            this[varOfGroupList] = groupsList;
        };

    this.getTextForDisplay = function () {
        return schedule.year + "/" + schedule.groupNumber + " " + schedule.name;
    };

    this.updateSchedule = function (onsuccess, onerror) {
        storageCtrl.getSchedulesArrayForGroup(currentGroup.id,
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

        storageCtrl.getLastGroup(function (group) {
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

        storageCtrl.getSchedule(scheduleId,
            function (result) {
                schedules[scheduleId] = result;
                onsuccess(result);
            },
            onerror
        );
    };

    /*    this.getGroupsList = function (onsuccess, onerror) {
     storageCtrl.getGroupsList(function (groups) {
     if (groups) {
     onsuccess(groups);
     return;
     }

     requestController.getGroupsList(function (groups) {
     onsuccess(groups)
     });

     });
     }*/

    this.changeGroup = function (group, onsuccess, onerror) {
        currentGroup = group;
        storageCtrl.saveLastGroup(group);
        this.updateSchedule(onsuccess, onerror);
    };

    this.loadLastSchedule = function (onsuccess, onerror) {
        this.getLastGroup(function (group) {
            self.changeGroup(group, function () {
                if (onsuccess) {
                    onsuccess(group);
                }
            }, onerror);
        });
    };

    this.getLocalGroupsList = function (onsuccess, onerror) {
        getGroupList('local', onsuccess, onerror);
    };

    this.getInternetGroupsList = function (onsuccess, onerror) {
        getGroupList('internet', onsuccess, onerror);
    };


    var init = function (ready) {
        storageCtrl = new StorageController(function () {
            if (ready) ready();
        });
        requestController = new RequestController();
    };

    init(ready);
}