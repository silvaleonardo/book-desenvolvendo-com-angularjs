angular.module('stockMarketApp')
       .directive('simpleStockRepeat', [function() {
        return {
          restrict: 'A',
          // Captura e substitui todo o elemento
          // em vez de fazer isso somente com o seu conteúdo
          transclude: 'element',
          // Um $transclude é passado como quinto
          // argumento da função link
          link: function($scope, $element, $attrs, ctrl, $transclude) {
            var myArray = $scope.$eval($attrs.simpleStockRepeat);

            var container = angular.element(
              '<div class="container"></div>');
            for (var i = 0; i < myArray.length; i++) {
              // Cria uma instância do elemento com um novo escopo--filho
              // usando a função de ligação do clone
              var instance = $transclude($scope.$new(),
                  function(clonedElement, newScope) {
                // Expõe as variáveis personalizadas da instância
                newScope.currentIndex = i;
                newScope.stock = myArray[i];
              });
              // Adiciona em nosso contêiner
              container.append(instance);
            }

            // Com transclude: 'element', o elemento é subtituído
            // por um comentário. Adiciona o nosso conteúdo gerado
            // após o comentário
            $element.after(container);
          }
        };
      }]);
