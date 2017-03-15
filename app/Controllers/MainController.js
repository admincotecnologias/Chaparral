chaparral.controller('Main', function($scope, $location, $document, fireFact) {
    $scope.isRoot = $location.path().toString().replace('/', '');
    $checkRoute = function(route) {
        $location.path().toString().replace('/', '').includes(route);
    }
    $scope.LogOut = function() {
        Materialize.toast('Signing Out.', 1000, '', function() {
            fireFact.fireAuth.$signOut();
            location.reload();
        });
    }
    $scope.Lodge = null;
    $scope.gallery = null;
    $scope.GetLodge = function() {
        $scope.Lodge = fireFact.fireArray(fireFact.firePath.lodge);
        $scope.Lodge.$loaded().then(function(x) {
            $(document).ready(function () {
                angular.forEach(x,function (item,index) {
                    $("#carousel_full").append('<li class="marco_container"><img src="'+item.$value+'"><div class="marco_slide"></div></li>');
                })
                $('.slider').slider({
                    indicators:false,
                    height:550,
                    interval:2000
                });
            })
        });
    }
    $scope.GetMedia = function() {
        $scope.gallery = fireFact.fireArray(fireFact.firePath.gallery);
        $scope.Lodge.$loaded().then(function(x) {
            $(document).ready(function() {
                $('#slider_Media').carousel({
                    full_width: true
                });
                $('#carousel_full').carousel('set', 1);
            });
        });
    }
    $scope.GetLodge();
    $scope.GetMedia();
});