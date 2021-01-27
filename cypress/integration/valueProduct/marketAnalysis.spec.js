/// <reference types="cypress" />

describe('Market Analysis', () => {
  before(() => {
    cy.login()
    cy.valueProduct()
    cy.url().should('includes', '/value-products')
    cy.get('a').contains('18324 Tapwood Road').click()
    cy.url().should('includes', '/value-products/31130765-5')
    cy.get('.route-link').contains('Market Analysis').click()
    cy.url().should('includes', '/value-products/31130765-5/market-analysis')
  })
  beforeEach(() => {
    Cypress.Cookies.preserveOnce('auth')
  })

  it('should have header row', () => {
    cy.get('h1').contains('Market Analysis')
  })
  it('should render property info table', () => {
    cy.get('.property-tabs > .table-container').should('exist')
  })
  it('should render three tabs', () => {
    cy.get('.tab-container > li').should('have.length', 3)
  })
  it('should render analytics', () => {
    cy.get('.analytics > .label').contains('Subject SQFT')
    cy.get('.analytics > .label').contains('Subject Year Built')
    cy.get('.analytics > .label').contains('Prop Type')
    cy.get('.analytics > .label').contains('Area')
    cy.get('.analytics > .label').contains('Area Parameter')
    cy.get('.analytics > .label').contains('Current Active Listings')
    cy.get('.analytics > .label').contains('Current Pendings')
  })

  it('should render days table', () => {
    cy.get('.th').contains('Days')
  })
  it('should render sold days table', () => {
    cy.get('.header-group').contains('SOLD DAYS')
  })
  it('should render listing tables', () => {
    cy.get('.header-group').contains(
      'MEDIAN SOLD PRICE AS % OF FINAL LIST PRICE'
    )
    cy.get('.header-group').contains(
      'MEDIAN SOLD PRICE AS % OF ORIGINAL LIST PRICE'
    )
  })
  after(() => {
    cy.clearCookies()
  })
})
