/// <reference types="cypress" />

describe('RIV Property Info > Historical Listing', () => {
  before(() => {
    cy.login()
    cy.valueProduct()
    cy.get('a').contains('18324 Tapwood Road').click()
    cy.url().should('includes', '/value-products/31130765-5')
  })
  beforeEach(() => {
    Cypress.Cookies.preserveOnce('auth')
  })

  it('should open historical listing modal', () => {
    cy.get('.link').contains('Learn More').last().click()
    cy.get('#historical-listing-modal')
  })

  it('should get picture comp elements', () => {
    cy.get('.top-row > h2').contains('#')
    cy.get('.btn-icon > span').contains('Print')
  })

  it('should get listing info', () => {
    cy.get('.listing-info')
    cy.get('.listing-info > .listing-image')
    cy.get('.listing-info > .listing-image > .image-container > .image')
  })

  it('should get property info table', () => {
    cy.get('.table-container')
    cy.get('.th').contains('Bed')
    cy.get('.th').contains('Bath')
    cy.get('.th').contains('SqFt')
    cy.get('.th').contains('Garage')
    cy.get('.th').contains('Lot Size')
    cy.get('.th').contains('Year Built')
    cy.get('.th').contains('Sale Type')
  })

  it('should have address info', () => {
    cy.get('.info-container')
    cy.get('.label').contains('Address')
    cy.get('.label').contains('Listing Date')
    cy.get('.label').contains('MLS Name')
    cy.get('.label').contains('MLS Comments')
  })

  it('should open zoom modal', () => {
    cy.get('.overlay').click()
    cy.get('#zoom-photo > .form > .photo')
  })
  it('should close zoom modal', () => {
    cy.get('#zoom-photo > .form > .close-form').click()
    cy.get('#zoom-photo').should('not.exist')
  })
  it('should open gallery modal', () => {
    cy.get('button').contains('View All Photos').click()
    cy.get('#gallery-modal > .form > .gallery-container')
  })
  it('should close gallery modal', () => {
    cy.get('#gallery-modal > .form > .close-form').click()
    cy.get('#gallery-modal').should('not.exist')
  })

  it('should get listing history', () => {
    cy.get('h2').contains('Listing History')
    cy.get('.listing-history-table')
    cy.get('.property-display-container')
  })

  it('should get table headers', () => {
    cy.get('.th').contains('MLS Sheet')
    cy.get('.th').contains('MLS Name')
    cy.get('.th').contains('Listing Number')
    cy.get('.th').contains('List Date')
    cy.get('.th').contains('Status')
    cy.get('.th').contains('List Price')
    cy.get('.th').contains('Chg Date')
    cy.get('.th').contains('COE Date')
    cy.get('.th').contains('Sold Price')
    cy.get('.th').contains('Sale Type')
    cy.get('.th').contains('Cumulative List Days')
  })

  after(() => {
    cy.clearCookies()
  })
})
