var EC = protractor.ExpectedConditions;

var base_url = "http://localhost:3000/"

var invalid_card_num = "3333333333333333"

var valid_card_num = "4283980421091177"


describe('Testing checkout functionality', function() {
      
  var add_buttons = element.all(by.css('button[class="product_add"]'));
  var basket_button = element(by.css('div[class="header_optionBasket"]'));  

  beforeEach(function() {
    browser.waitForAngularEnabled(false);
    browser.get(base_url);
    browser.wait(EC.elementToBeClickable(add_buttons.get(5)), 10000, 'Elements taking too long to appear in the DOM');
  });


   // Test 01
   it('should add products to checkout', function() {
    for (let i =0; i < 3; i++){
      add_buttons.get(i).click();
      element(by.css('a[class=popup_close')).sendKeys(protractor.Key.ESCAPE);
    }

    basket_button.click();

    browser.sleep(2000);
    browser.executeScript('window.scrollTo(0,0);')

    // checkout products
    var checkout_button = element(by.css('button[class="basket_checkout"]'));
    browser.wait(EC.elementToBeClickable(checkout_button), 10000, 'Elements taking too long to appear in the DOM');
    checkout_button.click();

    // Check for product count in shopping basket
    var checkout_items = element.all(by.css('div[class="basketItem"]'));

    expect(checkout_items.count()).toBe(3);

     // test for final amount
     var order_total = element(by.css('h3[class="payment_total"]'));  
     expect(order_total.getText()).toEqual('Rs. 156,497');

  });



  // Test 02
  it('should remove an item from checkout', function() {
    for (let i =0; i < 3; i++){
      add_buttons.get(i).click();
      element(by.css('a[class=popup_close')).sendKeys(protractor.Key.ESCAPE);
    }

    basket_button.click();

    browser.sleep(2000);
    browser.executeScript('window.scrollTo(0,0);')

    // checkout products
    var checkout_button = element(by.css('button[class="basket_checkout"]'));
    browser.wait(EC.elementToBeClickable(checkout_button), 10000, 'Elements taking too long to appear in the DOM');
    checkout_button.click();


    // remove first item quantiyt by 1
    var remove_button = element(by.css('button[class="basketItem_remove"]'));
    browser.wait(EC.elementToBeClickable(remove_button), 10000, 'Elements taking too long to appear in the DOM');
    remove_button.click();

    // Check for product count in shopping basket
    var checkout_items = element.all(by.css('div[class="basketItem"]'));

    expect(checkout_items.count()).toBe(2);

     // test for final amount
     var order_total_reduced = element(by.css('h3[class="payment_total"]'));  
     expect(order_total_reduced.getText()).toEqual('Rs. 153,998');
  });



  // Test 03
  it('should not able to make a purchase with an invalid card number', function() {
    for (let i =0; i < 3; i++){
      add_buttons.get(i).click();
      element(by.css('a[class=popup_close')).sendKeys(protractor.Key.ESCAPE);
    }

    basket_button.click();

    browser.sleep(2000);
    browser.executeScript('window.scrollTo(0,0);')

    // checkout products
    var checkout_button = element(by.css('button[class="basket_checkout"]'));
    browser.wait(EC.elementToBeClickable(checkout_button), 10000, 'Elements taking too long to appear in the DOM');
    checkout_button.click();

    // test for final amount
    var card_input = element(by.css('input[class="InputElement is-empty Input Input--empty"]'));  
    card_input.sendKeys(invalid_card_num);

    var buy_button = element(by.css('button[class="button_buy"]'));  
    expect(buy_button.isEnabled()).toBe(false);


    var card_error = element(by.css('div[class="card_error"]'));  
    expect(card_error.getText()).toEqual('Your card number is invalid.');
  });


   // Test 04
   it('should be able to make a purchase with a valid card number', function() {
    for (let i =0; i < 3; i++){
      add_buttons.get(i).click();
      element(by.css('a[class=popup_close')).sendKeys(protractor.Key.ESCAPE);
    }

    basket_button.click();

    browser.sleep(2000);
    browser.executeScript('window.scrollTo(0,0);')

    // checkout products
    var checkout_button = element(by.css('button[class="basket_checkout"]'));
    browser.wait(EC.elementToBeClickable(checkout_button), 10000, 'Elements taking too long to appear in the DOM');
    checkout_button.click();

    // test for final amount
    var card_input = element(by.css('input[class="InputElement is-empty Input Input--empty"]'));  
    card_input.sendKeys(valid_card_num);

    var buy_button = element(by.css('button[class="button_buy"]'));  
    expect(buy_button.isEnabled()).toBe(true);
  });

    // Test 05
    it('should sign in to make a purchase', function() {
      for (let i =0; i < 3; i++){
        add_buttons.get(i).click();
        element(by.css('a[class=popup_close')).sendKeys(protractor.Key.ESCAPE);
      }
  
      basket_button.click();

      browser.sleep(2000);
      browser.executeScript('window.scrollTo(0,0);')
  
      // checkout products
      var checkout_button = element(by.css('button[class="basket_checkout"]'));
      browser.wait(EC.elementToBeClickable(checkout_button), 10000, 'Elements taking too long to appear in the DOM');
      checkout_button.click();
  
      // test for final amount
      var card_input = element(by.css('input[class="InputElement is-empty Input Input--empty"]'));  
  
      card_input.sendKeys(valid_card_num);
  
      var buy_button = element(by.css('button[class="button_buy"]'));  
      
      buy_button.click();

      // accepting alert dialog
      browser.wait(protractor.ExpectedConditions.alertIsPresent(), 10000);
      var alertDialog = browser.switchTo().alert();

      expect(alertDialog.getText()).toEqual('Please Sign-in to complete Purchase...');
  
      alertDialog.accept();

    });


});
