import { handleApi } from './index'

export const getNationalGeoJson = async (): Promise<any> => {
  const jsonData = await fetch(
    `${process.env.baseUrl}/geoJson/national/us-states.geojson.json`
  )
  const data = await handleApi('/trending/homepricechangestate')
  const json = await jsonData.json()
  const geoJsonWithData = json.features.map(state => {
    const foundState = data.State.find(
      st => st.STate === state.properties.postal
    )
    return {
      ...state,
      properties: {
        medianPctChange: foundState ? foundState.PerChange : 0,
        ...state.properties
      }
    }
  })
  return geoJsonWithData
}

export const getStateGeoJson = async (stateCode: string): Promise<any> => {
  const data = await fetch(
    `${process.env.baseUrl}/geoJson/national/us-states.geojson.json`
  )
  const json = await data.json()
  const stateGeoJson = json.features.find(
    state => state.properties.postal === stateCode
  )
  return stateGeoJson
}

export const getCountiesGeoJson = async (stateCode: string): Promise<any> => {
  const jsonData = await fetch(
    `${process.env.baseUrl}/geoJson/states/${stateCode}.json`
  )
  const json = await jsonData.json()
  const data = await handleApi(`/trending/homepricechangecounty/${stateCode}`)
  const counties = json.features.map(county => {
    const foundCounty = data.State.find(
      c => c.FIPS === county.properties.COUNTY_ID
    )
    return {
      ...county,
      properties: {
        ...county.properties,
        MEDIAN_PERCENT_CHANGE: foundCounty ? foundCounty.perchange : 0
      }
    }
  })
  return counties
}

const getRange = (range: string): number => {
  if (range === '3M') {
    return 3
  } else if (range === '6M') {
    return 6
  } else if (range === '1Yr') {
    return 12
  } else if (range === '5Yr') {
    return 60
  } else return 100
}
export interface ChartParam {
  range: string
  state: string
  county: string | null
  zip: string | null
  type: string | null
  msa: string | null
}
interface ChartReturn {
  chartData: any[]
  tableData: any[]
}

export const getHomePriceChart = async ({
  range,
  state,
  county,
  zip,
  type,
  msa
}: ChartParam): Promise<ChartReturn> => {
  const rangeNum = getRange(range)
  const data = await handleApi(`/trending/homepricechange`, {
    State: state,
    FIPS: county,
    CBSA: msa,
    Zip: zip,
    Range: rangeNum,
    PropertyType: type
  })
  return {
    chartData: data.State.map(obj => ({
      date: new Date(obj.period),
      state: obj['Pct Change 1 Year Med Sold Price State Level'],
      county: obj['Pct Change 1 Year Med Sold Price County Level'],
      zip: obj['Pct Change 1 Year Med Sold Price Zip Level'],
      msa: obj['Pct Change 1 Year Med Sold Price CBSA Level']
    })),
    tableData: data.State
  }
}

export const getListedSoldListedChart = async ({
  range,
  state,
  county,
  zip,
  type,
  msa
}: ChartParam): Promise<ChartReturn> => {
  const rangeNum = getRange(range)
  const data = await handleApi(`/trending/listedsoldlistedresult`, {
    State: state,
    FIPS: county,
    CBSA: msa,
    Zip: zip,
    Range: rangeNum,
    PropertyType: type
  })
  return {
    chartData: data.State.map(obj => ({
      date: new Date(obj.Period),
      'Active Listed Distressed Properties': obj['Num of REO Active Listings'],
      'Active Listed NonDistressed Properties':
        obj['Num of NONREO Active Listings'],
      'Active Listed Median Price': obj['Median Active List Price'],
      'New Listings Distressed': obj['Num of REO New Listings'],
      'New Listings NonDistressed': obj['Num of NONREO New Listings'],
      'New Listings Median Price': obj['Median New List Price'],
      'U/C Distressed Properties': obj['Num of REO U/C'],
      'U/C NonDistressed Properties': obj['Num of NonREO U/C'],
      'U/C Median Price': obj['Median U/C Price'],
      'New Listings': obj['Num of New Listings'],
      'Active Listings': obj['Num of Active Listings'],
      'U/C Listings': obj['Num of U/C']
    })),
    tableData: data.Table1
  }
}

