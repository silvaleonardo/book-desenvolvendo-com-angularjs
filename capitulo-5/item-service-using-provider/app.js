function ItemService(opt_items) {
  var items = opt_items || [];

  this.list = function() {
    return items;
  };

  this.add = function(item) {
    items.push(item);
  };
}

angular.module('notesApp', [])
       .provider('ItemService', function() {
        var haveDefaultItems = true;
        this.disableDefaultItems = function() {
          haveDefaultItems = false;
        };

        // Esta função obtém nossas dependências, e não o provedor anterior
        this.$get = [function() {
          var optItems = [];
          if(haveDefaultItems) {
            optItems = [
              {id: 1, label: 'Item 0'},
              {id: 2, label: 'Item 1'}
            ];
          }

          return new ItemService(optItems);
        }];
       })
       .config(['ItemServiceProvider', function(ItemServiceProvider) {
        // Para ver como o provedor pode alterar a configuração, altere o valor de
        // shouldHaveDefaults para true e tente executar o exemplo
        var shouldHaveDefaults = false;

        // Obtém a configuração do servidor
        // Define shouldHaveDefaults de alguma maneira
        // Suponha que ele mude de modo mágico, por enquanto
        if(!shouldHaveDefaults) {
          ItemServiceProvider.disableDefaultItems();
        }
       }])
       .controller('MainCtrl', [function() {
         var self = this;
         self.tab = 'first';
         self.open = function(tab) {
          self.tab = tab;
         };
       }])
       .controller('SubCtrl', ['ItemService', function(ItemService) {
        var self = this;
        self.list = function() {
          return ItemService.list();
        };

        self.add = function() {
          ItemService.add({
            id: self.list().length + 1,
            label: 'Item ' + self.list().length
          });
        };
       }]);