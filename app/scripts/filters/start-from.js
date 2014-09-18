'use strict';

angular.module('cmsApp')
  .filter('startFrom', function() {
    return function(input, start) {
      start = +start;
      return (typeof input === 'object' && input.length > 0) ? input.slice(start): [];
    };
  });
