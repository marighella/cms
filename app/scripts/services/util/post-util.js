'use strict';
/* globals escape, unescape */

/**
 * @ngdoc service
 * @name cmsApp.Dateutil
 * @description
 * # Dateutil
 * Service in the cmsApp.
 */
angular.module('cmsApp')
  .service('PostUtil', function PostUtil(DateUtil, _) {
    function removeSpecialChar(string) {
      return string.replace(/[^\w\s]/gi, '');
    }

    function replaceSpaceWithDash(string) {

      var result = string.replace(/[ ]([a-zA-Z0-9])/g, function (match, firstGroup) {
        return '-' + firstGroup;
      });

      return result;
    }
    function formatDate(post) {
      var today = new Date(post.metadata.date);
      return today.toISOString().split('T')[0];
    }





    this.decodeContent = function(content){
      return decodeURIComponent(escape(atob(content)));
    };
    this.load = function(content){
      var post = {};
      var parts = decodeURIComponent(escape(atob(content))).split('---');

      post.body = parts.pop().replace(/^\n/, '');
      post.metadata = window.jsyaml.load(parts.pop());
      post.createdTime = DateUtil.fromISO8601(post.metadata.date).toMilliseconds();

      return post;
    };
    this.serialize = function(post){
      post.metadata.date = DateUtil.toISO8601(post.metadata.date);

      var compiled = ['---', window.jsyaml.dump(post.metadata), '---', post.body].join('\n');
      return unescape(encodeURIComponent(compiled));
    };
    this.generateFileName =  function(post) {
      if(!!post.filename){
        return post.filename;
      }
      var fileName = post.metadata.title.toLowerCase();
      fileName = removeSpecialChar(fileName);
      fileName = replaceSpaceWithDash(fileName);

      return formatDate(post)+'-'+fileName+'.md';
    };
    this.preparePost = function(metadata, body, filename, files, toPublish){
      var post = {
        metadata: metadata,
        body: body,
        filename: filename
      };
      post.filename = this.generateFileName(post);
      post.metadata.files = files;
      post.metadata.published = (toPublish === true);

      return post;
    };
    this.prepareListOfFiles =  function(metadata, coverImageField){
      var files = [];

      if(coverImageField){
        var cover = _.find(metadata.files, function(element){
          return element.small ===  metadata[coverImageField];
        });

        if(!cover){
          cover = { thumbnail: metadata[coverImageField], small: metadata[coverImageField] };
          files.push(cover);
        }
      }

      files.push(metadata.files);
      return _.flatten(files);
    };
  });
