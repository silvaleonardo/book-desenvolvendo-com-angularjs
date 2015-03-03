describe('Server App Integration', function() {
  beforeEach(module('serverApp2'));

  var ctrl, mockBackend;
  beforeEach(inject(function($controller, $httpBackend) {
    mockBackend = $httpBackend;
    mockBackend.expectGET('/api/note').respond(404, {msg: 'Not found'});
    ctrl = $controller('MainCtrl');
    // Neste ponto, uma solicitação ao servidor deveria ser feita
  }));

  it('should handle error while loading items', function() {
    // Inicialmente, antes de o servidor responder,
    // items deverá estar vazio
    expect(ctrl.items).toEqual([]);
    // Simula uma resposta do servidor
    mockBackend.flush();
    // Não há itens provenientes do servidor, somente um erro
    // Portanto items deverá continuar vazio
    expect(ctrl.items).toEqual([]);
    // Verifica a mensagem de erro
    expect(ctrl.errorMessage).toEqual('Not found');
  });

  afterEach(function() {
    // Garante que todos os expects definidos em $httpBackend
    // foram realmente chamados
    mockBackend.verifyNoOutstandingExpectation();
    // Garante que todas as solicitações ao servidor
    // foram realmente respondidas (usando flush())
    mockBackend.verifyNoOutstandingRequest();
  });
});