var EC = protractor.ExpectedConditions;

var base_url = "http://localhost:3000/"

var product_url = "http://localhost:3000/products/BOy3M0cCo3aIdtOOQgpV"


describe('Testing Product List in Product Catalog', function() {
  var products = element.all(by.css('div[class=product]'));
  var view_details_button = element(by.css('button[class=product_view]'));


  beforeEach(function() {
    browser.waitForAngularEnabled(false);
    browser.get(base_url);
    browser.wait(EC.elementToBeClickable(view_details_button), 10000, 'Elements taking too long to appear in the DOM');
  });

   // Test 01
  it('should display 6 products in the database', function() {
      
    expect(products.count()).toBe(6);
  });

  // Test 02
  it('should view a details page for a selected product', function() {
    view_details_button.click()
      
    expect(browser.getCurrentUrl()).toEqual(product_url);
  });

});
