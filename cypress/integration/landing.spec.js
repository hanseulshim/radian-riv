/// <reference types="cypress" />

describe('Landing page', () => {
  before(() => {
    cy.login()
  })
  it('should be on landing page', () => {
    cy.url().should('eq', 'http://localhost:3000/')
    cy.get('#profile-logo')
    cy.get('#sidebar')
    cy.get('.container')
    cy.get('#sidebar > .route-link').first().should('contain', 'My Account')
  })
})
