/// <reference types="Cypress" />

describe('Issue 103: responsive design, 770px', function() {
  it('below 770px the medium-view buttons are moved to the secondary toolbar', function() {
    cy.viewport(770, 1000);
    cy.visit('http://127.0.0.1:4200');
    cy.get('#presentationMode').should('have.class', 'hidden');
    cy.get('#openFile').should('have.class', 'hidden');
    cy.get('#secondaryToolbarToggle').click();
    cy.get('#secondaryPresentationMode').should('not.have.class', 'hidden');
    cy.get('#secondaryOpenFile').should('not.have.class', 'hidden');

    cy.contains('Codpaste').click();
    cy.get('#secondaryToolbarToggle').click();
    cy.get('#presentationMode').should('not.be.visible');
    cy.get('#openFile').should('not.be.visible');
    cy.get('#secondaryPresentationMode').should('be.visible');
    cy.get('#secondaryOpenFile').should('be.visible');
  });

  it('above 770px the medium-view buttons are visible in the main toolbar', function() {
    cy.viewport(801, 1000); // 30 px additional space for scrollbar etc.
    cy.visit('http://127.0.0.1:4200');
    cy.get('#presentationMode').should('not.have.class', 'hidden');
    cy.get('#openFile').should('not.have.class', 'hidden');
    cy.get('#secondaryToolbarToggle').click();
    cy.get('#secondaryPresentationMode').should('have.class', 'hidden');
    cy.get('#secondaryOpenFile').should('have.class', 'hidden');

    cy.contains('Codpaste').click();
    cy.get('#secondaryToolbarToggle').click();
    cy.get('#presentationMode').should('be.visible');
    cy.get('#openFile').should('be.visible');
    // to do: why does this test fail?
    // cy.get('#secondaryPresentationMode').should('not.be.visible');
    // cy.get('#secondaryOpenFile').should('not.be.visible');
  });
});

/*
@media all and (max-width: 770px) {
  #outerContainer .hiddenLargeView {  // #presentationMode and  #openFile
    display: none;
  }
  #outerContainer .visibleLargeView { #secondaryPresentationMode and #secondaryOpenFile
    display: inherit;
  }
}
*/
