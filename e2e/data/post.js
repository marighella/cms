'use strict';

var Post = function (){
  var date =  new Date();
  var month = date.getMonth() + 1;
  var time = date.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1');
  var TIMESTAMP = date.getDate() + '/' + month + '/' + date.getFullYear() + ' ' + time;

  this.FILETOUPLOAD = '/Users/nicolastrres/Documents/mst_capa.png';
  this.DATE = '01/01/2010';
  this.TIME = '1:01 PM';
  this.HAT = 'Teste chapeu';
  this.TITLE = 'Teste titulo ' + TIMESTAMP;
  this.SUPPORTLINE = 'Teste linha fina';
  this.MENU = 'meio ambiente';
  this.SECTION = '---Nenhum---';
  this.SECTIONVIDEO = 'Vídeo';
  this.TAG = 'Teste artigo normal';
  this.VIDEO = 'https://www.youtube.com/watch?v=QixID6N6ImM';
};

module.exports = new Post();
