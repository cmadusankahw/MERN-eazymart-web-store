
var new_credentials = {
  "email": "test_usernewnew@gmail.com",
  "pass": "abcd1234"
}

var existing_credentials = {
  "email": "cmadusankahw@gmail.com",
  "pass": "abcd1234"
}


var base_url = "http://localhost:3000/"


describe('Testing EasyMart SignUp', function() {
  var password = element(by.css('input[type=password]'));
  var username = element(by.xpath('//form/input[@type="text"]'));
  var signupButton = element(by.css('button[class=login_registerButton'));
  var spanUserName = element(by.xpath('//div[@class="header_option"]/span[@class="header_optionLineOne"]'));

  beforeEach(function() {
    browser.waitForAngularEnabled(false);
    browser.get(base_url+"login");
  });

   // Test 01
  it('should fail with an already created account credentials', function() {
    username.sendKeys(existing_credentials.email);
    password.sendKeys(existing_credentials.pass);

    signupButton.click();

    browser.wait(protractor.ExpectedConditions.alertIsPresent(), 10000);

    var alertDialog = browser.switchTo().alert();

    expect(alertDialog.getText()).toEqual('An Error Occured: The email address is already in use by another account.');
    alertDialog.accept();

  });

  // Test 02
  it('should signup with a given email and a password', function() {
    username.sendKeys(new_credentials.email);
    password.sendKeys(new_credentials.pass);

    signupButton.click();

    browser.wait(protractor.ExpectedConditions.alertIsPresent(), 10000);

    var alertDialog = browser.switchTo().alert();

    expect(alertDialog.getText()).toEqual('Successfully Created EazyMart Account!');
    alertDialog.accept();

    expect(spanUserName.getText()).toEqual(new_credentials.email);
  });

});
