chaparral.factory('InterceptorFact', ['$q', '$location', '$injector', function($q, $location, $injector) {
    var _request = function(config) {
        var authData = angular.fromJson(localStorage.getItem("auth"));
        if (authData != null) {
            config.headers.token = authData.token;
        } else {
            config.headers.token = "";
        }
        return config;
    }
    var _responseError = function(rejection) {
        var authData = angular.fromJson(localStorage.getItem("auth"));
        if (rejection.status == 401) {
            localStorage.clear();
            $location.path("/Login");
            //location.reload();
        }
        return $q.reject(rejection);
    }
    var _response = function(response) {
        if (response.data.error == true &&
            (response.data.message == "token inexistente o no coincide" || response.data.message == "limite de conexion alcanzado" || response.data.message == "ip no coincide")) {

        }
        return response;
    }
    return { request: _request, responseError: _responseError, response: _response };
}]);