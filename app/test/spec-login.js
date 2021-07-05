
var credentials = {
  "email": "cmadusankahw@gmail.com",
  "pass": "abcd1234"
}

var wrong_credentials = {
  "email": "wrong@gmail.com",
  "pass": "wrongpassword"
}



var base_url = "http://localhost:3000/"


// spec.js
describe('Testing EasyMart Login', function() {
  var password = element(by.css('input[type=password]'));
  var username = element(by.xpath('//form/input[@type="text"]'));
  var loginButton = element(by.css('button[class=login_signinButton'));
  var spanUserName = element(by.xpath('//div[@class="header_option"]/span[@class="header_optionLineOne"]'));

  beforeEach(function() {
    browser.waitForAngularEnabled(false);
    browser.get(base_url+"login");
  });

  // Test 01
  it('should fail with an unknown email', function() {
    username.sendKeys(wrong_credentials.email);
    password.sendKeys(credentials.pass);

    loginButton.click();

    browser.wait(protractor.ExpectedConditions.alertIsPresent(), 10000);

    var alertDialog = browser.switchTo().alert();

    expect(alertDialog.getText()).toEqual('An Error Occured: There is no user record corresponding to this identifier. The user may have been deleted.');
    alertDialog.accept();

  });

    // Test 02
    it('should fail with an wrong password for a known user', function() {
      username.sendKeys(credentials.email);
      password.sendKeys(wrong_credentials.pass);
  
      loginButton.click();
  
      browser.wait(protractor.ExpectedConditions.alertIsPresent(), 10000);
  
      var alertDialog = browser.switchTo().alert();
  
      expect(alertDialog.getText()).toEqual('An Error Occured: The password is invalid or the user does not have a password.');
      alertDialog.accept();
  
    });


  // Test 03
  it('should login with a given email and a password', function() {
    username.sendKeys(credentials.email);
    password.sendKeys(credentials.pass);

    loginButton.click();

    browser.wait(protractor.ExpectedConditions.alertIsPresent(), 10000);

    var alertDialog = browser.switchTo().alert();

    expect(alertDialog.getText()).toEqual('Successfully Signed In!');
    alertDialog.accept();

    expect(spanUserName.getText()).toEqual(credentials.email);
  });

});
