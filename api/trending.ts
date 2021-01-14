import faker from 'faker'

export interface ChartParam {
  range: string
  state: string
  county: string | null
  zip: string | null
  type: string | null
  msa: string | null
}

export const getHomePriceChart = async (params: ChartParam): Promise<any[]> => {
  // const data = await handleApi(`/utility/states/${state}/${county}/zipcodes`)
  const data = []
  for (let i = 0; i < 100; i++) {
    data.push({
      date: faker.date.between('2020-01-01', '2020-12-31'),
      state: faker.random.number(100),
      county: faker.random.number(100),
      zip: faker.random.number(100),
      msa: faker.random.number(100)
    })
  }
  return data
}
