const { defineConfig } = require("cypress");
const browserify = require('@cypress/browserify-preprocessor');


module.exports = defineConfig({
  viewportWidth: 1078,
  viewportHeight: 660,
  // video: false,
  defaultCommandTimeout: 1000,
  // screenshotOnRunFailure: false,
  env: {
    baseURL : 'https://www.vrbo.com'  
  },
  chromeWebSecurity : false,
  e2e: {
    setupNodeEvents(on, config) {
      let options = browserify.defaultOptions;
      options.browserifyOptions.transform[1][1].plugins.push([
        'module-resolver',
        {
          alias: {
            '@tests': './tests',
            '@helper': './tests/helper'
          },
        },
      ]);
      on('file:preprocessor', browserify(options));
    },
    specPattern: 'tests/scenarios/**/*.test.js',
    failOnStatusCode: false 
  },
});