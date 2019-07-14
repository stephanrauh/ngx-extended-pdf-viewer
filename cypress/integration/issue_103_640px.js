/// <reference types="Cypress" />

describe('Issue 103: responsive design, 640px', function() {
  it('below 640px the small-view buttons are hidden', function() {
    cy.viewport(640, 1000);
    cy.visit('http://127.0.0.1:4200');
    cy.contains('show sidebar button').click();
    cy.get('.pageUp')
      .parent()
      .should('have.class', 'hidden');
    cy.get('.bookmark').should('have.class', 'hidden');
    cy.get('.verticalToolbarSeparator').should('have.class', 'hidden');
    cy.get('.toolbarButtonSpacer').should('not.have.class', 'invisible');
    cy.get('#viewFind').click(); // show the findbar
    cy.get('.findbar').should('have.class', 'below640px');

    cy.contains('Codpaste').click();
    cy.get('.pageUp').should('not.be.visible');
    cy.get('.bookmark').should('not.be.visible');
    cy.get('.verticalToolbarSeparator').should('not.be.visible');

    cy.get('.toolbarButtonSpacer').should('not.be.visible');
    cy.get('.findbar').should('not.have.class', 'below640px');
  });

  it('above 640px the small-view buttons are visible', function() {
    cy.viewport(642, 1000);
    cy.visit('http://127.0.0.1:4200');
    cy.contains('show sidebar button').click();
    cy.get('.pageUp')
      .parent()
      .should('have.class', 'hidden');
    cy.get('.bookmark').should('have.class', 'hidden');
    cy.get('.verticalToolbarSeparator').should('have.class', 'hidden');
    cy.get('.toolbarButtonSpacer').should('not.have.class', 'invisible');
    cy.get('.findbar').should('have.class', 'below640px');

    cy.contains('Codpaste').click();
    cy.get('.pageUp').should('not.be.visible');
    cy.get('.bookmark').should('not.be.visible');
    cy.get('.verticalToolbarSeparator').should('not.be.visible');

    cy.get('.toolbarButtonSpacer').should('not.be.visible');
    cy.get('.findbar').should('not.have.class', 'below640px');
  });
});

/*
@media all and (max-width: 640px) {
  .hiddenSmallView, .hiddenSmallView * {
    display: none;
  }
  .visibleSmallView {
    display: inherit;
  }
  .toolbarButtonSpacer {
    width: 0;
  }
  html[dir='ltr'] .findbar {
    left: 38px;
  }
  html[dir='rtl'] .findbar {
    right: 38px;
  }
}
*/
