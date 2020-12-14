/// <reference types="cypress" />

describe('Login', () => {
  before(() => {
    cy.visit('http://localhost:3000')
  })
  beforeEach(() => {
    cy.get('input[name="Username"]').as('username')
    cy.get('input[name="Password"]').as('password')
  })
  it('should redirect to /login', () => {
    cy.url().should('include', '/login')
  })
  it('should have input with name username and password', () => {
    cy.get('@username').should('be.empty')
    cy.get('@password').should('be.empty')
  })
  it('should show validation error on empty fields', () => {
    cy.get('@username').siblings('.error-input-message').should('be.empty')
    cy.get('@password').siblings('.error-input-message').should('be.empty')
    cy.get('button.login-button').click()
    cy.get('@username').siblings('.error-input-message').should('not.be.empty')
    cy.get('@password').siblings('.error-input-message').should('not.be.empty')
  })
})
