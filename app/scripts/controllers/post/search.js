'use strict';

/**
 * @ngdoc function
 * @name cmsApp.controller:PostsearchCtrl
 * @description
 * #.content.earchCtrl
 * Controller of the cmsApp
 */
angular.module('cmsApp')
  .controller('PostSearchCtrl', function ($rootScope, $scope, $location, DateUtil, PostUtil, Repository) {
    $rootScope.cleanAlerts();
    this.posts = [];
    this.maxSize = 5;
    this.currentPage = 1;
    this.ready = false;
    this.organization = $rootScope.user.organization;
    this.repository = $rootScope.repository;
    this.filter = {
      self: this,
      month: DateUtil.now.getMonth(),
      year: DateUtil.now.getYear(),
      title: '',
      search: function(){
        var self = this.self;
        return Repository.content.list($rootScope.repository, this).then(function(result){
          self.updateView(result);
        });
      }
    };

    this.canStartFilter = function(){
      return this.filter.title &&  this.filter.title.length > 3;
    };

    this.updateView = function(posts){
      this.currentPage = 1;
      this.posts = posts || this.posts;
      this.loadElements();
    };

    this.loadElements = function(){
      var start = (this.currentPage - 1) * this.maxSize,
          limit = this.maxSize,
          toLoad = this.posts.slice(start, start+limit),
          self = this
      ;
      toLoad.forEach(function(element){
        if(!element.metadata){
          Repository.content.get(element.path, self.repository)
          .then(function(result){
            angular.extend(element, result);
          });
        }
      });
    };

    this.ready = function(){
      return !!$rootScope.user.skelleton;
    };

    this.create = function(){
      var year = this.filter.year;
      var month = this.filter.month;
      $location.path('/post/'+year+'/'+month);
    };

    this.edit = function(post){
      var year = this.filter.year;
      var month = this.filter.month;
      $location.path('/post/'+year+'/'+month+'/'+post.sha+'/'+post.path);
    };

    this.load = function(){
      this.filter.search();
      $rootScope.loadSkelleton();
    };

    this.load();
  });
