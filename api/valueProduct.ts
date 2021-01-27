import { PropertyInfoType } from 'context/ValueProductProvider'
import faker from 'faker'

export const getPropertyInfo = async (
  orderId: string
): Promise<PropertyInfoType> => {
  return {
    id: orderId,
    poolName: 'DEFAULT',
    loanNumber: 'test',
    address: '18324 Tapwood Road',
    city: 'Boyds',
    state: 'MD',
    zip: '20841',
    subdivision: null,
    bed: 5,
    bath: 4.5,
    sqft: 3835,
    garage: 2,
    lotSize: 0.231,
    yearBuilt: 2004,
    dnaSource: 'User',
    reo: false,
    propertyType: 'Single Family',
    marketArea: 'Radian Interactive Value Default - 1 mile',
    compsGoingBack: '3 months',
    asOfDate: '01/25/2021',
    rivDate: '03/18/2020',
    calculatedPrice: 671860,
    priceSqFt: 175.19,
    lock: true,
    geoAccuracy: 'PREMISE LEVEL. Excellent',
    retailMarket: 0.9542,
    distressedMarket: 0.0458,
    summaryComments: 'This is a property',
    area: 'Default',
    areaParameter: null
  }
}

interface DaysTable {
  days: string
  '0-90': number
  '91-180': number
  '180-270': number
  '271-365': number
}

export const getMarketAnalysisDays = async (
  orderId: string
): Promise<DaysTable[]> => {
  return [
    {
      days: 'Total # of Sales (Solds)',
      '0-90': faker.random.number({ min: 10, max: 25 }),
      '91-180': faker.random.number({ min: 10, max: 25 }),
      '180-270': faker.random.number({ min: 10, max: 25 }),
      '271-365': faker.random.number({ min: 10, max: 25 })
    },
    {
      days: 'Absorption Rate (Sales per Month)',
      '0-90': +faker.finance.amount(3, 8, 2),
      '91-180': +faker.finance.amount(3, 8, 2),
      '180-270': +faker.finance.amount(3, 8, 2),
      '271-365': +faker.finance.amount(3, 8, 2)
    },
    {
      days: 'Inventory (Listings & Pendings)',
      '0-90': faker.random.number({ min: 10, max: 25 }),
      '91-180': faker.random.number({ min: 10, max: 25 }),
      '180-270': faker.random.number({ min: 10, max: 25 }),
      '271-365': faker.random.number({ min: 10, max: 25 })
    },
    {
      days: 'Months Supply',
      '0-90': +faker.finance.amount(0.2, 0.8, 2),
      '91-180': +faker.finance.amount(0.2, 0.8, 2),
      '180-270': +faker.finance.amount(0.2, 0.8, 2),
      '271-365': +faker.finance.amount(0.2, 0.8, 2)
    }
  ]
}

interface SoldDaysTable {
  category: string
  active: number
  pending: number
  '0-90': number
  '91-180': number
  '180-270': number
  '271-365': number
}

export const getMarketAnalysisSoldDays = async (
  orderId: string
): Promise<SoldDaysTable[]> => {
  return [
    {
      category: 'Low',
      active: faker.random.number({ max: 4000, min: 2000 }),
      pending: null,
      '0-90': faker.random.number({ max: 4000, min: 1500 }),
      '91-180': faker.random.number({ max: 4000, min: 1500 }),
      '180-270': faker.random.number({ max: 4000, min: 1500 }),
      '271-365': faker.random.number({ max: 4000, min: 1500 })
    },
    {
      category: 'High',
      active: faker.random.number({ max: 4000, min: 2000 }),
      pending: null,
      '0-90': faker.random.number({ max: 4000, min: 1500 }),
      '91-180': faker.random.number({ max: 4000, min: 1500 }),
      '180-270': faker.random.number({ max: 4000, min: 1500 }),
      '271-365': faker.random.number({ max: 4000, min: 1500 })
    },
    {
      category: 'Median',
      active: faker.random.number({ max: 4000, min: 2000 }),
      pending: null,
      '0-90': faker.random.number({ max: 4000, min: 1500 }),
      '91-180': faker.random.number({ max: 4000, min: 1500 }),
      '180-270': faker.random.number({ max: 4000, min: 1500 }),
      '271-365': faker.random.number({ max: 4000, min: 1500 })
    },
    {
      category: 'Average',
      active: faker.random.number({ max: 4000, min: 2000 }),
      pending: null,
      '0-90': faker.random.number({ max: 4000, min: 1500 }),
      '91-180': faker.random.number({ max: 4000, min: 1500 }),
      '180-270': faker.random.number({ max: 4000, min: 1500 }),
      '271-365': faker.random.number({ max: 4000, min: 1500 })
    },
    {
      category: 'Median DOM',
      active: faker.random.number({ max: 40, min: 10 }),
      pending: null,
      '0-90': faker.random.number({ max: 40, min: 10 }),
      '91-180': faker.random.number({ max: 40, min: 10 }),
      '180-270': faker.random.number({ max: 40, min: 10 }),
      '271-365': faker.random.number({ max: 40, min: 10 })
    }
  ]
}

export interface MarketListings {
  activeListings: number
  pendings: number
  finalListPrice: {
    '0-90': number
    '91-180': number
    '180-270': number
    '271-365': number
  }
  originalListPrice: {
    '0-90': number
    '91-180': number
    '180-270': number
    '271-365': number
  }
}

export const getMarketAnalysisListings = async (
  orderId: string
): Promise<MarketListings> => {
  return {
    activeListings: faker.random.number(6),
    pendings: faker.random.number(3),
    finalListPrice: {
      '0-90': +faker.finance.amount(0.9, 1, 4),
      '91-180': +faker.finance.amount(0.9, 1, 4),
      '180-270': +faker.finance.amount(0.9, 1, 4),
      '271-365': +faker.finance.amount(0.9, 1, 4)
    },
    originalListPrice: {
      '0-90': +faker.finance.amount(0.9, 1, 4),
      '91-180': +faker.finance.amount(0.9, 1, 4),
      '180-270': +faker.finance.amount(0.9, 1, 4),
      '271-365': +faker.finance.amount(0.9, 1, 4)
    }
  }
}
