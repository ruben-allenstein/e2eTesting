context('Mega menu test', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('Hover and check if layer is open', () => {
        //hover on first menu item and check its state
        cy.get('[data-flyout-menu-trigger]').first().trigger('mouseenter')
            .should('have.class', 'is-open').then(($btn) => {
            var uuid = $btn.attr('data-flyout-menu-trigger');

            //check state of related layer
            cy.get('[data-flyout-menu-id='+ uuid +']').should('have.length', 1)
                .and('have.class', 'is-open');
        });
    })
})
