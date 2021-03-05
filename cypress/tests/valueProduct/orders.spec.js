/// <reference types="cypress" />

export default () => {
  describe('Search Orders', () => {
    before(() => {
      cy.get('.tab-container > li').contains('Search Orders').click()
    })
    beforeEach(() => {
      Cypress.Cookies.preserveOnce('auth')
    })

    it('Should have header', () => {
      cy.get('h1').contains('Orders')
    })

    it('Should allow user to add basic search filters', () => {
      cy.get('input[name="Street Address"]').type('2006 Poquito Street')
      cy.get('input[name="Zip"]').type('78722')
    })

    it('Should allow user to add advanced search filters', () => {
      cy.intercept('GET', '/utility/propertytypes', {
        fixture: 'propertytypes'
      })
      cy.intercept('GET', '/utility/msas/TX', {
        fixture: 'msas'
      })
      cy.get('span').contains('Show Advanced Filters').click()
      cy.get('#AF-select-state').click()
      cy.get('div').contains('TEXAS').click()
      cy.get('#AF-select-property-type').click()
      cy.get('div').contains('Condominium').click()
      cy.get('#AF-select-products').click()
      cy.get('div').contains('Rental Analysis').click()
      cy.get('#AF-select-pools').click()
      cy.get('div').contains('Pool 2').click()
    })

    it('Should allow user to save a search', () => {
      cy.get('button').contains('Save Search').click()
      cy.get('#save-search-modal')
      cy.get('input[name="Search Name"]').type('Example Search')
      cy.get('#save-search').click()
      cy.get('.dropdown-container').contains('Saved Searches').click()
      cy.get('li').contains('Example Search').should('have.length', 1)
      cy.get('li').contains('Example Search').click()
    })

    it('Should allow user to submit a search', () => {
      cy.get('#search-orders-button').click()
      cy.get('.styled-table-row').should('have.length.above', 0)
    })
    it('Should route to property info page', () => {
      cy.get('.link').contains('123456789-0').click()
      cy.url().should('includes', '/value-products/123456789-0')
    })
  })
}
