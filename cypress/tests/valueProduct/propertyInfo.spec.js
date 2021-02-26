/// <reference types="cypress" />
export default () => {
  describe('Property Info', () => {
    before(() => {
      cy.get('.tab-container > li').contains('Search Orders').click()
      cy.get('a').contains('123456789-0').click()
      cy.url().should('includes', '/value-products/123456789-0')
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

      it('Shoud close the modal', () => {
        cy.get('.close-form').click()
      })
    })

    describe('Change Property Characteristics', () => {
      it('Should render a modal', () => {
        cy.get('.btn').contains('Change Property Characteristics').click()
        cy.get('.modal-container')
      })

      it('Should allow you to select a new property type and months going back', () => {
        cy.get('.input-row-container > .custom-select-container').eq(0).click()
        cy.get('.property-type__option').eq(0).click()
        cy.get('.input-row-container > .custom-select-container').eq(1).click()
        cy.get('.months-back__option').eq(0).click()
      })

      it('Should validate the date inputs and display errors', () => {
        cy.get('.input-group > input[name="As of date"]').clear().type('1234')
        cy.get('#change-prop-characteristics > button').click()
        cy.get('input[name="As of date"]')
          .siblings('.error-input-message')
          .contains('Date must be valid (MM/DD/YYYY)')
        cy.get('.input-group > input[name="As of date"]')
          .clear()
          .type('01/01/2010')
      })

      it('Should allow you to change the source and a property characteristic', () => {
        cy.get('.edit-prop-chars-container > .custom-select-container')
          .eq(0)
          .click()
        cy.get('.select-source__option').eq(0).click()
        cy.get('input[name="yearBuilt"]').type('20')
        cy.get('#change-prop-characteristics > button').click()
        cy.get('input[name="yearBuilt"]')
          .siblings('.error-input-message')
          .contains('Date must be valid (YYYY)')
        cy.get('input[name="yearBuilt"]').clear().type('2010')
        cy.get('#change-prop-characteristics > button').click()
        cy.get('#change-prop-characteristics > .alert-success')
      })
      it('Shoud close the modal', () => {
        cy.get('.close-form').click()
      })
    })
  })
}
