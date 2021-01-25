/// <reference types="cypress" />

describe('Home Price', () => {
  before(() => {
    cy.login()
    cy.trending()
    cy.intercept('GET', 'counties', { fixture: 'counties' })
    cy.get('text').contains('Tex.').click()
    cy.url().should('contain', '/trending/TX')
    cy.get('.route-link').contains('Allegany').click()
    cy.url().should('contain', '/trending/TX/allegany')
  })
  beforeEach(() => {
    Cypress.Cookies.preserveOnce('auth')
  })
  it('Should have section tag', () => {
    cy.get('h2').contains('Home Price')
  })

  it('Should have the form default to the state in the route', () => {
    cy.get('.custom-select-container').contains('Texas')
  })

  it('Should have the form default to the county in the route', () => {
    cy.get('.custom-select-container').contains('Allegany')
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
  after(() => {
    cy.clearCookies()
  })
})
