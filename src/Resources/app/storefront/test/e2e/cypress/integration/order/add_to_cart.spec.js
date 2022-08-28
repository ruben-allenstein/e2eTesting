before(function () {
    cy.fixture('customer').then((credentials) => {
        this.email = credentials.email
        this.password = credentials.password
    })
    cy.fixture('dev').then((credentials) => {
        this.paymentMethod = credentials.paymentMethod
    })
})

describe('Order', function () {
    it('login, add something to cart, check for right payment method and order', function () {
        //Login
        cy.login(this.email, this.password);
        //Add to cart
        cy.addToCart();
        //visit checkout confirm page
        cy.visit('/checkout/confirm');
        //change payment method if not equal given payment method
        cy.get('.confirm-payment-current').should('not.contain', this.paymentMethod).then(() => {
            cy.log('wrong payment');
            cy.get('.confirm-payment-shipping .confirm-payment').should('have.length', 1)
                .find('button').first().click();
            cy.get('#confirmPaymentForm').find('.payment-method').contains(this.paymentMethod).click();
            cy.get('#confirmPaymentForm button[type="submit"]').click();
        });
        //accept privacy
        cy.get('label[for="tos"]').should('have.length', 1).click('topLeft');
        //check for correct payment method
        cy.get('.confirm-payment-current').should('contain', this.paymentMethod).then(() => {
            //click on order button
            cy.get('#confirmFormSubmit').click();
            //check for finish page
            cy.get('body').should('have.class', 'is-act-finishpage');
            //get ordernumber
            cy.get('.finish-ordernumber').then(function($elem) {
                this.ordernumber = $elem.text().substring($elem.text().indexOf('#')+1).trim();
                //check if order exist in account order history
                cy.orderExist(this.ordernumber);
            })
        });
    });
})
