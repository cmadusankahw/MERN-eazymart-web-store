var istanbulPlugin = require('protractor-istanbul-plugin');

exports.config = {
  framework: 'jasmine2',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: [
          'spec-title.js',
          'spec-login.js',
          'spec-signup.js',
          'spec-product-catalog.js',
          'spec-add-to-cart.js',
          'spec-product-list.js',
          'spec-add-product-with-validation.js',
          'spec-product-cart.js',
          'spec-product-checkout.js'
        ],
  capabilities: {
    browserName: 'firefox',
    // 'moz:firefoxOptions': {
    //    args: [ "--headless" ]
    //  }
  }
  // ,plugins:
  // [{
  //   path: 'node_modules/protractor-e2e-coverage/index.js'
  //  }],
};
