before (function () {
    cy.fixture('customer').as('customer');
})
describe('Customer administration test', function () {
    it('...', function () {
        const customer = this.customer;
        cy.loginToAdministration();
        cy.clickMainMenuItem({
            "targetPath": "customer/index",
            "mainMenuId": "sw-customer"
        });
        cy.get('.sw-search-bar__input').typeAndCheckSearchField(this.customer.customerNumber).then( function() {
            cy.get('.sw-customer-list__content .sw-data-grid__body .sw-data-grid__row').should('have.length', 1).and('contain', customer.email).then( function (row) {
                cy.clickContextMenuItem('.sw-customer-list__delete-action', '.sw-customer-list__content .sw-data-grid__body .sw-data-grid__row--0 .sw-context-button__button').then(function (){
                    cy.get('.sw-modal').should('contain', customer.lastName).then(function(modal) {
                        modal.find('.sw-button--danger').click();
                    });
                });
            });
        });
    });
});
