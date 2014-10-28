exports.config={
 seleniumAddress:"http://localhost:4444/wd/hub",
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
   var loginPage = require("./pages/login_page.js");
   var organizationsPage = require("./pages/organizations.js");
   var helper = require("./helper.js");
   var URL = "http://0.0.0.0:9000/#/auth";
   var EMAIL = "e2etest";
   var PASSWORD = "mypassw0rd123";
   var ptor = protractor.getInstance();
   browser.get(URL);
   loginPage.autenticate(EMAIL, PASSWORD);
   browser.sleep(2000);
   organizationsPage.selectOrganization('Movimento-sem-t');
   helper.waitUntilIsDisplayed(ptor, organizationsPage.repositoryDropDown, 3000);
   organizationsPage.selectRepository('mst');
 },
 capabilities: {
    browserName: 'chrome',
    'chromeOptions': {
      args: ['--test-type']
    }
 }
}
