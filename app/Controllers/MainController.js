chaparral.controller('Main', function($scope, $location, $document, fireFact,$http,$q) {
    $scope.isRoot = $location.path().toString().replace('/', '');
    $checkRoute = function(route) {
        $location.path().toString().replace('/', '').includes(route);
    }
    $scope.LogOut = function() {
        Materialize.toast('Signing Out.', 1000, '', function() {
            fireFact.fireAuth.$signOut();
            location.reload();
        });
    }
    $scope.Seasons = [];
    $scope.Lodge = [];
    $scope.gallery = [];
    $scope.height = screen.height;
    $scope.principal = [];
    $scope.PrincipalArray = null;
    $scope.totalLodge = 0;
    $scope.totalGallery = 0;
    $scope.GetLodge = function() {
        var Lodge = fireFact.fireArray(fireFact.firePath.lodge);
        Lodge.$loaded().then(function (x) {
            var lodgeArray = [];
            for(var i = 0;i<Lodge.length;i++){
                let data = $http.get(x[i].url,{
                    responseType: 'arraybuffer',
                    headers: {
                        'accept': 'image/webp,image/*,*/*;q=0.8'
                    }
                }).then(function (response) {
                    return {res:response,fire:x[i]};
                }).catch(function (err) {
                    return null;
                })
                lodgeArray.push(data);
            }
            $q.all(lodgeArray).then(function (responses) {
                angular.forEach(responses,function (item,index) {
                    if(item){
                        var blob = new Blob(
                            [ item.res.data ],
                            { type: item.res.headers('Content-Type') }
                        );
                        let url = URL.createObjectURL(blob)
                        $scope.Lodge.push({fire:item.fire,url:url})
                    }
                });
                $(document).ready(function () {
                    $('#slider_lodge').slider({
                        indicators:false,
                        height:550
                        //interval:2000
                    });
                })
            });
        });
    }
    $scope.GetMedia = function() {
        var gallery = fireFact.fireArray(fireFact.firePath.gallery);
        gallery.$loaded().then(function (x) {
            var galArray = [];
            for(var i = 0;i<gallery.length;i++){
                let promise = $http.get(x[i].url,{
                    responseType: 'arraybuffer',
                    headers: {
                        'accept': 'image/webp,image/*,*/*;q=0.8'
                    }
                }).then(function (response) {
                    return {res:response,fire:x[i]};
                }).catch(function (err) {
                    return null;
                })
                galArray.push(promise);
            }
            $q.all(galArray).then(function (responses) {
                angular.forEach(responses,function (item,index) {
                    if(item){
                        var blob = new Blob(
                            [ item.res.data ],
                            { type: item.res.headers('Content-Type') }
                        );
                        let url = URL.createObjectURL(blob);
                        $scope.gallery.push({fire:item.fire,url:url})
                    }
                });
                $(document).ready(function () {
                    $('#slider_Media').slider({
                        indicators:false,
                        height:550
                        //interval:2000
                    });
                });
            }).catch(function (err) {
                console.log(err)
            });
        });
    }
    $scope.GetSeasons = function() {
        var gallery = fireFact.fireArray(fireFact.firePath.season + '/All');
        gallery.$loaded().then(function (x) {
            var galArray = [];
            for(let i = 0;i<gallery.length;i++){
                let promise = $http.get(x[i].image.url,{
                    responseType: 'arraybuffer',
                    headers: {
                        'accept': 'image/webp,image/*,*/*;q=0.8'
                    }
                }).then(function (response) {
                    return {res:response,fire:x[i]};
                }).catch(function (err) {
                    return null;
                })
                galArray.push(promise);
            }
            $q.all(galArray).then(function (responses) {
                angular.forEach(responses,function (item,index) {
                    console.log("responses",responses)
                    if(item){
                        var blob = new Blob(
                            [ item.res.data ],
                            { type: item.res.headers('Content-Type') }
                        );
                        let url = URL.createObjectURL(blob);
                        $scope.Seasons.push({fire:item.fire,url:url})
                    }
                });
                console.log("Seasons",$scope.Seasons)
                $(document).ready(function () {
                    $('#slider_Seasons').slider({
                        indicators:false,
                        height:550
                        //interval:2000
                    });
                });
            }).catch(function (err) {
                console.log(err)
            });
        });
    }
    $scope.GetPrincipal = function() {
        $scope.PrincipalArray = fireFact.fireArray(fireFact.firePath.principal);
        $scope.PrincipalArray.$loaded().then(function (x) {
            for(var i = 0;i<x.length;i++){
                let url = x[i].url;
                let val = x[i];
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
                        $scope.principal.push({fire:val,url:data})
                    },function(error){
                        console.log('error');
                    });
            }
        }).catch(function (error) {
            console.log(error)
        });
    }
    $scope.GetAllMonster = function () {
        var monster = fireFact.fireArray(fireFact.firePath.monster);
        monster.$loaded().then(function (x) {
            var monArray = [];
            for(let i = 0;i<monster.length;i++){
                let promise = $http.get(x[i].url,{
                    responseType: 'arraybuffer',
                    headers: {
                        'accept': 'image/webp,image/*,*/*;q=0.8'
                    }
                }).then(function (response) {
                    $scope.totalMonster = $scope.totalMonster++;
                    return {res:response,fire:x[i]};
                }).catch(function (err) {
                    return null;
                })
                monArray.push(promise);
            }
            $q.all(monArray).then(function (responses) {
                let album=[];
                angular.forEach(responses,function (item,index) {
                    if(item){
                        var blob = new Blob(
                            [ item.res.data ],
                            { type: item.res.headers('Content-Type') }
                        );
                        let url = URL.createObjectURL(blob);
                        album.push({title:item.fire.root,href:url,type:item.fire.type,thumbnail:url})
                    }
                });
                var Gallery = blueimp.Gallery(album);
            }).catch(function (err) {
                console.log(err)
            });
        });
    }
    $scope.GetAllManagement = function () {
        var monster = fireFact.fireArray(fireFact.firePath.managment);
        monster.$loaded().then(function (x) {
            var monArray = [];
            for(let i = 0;i<monster.length;i++){
                let promise = $http.get(x[i].url,{
                    responseType: 'arraybuffer',
                    headers: {
                        'accept': 'image/webp,image/*,*/*;q=0.8'
                    }
                }).then(function (response) {
                    $scope.totalMonster = $scope.totalMonster++;
                    return {res:response,fire:x[i]};
                }).catch(function (err) {
                    return null;
                })
                monArray.push(promise);
            }
            $q.all(monArray).then(function (responses) {
                let album=[];
                angular.forEach(responses,function (item,index) {
                    if(item){
                        var blob = new Blob(
                            [ item.res.data ],
                            { type: item.res.headers('Content-Type') }
                        );
                        let url = URL.createObjectURL(blob);
                        album.push({title:item.fire.root,href:url,type:item.fire.type,thumbnail:url})
                    }
                });
                var Gallery = blueimp.Gallery(album);
            }).catch(function (err) {
                console.log(err)
            });
        });
    }
    $scope.GetAllSeason = function (item) {
        console.log(item)
        var monster = fireFact.fireArray(fireFact.firePath.season + '/' + item.season + '/Images');
        monster.$loaded().then(function (x) {
            var monArray = [];
            for(let i = 0;i<monster.length;i++){
                let promise = $http.get(x[i].url,{
                    responseType: 'arraybuffer',
                    headers: {
                        'accept': 'image/webp,image/*,*/*;q=0.8'
                    }
                }).then(function (response) {
                    return {res:response,fire:x[i]};
                }).catch(function (err) {
                    return null;
                })
                monArray.push(promise);
            }
            $q.all(monArray).then(function (responses) {
                let album=[];
                angular.forEach(responses,function (item,index) {
                    if(item){
                        var blob = new Blob(
                            [ item.res.data ],
                            { type: item.res.headers('Content-Type') }
                        );
                        let url = URL.createObjectURL(blob);
                        album.push({title:item.fire.description,href:url,type:item.fire.type,thumbnail:url})
                    }
                });
                var Gallery = blueimp.Gallery(album);
            }).catch(function (err) {
                console.log(err)
            });
        });
    }
    $scope.$watch('principal', function (newValue, oldValue) {
        if($scope.PrincipalArray!=null && newValue.length== $scope.PrincipalArray.length){
            for(var i = 0;i<newValue.length;i++){
                let item = newValue[i];
                switch (item.fire.root){
                    case 'Managment': {
                        $("#management_bucks").attr('style','background: url('+item.url+') no-repeat center;background-size: cover;height:100vh;');
                        break;
                    }
                    case 'Monster':{
                        $("#monster_bucks").attr('style','background: url('+item.url+') no-repeat center;background-size: cover;height:100vh;');
                        break;
                    }default: break;
                }
            }
        }
    }, true);
    $scope.GetSeasons();
    $scope.GetPrincipal();
    $scope.GetLodge();
    $scope.GetMedia();
});