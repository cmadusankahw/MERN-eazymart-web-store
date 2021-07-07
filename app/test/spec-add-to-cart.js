var EC = protractor.ExpectedConditions;

var base_url = "http://localhost:3000/"



describe('Testing "Add to Cart" feature', function() {
  var add_buttons = element.all(by.css('button[class=product_add]'));
  var basket_count = element(by.css('span[class="header_optionLineTwo header_basketCount"]'));


  beforeEach(function() {
    browser.waitForAngularEnabled(false);
    browser.get(base_url);
    browser.wait(EC.elementToBeClickable(add_buttons), 10000, 'Elements taking too long to appear in the DOM');
  });

   // Test 01
  it('should add all 6 products to the cart', function() {
    for (let i =0; i < 6; i++){
      add_buttons.get(i).click();
      element(by.css('a[class=popup_close')).sendKeys(protractor.Key.ESCAPE);
    }
      
    expect(basket_count.getText()).toEqual('6');
  });

});
