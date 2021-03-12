import { Option } from 'api'
import faker from 'faker'
import { generateProps } from '.'
import {
  getOrderedByUsers,
  getClients,
  getProductTypes,
  getPools,
  getPropertyTypes,
  getDepartments,
  getRivStatuses,
  getReconcileStatuses
} from '..'
import { IOrders } from './orders'

export interface ISearchOrderFilters {
  name: string
  loanNum: string
  ordersId: string
  address: string
  zip: string
  city: string
  state: string
  propertyTypeId: string
  initialCompleteDate: string
  completeDate: string
  orderByIdUser: string
  status: string
  reconcileStatusId: string
  orderDateFrom: string
  orderDateTo: string
  msaId: string
  clientIds: string[]
  productId: string
  departmentId: string
  poolIds: string[]
}

export interface ISearchOrderOptions {
  propertyTypes: Option[]
  clients: Option[]
  productTypes: Option[]
  departments: Option[]
  orderedByUsers: Option[]
  statuses: Option[]
  reconcileStatuses: Option[]
  pools: Option[]
}

export const getSearchOrderOptions = async (): Promise<ISearchOrderOptions> => {
  const propertyTypes = await getPropertyTypes()
  const clients = await getClients()
  const productTypes = await getProductTypes()
  const departments = await getDepartments()
  const orderedByUsers = await getOrderedByUsers()
  const pools = await getPools()
  const statuses = await getRivStatuses()
  const reconcileStatuses = await getReconcileStatuses()
  return {
    propertyTypes,
    clients,
    productTypes,
    departments,
    orderedByUsers,
    statuses,
    reconcileStatuses,
    pools
  }
}

export const getSavedSearches = async (): Promise<ISearchOrderFilters[]> => {
  // const data = await handleApi('/value/savedsearches')
  const arr: ISearchOrderFilters[] = []
  for (let i = 0; i < 5; i++) {
    const obj = generateProps([
      'loanNum',
      'ordersId',
      'address',
      'city',
      'state',
      'zip',
      'client',
      'completeDate',
      'initialCompleteDate',
      'orderByUser',
      'orderDateTo',
      'orderDateFrom'
    ])
    arr.push({
      name: `${faker.name.firstName()}'s House`,
      propertyTypeId: 0,
      orderByIdUser: '26005-1',
      status: 0,
      reconcileStatusId: 0,
      msaId: 0,
      clientIds: [],
      productId: 0,
      departmentId: 0,
      poolIds: [],
      ...obj
    })
  }
  return arr
}

export const saveSearch = async (
  form: ISearchOrderFilters[]
): Promise<string> => {
  // const data = await handleApi('/value/savesearch', param)
  return 'Success'
}

export type ISearchOrders = Pick<
  IOrders,
  | 'ordersId'
  | 'productType'
  | 'address'
  | 'city'
  | 'state'
  | 'zip'
  | 'reconcileStatus'
  | 'client'
  | 'orderByUser'
  | 'orderDate'
  | 'completeDate'
  | 'calculatedPrice'
>

export const getOrders = async (
  form: ISearchOrderFilters
): Promise<ISearchOrders[]> => {
  const obj: ISearchOrders = generateProps([
    'productType',
    'address',
    'city',
    'state',
    'zip',
    'reconcileStatus',
    'client',
    'orderByUser',
    'orderDate',
    'completeDate',
    'calculatedPrice'
  ])
  obj.ordersId = 12345678
  const arr = [{ ...obj }]
  for (let i = 0; i < 100; i++) {
    const obj1: ISearchOrders = generateProps([
      'ordersId',
      'productType',
      'address',
      'city',
      'state',
      'zip',
      'reconcileStatus',
      'client',
      'orderByUser',
      'orderDate',
      'completeDate',
      'calculatedPrice'
    ])
    arr.push(obj1)
  }
  return arr
}
