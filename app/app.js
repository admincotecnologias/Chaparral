// Initialize Firebase
var config = {
    apiKey: "AIzaSyB23ky48CYZQVJzYrOeJNRGWkrVILrxR6Y",
    authDomain: "chaparralranch-9f43a.firebaseapp.com",
    databaseURL: "https://chaparralranch-9f43a.firebaseio.com",
    storageBucket: "chaparralranch-9f43a.appspot.com",
    messagingSenderId: "1006325828098"
};
firebase.initializeApp(config);
//Initialize Angular
chaparral = angular.module("Chaparral", ['ngRoute', 'ngTouch', 'firebase', 'ngFileUpload', 'ngImageCompress', 'ui.materialize'])
    .constant('fireUrl', 'https://chaparralranch-9f43a.firebaseio.com')
    .constant('firePath', {
        lodge: 'Lodge',
        season: 'Seasons',
        monster: 'Monster',
        managment: 'Managment',
        gallery: 'Gallery'
    })
    .run(["$rootScope", "$location", function($rootScope, $location) {
        $rootScope.$on("$routeChangeError", function(event, next, previous, error) {
            // We can catch the error thrown when the $requireSignIn promise is rejected
            // and redirect the user back to the home page
            if (error === "AUTH_REQUIRED") {
                $location.path("/");
            }
        });
    }]);
chaparral.config(
    function($routeProvider, $httpProvider, $locationProvider, $provide, $filterProvider) {
        $routeProvider
            .when('/Login', {
                name: "Login",
                url: "Login",
                templateUrl: 'app/Views/Login.html',
                controller: 'LogIn',
                resolve: {
                    "currentAuth": ["fireFact", function(fireFact) {
                        return fireFact.fireAuth.$waitForSignIn();
                    }]
                }
            })
            .when('/Admin', {
                name: "Admin",
                url: "Admin",
                templateUrl: '/app/views/Admin.html',
                controller: 'AdminCtrl',
                resolve: {
                    "currentAuth": ["fireFact", function(fireFact) {
                        return fireFact.fireAuth.$waitForSignIn();
                    }]
                }
            })
            .when('/', {
                name: "Index",
                url: "Index",
                controller: 'MainCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
        $httpProvider.defaults.headers.common['Accept'] = 'application/json';
        $httpProvider.defaults.headers.common['Content-Type'] = 'application/json';
        //$httpProvider.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
        //$httpProvider.defaults.headers.common['Access-Control-Allow-Headers'] = '*';
        //$httpProvider.defaults.headers.common['Access-Control-Expose-Headers'] = '*';
        $httpProvider.useApplyAsync(true);
        $httpProvider.interceptors.push("InterceptorFact");
        $locationProvider.html5Mode(true);

    }
);