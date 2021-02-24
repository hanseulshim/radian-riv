/// <reference types="cypress" />

import profile from '../tests/account/profile.spec'
import changePassword from '../tests/account/changePassword.spec'
import filterDefaults from '../tests/account/filterDefaults.spec'
import securityQuestions from '../tests/account/securityQuestions.spec'
describe('Account Profile', () => {
  before(() => {
    cy.login()
    cy.profile()
  })
  profile()
  changePassword()
  securityQuestions()
  filterDefaults()
  after(() => {
    cy.clearCookies()
  })
})
