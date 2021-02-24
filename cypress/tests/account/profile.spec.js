/// <reference types="cypress" />

export default () => {
  describe('User Profile', () => {
    beforeEach(() => {
      Cypress.Cookies.preserveOnce('auth')
    })
    it('Should have header tag: Profile', () => {
      cy.get('h1').contains('Profile')
    })
    it('should have username and email', () => {
      cy.get('.info-container').contains('Username:')
      cy.get('.info-container').contains('Email:')
    })
    it('should have profile input fields', () => {
      cy.get('input[name="First Name"]').clear()
      cy.get('input[name="Last Name"]').clear()
      cy.get('input[name="Title"]').clear()
      cy.get('input[name="Address"]').clear()
      cy.get('input[name="City"]').clear()
      cy.get('input[name="Zip"]').clear()
      cy.get('input[name="Department"]')
      cy.get('input[name="Cell Phone"]').clear()
      cy.get('input[name="Home Phone"]').clear()
    })
    it('should have phone number validation', () => {
      cy.get('input[name="Cell Phone"]').type('invalid')
      cy.get('input[name="Home Phone"]').type('invalid')
      cy.get('#profile').submit()
      cy.get('input[name="Cell Phone"]')
        .siblings('.error-input-message')
        .should('contain', 'Must be a valid phone number format')
      cy.get('input[name="Home Phone"]')
        .siblings('.error-input-message')
        .should('contain', 'Must be a valid phone number format')
      cy.get('input[name="Cell Phone"]').clear()
      cy.get('input[name="Home Phone"]').clear()
    })
    it('submitting form should set cookie', () => {
      cy.get('input[name="First Name"]').type('Hingle')
      cy.get('input[name="Last Name"]').type('McCringleberry')
      cy.get('input[name="Title"]').type('Title')
      cy.get('input[name="Address"]').type('Address')
      cy.get('input[name="City"]').type('City')
      cy.get('input[name="Zip"]').type('Zip')
      cy.get('input[name="Cell Phone"]').type('123-456-7890')
      cy.get('input[name="Home Phone"]').type('123-456-7890')
      cy.intercept('POST', '/user/update', { fixture: 'successful' })
      cy.get('#profile').submit()
      cy.get('.alert-success')
      cy.get('.profile-row > span').contains('Hello Hingle McCringleberry')
    })
  })
}
