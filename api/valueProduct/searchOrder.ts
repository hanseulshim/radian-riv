import { Option } from 'api'
import { formatDate } from 'utils'
import faker from 'faker'

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

export const getOrders = async (
  form: Filters
): Promise<SearchOrderInterface[]> => {
  const arr = [
    {
      id: '123456789-0',
      productType: 'RIV',
      address: faker.address.streetAddress(),
      city: faker.address.city(),
      state: faker.address.stateAbbr(),
      zip: faker.address.zipCode(),
      reconcileStatus: 'Ready for QC',
      client: 'Boost Labs',
      orderedBy: `${faker.name.lastName()}, ${faker.name.firstName()}`,
      orderDate: formatDate(faker.date.between('2020-01-01', '2020-12-31')),
      dueDate: formatDate(faker.date.between('2020-01-01', '2020-12-31')),
      price: faker.random.number({ min: 500000, max: 600000 })
    }
  ]
  for (let i = 0; i < 100; i++) {
    arr.push({
      id: `${faker.random.number({
        min: 20000000,
        max: 50000000
      })}-${faker.random.number({ min: 1, max: 9 })}`,
      productType: 'RIV',
      address: faker.address.streetAddress(),
      city: faker.address.city(),
      state: faker.address.stateAbbr(),
      zip: faker.address.zipCode(),
      reconcileStatus: 'Ready for QC',
      client: 'Boost Labs',
      orderedBy: `${faker.name.lastName()}, ${faker.name.firstName()}`,
      orderDate: formatDate(faker.date.between('2020-01-01', '2020-12-31')),
      dueDate: formatDate(faker.date.between('2020-01-01', '2020-12-31')),
      price: faker.random.number({ min: 500000, max: 600000 })
    })
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
