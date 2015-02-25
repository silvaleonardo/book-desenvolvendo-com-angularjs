describe('Controller: ListCtrl', function() {
  // Instancia uma nova versão de meu módulo antes de cada teste
  beforeEach(module('notesApp'));

  var ctrl;

  // Antes de cada teste de unidade, cria uma nova instância do controlador
  beforeEach(inject(function($controller) {
    ctrl = $controller('ListCtrl');
  }));

  it('should have items available on load', function() {
    expect(ctrl.items).toEqual([
      {id: 1, label: 'First', done: true},
      {id: 2, label: 'Second', done: false}
    ]);
  });

  it('should have highlight items based on state', function() {
    var item = {id: 1, label: 'First', done: true};

    var actualClass = ctrl.getDoneClass(item);
    expect(actualClass.finished).toBeTruthy();
    expect(actualClass.unfinished).toBeFalsy();

    item.done = false;
    actualClass = ctrl.getDoneClass(item);
    expect(actualClass.finished).toBeFalsy();
    expect(actualClass.unfinished).toBeTruthy();
  });
});