/// <reference types="Cypress" />

describe('Issue 103: responsive design, 640px', function() {
  it('below 900px #toolbarViewerMiddle left=auto', function() {
    cy.viewport(900, 1000);
    cy.visit('http://127.0.0.1:4200');
    cy.get('#toolbarViewerMiddle').should('have.css', 'left', 'auto');
    cy.get('#toolbarViewerMiddle').should('have.class', 'toolbarViewerMiddleBelow900px');

    cy.contains('Codpaste').click();
    cy.get('#toolbarViewerMiddle').should('have.css', 'left', 'auto');
  });

  it('above 900px #toolbarViewerMiddle left = 50%;', function() {
    cy.viewport(901, 1000);
    cy.visit('http://127.0.0.1:4200');
    cy.get('#toolbarViewerMiddle').should('not.have.css', 'left', 'auto');
    cy.get('#toolbarViewerMiddle').should('not.have.class', 'toolbarViewerMiddleBelow900px');

    cy.contains('Codpaste').click();
    // question to ponder: should we really test the "50%" bits? Cypress converts this to pixels,
    // which seem to be extremely fragile
    cy.get('#toolbarViewerMiddle').should('have.css', 'left', '435px');
    cy.get('#toolbarViewerMiddle').should('not.have.class', 'toolbarViewerMiddleBelow900px');
  });
});

/*
@media all and (max-width: 900px) {
  #toolbarViewerMiddle {
    display: table;
    margin: auto;
    left: auto;
    position: inherit;
    -webkit-transform: none;
            transform: none;
  }
}
*/
