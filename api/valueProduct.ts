import { PropertyInfoType } from 'context/ValueProductProvider'
import faker from 'faker'

export const getPropertyInfo = async (
  propertyInfoId: string
): Promise<PropertyInfoType> => {
  return {
    id: propertyInfoId,
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

const daysData = () => [
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

export const getMarketAnalysisDays = async (
  propertyInfoId: string
): Promise<DaysTable[]> => {
  return daysData()
}

export const getFilteredMarketAnalysisDays = async (
  propertyInfoId: string
): Promise<DaysTable[]> => {
  return daysData()
}

const soldData = () => [
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
  propertyInfoId: string
): Promise<SoldDaysTable[]> => {
  return soldData()
}
export const getFilteredMarketAnalysisSoldDays = async (
  propertyInfoId: string
): Promise<SoldDaysTable[]> => {
  return soldData()
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

const listings = () => ({
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
})

export const getMarketAnalysisListings = async (
  propertyInfoId: string
): Promise<MarketListings> => {
  return listings()
}

export const getFilteredMarketAnalysisListings = async (
  propertyInfoId: string
): Promise<MarketListings> => {
  return listings()
}

export interface FilteredMarketAnalysisFilters {
  minSqft: number
  maxSqft: number
  minYrBlt: number
  maxYrBlt: number
  propertyType: string
  minBed: number
  maxBed: number
  comparableType: string
}

export const getFilteredMarketAnalysisFilters = async (
  propertyInfoId: string
): Promise<FilteredMarketAnalysisFilters> => {
  return {
    minSqft: faker.random.number({ min: 2000, max: 3000 }),
    maxSqft: faker.random.number({ min: 4000, max: 5000 }),
    minYrBlt: faker.random.number({ min: 1950, max: 1999 }),
    maxYrBlt: faker.random.number({ min: 2000, max: 2020 }),
    propertyType: 'Default',
    minBed: faker.random.number({ min: 1, max: 3 }),
    maxBed: faker.random.number({ min: 4, max: 6 }),
    comparableType: 'All'
  }
}

interface FilteredMarketAnalysisDepressedMarketGrid {
  category: string
  listingsCount: number
  listingsPercent: number
  pendingsCount: number
  pendingsPercent: number
  soldsCount: number
  soldsPercent: number
}

export const getFilteredMarketAnalysisDepressedMarketGrid = async (
  propertyInfoId: string
): Promise<FilteredMarketAnalysisDepressedMarketGrid[]> => {
  return [
    {
      category: 'Retail',
      listingsCount: faker.random.number(10),
      listingsPercent: +faker.finance.amount(0, 1, 4),
      pendingsCount: faker.random.number(5),
      pendingsPercent: +faker.finance.amount(0, 1, 4),
      soldsCount: faker.random.number(100),
      soldsPercent: +faker.finance.amount(0, 1, 4)
    },
    {
      category: 'Short Sale',
      listingsCount: faker.random.number(10),
      listingsPercent: +faker.finance.amount(0, 1, 4),
      pendingsCount: faker.random.number(5),
      pendingsPercent: +faker.finance.amount(0, 1, 4),
      soldsCount: faker.random.number(100),
      soldsPercent: +faker.finance.amount(0, 1, 4)
    },
    {
      category: 'REO',
      listingsCount: faker.random.number(10),
      listingsPercent: +faker.finance.amount(0, 1, 4),
      pendingsCount: faker.random.number(5),
      pendingsPercent: +faker.finance.amount(0, 1, 4),
      soldsCount: faker.random.number(100),
      soldsPercent: +faker.finance.amount(0, 1, 4)
    }
  ]
}

export interface MedianSalePriceInterface {
  oneMonth: {
    contractDate: string
    numberPendings: number
    numberSales: number
    medianValue: number
  }[]
  twoMonths: {
    contractDate: string
    numberSales: number
    medianValue: number
  }[]
  threeMonths: {
    contractDate: string
    numberSales: number
    medianValue: number
  }[]
}

export const getMedianSalePrice = async (
  propertyInfoId: string
): Promise<MedianSalePriceInterface> => {
  return {
    oneMonth: [
      {
        contractDate: 'Jan-19',
        numberPendings: faker.random.number(5),
        numberSales: faker.random.number(20),
        medianValue: faker.random.number({ min: 300000, max: 700000 })
      },
      {
        contractDate: 'Feb-19',
        numberPendings: faker.random.number(5),
        numberSales: faker.random.number(20),
        medianValue: faker.random.number({ min: 300000, max: 700000 })
      },
      {
        contractDate: 'Mar-19',
        numberPendings: faker.random.number(5),
        numberSales: faker.random.number(20),
        medianValue: faker.random.number({ min: 300000, max: 700000 })
      },
      {
        contractDate: 'Apr-19',
        numberPendings: faker.random.number(5),
        numberSales: faker.random.number(20),
        medianValue: faker.random.number({ min: 300000, max: 700000 })
      },
      {
        contractDate: 'May-19',
        numberPendings: faker.random.number(5),
        numberSales: faker.random.number(20),
        medianValue: faker.random.number({ min: 300000, max: 700000 })
      },
      {
        contractDate: 'Jun-19',
        numberPendings: faker.random.number(5),
        numberSales: faker.random.number(20),
        medianValue: faker.random.number({ min: 300000, max: 700000 })
      },
      {
        contractDate: 'Jul-19',
        numberPendings: faker.random.number(5),
        numberSales: faker.random.number(20),
        medianValue: faker.random.number({ min: 300000, max: 700000 })
      },
      {
        contractDate: 'Aug-19',
        numberPendings: faker.random.number(5),
        numberSales: faker.random.number(20),
        medianValue: faker.random.number({ min: 300000, max: 700000 })
      },
      {
        contractDate: 'Sep-19',
        numberPendings: faker.random.number(5),
        numberSales: faker.random.number(20),
        medianValue: faker.random.number({ min: 300000, max: 700000 })
      },
      {
        contractDate: 'Oct-19',
        numberPendings: faker.random.number(5),
        numberSales: faker.random.number(20),
        medianValue: faker.random.number({ min: 300000, max: 700000 })
      },
      {
        contractDate: 'Nov-19',
        numberPendings: faker.random.number(5),
        numberSales: faker.random.number(20),
        medianValue: faker.random.number({ min: 300000, max: 700000 })
      },
      {
        contractDate: 'Dec-19',
        numberPendings: faker.random.number(5),
        numberSales: faker.random.number(20),
        medianValue: faker.random.number({ min: 300000, max: 700000 })
      },
      {
        contractDate: 'Jan-20',
        numberPendings: faker.random.number(5),
        numberSales: faker.random.number(20),
        medianValue: faker.random.number({ min: 300000, max: 700000 })
      },
      {
        contractDate: 'Feb-20',
        numberPendings: faker.random.number(5),
        numberSales: faker.random.number(20),
        medianValue: faker.random.number({ min: 300000, max: 700000 })
      },
      {
        contractDate: 'Mar-20',
        numberPendings: faker.random.number(5),
        numberSales: faker.random.number(20),
        medianValue: faker.random.number({ min: 300000, max: 700000 })
      },
      {
        contractDate: 'Apr-20',
        numberPendings: faker.random.number(5),
        numberSales: faker.random.number(20),
        medianValue: faker.random.number({ min: 300000, max: 700000 })
      },
      {
        contractDate: 'May-20',
        numberPendings: faker.random.number(5),
        numberSales: faker.random.number(20),
        medianValue: faker.random.number({ min: 300000, max: 700000 })
      },
      {
        contractDate: 'Jun-20',
        numberPendings: faker.random.number(5),
        numberSales: faker.random.number(20),
        medianValue: faker.random.number({ min: 300000, max: 700000 })
      },
      {
        contractDate: 'Jul-20',
        numberPendings: faker.random.number(5),
        numberSales: faker.random.number(20),
        medianValue: faker.random.number({ min: 300000, max: 700000 })
      },
      {
        contractDate: 'Aug-20',
        numberPendings: faker.random.number(5),
        numberSales: faker.random.number(20),
        medianValue: faker.random.number({ min: 300000, max: 700000 })
      },
      {
        contractDate: 'Sep-20',
        numberPendings: faker.random.number(5),
        numberSales: faker.random.number(20),
        medianValue: faker.random.number({ min: 300000, max: 700000 })
      },
      {
        contractDate: 'Oct-20',
        numberPendings: faker.random.number(5),
        numberSales: faker.random.number(20),
        medianValue: faker.random.number({ min: 300000, max: 700000 })
      },
      {
        contractDate: 'Nov-20',
        numberPendings: faker.random.number(5),
        numberSales: faker.random.number(20),
        medianValue: faker.random.number({ min: 300000, max: 700000 })
      },
      {
        contractDate: 'Dec-20',
        numberPendings: faker.random.number(5),
        numberSales: faker.random.number(20),
        medianValue: faker.random.number({ min: 300000, max: 700000 })
      }
    ],
    twoMonths: [
      {
        contractDate: 'Dec - Jan-19',
        numberSales: faker.random.number(20),
        medianValue: faker.random.number({ min: 300000, max: 700000 })
      },
      {
        contractDate: 'Jan - Feb-19',
        numberSales: faker.random.number(20),
        medianValue: faker.random.number({ min: 300000, max: 700000 })
      },
      {
        contractDate: 'Feb - Mar-19',
        numberSales: faker.random.number(20),
        medianValue: faker.random.number({ min: 300000, max: 700000 })
      },
      {
        contractDate: 'Mar - Apr-19',
        numberSales: faker.random.number(20),
        medianValue: faker.random.number({ min: 300000, max: 700000 })
      },
      {
        contractDate: 'Apr - May-19',
        numberSales: faker.random.number(20),
        medianValue: faker.random.number({ min: 300000, max: 700000 })
      },
      {
        contractDate: 'May - Jun-19',
        numberSales: faker.random.number(20),
        medianValue: faker.random.number({ min: 300000, max: 700000 })
      },
      {
        contractDate: 'Jun - Jul-19',
        numberSales: faker.random.number(20),
        medianValue: faker.random.number({ min: 300000, max: 700000 })
      },
      {
        contractDate: 'Jul - Aug-19',
        numberSales: faker.random.number(20),
        medianValue: faker.random.number({ min: 300000, max: 700000 })
      },
      {
        contractDate: 'Aug - Sep-19',
        numberSales: faker.random.number(20),
        medianValue: faker.random.number({ min: 300000, max: 700000 })
      },
      {
        contractDate: 'Sep - Oct-19',
        numberSales: faker.random.number(20),
        medianValue: faker.random.number({ min: 300000, max: 700000 })
      },
      {
        contractDate: 'Oct - Nov-19',
        numberSales: faker.random.number(20),
        medianValue: faker.random.number({ min: 300000, max: 700000 })
      },
      {
        contractDate: 'Nov - Dec-19',
        numberSales: faker.random.number(20),
        medianValue: faker.random.number({ min: 300000, max: 700000 })
      },
      {
        contractDate: 'Dec - Jan-20',
        numberSales: faker.random.number(20),
        medianValue: faker.random.number({ min: 300000, max: 700000 })
      },
      {
        contractDate: 'Jan - Feb-20',
        numberSales: faker.random.number(20),
        medianValue: faker.random.number({ min: 300000, max: 700000 })
      },
      {
        contractDate: 'Feb - Mar-20',
        numberSales: faker.random.number(20),
        medianValue: faker.random.number({ min: 300000, max: 700000 })
      },
      {
        contractDate: 'Mar - Apr-20',
        numberSales: faker.random.number(20),
        medianValue: faker.random.number({ min: 300000, max: 700000 })
      },
      {
        contractDate: 'Apr - May-20',
        numberSales: faker.random.number(20),
        medianValue: faker.random.number({ min: 300000, max: 700000 })
      },
      {
        contractDate: 'May - Jun-20',
        numberSales: faker.random.number(20),
        medianValue: faker.random.number({ min: 300000, max: 700000 })
      },
      {
        contractDate: 'Jun - Jul-20',
        numberSales: faker.random.number(20),
        medianValue: faker.random.number({ min: 300000, max: 700000 })
      },
      {
        contractDate: 'Jul - Aug-20',
        numberSales: faker.random.number(20),
        medianValue: faker.random.number({ min: 300000, max: 700000 })
      },
      {
        contractDate: 'Aug - Sep-20',
        numberSales: faker.random.number(20),
        medianValue: faker.random.number({ min: 300000, max: 700000 })
      },
      {
        contractDate: 'Sep - Oct-20',
        numberSales: faker.random.number(20),
        medianValue: faker.random.number({ min: 300000, max: 700000 })
      },
      {
        contractDate: 'Oct - Nov-20',
        numberSales: faker.random.number(20),
        medianValue: faker.random.number({ min: 300000, max: 700000 })
      },
      {
        contractDate: 'Nov - Dec-20',
        numberSales: faker.random.number(20),
        medianValue: faker.random.number({ min: 300000, max: 700000 })
      }
    ],
    threeMonths: [
      {
        contractDate: 'Nov - Jan-19',
        numberSales: faker.random.number(20),
        medianValue: faker.random.number({ min: 300000, max: 700000 })
      },
      {
        contractDate: 'Dec - Feb-19',
        numberSales: faker.random.number(20),
        medianValue: faker.random.number({ min: 300000, max: 700000 })
      },
      {
        contractDate: 'Jan - Mar-19',
        numberSales: faker.random.number(20),
        medianValue: faker.random.number({ min: 300000, max: 700000 })
      },
      {
        contractDate: 'Feb - Apr-19',
        numberSales: faker.random.number(20),
        medianValue: faker.random.number({ min: 300000, max: 700000 })
      },
      {
        contractDate: 'Mar - May-19',
        numberSales: faker.random.number(20),
        medianValue: faker.random.number({ min: 300000, max: 700000 })
      },
      {
        contractDate: 'Apr - Jun-19',
        numberSales: faker.random.number(20),
        medianValue: faker.random.number({ min: 300000, max: 700000 })
      },
      {
        contractDate: 'May - Jul-19',
        numberSales: faker.random.number(20),
        medianValue: faker.random.number({ min: 300000, max: 700000 })
      },
      {
        contractDate: 'Jun - Aug-19',
        numberSales: faker.random.number(20),
        medianValue: faker.random.number({ min: 300000, max: 700000 })
      },
      {
        contractDate: 'Jul - Sep-19',
        numberSales: faker.random.number(20),
        medianValue: faker.random.number({ min: 300000, max: 700000 })
      },
      {
        contractDate: 'Aug - Oct-19',
        numberSales: faker.random.number(20),
        medianValue: faker.random.number({ min: 300000, max: 700000 })
      },
      {
        contractDate: 'Sep - Nov-19',
        numberSales: faker.random.number(20),
        medianValue: faker.random.number({ min: 300000, max: 700000 })
      },
      {
        contractDate: 'Oct - Dec-19',
        numberSales: faker.random.number(20),
        medianValue: faker.random.number({ min: 300000, max: 700000 })
      },
      {
        contractDate: 'Nov - Jan-20',
        numberSales: faker.random.number(20),
        medianValue: faker.random.number({ min: 300000, max: 700000 })
      },
      {
        contractDate: 'Dec - Feb-20',
        numberSales: faker.random.number(20),
        medianValue: faker.random.number({ min: 300000, max: 700000 })
      },
      {
        contractDate: 'Jan - Mar-20',
        numberSales: faker.random.number(20),
        medianValue: faker.random.number({ min: 300000, max: 700000 })
      },
      {
        contractDate: 'Feb - Apr-20',
        numberSales: faker.random.number(20),
        medianValue: faker.random.number({ min: 300000, max: 700000 })
      },
      {
        contractDate: 'Mar - May-20',
        numberSales: faker.random.number(20),
        medianValue: faker.random.number({ min: 300000, max: 700000 })
      },
      {
        contractDate: 'Apr - Jun-20',
        numberSales: faker.random.number(20),
        medianValue: faker.random.number({ min: 300000, max: 700000 })
      },
      {
        contractDate: 'May - Jul-20',
        numberSales: faker.random.number(20),
        medianValue: faker.random.number({ min: 300000, max: 700000 })
      },
      {
        contractDate: 'Jun - Aug-20',
        numberSales: faker.random.number(20),
        medianValue: faker.random.number({ min: 300000, max: 700000 })
      },
      {
        contractDate: 'Jul - Sep-20',
        numberSales: faker.random.number(20),
        medianValue: faker.random.number({ min: 300000, max: 700000 })
      },
      {
        contractDate: 'Aug - Oct-20',
        numberSales: faker.random.number(20),
        medianValue: faker.random.number({ min: 300000, max: 700000 })
      },
      {
        contractDate: 'Sep - Nov-20',
        numberSales: faker.random.number(20),
        medianValue: faker.random.number({ min: 300000, max: 700000 })
      },
      {
        contractDate: 'Oct - Dec-20',
        numberSales: faker.random.number(20),
        medianValue: faker.random.number({ min: 300000, max: 700000 })
      }
    ]
  }
}

export interface PropertyInterface {
  actDom: number
  address: string
  agSqft: number
  basement: string
  bath: number
  bed: number
  city: string
  coeDate: string
  concessions: number
  description: string
  distressed: boolean
  garage: number
  listDate: string
  listingNumber: string
  listingSheetSelected: boolean
  listPrice: number
  listPricePerSqft: number
  lotSize: number
  order: number
  pool: string
  photos: string[]
  schoolDistrict: string
  soldPrice: number
  sqft: number
  sqftPrice: number
  subdivision: string
  targetDistance: number
  totalSqft: number
  totDom: number
  valuationPercent: number
  waterfront: string
  yearBuilt: number
  zip: string
}

const generatePropertyPhotos = (): string[] => {
  const data = []
  const property = faker.random.arrayElement([
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
    data.push(`${property}-${i}.jpg`)
  }
  return data
}

const generateProperties = (): PropertyInterface[] => {
  const data: PropertyInterface[] = []
  for (let i = 1; i <= 15; i++) {
    data.push({
      actDom: faker.random.number({ min: 5, max: 300 }),
      address: faker.address.streetAddress(),
      agSqft: faker.random.number({ min: 2000, max: 5000 }),
      basement: faker.random.arrayElement(['Yes', 'Full', 'No']),
      bath: faker.random.number({ min: 2, max: 3 }),
      bed: faker.random.number({ min: 4, max: 5 }),
      city: faker.address.city(),
      coeDate: faker.date
        .between('2020-01-01', '2020-12-31')
        .toLocaleDateString(),
      concessions: faker.random.number({ min: 10000, max: 20000 }),
      description: faker.lorem.paragraph(5),
      distressed: faker.random.boolean(),
      garage: faker.random.number(2),
      listDate: faker.date
        .between('2020-01-01', '2020-12-31')
        .toLocaleDateString(),
      listingNumber: `MDMC${faker.random.number({ min: 645679, max: 698371 })}`,
      listingSheetSelected: false,
      listPrice: faker.random.number({ min: 500000, max: 600000 }),
      listPricePerSqft: faker.random.number({ min: 2000, max: 5000 }),
      lotSize: +faker.finance.amount(0, 1, 2),
      order: i,
      pool: faker.random.arrayElement(['Community', 'None']),
      photos: generatePropertyPhotos(),
      schoolDistrict: `${faker.address.county()} County Public Schools`,
      soldPrice: faker.random.number({ min: 500000, max: 600000 }),
      sqft: faker.random.number({ min: 2000, max: 5000 }),
      sqftPrice: +faker.finance.amount(100, 300, 2),
      subdivision: `${faker.commerce.productMaterial()} ${faker.commerce.product()} Village`,
      targetDistance: +faker.finance.amount(0.4, 0.9, 2),
      totalSqft: faker.random.number({ min: 2000, max: 5000 }),
      totDom: faker.random.number({ min: 5, max: 300 }),
      valuationPercent: +faker.finance.amount(0, 1, 2),
      waterfront: 'Water Oriented: No',
      yearBuilt: faker.random.number({ min: 1980, max: 2010 }),
      zip: faker.address.zipCode()
    })
  }
  return data
}

export const getSoldProperties = async (
  propertyInfoId: string
): Promise<PropertyInterface[]> => {
  return generateProperties()
}
export const getListedProperties = async (
  propertyInfoId: string
): Promise<PropertyInterface[]> => {
  return generateProperties()
}
export const getContractProperties = async (
  propertyInfoId: string
): Promise<PropertyInterface[]> => {
  return generateProperties()
}
interface ExportForm {
  subjectPhotos: string
  subjectListingSheets: boolean
  comparableType: string
  selectedCompPhotosType: string | null
  selectedCompListingSheets: boolean
  allCompPhotosType: string | null
  allCompListingSheets: boolean
  uncheckedManualComparables: boolean
}

export const exportPdf = async (
  emailList: string[],
  exportForm: ExportForm
): Promise<string> => {
  return 'Request Submitted!'
}
