(function() {
    'use strict';

    function PokeApi($http, $q) {
        var baseUrl = 'http://pokeapi.co/',
            pokeApi = {};

        function _showError(e) {
            console.log(e);
        }

        function _find(direction, metaUrl) {
            var url = '';
            if (direction == 'next') {
                url = baseUrl + metaUrl;
                console.log(url);
            } else if(direction == 'prev' && metaUrl != null) {
                url = baseUrl + metaUrl;
            } else {
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

        //function _updateMeta(){
        //    _find()
        //        .then(function(result){
        //            //console.log(result.data.meta);
        //            pokeApi.meta = {
        //                limit: result.data.meta.limit,
        //                next: result.data.meta.next,
        //                offset: result.data.meta.offset,
        //                previous: result.data.meta.previous,
        //                total_count: result.data.meta.total_count
        //            };
        //            console.log(pokeApi.meta);
        //        }).catch(_showError);
        //}
        //pokeApi.updateMeta = _updateMeta;

        //function _findNext(){
        //    var deferred = $q.defer(),
        //        url = baseUrl + pokeApi.meta.next;
        //    var promise = $http.get(url);
        //    promise
        //        .then(deferred.resolve)
        //        .catch(deferred.reject);
        //    return deferred.promise;
        //}
        //
        //pokeApi.findNext = _findNext;

        return pokeApi;
    }

    PokeApi.$inject = ['$http', '$q'];
    angular
        .module('PokeDex')
        .factory('PokeApi', PokeApi);

})();