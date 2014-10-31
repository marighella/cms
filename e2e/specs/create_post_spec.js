describe('create a new post',function(){
    var postData = require('../data/post.js');
    var createPostPage = require('../pages/post/create.js');
    var searchPostsPage = require('../pages/post/search.js');
    var helper = require("../helper.js");

    beforeEach(function() {
      searchPostsPage.waitExists();
      searchPostsPage.createNewPost();
    });

    it('should add a new draft with valid data', function(){

      createPostPage.waitExists();
      createPostPage.clearDate();
      createPostPage.fillAllDetails(postData);
      createPostPage.postDraft();

      searchPostsPage.waitExists();
      searchPostsPage.selectYear("2010");
      searchPostsPage.selectMonth("Janeiro");

      browser.sleep(2000);

      expect(searchPostsPage.getPost(0,1)).toEqual(postData.TITLE);
   });
});


