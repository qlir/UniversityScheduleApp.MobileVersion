function AppController(appName, angularCtrl) {
    var self = this,
        scope,
        storageCtrl,
        scheduleCtrl,

        init = function () {
            angular.module(appName, []).controller(angularCtrl, function ($scope) {
                this.scope = $scope;
            });
            scheduleCtrl = new ScheduleController(displaySchedule);
        },

        displaySchedule = function() {
            //todo
        }

    init();
}

AppController("myapp", "angularCtrl");