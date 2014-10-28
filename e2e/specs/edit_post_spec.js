describe('edit an existing post',function(){
  var ptor = protractor.getInstance();
  var postData = require("../data/post.js");
  var createPostPage = require('../pages/post/create.js');
  var searchPostsPage = require("../pages/post/search.js");
  var helper = require("../helper.js");
  var oldTitle;
  var oldHat;
  var oldSupportLine;
  var oldMenu;

  beforeEach(function(){
    browser.sleep(2000);
    searchPostsPage.selectYear('2010');
    searchPostsPage.selectMonth('Março');
    browser.sleep(2000);
    searchPostsPage.clickEdit();
    helper.waitUntilIsDisplayed(ptor, createPostPage.hatField, 2*1000);
  });

  it('should edit an existing post', function(){
    browser.sleep(1000);
    oldTitle= createPostPage.titleField.getAttribute('value');
    oldHat = createPostPage.hatField.getAttribute('value' );
    oldSupportLine = createPostPage.supportLineField.getAttribute('value');
    oldMenu = createPostPage.getCheckedSection();

    helper.clear(createPostPage.hatField);
    helper.clear(createPostPage.titleField);
    helper.clear(createPostPage.supportLineField);

    createPostPage.fillHat(postData.HAT);
    createPostPage.fillTitle(postData.TITLE);
    createPostPage.fillSupportLine(postData.SUPPORTLINE);
    createPostPage.fillMenu(postData.MENU);
    createPostPage.postDraft();
    browser.sleep(2*1000);
    searchPostsPage.selectYear('2010');
    searchPostsPage.selectMonth('Março');
    browser.sleep(2*1000);
    searchPostsPage.clickEdit();
    browser.sleep(1*1000);
    expect(createPostPage.titleField.getAttribute('value')).toEqual(postData.TITLE);
    expect(createPostPage.hatField.getAttribute('value')).toEqual(postData.HAT);
    expect(createPostPage.supportLineField.getAttribute('value')).toEqual(postData.SUPPORTLINE);
    expect(createPostPage.getCheckedMenu()).toEqual(postData.MENU);
  });

  afterEach(function(){
    helper.clear(createPostPage.hatField);
    helper.clear(createPostPage.titleField);
    helper.clear(createPostPage.supportLineField);
    createPostPage.fillHat(oldHat);
    createPostPage.fillTitle(oldTitle);
    createPostPage.fillSupportLine(oldSupportLine);
    createPostPage.fillMenu(oldMenu);
    createPostPage.postDraft();
  });

});
