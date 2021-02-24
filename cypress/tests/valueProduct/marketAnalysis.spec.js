/// <reference types="cypress" />
export default () => {
  describe('Market Analysis', () => {
    before(() => {
      cy.get('.route-link').contains('Market Analysis').click()
      cy.url().should('includes', '/value-products/31130765-5/market-analysis')
    })
    beforeEach(() => {
      Cypress.Cookies.preserveOnce('auth')
    })

    describe('Market Analysis Tab', () => {
      it('should have header row', () => {
        cy.get('h1').contains('Market Analysis')
      })
      it('should render property info table', () => {
        cy.get('.property-tabs > .table-container').should('exist')
      })
      it('should render four tabs', () => {
        cy.get('.tab-container > li').should('have.length', 4)
        cy.get('.tab-container > li').contains('Market Analysis')
        cy.get('.tab-container > li').contains('Filtered Market Analysis')
        cy.get('.tab-container > li').contains('Median Sale Price')
        cy.get('.tab-container > li').contains('Flip Analysis')
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
    })
    describe('Filtered Market Analysis Tab', () => {
      it('should click Filtered Market Analysis Tab', () => {
        cy.get('.tab-container > li')
          .contains('Filtered Market Analysis')
          .click()
      })
      it('should render analytics', () => {
        cy.get('.analytics > .label').contains('Subject SQFT')
        cy.get('.analytics > .label').contains('Subject Year Built')
        cy.get('.analytics > .label').contains('Prop Type')
        cy.get('.analytics > .label').contains('Area')
        cy.get('.analytics > .label').contains('Area Parameter')
        cy.get('.analytics > .label').contains('Min Sqft')
        cy.get('.analytics > .label').contains('Max Sqft')
        cy.get('.analytics > .label').contains('Min YrBlt')
        cy.get('.analytics > .label').contains('Property Type')
        cy.get('.analytics > .label').contains('Min Bed')
        cy.get('.analytics > .label').contains('Max Bed')
        cy.get('.analytics > .label').contains('Max Sqft')
        cy.get('.analytics > .label').contains('Max YrBlt')
        cy.get('.analytics > .label').contains('Comparable Type')
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
      it('should render Depressed Market Grid', () => {
        cy.get('h2').contains('Depressed Market Grid')
      })
      it('should render Depressed Market Grid Table', () => {
        cy.get('.th').contains('# of Listings')
      })
    })
    describe('Median Sale Price Tab', () => {
      it('should click Median Sale Price Tab', () => {
        cy.get('.tab-container > li').contains('Median Sale Price').click()
      })
      it('should render one, two, three month tables', () => {
        cy.get('.header-group').contains('ONE MONTH')
        cy.get('.header-group').contains('TWO MONTHS')
        cy.get('.header-group').contains('THREE MONTHS')
      })
    })
    describe('Flip Analysis Tab', () => {
      it('should click Median Sale Price Tab', () => {
        cy.get('.tab-container > li').contains('Flip Analysis').click()
      })
      it('should render flip sold, flip rented tables', () => {
        cy.get('.header-group').contains('FLIP SOLD')
        cy.get('.header-group').contains('FLIP RENTED')
      })
      it('should render map with marker', () => {
        cy.get('.marker')
      })
      it('should render map toggles', () => {
        cy.get('.toggle-label-container > span').contains('Subject')
        cy.get('.toggle-label-container > span').contains('Flip Sold')
        cy.get('.toggle-label-container > span').contains('Flip Rented')
        cy.get('.toggle-label-container > span').contains('Flip for Sale')
        cy.get('.toggle-label-container > span').contains('Flip for Rent')
      })
      it('should render Flip sections', () => {
        cy.get('h2').contains('Flip Sold')
        cy.get('h2').contains('Flip for Sale')
        cy.get('h2').contains('Flip Rented')
        cy.get('h2').contains('Flip for Rent')
      })
    })
  })
}
