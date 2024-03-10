require('@shopware-ag/e2e-testsuite-platform/cypress/support');

context('Account', () => {
    Cypress.on('uncaught:exception', (err, runnable) => {
        console.log(err);
        return false;
    })

    beforeEach(() => {
   })

    it('delete customer via email', () => {
        // call delete Customer function
        cy.delete-customer-by-email()
    })
})
