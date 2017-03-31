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
            let dataFile = $files[i];
            let file = new File([dataFile],dataFile.$ngfName,{type:dataFile.type});
            console.log(file)
            form.append('files',file);
            var fire = fireFact.fireArray(fireFact.firePath.lodge);
            $http.post(fireFact.api.storage+fireFact.api.lodge,form,{transformRequest: angular.identity,headers: {
                'Content-Type': undefined}}).then(function(response){
                    console.log(fire,response,file)
                fire.$add({
                    filename:file.name,
                    type: file.type,
                    url:fireFact.api.storage+fireFact.api.lodge+'/'+response.data.filename
                }).then(function (ref) {
                    console.log(ref)
                })
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
        $("#modalLodge").attr("src", $(url).attr('src'));
        $('#modalFoto_Lodge').modal('open');
    }
    $scope.GetLodge = function() {
        $scope.AllLodge = fireFact.fireArray(fireFact.firePath.lodge);
    }
    $scope.GetLodge();
}]);