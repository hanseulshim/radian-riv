import { Option } from 'api'
import { generateProps } from './'

export interface OrderPropertyInterface {
  id: string
  bed: number
  bath: number
  sqft: number
  units: number
  garage: number
  lotSize: number
  year: number
  source: string
  propertyType: string
  compsBack: string
  asOfDate: string
}

export const getOrderProperties = async (
  orderId: string
): Promise<OrderPropertyInterface> => {
  const obj: OrderPropertyInterface = generateProps([
    'id',
    'bed',
    'bath',
    'sqft',
    'units',
    'garage',
    'lotSize',
    'year',
    'source',
    'propertyType',
    'compsBack',
    'asOfDate'
  ])
  return obj
}

export interface PropertyCharacteristicsInterface {
  source: string
  bed: number
  bath: number
  sqft: number
  units: number
  garage: number
  lotSize: number
  year: number
}

export const getPropertyCharacteristicsSources = async (): Promise<
  PropertyCharacteristicsInterface[]
> => {
  const sources = [
    {
      source: 'MLS',
      bed: null,
      bath: 3,
      sqft: null,
      units: 4,
      garage: 2,
      lotSize: 2.5,
      year: 1995
    },
    {
      source: 'Public Record APM: 17-0155-003-005-3',
      bed: 4,
      bath: 3,
      sqft: 2100,
      units: 4,
      garage: 2,
      lotSize: 2.5,
      year: 1995
    },
    {
      source: 'Estimated',
      bed: 4,
      bath: 3,
      sqft: null,
      units: 1,
      garage: null,
      lotSize: 2.5,
      year: 1995
    }
  ]

  return sources
}

export const getPropertyTypeOptions = async (): Promise<Option[]> => {
  const options = [
    {
      label: 'Single Family',
      value: 'Single Family'
    },
    {
      label: 'Multi Family',
      value: 'Multi Family'
    },
    {
      label: 'Duplex',
      value: 'Duplex'
    }
  ]
  return options
}

export const getMonthsBackOptions = async (): Promise<Option[]> => {
  const options = [
    {
      label: '3 months',
      value: '3 months'
    },
    {
      label: '6 months',
      value: '6 months'
    },
    {
      label: '12 months',
      value: '12 months'
    }
  ]
  return options
}

export const changePropertyCharacteristics = async (
  order: OrderPropertyInterface
): Promise<void> => {}
