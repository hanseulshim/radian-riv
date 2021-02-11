/// <reference types="cypress" />

describe('National Level', () => {
  before(() => {
    cy.login()
    cy.trending()
  })
  beforeEach(() => {
    Cypress.Cookies.preserveOnce('auth')
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
  it('Should render a map of the United States', () => {
    cy.get('.usa > .state').should('have.length.above', 50)
  })
  it('Should have state routes', () => {
    cy.get('.route-link').should('have.length.above', 50)
  })
  it('Should click a state in the left side navigation and route to it', () => {
    cy.intercept('GET', 'counties', { fixture: 'counties' })
    cy.get('.route-link').contains('Texas').click()
    cy.url().should('includes', '/trending/TX')
  })

  it('Should render a map of the state and its counties', () => {
    cy.get('.state > path').should('have.length.above', 5)
  })

  it('Should route to a county on click', () => {
    cy.get('path[id="TX0500000US48453"]').click()
    cy.url().should('includes', '48453')
  })
  after(() => {
    cy.clearCookies()
  })
})
