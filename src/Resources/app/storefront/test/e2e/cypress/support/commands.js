Cypress.Commands.add('orderExist', (ordernumber) => {
    cy.visit('/account/order');
    cy.get('.account-orders-overview .order-item-number-value').contains(ordernumber).should('have.length', 1);
});

Cypress.Commands.add('login', (username, password) => {
    cy.visit('/account/login');
    cy.get('#loginMail').type(username);
    cy.get('#loginPassword').type(password);
    cy.get('.login-form button[type="submit"]').click();
});

Cypress.Commands.add('addToCart', () => {
    cy.visit('/')
    //Click on second link of main-navigation
    cy.get('.main-navigation-link').first().next().click();
    //Get first product
    cy.get('.cms-listing-row').should('have.length', 1).find('.product-box').should('have.length.gte', 1).first().as('product');
    //Visit first product
    cy.get('@product').find('a.product-name').should('have.length', 1).click();
    //Add to cart
    cy.get('#productDetailPageBuyProductForm').should('have.length', 1).find('.btn-buy').should('have.length', 1).click();
    //Check product is in offcanvas cart
    cy.get('.offcanvas-cart').should('have.length', 1).find('.cart-item').should('have.length.gte', 1);
});
