'use strict';

/**
 * @ngdoc function
 * @name cmsApp.controller:PostcreatectrlCtrl
 * @description
 * # PostcreatectrlCtrl
 * Controller of the cmsApp
 */
angular.module('cmsApp')
  .controller('PostCreateCtrl', function ($scope) {
    // entity to edit
    $scope.entity = {
      video: 'http://www.youtube.com/watch?v=UViv0FQJrgo',
      cover: 'http://farm6.staticflickr.com/5552/14934144587_2c2b186d58_n.jpg',
      date: '2014-09-10T11:52:11-03:00'
    };

    // fields description of entity
    $scope.fields = [
    {
      name: 'date',
      pattern: '',
      icon: 'fa-calendar',
      title: 'Data da Notícia',
      required: true,
      type: {
        view: 'date'
      }
    },
    {
      name: 'video',
      pattern: '',
      icon: 'fa-youtube',
      title: 'Youtube',
      required: true,
      type: {
        view: 'video'
      }
    },
    {
      name: 'cover',
      pattern: '',
      icon: 'fa-picture-o',
      title: 'Imagem de Capa',
      required: true,
      type: {
        view: 'cover'
      }
    },
    {
      name: 'country',
      title: 'Country',
      type: {
        view: 'select',
        options: [
          {id: 0, name: 'USA'},
          {id: 1, name: 'German'},
          {id: 2, name: 'Russia'}
        ]
      }
    },
    {
      name: 'description',
      title: 'Description',
      placeholder: 'Preencha isso aqui',
      type: {
        view: 'textarea'
      }
    }
    ];
  });
