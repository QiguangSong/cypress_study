import {DataTable, Step, Then, When} from '@badeball/cypress-cucumber-preprocessor';
import {interceptGetSwapiPeople} from '../../support/swapi.intercept';
import {AppPage} from '../../pages/app.page';
import {People, peopleMatcher} from '../../support/util';

When(/^Search for people\s?(.*)\s?$/, (keyword: string) => {
  cy.searchPeople(keyword);
});

When(/^Check via Backend for people\s?(.*)\s?$/, (keyword: string) => {
  const peopleAlias = interceptGetSwapiPeople();
  Step(this, `Search for people${keyword}`);
  cy.wait(peopleAlias);
});

When('Delay backend call for {int} ms', (delayInMs: number) => {
  interceptGetSwapiPeople(delayInMs);
});

Then(/^People result is (shown|not shown)$/, (matcher: 'shown' | 'not shown') => {
  const app = new AppPage();
  app.peopleSearchResult.self.should(matcher.replace(' ', '.'));
});

Then(/^People have (\d+) result(?:s)?$/, (length: number) => {
  const app = new AppPage();
  app.peopleSearchResult.characters.should('have.length', length);
});

Then(/^People result is$/, (peopleDataTable: DataTable) => {
  const app = new AppPage();
  const peoplesToMatch = convertDataTableToPeople(peopleDataTable.rows());
  peoplesToMatch.forEach((people, index) => peopleMatcher(app.peopleSearchResult.getCharacterByIndex(index), people));
});

const convertDataTableToPeople = (dataTableRows: string[][]): Array<People> => {
  const peoplesToMatch: Array<People> = [];
  dataTableRows.map(row => peoplesToMatch.push({
    name: row[0],
    gender: row[1],
    birthYear: row[2],
    eyeColor: row[3],
    skinColor: row[4]
  }));
  return peoplesToMatch;
};
