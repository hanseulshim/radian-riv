/// <reference types="cypress" />

export default () => {
  describe('Landing page', () => {
    before(() => {
      cy.login()
    })
    it('should be on landing page', () => {
      cy.url().should('eq', 'http://localhost:3000/')
      cy.get('#profile-logo')
      cy.get('h1').contains('Welcome to Radian Interactive Value')
      cy.get('.route-link').contains('Home')
      cy.get('.route-link').contains('Trending')
      cy.get('.route-link').contains('Radian Interactive Value')
    })

    describe('Sidebar', () => {
      it('should open Help Doc', () => {
        cy.get('a').contains('Help Doc').should('have.attr', 'href')
      })
      it('should open Website Support modal', () => {
        cy.get('a').contains('Website Support').click()
        cy.get('.modal-container > .form > h2').contains('Website Support')
      })
      it('should close Website Support modal', () => {
        cy.get('.close-form').click()
        cy.get('.modal-container').should('not.exist')
      })
    })

    describe('Footer', () => {
      it('should open About Us', () => {
        cy.get('.footer-links > a').contains('About Us')
      })

      it('should render a table with a list of Brokers', () => {
        cy.get('.footer-links > a').contains('About Us').click()
        cy.get('.tr').should('have.length.above', 1)
      })

      it('should close About Us modal', () => {
        cy.get('.close-form').click()
        cy.get('.modal-container').should('not.exist')
      })
      it('should open Privacy Policy doc', () => {
        cy.get('.footer-links > a')
          .contains('Privacy Policy')
          .should('have.attr', 'href')
      })
      it('should open Terms of Use doc', () => {
        cy.get('.footer-links > a')
          .contains('Terms of Use')
          .should('have.attr', 'href')
      })
      it('should open Copyright Infringement modal', () => {
        cy.get('a').contains('Copyright Infringement').click()
        cy.get('.modal-container > .form > h2').contains(
          'Copyright Infringement'
        )
      })
      it('should close Copyright Infringement modal', () => {
        cy.get('.close-form').click()
        cy.get('.modal-container').should('not.exist')
      })
      it('should open Contact Us modal', () => {
        cy.get('a').contains('Contact Us').click()
        cy.get('.modal-container > .form > h2').contains('Contact Us')
      })
      it('should close Contact Us modal', () => {
        cy.get('.close-form').click()
        cy.get('.modal-container').should('not.exist')
      })
    })
  })
}
