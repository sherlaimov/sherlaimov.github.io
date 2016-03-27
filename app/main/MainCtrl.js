angular.module('PokeDex')
    .controller('MainCtrl', ['PokeApi', MainCtrl]);

function MainCtrl(pokeApi) {
    var main = this;
    main.pokemons = {};
    main.meta = {};
    main.pokemon = null;

    function _showError(e) {
        console.log(e);
    }

    function _paginationInit(){
        main.numberOfPages = Math.ceil(main.meta.total_count / main.meta.limit);
    }

    function _updateModel(metaUrl) {
        pokeApi.find(metaUrl)
            .then(function (result) {
                 main.pokemons = result.data.objects.map(function (obj) {
                     //console.log(obj.types);
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
                console.log(main.meta);
                console.log(main.numberOfPages);

            })
            .catch(_showError);
    }
    _updateModel();

    function _findNext(){
        _updateModel(main.meta.next);
    }
    main.findNext = _findNext;

    function _findPrev(){
        if ( main.meta.previous !== null)
        _updateModel(main.meta.previous);
    }
    main.findPrev = _findPrev;

    function _findById(id){
        console.log(id);
        pokeApi.findById(id)
            .then(function(result){
                console.log(result.data);
                main.pokemon = result.data;

                console.log(main.pokemon.types);
            })
            .catch(_showError);
    }
    main.findById = _findById;

}

angular.module('PokeDex')
    .directive('pagination', function pagination(){
        return {
            scope: {
                meta: '='
            },
            replace: true,
            template: [
                '<nav><ul class="pagination">',
                        '<li class="disabled"><a href="#" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>',
                        '<li class="active"><a href="#">1 <span class="sr-only">(current)</span></a></li>',
                        '<li><a href="#" aria-label="Next"><span aria-hidden="true">&raquo;</span></a></li>',
                '</ul></nav>'

            ].join(''),
            link: function(scope, element, attrs) {
                var meta = null;
                console.log(scope.meta);
                scope.$watch('meta', function(value){
                    meta =  value;
                    console.log(meta);
                    if ( ! jQuery.isEmptyObject(meta)) {
                        console.log('WORKS');
                    }
                });


            }
        };
    });

angular.module('PokeDex')
    .controller('PaginationCtrl',['$scope', 'PokeApi', PaginationCtrl]);

function PaginationCtrl($scope, PokeApi){
    var page = this;
    console.log($scope);

    //$scope.totalItems = 64;
    //$scope.currentPage = 4;
    //$scope.setPage = function (pageNo) {
    //    $scope.currentPage = pageNo;
    //};

    //$scope.pageChanged = function() {
    //    $log.log('Page changed to: ' + $scope.currentPage);
    //};

    $scope.maxSize = 5;
    $scope.bigTotalItems = 175;
    $scope.bigCurrentPage = 1;

    PokeApi.find()
        .then(function(result){
            $scope.meta = {
                limit: result.data.meta.limit,
                next: result.data.meta.next,
                offset: result.data.meta.offset,
                previous: result.data.meta.previous,
                total_count: result.data.meta.total_count
            };
            console.log($scope.meta);
        })
        .catch(alert);
    console.log($scope.meta);
}
