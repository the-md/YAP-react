import type {} from 'cypress';
import type {} from "../support/commands";
import { selectors } from "../fixtures/selectors";

describe('Drag and Drop', () => {
  beforeEach(() => {
    cy.prepare();
  });

  it('drag buns', () => {
    cy.get(selectors.ingredientItem).first().trigger('dragstart')
    cy.get(selectors.burgerConstructor).trigger('drop')
    cy.get(selectors.constructorBunTop).contains('верх')
    cy.get(selectors.constructorBunBottom).contains('низ')
  })

  it('drag ingredient', () => {
    cy.get(selectors.ingredientItemSauce).first().contains('Соус Spicy-X')
    cy.get(selectors.ingredientItemSauce).first().trigger('dragstart')
    cy.get(selectors.burgerConstructor).trigger('drop')
    cy.get(selectors.constructorCenter).get('[data-cy=burger-constructor-item]').contains('Соус Spicy-X')
  })

})