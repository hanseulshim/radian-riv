/// <reference types="cypress" />

describe('RIV Property Info', () => {
  before(() => {
    cy.login()
    cy.valueProduct()
    cy.get('a').contains('18324 Tapwood Road').click()
    cy.url().should('includes', '/value-products/31130765-5')
  })
  beforeEach(() => {
    Cypress.Cookies.preserveOnce('auth')
  })

  it('should have header row', () => {
    cy.get('h1').contains('RIV Property Info')
    cy.get('.btn-icon').contains('Lock')
  })
  it('should have 3 button row', () => {
    cy.get('.btn').contains('Re-Order RIV')
    cy.get('.btn').contains('Order Rental Analysis')
    cy.get('.btn').contains('Change Property Characteristics')
  })
  it('has icon row', () => {
    cy.get('.icon-row > .icon').should('have.length', 6)
  })

  describe('Export PDF', () => {
    it('Should render a modal', () => {
      cy.get('.icon-row > img').first().click()
      cy.get('.modal-container')
    })

    it('Should have options title', () => {
      cy.get('.form-title').contains('Select your options for PDF')
    })

    it('Should allow you to change some options', () => {
      cy.get('.radio').contains('All Comparables').click()
      cy.get('.radio > label').contains('All Available Photographs').click()
      cy.get('.checkbox-container')
        .contains('Unchecked Manual Comparables')
        .click()
    })

    it('Should ask how you want the PDF delivered', () => {
      cy.get('button').contains('Export PDF').click()
      cy.get('.radio > label')
        .contains('Send the link to my email address:')
        .should('have.length', 1)
    })

    it('Should catch invalid email address list', () => {
      cy.get('.radio > label').contains('Or you may choose').click()
      cy.get('.input-group > input').type('28347682, hshim@boostlabs.com')
      cy.get('button').contains('Deliver').click()

      cy.get('.input-group > input')
        .siblings('.error-input-message')
        .should('not.be.empty')
    })

    it('Allow you to send the PDF to multiple email address', () => {
      cy.get('.input-group > input')
        .clear()
        .type('joneil@boostlabs.com, hshim@boostlabs.com')
      cy.get('button')
        .contains('Deliver')
        .click()
        .then(el => cy.get('.alert-success').should('have.length', 1))
    })
  })

  after(() => {
    cy.clearCookies()
  })
})
