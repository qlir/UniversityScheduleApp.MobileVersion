function AppController($scope) {
    var scope = $scope,
        scheduleCtrl,

        init = function () {
            scheduleCtrl = new ScheduleController();
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

}