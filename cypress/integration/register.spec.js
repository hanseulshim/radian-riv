/// <reference types="cypress" />

describe('Register Flow', () => {
  before(() => {
    cy.visit('http://localhost:3000')
  })

  it('clicking Register for free should open modal', () => {
    cy.get('button').contains('Register for free').click()
    cy.get('.modal-container').find('h3').contains('Create a New Account')
  })

  describe('Create a New Account Form', () => {
    beforeEach(() => {
      cy.get('input[name="First Name"]').as('firstName')
      cy.get('input[name="Last Name"]').as('lastName')
      cy.get('input[name="User Name"]').as('username')
      cy.get('input[name="Phone"]').as('phone')
      cy.get('input[name="Email"]').as('email')
      cy.get('input[name="Confirm Email"]').as('confirmEmail')
      cy.get('@firstName')
        .siblings('.error-input-message')
        .as('firstName-error')
      cy.get('@lastName').siblings('.error-input-message').as('lastName-error')
      cy.get('@username').siblings('.error-input-message').as('username-error')
      cy.get('@phone').siblings('.error-input-message').as('phone-error')
      cy.get('@email').siblings('.error-input-message').as('email-error')
      cy.get('@confirmEmail')
        .siblings('.error-input-message')
        .as('confirmEmail-error')
    })

    it('empty submit should show errors on input', () => {
      cy.get('form.register').submit()
      cy.get('@firstName-error').should('not.be.empty')
      cy.get('@lastName-error').should('not.be.empty')
      cy.get('@username-error').should('not.be.empty')
      cy.get('@email-error').should('not.be.empty')
      cy.get('@confirmEmail-error').should('not.be.empty')
    })
    it('typing text should get rid of input errors', () => {
      cy.get('@firstName').type('firstName')
      cy.get('@lastName').type('lastName')
      cy.get('@username').type('username')
      cy.get('@email').type('email')
      cy.get('@confirmEmail').type('confirmEmail')
      cy.get('@firstName-error').should('be.empty')
      cy.get('@lastName-error').should('be.empty')
      cy.get('@username-error').should('be.empty')
      cy.get('@email-error').should('be.empty')
      cy.get('@confirmEmail-error').should('be.empty')
    })
    it('invalid email should trigger error', () => {
      cy.get('form.register').submit()
      cy.get('@email-error').contains('Email must be valid')
      cy.get('@confirmEmail-error').contains('Confirm Email must be valid')
    })

    it("invalid email that doesn't match should trigger error", () => {
      cy.get('@email').clear()
      cy.get('@confirmEmail').clear()
      cy.get('@email').type('test@boostlabs.com')
      cy.get('@confirmEmail').type('test1@boostlabs.com')
      cy.get('form.register').submit()
      cy.get('@confirmEmail-error').contains('Confirm Email must match email')
    })
    it('invalid phone number should trigger error', () => {
      cy.get('@phone').type('invalid')
      cy.get('form.register').submit()
      cy.get('@phone-error').contains('Must be a valid phone number format')
    })
    it('valid form should result in success', () => {
      cy.get('@phone').clear()
      cy.get('@confirmEmail').clear()
      cy.get('.styled-checkbox').click()
      cy.get('@phone').type('123-456-7890')
      cy.get('@confirmEmail').type('test@boostlabs.com')
      cy.get('form.register').submit()
      cy.get('form.register > .success-message')
    })
    it('should close modal', () => {
      cy.get('.close-form').click()
      cy.get('form.register').should('not.exist')
    })
  })
})
