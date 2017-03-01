chaparral.controller('LogIn', function($scope, $location, $document, fireFact, $rootScope, currentAuth) {
    if (currentAuth != null) {
        $location.path('/Admin');
    }
    console.log(fireFact);
    $scope.UserData = {
        email: "",
        password: ""
    }
    $scope.LogIn = function() {
        fireFact.fireAuth.$signInWithEmailAndPassword(
            $scope.UserData.email,
            $scope.UserData.password
        ).then(function(authData) {
            $location.path('Admin');
        }).catch(function(error) {
            console.error("Authentication failed:", error);
            // Handle Errors here.
            var errorCode = error.code;
            switch (errorCode) {
                case 'auth/invalid-email':
                    Materialize.toast('Email invalid.', 4000);
                    break;
                case 'auth/user-disabled':
                    Materialize.toast('User disabled.', 4000);
                    break;
                case 'auth/user-not-found':
                    Materialize.toast('User not exists.', 4000);
                    break;
                case 'auth/wrong-password':
                    Materialize.toast('Wrong password.', 4000);
                    break;
                default:
                    Materialize.toast('Access Error Undefined.', 4000);
                    break;
            }
        });
    }
});