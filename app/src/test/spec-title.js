
var base_url = "http://localhost:3000/"


// spec.js
describe('Testing EasyMart Title', function() {

  beforeEach(function() {
    browser.waitForAngularEnabled(false);
    browser.get(base_url);
  });

  // Test 01
  it('should have a title', function() {
    expect(browser.getTitle()).toEqual('React App');
  });

});
