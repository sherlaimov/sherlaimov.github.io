(function(){
    function routerConfig($routeProvider) {
        var index = {
                templateUrl: 'app/main/main.html',
                controller: 'MainCtrl',
                controllerAs: 'mainCtrl'

            };
        $routeProvider
            .when('/', index)
            .otherwise({
                redirectTo: '/'
            });
    }
    routerConfig.$inject = ['$routeProvider'];
    angular.module('PokeDex')
        .config(routerConfig);
})();
