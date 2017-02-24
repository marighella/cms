/* jshint camelcase: false */
'use strict';

angular.module('cmsApp')
  .factory('User', function(PromiseUtil, ENV) {

    return {
      info: function() {
        var result = {
          info: '',
          organizations: [],
          repositories: []
        };

        PromiseUtil
          .request(ENV.api.user, 'GET')
          .then(function(user){
            angular.extend(result, user);
          });

        return result;
      }
    };
  });
