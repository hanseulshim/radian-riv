/// <reference types="cypress" />

describe('Change Password page', () => {
  before(() => {
    cy.myAccount()
    cy.get('.subroute-link').contains('Change Password').click()
  })
  beforeEach(() => {
    Cypress.Cookies.preserveOnce('auth')
  })
  it('Should have header tag: Change Password', () => {
    cy.get('.change-password > h1').contains('Change Password')
  })
  it('Empty password should have input error', () => {
    cy.get('#change-password').submit()
    cy.get('input[name="New Password"]')
      .siblings('.error-input-message')
      .contains("Password can't be empty")
    cy.get('input[name="Confirm Password"]')
      .siblings('.error-input-message')
      .contains("Password can't be empty")
  })
  it('Unmatched password should have input error', () => {
    cy.get('input[name="New Password"]').type('test')
    cy.get('input[name="Confirm Password"]').type('test1')
    cy.get('#change-password').submit()
    cy.get('input[name="Confirm Password"]')
      .siblings('.error-input-message')
      .contains('Confirm password must match password')
    cy.get('input[name="New Password"]').clear()
    cy.get('input[name="Confirm Password"]').clear()
  })
  it('Should test password strength', () => {
    cy.get('.pwd-strength').contains('Password not entered')
    cy.get('input[name="New Password"]').type('a')
    cy.get('.pwd-strength').contains('Very Weak')
    cy.get('input[name="New Password"]').type('A')
    cy.get('.pwd-strength').contains('Weak')
    cy.get('input[name="New Password"]').type('1')
    cy.get('.pwd-strength').contains('Better')
    cy.get('input[name="New Password"]').type('!')
    cy.get('.pwd-strength').contains('Medium')
    cy.get('input[name="New Password"]').type('1234')
    cy.get('.pwd-strength').contains('Strong')
    cy.get('input[name="Confirm Password"]').type('aA1!1234')
    cy.get('#change-password').submit()
    cy.get('#change-password > .alert-success')
  })
})
