/// <reference types="cypress" />

describe('Dom/Supply', () => {
  before(() => {
    cy.login()
    cy.trending()
    cy.intercept('GET', 'counties', { fixture: 'counties' })
    cy.get('text').contains('Tex.').click()
    cy.url().should('contain', '/trending/TX')
    cy.get('.route-link').contains('Allegany').click()
    cy.url().should('contain', '/trending/TX/allegany')
    cy.get('.route-link').contains('DOM/Supply').click()
    cy.url().should('contain', '/trending/TX/allegany/dom-supply')
  })
  beforeEach(() => {
    Cypress.Cookies.preserveOnce('auth')
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
  after(() => {
    cy.clearCookies()
  })
})
