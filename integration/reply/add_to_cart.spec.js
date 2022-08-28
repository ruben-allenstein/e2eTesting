before(function () {
    cy.fixture('dev').then((credentials) => {
        Cypress.config('baseUrl', credentials.baseUrl);
        this.email = credentials.email
        this.password = credentials.password
        this.paymentMethod = credentials.paymentMethod
    })
})

describe('Order', function () {
    it('order', function () {
        cy.login(this.email, this.password);
        cy.addToCart();
        cy.visit('/checkout/confirm');
        cy.get('.confirm-payment-current').should('not.contain', this.paymentMethod).then(() => {
            cy.log('wrong payment');
            cy.get('.confirm-payment-shipping .confirm-payment').should('have.length', 1).find('button').first().click();
            cy.get('#confirmPaymentForm').find('.payment-method').contains(this.paymentMethod).click();
            cy.get('#confirmPaymentForm button[type="submit"]').click();
        });
        cy.get('label[for="tos"]').should('have.length', 1).click('topLeft');
        cy.get('.confirm-payment-current').should('contain', this.paymentMethod).then(() => {
            cy.get('#confirmFormSubmit').click();
            cy.get('body').should('have.class', 'is-act-finishpage');
            cy.get('.finish-ordernumber').then(function($elem) {
                this.ordernumber = $elem.text().substring($elem.text().indexOf('#')+1).trim();

                cy.orderExist(this.ordernumber);
            })
        });
    });
})
