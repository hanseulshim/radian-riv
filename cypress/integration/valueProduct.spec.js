/// <reference types="cypress" />
import valueProduct from '../tests/valueProduct/valueProduct.spec'
import videoTutorial from '../tests/valueProduct/videoTutorial.spec'
import propertyInfo from '../tests/valueProduct/propertyInfo.spec'
import photoComp from '../tests/valueProduct/photoComp.spec'
import historicalListing from '../tests/valueProduct/historicalListing.spec'
import marketAnalysis from '../tests/valueProduct/marketAnalysis.spec'
import documents from '../tests/valueProduct/documents.spec'
describe('Radian Interactive Value', () => {
  before(() => {
    cy.login()
    cy.valueProduct()
  })
  beforeEach(() => {
    Cypress.Cookies.preserveOnce('auth')
  })

  valueProduct()
  videoTutorial()
  propertyInfo()
  photoComp()
  historicalListing()
  marketAnalysis()
  documents()

  after(() => {
    cy.clearCookies()
  })
})
