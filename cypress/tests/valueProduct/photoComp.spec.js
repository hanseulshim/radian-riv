/// <reference types="cypress" />
export default () => {
  describe('Photo comparison', () => {
    beforeEach(() => {
      Cypress.Cookies.preserveOnce('auth')
    })

    it('should open comp photo modal', () => {
      cy.get('.icon').last().click()
      cy.get('#comp-modal')
      cy.get('.comp-photo-container')
    })

    it('should get picture comp elements', () => {
      cy.get('.label').contains('Subdivision')
      cy.get('.label').contains('School District')
      cy.get('.label').contains('School District')
      cy.get('.label').contains('Bed')
      cy.get('.label').contains('Bath')
      cy.get('.label').contains('A.G. SQFT')
      cy.get('.label').contains('Total SQFT')
      cy.get('.label').contains('AVE SQFT')
      cy.get('.label').contains('Year Built')
      cy.get('.label').contains('Basement')
      cy.get('.label').contains('Pool')
      cy.get('.label').contains('Waterfront')
      cy.get('.label').contains('Concessions')
      cy.get('.label').contains('COE Date')
      cy.get('.label').contains('List Date')
      cy.get('.label').contains('ACT DOM')
      cy.get('.label').contains('TOT DOM')
      cy.get('.label').contains('List Price')
      cy.get('.label').contains('Listing #')
    })

    it('should toggle to description view', () => {
      cy.get('.description-container').should('not.exist')
      cy.get('.toggle').contains('Description').click()
      cy.get('.description-container')
    })

    it('should open photo gallery modal', () => {
      cy.get('span').contains('All Photos').click()
      cy.get('#gallery-modal')
    })
    it('closing photo gallery modal should not close photo comp modal', () => {
      cy.get('#gallery-modal > .form > .close-form').click()
      cy.get('#comp-modal').should('exist')
    })

    it('should close photo comp modal', () => {
      cy.get('.close-form').click()
      cy.get('#comp-modal').should('not.exist')
    })
  })
}
