(function() {
    'use strict';

    function config($logProvider) {
        // Enable log
        $logProvider.debugEnabled(true);

        // Set options third-party lib
        // ...
    }
    config.$inject = ['$logProvider'];

    angular
        .module('PokeDex')
        .config(config);

})();
