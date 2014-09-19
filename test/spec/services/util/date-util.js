'use strict';

describe('Service: DateUtil', function () {

  // load the service's module
  beforeEach(module('cmsApp'));

  // instantiate service
  var DateUtil;
  beforeEach(inject(function (_DateUtil_) {
    DateUtil = _DateUtil_;
  }));

  it('should do something', function () {
    expect(!!DateUtil).toBe(true);
  });

  describe('the time now', function (){
    it('should exists', function (){
      expect(!!DateUtil.now).toBeTruthy();
    });

    it('should return the current month', function (){
      var d = (new Date()).getMonth();
      expect(DateUtil.now.getMonth()).toBe(d);
    });

    it('should return the current year', function (){
      var d = (new Date()).getFullYear();
      expect(DateUtil.now.getYear()).toBe(d);
    });
  });

  describe('format date', function (){
    it('should exists', function (){
      expect(!!DateUtil.format).toBeTruthy();
    });

    it('should transform year and month on string', function (){
      var year = 2009;
      var month = 8;

      expect(DateUtil.format(year, month)).toBe('2009/09');
    });
  });
});
