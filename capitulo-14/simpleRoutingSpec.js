describe('Routing Test', function() {

  it('should show teams on the first page', function() {
    // Abre a página com a lista de times
    browser.get('/');

    // Verifica se há cinco linhas no repetidor
    var rows = element.all(
        by.repeater('team in teamListCtrl.teams'));
    expect(rows.count()).toEqual(5);

    // Verifica os detalhes da primeira linha
    var firstRowRank = element(
      by.repeater('team in teamListCtrl.teams')
        .row(0).column('team.rank'));
    var firstRowName = element(
      by.repeater('team in teamListCtrl.teams')
        .row(0).column('team.name'));
    expect(firstRowRank.getText()).toEqual('1');
    expect(firstRowName.getText()).toEqual('Spain');

    // Verifica os detalhes da última linha
    var lastRowRank = element(
      by.repeater('team in teamListCtrl.teams')
        .row(4).column('team.rank'));
    var lastRowName = element(
      by.repeater('team in teamListCtrl.teams')
        .row(4).column('team.name'));
    expect(lastRowRank.getText()).toEqual('5');
    expect(lastRowName.getText()).toEqual('Uruguay');

    // Verifica se o link de login está sendo mostrado e
    // o link de logout está oculto
    expect(element(by.css('.login-link')).isDisplayed())
        .toBe(true);
    expect(element(by.css('.logout-link')).isDisplayed())
        .toBe(false);
  });

  it('should allow logging in', function() {
    // Navega para a página de login
    browser.get('#/login');

    var username = element(
      by.model('loginCtrl.user.username'));
    var password = element(
      by.model('loginCtrl.user.password'));

    // Digita o nome do usuário e a senha
    username.sendKeys('admin');
    password.sendKeys('admin');

    // Clica no botão login
    element(by.css('.btn.btn-success')).click();

    // Garante que o suário foi redirecionado
    expect(browser.getCurrentUrl())
        .toEqual('http://localhost:8000/#/');

    // Verifica se o link de login está oculto e
    // o link de logout está sendo mostrado.
    expect(element(by.css('.login-link')).isDisplayed())
        .toBe(false);
    expect(element(by.css('.logout-link')).isDisplayed())
        .toBe(true);

  });
});
