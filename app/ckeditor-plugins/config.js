'use strict';
/* jshint undef:false */

//load external plugin
(function() {
  CKEDITOR.plugins.addExternal('youtube','/scripts/ck-editor-plugins/youtube/', 'plugin.js');
})();

// config for toolbar, extraPlugins,...
CKEDITOR.editorConfig = function( config )
{
  config.extraPlugins = 'youtube';
  config.height = '100%';
  config.language = 'pt-BR';
};
