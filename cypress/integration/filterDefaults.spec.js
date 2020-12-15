/// <reference types="cypress" />

describe('Change Filter Defaults page', () => {
  before(() => {
    cy.myAccount()
    cy.get('.subroute-link').contains('Change Filter Defaults').click()
  })
  beforeEach(() => {
    Cypress.Cookies.preserveOnce('auth')
  })

  it('Should have header tag: AVE Filter Defaults', () => {
    cy.get('.filter-defaults > div > h1').contains('AVE Filter Defaults')
    cy.get('.filter-defaults > div > h1').contains('Search Defaults')
    cy.get('.filter-defaults > div > h1').contains(
      'Subject Property - as comparable'
    )
  })
  it('Should be able to submit forms for AVE Filter Defaults', () => {
    cy.get('#ave-filter-defaults').submit()
    cy.get('#ave-filter-defaults > .alert-success')
  })
  it('Should be able to submit forms for Search Defaults', () => {
    cy.get('#search-defaults').submit()
    cy.get('#search-defaults > .alert-success')
  })
  it('Should be able to submit forms for Subject Property - as comparable', () => {
    cy.get('#subject-property-defaults').submit()
    cy.get('#subject-property-defaults > .alert-success')
  })
})
