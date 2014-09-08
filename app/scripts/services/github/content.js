'use strict';

/**
 * @ngdoc service
 * @name cmsApp.Content
 * @description
 * # Content
 * Factory in the cmsApp.
 */
angular.module('cmsApp')
  .factory('GithubContent', function () {
    return {
      posts: function () {
        return [
          {
           sha: '#1',
           name: 'Na Amazônia, Sem Terra enfrentam o grupo de Dantas',
           year: 2014,
           month: 10
          },
          {
           sha: '#2',
           name: 'Ocupação em Goiás é batizada com o nome de Dom Tomás Balduíno',
           year: 2014,
           month: 10
          },
          {
           sha: '#3',
           name: 'Onde está a Reforma Agrária no debate eleitoral?',
           year: 2014,
           month: 10
          },
          {
           sha: '#4',
           name: 'JBS expõe trabalhadores ao frio e sofre a quarta condenação este ano',
           year: 2014,
           month: 10
          },
          {
           sha: '#5',
           name: 'Três mil famílias do MST ocupam a fazenda Santa Mônica, do senador Eunício Oliveira',
           year: 2014,
           month: 10
          },
          {
           sha: '#6',
           name: 'As grandes questões ausentes no debate eleitoral',
           year: 2014,
           month: 10
          },
          {
           sha: '#7',
           name: 'Organizações fazem ajustes finais para plebiscito da reforma política',
           year: 2014,
           month: 10
          },
          {
           sha: '#8',
           name: 'Dez empresas são donas de 73% das sementes de todo o mundo',
           year: 2014,
           month: 10
          },
        ];
      }
    };
  });
