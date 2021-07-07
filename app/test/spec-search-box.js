var search_query = "Bluetooth"

var base_url = "http://localhost:3000/"


describe('Testing EasyMart Search Box', function() {
  var search = element(by.css('input[class=header_searchInput]'));
  var search_button = element(by.css('svg[class=MuiSvgIcon-root header_searchIcon]'));
  // ToDo
  var search_result = element(by.css('svg[class=MuiSvgIcon-root header_searchIcon]'));

  beforeEach(function() {
    browser.waitForAngularEnabled(false);
    browser.get(base_url);
  });

   // Test 01
  it('should return product list consisting given keyowrd', function() {
    search.sendKeys(search_query);

    search_button.click();

    expect(search_result.getText()).toEqual('');

  });

});
