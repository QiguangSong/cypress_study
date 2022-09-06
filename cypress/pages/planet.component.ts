import {Page} from './page';
import Chainable = Cypress.Chainable;

export class PlanetComponent extends Page {
  public constructor(selector: Cypress.Chainable<JQuery>) {
    super({init: selector, alias: 'planet-component'});
  }

  get nameHeading(): Chainable<JQuery> {
    return cy.get(this.selfAlias).find('h6.card-subtitle');
  }

  get populationValue(): Chainable<JQuery> {
    return cy.get(this.selfAlias).find('div[data-testid="population"]');
  }

  get climateValue(): Chainable<JQuery> {
    return cy.get(this.selfAlias).find('div[data-testid="climate"]');
  }

  get gravityValue(): Chainable<JQuery> {
    return cy.get(this.selfAlias).find('div[data-testid="gravity"]');
  }
}
