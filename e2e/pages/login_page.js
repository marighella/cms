var LoginPage = function () {
  this.emailField=element(by.name('login'));
  this.passwordField=element(by.name('password'));
  this.loginButton=element(by.css('.auth-form-body .button'));

  this.visitPage = function(){
    element(by.css('[class="btn btn-default"]')).click();
    browser.ignoreSynchronization = true;
    browser.getAllWindowHandles().then(function (handles) {
      browser.sleep(2 * 1000);
      browser.switchTo().window(handles[1]);
    });
  }

  this.closePage = function(){
    browser.getAllWindowHandles().then(function (handles) {
      browser.switchTo().window(handles[0]);
      browser.sleep(2*1000);
    });
  }

  this.fillEmail = function(email){
    this.emailField.sendKeys(email);
  }

  this.fillPassword = function (password){
    this.passwordField.sendKeys(password);
  }

  this.login = function() {
    this.loginButton.click();
  }
  this.autenticate = function(email, password){
    this.visitPage();
    browser.sleep(2000);
    this.fillEmail(email);
    this.fillPassword(password);
    this.login();
    this.closePage();
  }
};
module.exports = new LoginPage();

