var PostPage = function () {
  var helper = require('../../helper.js');
  var fields = {
    date: element(by.css('.date')),
    time: element(by.css('.time')),
    hat:  element(by.id('hat')),
    title: element(by.id('title')),
    video: element(by.id('video')),
    support_line: element(by.id('support_line')),
    menu: element(by.id('menu')),
    section: element(by.id('section')),
    tag: element(by.model("newTag.text"))
  };
  var selected_options = {
    menu: element(by.css('#menu option:checked')),
    section: element(by.css('#section option:checked'))
  };
  var actions = {
    save_options: element(by.css('button.action-caret')),
    draft: element(by.css('a.draft')),
    publish: element(by.css('a.publish')),
    save: element(by.css('button.action')),
    upload: $('input[type="file"]'),
    cover_image: element(by.css('image_checkbox'))
  };

  this.allInputFields = element.all(by.css('input, textarea'));

  this.checkImageCheckBox = function (){
    actions.cover_image.click();
  }
  this.clickDropdownCaretButton = function (){
    actions.save_options.click();
  }
  this.clickDraftLink = function (){
    actions.draft.click();
  }
  this.clickPublishLink = function(){
    actions.publish.click();
  }
  this.clickActionButton = function (){
    actions.save.click();
  }
  this.fillAllDetails = function (postData){
    helper.fill(fields.date, postData.DATE);
    helper.fill(fields.hat, postData.HAT);
    helper.fill(fields.title, postData.TITLE);
    helper.fill(fields.support_line, postData.SUPPORTLINE);
    helper.fill(fields.menu, postData.MENU);
    helper.fill(fields.section, postData.SECTION);
    helper.fill(fields.tag, postData.TAG);
  }

  this.waitExists = function(){
    browser.wait(function(){
      return fields.date.isPresent();
    }, 10000);
  }

  this.clearDate = function(){
    helper.clear(fields.date);
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

  this.getCheckedSection = function(){
    return selected_options.section.getText();
  }

  this.getCheckedMenu = function(){
    return selected_options.menu.getText();
  }
};

module.exports = new PostPage();
