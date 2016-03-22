angular.module('PokeDex')
    .controller('MainCtrl', ['PokeApi', MainCtrl]);

function MainCtrl(pokeApi) {
    var main = this;
    main.pokemons = {};
    main.meta = {};

    function _showError(e) {
        console.log(e);
    }

    function _updateModel(metaUrl) {
        console.log(metaUrl);
        pokeApi.find(metaUrl)
            .then(function (result) {
                 main.pokemons = result.data.objects.map(function (obj) {
                    return {
                        name: obj.name,
                        id: obj.national_id,
                        sprites: obj.sprites
                    };
                });
                main.meta = {
                    limit: result.data.meta.limit,
                    next: result.data.meta.next,
                    offset: result.data.meta.offset,
                    previous: result.data.meta.previous,
                    total_count: result.data.meta.total_count
                };
                console.log(main.meta);
                console.log(main.pokemons);

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


}