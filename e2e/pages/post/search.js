var SearchPostsPage = function (){
  var helper = require('../../helper.js');
  var fields = {
    month : element(by.css('.month')),
    year : element(by.css('.year'))
  };
  var buttons = {
    create: element(by.css('button.create'))
  };
  var table = {
    first_post: {
      title: element(by.css('table > tbody > tr:first-child > td:nth-child(1) > span')),
      status:  element(by.css('table > tbody > tr:first-child > td:nth-child(2) > span')),
      edit_action:  element(by.css('table > tbody > tr:first-child > td:nth-child(3) > button'))
    }
  };

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
  }
  this.getPost = function(row, column){
    return table(row, column);
  };

  this.edit = function(post_row){
    return edit_action.click();
  }

  this.selectMonth = function(month){
    helper.fill(fields.month, month);
  }
  this.selectYear = function(year){
    helper.fill(fields.year, year);
  }
  this.waitExists = function(){
    browser.wait(function(){
      return buttons.create.isPresent();
    }, 10000);
  }
}
module.exports = new SearchPostsPage();
