/// <reference types="cypress" />

describe('Trending Page', () => {
  before(() => {
    cy.login()
  })
  beforeEach(() => {
    Cypress.Cookies.preserveOnce('auth')
  })

  describe('State Level', () => {
    before(() => {
      cy.intercept('GET', '/utility/states', { fixture: 'states' })
      cy.get('.route-link').contains('Trending').click()
    })
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
    it('Should have state routes', () => {
      cy.get('.route-link').should('have.length.above', 50)
    })
    it('Should click a state and route to it', () => {
      cy.intercept('GET', 'counties', { fixture: 'counties' })
      cy.get('.route-link').contains('Texas').click()
      cy.url().should('includes', '/trending/TX')
    })
  })

  describe('County Level', () => {
    before(() => {
      cy.intercept('GET', 'counties', { fixture: 'counties' })
    })
    it('Should have section header', () => {
      cy.get('.trending > h1').contains(
        'Texas County Level Annual Price Change'
      )
    })
    it('Should have section label = "Texas"', () => {
      cy.get('.active').contains('Texas')
    })
    it('Should have default route = "Texas Counties"', () => {
      cy.get('.route-link > .label-icon')
      cy.get('.route-link > span').contains('Texas Counties')
    })
    it('Should have county routes', () => {
      cy.get('.route-link').should('have.length.above', 5)
    })
    it('Should click a county and route to it', () => {
      cy.get('.route-link').last().click()
    })
  })
  describe('Home Price', () => {
    before(() => {
      cy.wait(2000)
    })
    it('Should have section tag', () => {
      cy.get('h2').contains('Home Price')
    })

    it('Should have the form default to the state in the route', () => {
      cy.get('.custom-select-container').contains('Texas')
    })

    it('Should have the form default to the county in the route', () => {
      cy.get('.custom-select-container').contains('Worcester')
    })

    it('Should select a zipcode from the dropdown', () => {
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
      cy.get('.range-selector > li').contains('6M').click()
    })

    it('Should open the download data modal, render a table, and close modal', () => {
      cy.get('.download-data').click()
      cy.get('.styled-table')
      cy.get('.close-form').click()
    })
  })
  describe('Listed/Sold', () => {
    before(() => {
      cy.wait(2000)
      cy.get('.route-link > span').contains('Listed/Sold').click()
      cy.wait(3000)
    })
    it('Should have section tag', () => {
      cy.get('h2').contains('Listed/Sold')
    })

    it('Should click a date range to update the charts', () => {
      cy.get('.range-selector > li').contains('Max').click()
    })

    it('Should render all possible series on chart', () => {
      cy.get('.checkbox-container > label > span')
        .contains('New Listings')
        .click()
      cy.get('.checkbox-container > label > span').contains('U/C').click()
      cy.get('.recharts-surface > .recharts-line').should('have.length', 3)
      cy.get('.recharts-surface > .recharts-bar').should('have.length', 3)
    })

    it('Should switch to Sold view and render chart', () => {
      cy.get('.trending-view-tab').contains('Sold').click()
      cy.get('.chart-title').contains('Sold County:')
      cy.get('.recharts-surface')
    })

    it('Should switch to Original List vs Final Sold view and render chart', () => {
      cy.get('.trending-view-tab').contains('Original').click()
      cy.get('.chart-title').contains('Original List')
      cy.get('.recharts-surface')
    })
  })
  describe('DOM/Supply', () => {
    before(() => {
      cy.get('.route-link > span').contains('DOM/Supply').click()
      cy.wait(3000)
    })
    it('Should have section tag', () => {
      cy.get('.trending').contains('DOM/Supply')
    })
    it('Should click a date range to update the chart', () => {
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
      cy.get('.trending-view-tab').contains('Supply').click()
      cy.get('.chart-title').contains('Supply')
      cy.get('.recharts-surface')
    })
  })

  after(() => {
    cy.clearCookies()
  })
})
