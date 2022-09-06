import {Page} from './page';
import {SearchComponent} from './search.component';
import {CharacterComponent} from './character.component';
import Chainable = Cypress.Chainable;
import {PlanetComponent} from './planet.component';

export class AppPage extends Page {
  public constructor() {
    super({init: 'app-root', alias: 'root'});
  }

  get heading(): Chainable<JQuery> {
    return cy.get(this.selfAlias).find('h1');
  }

  get searchForm(): SearchComponent {
    return new SearchComponent();
  }

  get peopleSearchResult(): PeopleSearch {
    return new PeopleSearch(cy.get(this.selfAlias).find('div[data-testid="PeopleSearch"]'));
  }

  get planetSearchResult(): planetSearch {
    return new planetSearch(cy.get(this.selfAlias).find('div[data-testid="planetSearch"]'));
  }

  get loading(): Chainable<JQuery> {
    return cy.get(this.selfAlias).find('div[data-testid="loading"]');
  }

  get notFound(): Chainable<JQuery> {
    return cy.get(this.selfAlias).find('div[data-testid="notFound"]');
  }

}

class PeopleSearch extends Page {
  private characterSelector = 'app-character';

  public constructor(selector: Cypress.Chainable<JQuery>) {
    super({init: selector, alias: 'people-result'});
  }

  get characters(): Chainable<JQuery> {
    return cy.get(this.selfAlias).find(this.characterSelector);
  }

  getCharacterByIndex(row: number): CharacterComponent {
    return new CharacterComponent(cy.get(this.selfAlias).find(this.characterSelector).eq(row));
  }

}

class planetSearch extends Page {
  private characterSelector = 'app-planet';

  public constructor(selector: Cypress.Chainable<JQuery>) {
    super({init: selector, alias: 'planet-result'});
  }

  get planets(): Chainable<JQuery> {
    return cy.get(this.selfAlias).find(this.characterSelector);
  }

  getPlanetByIndex(row: number): PlanetComponent {
    return new PlanetComponent(cy.get(this.selfAlias).find(this.characterSelector).eq(row));
  }
}
