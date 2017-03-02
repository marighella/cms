'use strict';

angular.module('cmsApp')
  .controller('AuthCtrl', function ($rootScope, $scope, $location, $auth, _, ENV, User, PromiseUtil) {

    $scope.user = {
      logged: false,
      organization: false,
      repositories: [],
    };

    $scope.finish = function(repository){
      if(!!repository){
        var obj = angular.fromJson(repository);
        $scope.user.repository = obj;
        $rootScope.user = $scope.user;
        $rootScope.repository = $scope.user.repository;
        $location.path('/post/search');
      }
    };

    $scope.isOrgSelected = function(organization){
      if(!$scope.user.organization){
        return false;
      }

      return $scope.user.organization.login === organization.login;
    };

    $scope.getRepositories = function(organization){
      $scope.user.organization = undefined;
      $scope.user.repositories = [];

      if(!!organization){
        var obj = angular.fromJson(organization);
        $scope.user.organization = obj;

        PromiseUtil
          .request(ENV.api.repositories, 'GET', { org: obj.login })
          .then(function(repos){
            if(repos.length === 1){
              $scope.finish(repos[0]);
            }else{
              Array.prototype.push.apply($scope.user.repositories, repos);
            }
          });
      }
    };


    $scope.authenticate =  function(){
      if(!!window.localStorage['jwt_marighella']){
        $scope.user = User.info();
        $scope.user.logged = true;

        return true;
      }

      $auth.authenticate('github')
        .then(function(response){
          return PromiseUtil.request(ENV.authentication, 'GET', response);
        })
        .then(function(result){
          window.localStorage['jwt_marighella'] = result.jwt;

          $scope.user = User.info();
          $scope.user.logged = true;
        })
        .catch(function(response){
          console.error('ERROR on authenticate', response);
          window.alert(response);
        });
    };
  });
