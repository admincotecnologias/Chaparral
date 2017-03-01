chaparral.controller("BucksCtrl", ["$filter", "$scope", '$location', "Upload", "fireFact", function($filter, $scope, $location, Upload, fireFact) {

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
        if ($scope.SelectType != null) {
            var path = $scope.SelectType + '/';
            for (i = 0; i < $files.length; i++) {
                $scope.uploadLodge = true;
                var file = $files[i];
                file.name = fireFact.guid() + "." + file.name.split('.').pop();
                var _storage = fireFact.fireStorage(path + $files[i].name);
                var meta = {
                    contentType: file.type,
                    name: $files[i].name
                };
                var _uploadtask = _storage.$put(file, meta);
                _uploadtask.$progress(function(snapshot) {
                    $scope.uploadLodge = snapshot.state == "running" ? true : false;
                });
                _uploadtask.$complete(function(snapshot) {
                    console.log(snapshot);
                    var _ref = fireFact.fireArray($scope.SelectType + '/Images');
                    var key = _ref.$add({
                        ref: snapshot.metadata.name,
                        url: snapshot.downloadURL,
                        type: $scope.SelectType,
                        timestamp: Date.now()
                    }).then(function(response) {
                        $scope.AllMonster.$ref();
                        $scope.AllManagment.$ref();
                    }, function(error) {
                        Materialize.toast("Error undefined", 4000);
                    });
                    Materialize.toast("Upload Success", 4000);
                });
                _uploadtask.$error(function(error) {
                    Materialize.toast("Error undefined", 4000);
                });
            }
            $scope.clear();
        } else {
            Materialize.toast("Select a type", 5000);
        }
    }
    $scope.DeleteImageBucks = function(ref, uid, type) {
        var firedelete = fireFact.fireStorage(type + '/' + ref);
        firedelete.$delete().then(function(response) {
            var fireObject = fireFact.fireRef(type + '/Images' + '/' + uid);
            fireObject.$remove().then(function(ref) {
                Materialize.toast("Deleted Success", 4000);
            }, function(error) {
                Materialize.toast("Server Error", 4000);
            });
        });
        firedelete = null;
        fireObject = null;
        $scope.AllMonster.$ref();
        $scope.AllManagment.$ref();
    }
    $scope.setPrincipal = function(uid, type) {
        console.log(uid, type);
        var firePrincipal = fireFact.fireRef(type);
        var fireSelect = fireFact.fireRef(type + '/Images' + '/' + uid);
        fireSelect.$loaded().then(function(data) {
            console.log(data);
            var object = {
                ref: data.ref,
                url: data.url,
                type: data.type,
                timestamp: data.timestamp
            };
            console.log(object);
            firePrincipal.Principal = object;
            firePrincipal.$save().then(function(ref) {
                $scope.GetBucks();
                Materialize.toast("Principal selected", 4000);
            }, function(error) {
                console.log(error)
            });
        });
    }
    $scope.viewModal = function(url) {
        console.log(url);
        $("#modalBucks").attr("src", url);
        $('#modalFoto_Bucks').modal('open');
    }
    $scope.GetBucks = function() {
        $scope.AllMonster = fireFact.fireArray(fireFact.firePath.monster + '/Images');
        $scope.AllManagment = fireFact.fireArray(fireFact.firePath.managment + '/Images');
        fireFact.fireRef(fireFact.firePath.monster + '/Principal').$loaded().then(function(data) {
            $scope.PrincipalMonster = data;
            fireFact.fireRef(fireFact.firePath.managment + '/Principal').$loaded().then(function(data) {
                $scope.PrincipalManagment = data;
                $(document).ready(function() {
                    $('select').material_select('destroy');
                    $('select').material_select();
                });
            });
        });
    }
    $scope.GetBucks();
}]);