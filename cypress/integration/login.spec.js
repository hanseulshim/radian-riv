/// <reference types="cypress" />

describe('Login Page Functions', () => {
  before(() => {
    cy.visit('http://localhost:3000')
  })
  describe('Login', () => {
    describe('Before Login', () => {
      beforeEach(() => {
        cy.get('input[name="Username"]').as('username')
        cy.get('input[name="Password"]').as('password')
        cy.get('@username')
          .siblings('.error-input-message')
          .as('username-error')
        cy.get('@password')
          .siblings('.error-input-message')
          .as('password-error')
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
        cy.intercept('POST', '/auth/login', { fixture: 'login' })
        cy.intercept('GET', '/user/1234567890', { fixture: 'user' })
        cy.get('#login').submit()
        cy.url().should('not.include', '/login')
      })
    })
    describe('After Login', () => {
      it('should logout', () => {
        cy.get('#profile-logo').click()
        cy.get('.menu-container > li').contains('Logout').click()
      })
    })
  })

  describe('Reset Password Flow', () => {
    it('clicking forgot email should open modal', () => {
      cy.get('#reset-password-button').click()
      cy.get('.modal-container').find('h2').contains('Password Help')
    })
    describe('Reset Password Form', () => {
      beforeEach(() => {
        cy.get('input[name="User Name"]').as('username')
        cy.get('input[name="Email on file"]').as('email')
        cy.get('@username')
          .siblings('.error-input-message')
          .as('username-error')
        cy.get('@email').siblings('.error-input-message').as('email-error')
      })
      it('empty submit should show errors on input', () => {
        cy.get('#reset-password').submit()
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
        cy.get('#reset-password').submit()
        cy.get('@email-error').contains('Email must be valid')
      })
      it('valid email should push to security question', () => {
        cy.get('@email').clear()
        cy.get('@email').type('test@boostlabs.com')
        cy.intercept('POST', '/auth/reset', { fixture: 'reset' })
        cy.get('#reset-password').submit()
        cy.get('.modal-container').find('h2').contains('Security Question')
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
        cy.get('#set-question').submit()
        cy.get('@answer-error').should('not.be.empty')
      })
      it('typing text should get rid of input errors', () => {
        cy.get('@answer').type('answer')
        cy.get('@answer-error').should('be.empty')
        cy.intercept('POST', '/auth/answer', { fixture: 'successful' })
        cy.get('#set-question').submit()
      })
    })

    describe('Success Message', () => {
      it('submitting answer should show success message', () => {
        cy.get('.modal-container').find('h2').contains('Success!')
        cy.get('.question-success').should('not.be.empty')
      })
      it('should close modal', () => {
        cy.get('.close-form').click()
        cy.get('.question-success').should('not.exist')
      })
    })
  })
  describe('Register Flow', () => {
    it('clicking Register for free should open modal', () => {
      cy.get('button').contains('Register for free').click()
      cy.get('.modal-container').find('h2').contains('Create a New Account')
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
        cy.get('@lastName')
          .siblings('.error-input-message')
          .as('lastName-error')
        cy.get('@username')
          .siblings('.error-input-message')
          .as('username-error')
        cy.get('@phone').siblings('.error-input-message').as('phone-error')
        cy.get('@email').siblings('.error-input-message').as('email-error')
        cy.get('@confirmEmail')
          .siblings('.error-input-message')
          .as('confirmEmail-error')
      })

      it('empty submit should show errors on input', () => {
        cy.get('#register').submit()
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
        cy.get('#register').submit()
        cy.get('@email-error').contains('Email must be valid')
        cy.get('@confirmEmail-error').contains('Confirm Email must be valid')
      })

      it("invalid email that doesn't match should trigger error", () => {
        cy.get('@email').clear()
        cy.get('@confirmEmail').clear()
        cy.get('@email').type('test@boostlabs.com')
        cy.get('@confirmEmail').type('test1@boostlabs.com')
        cy.get('#register').submit()
        cy.get('@confirmEmail-error').contains('Confirm Email must match email')
      })
      it('invalid phone number should trigger error', () => {
        cy.get('@phone').type('invalid')
        cy.get('#register').submit()
        cy.get('@phone-error').contains('Must be a valid phone number format')
      })
      it('valid form should result in success', () => {
        cy.get('@phone').clear()
        cy.get('@confirmEmail').clear()
        cy.get('.styled-checkbox').click()
        cy.get('@phone').type('123-456-7890')
        cy.get('@confirmEmail').type('test@boostlabs.com')
        cy.intercept('POST', '/auth/register', { fixture: 'successful' })
        cy.get('#register').submit()
        cy.get('#register > .alert-success')
      })
      it('should close modal', () => {
        cy.get('.close-form').click()
        cy.get('#register').should('not.exist')
      })
    })
  })
})
