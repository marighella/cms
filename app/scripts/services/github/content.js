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
      skelleton: function(repositorie){
        console.log('Pegando o esqueleto do: ', repositorie);

        return [
          {
          name: 'date',
          pattern: '',
          icon: 'fa-calendar',
          title: 'Data e hora da noticia',
          required: true,
          type: {
            view: 'date'
          }
        },
        {
          name: 'hat',
          title: 'Chapéu',
          required: false,
          placeholder: 'Informe o chapéu',
          type: {
            view: 'textarea'
          }
        },
        {
          name: 'title',
          title: 'Título da noticia',
          required: true,
          placeholder: 'Informe o titulo',
          type: {
            view: 'textarea'
          }
        },
        {
          name: 'support_line',
          title: 'Linha fina',
          required: true,
          placeholder: 'Informe o titulo',
          type: {
            view: 'textarea'
          }
        },
        {
          name: 'menu',
          title: 'Editorias',
          required: true,
          type: {
            view: 'select',
            options: [
              {id: 'agricultura camponesa', name: 'agricultura camponesa'},
              {id: 'agronegócio', name: 'agronegócio'},
              {id: 'direitos humanos', name: 'direitos humanos'},
              {id: 'educação, cultura e comunicação', name: 'educação, cultura e comunicação'},
              {id: 'lutas e mobilizações', name: 'lutas e mobilizações'},
              {id: 'solidariedade', name: 'solidariedade internacional'},
              {id: 'meio ambiente', name: 'meio ambiente'},
              {id: 'projeto popular', name: 'projeto popular'},
              {id: 'reforma agrária', name: 'reforma agrária'},
              {id: 'transgênicos', name: 'transgênicos'},
              {id: 'nossa-producao', name: 'nossa produção'},
              {id: 'poemas-e-poesias', name: 'poemas e poesias'},
              {id: 'lutadores-do-povo', name: 'lutadores do povo'}
            ]
          }
        },
        {
          name: 'section',
          title: 'Sessão',
          required: false,
          type: {
            view: 'select',
            options: [
              {name: 'Capa', id: 'cover'},
              {name: 'Destaque', id: 'featured-news'},
              {name: 'Vídeo', id: 'tv'}
            ]
          }
        },
        {
          name: 'label',
          title: 'Gênero',
          required: false,
          type: {
            view: 'select',
            options: [
              {name: 'Artigo', id: 'articles'},
              {name: 'Entrevista', id: 'interviews'},
              {name: 'Reportagens Especiais', id: 'special-stories'}
            ]
          }
        },
        {
          name: 'video',
          pattern: '',
          icon: 'fa-youtube',
          title: 'Youtube',
          placeholder: 'Coloque o link para o video no Youtube',
          required: true,
          type: {
            view: 'video'
          },
          need: {
            field: 'section',
            equal: true,
            value: 'tv'
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
          },
          need: {
            field: 'section',
            equal: false,
            value: 'tv'
          }
        }
        ];
      },

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
