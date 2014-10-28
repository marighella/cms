var OrganizationsPage = function(){
  var helper = require('../../helper.js');
  var fields = {
    organization: element(by.css('.organization')),
    repository: element(by.css('.repository'))
  };

  this.fill = function(organization, repository){
    helper.fill(fields.organization, organization);
    helper.fill(fields.repository, repository);
  }
};
module.exports = new OrganizationsPage();
