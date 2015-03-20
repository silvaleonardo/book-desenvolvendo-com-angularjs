angular.module('googleChartApp')
       .factory('googleChartLoaderPromise', ['$q', '$rootScope', '$window', function($q, $rootScope, $window) {
        // Cria um objeto diferido
        var deferred = $q.defer();

        // Carrega a Google Charts API de forma assíncrona
        $window.google.load('visualization', '1',
          {
            packages: ['corechart'],
            callback: function() {
              // Quando estiver carregada, dispara o resolve,
              // mas em um $apply, pois o evento ocorre
              // fora do ciclo de vida do AngularJS
              $rootScope.$apply(function() {
                deferred.resolve();
              });
            }
          });

        // Retorna o objeto promise em que a diretiva efetuará o encadeamento
        return deferred.promise;
      }]);
