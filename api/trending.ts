import faker from 'faker'

const getDateArray = (range: string): { date: Date }[] => {
  const data = []
  const months =
    range === '3M'
      ? 3
      : range === '6M'
      ? 6
      : range === '1Yr'
      ? 12
      : range === '5Yr'
      ? 60
      : 120
  const firstDate = new Date()
  firstDate.setMonth(firstDate.getMonth() - months)
  for (let i = 0; i < months; i++) {
    const newDate = new Date(firstDate)
    newDate.setMonth(newDate.getMonth() + i)
    data.push({
      date: newDate
    })
  }
  return data
}

export interface ChartParam {
  range: string
  state: string
  county: string | null
  zip: string | null
  type: string | null
  msa: string | null
}

export const getHomePriceChart = async ({
  range,
  state,
  county,
  zip,
  type,
  msa
}: ChartParam): Promise<any[]> => {
  // const data = await handleApi(`/utility/states/${state}/${county}/zipcodes`)
  const data = getDateArray(range)
  return data.map(date => ({
    ...date,
    state: faker.finance.amount(-1, 1, 3),
    county: faker.finance.amount(-1, 1, 3),
    zip: faker.finance.amount(-1, 1, 3),
    msa: faker.finance.amount(-1, 1, 3)
  }))
}

export const getSupplyChart = async ({
  range,
  state,
  county,
  zip,
  type,
  msa
}: ChartParam): Promise<any[]> => {
  // const data = await handleApi(`/utility/states/${state}/${county}/zipcodes`)
  const data = getDateArray(range)
  return data.map(date => ({
    ...date,
    'Sold Distressed Properties': faker.random.number(20),
    'Sold Non Distressed Properties': faker.random.number({ min: 20, max: 35 }),
    'Distressed Active Listings': faker.random.number(10),
    'NonDistressed Active Listings': faker.random.number({ min: 10, max: 70 }),
    'New Listings Distressed': faker.random.number(10),
    'New Listings NonDistressed': faker.random.number({ min: 10, max: 70 }),
    'U/C Distressed Properties': faker.random.number(5),
    'U/C NonDistressed Properties': faker.random.number({ min: 5, max: 25 }),
    'Sold Properties': faker.random.number(10),
    'New Listings': faker.random.number(10),
    'Active Listings': faker.random.number({ min: 10, max: 175 }),
    'U/C Listings': faker.random.number({ min: 10, max: 35 }),
    'Months to Supply': faker.random.number(35),
    'DOM - Distressed Sold Properties': faker.random.number(20),
    'DOM - Non Distressed Sold Properties': faker.random.number({
      min: 20,
      max: 35
    }),
    'DOM - Sold Properties': faker.random.number(150),
    'DOM - Active Listings': faker.random.number(150),
    'DOM - New Listings': faker.random.number(150),
    'DOM - U/C Listings': faker.random.number(150)
  }))
}

export const getListedSoldChart = async ({
  range,
  state,
  county,
  zip,
  type,
  msa
}: ChartParam): Promise<any[]> => {
  // const data = await handleApi(`/utility/states/${state}/${county}/zipcodes`)
  const data = getDateArray(range)
  return data.map(date => ({
    ...date,
    'Active Listed Distressed Properties': faker.random.number(500),
    'Active Listed NonDistressed Properties': faker.random.number({
      min: 1000,
      max: 4000
    }),
    'Active Listed Median Price': faker.finance.amount(0, 1000000, 3),
    'New Listings Distressed': faker.random.number(2000),
    'New Listings NonDistressed': faker.random.number(2000),
    'New Listings Median Price': faker.finance.amount(0, 1000000, 3),
    'U/C Distressed Properties': faker.random.number(200),
    'U/C NonDistressed Properties': faker.random.number(2000),
    'U/C Median Price': faker.finance.amount(0, 1000000, 3),
    'New Listings': faker.random.number(50),
    'Active Listings': faker.random.number({ min: 50, max: 175 }),
    'U/C Listings': faker.random.number({ min: 50, max: 150 }),
    'Sold NonDistressed Properties': faker.random.number(2000),
    'Sold Distressed Properties': faker.random.number(200),
    'Sold Median Price': faker.finance.amount(0, 800000, 3),
    'Current List To Final Sold % Change': faker.finance.amount(0, 1.2, 3),
    'Original List To Final Sold % Change': faker.finance.amount(0, 1.2, 3),
    'DOM - Sold Properties': faker.random.number({ min: 0, max: 100 })
  }))
}
export interface DataParam {
  state: string
  county: string | null
  zip: string | null
  type: string | null
  msa: string | null
}

export const downloadHomePriceData = async (
  params: DataParam
): Promise<any[]> => {
  const data = []
  const firstDate = new Date()
  firstDate.setDate(firstDate.getDate() - 1000)
  for (let i = 0; i < 50; i++) {
    const newDate = new Date(firstDate)
    newDate.setDate(newDate.getDate() + i)

    data.push({
      PERIOD: newDate.toDateString(),
      'PCT CHANGE 1 YEAR MED SOLD PRICE NATIONAL LEVEL': faker.finance.amount(
        -100,
        100,
        2
      ),
      'PCT CHANGE 1 YEAR MED SOLD PRICE STATE LEVEL': faker.finance.amount(
        -100,
        100,
        2
      ),
      'PCT CHANGE 1 YEAR MED SOLD PRICE CBSA LEVEL': faker.finance.amount(
        -100,
        100,
        2
      ),
      'PCT CHANGE 1 YEAR MED SOLD PRICE COUNTY LEVEL': faker.finance.amount(
        -100,
        100,
        2
      ),
      'PCT CHANGE 1 YEAR MED SOLD PRICE ZIP LEVEL': faker.finance.amount(
        -100,
        100,
        2
      ),
      'PCT CHANGE 1 YEAR MED SOLD PRICE OFHEO': faker.finance.amount(
        -100,
        100,
        2
      ),
      'PCT CHANGE 1 YEAR MED SOLD PRICE CASE SCHILLER': faker.finance.amount(
        -100,
        100,
        2
      )
    })
  }
  return data
}
