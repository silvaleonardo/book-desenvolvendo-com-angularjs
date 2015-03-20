angular.module('sliderApp')
       .directive('noUiSlider', [function() {
        return {
          restrict: 'E',
          require: 'ngModel',
          link: function($scope, $element, $attr, ngModelCtrl) {

            $element.noUiSlider({
              // Pode ser que ainda não tenhamos o valor inicial em ngModelCtrl
              start: 0,
              range: {
                // $attrs, por default, disponibiliza valores em forma de string
                // nouiSlider espera números, portanto é preciso fazer a conversão
                min: Number($attr.rangeMin),
                max: Number($attr.rangeMax)
              }
            });

            // Quando os dados são alterados no AngularJS
            // Notifica a diretiva de terceiros sobre a mudança
            ngModelCtrl.$render = function() {
              $element.val(ngModelCtrl.$viewValue);
            };

            // Quando os dados são alterados dora do AngularJS
            $element.on('set', function(args) {
              // Também diz ao AngularJS que ele deve atualizar a UI
              $scope.$apply(function() {
                // Define o dado no AngularJS
                ngModelCtrl.$setViewValue($element.val());
              });
            });
          }
        };
      }]);
