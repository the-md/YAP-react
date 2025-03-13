/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

import { BURGER_API_URL } from "../../src/utils/api";

Cypress.Commands.add("prepare", () => {
  cy.intercept("GET", `${BURGER_API_URL}/ingredients`, { fixture: "ingredients" }).as("getIngredients");
  cy.visit('/');

  cy.intercept("POST", `${BURGER_API_URL}/auth/login`, { fixture: "login" }).as("login");
  cy.visit("/login");
  cy.get('[data-cy=email-input]').type(`test@test.ru`);
  cy.get('[data-cy=password-input]').type(`password{enter}`);


  cy.intercept("POST", `${BURGER_API_URL}/orders`, { fixture: "order" }).as("order");

});