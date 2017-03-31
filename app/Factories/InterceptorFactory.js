chaparral.factory('InterceptorFact', ['$q', '$location', '$injector','fireFact', function($q, $location, $injector,fireFact) {
    var _request = function(config) {
        config.headers.token_storage=fireFact.api.token;
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