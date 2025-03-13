import type {} from 'cypress';
import type {} from "../support/cypress";

describe('Modals', () => {
  beforeEach(() => {

  });

  it('drag buns', () => {
    cy.get("[data-cy=ingredient-item]").first().trigger('dragstart')
    cy.get("[data-cy=burger-constructor]").trigger('drop')
    cy.get('[data-cy=constructor-bun-top]').contains('верх')
    cy.get('[data-cy=constructor-bun-bottom]').contains('низ')
  })

  it('drag ingredient', () => {
    cy.get('#sauce [data-cy=ingredient-item]').first().contains('Соус Spicy-X')
    cy.get('#sauce [data-cy=ingredient-item]').first().trigger('dragstart')
    cy.get('[data-cy=burger-constructor]').trigger('drop')
    cy.get('[data-cy=constructor-center]').get('[data-cy=burger-constructor-item]').contains('Соус Spicy-X')
  })

})