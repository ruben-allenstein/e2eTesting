before(function () {
    cy.fixture('dev').then((credentials) => {
        Cypress.config('baseUrl', credentials.baseUrl);
    })
})

context('first test', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('Hover Mega Menu', () => {
        cy.get('[data-flyout-menu-trigger]').first().trigger('mouseenter').should('have.class', 'is-open').then(($btn) => {
            var uuid = $btn.attr('data-flyout-menu-trigger');
            cy.get('[data-flyout-menu-id='+ uuid +']').should('have.length', 1).and('have.class', 'is-open');
        });
    })
})
