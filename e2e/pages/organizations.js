var OrganizationsPage = function(){
  this.organizationDropDown = element(by.model('organization'));
  this.repositoryDropDown = element(by.model('repository'));
  
  this.selectOrganization = function(organization){
      this.organizationDropDown.sendKeys(organization);
  }
  this.selectRepository = function(repository){
    this.repositoryDropDown.sendKeys(repository);
  }
};
module.exports = new OrganizationsPage();
