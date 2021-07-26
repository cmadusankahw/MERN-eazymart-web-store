var EC = protractor.ExpectedConditions;

var base_url = "http://localhost:3000/admin"


describe('Testing Product List in Product Catalog', function() {
  var products = element.all(by.css('div[class=productItem]'));
  // product add form inputs
  var product_title_input = element(by.css('input[name=productTitle]'));
  var product_price_input = element(by.css('input[name=price]'));
  var product_image_input = element(by.css('input[name=productImage]'));

  var add_product_button = element(by.css('button[class=productPage_add]'));
  var reset_form_button = element(by.css('button[class=productPage_remove]'));

  var fisrt_product_remove_button = element(by.css('button[class=productPage_remove2]'));


  beforeEach(function() {
    browser.waitForAngularEnabled(false);
    browser.get(base_url);
    browser.wait(EC.elementToBeClickable(fisrt_product_remove_button), 10000, 'Elements taking too long to appear in the DOM');
  });

   // Test 01
  it('should display 6 products in the products list for Admin', function() {
      
    expect(products.count()).toBe(6);
  });

  // Test 02
  it('should remove an existing product: iPod earbugs(Product ID: BOy3M0cCo3aIdtOOQgpV) ', function() {
    fisrt_product_remove_button.click();

    var new_products = element.all(by.css('div[class=productItem]'));
      
    expect(new_products.count()).toBe(5);
  });

  //Test 03

});
