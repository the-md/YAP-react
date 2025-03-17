import type {} from 'cypress';
import type {} from "../support/commands";
import { selectors } from "../fixtures/selectors";

describe('Modals', () => {
  beforeEach(() => {
    cy.prepare();
  });

  it('open modal ingredient', () => {
    cy.get(selectors.ingredientItem).first().click()
    cy.get(selectors.modal).should('be.visible')
    cy.contains('Детали ингредиента').should('be.visible')
  })

  it('check ingredient data in modal', () => {
    cy.get(selectors.ingredientItem).first().contains('Краторная булка N-200i')
    cy.get(selectors.ingredientItem).first().click()
    cy.get(selectors.ingredientDetailTitle).contains('Краторная булка N-200i')
    cy.get(selectors.ingredientDetailCalories).contains('420')
    cy.get(selectors.ingredientDetailProteins).contains('80')
    cy.get(selectors.ingredientDetailFat).contains('24')
    cy.get(selectors.ingredientDetailCarbohydrates).contains('53')
  })

  it('close button modal ingredient', () => {
    cy.get(selectors.ingredientItem).first().click()
    cy.get(selectors.modal).should('be.visible')
    cy.get(selectors.modalClose).click()
    cy.get(selectors.modal).should('not.exist')
  })

  it('close overlay modal ingredient', () => {
    cy.get(selectors.ingredientItem).first().click()
    cy.get(selectors.modal).should('be.visible')
    cy.get(selectors.modalOverlay).click('topLeft')
    cy.get(selectors.modal).should('not.exist')
  })
})