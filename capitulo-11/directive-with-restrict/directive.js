angular.module('stockMarketApp')
       .directive('stockWidget', [function() {
        return {
          templateUrl: 'stock.html',
          restrict: 'AE'
        };
      }]);