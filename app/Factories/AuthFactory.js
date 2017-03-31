chaparral.factory('fireFact', ['$firebaseObject', "$firebaseArray", 'fireUrl', '$firebaseAuth', "$firebaseStorage", "firePath",'api', function($firebaseObject, $firebaseArray, fireUrl, $firebaseAuth, $firebaseStorage, firePath,api) {
    var _ref = firebase.database().ref();
    var _fire = $firebaseObject(_ref);
    var _fireAuth = $firebaseAuth();
    var _fireStorage = function(path) {
        var _fireRef = firebase.storage().ref(path);
        return $firebaseStorage(_fireRef);
    }
    var _fireRef = function(path) {
        var _ref = path == "" ? firebase.database().ref() : firebase.database().ref(path);
        return $firebaseObject(_ref);
    }
    var _fireArray = function(path) {
        var _ref = path == "" ? firebase.database().ref() : firebase.database().ref(path);
        return $firebaseArray(_ref);
    }
    var _refEqualTo = function(path, child, value) {
        var _ref = firebase.database().ref(path);
        var _data = _ref.orderByChild(child).equalTo(value).on("child_added", function(snapshot) {
            return snapshot.key;
        });
    }

    var _guid = function guid() {
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }

    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return { firebase: _fire, fireAuth: _fireAuth, fireStorage: _fireStorage, fireRef: _fireRef, fireArray: _fireArray, firePath: firePath,api:api, guid: _guid, fireEqualsTo: _refEqualTo };
}]);