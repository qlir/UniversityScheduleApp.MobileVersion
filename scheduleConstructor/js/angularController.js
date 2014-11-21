function AngularController($scope) {
    var scope = $scope,
        app = new AppController(),
        init = function () { };

    init();
    scope.hello = "HelloAngular";
}