/// <reference types="Cypress" />

describe('Issue 103: responsive design, 535px', function() {
  it('below 535px the scale selector is hidden', function() {
    cy.viewport(535, 1000);
    cy.visit('http://127.0.0.1:4200');
    cy.get('#scaleSelectContainer').should('have.class', 'hidden');
    cy.contains('Codpaste').click();
    cy.get('#scaleSelectContainer').should('not.be.visible');
  });
});

describe('above 535px the scale selector is visible', function() {
  it('Opens the demo', function() {
    cy.viewport(536, 1000);
    cy.visit('http://127.0.0.1:4200');
    cy.get('#scaleSelectContainer').should('not.have.class', 'hidden');
    cy.contains('Codpaste').click();
    cy.get('#scaleSelectContainer').should('be.visible');
  });
});
