/* eslint-disable cypress/no-unnecessary-waiting */
/// <reference types="cypress" />

describe('E2E product page', () => {
  it('test if product landing page rendered ', () => {
    cy.visit('/product');
    cy.get("[data-testid='product-landing']", { timeout: 30000 }).should(
      'exist',
    );
  });
  it('test if product slug urls rendered ', () => {
    cy.visit('/product/content');
    cy.get("[data-testid='product-slug']", { timeout: 30000 }).should('exist');
  });
});
