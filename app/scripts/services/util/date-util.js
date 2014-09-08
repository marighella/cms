'use strict';

/**
 * @ngdoc service
 * @name cmsApp.Dateutil
 * @description
 * # Dateutil
 * Service in the cmsApp.
 */
angular.module('cmsApp')
  .service('DateUtil', function DateUtil() {
    this.now = {
      getMonth: function (){
        return (new Date()).getMonth();
      },
      getYear: function (){
        return (new Date()).getFullYear();
      }
    };
  });
