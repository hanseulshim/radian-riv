import faker from 'faker'
import { generateProps } from './'

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
  orderId: string
): Promise<SoldDaysTable[]> => {
  return soldData()
}
export const getFilteredMarketAnalysisSoldDays = async (
  orderId: string
): Promise<SoldDaysTable[]> => {
  return soldData()
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
  orderId: string
): Promise<DaysTable[]> => {
  return daysData()
}

export const getFilteredMarketAnalysisDays = async (
  orderId: string
): Promise<DaysTable[]> => {
  return daysData()
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
  orderId: string
): Promise<MarketListings> => {
  return listings()
}

export const getFilteredMarketAnalysisListings = async (
  orderId: string
): Promise<MarketListings> => {
  return listings()
}

export interface MarketAnalysisInterface {
  sqft: number
  year: number
  propertyType: string
  area: string
  areaParameter: string
}

export const getMarketAnalysis = async (
  orderId: string
): Promise<MarketAnalysisInterface> => {
  const obj = generateProps([
    'sqft',
    'year',
    'propertyType',
    'area',
    'areaParameter'
  ])
  return obj
}

export interface FilteredMarketAnalysisFilters {
  minSqft: number
  maxSqft: number
  minYear: number
  maxYear: number
  propertyType: string
  minBed: number
  maxBed: number
  comparableType: string
  sqft: number
  year: number
  area: string
  areaParameter: string
}

export const getFilteredMarketAnalysisFilters = async (
  orderId: string
): Promise<FilteredMarketAnalysisFilters> => {
  const obj: FilteredMarketAnalysisFilters = generateProps([
    'minSqft',
    'maxSqft',
    'minYear',
    'maxYear',
    'minBed',
    'maxBed',
    'comparableType',
    'sqft',
    'propertyType',
    'area',
    'areaParameter',
    'year'
  ])
  return obj
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
  orderId: string
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

export interface FlipPropertyInterface {
  id: string
  address: string
  city: string
  zip: string
  bed: number
  bath: number
  sqft: number
  garage: number
  lotSize: number
  year: number
  targetDistance: number
  coe1SoldDate: string
  coe1SoldPrice: number
  coe2SoldDate: string
  coe2SoldPrice: number
  daysFromFlip: number
  rank: number
}

export interface FlipAnalysisInterface {
  flipSoldAnalysis: {
    report: string
    '0-90': number
    '91-180': number
    '180-270': number
    '271-365': number
  }[]
  flipRentedAnalysis: {
    report: string
    '0-90': number
    '91-180': number
    '180-270': number
    '271-365': number
  }[]
  flipSold: FlipPropertyInterface[]
  flipForSale: FlipPropertyInterface[]
  flipRented: FlipPropertyInterface[]
  flipForRent: FlipPropertyInterface[]
}

export const getFlipAnalysis = async (
  orderId: string
): Promise<FlipAnalysisInterface> => {
  const flipSoldAnalysis = [
    'Number of Sold Flips',
    'Average Sold Price',
    'Avg. % Change of Sold Prices',
    'Pre-Flip Low Sold',
    'Pre-Flip High Sold',
    'Post-Flip Low Sold',
    'Post-Flip High Sold',
    'Smallest Price Difference',
    'Largest Price Difference'
  ]
  const flipRentAnalysis = [
    'Number of Rental Flips',
    'Average Sold Price',
    'Avg Cap Ex',
    'Avg Rent per SqFt',
    'Low Rent',
    'High Rent',
    'Avg Gross Rent Multiplier',
    'Lowest GRM',
    'Highest GRM'
  ]
  const generateFlip = (report: string) => {
    return report.includes('Number')
      ? faker.random.number(5)
      : report.includes('%') || report.includes('Cap')
      ? +faker.finance.amount(0.1, 0.4, 4)
      : report.includes('Difference') || report.includes('GRM')
      ? faker.random.number({ min: 10000, max: 100000 })
      : faker.random.number({ min: 100000, max: 500000 })
  }
  return {
    flipSoldAnalysis: flipSoldAnalysis.map(report => ({
      report,
      '0-90': generateFlip(report),
      '91-180': generateFlip(report),
      '180-270': generateFlip(report),
      '271-365': generateFlip(report)
    })),
    flipRentedAnalysis: flipRentAnalysis.map(report => ({
      report,
      '0-90': generateFlip(report),
      '91-180': generateFlip(report),
      '180-270': generateFlip(report),
      '271-365': generateFlip(report)
    })),
    flipSold: generateProperties(),
    flipForSale: generateProperties(),
    flipRented: generateProperties(),
    flipForRent: generateProperties()
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
  orderId: string
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

export interface FlipPropertyInterface {
  id: string
  address: string
  city: string
  zip: string
  bed: number
  bath: number
  sqft: number
  garage: number
  lotSize: number
  year: number
  targetDistance: number
  coe1SoldDate: string
  coe1SoldPrice: number
  coe2SoldDate: string
  coe2SoldPrice: number
  daysFromFlip: number
  rank: number
  lat: number
  lng: number
}

const generateProperties = (): FlipPropertyInterface[] => {
  const data: FlipPropertyInterface[] = []
  for (let i = 1; i <= 5; i++) {
    const obj = generateProps([
      'address',
      'bath',
      'bed',
      'city',
      'garage',
      'id',
      'lotSize',
      'sqft',
      'year',
      'zip',
      'targetDistance',
      'coe1SoldDate',
      'coe1SoldPrice',
      'coe2SoldDate',
      'coe2SoldPrice',
      'daysFromFlip',
      'lat',
      'lng'
    ])
    data.push({
      ...obj,
      rank: i
    })
  }
  return data
}