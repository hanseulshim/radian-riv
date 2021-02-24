/// <reference types="cypress" />

export default () => {
  describe('National and State maps', () => {
    beforeEach(() => {
      Cypress.Cookies.preserveOnce('auth')
    })
    describe('National', () => {
      it('Should have section header', () => {
        cy.get('.trending > h1').contains('National Level Annual Price Change')
      })
      it('Should have section label = "Trending"', () => {
        cy.get('.active').contains('Trending')
      })
      it('Should have default route = "United States"', () => {
        cy.get('.route-link > .label-icon')
        cy.get('.route-link > span').contains('United States')
      })
      it('Should render a map of the United States', () => {
        cy.get('.usa > .state').should('have.length.above', 50)
      })
      it('Should have state routes', () => {
        cy.get('.route-link').should('have.length.above', 50)
      })
    })
    describe('State', () => {
      it('Should click a state in the left side navigation and route to it', () => {
        cy.intercept('GET', '/utility/counties/MD', { fixture: 'counties' }).as(
          'counties'
        )
        cy.intercept('GET', '/trending/homepricechangecounty/MD', {
          fixture: 'homepricechangecountymd'
        }).as('homepricechangecountymd')
        cy.get('.route-link').contains('MARYLAND').click()
        cy.url().should('includes', '/trending/MD')
        cy.wait('@counties')
        cy.wait('@homepricechangecountymd')
      })

      it('Should render a map of the state and its counties', () => {
        cy.get('.state > path').should('have.length.above', 5)
      })
    })
  })
}
