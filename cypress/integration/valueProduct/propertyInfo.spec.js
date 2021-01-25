/// <reference types="cypress" />

describe('RIV Property Info', () => {
  before(() => {
    cy.login()
    cy.valueProduct()
    cy.url().should('includes', '/value-products')
    cy.get('a').contains('18324 Tapwood Road').click()
    cy.url().should('includes', '/value-products/31130765-5')
  })
  beforeEach(() => {
    Cypress.Cookies.preserveOnce('auth')
  })

  it('should have header row', () => {
    cy.get('h1').contains('RIV Property Info')
    cy.get('.lock-button').contains('Lock')
  })
  it('should have 3 button row', () => {
    cy.get('.btn').contains('Re-Order RIV')
    cy.get('.btn').contains('Order Rental Analysis')
    cy.get('.btn').contains('Change Property Characteristics')
  })
  it('has icon row', () => {
    cy.get('.icon-row > .icon').should('have.length', 6)
  })

  after(() => {
    cy.clearCookies()
  })
})
