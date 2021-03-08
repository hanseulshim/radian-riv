/// <reference types="cypress" />
export default () => {
  describe('Dom/Supply', () => {
    before(() => {
      cy.intercept('GET', '/utility/zips/MD', { fixture: 'zips' })
      cy.intercept('GET', '/utility/msas/MD', { fixture: 'msas' })
      cy.intercept('GET', '/utility/propertytypes', {
        fixture: 'propertytypes'
      })
      cy.intercept('POST', '/trending/listedsoldlistedresult', {
        fixture: 'listedsoldlistedresult'
      })
      cy.get('#sidebar').click()
      cy.get('.route-link').contains('DOM/Supply').click()
      cy.url().should('contain', '/trending/MD/24031/dom-supply')
    })
    beforeEach(() => {
      Cypress.Cookies.preserveOnce('auth')
    })
    it('Should have section tag', () => {
      cy.get('.trending').contains('DOM/Supply')
    })
    it('Should click a date range to update the chart', () => {
      cy.intercept('POST', '/trending/listedsoldlistedresult', {
        fixture: 'listedsoldlistedresult'
      })
      cy.get('.range-selector > li').contains('Max').click()
    })
    it('Should render all possible series on chart', () => {
      cy.get('.checkbox-container > label > span')
        .contains('Active Listings')
        .click()
      cy.get('.checkbox-container > label > span')
        .contains('New Listings')
        .click()
      cy.get('.checkbox-container > label > span').contains('U/C').click()
      cy.get('.recharts-surface > .recharts-line').should('have.length', 4)
      cy.get('.recharts-surface > .recharts-bar').should('have.length', 4)
    })

    it('Should switch to Supply view and render chart', () => {
      cy.intercept('POST', '/trending/listedsoldlistedresult', {
        fixture: 'listedsoldlistedresult'
      })
      cy.get('.tab-container > li').contains('Supply').click()
      cy.get('.chart-title').contains('Supply')
      cy.get('.recharts-surface')
    })
    it('Should open the download data modal, render a table, and close modal', () => {
      cy.get('.download-data').click()
      cy.get('.table')
      cy.get('.close-form').click()
    })
  })
}
