function ScheduleController(ready) {
    var self = this,
        schedules = [],
        schedulesArray,
        storageCtrl,
        requestCtrl,
        currentGroup,
        serverGroupsList,
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
    /*
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

     *//* if (groupsList) {
     onsuccess(groupsList);
     return;
     }*//*
     ctrl.getGroupsList(function (result) {
     groupsList = result;
     onsuccess(groupsList);
     }
     , onerror);

     this[varOfGroupList] = groupsList;
     },
     */
        getLocalGroupList = function (onsuccess, onerror) {
            //if (localGroupsList) return onsuccess(localGroupsList);
            storageCtrl.getGroupsList(function (result) {
                    localGroupsList = result;
                    onsuccess(localGroupsList);
                }
                , onerror);
        },

        getServerGroupList = function (onsuccess, onerror) {
            //if (serverGroupsList) return onsuccess(serverGroupsList);
            requestCtrl.getGroupsList(function (result) {
                    serverGroupsList = result;
                    onsuccess(serverGroupsList);
                }
                , onerror);
        }

    this.getTextForDisplay = function () {
        return schedule.year + "/" + schedule.groupNumber + " " + schedule.name;
    };

    this.updateSchedule = function (onsuccess, onerror) {
        storageCtrl.getSchedulesArrayForGroup(
            currentGroup.id,
            function (result) {
                schedulesArray = result;
                onsuccess && onsuccess();
            },
            onerror);
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
        var time = date.getTime();
        if (!schedulesArray) schedulesArray = [];
        var scheduleId;

        for (var i = 0; (i < schedulesArray.length) && !scheduleId; i++) {
            if (schedulesArray[i].startDate.getTime() <= time && time <= schedulesArray[i].endDate.getTime()) {
                var dayDelta = Math.floor((time - schedulesArray[i].startDate.getTime()) / (24 * 60 * 60 * 1000));
                if (dayDelta % schedulesArray[i].period == 0) {
                    scheduleId = schedulesArray[i].lessonsID;
                }
            }
        }

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
        if (group) {
            this.updateSchedule(
                function () {
                    storageCtrl.saveLastGroup(group);
                    onsuccess && onsuccess();
                },
                function (e) {
                    currentGroup = null;
                    onerror && onerror(e);
                });
        }
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
        getLocalGroupList(onsuccess, onerror);
    };

    this.getInternetGroupsList = function (onsuccess, onerror) {
        getServerGroupList(onsuccess, onerror);
    };

    this.loadServerSchedule = function (group, onsuccess, onerror) {
        requestCtrl.getScheduleByGroupID(group.id, function (result) {
            storageCtrl.addSchedules(result.schedules,
                function () {
                    storageCtrl.addGroupListItem(group);
                    storageCtrl.addSchedulesInfo(result.info, onsuccess, onerror);
                },
                onerror
            );
        }, onerror);
    };

    var init = function (ready) {
        storageCtrl = new StorageController(function () {
            if (ready) ready();
        });
        requestCtrl = new RequestController();
    };

    init(ready);
}