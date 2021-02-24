/// <reference types="cypress" />
export default () => {
  describe('Home Price', () => {
    before(() => {
      cy.intercept('GET', '/utility/counties/MD', { fixture: 'counties' })
      cy.intercept('GET', '/trending/homepricechangecounty/MD', {
        fixture: 'homepricechangecountymd'
      })
      cy.get('.route-link').contains('MARYLAND').click()
      cy.url().should('includes', '/trending/MD')
      cy.intercept('GET', '/utility/zips/MD', { fixture: 'zips' })
      cy.intercept('GET', '/utility/msas/MD', { fixture: 'msas' })
      cy.intercept('GET', '/utility/propertytypes', {
        fixture: 'propertytypes'
      })
      cy.intercept('POST', '/trending/homepricechange', {
        fixture: 'homepricechange'
      })
      cy.get('path[id="MD0500000US24031"]').click()
      cy.url().should('includes', '24031')
    })
    beforeEach(() => {
      Cypress.Cookies.preserveOnce('auth')
    })
    it('Should have section tag', () => {
      cy.get('h2').contains('Home Price')
    })

    it('Should have the form default to the state in the route', () => {
      cy.get('.custom-select-container').contains('MARYLAND')
    })

    it('Should have the form default to the county in the route', () => {
      cy.get('.custom-select-container').contains('Montgomery')
    })

    it('Should select a zipcode from the dropdown', () => {
      cy.intercept('POST', '/trending/homepricechange', {
        fixture: 'homepricechange'
      })
      cy.get('.custom-select-container')
        .contains('Zip...')
        .click()
        .then(el => cy.get('#react-select-4-option-0').click())
    })

    it('Should unclick the checkbox to remove the zip series from the chart', () => {
      cy.get('.checkbox-container')
        .contains('ZIP')
        .click()
        .then(el => {
          cy.get('.recharts-surface > .recharts-line').should('have.length', 2)
        })
    })

    it('Should click a date range to update the charts', () => {
      cy.intercept('POST', '/trending/homepricechange', {
        fixture: 'homepricechange'
      })
      cy.get('.range-selector > li').contains('6M').click()
    })

    it('Should open the download data modal, render a table, and close modal', () => {
      cy.get('.download-data').click()
      cy.get('.table')
      cy.get('.close-form').click()
    })
  })
}
