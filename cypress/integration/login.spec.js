/// <reference types="cypress" />

describe('Login', () => {
  before(() => {
    cy.visit('http://localhost:3000')
  })
  beforeEach(() => {
    cy.get('input[name="Username"]').as('username')
    cy.get('input[name="Password"]').as('password')
    cy.get('@username').siblings('.error-input-message').as('username-error')
    cy.get('@password').siblings('.error-input-message').as('password-error')
  })
  it('should redirect to /login', () => {
    cy.url().should('include', '/login')
  })
  it('should have input with name username and password', () => {
    cy.get('@username').should('be.empty')
    cy.get('@password').should('be.empty')
  })
  it('empty submit should show errors on input', () => {
    cy.get('@username-error').should('be.empty')
    cy.get('@password-error').should('be.empty')
    cy.get('#login').submit()
    cy.get('@username-error').should('not.be.empty')
    cy.get('@password-error').should('not.be.empty')
  })
  it('typing text should get rid of input errors', () => {
    cy.get('@username').type('username')
    cy.get('@username-error').should('be.empty')
    cy.get('@password').type('password')
    cy.get('@password-error').should('be.empty')
  })
  it('clicking login should log user in', () => {
    cy.get('#login').submit()
    cy.url().should('not.include', '/login')
  })
})
