/// <reference types="cypress" />

describe('Radian Interactive Value', () => {
  before(() => {
    cy.login()
    cy.valueProduct()
    cy.url().should('includes', '/value-products')
  })
  beforeEach(() => {
    Cypress.Cookies.preserveOnce('auth')
  })

  describe('Value Products', () => {
    it('Should have header', () => {
      cy.get('h1').contains('Value Products')
    })
  })

  after(() => {
    cy.clearCookies()
  })
})
