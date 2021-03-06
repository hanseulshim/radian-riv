/// <reference types="cypress" />

export default () => {
  describe('Security Questions', () => {
    before(() => {
      cy.intercept('GET', '/utility/states', { fixture: 'states' })
      cy.intercept('GET', '/auth/questions', { fixture: 'questions' })
      cy.get('#sidebar').click()
      cy.get('.route-link').contains('Change Security Questions').click()
      cy.url().should('contain', '/profile/security-questions')
    })
    beforeEach(() => {
      Cypress.Cookies.preserveOnce('auth')
    })
    it('Should have header tag: Change Security Questions', () => {
      cy.get('.security-questions > h1').contains('Change Security Questions')
    })

    it('Should have three security questions', () => {
      cy.get('.custom-select-container').should('have.length', 3)
    })
    it('Empty answers should throw error', () => {
      cy.get('#security-questions').submit()
      cy.get('input[type="text"]')
        .siblings('.error-input-message')
        .contains("Answer can't be blank")
    })
    it('Submitting answers should result in success', () => {
      cy.get('.input-group > input[type="text"]').each($el => {
        cy.wrap($el).type('test')
      })
      cy.intercept('POST', '/auth/questionset', { fixture: 'successful' })
      cy.get('#security-questions').submit()
      cy.get('.alert-success')
    })
  })
}
