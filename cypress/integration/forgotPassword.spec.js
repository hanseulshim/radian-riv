/// <reference types="cypress" />

describe('Reset Password Flow', () => {
  before(() => {
    cy.visit('http://localhost:3000')
  })

  it('clicking forgot email should open modal', () => {
    cy.get('button').contains('Forgot Password').click()
    cy.get('.modal-container').find('h3').contains('Reset Password')
  })

  describe('Reset Password Form', () => {
    beforeEach(() => {
      cy.get('input[name="User Name"]').as('username')
      cy.get('input[name="Email on file"]').as('email')
      cy.get('@username').siblings('.error-input-message').as('username-error')
      cy.get('@email').siblings('.error-input-message').as('email-error')
    })

    it('empty submit should show errors on input', () => {
      cy.get('form.reset-password').submit()
      cy.get('@username-error').should('not.be.empty')
      cy.get('@email-error').should('not.be.empty')
    })
    it('typing text should get rid of input errors', () => {
      cy.get('@username').type('username')
      cy.get('@email').type('email')
      cy.get('@username-error').should('be.empty')
      cy.get('@email-error').should('be.empty')
    })
    it('invalid email should trigger error', () => {
      cy.get('form.reset-password').submit()
      cy.get('@email-error').contains('Email must be valid')
    })

    it('valid email should push to security question', () => {
      cy.get('@email').clear()
      cy.get('@email').type('test@boostlabs.com')
      cy.get('form.reset-password').submit()
      cy.get('.modal-container').find('h3').contains('Security Question')
    })
  })

  describe('Security Question', () => {
    beforeEach(() => {
      cy.get('input[name="Answer"]').as('answer')
      cy.get('@answer').siblings('.error-input-message').as('answer-error')
    })
    it('should show security question', () => {
      cy.get('.question').should('not.be.empty')
    })
    it('security question should show error on empty submit', () => {
      cy.get('form.reset-password').submit()
      cy.get('@answer-error').should('not.be.empty')
    })
    it('typing text should get rid of input errors', () => {
      cy.get('@answer').type('answer')
      cy.get('@answer-error').should('be.empty')
    })
    it('submitting answer should show success message', () => {
      cy.get('form.reset-password').submit()
      cy.get('form.reset-password > .success-message')
    })
    it('should close modal', () => {
      cy.get('.close-form').click()
      cy.get('form.reset-password').should('not.exist')
    })
  })
})
