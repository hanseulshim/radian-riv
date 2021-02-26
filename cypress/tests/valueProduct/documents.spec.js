/// <reference types="cypress" />

export default () => {
  describe('Documents', () => {
    before(() => {
      cy.get('.route-link').contains('Documents').click()
      cy.url().should('includes', '/value-products/123456789-0/documents')
    })
    beforeEach(() => {
      Cypress.Cookies.preserveOnce('auth')
    })

    it('should open Additional Documents Upload modal', () => {
      cy.get('button').contains('Upload Documents').click()
      cy.get('.modal-container')
    })

    it('should disable upload until file is selected', () => {
      cy.get('.additional-documents > :button')
        .contains('Upload')
        .should('be.disabled')
      cy.get('.close-form').click()
    })
  })
}
