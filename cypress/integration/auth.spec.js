/// <reference types="cypress" />

import login from '../tests/auth/login.spec'
import register from '../tests/auth/register.spec'
import resetPassword from '../tests/auth/resetPassword.spec'

describe('Authentication', () => {
  before(() => {
    cy.clearCookies()
    cy.visit('http://localhost:3000/login')
  })
  register()
  resetPassword()
  login()
})
