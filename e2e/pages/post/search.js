/* globals element, by */

'use strict';

var SearchPostsPage = function (){
  var helper = require('../../helper.js');
  var fields = {
    month : element(by.css('.month')),
    year : element(by.css('.year'))
  };
  var buttons = {
    create: element(by.css('button.create'))
  };

  /*jshint camelcase: false */
  var table_result = {
    first_post: {
      title: element(by.css('table > tbody > tr:first-child > td:nth-child(2) > span')),
      status:  element(by.css('table > tbody > tr:first-child > td:nth-child(3) > span')),
      edit_action:  element(by.css('table > tbody > tr:first-child > td:nth-child(4) > button'))
    }
  };
  /*jshint camelcase: true */

  var table = function(row,column){
    var elements = element.all(by.repeater('post in posts').row(row)).all(by.tagName('td'));
    return elements.then(function(cols){
      return cols[column].getText();
    });
  };

  this.createNewPost = function(){
    browser.wait(function(){
      return buttons.create.isDisplayed();
    }, 10000);
    browser.sleep(100);
    buttons.create.click();
  };

  this.getPost = function(row, column){
    return table(row, column);
  };

  this.edit = function(){
    /*jshint camelcase: false */
    return table_result.first_post.edit_action.click();
    /*jshint camelcase: true */
  };

  this.selectMonth = function(month){
    helper.fill(fields.month, month);
  };

  this.selectYear = function(year){
    helper.fill(fields.year, year);
  };

  this.waitExists = function(){
    browser.wait(function(){
      return buttons.create.isPresent();
    }, 10000);
  };
};

module.exports = new SearchPostsPage();
