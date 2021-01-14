import { getCounties, getStates, Option } from 'api'

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
    path: '/radian-interactive-value',
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
