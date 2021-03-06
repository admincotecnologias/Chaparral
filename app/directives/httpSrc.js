/**
 * Created by Enrique on 31/03/2017.
 */
    /*global angular, Blob, URL */
console.log("entra")
    angular.module('angular.img', [
    ]).directive('httpsrc', ['$http', function ($http) {
        return {
            // do not share scope with sibling img tags and parent
            // (prevent show same images on img tag)
            scope: {},
            link: function ($scope, elem, attrs) {
                function revokeObjectURL() {
                    if ($scope.objectURL) {
                        URL.revokeObjectURL($scope.objectURL);
                    }
                }

                $scope.$watch('objectURL', function (objectURL) {
                    elem.attr('src', objectURL);
                });

                $scope.$on('$destroy', function () {
                    revokeObjectURL();
                });

                attrs.$observe('httpsrc', function (url) {
                    revokeObjectURL();
                    if(url && url.indexOf('data:') === 0) {
                        $scope.objectURL = url;
                    } else if(url) {
                        $http.get(url, {
                            responseType: 'arraybuffer',
                            headers: {
                                'accept': 'image/webp,image/*,*/*;q=0.8'
                            }
                        })
                            .then(function (response) {
                                var blob = new Blob(
                                    [ response.data ],
                                    { type: response.headers('Content-Type') }
                                );
                                //$scope.objectURL = URL.createObjectURL(blob);
                                let data = URL.createObjectURL(blob)
                                console.log(data)
                                $('#'+attrs.id).attr('src',data);
                            },function(error){
                            $('#'+attrs.id).attr('src','ACM1PT');
                        });
                    }
                });
            }
        };
    }]);