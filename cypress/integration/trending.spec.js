/// <reference types="cypress" />
import map from '../tests/trending/map.spec'
import homePrice from '../tests/trending/homePrice.spec'
import listedSold from '../tests/trending/listedSold.spec'
import domSupply from '../tests/trending/domSupply.spec'
describe('Trending Page', () => {
  before(() => {
    cy.login()
    cy.trending()
  })
  map()
  homePrice()
  listedSold()
  domSupply()
  after(() => {
    cy.clearCookies()
  })
})
