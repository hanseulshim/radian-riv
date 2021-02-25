// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('login', () => {
  cy.clearCookies()
  cy.visit('http://localhost:3000/login')
  cy.intercept('POST', '/auth/login', { fixture: 'login' })
  cy.intercept('GET', '/user/get', { fixture: 'user' })
  cy.intercept('GET', '/utility/states', { fixture: 'states' })
  cy.get('input[name="Username"]').type('test')
  cy.get('input[name="Password"]').type('test')
  cy.get('#login').submit()
})

Cypress.Commands.add('valueProduct', () => {
  cy.get('.route-link').contains('Radian Interactive Value').click()
  cy.url().should('includes', '/value-products')
})

Cypress.Commands.add('profile', () => {
  cy.get('#profile-logo').click()
  cy.get('a').contains('Account').click()
  cy.url().should('contain', '/profile')
})

Cypress.Commands.add('trending', () => {
  cy.intercept('GET', '/trending/homepricechangestate', {
    fixture: 'homepricechangestate'
  })
  cy.get('.route-link').contains('Trending').click()
  cy.url().should('contain', '/trending')
})
