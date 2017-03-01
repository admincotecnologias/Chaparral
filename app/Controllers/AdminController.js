chaparral.controller("AdminCtrl", ["$filter", "$scope", "currentAuth", '$location', "Upload", "fireFact", function($filter, $scope, currentAuth, $location, Upload, fireFact) {
    //VALIDATE LOG
    if (currentAuth == null) {
        $location.path('/');
        location.reload();
    }
}]);