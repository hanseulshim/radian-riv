/// <reference types="cypress" />

export default () => {
  describe('Value Product', () => {
    beforeEach(() => {
      Cypress.Cookies.preserveOnce('auth')
    })

    it('Should have header', () => {
      cy.get('h1').contains('Orders')
    })
  })
}
