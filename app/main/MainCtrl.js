(function(){
    'use strict';

    angular.module('PokeDex')
        .controller('MainCtrl', ['$scope', 'PokeApi', MainCtrl]);

    function MainCtrl($scope, pokeApi) {
        var main = this;
        main.pokemons = {};
        main.meta = {};
        main.pokemon = null;
        main.types = null;
        $scope.chosenType = 'All';

        $scope.currentPage = 1;
        $scope.maxSize = 12;



        function _showError(e) {
            console.log(e);
        }

        function _paginationInit(){
            $scope.ready = true;
            $scope.itemsPerPage = main.meta.limit;
            $scope.totalItems = main.meta.total_count;

        }

        $scope.findPage = function findPage(sortByType){
            var offset = $scope.currentPage * $scope.itemsPerPage - $scope.itemsPerPage;
            var url = 'api/v1/pokemon/?limit=' + $scope.itemsPerPage + '&offset=' + offset;
            if (sortByType) {
                //this never runs, since I've failed to either
                // get ALL pokemons (server simply crushes with http://pokeapi.co/api/v1/pokemon/?limit=778) or
                //make a get-all-by-type kind-of request
                var noOffset;
                _updateModel(url, sortByType);
            }
            _updateModel(url);
        }

        function _updateModel(metaUrl, sortByType) {
            pokeApi.find(metaUrl)
                .then(function (result) {
                    if (sortByType !== undefined) {
                        //Subsequently, this never runs either.
                        //I've left it here only to let you know the logic
                        //I was trying to achieve in the app
                        main.pokemons = result.data.objects.filter(function (obj) {
                            return obj.types.map(function(val){
                                console.log(val.name == sortByType);
                                //val.name == sortByType;
                            })
                        }).map(function(obj){
                            return {
                                name: obj.name,
                                id: obj.national_id,
                                sprites: obj.sprites,
                                types: obj.types
                            };


                        });
                    }
                    main.pokemons = result.data.objects.map(function (obj) {
                        return {
                            name: obj.name,
                            id: obj.national_id,
                            sprites: obj.sprites,
                            types: obj.types
                        };
                    });
                    main.meta = {
                        limit: result.data.meta.limit,
                        next: result.data.meta.next,
                        offset: result.data.meta.offset,
                        previous: result.data.meta.previous,
                        total_count: result.data.meta.total_count
                    };
                    _paginationInit();
                })
                .catch(_showError);
            //No need to make this extra request for the reasons explained above
            //pokeApi.getAllTypes()
            //    .then(function(result){
            //       main.types = result;
            //
            //    });

        }
        _updateModel();

        $scope.$watch('chosenType', function(val){
            //this was supposed to trigger the sort-by-type request,
            //Alas :(
            //$scope.findPage($scope.chosenType);

        });

        function _findById(id){
            pokeApi.findById(id)
                .then(function(result){
                    main.pokemon = result.data;
                })
                .catch(_showError);
        }
        main.findById = _findById;

    }

})();



