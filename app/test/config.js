
exports.config = {
  framework: 'jasmine',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['spec-title.js',
          'spec-login.js',
          'spec-signup.js',
          'spec-product-catalog.js',
          'spec-add-to-cart.js'],
  capabilities: {
    browserName: 'firefox',
    // 'moz:firefoxOptions': {
    //    args: [ "--headless" ]
    //  }
  }
};
