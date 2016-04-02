(function(){
    'use strict';

    function pokeBox(){
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
                    '<li ng-repeat="type in pokemon.types"><span class="badge {{type.name}} poke-badge">{{type.name}}</span></li>',
                    '</ul></div></div></a></div>'

                ].join('')

            };
        }

    angular.module('PokeDex')
        .directive('pokeBox', pokeBox);
})();