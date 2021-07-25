var istanbulPlugin = require('protractor-istanbul-plugin');

exports.config = {
  framework: 'jasmine2',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['spec-title.js',
          'spec-login.js',
          'spec-signup.js',
          'spec-product-catalog.js',
          //'spec-add-to-cart.js'
        ],
  capabilities: {
    browserName: 'firefox',
    // 'moz:firefoxOptions': {
    //    args: [ "--headless" ]
    //  }
  }, plugins : [{
    inline: istanbulPlugin,
    logAssertions: true,
    failAssertions: true,
    outputPath: 'coverage'
}],
};
