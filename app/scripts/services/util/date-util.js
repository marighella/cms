'use strict';

/**
 * @ngdoc service
 * @name cmsApp.Dateutil
 * @description
 * # Dateutil
 * Service in the cmsApp.
 */
angular.module('cmsApp')
  .service('DateUtil', function DateUtil($filter) {
    this.now = {
      getMonth: function (){
        return (new Date()).getMonth();
      },
      getYear: function (){
        return (new Date()).getFullYear();
      }
    };

    this.format = function(year, month){
      var date = new Date(year, month);

      return $filter('date')(date,'yyyy/MM');
    };
  });
