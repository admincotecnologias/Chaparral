chaparral.controller("MediaCtrl", ["$filter", "$scope", '$location', "Upload", "fireFact", function($filter, $scope, $location, Upload, fireFact) {

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
                var _ref = fireFact.fireArray(fireFact.firePath.gallery);
                var key = _ref.$add({
                    ref: snapshot.metadata.name,
                    url: snapshot.downloadURL,
                    timestamp: Date.now()
                }).then(function(response) {
                    $scope.AllLodge.$ref();
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
    }
    $scope.DeleteImage = function(ref, uid) {
        var firedelete = fireFact.fireStorage(fireFact.firePath.gallery + '/' + ref);
        firedelete.$delete().then(function(response) {
            var fireObject = fireFact.fireRef(fireFact.firePath.gallery + '/' + uid);
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
        $("#modalMedia").attr("src", url);
        $('#modalFoto_Admin').modal('open');
    }
    $scope.GetLodge = function() {
        $scope.AllLodge = fireFact.fireArray(fireFact.firePath.gallery);
    }
    $scope.GetLodge();
}]);