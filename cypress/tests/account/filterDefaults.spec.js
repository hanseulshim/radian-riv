/// <reference types="cypress" />

export default () => {
  describe('Filter Defaults', () => {
    before(() => {
      cy.intercept('GET', '/utility/states', { fixture: 'states' })
      cy.intercept('GET', '/user/filter-defaults', {
        fixture: 'filter-defaults'
      })
      cy.intercept('GET', '/user/filter-defaults-sqft', {
        fixture: 'filter-defaults-sqft'
      })
      cy.intercept('GET', '/user/subject-property', {
        fixture: 'subject-property'
      })
      cy.intercept('GET', '/user/subject-properties', {
        fixture: 'subject-properties'
      })
      cy.intercept('GET', '/user/filter-defaults-sqft-percent', {
        fixture: 'filter-defaults-sqft-percent'
      })
      cy.intercept('GET', '/user/filter-defaults-restrict-comps', {
        fixture: 'filter-defaults-restrict-comps'
      })
      cy.intercept('GET', '/user/filter-defaults-time', {
        fixture: 'filter-defaults-time'
      })
      cy.get('#sidebar').click()
      cy.get('.route-link').contains('Change Filter Defaults').click()
      cy.url().should('contain', '/profile/filter-defaults')
    })
    beforeEach(() => {
      Cypress.Cookies.preserveOnce('auth')
    })
    it('Should have header tag: AVE Filter Defaults', () => {
      cy.get('.filter-defaults > div > h1').contains('AVE Filter Defaults')
      cy.get('.filter-defaults > div > h1').contains(
        'Subject Property - as comparable'
      )
    })
    it('Should be able to submit forms for AVE Filter Defaults', () => {
      cy.intercept('POST', '/user/filter-defaults-set', {
        fixture: 'successful'
      })
      cy.get('#ave-filter-defaults').submit()
      cy.get('#ave-filter-defaults > .alert-success')
    })
    it('Should be able to submit forms for Subject Property - as comparable', () => {
      cy.intercept('POST', '/user/subject-properties-set', {
        fixture: 'successful'
      })
      cy.get('#subject-property-defaults').submit()
      cy.get('#subject-property-defaults > .alert-success')
    })
  })
}
