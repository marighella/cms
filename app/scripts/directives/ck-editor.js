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
    CKEDITOR.on('imageUploaded', function(event) {
      $rootScope.$emit('uploaded', event.data);
    });
    
    $timeout(checkLoaded, 100);

    $rootScope.insertImageCKEditor = function(obj){
      var instance = CKEDITOR.instances.editor;
      var paste = '<strong>Algo deu errado :/</strong>';
      var link_name = obj.title;
      if(obj.small){
        paste = '<img src="' + obj.link + '" alt="'+obj.title+'" />';
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
            height: '600px',
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
              $scope.$broadcast('ckeditor.ready');
              isReady = true;
            });
          };

          instance.on('pasteState',   setModelData);
          instance.on('change',       setModelData);
          instance.on('blur',         setModelData);
          instance.on('drop',         setModelData);
          //instance.on('key',          setModelData); // for source view

          instance.on('instanceReady', function() {
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

// Create Upload button in CKEDITOR image dialog
var createUploadButton = function() {
  CKEDITOR.on( 'dialogDefinition', function( ev ) {
  var dialogName = ev.data.name;
  var dialogDefinition = ev.data.definition;
  console.log('definindo dialogo ', dialogName);
  if ( dialogName === 'image2' ) {
    
      CKEDITOR.uploadPlugin = function(event) {
        var files = event.target.files;
        if(files && files.length > 0) {
          CKEDITOR.fireOnce('imageUploaded', files);
          
        }
      };
    
      var infoTab = dialogDefinition.getContents( 'info' );
      infoTab.add( {
        type: 'html',
        html: '<input type="file" name="ckeditorUpload" id="ckeditorUpload" onchange="CKEDITOR.uploadPlugin(event)" />'
      });

      
//      dialogDefinition.onFocus = function() {
//        var $injector = angular.element($('#upload')).injector();
//        $injector.invoke(function($rootScope, $compile, $timeout) {
//
//          $rootScope.$on('upload-file', function(event, args) {
//            dialogDefinition.dialog.setValueOf('info', 'src', args.file.link )
//          });
//
//          $timeout(function() {
//            $('#upload-button').replaceWith($compile('#upload-button')($rootScope))
//            .css({
//              'padding': '5px 8px',
//              'margin': '-17px 0 0 5px'
//            })
//            .find('.uploading-icon')
//            .css({
//              'font': 'normal normal normal 14px/1 FontAwesome',
//              'width': '13px',
//              'float': 'left'
//            })
//          }, 600);
//        });
//
//        // Move the botton to the side of src field
//        $("#upload-button").parent().parent().prev().prev().prev().prev().prev().append($("#upload-button"));
//      };
  }
  });
};
createUploadButton();