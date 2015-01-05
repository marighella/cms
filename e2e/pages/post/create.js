/* globals element, by */

'use strict';

var PostPage = function () {
  var helper = require('../../helper.js');
  var fields = {
    date: element(by.css('.date')),
    time: element(by.css('.time')),
    hat:  element(by.id('hat')),
    title: element(by.id('title')),
    video: element(by.id('video')),
    /*jshint camelcase: false */
    support_line: element(by.id('support_line')),
    /*jshint camelcase: true */
    menu: element(by.id('menu')),
    section: element(by.id('section')),
    tag: element(by.model('newTag.text'))
  };
  /*jshint camelcase: false */
  var selected_options = {
    menu: element(by.css('#menu option:checked')),
    section: element(by.css('#section option:checked'))
  };
  /*jshint camelcase: true */
  var actions = {
    /*jshint camelcase: false */
    save_options: element(by.css('button.action-caret')),
    /*jshint camelcase: true */
    draft: element(by.css('a.draft')),
    publish: element(by.css('a.publish')),
    save: element(by.css('button.action')),
    upload: element(by.css('input[type="file"]')),
    /*jshint camelcase: false */
    cover_image: element(by.css('image_checkbox'))
    /*jshint camelcase: true */
  };

  this.allInputFields = element.all(by.css('input, textarea'));

  this.getFields = function(){
    return fields;
  };

  this.checkImageCheckBox = function (){
    /*jshint camelcase: false */
    actions.cover_image.click();
    /*jshint camelcase: true */
  };

  this.clickDropdownCaretButton = function (){
    /*jshint camelcase: false */
    actions.save_options.click();
    /*jshint camelcase: true */
  };

  this.clickDraftLink = function (){
    actions.draft.click();
  };

  this.clickPublishLink = function(){
    actions.publish.click();
  };

  this.clickActionButton = function (){
    actions.save.click();
  };

  this.fillAllDetails = function (postData){
    helper.fill(fields.date, postData.DATE);
    helper.fill(fields.hat, postData.HAT);
    helper.fill(fields.title, postData.TITLE);
    /*jshint camelcase: false */
    helper.fill(fields.support_line, postData.SUPPORTLINE);
    /*jshint camelcase: true */
    helper.fill(fields.menu, postData.MENU);
    helper.fill(fields.section, postData.SECTION);
    helper.fill(fields.tag, postData.TAG);
  };

  this.waitExists = function(){
    browser.wait(function(){
      return fields.date.isPresent();
    }, 10000);
  };

  this.clearDate = function(){
    helper.clear(fields.date);
  };

  this.postDraft = function(){
    this.clickDropdownCaretButton();
    this.clickDraftLink();
    browser.sleep(1000);
    this.clickActionButton();
  };

  this.publish = function(){
    this.clickDropdownCareButton();
    this.clickPublishLink();
    browser.sleep(1000);
    this.clickActionButton();
  };

  this.getCheckedSection = function(){
    /*jshint camelcase: false */
    return selected_options.section.getText();
    /*jshint camelcase: true */
  };

  this.getCheckedMenu = function(){
    /*jshint camelcase: false */
    return selected_options.menu.getText();
    /*jshint camelcase: true */
  };
};

module.exports = new PostPage();
