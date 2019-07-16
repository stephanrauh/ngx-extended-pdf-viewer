/// <reference types="Cypress" />

describe('Issue 103: responsive design, 840px', function() {
  it('below 840px the medium-view buttons are moved to the secondary toolbar', function() {
    cy.viewport(839, 1000);
    cy.visit('http://127.0.0.1:4200');

    cy.get('.zoom').should('have.class', 'below840px');
    // cy.contains('Codpaste').click();
  });

  it('above 840px the medium-view buttons are visible in the main toolbar', function() {
    cy.viewport(880, 1000);
    cy.visit('http://127.0.0.1:4200');
    cy.get('.zoom').should('not.have.class', 'below840px');
  });
});

/*
@media all and (max-width: 840px) {
  #sidebarContent {
    background-color: hsla(0,0%,0%,.7);
  }

  html[dir='ltr'] #outerContainer.sidebarOpen #viewerContainer {
    left: 0px !important;
  }
  html[dir='rtl'] #outerContainer.sidebarOpen #viewerContainer {
    right: 0px !important;
  }

  #outerContainer .hiddenLargeView,
  #outerContainer .hiddenMediumView {
    display: inherit;
  }
  #outerContainer .visibleLargeView,
  #outerContainer .visibleMediumView {
    display: none;
  }
}
*/
