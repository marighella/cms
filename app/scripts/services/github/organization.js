/* jshint camelcase: false */
'use strict';

/**
 * @ngdoc service
 * @name cmsApp.organization
 * @description
 * # organization
 * Factory in the cmsApp.
 */
angular.module('cmsApp')
  .factory('organization', function (_) {
     var resultList =  [{
          login: 'brasil-de-fato',
          id: 8516140,
          avatar_url: 'https://avatars.githubusercontent.com/u/8516140?v=2'
        },{
          login:'movimento-sem-terra',
          id: 7000646,
          avatar_url: 'https://avatars.githubusercontent.com/u/7000646?v=2'
        }];

    var resultRepos = [{
      id: 17912445,
      name: 'site-novo',
      full_name: 'movimento-sem-terra/site-novo'
    },{
      id: 17912445,
      name: 'site-novo',
      full_name: 'movimento-sem-terra/site-novo'
    }];

    var resultOrg = [{
      id: 7000646,
      login: 'movimento-sem-terra',
      name: 'Movimento dos Trabalhadores Rurais Sem Terra',
      avatar_url: 'https://avatars.githubusercontent.com/u/8516140?v=2'
    },{
      id: 8516140,
      login: 'brasil-de-fato',
      name: 'Brasil de Fato',
      avatar_url: 'https://avatars.githubusercontent.com/u/8516140?v=2'
    }];

    return {
      list: function() {
        return resultList;
      },
      get: function(){
        return {
          repositories: function(){
            return resultRepos; 
          },
          org: function(id){
            return _.find(resultOrg, function(element){
              return (element.id === id);
            });
          }
        };
      }
    };
  });
