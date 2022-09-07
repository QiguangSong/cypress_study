import {defineConfig} from 'cypress';
import {addCucumberPreprocessorPlugin} from '@badeball/cypress-cucumber-preprocessor';
import browserify from '@badeball/cypress-cucumber-preprocessor/browserify';

async function setupNodeEvents(
  on: Cypress.PluginEvents,
  config: Cypress.PluginConfigOptions
): Promise<Cypress.PluginConfigOptions> {
  await require('cypress-mochawesome-reporter/plugin')(on);
  await addCucumberPreprocessorPlugin(on, config);

  on('file:preprocessor', browserify(config, {
    typescript: require.resolve('typescript')
  }));

  return config;
}

export default defineConfig({
  videosFolder: 'report/cypress/videos',
  screenshotsFolder: 'report/cypress/screenshots',
  fixturesFolder: false,
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'report/cypress/report',
    "charts": true,
    "reportPageTitle": "Test",
    "embeddedScreenshots": true,
    "inlineAssets": true,
    "html": true,
    "json": true,
    overwrite: false
  },
  env: {
    HOMEPAGE: '/'
  },
  e2e: {
    setupNodeEvents,
    specPattern: './cypress/**/*.{spec.ts,feature}',
    baseUrl: 'http://localhost:4200',
    supportFile: './cypress/support/commands.ts',
    defaultCommandTimeout: 10000, // backend timeout
  }
});
