export * from './propertyCharacteristics'
export * from './order'
export * from './marketAnalysis'
export * from './listingHistory'
export * from './gallery'
export * from './property'
export * from './compPhotos'
export * from './mls'
export * from './document'
export * from './searchOrder'

import { formatDate } from 'utils'
import faker from 'faker'

export const generateProps = (props: string[]): any => {
  const obj: { [key: string]: any } = {}
  props.forEach(prop => {
    switch (prop) {
      case 'actDom':
      case 'totDom':
        obj[prop] = faker.random.number({ min: 5, max: 300 })
        break
      case 'address':
        obj[prop] = faker.address.streetAddress()
        break
      case 'agSqft':
      case 'aveSqft':
      case 'listPriceSqft':
      case 'sqft':
      case 'totalSqft':
      case 'minSqft':
      case 'maxSqft':
        obj[prop] = faker.random.number({ min: 2000, max: 5000 })
        break
      case 'area':
        obj[prop] = 'Default'
        break
      case 'areaParameter':
        obj[prop] = null
        break
      case 'asOfDate':
      case 'changeDate':
      case 'coeDate':
      case 'coe1SoldDate':
      case 'coe2SoldDate':
      case 'listDate':
      case 'rivDate':
        obj[prop] = formatDate(faker.date.between('2020-01-01', '2020-12-31'))
        break
      case 'basement':
        obj[prop] = faker.random.arrayElement(['Yes', 'Full', 'No'])
        break
      case 'bath':
      case 'bed':
      case 'minBed':
      case 'maxBed':
        obj[prop] = faker.random.number({ min: 3, max: 5 })
        break
      case 'calculatedPrice':
        obj[prop] = faker.random.number({
          min: 500000,
          max: 700000
        })
        break
      case 'city':
        obj[prop] = faker.address.city()
        break
      case 'coePrice':
      case 'coe1SoldPrice':
      case 'coe2SoldPrice':
      case 'listPrice':
      case 'soldPrice':
      case 'asIsSalePrice':
      case 'quickSalePrice':
        obj[prop] = faker.random.number({ min: 500000, max: 600000 })
        break
      case 'compsBack':
        obj[prop] = '3 months'
        break
      case 'concessions':
        obj[prop] = faker.random.number({ min: 10000, max: 20000 })
        break
      case 'comparableType':
        obj[prop] = 'All'
        break
      case 'cumulativeListDays':
        obj[prop] = faker.random.number(200)
        break
      case 'daysFromFlip':
        obj[prop] = faker.random.number({ min: 10, max: 50 })
        break
      case 'description':
        obj[prop] = faker.lorem.paragraph(5)
        break
      case 'distressed':
      case 'lock':
      case 'reo':
      case 'showMls':
      case 'bedEstimate':
      case 'bathEstimate':
      case 'exportMls':
      case 'sqftEstimate':
      case 'lotSizeEstimate':
      case 'garageEstimate':
      case 'yearEstimate':
      case 'propertyTypeEstimate':
      case 'checked':
        obj[prop] = faker.random.boolean()
        break
      case 'distressedMarket':
        obj[prop] = +faker.finance.amount(0.4, 0.9, 4)
        break
      case 'dnaSource':
        obj[prop] = 'User'
        break
      case 'garage':
        obj[prop] = faker.random.number(2)
        break
      case 'geoAccuracy':
        obj[prop] = 'PREMISE LEVEl. Excellent'
        break
      case 'id':
      case 'loanNumber':
        obj[prop] = `${faker.random.number({
          min: 20000000,
          max: 50000000
        })}-${faker.random.number({ min: 1, max: 9 })}`
        break
      case 'lat':
        obj[prop] = +faker.address.latitude(39.050498, 39.057319)
        break
      case 'listingNumber':
        obj[prop] = `MDMC${faker.random.number({
          min: 645679,
          max: 698371
        })}`
        break
      case 'listingSheetSelected':
        obj[prop] = false
        break
      case 'lng':
        obj[prop] = +faker.address.longitude(-77.224241, -77.243871)
        break
      case 'lotSize':
        obj[prop] = +faker.finance.amount(0, 1, 2)
        break
      case 'marketArea':
        obj[prop] = 'Radian Interactive Value Default - 1 mile'
        break
      case 'mlsName':
        obj[prop] = faker.company.companyName()
        break
      case 'mlsComments':
        obj[prop] = faker.lorem.paragraph(10)
        break
      case 'pool':
        obj[prop] = faker.random.arrayElement(['Community', 'None'])
        break
      case 'poolName':
        obj[prop] = 'DEFAULT'
        break
      case 'photo':
        const photos = generatePropertyPhotos()
        obj[prop] = photos[0]
        break
      case 'photos':
        obj[prop] = generatePropertyPhotos()
        break
      case 'propertyType':
        obj[prop] = faker.random.arrayElement([
          'Single Family',
          'Multi Family',
          'Duplex'
        ])
        break
      case 'retailMarket':
        obj[prop] = +faker.finance.amount(0.4, 0.9, 4)
        break
      case 'saleType':
        obj[prop] = faker.random.arrayElement(['Retail', 'Commercial'])
        break
      case 'schoolDistrict':
        obj[prop] = `${faker.address.county()} County Public Schools`
        break
      case 'source':
        obj[prop] = faker.random.arrayElement([
          'User',
          'Appraisal',
          'MLS',
          'Estimated',
          'Public Record APM: 17-0155-003-005-3'
        ])
        break
      case 'sqftPrice':
        obj[prop] = +faker.finance.amount(100, 300, 2)
        break
      case 'subdivision':
        obj[
          prop
        ] = `${faker.commerce.productMaterial()} ${faker.commerce.product()} Village`
        break
      case 'state':
        obj[prop] = faker.address.stateAbbr()
        break
      case 'status':
        obj[prop] = faker.random.arrayElement([
          'Sold',
          'Under Contract',
          'Price Change',
          'Listed'
        ])
        break
      case 'targetDistance':
        obj[prop] = +faker.finance.amount(0.4, 0.9, 2)
        break
      case 'units':
        obj[prop] = faker.random.number({ min: 1, max: 5 })
        break
      case 'valuationPercent':
        obj[prop] = +faker.finance.amount(0, 1, 2)
        break
      case 'waterfront':
        obj[prop] = 'Water Oriented: No'
        break
      case 'year':
      case 'minYear':
      case 'maxYear':
        obj[prop] = faker.random.number({ min: 1980, max: 2010 })
        break
      case 'zip':
        obj[prop] = faker.address.zipCode('#####')
        break
      default:
        throw new Error(`Prop not found: ${prop}`)
    }
  })
  return obj
}

