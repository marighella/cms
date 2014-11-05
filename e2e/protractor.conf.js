exports.config={
 seleniumAddress:"http://localhost:4444/wd/hub",
 // Do not start a Selenium Standalone sever - only run this using chrome.
 chromeOnly: true,
 chromeDriver: '/usr/local/bin/chromedriver',
 // Capabilities to be passed to the webdriver instance.
 capabilities: {
   'browserName': 'chrome'
 },
 baseUrl: 'http://127.0.0.1:9000',

 specs: ['specs/*_spec.js'],
 jasmineNodeOpts: {
   // If true, display spec names.
   isVerbose: true,
   // If true, print colors to the terminal.
   showColors: true,
   // If true, include stack traces in failures.
   includeStackTrace: true,
   // Default time to wait in ms before a test fails.
   defaultTimeoutInterval: 30000
 },
 onPrepare:function(){
   var loginPage = require("./pages/auth/login.js");
   var organizationsPage = require("./pages/auth/organization.js");
   var helper = require("./helper.js");

   var URL = "http://0.0.0.0:9000/#/auth";
   var EMAIL = "e2etest";
   var PASSWORD = "mypassw0rd123";
   var ORGANIZATION = 'Movimento-sem-t';
   var REPOSITORY = 'mst';

   browser.get(URL);

   loginPage.autenticate(EMAIL, PASSWORD);
   organizationsPage.fill(ORGANIZATION, REPOSITORY);
 },

 capabilities: {
    browserName: 'chrome',
    'chromeOptions': {
      args: ['--test-type']
    }
 }
}
