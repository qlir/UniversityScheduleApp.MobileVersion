function AppController($scope) {
    var scope = $scope,
        scheduleCtrl,

        init = function () {
            scheduleCtrl = new ScheduleController();
            scheduleCtrl.getCurrentGroup(function(currentGroup){
                scope.currentGroup = currentGroup;
            });
        },

        displaySchedule = function() {
            var currentDate = new Date();
            scope.scheduleDate = currentDate.getDate() +" " + months[currentDate.getMonth()];
            scope.scheduleDay = days[currentDate.getDay()];
            scheduleCtrl.getScheduleByDate(currentDate, function(schedule) {
                scope.schedule = schedule;
            });
        },

        loadGroupList = function() {
            scheduleCtrl.getGroupsList(function(groups){
                scope.groupList = groups;
            });
        }

    init();

    displaySchedule();
    loadGroupList();

    scope.selectGroup = function(group) {
        scope.currentGroup = group;
        scheduleCtrl.setCurrentGroup(group);
    };
}