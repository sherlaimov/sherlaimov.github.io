(function(){
    'use strict';
    function infoBox(){
        return {
            scope: {
                pokemon: '=',
                types: '='
            },
            replace: true,
            template: [
                '<div class="info-box">',
                '<ul class="list-group">',
                '<li class="list-group-item"><img src="http://pokeapi.co/media/img/{{pokemon.national_id}}.png " alt="{{pokemon.name}}">',
                '<h4>{{pokemon.name}}</h4></li>',
                '<li class="list-group-item"> Attack <span class="badge">{{pokemon.attack}}</span></li>',
                '<li class="list-group-item">Type <span class="{{type.name}} badge" ng-repeat="type in types">{{type.name}}</span></li>',
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
                    var $el = element;
                    var isPositionFixed = ($el.css('position') == 'fixed');
                    if ($(this).scrollTop() > 207 && !isPositionFixed){
                        $el.addClass('info-box-sticky');
                    }
                    if ($(this).scrollTop() < 207 && isPositionFixed){
                        $el.removeClass('info-box-sticky');
                    }

                });
            }
        };
    }
    angular
        .module('PokeDex')
        .directive('infoBox', infoBox);
})();
