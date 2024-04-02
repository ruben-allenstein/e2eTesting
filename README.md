# Cypress-frontend-testing

## Project structure:
- account - tests related with the user account
- checkout - checkout as customer and checkout as guest
- content - check if the webpage is loading
  
## Tests 
  - register as customer
  - delete customer
  - login
  - logout
  - checkout as customer
  - checkout as guest
  - start homepage
  - pdp
  - plp

## Implementation of the tests
- If you want to use the frontend-tests locally you have to include the cypress folder into the root folder of your project and you have to install the cypress dependencies
- If you just want to use the tests and run them via Gitlab-ci, just include the cypress folder into your project

#### The [E2E-testsuite-platform](https://github.com/shopware/e2e-testsuite-platform) package contains commands and helpers supporting you while building E2E tests for Shopware 6.
- If you want to use your tests locally this package needs to be included 

##### Hint:
- At the moment it is not automatically installed with the execution of the .gitlab-ci.yml in the Gitlab CI

## Installation for local execution of cypress:
- Precondition: You need to have a package manager like npm to install the dependencies like cypress or E2E
1. The cypress.config.js is the set configuration set up for cypress and in the cypress.env.json are crendentials for testing
   - if you want to test it with customer credentials, make sure to you the CI/CD environment variables!
2. If you want to test your E2E tests local, you need to install cypress locally too.
```npm install cypress --save-dev```
   - The --save-dev option is used to install and save your project dependencies under the devDependencies object - Packages installed under devDependencies will be ignored when you run a production build
3. Install the E2E-testsuite-platform ```npm install --save @shopware-ag/e2e-testsuite-platform```
4. Now you can open the dashboard with running the command ````node_modules/.bin/cypress open````
5. Your tests run automatically in the command line with ```node_modules/.bin/cypress run```

## Execution on Gitlab
- At the moment the execution of the cypress based E2E tests is running over Gitlab CI. 
- The shopware-goal which should be tested (e.g. dev/testing) can be defined in the environment variable CYPRESS_ENV_JSON
- [Check Settings here](https://gitlab.portaltech.cloud/ruben.allenstein/cypress-frontend-testing)
- When the E2E-tests are executed, the test result is visible in the GitLab (CI/CD --> Pipelines)
- to implement the e2e-testsuite-platform package you need to set it up on your ```.gitlab-ci.yml``` file
