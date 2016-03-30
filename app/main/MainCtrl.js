angular.module('PokeDex')
    .controller('MainCtrl', ['$scope', 'PokeApi', MainCtrl]);

function MainCtrl($scope, pokeApi) {
    var main = this;
    main.pokemons = {};
    main.meta = {};
    main.pokemon = null;

    $scope.currentPage = 1;
    $scope.maxSize = 12;

    function _showError(e) {
        console.log(e);
    }

    function _paginationInit(){
        $scope.itemsPerPage = main.meta.limit;
        $scope.totalItems = main.meta.total_count;

    }

    $scope.findPage = function findPage(){
        var offset = $scope.currentPage * $scope.itemsPerPage - $scope.itemsPerPage;
        var url = 'api/v1/pokemon/?limit=' + $scope.itemsPerPage + '&offset=' + offset;
        _updateModel(url);
    }

    function _updateModel(metaUrl) {
        pokeApi.find(metaUrl)
            .then(function (result) {
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
    }
    _updateModel();

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
    .directive('infoBox', function infoBox(){
        return {
            scope: {
                pokemon: '=',
                types: '='
            },
            replace: true,
            template: [
            '<div class="info-box">',
            '<ul class="list-group">',
            '<img src="http://pokeapi.co/media/img/{{pokemon.national_id}}.png " alt="{{mainCtrl.pokemon.name}}">',
            '<h4>{{mainCtrl.pokemon.name}}</h4>',
            '<li class="list-group-item"> Attack <span class="badge">{{pokemon.attack}}</span></li>',
            '<li class="list-group-item">Type <span class="badge" ng-repeat="type in types">{{type.name}}</span></li>',
            '<li class="list-group-item">Defense <span class="badge">{{pokemon.defense}}</span></li>',
            '<li class="list-group-item">HP <span class="badge">{{pokemon.hp}}</span></li>',
            '<li class="list-group-item">SP Attack <span class="badge">{{pokemon.sp_atk}}</span></li>',
            '<li class="list-group-item">SP Defense <span class="badge">{{pokemon.sp_def}}</span></li>',
            '<li class="list-group-item">Speed <span class="badge">{{pokemon.speed}}</span></li>',
            '<li class="list-group-item"> Weight <span class="badge">{{pokemon.weight}}</span></li>',
            '<li class="list-group-item">Total moves <span class="badge">{{pokemon.moves.length}}</span></li>',
            '</ul></div>'
            ].join(''),
            link: function(scope, element, attrs) {
                $(window).scroll(function(e){
                    //console.log(e);
                    var $el = $('.info-box');
                    var isPositionFixed = ($el.css('position') == 'fixed');
                    if ($(this).scrollTop() > 116 && !isPositionFixed){
                        $el.addClass('info-box-sticky');
                    }
                    if ($(this).scrollTop() < 116 && isPositionFixed)
                    {
                        $el.removeClass('info-box-sticky');
                    }

                });

            }
        };
    });

angular.module('PokeDex')
    .directive('pokeBox', function pokeBox(){
        return {
            scope: {
                pokemons: '='
            },
            replace: true,
            template: [
            '<div class="col-sm-6 col-md-4" ng-repeat="pokemon in pokemons">',
            '<a href="javascript:void(0)" ng-click="mainCtrl.findById(pokemon.id)" uib-popover="Click for more info" popover-trigger="mouseenter">',
            '<div class="thumbnail poke-box">',
            '<div class="poke-img">',
            '<img src="http://pokeapi.co/media/img/{{pokemon.id}}.png " alt="{{pokemon.name}}"></div>',
            '<div class="caption"><h3>{{pokemon.name}}</h3>',
            '<ul class="nav nav-pills" role="tablist">',
            '<li ng-repeat="type in pokemon.types"><span class="badge poke-badge">{{type.name}}</span></li>',
            '</ul></div></div></a></div>'

            ].join(''),
            link: function(scope, element, attrs) {
                //реализовать тултип на div element

                var options = {
                    placement: 'top',
                    html: true,
                    template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
                };
                var test = element.find('[data-toggle="tooltip"]').tooltip(options);
                console.log(element.children(1).tooltip(options));
                console.log(test);
                //console.log(angular.element(element[0]));


            }
        };
    });


