import type {} from 'cypress';
import type {} from "../support/cypress";

describe('Modals', () => {
  beforeEach(() => {

  });

  it('open modal ingredient', () => {
    cy.get('[data-cy=ingredient-item]').first().click()
    cy.get('[data-cy=modal]').should('be.visible')
    cy.contains('Детали ингредиента').should('be.visible')
  })

  it('check ingredient data in modal', () => {
    cy.get('[data-cy=ingredient-item]').first().contains('Краторная булка N-200i')
    cy.get('[data-cy=ingredient-item]').first().click()
    cy.get('[data-cy=ingredient-detail-title]').contains('Краторная булка N-200i')
    cy.get('[data-cy=ingredient-detail-calories]').contains('420')
    cy.get('[data-cy=ingredient-detail-proteins]').contains('80')
    cy.get('[data-cy=ingredient-detail-fat]').contains('24')
    cy.get('[data-cy=ingredient-detail-carbohydrates]').contains('53')
  })

  it('close button modal ingredient', () => {
    cy.get('[data-cy=ingredient-item]').first().click()
    cy.get('[data-cy=modal]').should('be.visible')
    cy.get('[data-cy=modal-close]').click()
    cy.get('[data-cy=modal]').should('not.exist')
  })

  it('close overlay modal ingredient', () => {
    cy.get('[data-cy=ingredient-item]').first().click()
    cy.get('[data-cy=modal]').should('be.visible')
    cy.get('[data-cy=modal-overlay]').click('topLeft')
    cy.get('[data-cy=modal]').should('not.exist')
  })
})