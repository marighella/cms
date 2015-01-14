'use strict';

describe('edit an existing post',function(){
  //var ptor = protractor.getInstance();
  var postData = require('../data/post.js');
  var createPostPage = require('../pages/post/create.js');
  var searchPostsPage = require('../pages/post/search.js');
  var helper = require('../helper.js');
  var oldTitle;
  var oldHat;
  var oldSupportLine;

  beforeEach(function(){
    searchPostsPage.selectYear('2010');
    searchPostsPage.selectMonth('Março');
    browser.sleep(2000);
    searchPostsPage.edit();
  });

  it('should edit an existing post', function(){
    browser.sleep(1000);

    oldTitle = createPostPage.getFields().title.getAttribute('value');
    oldHat = createPostPage.getFields().hat.getAttribute('value' );
    oldSupportLine = createPostPage.getFields().hat.getAttribute('value');

    helper.clear(createPostPage.getFields().hat);
    helper.clear(createPostPage.getFields().title);
    /*jshint camelcase: false */
    helper.clear(createPostPage.getFields().support_line);

    /*jshint camelcase: true */
    helper.fill(createPostPage.getFields().hat, helper.random(postData.HAT));
    helper.fill(createPostPage.getFields().title, helper.random(postData.TITLE));
    /*jshint camelcase: false */
    helper.fill(createPostPage.getFields().support_line, helper.random(postData.SUPPORTLINE));
    /*jshint camelcase: true */

    createPostPage.postDraft();
    browser.sleep(2000);
    searchPostsPage.selectYear('2010');
    searchPostsPage.selectMonth('Março');
    browser.sleep(2000);
    searchPostsPage.edit();
    browser.sleep(1000);

    expect(createPostPage.getFields().title.getAttribute('value')).not.toEqual(postData.TITLE);
    expect(createPostPage.getFields().hat.getAttribute('value')).not.toEqual(postData.HAT);
    /*jshint camelcase: false */
    expect(createPostPage.getFields().support_line.getAttribute('value')).not.toEqual(postData.SUPPORTLINE);
    /*jshint camelcase: true */
    expect(createPostPage.getCheckedMenu()).toEqual(postData.MENU);
  });

});
