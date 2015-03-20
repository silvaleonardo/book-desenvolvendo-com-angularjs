angular.module('stockMarketApp')
       .directive('validZip', [function() {
        var zipCodeRegex = /^\d{5}(?:[-\s]\d{4})?$/g;
        return {
          restrict: 'A',
          require: 'ngModel',
          link: function($scope, $element, $attrs, ngModelCtrl) {
            // Cuida da atualização do DOM --> Atualização do módulo
            ngModelCtrl.$parsers.unshift(function(value) {
              var valid = zipCodeRegex.test(value);
              ngModelCtrl.$setValidity('validZip', valid);
              return valid ? value : undefined;
            });

            // Cuida da atualização do modelo --> DOM
            ngModelCtrl.$formatters.unshift(function(value) {
              ngModelCtrl.$setValidity('validZip', zipCodeRegex.test(value));
              return value;
            });
          }
        };
      }]);
