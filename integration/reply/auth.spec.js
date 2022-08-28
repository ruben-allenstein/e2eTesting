before(function () {
    cy.fixture('dev').then((credentials) => {
        Cypress.config('baseUrl', credentials.baseUrl);
    });

    cy.fixture('auth').as('auth');
    cy.fixture('customer').as('customer');
})

describe('Authentification', function () {
    it('auth', function () {

        cy.request({
            'method': 'POST',
            'url': '/sales-channel-api/v1/customer/login',
            'headers': {
                'content-type': 'application/json',
                'sw-access-key': 'SWSCSJZMUEDGQLFEWFCZWTVXTG'
            },
            'body': {
                'username': this.customer.email,
                'password': this.customer.password
            }
        }) .then((resp) => {

            cy.request({
                'method': 'GET',
                'url': '/sales-channel-api/v1/customer/',
                'headers': {
                    'content-type': 'application/json',
                    'sw-access-key': 'SWSCSJZMUEDGQLFEWFCZWTVXTG'
                },
            }) .then((resp) => {
                cy.log(resp);
            })
        })


        /*
        cy.request({
            'method': 'POST',
            'url': '/sales-channel-api/v1/salutation',
            'headers': {
                'content-type': 'application/json',
                'sw-access-key': 'SWSCSJZMUEDGQLFEWFCZWTVXTG'
            },
        }) .then((resp) => {
            this.customer['salutationId'] = resp.body.data[0].id;
        })
        cy.request({
            'method': 'GET',
            'url': '/sales-channel-api/v1/country?filter[iso3]=deu',
            'headers': {
                'content-type': 'application/json',
                'sw-access-key': 'SWSCSJZMUEDGQLFEWFCZWTVXTG'
            },
        }) .then((resp) => {
            this.customer['billingAddress']['countryId'] = resp.body.data[0].id;
        })
        */
        cy.request({
            'method': 'POST',
            'url': '/sales-channel-api/v1/customer',
            'form': true,
            'headers': {
                'content-type': 'application/json',
                'sw-access-key': 'SWSCSJZMUEDGQLFEWFCZWTVXTG'
            },
            'body': this.customer
        }).then((resp) => {
            cy.log(resp);
        })
    });
})
