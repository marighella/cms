'use strict';
/* jshint undef:false */
/* jshint camelcase: false */
/*
 * code font: https://github.com/esvit/ng-ckeditor/blob/master/ng-ckeditor.js
 */

var $defer, loaded;
angular.module('cmsApp')
  .run(['$rootScope','$q', '$timeout', function($rootScope, $q, $timeout) {
    $defer = $q.defer();

    if (angular.isUndefined(window.CKEDITOR)) {
      throw new Error('CKEDITOR not found');
    }
    CKEDITOR.config.allowedContent = true;
    CKEDITOR.disableAutoInline = true;
    function checkLoaded() {
      if (CKEDITOR.status === 'loaded') {
        loaded = true;
        $defer.resolve();
      } else {
        checkLoaded();

      }
    }
    CKEDITOR.on('loaded', checkLoaded);
    $timeout(checkLoaded, 100);

    $rootScope.insertImageCKEditor = function(obj){
      var instance = CKEDITOR.instances.editor_loko;
      var paste = '<strong>Algo deu errado :/</strong>';
      var link_name = obj.title;
      if(obj.small){
        paste = '<img src="' + obj.small + '" alt="'+obj.title+'" />';
      }else if(obj.link){
        link_name = prompt('Digite o texto do link', obj.title) || obj.title;
        paste = '<a href="'+obj.link+'">'+ link_name+'</a>';
        if(obj.title.indexOf('.mp3') > -1){
          paste += '<br/> <audio src="'+obj.link+'" type="audio/mpeg" controls="controls">'+ link_name+'</audio>';
        }
      }
      instance.insertHtml( paste, 'unfiltered_html' );
      instance.focus();
    };
  }])
  .directive('ckEditor', function ($q, $timeout, ENV) {
    return {
      require : '?ngModel',
      link : function($scope, element, attr, ngModel) {
        var form    = null;
        var EMPTY_HTML = '<p></p>',
        data = [],
        isReady = false;

        var onLoad = function () {
          var options = {
            toolbar: 'full',
            toolbar_full: [
              { name: 'basicstyles',
                items: [ 'Bold', 'Italic', 'Strike', 'Underline' ] },
                { name: 'paragraph', items: [ 'BulletedList', 'NumberedList', 'Blockquote' ] },
                { name: 'editing', items: ['JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock' ] },
                { name: 'links', items: [ 'Link', 'Unlink', 'Anchor' ]},
                { name: 'tools', items: [ 'SpellChecker', 'Maximize' ] },
                '/',
                { name: 'styles', items: [ 'Format', 'FontSize', 'TextColor', 'PasteText', 'PasteFromWord', 'RemoveFormat' ] },
                { name: 'insert', items: [ 'Image', 'Youtube', 'Table', 'SpecialChar' ]},
                { name: 'forms', items: [ 'Outdent', 'Indent' ] },
                { name: 'clipboard', items: [ 'Undo', 'Redo' ] },
                { name: 'document', items: [ 'PageBreak', 'Source' ] }
            ],
            disableNativeSpellChecker: false,
            uiColor: '#FAFAFA',
            height: '400px',
            width: '100%'
          };

          var instance = CKEDITOR.replace(element[0], options);
          CKEDITOR.plugins.addExternal('youtube', ENV.basepath+'/ckeditor-plugins/youtube/', 'plugin.js');
          CKEDITOR.plugins.addExternal('audio', ENV.basepath+'/ckeditor-plugins/audio/', 'plugin.js');
          instance.config.extraPlugins = 'youtube,justify,image2,audio';
          instance.config.language = 'pt-BR';
          var configLoaderDef = $q.defer();

          element.bind('$destroy', function () {
            instance.destroy(
              false //If the instance is replacing a DOM element, this parameter indicates whether or not to update the element with the instance contents.
            );
          });
          var setModelData = function(setPristine) {
            var data = instance.getData();
            if (data === '') {
              data = null;
            }
            $timeout(function () { // for key up event
              if(setPristine !== true || data !== ngModel.$viewValue) {
                ngModel.$setViewValue(data);
              }
              if(setPristine === true && form){
                form.$setPristine();
              }
            }, 0);
          }, onUpdateModelData = function(setPristine) {
            if (!data.length) { return; }


            var item = data.pop() || EMPTY_HTML;
            isReady = false;
            instance.setData(item, function () {
              setModelData(setPristine);
              isReady = true;
            });
          };

          instance.on('pasteState',   setModelData);
          instance.on('change',       setModelData);
          instance.on('blur',         setModelData);
          instance.on('drop',         setModelData);
          //instance.on('key',          setModelData); // for source view

          instance.on('instanceReady', function() {
            $scope.$broadcast('ckeditor.ready');
            $scope.$apply(function() {
              onUpdateModelData(true);
            });

            instance.document.on('keyup', setModelData);
            instance.document.on('drop', function (ev) {
              var dataTransfer = ev.data.$.dataTransfer;
              var regex = /<img.*src="(.*)"/g;
              var matches = regex.exec(dataTransfer.getData( 'text/html' ));
              if(matches) {
                ev.data.preventDefault();
                var src = matches[1];
                var to_paste = '<img src="' + src + '" />';
                instance.insertHtml( to_paste );

                return false;
              }
            });
          });
          instance.on('customConfigLoaded', function() {
            configLoaderDef.resolve();
          });

          ngModel.$render = function() {
            data.push(ngModel.$viewValue);
            if (isReady) {
              onUpdateModelData();
            }
          };
        };

        if (CKEDITOR.status === 'loaded') {
          loaded = true;
        }
        if (loaded) {
          onLoad();
        } else {
          $defer.promise.then(onLoad);
        }
      }
      };
    });
