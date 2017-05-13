'use strict';

angular.module('cmsApp')
  .service('PromiseUtil', function PromiseUtil($q, $http) {
    this.request = function(address, method, data, then, error){
      var deferred   = $q.defer();
      var promise    = deferred.promise;
      var connection = $http;

      method = method ||'GET';
      data = data || {};
      then = then || function(data){return data;};
      error = error || function(error){return error;};

      var request = undefined;
      var config = {
        headers: {
          'Authorization': 'Bearer ' + window.localStorage['jwt_marighella']
        }
      };

      if(method === 'POST'){
        request = connection.post(address, data, config);
      }else if(method === 'PUT'){
        request = connection.put(address, data, config);
      }else{
        config.params = data
        request = connection.get(address, config);
      }

      request.then(
        function successCallback(response){
          return deferred.resolve(then(response.data));
        },
        function errorCallback(response){
          return deferred.reject(error(response));
        }
      );

      return promise;
    }

  });
