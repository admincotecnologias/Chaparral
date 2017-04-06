chaparral.controller("BucksCtrl", ["$http","$filter", "$scope", '$location', "Upload", "fireFact", function($http,$filter, $scope, $location, Upload, fireFact) {

    //OBJECTS
    $scope.files_lodge;
    $scope.urlLodge = null;
    $scope.uploadLodge;
    $scope.progressLodge = 0;
    $scope.AllMonster = null;
    $scope.AllManagment = null;
    $scope.PrincipalMonster = null;
    $scope.PrincipalManagment = null;
    $scope.SelectType = null;
    $scope.monster = fireFact.firePath.monster;
    $scope.managment = fireFact.firePath.managment;
    //FUNCTIONS
    $scope.clear = function() {
        console.log($scope.SelectType);
        $scope.files_lodge = null;
        $scope.uploadLodge = false;
        $("#file_bucks").val("");
    }
    $scope.onFileSelected = function($files) {
        $scope.SelectType = $("#Sel_Bucks").parent('div').children('input.select-dropdown').val();
        var fireRef = $scope.SelectType;
        var path = fireFact.api[fireRef];
        if($scope.SelectType != null && $files.length>0){
            var dataImage=[];
            for (i = 0; i < $files.length; i++) {
                form = new FormData();
                let dataFile = $files[i];
                let file = new File([dataFile],dataFile.$ngfName,{type:dataFile.type});
                form.append('files',file);
                var fire = fireFact.fireArray(fireRef);
                $http.post(fireFact.api.storage+path,form,{transformRequest: angular.identity,headers: {
                    'Content-Type': undefined}}).then(function(response){
                        console.log(response)
                    fire.$add({
                        root:fireRef,
                        filename:file.name,
                        type: file.type,
                        url:fireFact.api.storage+path+'/'+response.data.filename
                    }).then(function (ref) {
                    })
                },function(error){
                    console.log(error)
                })
            }
            $scope.clear();
        }
    }
    $scope.DeleteImageBucks = function(item) {
        $http.delete(item.url).then(function (response) {
            if(response.data.error == false){
                var fireObject = fireFact.fireRef(item.root + '/' + item.$id);
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
    $scope.setPrincipal = function(item) {
        var firePrincipal = fireFact.fireRef(fireFact.firePath.principal+'/'+item.root);
        firePrincipal.root = item.root;
        firePrincipal.url = item.url;
        firePrincipal.filename = item.filename;
        firePrincipal.type = item.type;
        firePrincipal.$save().then(function(ref) {
            Materialize.toast("Guardado",4000); // true
        }, function(error) {
            console.log("Error:", error);
        });
    }
    $scope.viewModal = function(id) {
        console.log(id);
        $("#modalBucks").attr("src", $(id).attr('src'));
        $('#modalFoto_Bucks').modal('open');
    }
    $scope.GetBucks = function() {
        $scope.AllMonster = fireFact.fireArray(fireFact.firePath.monster);
        $scope.AllManagment = fireFact.fireArray(fireFact.firePath.managment);
    }
    $scope.GetBucks();
}]);