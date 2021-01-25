/// <reference types="cypress" />

describe('Listed/Sold', () => {
  before(() => {
    cy.login()
    cy.trending()
    cy.intercept('GET', 'counties', { fixture: 'counties' })
    cy.get('text').contains('Tex.').click()
    cy.url().should('contain', '/trending/TX')
    cy.get('.route-link').contains('Allegany').click()
    cy.url().should('contain', '/trending/TX/allegany')
    cy.get('.route-link').contains('Listed/Sold').click()
    cy.url().should('contain', '/trending/TX/allegany/listed-sold')
  })
  beforeEach(() => {
    Cypress.Cookies.preserveOnce('auth')
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
  it('Should open the download data modal, render a table, and close modal', () => {
    cy.get('.download-data').click()
    cy.get('.table')
    cy.get('.close-form').click()
  })
  after(() => {
    cy.clearCookies()
  })
})
