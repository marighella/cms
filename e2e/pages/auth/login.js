var LoginPage = function () {
  var helper = require('../../helper.js');
  var fields =  {
    email: element(by.name('login')),
    password: element(by.name('password'))
  };
  var buttons = {
    github: element(by.css('input[type="submit"]')),
    login: element(by.css('.login'))
  };

  var visitPage = function(){
    buttons.login.click();

    browser.ignoreSynchronization = true;
    browser.getAllWindowHandles().then(function (handles) {
      browser.switchTo().window(handles[1]);
    });
  };

  var closePage = function(){
    browser.getAllWindowHandles().then(function (handles) {
      browser.switchTo().window(handles[0]);
    });
  };

  var authenticationOnGithub = function() {
    buttons.github.click();
  };

  this.autenticate = function(email, password){
    visitPage();

    browser.wait(function(){
      return fields.email.isPresent();
    }, 10000);


    helper.fill(fields.email, email);
    helper.fill(fields.password, password);

    authenticationOnGithub();
    closePage();
  }
};

module.exports = new LoginPage();

