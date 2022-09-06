import {DataTable, Step, Then, When} from '@badeball/cypress-cucumber-preprocessor';
import {interceptGetSwapiPlanets} from '../../support/swapi.intercept';
import {AppPage} from '../../pages/app.page';
import {Planet, planetMatcher} from '../../support/util';

When(/^Search for planets\s?(.*)\s?$/, (keyword: string) => {
  cy.searchPlanet(keyword);
});

When(/^Check via Backend for planet\s?(.*)\s?$/, (keyword: string) => {
  const planetsAlias = interceptGetSwapiPlanets();
  Step(this, `Search for planets${keyword}`);
  cy.wait(planetsAlias);
});

When('Delaying API call for planet for {int} ms', (delayInMs: number) => {
  interceptGetSwapiPlanets(delayInMs);
});

Then(/^Planets search result (is visible|not exist)$/, (matcher: 'is visible' | 'not exist') => {
  const app = new AppPage();
  app.planetSearchResult.self.should(matcher.replace(' ', '.'));
});

Then(/^Planets have (\d+) result(?:s)?$/, (length: number) => {
  const app = new AppPage();
  app.planetSearchResult.planets.should('have.length', length);
});

Then(/^Planets result is$/, (planetsDataTable: DataTable) => {
  const app = new AppPage();
  const planetsToMatch = convertDataTableToPlanet(planetsDataTable.rows());
  planetsToMatch.forEach((planet, index) => planetMatcher(app.planetSearchResult.getPlanetByIndex(index), planet));
});

const convertDataTableToPlanet = (dataTableRows: string[][]): Array<Planet> => {
  const planetsToMatch: Array<Planet> = [];
  dataTableRows.map(row => planetsToMatch.push({
    name: row[0],
    population: row[1],
    climate: row[2],
    gravity: row[3]
  }));
  return planetsToMatch;
};
