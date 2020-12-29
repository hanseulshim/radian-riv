/// <reference types="cypress" />

describe('Change Security Questions page', () => {
  before(() => {
    cy.myAccount()
    cy.get('.subroute-link').contains('Change Security Questions').click()
  })
  beforeEach(() => {
    Cypress.Cookies.preserveOnce('auth')
  })

  it('Should have header tag: Change Security Questions', () => {
    cy.get('.security-questions > h1').contains('Change Security Questions')
  })

  it('Should have three security questions', () => {
    cy.get('.custom-select').should('have.length', 3)
  })

  it('Empty answers should throw error', () => {
    cy.get('#security-questions').submit()
    cy.get('input[type="text"]')
      .siblings('.error-input-message')
      .contains("Answer can't be blank")
  })
  it('Submitting answers should result in success', () => {
    cy.get('input[type="text"]').each($el => {
      cy.wrap($el).type('test')
    })
    cy.get('#security-questions').submit()
    cy.get('.alert-success')
  })
  after(() => {
    cy.clearCookies()
  })
})
