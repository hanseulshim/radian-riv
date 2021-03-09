/// <reference types="cypress" />

export default () => {
  describe('New Orders', () => {
    before(() => {
      cy.get('.tab-container > li').contains('New Order').click()
    })
    beforeEach(() => {
      Cypress.Cookies.preserveOnce('auth')
    })

    it('Should have header', () => {
      cy.get('h1').contains('Orders')
    })

    it('Should allow user to select top dropdowns', () => {
      cy.get('#SO-select-product-type').click()
      cy.get('div').contains('Rental Analysis').click()
      cy.get('#SO-select-pool').click()
      cy.get('div').contains('Pool 2').click()
    })

    it('Should update suggestions when fields are changed', () => {
      cy.get('input[name="Loan Number"]').type('12345')
      cy.get('input[name="Zip"]').type('67891')
      cy.get('input[name="City"]').type('Washington')
      cy.get('.styled-table-row').should('have.length.above', 0)
    })

    it('Should allow user to update advanced filters', () => {
      cy.get('span').contains('Show Advanced Filters').click()
      cy.get('input[name="Lot Size"]').type('5')
      cy.get('input[name="Year Built"]').type('1991')
      cy.get('input[name="Garage"]').type('1')
    })

    it('Should update fields when a row is clicked', () => {
      cy.get('.styled-table-row').eq(1).click()
      cy.get('input[name="Bed"]').invoke('val').should('not.be.empty')
      cy.get('input[name="Bath"]').invoke('val').should('not.be.empty')
      cy.get('input[name="Sqft"]').invoke('val').should('not.be.empty')
    })

    it('Should allow user to submit an order', () => {
      cy.get('input[name="Loan Number"]').type('12345')
      cy.get('button').contains('Submit').click()
      cy.get('.alert-success').should('exist')
    })

    it('Should allow user to get to user defaults page', () => {
      cy.get('button').contains('Set User Defaults').click()
      cy.get('div > .modal-container')
      cy.get('button').contains('Yes').should('exist')
      cy.get('.close-form').click()
    })
  }),
    describe('Search Orders', () => {
      before(() => {
        cy.get('.tab-container > li').contains('Search Orders').click()
      })
      beforeEach(() => {
        Cypress.Cookies.preserveOnce('auth')
      })

      it('Should have header', () => {
        cy.get('h1').contains('Orders')
      })

      it('Should allow user to add basic search filters', () => {
        cy.get('input[name="Street Address"]').type('2006 Poquito Street')
        cy.get('input[name="Zip"]').type('78722')
      })

      it('Should allow user to add advanced search filters', () => {
        cy.intercept('GET', '/utility/propertytypes', {
          fixture: 'propertytypes'
        })
        cy.intercept('GET', '/utility/msas/TX', {
          fixture: 'msas'
        })
        cy.get('span').contains('Show Advanced Filters').click()
        cy.get('#AF-select-state').click()
        cy.get('div').contains('TEXAS').click()
        cy.get('#AF-select-property-type').click()
        cy.get('div').contains('Condominium').click()
        cy.get('#AF-select-products').click()
        cy.get('div').contains('Rental Analysis').click()
        cy.get('#AF-select-pools').click()
        cy.get('div').contains('Pool 2').click()
      })

      it('Should allow user to save a search', () => {
        cy.get('button').contains('Save Search').click()
        cy.get('#save-search-modal')
        cy.get('input[name="Search Name"]').type('Example Search')
        cy.get('#save-search').click()
        cy.get('.dropdown-container').contains('Saved Searches').click()
        cy.get('li').contains('Example Search').should('have.length', 1)
        cy.get('li').contains('Example Search').click()
      })

      it('Should allow user to submit a search', () => {
        cy.get('#search-orders-button').click()
        cy.get('.styled-table-row').should('have.length.above', 0)
      })
      it('Should route to property info page', () => {
        cy.get('.link').contains('12345678').click()
        cy.url().should('includes', '/value-products/12345678')
      })
    })
}
