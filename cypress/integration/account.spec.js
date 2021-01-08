/// <reference types="cypress" />

describe('Account Page', () => {
  before(() => {
    cy.login()
  })
  beforeEach(() => {
    Cypress.Cookies.preserveOnce('auth')
  })
  describe('User Profile', () => {
    before(() => {
      cy.intercept('GET', '/utility/states', { fixture: 'states' })
      cy.get('#profile-logo').click()
      cy.get('.menu-container').contains('Account').click()
      cy.url().should('contain', '/profile')
    })
    it('Should have header tag: Profile', () => {
      cy.get('h1').contains('Profile')
    })
    it('should have username and email', () => {
      cy.get('.info-container').contains('Username:')
      cy.get('.info-container').contains('Email:')
    })
    it('should have profile input fields', () => {
      cy.get('input[name="First Name"]').clear()
      cy.get('input[name="Last Name"]').clear()
      cy.get('input[name="Title"]').clear()
      cy.get('input[name="Address"]').clear()
      cy.get('input[name="City"]').clear()
      cy.get('input[name="Zip"]').clear()
      cy.get('input[name="Department"]').clear()
      cy.get('input[name="Cell Phone"]').clear()
      cy.get('input[name="Home Phone"]').clear()
    })
    it('should have phone number validation', () => {
      cy.get('input[name="Cell Phone"]').type('invalid')
      cy.get('input[name="Home Phone"]').type('invalid')
      cy.get('#profile').submit()
      cy.get('input[name="Cell Phone"]')
        .siblings('.error-input-message')
        .should('contain', 'Must be a valid phone number format')
      cy.get('input[name="Home Phone"]')
        .siblings('.error-input-message')
        .should('contain', 'Must be a valid phone number format')
      cy.get('input[name="Cell Phone"]').clear()
      cy.get('input[name="Home Phone"]').clear()
    })
    it('submitting form should set cookie', () => {
      cy.get('input[name="First Name"]').type('Hingle')
      cy.get('input[name="Last Name"]').type('McCringleberry')
      cy.get('input[name="Title"]').type('Title')
      cy.get('input[name="Address"]').type('Address')
      cy.get('input[name="City"]').type('City')
      cy.get('input[name="Zip"]').type('Zip')
      cy.get('input[name="Department"]').type('Department')
      cy.get('input[name="Cell Phone"]').type('123-456-7890')
      cy.get('input[name="Home Phone"]').type('123-456-7890')
      cy.intercept('POST', '/user/update', { fixture: 'successful' })
      cy.get('#profile').submit()
      cy.get('.alert-success')
      cy.get('.profile-row > span').contains('Hello Hingle McCringleberry')
    })
  })
  describe('Change Password', () => {
    before(() => {
      cy.get('.route-link').contains('Change Password').click()
    })
    it('Should have header tag: Change Password', () => {
      cy.get('.change-password > h1').contains('Change Password')
    })
    it('Empty password should have input error', () => {
      cy.get('#change-password').submit()
      cy.get('input[name="New Password"]')
        .siblings('.error-input-message')
        .contains("Password can't be empty")
      cy.get('input[name="Confirm Password"]')
        .siblings('.error-input-message')
        .contains("Password can't be empty")
    })
    it('Unmatched password should have input error', () => {
      cy.get('input[name="New Password"]').type('test')
      cy.get('input[name="Confirm Password"]').type('test1')
      cy.get('#change-password').submit()
      cy.get('input[name="Confirm Password"]')
        .siblings('.error-input-message')
        .contains('Confirm password must match password')
      cy.get('input[name="New Password"]').clear()
      cy.get('input[name="Confirm Password"]').clear()
    })
    it('Should test password strength', () => {
      cy.get('.pwd-strength').contains('Password not entered')
      cy.get('input[name="New Password"]').type('a')
      cy.get('.pwd-strength').contains('Very Weak')
      cy.get('input[name="New Password"]').type('A')
      cy.get('.pwd-strength').contains('Weak')
      cy.get('input[name="New Password"]').type('1')
      cy.get('.pwd-strength').contains('Better')
      cy.get('input[name="New Password"]').type('!')
      cy.get('.pwd-strength').contains('Medium')
      cy.get('input[name="New Password"]').type('1234')
      cy.get('.pwd-strength').contains('Strong')
      cy.get('input[name="Confirm Password"]').type('aA1!1234')
      cy.intercept('POST', '/user/pwd-change', { fixture: 'successful' })
      cy.get('#change-password').submit()
      cy.get('#change-password > .alert-success')
    })
  })
  describe('Change Security Questions', () => {
    before(() => {
      cy.intercept('GET', '/user/questions', { fixture: 'questions' })
      cy.get('.route-link').contains('Change Security Questions').click()
    })
    it('Should have header tag: Change Security Questions', () => {
      cy.get('.security-questions > h1').contains('Change Security Questions')
    })

    it('Should have three security questions', () => {
      cy.get('.custom-select-container').should('have.length', 3)
    })
    it('Empty answers should throw error', () => {
      cy.get('#security-questions').submit()
      cy.get('input[type="text"]')
        .siblings('.error-input-message')
        .contains("Answer can't be blank")
    })
    it('Submitting answers should result in success', () => {
      cy.get('.input-group > input[type="text"]').each($el => {
        cy.wrap($el).type('test')
      })
      cy.intercept('POST', '/user/questions-set', { fixture: 'successful' })
      cy.get('#security-questions').submit()
      cy.get('.alert-success')
    })
  })
  describe('Change Filter Defaults page', () => {
    before(() => {
      cy.intercept('GET', '/user/filter-defaults', {
        fixture: 'filter-defaults'
      })
      cy.intercept('GET', '/user/filter-defaults-sqft', {
        fixture: 'filter-defaults-sqft'
      })
      cy.intercept('GET', '/user/department', {
        fixture: 'department'
      })
      cy.intercept('GET', '/user/departments', {
        fixture: 'departments'
      })
      cy.intercept('GET', '/user/subject-property', {
        fixture: 'subject-property'
      })
      cy.intercept('GET', '/user/subject-properties', {
        fixture: 'subject-properties'
      })
      cy.intercept('GET', '/user/filter-defaults-sqft-percent', {
        fixture: 'filter-defaults-sqft-percent'
      })
      cy.intercept('GET', '/user/filter-defaults-restrict-comps', {
        fixture: 'filter-defaults-restrict-comps'
      })
      cy.intercept('GET', '/user/filter-defaults-time', {
        fixture: 'filter-defaults-time'
      })
      cy.get('.route-link').contains('Change Filter Defaults').click()
    })
    it('Should have header tag: AVE Filter Defaults', () => {
      cy.get('.filter-defaults > div > h1').contains('AVE Filter Defaults')
      cy.get('.filter-defaults > div > h1').contains('Search Defaults')
      cy.get('.filter-defaults > div > h1').contains(
        'Subject Property - as comparable'
      )
    })
    it('Should be able to submit forms for AVE Filter Defaults', () => {
      cy.intercept('POST', '/user/filter-defaults-set', {
        fixture: 'successful'
      })
      cy.get('#ave-filter-defaults').submit()
      cy.get('#ave-filter-defaults > .alert-success')
    })
    it('Should be able to submit forms for Search Defaults', () => {
      cy.intercept('POST', '/user/department-set', { fixture: 'successful' })
      cy.get('#search-defaults').submit()
      cy.get('#search-defaults > .alert-success')
    })
    it('Should be able to submit forms for Subject Property - as comparable', () => {
      cy.intercept('POST', '/user/subject-properties-set', {
        fixture: 'successful'
      })
      cy.get('#subject-property-defaults').submit()
      cy.get('#subject-property-defaults > .alert-success')
    })
  })
  after(() => {
    cy.clearCookies()
  })
})
