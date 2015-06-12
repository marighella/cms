'use strict';

angular.module('cmsApp')
  .filter('leadingZero', function() {
    return function(number) {
      if (number !== null && number !== undefined) {
        var str = '' + number;
        while (str.length < 2){
          str = '0' + str;
        }
        return str;
      }
    };
  });
