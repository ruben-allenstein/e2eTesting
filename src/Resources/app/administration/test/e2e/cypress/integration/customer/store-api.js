before(function () {
    cy.fixture('customer').as('customer');
})

describe('Customer store Api test', function () {
    /* Create Customer
    it('Create test customer', function () {
        cy.createCustomerFixtureStorefront(this.customer).as('createUser');
    });
    */
    it('Delete test user', function () {
        const customer = this.customer;
        const header = {
            "content-type": "application/json",
            "sw-access-key": "",
            "sw-context-token": ""
        };

        //Get Access Key
        cy.getSalesChannelId().then(function (accessKey) {
            header["sw-access-key"] = accessKey;

            //Login as customer to get the context token
            return cy.request({
                "url": `/store-api/${Cypress.env('apiVersion')}/account/login`,
                "method": "POST",
                "headers": header,
                "body": {
                    "username": customer.email,
                    "password": customer.password
                }
            }).then(function (result) {
                header["sw-context-token"] = result.body.contextToken;

                //Delete Customer (Inactive feature FEATURE_NEXT_10077)
                return cy.request({
                    headers: header,
                    "url": `/store-api/${Cypress.env('apiVersion')}/account/customer`,
                    "method": "DELETE"
                }).then(function (result) {
                    return result;
                });
            });
        });
    });
})
