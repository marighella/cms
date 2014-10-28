var PostPage = function () {
  this.helper = require('../helper.js');
  this.fileToUploadField = $('input[type="file"]');
  this.dateField = element(by.name('date'));
  this.timeField = element(by.name('time'));
  this.hatField =  element(by.css('[name="hat"]'));
  this.titleField = element(by.css('[name="title"]'));
  this.supportLineField = element(by.css('[name="support_line"]'));
  this.menuField = element(by.css('[name="menu"]'));
  this.sectionField = element(by.name('section'));
  this.tagField = element(by.model("newTag.text"));
  this.videoField = element(by.css('[name="video"]'));
  this.imageCheckBoxField = element(by.css('[class="image_checkbox"]'));
  this.dropdownCaretButton =  element(by.css('[class="btn btn-default dropdown-toggle action-caret"]'));
  this.draftLink = element(by.css('[class="draft"]'));
  this.publishLink = element(by.css('[class="publish"]'));
  this.actionButton = element(by.css('[class="btn btn-default action"]'));
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
   // this.fillTime(postData.TIME);
    this.fillHat(postData.HAT);
    this.fillFileToUpload(postData.FILETOUPLOAD);
    this.fillTitle(postData.TITLE);
    this.fillSupportLine(postData.SUPPORTLINE);
    this.fillMenu(postData.MENU);
    this.fillSection(SECTION);
    this.fillTag(postData.TAG);
    this.helper.waitUntilIsDisplayed(protractor.getInstance(), this.imageCheckBoxField, 14000);
    this.checkImageCheckBox();
  }
  this.postDraft = function(){
    this.clickDropdownCaretButton();
    this.clickDraftLink();
    this.clickActionButton();
  }
  this.publish = function(){
    this.clickDropdownCareButton();
    this.clickPublishLink();
    this.clickActionButton();
  }
  this.cleanFields = function(numberOfFields){
    this.allInputFields.each(function(item, i){
      if(i<numberOfFields)
        item.clear();
    });
  }
  this.getCheckedSection = function(){
    return element(by.css('[name="section"')).$("option:checked").getText();
  }
  this.getCheckedMenu = function(){
    return this.menuField.$("option:checked").getText();
  }
};

module.exports = new PostPage();
