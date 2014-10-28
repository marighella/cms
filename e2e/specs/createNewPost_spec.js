describe('create a new post',function(){
    var ptor = protractor.getInstance();
    var postData = require('../Data/post.js');
    var createPostPage = require('../pages/create_post.js');
    var helper = require("../helper.js");
    var searchPostsPage = require('../pages/posts.js');
  

    beforeEach(function() {
      browser.sleep(2000);
      searchPostsPage.createNewPost();
      helper.waitUntilIsDisplayed(ptor, createPostPage.hatField, 2*1000);
      helper.clear(createPostPage.dateField);
      //helper.clear(createPostPage.timeField);
    });

    iit('should add a new draft with valid data', function(){   
      postData.TITLE = postData.TITLE+"aaaa";
      createPostPage.postDraft();
      createPostPage.fillAllDetails(postData, postData.SECTION);
      createPostPage.postDraft();
      browser.sleep(2*1000);
      searchPostsPage.selectYear("2010");
      searchPostsPage.selectMonth("Janeiro");
      browser.sleep(2000);
      expect(searchPostsPage.getColumnText(1)).toEqual(postData.TITLE);
      expect(searchPostsPage.getColumnText(2)).toEqual("Rascunho");  
    });

    it('should add new draft with video', function(){
      postData.TITLE = postData.TITLE+"video";
      createPostPage.fillAllDetails(postData, postData.SECTIONVIDEO);
      createPostPage.postDraft();
      createPostPage.fillVideo(postData.VIDEO);
      createPostPage.postDraft();
      browser.sleep(2*1000);
      searchPostsPage.selectYear("2010");
      searchPostsPage.selectMonth("Janeiro");
      browser.sleep(2*1000);
      expect(searchPostsPage.getColumnText(1)).toEqual(postData.TITLE);
      expect(searchPostsPage.getColumnText(2)).toEqual("Rascunho");
      searchPostsPage.clickEdit();
      browser.sleep(1*1000);
      expect(createPostPage.getCheckedSection()).toEqual(postData.SECTIONVIDEO);
      expect(createPostPage.videoField.getAttribute('value')).toEqual(postData.VIDEO);
      browser.navigate().back(); 
    });   

});


