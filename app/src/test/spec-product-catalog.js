var EC = protractor.ExpectedConditions;

var base_url = "http://localhost:3000/"

var product_id = 'products/BOy3M0cCo3aIdtOOQgpV'



describe('Testing "Add to Basket" feature in Product Catalog', function() {
  var plus_button = element(by.css('button[class=plus_btn]'));
  var sub_button = element(by.css('button[class=sub_btn]'));
  var add_to_basket = element(by.css('button[class=productPage_add]'));
  var num_input = element(by.css('input[type=number]'));
  var basket_count = element(by.css('span[class="header_optionLineTwo header_basketCount"]'));


  beforeEach(function() {
    browser.waitForAngularEnabled(false);
    browser.get(base_url+ product_id);
    browser.executeScript('window.scrollTo(0,0);')  
  });

   // Test 01
  it('should increase the quanitity by clicking plus button', function() {
    for (let i =0; i < 5; i++){
      plus_button.click();
    }
      
    expect(num_input.getAttribute('value')).toEqual('6');
  });

  // Test 02
  it('should decrease the quanitity by clicking sub button', function() {
    for (let i =0; i < 5; i++){
      plus_button.click();
    }
    for (let j =0; j < 3; j++){
      sub_button.click();
    }
      
    expect(num_input.getAttribute('value')).toEqual('3');
  });

  //Test 03
  it('add given no of items to basket', function() {
    for (let i =0; i < 5; i++){
      plus_button.click();
    }
    add_to_basket.click();
         
    expect(basket_count.getText()).toEqual('6');
  });

});
