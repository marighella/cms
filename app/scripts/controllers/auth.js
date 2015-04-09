'use strict';

angular.module('cmsApp')
  .controller('AuthCtrl', function ($rootScope, $scope, $timeout, $location, oauth, User, Resource, Repository, R) {

    this.user = {
      logged: false,
      organization: false,
      repositories: []
    };

    var fillRepository = function(org, repoName){
      return Repository.organization.get(org).repository(repoName);
    };

    this.finish = function(repository){
      var self = this;
      if(!!repository){
        var obj = angular.fromJson(repository);
        self.user.repository = obj;
        $rootScope.user = self.user;
        $rootScope.repository = self.user.repository;
        $location.path('/post/search');
      }
    };

    this.isOrgSelected = function(organization){
      if(!this.user.organization){
        return false;
      }

      return this.user.organization.login === organization.login;
    };
    this.getRepositories = function(organization){
      this.user.organization = undefined;
      this.user.repositories = [];

      if(!!organization){
        var obj = angular.fromJson(organization);
        this.user.organization = obj;
        var self = this;

        if(!!obj.repositories && obj.repositories.length === 1 ){
          fillRepository(self.user.organization, obj.repositories[0])
          .then(function(repo){
            self.finish(repo);
          });
        }else if(!!obj.repositories){
          R.forEach(function(repoName){
            fillRepository(self.user.organization, repoName)
              .then(function(repo){
                self.user.repositories.push(repo);
              });
          }, obj.repositories);
        }else{
          Repository.organization.get(obj)
            .repositories().then(function(result){
              self.user.repositories = result;
            });
        }
      }
    };

    this.authenticate =  function(){
      var self = this;
      oauth.popup('github', {cache: true})
      .done(function(response) {
        Resource.github = response;
        $timeout(function(){
          self.user = User.info();
          self.user.logged = true;
        }, 0);
      }).fail(function(error){
        if(error) {
          return window.alert(error);
        }
      });
    };
  });
