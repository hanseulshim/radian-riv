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
      cy.url().should('includes', '/trending/tx')
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
      cy.wait(1000)
    })
    it('Should have section tag', () => {
      cy.get('h2').contains('Home Price')
    })
  })
  describe('Listed/Sold', () => {
    before(() => {
      cy.get('.route-link > span').contains('Listed/Sold').click()
      cy.wait(1000)
    })
    it('Should have section tag', () => {
      cy.get('.trending').contains('Listed/Sold')
    })
  })
  describe('DOM/Supply', () => {
    before(() => {
      cy.get('.route-link > span').contains('DOM/Supply').click()
      cy.wait(1000)
    })
    it('Should have section tag', () => {
      cy.get('.trending').contains('DOM/Supply')
    })
  })

  after(() => {
    cy.clearCookies()
  })
})
