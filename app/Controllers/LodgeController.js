chaparral.controller("LodgeCtrl", ["$http","$filter", "$scope", '$location', "Upload", "fireFact", function($http,$filter, $scope, $location, Upload, fireFact) {

    //OBJECTS
    $scope.files_lodge;
    $scope.urlLodge = null;
    $scope.uploadLodge;
    $scope.progressLodge = 0;
    $scope.AllLodge = null;
    //FUNCTIONS
    $scope.clear = function() {
        $scope.files_lodge = null;
        $scope.uploadLodge = false;
        $("#file_lodge").val("");
    }
    $scope.onFileSelected = function($files, path) {
        var dataImage=[];
        for (i = 0; i < $files.length; i++) {
            form = new FormData();
            form.append('filedata',$files[i]);
            $http.post('http://localhost:8080/12345/file/'+$files[i].name,form,{transformRequest: angular.identity,headers: { 'Content-Type': undefined,'token':'12345'}}).then(function(response){
                console.log(response);
            },function(error){
                console.log(error)
            })
        }
        $scope.clear();
    }
    $scope.DeleteImageLodge = function(ref, uid) {
        var firedelete = fireFact.fireStorage(fireFact.firePath.lodge + '/' + ref);
        firedelete.$delete().then(function(response) {
            var fireObject = fireFact.fireRef(fireFact.firePath.lodge + '/' + uid);
            fireObject.$remove().then(function(ref) {
                Materialize.toast("Deleted Success", 4000);
            }, function(error) {
                Materialize.toast("Server Error", 4000);
            });
        });
        firedelete = null;
        fireObject = null;
        $scope.AllLodge.$ref();
    }
    $scope.viewModal = function(url) {
        console.log(url);
        $("#modalLodge").attr("src", url);
        $('#modalFoto_Lodge').modal('open');
    }
    $scope.GetLodge = function() {
        $scope.AllLodge = fireFact.fireArray(fireFact.firePath.lodge);
    }
    $scope.GetLodge();
}]);