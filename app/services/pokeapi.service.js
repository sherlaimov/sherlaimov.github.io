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
                //console.log(url);
            }
           else {
                url = baseUrl + 'api/v1/pokemon/?limit=12';
            }

            var deferred = $q.defer();
            var promiseFromHttp = $http.get(url);

            promiseFromHttp
                .then(deferred.resolve)
                .catch(deferred.reject);

            return deferred.promise;
        }

        pokeApi.find = _find;

        function _findById(id){
            var url = 'http://pokeapi.co/api/v1/pokemon/' + id;
            var deferred = $q.defer();
            var promise = $http.get(url);
            promise
                .then(deferred.resolve)
                .catch(deferred.reject);
            return deferred.promise;
        }
        pokeApi.findById = _findById;

        return pokeApi;
    }

    PokeApi.$inject = ['$http', '$q'];
    angular
        .module('PokeDex')
        .factory('PokeApi', PokeApi);

})();