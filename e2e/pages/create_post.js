var PostPage = function () {
  this.helper = require('../helper.js');

  // Dynamic fields
  this.dateField = element(by.css('.date'));
  this.timeField = element(by.css('.time'));
  this.hatField =  element(by.id('hat'));
  this.titleField = element(by.id('title'));
  this.videoField = element(by.id('video'));
  this.supportLineField = element(by.id('support_line'));
  this.menuField = element(by.id('menu'));
  this.menuElement = element(by.css('#menu option:checked'));
  this.sectionField = element(by.id('section'));
  this.sectionElement = element(by.css('#section option:checked'));

  // Actions links
  this.dropdownCaretButton =  element(by.css('button.action-caret'));
  this.draftLink = element(by.css('a.draft'));
  this.publishLink = element(by.css('a.publish'));
  this.actionButton = element(by.css('button.action'));
  this.fileToUploadField = $('input[type="file"]');

  // Specia fields
  this.tagField = element(by.model("newTag.text"));
  this.imageCheckBoxField = element(by.css('[class="image_checkbox"]'));
  this.allInputFields = element.all(by.css('input, textarea'));

  this.fillFileToUpload = function (fileToUpload){
    this.fileToUploadField.sendKeys(fileToUpload);
  }
  this.fillHat = function (hat){
    this.hatField.sendKeys(hat);
  }
  this.fillDate = function(date){
    this.dateField.sendKeys(date);
  }
  this.fillTime = function(time){
    this.timeField.sendKeys(time);
  }
  this.fillTitle = function (title){
    this.titleField.sendKeys(title);
  }
  this.fillSupportLine = function (supportLine){
    this.supportLineField.sendKeys(supportLine);
  }
  this.fillMenu = function (menu){
    this.menuField.sendKeys(menu);
  }
  this.fillSection = function (section) {
    this.sectionField.sendKeys(section);
  }
  this.fillTag = function (tag) {
    this.tagField.sendKeys(tag);
  }
  this.fillVideo = function (video) {
    this.videoField.sendKeys(video);
  }
  this.checkImageCheckBox = function (){
    this.imageCheckBoxField.click();
  }
  this.clickDropdownCaretButton = function (){
    this.dropdownCaretButton.click();
  }
  this.clickDraftLink = function (){
    this.draftLink.click();
  }
  this.clickPublishLink = function(){
    this.publishLink.click();
  }
  this.clickActionButton = function (){
    this.actionButton.click();
  }
  this.fillAllDetails = function (postData, SECTION){
    this.fillDate(postData.DATE);
    this.fillHat(postData.HAT);
    this.fillTitle(postData.TITLE);
    this.fillSupportLine(postData.SUPPORTLINE);
    this.fillMenu(postData.MENU);
    this.fillSection(SECTION);
    this.fillTag(postData.TAG);
  }
  this.postDraft = function(){
    this.clickDropdownCaretButton();
    this.clickDraftLink();
    browser.sleep(1000);
    this.clickActionButton();
  }
  this.publish = function(){
    this.clickDropdownCareButton();
    this.clickPublishLink();
    browser.sleep(1000);
    this.clickActionButton();
  }
  this.cleanFields = function(numberOfFields){
    this.allInputFields.each(function(item, i){
      if(i<numberOfFields)
        item.clear();
    });
  }
  this.getCheckedSection = function(){
    return this.sectionElement.getText();
  }
  this.getCheckedMenu = function(){
    return this.menuElement.getText();
  }
};

module.exports = new PostPage();
