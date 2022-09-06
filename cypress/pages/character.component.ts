import {Page} from './page';
import Chainable = Cypress.Chainable;

export class CharacterComponent extends Page {
  public constructor(selector: Cypress.Chainable<JQuery>) {
    super({init: selector, alias: 'character-component'});
  }

  get nameHeading(): Chainable<JQuery> {
    return cy.get(this.selfAlias).find('h6.card-subtitle');
  }

  get genderValue(): Chainable<JQuery> {
    return cy.get(this.selfAlias).find('div[data-testid="gender"]');
  }

  get birthYearValue(): Chainable<JQuery> {
    return cy.get(this.selfAlias).find('div[data-testid="birthYear"]');
  }

  get eyeColorValue(): Chainable<JQuery> {
    return cy.get(this.selfAlias).find('div[data-testid="eyeColor"]');
  }

  get skinColorValue(): Chainable<JQuery> {
    return cy.get(this.selfAlias).find('div[data-testid="skinColor"]');
  }
}
