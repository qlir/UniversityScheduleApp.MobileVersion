function AngularController($scope) {
    var scope = $scope,
        scheduleCtrl,
        curDate,

        apply = function () {
            setTimeout(function () {
                scope.$apply();
            }, 0);
        },

        datepickerInit = function () {
            $('#daysPanel').DatePicker({
                date: curDate,
                current: curDate,
                starts: 1,
                position: 'r',
                onBeforeShow: function () {
                    $('#daysPanel').DatePickerSetDate(curDate, true);
                },
                onChange: function (formated, dates) {
                    setCurDate(dates);
                    updateScheduleForCurrentDate();
                    $('#daysPanel').DatePickerHide();
                }
            });
        },

        init = function () {
            scheduleCtrl = new ScheduleController(function () {
                scheduleCtrl.loadLastSchedule(function (currentGroup) {
                    scope.currentGroup = currentGroup;
                    updateScheduleForCurrentDate();
                });
            });
            setCurDate(new Date());
            datepickerInit();
        },

        updateScheduleForCurrentDate = function () {
            scheduleCtrl.getScheduleByDate(getCurDate(), function (result) {
                scope.schedule = result;
                apply();
            }, gErr);
        },

        setCurDate = function (date) {
            if (!date instanceof Date) throw "Parameter of setCurData is not Date.";
            curDate = date;
            scope.scheduleDate = date.getDate() + " " + months[date.getMonth()];
            scope.scheduleDay = days[date.getDay()];
        },

        getCurDate = function () {
            return curDate;
        },

        loadGroupList = function () {
            scheduleCtrl.getGroupsList(function (groups) {
                scope.groupList = groups;
            });
        },

        gotoNextDay = function () {
            curDate.setDate(curDate.getDate() + 1);
            setCurDate(curDate);
            updateScheduleForCurrentDate()
        },

        gotoPreviousDay = function () {
            curDate.setDate(curDate.getDate() - 1);
            setCurDate(curDate);
            updateScheduleForCurrentDate()
        }


    init();

    scope.loadGroupsList = function () {
        scheduleCtrl.getLocalGroupsList(
            function (result) {
                scope.localGroupsList = result;
                apply();
            },
            gErr
        );
        scheduleCtrl.getInternetGroupsList(
            function (result) {
                scope.internetGroupsList = result;
                apply();
            },
            gErr
        );
    };

    scope.onSelectGroup = function (group) {
        scheduleCtrl.changeGroup(group, function () {
            scope.currentGroup = group;
            updateScheduleForCurrentDate();
        }, gErr);
    };

    scope.onSelectServerGroup = function (group) {
        scope.currentGroup = group;
        scheduleCtrl.loadServerSchedule(group, function () {
            scheduleCtrl.changeGroup(group, function () {
                updateScheduleForCurrentDate();
            }, gErr);
        }, gErr);
    };

    scope.getGroupTitle = function (group) {
        if (!group) return;
        switch (group.type) {
            case 'group':
                return group.info.number + '/' + group.info.level + ' ' + group.info.name;
            case 'professor':
                return group.info.lastName + ' ' + group.info.firstName[0] + '. ' + group.info.patronymic[0] + '. Кафедра:' + group.info.kafedra;
        }
    };

    scope.gotoNextDay = function () {
        log('nextDay');
        gotoNextDay();
    };

    scope.gotoPreviousDay = function () {
        log('PreviousDay');
        gotoPreviousDay();
    };
}