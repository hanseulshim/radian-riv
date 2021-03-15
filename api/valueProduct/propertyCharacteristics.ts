import { generateProps, IOrders } from './'

export type OrderPropertyInterface = Pick<
  IOrders,
  | 'ordersId'
  | 'bed'
  | 'bath'
  | 'sqft'
  | 'units'
  | 'garage'
  | 'lotSize'
  | 'yrBuilt'
  | 'dnaSourceValue'
  | 'propertyTypeId'
  | 'monthsBackId'
  | 'asOfDate'
>

export const getOrderProperties = async (
  ordersId: number
): Promise<OrderPropertyInterface> => {
  const obj: OrderPropertyInterface = generateProps([
    'ordersId',
    'bed',
    'bath',
    'sqft',
    'units',
    'garage',
    'lotSize',
    'yrBuilt',
    'dnaSourceValue',
    'propertyTypeId',
    'monthsBackId',
    'asOfDate'
  ])
  return obj
}
export type PropertyCharacteristicsInterface = Pick<
  IOrders,
  | 'dnaSourceValue'
  | 'bed'
  | 'bath'
  | 'sqft'
  | 'units'
  | 'garage'
  | 'lotSize'
  | 'yrBuilt'
>

export const getPropertyCharacteristicsSources = async (): Promise<
  PropertyCharacteristicsInterface[]
> => {
  const sources: PropertyCharacteristicsInterface[] = [
    {
      dnaSourceValue: 'MLS',
      bed: null,
      bath: 3,
      sqft: null,
      units: 4,
      garage: 2,
      lotSize: 2.5,
      yrBuilt: 1995
    },
    {
      dnaSourceValue: 'Public Record APM: 17-0155-003-005-3',
      bed: 4,
      bath: 3,
      sqft: 2100,
      units: 4,
      garage: 2,
      lotSize: 2.5,
      yrBuilt: 1995
    },
    {
      dnaSourceValue: 'Estimated',
      bed: 4,
      bath: 3,
      sqft: null,
      units: 1,
      garage: null,
      lotSize: 2.5,
      yrBuilt: 1995
    }
  ]

  return sources
}

export const changePropertyCharacteristics = async (
  order: OrderPropertyInterface
): Promise<void> => {}
