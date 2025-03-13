import type {} from 'cypress';
import type {} from "../support/cypress";

describe('Modals', () => {
  beforeEach(() => {
    cy.prepare();
  });

  it('order', () => {
    cy.get("#bun [data-cy=ingredient-item]").first().trigger('dragstart')
    cy.get("[data-cy=burger-constructor]").trigger('drop')
    cy.get('#sauce [data-cy=ingredient-item]').first().trigger('dragstart')
    cy.get('[data-cy=burger-constructor]').trigger('drop')
    cy.get('#main [data-cy=ingredient-item]').first().trigger('dragstart')
    cy.get('[data-cy=burger-constructor]').trigger('drop')
    cy.get("[data-cy=total-price]").contains('3024')
    cy.get("[data-cy=order-button]").should("not.be.disabled");
    cy.get("[data-cy=order-button]").click()
    cy.wait(500)
    cy.get('[data-cy=modal]').should('be.visible')
    cy.get("[data-cy=order-number]").contains('55555')
  })

})