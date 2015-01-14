'use strict';

var Helper = function () {
  this.waitUntilIsDisplayed = function(ptor, element, timeMax){
    browser.wait(function(){
      return element.isDisplayed();
    }, timeMax);
  };

  this.clear = function(field){
    field.clear();
  };

  this.wait = function(element, timeMax){
    timeMax = timeMax || 2000;
    browser.wait(function(){
      return element.isDisplayed();
    }, timeMax);
  };

  this.random = function (value){
    return value + (new Date()).getTime();
  };

  this.fill = function(element, value){
    this.wait(element);
    element.sendKeys(value);
  };

};

module.exports = new Helper();
