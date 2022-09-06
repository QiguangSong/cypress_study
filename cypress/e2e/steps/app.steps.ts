import {AppPage} from '../../pages/app.page';
import {equalExtractedValue} from '../../support/util';
import {Then, When} from '@badeball/cypress-cucumber-preprocessor';

When('Clear the search', () => {
  const app = new AppPage();
  app.searchForm.searchInput.clear();
});

When(/^Typing (.*)\s? in searchInput$/, (keyword: string) => {
  const app = new AppPage();
  if (keyword.trim()) {
    app.searchForm.searchInput.clear();
    app.searchForm.searchInput.type(keyword);
  }
});

When('Press key Enter', () => {
  const app = new AppPage();
  app.searchForm.searchInput.type(`{enter}`);
});

Then(/^The page title is\s?(.*)$/, (title: string) => {
  const app = new AppPage();
  app.heading.should(equalExtractedValue(title));
});

Then('SearchForm should be shown', () => {
  const app = new AppPage();
  app.searchForm.self.should('be.visible');
});

Then('SearchResult should not be shown', () => {
  const app = new AppPage();
  app.planetSearchResult.self.should('not.exist');
  app.peopleSearchResult.self.should('not.exist');
});

Then('Default SearchForm values should be set', () => {
  const app = new AppPage();
  app.searchForm.peopleRadioInput.should('be.checked');
  app.searchForm.planetsRadioInput.should('not.be.checked');
  app.searchForm.searchInput.should('have.value', '');
});


When('The star-wars is open', () => {
  cy.visit(Cypress.env('HOMEPAGE'));
});

Then('Loading page is shown', () => {
  const app = new AppPage();
  app.loading.should(equalExtractedValue('Loading...'));
});

Then('Not Found page is shown', () => {
  const app = new AppPage();
  app.notFound.should(equalExtractedValue('Not found.'));
});
