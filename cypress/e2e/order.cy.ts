import type {} from 'cypress';
import type {} from "../support/commands";
import { BURGER_API_URL } from "../../src/utils/api";
import { selectors } from "../fixtures/selectors";

describe('Order', () => {
  beforeEach(() => {
    cy.prepare();
  });

  it('create order', () => {
    cy.intercept("POST", `${BURGER_API_URL}/auth/login`, { fixture: "login" }).as("login");
    cy.visit("/login");
    cy.get(selectors.emailInput).type(`test@test.ru`);
    cy.get(selectors.passwordInput).type(`password{enter}`);
    cy.intercept("POST", `${BURGER_API_URL}/orders`, { fixture: "order" }).as("order");

    cy.get(selectors.ingredientItemBun).first().trigger('dragstart')
    cy.get(selectors.burgerConstructor).trigger('drop')
    cy.get(selectors.ingredientItemSauce).first().trigger('dragstart')
    cy.get(selectors.burgerConstructor).trigger('drop')
    cy.get(selectors.ingredientItemMain).first().trigger('dragstart')
    cy.get(selectors.burgerConstructor).trigger('drop')
    cy.get(selectors.totalPrice).contains('3024')
    cy.get(selectors.orderButton).should("not.be.disabled");
    cy.get(selectors.orderButton).click()
    cy.wait(500)
    cy.get(selectors.modal).should('be.visible')
    cy.get(selectors.orderNumber).contains('55555')
  })

})