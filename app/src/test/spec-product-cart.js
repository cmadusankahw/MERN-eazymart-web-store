var EC = protractor.ExpectedConditions;

var base_url = "http://localhost:3000/"


describe('Testing for products added to the shopping basket(cart)', function() {
      
  var add_buttons = element.all(by.css('button[class=product_add]'));
  var basket_button = element(by.css('div[class=header_optionBasket]'));  

  beforeEach(function() {
    browser.waitForAngularEnabled(false);
    browser.get(base_url);
    browser.wait(EC.elementToBeClickable(add_buttons.get(5)), 10000, 'Elements taking too long to appear in the DOM');
  });

   // Test 01
  it('should add all 6 products to the cart', function() {
    for (let i =0; i < 6; i++){
      add_buttons.get(i).click();
      element(by.css('a[class=popup_close')).sendKeys(protractor.Key.ESCAPE);
    }

    // add two Watches
    add_buttons.get(0).click();
    element(by.css('a[class=popup_close')).sendKeys(protractor.Key.ESCAPE);

    basket_button.click();

    // Check for product count in shopping basket
    var basket_items = element.all(by.css('div[class=basketItem]'));

    expect(basket_items.count()).toBe(6);

    // test for two Watches(quantity)
    var watch_count = element(by.css('p[class=basketItem_count]'));  
    expect(watch_count.getText()).toEqual('x 2');
  });


   // Test 02
   it('should decrese the cart item quantity', function() {
    for (let i =0; i < 3; i++){
      add_buttons.get(0).click();
      element(by.css('a[class=popup_close')).sendKeys(protractor.Key.ESCAPE);
    }

    basket_button.click();

    // Check for product count in shopping basket
    var basket_items = element.all(by.css('div[class=basketItem]'));

    // remove first item quantiyt by 1
    var remove_button = element(by.css('button[class=basketItem_remove]'));

    remove_button.click();

    expect(basket_items.count()).toBe(1);

    var watch_count = element(by.css('p[class=basketItem_count]'));  
    expect(watch_count.getText()).toEqual('x 2');

  });

  // Test 03
  it('should remove an item from cart', function() {
    for (let i =0; i < 6; i++){
      add_buttons.get(i).click();
      element(by.css('a[class=popup_close')).sendKeys(protractor.Key.ESCAPE);
    }

    basket_button.click();

    // Check for product count in shopping basket
    var basket_items = element.all(by.css('div[class=basketItem]'));

    expect(basket_items.count()).toBe(6);

    // remove first item quantiyt by 1
    var remove_button = element(by.css('button[class=basketItem_remove]'));

    remove_button.click();

    // Check for product count in shopping basket
    var basket_items = element.all(by.css('div[class=basketItem]'));

    expect(basket_items.count()).toBe(5);
  });


    // Test 04
    it('should display accurate estimated subtotal', function() {
      for (let i =0; i < 6; i++){
        add_buttons.get(i).click();
        element(by.css('a[class=popup_close')).sendKeys(protractor.Key.ESCAPE);
      }
  
      basket_button.click();
  
      // test for initial amount
      var total_bill_initial = element(by.css('strong[class=basket_total]'));  
      expect(total_bill_initial.getText()).toEqual('Rs. 283,994');
  
      // remove first item 
      var remove_button = element(by.css('button[class=basketItem_remove]'));
  
      remove_button.click();
  
      // test for final amount
      var total_bill_final = element(by.css('strong[class=basket_total]'));  
      expect(total_bill_final.getText()).toEqual('Rs. 281,495');
    });


});
