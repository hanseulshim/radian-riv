/// <reference types="cypress" />

describe('State Level', () => {
  before(() => {
    cy.login()
    cy.trending()
    cy.intercept('GET', 'counties', { fixture: 'counties' })
    cy.get('text').contains('Tex.').click()
    cy.url().should('contain', '/trending/TX')
    cy.get('.trending > h1').contains('Texas County Level Annual Price Change')
  })
  beforeEach(() => {
    Cypress.Cookies.preserveOnce('auth')
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
  after(() => {
    cy.clearCookies()
  })
})
