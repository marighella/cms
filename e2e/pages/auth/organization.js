var OrganizationsPage = function(){
  var helper = require('../../helper.js');
  var spins = {
    organization: element(by.css('span.wait.organization'))
  };
  var fields = {
    organization: element(by.css('.organization')),
    repository: element(by.css('.repository'))
  };

  this.fill = function(organization, repository){
    browser.wait(function(){
      return spins.organization.isDisplayed().then(function(result){return !result});
    }, 3000);
    helper.fill(fields.organization, organization);
    helper.fill(fields.repository, repository);
  }
};
module.exports = new OrganizationsPage();
