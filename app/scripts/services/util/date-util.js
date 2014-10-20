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
    function pad(num) {
      var norm = Math.abs(Math.floor(num));
      return (norm < 10 ? '0' : '') + norm;
    }

    function toISO8601(local) {
      var tzo = -local.getTimezoneOffset();
      var sign = tzo >= 0 ? '+' : '-';
      return local.getFullYear() +
        '-' + pad(local.getMonth()+1) +
        '-' + pad(local.getDate()) +
        'T' + pad(local.getHours()) +
        ':' + pad(local.getMinutes()) +
        ':' + pad(local.getSeconds()) +
        sign + pad(tzo / 60) +
        ':' + pad(tzo % 60);
    }

    this.now = {
      getMonth: function (){
        return (new Date()).getMonth();
      },
      getYear: function (){
        return (new Date()).getFullYear();
      }
    };
    this.format = function(date){
      return $filter('date')(new Date(date),'yyyy/MM');
    };

    this.toISO8601 = function(date){
      return toISO8601(new Date(date));
    };

    this.fromISO8601 = function(dateISO){
      return {
        toMilliseconds: function(){
          return new Date(dateISO).getTime();
        }
      };
    };
  });
