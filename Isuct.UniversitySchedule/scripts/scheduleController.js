function ScheduleController(onready) {

    var self = this,
        schedule;

    this.getTextForDisplay = function () {
        return schedule.year + "/" + schedule.groupNumber + " " + schedule.name;
    };

    this.getScheduleByDate = function (date) {
    };

    this.loadScheduleForGroup = function (groupId) {
    };

    this.loadLastSchedule = function () {
    };

    var init = function (onready) {
            StorageController.LoadLastSchedule(
                function (result) {
                    schedule = result;
                    onready();
                }
            );
        };

    init(onready);
}