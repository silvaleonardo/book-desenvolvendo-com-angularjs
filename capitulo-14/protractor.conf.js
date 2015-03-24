exports.config = {
  // O endereço de um servidor Selenium em execução
  seleniumAddress: 'http://localhost:4444/wd/hub',

  // O URL em que o servidor que estaremos testando está executando
  baseUrl: 'http://localhost:8000/',

  // Recursos a serem passadas à instância do WebDriver
  capabilities: {
    'browserName': 'chrome'
  },

  // Os padrões de especificação são relativos à localização do
  // arquivos de especificação. Padrões globais poderão ser incluídos.
  specs: ['*Spec*.js'],

  // Opções a serem passadas para o nó Jasmine
  jasmineNodeOpts: {
    showColors: true // Use cores no relatório da linha de comando
  }
};
