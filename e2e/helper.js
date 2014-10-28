var Helper = (function () {
 this.waitUntilIsDisplayed = function(ptor, element, timeMax){
  browser.wait(function(){
   return element.isDisplayed();
  }, timeMax);
 }
 this.clear = function(field){
   field.clear();
 }
 this.createTimeStamp = function(){
    var date =  new Date();
    var month = date.getMonth()+1;
    var time = new Date().toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");
    var TIMESTAMP = date.getDate()+"/"+month+"/"+date.getFullYear()+" "+time;
    return TIMESTAMP;
  }
});
module.exports = new Helper();
