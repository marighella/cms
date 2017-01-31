'use strict';

angular.module('cmsApp')
  .controller('AuthCtrl', function ($rootScope, $scope, $timeout, $location, $auth, _, User, Resource, Repository) {

    var fillRepository = function(repoName){
      var org = $scope.user.organization;
      return Repository.organization.get(org).repository(repoName);
    };

    $scope.user = { logged: false,
                organization: false,
                repositories: [] };

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

        if(!!obj.repositories && obj.repositories.length === 1 ){
          fillRepository(obj.repositories[0])
          .then(function(repo){
            $scope.finish(repo);
          });
        }else if(!!obj.repositories){
          _.each(obj.repositories, function(repoName){
            fillRepository(repoName)
            .then(function(repo){
              $scope.user.repositories.push(repo);
            });
          });
        }else{
          Repository.organization.get(obj)
          .repositories().then(function(result){
            $scope.user.repositories = result;
          });
        }
      }
    };


    $scope.authenticate =  function(){
      $auth.authenticate('github').
      then(function(response){
        console.log('certo', response);
        console.log('token', $auth.getToken());
      }).
      catch(function(response){
        console.log('errado', response);
      });
      /*
      .done(function(response) {
      Resource.github = response;
      $timeout(function(){
      $scope.user = User.info();
      $scope.user.logged = true;
      },0);
      }).fail(function(error){
      if(error) {
      return window.alert(error);
      }
      });
      */
    };
  });
