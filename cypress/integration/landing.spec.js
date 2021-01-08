/// <reference types="cypress" />

describe('Landing page', () => {
  before(() => {
    cy.login()
  })
  it('should be on landing page', () => {
    cy.url().should('eq', 'http://localhost:3000/')
    cy.get('#profile-logo')
    cy.get('h1').contains('Welcome to Radian Interactive Value')
    cy.get('.route-link').contains('Home')
    cy.get('.route-link').contains('Trending')
    cy.get('.route-link').contains('Radian Interactive Value')
  })
})
