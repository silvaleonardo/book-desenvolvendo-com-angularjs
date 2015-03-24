// O ideal é que os PageObjects estejam em arquivos separados
// para permitir a reutilização em todos os testes,
// porém estão todos listados aqui para facilitar a compreensão

function TeamsListPage() {
  this.open = function() {
    browser.get('/');
  };

  this.getTeamsListRows = function() {
    return element.all(by.repeater('team in teamListCtrl.teams'));
  };

  this.getRankForRow = function(row) {
    return element(
      by.repeater('team in teamListCtrl.teams')
        .row(row).column('team.rank'));
  };

  this.getNameForRow = function(row) {
    return element(
      by.repeater('team in teamListCtrl.teams')
        .row(row).column('team.name'));
  };

  this.isLoginLinkVisible = function() {
    return element(by.css('.login-link')).isDisplayed();
  };

  this.isLogoutLinkVisible = function() {
    return element(by.css('.logout-link')).isDisplayed();
  };
}

describe('Routing Test With Page objects', function() {

  it('should show teams on the first page', function() {
    var teamsListPage = new TeamsListPage();

    teamsListPage.open();

    expect(teamsListPage.getTeamsListRows().count()).toEqual(5);

    expect(teamsListPage.getRankForRow(0).getText())
      .toEqual('1');
    expect(teamsListPage.getNameForRow(0).getText())
      .toEqual('Spain');

    expect(teamsListPage.getRankForRow(4).getText())
      .toEqual('5');
    expect(teamsListPage.getNameForRow(4).getText())
      .toEqual('Uruguay');

    // Verifica se o link de login está sendo mostrado e
    // o link de logout está oculto
    expect(teamsListPage.isLoginLinkVisible()).toBe(true);
    expect(teamsListPage.isLogoutLinkVisible()).toBe(false);
  });
});
