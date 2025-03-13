import type {} from 'cypress';
import type {} from "../support/commands";
import { BURGER_API_URL } from "../../src/utils/api";

describe('Order', () => {
  beforeEach(() => {
    cy.prepare();
  });

  it('create order', () => {
    cy.intercept("POST", `${BURGER_API_URL}/auth/login`, { fixture: "login" }).as("login");
    cy.visit("/login");
    cy.get('[data-cy=email-input]').type(`test@test.ru`);
    cy.get('[data-cy=password-input]').type(`password{enter}`);
    cy.intercept("POST", `${BURGER_API_URL}/orders`, { fixture: "order" }).as("order");

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