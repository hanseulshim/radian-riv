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
    cy.get('.usa > path').should('have.length.above', 50)
  })
  it('Should have state routes', () => {
    cy.get('.route-link').should('have.length.above', 50)
  })
  it('Should click a state in the left side navigation and route to it', () => {
    cy.intercept('GET', 'counties', { fixture: 'counties' })
    cy.get('.route-link').contains('Texas').click()
    cy.url().should('includes', '/trending/TX')
  })
  after(() => {
    cy.clearCookies()
  })
})
