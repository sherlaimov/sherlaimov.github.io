(function() {
    'use strict';

    function PokeApi($http, $q) {
        var baseUrl = 'http://pokeapi.co/',
            pokeApi = {};

        function _showError(e) {
            console.log(e);
        }

        function _find(metaUrl) {
            var url = '';
            if (metaUrl !== null && metaUrl !== undefined) {
                url = baseUrl + metaUrl;
                console.log(url);
            }
           else {
                url = baseUrl + 'api/v1/pokemon/?limit=12';
            }

            console.log(url);

            var deferred = $q.defer();
            var promiseFromHttp = $http.get(url);

            promiseFromHttp
                .then(deferred.resolve)
                .catch(deferred.reject);

            return deferred.promise;
        }

        pokeApi.find = _find;

        return pokeApi;
    }

    PokeApi.$inject = ['$http', '$q'];
    angular
        .module('PokeDex')
        .factory('PokeApi', PokeApi);

})();