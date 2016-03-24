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
                //console.log(main.meta);
                console.log(main.meta);

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
                //for(var i in result.data) {
                //    main.pokemon[i] = result.data[i];
                //}
                    //return {
                    //    name: obj.name,
                    //    type: obj.type,
                    //    attack: obj.attack,
                    //    defense: obj.defense,
                    //    hp: obj.hp,
                    //    sp_atk: obj.sp_atk,
                    //    sp_def: obj.sp_def,
                    //    speed: obj.speed,
                    //    weight: obj.weight,
                    //    moves: obj.moves.length
                    //}

                console.log(main.pokemon.types);
            })
            .catch(_showError);
    }
    main.findById = _findById;



}