angular.module("myapp", []).controller("angularCtrl", function ($scope) {
    AngularController($scope);
});

Date.prototype.getWeekDay = function(){
    var day = this.getDay();
    return day === 0 ? 6 : day -1;
}

window.months = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля", "Августа", "Сентября", "Октября", "Ноября ", "Декабря"];
window.days = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];
