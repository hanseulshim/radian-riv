/// <reference types="cypress" />

describe('Radian Interactive Value', () => {
  before(() => {
    cy.login()
    cy.valueProduct()
  })
  beforeEach(() => {
    Cypress.Cookies.preserveOnce('auth')
  })

  describe('Value Products', () => {
    it('Should have header', () => {
      cy.get('h1').contains('Orders')
    })
  })

  after(() => {
    cy.clearCookies()
  })
})
