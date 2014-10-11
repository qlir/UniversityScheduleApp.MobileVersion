function AppController($scope) {
    var scope = $scope,
        scheduleCtrl,
        curData,

        init = function () {
            scheduleCtrl = new ScheduleController(function () {
                scheduleCtrl.loadLastSchedule(function (currentGroup) {
                    scope.currentGroup = currentGroup.info.level + "/" + currentGroup.info.number;
                    displaySchedule();
                    scope.$apply();
                });
            });
        },

        displaySchedule = function (day) {
            if (!day) {
                var day = new Date();
            }
            scope.schedule = scheduleCtrl.getScheduleByDate(day);
            setCurDay(day);
        },

        setCurDay = function (date) {
            if (!date instanceof Date) throw "Parameter of setCurData is not Date.";
            curData = date;
            scope.scheduleDate = date.getDate() + " " + months[date.getMonth()];
            scope.scheduleDay = days[date.getDay()];
        },

        getCurDay = function () {
            return curData;
        },

        loadGroupList = function () {
            scheduleCtrl.getGroupsList(function (groups) {
                scope.groupList = groups;
            });
        },

        gotoNextDay = function() {
            curData.setDate(curData.getDate() + 1);
            setCurDay(curData);
            displaySchedule(curData)
        },

        gotoPreviousDay = function(){
            curData.setDate(curData.getDate() - 1);
            setCurDay(curData);
            displaySchedule(curData)
        }


    init();

    scope.selectGroup = function (group) {
        scope.currentGroup = group;
        scheduleCtrl.setCurrentGroup(group);
        displaySchedule();
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