chaparral.controller("MediaCtrl", ["$http","$filter", "$scope", '$location', "Upload", "fireFact", function($http,$filter, $scope, $location, Upload, fireFact) {

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
            form.append('files',file);
            var fire = fireFact.fireArray(fireFact.firePath.gallery);
            $http.post(fireFact.api.storage+fireFact.api.gallery,form,{transformRequest: angular.identity,headers: {
                'Content-Type': undefined}}).then(function(response){
                fire.$add({
                    filename:file.name,
                    type: file.type,
                    url:fireFact.api.storage+fireFact.api.gallery+'/'+response.data.filename
                }).then(function (ref) {
                })
            },function(error){
                console.log(error)
            })
        }
        $scope.clear();
    }
    $scope.DeleteImage = function(item) {
        $http.delete(item.url).then(function (response) {
            if(response.data.error == false){
                var fireObject = fireFact.fireRef(fireFact.firePath.gallery + '/' + item.$id);
                fireObject.$remove().then(function(ref) {
                    Materialize.toast("Deleted Success", 4000);
                }, function(error) {
                    Materialize.toast("Server Error", 4000);
                });
            }else{
                Materialize.toast("Error al eliminar",5000)
            }
        },function (error) {
            Materialize.toast("Error con el Servidor",5000)
        })
        firedelete = null;
        fireObject = null;
        $scope.AllLodge.$ref();
    }
    $scope.viewModal = function(item,id) {
        console.log(id)
        $("#modalMedia").attr("src", $(id).attr("src"));
        $('#modalFoto_Admin').modal('open');
    }
    $scope.GetLodge = function() {
        $scope.AllLodge = fireFact.fireArray(fireFact.firePath.gallery);
    }
    $scope.GetLodge();
}]);