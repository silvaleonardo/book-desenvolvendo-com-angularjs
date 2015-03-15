angular.module('fifaApp')
  .controller('MainCtrl', ['UserService',
    function(UserService) {
      var self = this;
      self.userService = UserService;

      // Verifica se o usuário está logado quando a aplicação
      // for carregada
      // UserService irá atualizar isLoggedIn automaticamente
      // depois que esta chamada dor concluída.
      UserService.session();
  }])

  .controller('TeamListCtrl', ['FifaService',
    function(FifaService) {
      var self = this;
      self.teams = [];

      FifaService.getTeams().then(function(resp) {
        self.teams = resp.data;
      });
  }])

  .controller('LoginCtrl', ['UserService', '$location',
    function(UserService, $location) {
      var self = this;
      self.user = {username: '', password: ''};

      self.login = function() {
        UserService.login(self.user).then(function(success) {
          $location.path('/');
        }, function(error) {
          self.errorMessage = error.data.msg;
        })
      };
  }])

  .controller('TeamDetailsCtrl',
    ['$location', '$routeParams', 'FifaService',
    function($location, $routeParams, FifaService) {
      var self = this;
      self.team = {};
      FifaService.getTeamDetails($routeParams.code)
          .then(function(resp){
        self.team = resp.data;
      }, function(error){
        $location.path('/login');
      });
    }]);
