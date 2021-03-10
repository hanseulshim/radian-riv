import { Option } from 'api'
import faker from 'faker'
import { generateProps } from '.'
import { OrderInterface } from '.'

export interface Filters {
  orderDateFrom: string
  orderDateTo: string
  clientLoanNumber: string
  orderId: string
  address: string
  zip: string
  city: string
  state: Option
  msa: Option
  client: Option
  baseClient: string
  propertyType: Option
  completeDateFrom: string
  completeDateTo: string
  products: Option
  department: Option
  orderedBy: Option
  rivStatus: Option
  reconcileStatus: Option
  selectedPools: Option[]
}
export interface Search {
  name: string
  filters: Filters
}
export const getSavedSearches = async (): Promise<Search[]> => {
  const arr = []
  for (let i = 0; i < 5; i++) {
    arr.push({
      name: `${faker.name.firstName()}'s House`,
      filters: {
        orderDateFrom: null,
        orderDateTo: null,
        clientLoanNumber: null,
        orderId: null,
        address: faker.address.streetAddress(),
        zip: faker.address.zipCode(),
        city: null,
        state: null,
        msa: null,
        client: null,
        baseClient: null,
        propertyType: null,
        completeDateFrom: null,
        completeDateTo: null,
        products: null,
        department: null,
        orderedBy: null,
        rivStatus: null,
        reconcileStatus: null,
        selectedPools: null
      }
    })
  }
  return arr
}

export const saveSavedSearches = async (form: Search[]): Promise<string> => {
  return 'Success'
}

export interface SearchOrderInterface {
  id: string
  productType: string
  address: string
  city: string
  state: string
  zip: string
  reconcileStatus: string
  client: string
  orderedBy: string
  orderDate: string
  dueDate: string
  price: number
}

type Test = Pick<OrderInterface, 'id'>

export const getOrders = async (
  form: Filters
): Promise<SearchOrderInterface[]> => {
  const obj: SearchOrderInterface = generateProps([
    'productType',
    'address',
    'city',
    'state',
    'zip',
    'reconcileStatus',
    'client',
    'orderedBy',
    'orderDate',
    'dueDate',
    'price'
  ])
  obj.id = '12345678'
  const arr = [{ ...obj }]
  for (let i = 0; i < 100; i++) {
    const obj1: SearchOrderInterface = generateProps([
      'id',
      'productType',
      'address',
      'city',
      'state',
      'zip',
      'reconcileStatus',
      'client',
      'orderedBy',
      'orderDate',
      'dueDate',
      'price'
    ])
    arr.push(obj1)
  }
  return arr
}

export const getClientList = async (): Promise<Option[]> => {
  const options = [
    {
      label: 'Client 1',
      value: 'Client 1'
    },
    {
      label: 'Client 2',
      value: 'Client 2'
    },
    {
      label: 'Client 3',
      value: 'Client 3'
    }
  ]
  return options
}

export const getProducts = async (): Promise<Option[]> => {
  const options = [
    {
      label: 'All',
      value: 'All'
    },
    {
      label: 'Radian Interactive Value',
      value: 'Radian Interactive Value'
    },
    {
      label: 'Rental Analysis',
      value: 'Rental Analysis'
    }
  ]
  return options
}

export const getDepartments = async (): Promise<Option[]> => {
  const options = [
    {
      label: 'All',
      value: 'All'
    },
    {
      label: 'Department 2',
      value: 'Department 2'
    },
    {
      label: 'Department 3',
      value: 'Department 3'
    }
  ]
  return options
}

export const getOrderedByUsers = async (): Promise<Option[]> => {
  const options = [
    {
      label: 'All',
      value: 'All'
    },
    {
      label: 'User 2',
      value: 'User 2'
    },
    {
      label: 'User 3',
      value: 'User 3'
    }
  ]
  return options
}

export const getRivStatuses = async (): Promise<Option[]> => {
  const options = [
    {
      label: 'All',
      value: 'All'
    },
    {
      label: '60 days',
      value: '60 days'
    },
    {
      label: '90 days',
      value: '90 days'
    }
  ]
  return options
}

export const getReconcileStatuses = async (): Promise<Option[]> => {
  const options = [
    {
      label: 'All',
      value: 'All'
    },
    {
      label: 'Status 2',
      value: 'Status 2'
    },
    {
      label: 'Status 3',
      value: 'Status 3'
    }
  ]
  return options
}

export const getPools = async (): Promise<Option[]> => {
  const options = [
    {
      label: 'Pool 1',
      value: 'Pool 1'
    },
    {
      label: 'Pool 2',
      value: 'Pool 2'
    },
    {
      label: 'Pool 3',
      value: 'Pool 3'
    }
  ]
  return options
}
