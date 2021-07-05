
exports.config = {
  ramework: 'jasmine',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['spec-title.js','spec-login.js','spec-signup.js'],
  capabilities: {
    browserName: 'firefox',
    // 'moz:firefoxOptions': {
    //    args: [ "--headless" ]
    //  }
  }
};