export const getListedSoldChart = async ({
  range,
  state,
  county,
  zip,
  type,
  msa
}: ChartParam): Promise<ChartReturn> => {
  const rangeNum = getRange(range)
  const data = await handleApi(`/trending/listedsoldresults`, {
    State: state,
    FIPS: county,
    CBSA: msa,
    Zip: zip,
    Range: rangeNum,
    PropertyType: type
  })
  return {
    chartData: data.State.map(obj => ({
      date: new Date(obj.Period),
      'Sold NonDistressed Properties': obj['Num of REO Sold Props'],
      'Sold Distressed Properties': obj['Num of NONREO Sold Props'],
      'Sold Median Price': obj['Median Sold Price']
    })),
    tableData: data.Table1
  }
}

export const getListedSoldPercentChart = async ({
  range,
  state,
  county,
  zip,
  type,
  msa
}: ChartParam): Promise<ChartReturn> => {
  const rangeNum = getRange(range)
  const data = await handleApi(`/trending/listedsoldpercentchangeresults`, {
    State: state,
    FIPS: county,
    CBSA: msa,
    Zip: zip,
    Range: rangeNum,
    PropertyType: type
  })
  return {
    chartData: data.State.map(obj => ({
      date: new Date(obj.Period),
      'Current List To Final Sold % Change':
        obj['CurrListtoFinalSold % Change'],
      'Original List To Final Sold % Change':
        obj['OrigListtoFinalSold % Change'],
      'DOM - Sold Properties': obj['DOM Sold Props']
    })),
    tableData: data.Table1
  }
}

export const getDomChart = async ({
  range,
  state,
  county,
  zip,
  type,
  msa
}: ChartParam): Promise<ChartReturn> => {
  const rangeNum = getRange(range)
  const data = await handleApi(`/trending/listedsoldlistedresult`, {
    State: state,
    FIPS: county,
    CBSA: msa,
    Zip: zip,
    Range: rangeNum,
    PropertyType: type
  })
  return {
    chartData: data.State.map(obj => ({
      date: new Date(obj.Period),
      'DOM - Distressed Sold Properties': obj['Num of REO Active Listings'],
      'DOM - Non Distressed Sold Properties':
        obj['Num of NONREO Active Listings'],
      'DOM - Sold Properties': obj['Median Active List Price'],
      'Distressed Active Listings': obj['Num of REO Active Listings'],
      'NonDistressed Active Listings': obj['Num of NONREO Active Listings'],
      'DOM - Active Listings': obj['Median Active List Price'],
      'New Listings Distressed': obj['Num of REO New Listings'],
      'New Listings NonDistressed': obj['Num of NONREO New Listings'],
      'DOM - New Listings': obj['Median New List Price'],
      'U/C Distressed Properties': obj['Num of REO U/C'],
      'U/C NonDistressed Properties': obj['Num of NonREO U/C'],
      'DOM - U/C Listings': obj['Median U/C Price'],
      'Sold Properties': obj['Num of New Listings'],
      'New Listings': obj['Num of New Listings'],
      'Active Listings': obj['Num of Active Listings'],
      'U/C Listings': obj['Num of U/C']
    })),
    tableData: data.Table1
  }
}

export const getSupplyChart = async ({
  range,
  state,
  county,
  zip,
  type,
  msa
}: ChartParam): Promise<ChartReturn> => {
  const rangeNum = getRange(range)
  const data = await handleApi(`/trending/listedsoldlistedresult`, {
    State: state,
    FIPS: county,
    CBSA: msa,
    Zip: zip,
    Range: rangeNum,
    PropertyType: type
  })
  return {
    chartData: data.State.map(obj => ({
      date: new Date(obj.Period),
      'Sold Distressed Properties': obj['Num of REO Active Listings'],
      'Sold Non Distressed Properties': obj['Num of NONREO Active Listings'],
      'Distressed Active Listings': obj['Num of REO Active Listings'],
      'NonDistressed Active Listings': obj['Num of NONREO Active Listings'],
      'U/C Distressed Properties': obj['Num of REO U/C'],
      'U/C NonDistressed Properties': obj['Num of NonREO U/C'],
      'Sold Properties': obj['Num of New Listings'],
      'Active Listings': obj['Num of Active Listings'],
      'U/C Listings': obj['Num of U/C']
    })),
    tableData: data.Table1
  }
}
