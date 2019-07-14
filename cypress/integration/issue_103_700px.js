/// <reference types="Cypress" />

describe('Issue 103: responsive design, 640px', function() {
  it('below 700px the medium-view buttons are moved to the secondary toolbar', function() {
    cy.viewport(700, 1000);
    cy.visit('http://127.0.0.1:4200');
    cy.get('#print').should('have.class', 'hidden');
    cy.get('#download').should('have.class', 'hidden');
    cy.get('#secondaryToolbarToggle').click();
    cy.get('#secondaryPrint').should('not.have.class', 'hidden');
    cy.get('#secondaryDownload').should('not.have.class', 'hidden');

    cy.contains('Codpaste').click();
    cy.get('#secondaryToolbarToggle').click();
    cy.get('#print').should('not.be.visible');
    cy.get('#download').should('not.be.visible');
    cy.get('#secondaryPrint').should('be.visible');
    cy.get('#secondaryDownload').should('be.visible');
  });

  it('above 700px the medium-view buttons are visible in the main toolbar', function() {
    cy.viewport(701, 1000);
    cy.visit('http://127.0.0.1:4200');
    cy.get('#print').should('not.have.class', 'hidden');
    cy.get('#download').should('not.have.class', 'hidden');
    cy.get('#secondaryToolbarToggle').click();
    cy.get('#secondaryPrint').should('have.class', 'hidden');
    cy.get('#secondaryDownload').should('have.class', 'hidden');

    cy.contains('Codpaste').click();
    cy.get('#secondaryToolbarToggle').click();
    cy.get('#print').should('be.visible');
    cy.get('#download').should('be.visible');
    cy.get('#secondaryPrint').should('not.be.visible');
    cy.get('#secondaryDownload').should('not.be.visible');
  });
});

/*
@media all and (max-width: 700px) {
  #outerContainer .hiddenMediumView { // = #print and #download
    display: none;
  }
  #outerContainer .visibleMediumView { // = #secondaryPrint and #secondaryDownload
    display: inherit;
  }
}
*/
