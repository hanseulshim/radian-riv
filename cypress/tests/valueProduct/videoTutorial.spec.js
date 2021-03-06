/// <reference types="cypress" />

export default () => {
  describe('Video Tutorial', () => {
    before(() => {
      cy.intercept('GET', '/utility/states', {
        fixture: 'states'
      })
      cy.visit('http://localhost:3000/value-products/video')
      cy.url().should('contain', 'video')
    })
    beforeEach(() => {
      Cypress.Cookies.preserveOnce('auth')
    })

    it('should open video tutorial modal', () => {
      cy.get('.btn').contains('Video Tutorials').click()
      cy.get('#video-modal')
      cy.get('h2').contains('Video Tutorials')
    })

    it('should get video elements', () => {
      cy.get('.video').should('have.length', 10)
      cy.get('.title').should('have.length', 10)
      cy.get('.video-file').should('have.length', 10)
      cy.get('.description-container').should('have.length', 10)
      cy.get('.description').should('have.length', 10)
      cy.get('.video-stats').should('have.length', 10)
    })

    it('should close modal', () => {
      cy.get('.close-form').click()
      cy.get('#video-modal').should('not.exist')
      cy.get('#sidebar').click()
      cy.get('.route-link').contains('Orders').click()
    })
  })
}
