var EC = protractor.ExpectedConditions;

var base_url = "http://localhost:3000/admin"

var valid_product = {
  title: "test_product",
  price: 2000,
  image: "https://image.flaticon.com/icons/png/512/1205/1205526.png"
}

var invalid_product = {
  title: "",
  price: -1,
  image: ""
}


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
  it('add a new product with valid inputs', function() {
    product_title_input.sendKeys(valid_product.title);
    product_price_input.sendKeys(valid_product.price);
    product_image_input.sendKeys(valid_product.image);

    add_product_button.click();

    browser.wait(protractor.ExpectedConditions.alertIsPresent(), 10000);

    var alertDialog = browser.switchTo().alert();

    expect(alertDialog.getText()).toEqual("Product added successfully!");
    alertDialog.accept();

    var new_products = element.all(by.css('div[class=productItem]'));
      
    expect(new_products.count()).toBe(7);

    var new_product_price = element(by.css('span[class=productPage_price]'));

    expect(new_product_price.getText()).toEqual('Rs. ' + valid_product.price.toString());
  });

    //Test 04
    it('remove the newly added products', function() {
      product_title_input.sendKeys(valid_product.title);
      product_price_input.sendKeys(valid_product.price);
      product_image_input.sendKeys(valid_product.image);
  
      add_product_button.click();
  
      browser.wait(protractor.ExpectedConditions.alertIsPresent(), 10000);
  
      var alertDialog = browser.switchTo().alert();
  
      alertDialog.accept();

      var new_product_remove_button = element(by.css('button[class=productPage_remove2]'));

      new_product_remove_button.click();
  
      var new_products = element.all(by.css('div[class=productItem]'));

      expect(new_products.count()).toBe(6);
    });

     //Test 05
  it('fail to add a new product without giving product title', function() {
    product_title_input.sendKeys(invalid_product.title);
    product_price_input.sendKeys(valid_product.price);
    product_image_input.sendKeys(valid_product.image);

    add_product_button.click();

    var error_msg = element(by.css('span[class=productForm_error]'));

    expect(error_msg.getText()).toEqual("A product title is required");
  });
  
   //Test 06
   it('fail to add a new product without giving a valid price (negative)', function() {
    product_title_input.sendKeys(valid_product.title);
    product_price_input.sendKeys(invalid_product.price);
    product_image_input.sendKeys(valid_product.image);

    add_product_button.click();

    var error_msg = element(by.css('span[class=productForm_error]'));

    expect(error_msg.getText()).toEqual("Price is required and cannot be less than rs.1");
  });

   //Test 07
   it('fail to add a new product without giving a valid price (0)', function() {
    product_title_input.sendKeys(valid_product.title);
    product_price_input.sendKeys(0);
    product_image_input.sendKeys(valid_product.image);

    add_product_button.click();

    var error_msg = element(by.css('span[class=productForm_error]'));

    expect(error_msg.getText()).toEqual("Price is required and cannot be less than rs.1");
  });

   //Test 07
   it('fail to add a new product without giving a product image URL', function() {
    product_title_input.sendKeys(valid_product.title);
    product_price_input.sendKeys(valid_product.price);
    product_image_input.sendKeys(invalid_product.image);

    add_product_button.click();

    var error_msg = element(by.css('span[class=productForm_error]'));

    expect(error_msg.getText()).toEqual("Product Image URL is required");
  });


  //Test 08
  it('reset the form on clicking reset button', function() {
    product_title_input.sendKeys(valid_product.title);
    product_price_input.sendKeys(valid_product.price);
    product_image_input.sendKeys(invalid_product.image);

    reset_form_button.click();

    var cleared_product_title_input = element(by.css('input[name=productTitle]'));
    var cleared_product_price_input = element(by.css('input[name=price]'));
    var cleared_product_image_input = element(by.css('input[name=productImage]'));

    expect(cleared_product_title_input.getText()).toEqual("");
    expect(cleared_product_price_input.getAttribute('value')).toEqual('0');
    expect(cleared_product_image_input.getText()).toEqual("");
  });


});