const generatePropertyPhotos = (): string[] => {
  const data = []
  const order = faker.random.arrayElement([
    'https://rbimages.blob.core.windows.net/rb-images/US/real-estate/mls-homes/single-family-property/for-sale/MD/Germantown/20874/1665-MDMC668232-20190705-18123-Coachmans-Road',
    'https://rbimages.blob.core.windows.net/rb-images/US/real-estate/mls-homes/single-family-property/for-sale/MD/Boyds/20841/1665-MDMC682440-20191007-14410-Foolish-Pleasure',
    'https://rbimages.blob.core.windows.net/rb-images/US/real-estate/mls-homes/single-family-property/for-sale/MD/Boyds/20841/1665-MDMC676350-20190901-18410-Polynesian-Lane',
    'https://rbimages.blob.core.windows.net/rb-images/US/real-estate/mls-homes/single-family-property/for-sale/MD/Boyds/20841/1665-MDMC686430-20191107-18500-Crossview-Road',
    'https://rbimages.blob.core.windows.net/rb-images/US/real-estate/mls-homes/single-family-property/for-sale/MD/Germantown/20874/1665-MDMC689800-20200105-18318-Bailiwick-Place',
    'https://rbimages.blob.core.windows.net/rb-images/US/real-estate/mls-homes/single-family-property/for-sale/MD/Boyds/20841/1665-MDMC688114-20191122-18214-Endora-Circle',
    'https://rbimages.blob.core.windows.net/rb-images/US/real-estate/mls-homes/single-family-property/for-sale/MD/Germantown/20874/1665-MDMC684706-20191023-13855-Bailiwick-Terrace',
    'https://rbimages.blob.core.windows.net/rb-images/US/real-estate/mls-homes/single-family-property/for-sale/MD/Germantown/20874/1665-MDMC623212-20190311-2-Sanderling-Court',
    'https://rbimages.blob.core.windows.net/rb-images/US/real-estate/mls-homes/single-family-property/for-sale/MD/Germantown/20874/1665-MDMC676344-20190921-13525-Sanderling-Place',
    'https://rbimages.blob.core.windows.net/rb-images/US/real-estate/mls-homes/single-family-property/for-sale/MD/Germantown/20874/1665-1006570122-20180924-19061-Highstream-Drive',
    'https://rbimages.blob.core.windows.net/rb-images/US/real-estate/mls-homes/single-family-property/for-sale/MD/Germantown/20874/1665-MDMC672942-20190806-18878-Mcfarlin-Drive'
  ])
  for (let i = 0; i < 20; i++) {
    data.push(`${order}-${i}.jpg`)
  }
  return data
}
