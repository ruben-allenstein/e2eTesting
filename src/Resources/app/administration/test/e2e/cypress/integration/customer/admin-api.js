const CustomerService = require('../../support/service/customer.service');
const uuid = require('uuid/v4');

before(function () {
    cy.fixture('customer').as('customer');
    cy.fixture('customer-address').as('customerAddress');
    this.uniqueId = uuid().replace(/-/g, '');
})

describe('Customer service test', function () {
    it('create, search and delete test user', function () {
        const customerService = new CustomerService();

        //create customer
        customerService.createCustomer(this.customer, this.customerAddress).then((result) => {
            assert.isObject(result, 'user was successfully created');

            //search for customer
            customerService.search('id', result.id).then((result) => {
                assert.isObject(result, 'customer was found');

                //delete customer
                customerService.deleteCustomer(result.id);
            });
        });
    });
});
describe('Customer admin api test', function () {
    it('Create test customer via CustomerFixture and UUID in email', function () {
        this.customer.email = this.uniqueId + this.customer.email;
        cy.createCustomerFixture(this.customer, this.customerAddress).then((response) => {
            assert.isObject(response, 'user was successfully created')
        });
    });
    it('Search for test customer with uuid in email and delete it', function () {
        cy.searchViaAdminApi({
            endpoint: 'customer',
            data: {
                field: 'email',
                value: this.customer.email
            }
        }).then((customerData) => {
            return cy.requestAdminApi('DELETE', `/api/${Cypress.env('apiVersion')}/customer/${customerData.id}`);
        });
    });
});
