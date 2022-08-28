Cypress.Commands.add('loginToAdministration', () => {
    cy.visit('/admin');
    cy.get('#sw-field--username')
        .type(Cypress.env('user'))
        .should('have.value', Cypress.env('user'));
    cy.get('#sw-field--password')
        .type(Cypress.env('pass'))
        .should('have.value', Cypress.env('pass'));
    cy.get('.sw-login-login').submit();
    cy.contains('Dashboard');
});
