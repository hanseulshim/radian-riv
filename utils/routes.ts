import { Option } from 'api'

export interface Route {
  label: string
  value: string
  path: string
  parentPath: string
}

export const rootRoutes = [
  {
    label: 'Home',
    value: 'Home',
    path: '/',
    parentPath: ''
  },
  {
    label: 'Trending',
    value: 'Trending',
    path: '/trending',
    parentPath: '/'
  },
  {
    label: 'Radian Interactive Value',
    value: 'Radian Interactive Value',
    path: '/value-products',
    parentPath: '/'
  }
]

export const profileRoutes = [
  {
    label: 'User Profile',
    value: 'User Profile',
    path: '/profile',
    parentPath: '/'
  },
  {
    label: 'Change Password',
    value: 'Change Password',
    path: '/profile/password',
    parentPath: '/'
  },
  {
    label: 'Change Security Questions',
    value: 'Change Security Questions',
    path: '/profile/security-questions',
    parentPath: '/'
  },
  {
    label: 'Change Filter Defaults',
    value: 'Change Filter Defaults',
    path: '/profile/filter-defaults',
    parentPath: '/'
  }
]

export const getStateRoutes = (stateList: Option[]): Route[] => {
  return [
    {
      label: 'United States',
      value: 'United States',
      path: '/trending',
      parentPath: '/trending'
    },
    ...stateList.map(({ label, value }) => ({
      label,
      value,
      path: `/trending/${value}`,
      parentPath: '/trending'
    }))
  ]
}

export const getCountyRoutes = (
  state: Option,
  countyList: Option[]
): Route[] => {
  return [
    {
      label: `${state.label} Counties`,
      value: `${state.label} Counties`,
      path: `/trending/${state.value}`,
      parentPath: `/trending/${state.value}`
    },
    ...countyList.map(({ label, value }) => ({
      label,
      value,
      path: `/trending/${state.value}/${value}`,
      parentPath: `/trending/${state.value}`
    }))
  ]
}

export const getTrendingRoutes = (state: Option, county: Option): Route[] => [
  {
    label: 'Home Price',
    value: 'Home Price',
    path: `/trending/${state.value}/${county.value}`,
    parentPath: `/trending/${state.value}/${county.value}`
  },
  {
    label: 'Listed/Sold',
    value: 'Listed/Sold',
    path: `/trending/${state.value}/${county.value}/listed-sold`,
    parentPath: `/trending/${state.value}/${county.value}`
  },
  {
    label: 'DOM/Supply',
    value: 'DOM/Supply',
    path: `/trending/${state.value}/${county.value}/dom-supply`,
    parentPath: `/trending/${state.value}/${county.value}`
  }
]

export const valueProductRoutes = [
  {
    label: 'Orders',
    value: 'Orders',
    path: `/value-products`,
    parentPath: '/value-products'
  }
]

export const getValueProductPropertyRoutes = (orderId: string): Route[] => [
  {
    label: 'RIV Property Info',
    value: 'RIV Property Info',
    path: `/value-products/${orderId}`,
    parentPath: `/value-products/${orderId}`
  },
  {
    label: 'RIV Valuation Form',
    value: 'RIV Valuation Form',
    path: `/value-products/${orderId}/valuation-form`,
    parentPath: `/value-products/${orderId}/valuation-form`
  },
  {
    label: 'Market Analysis',
    value: 'Market Analysis',
    path: `/value-products/${orderId}/market-analysis`,
    parentPath: `/value-products/${orderId}/market-analysis`
  },
  {
    label: 'Rental Analysis',
    value: 'Rental Analysis',
    path: `/value-products/${orderId}/rental-analysis`,
    parentPath: `/value-products/${orderId}/rental-analysis`
  },
  {
    label: 'Rental Valuation Form',
    value: 'Rental Valuation Form',
    path: `/value-products/${orderId}/rental-valuation-form`,
    parentPath: `/value-products/${orderId}/rental-valuation-form`
  },
  {
    label: 'Define Market Area',
    value: 'Define Market Area',
    path: `/value-products/${orderId}/define-market-area`,
    parentPath: `/value-products/${orderId}/define-market-area`
  },
  {
    label: 'Documents',
    value: 'Documents',
    path: `/value-products/${orderId}/documents`,
    parentPath: `/value-products/${orderId}/documents`
  }
]
