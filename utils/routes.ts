import { getCounties, getStates } from 'api'

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

export const getStateRoutes = async (): Promise<Route[]> => {
  const states = await getStates()
  return [
    {
      label: 'United States',
      value: 'United States',
      path: '/trending',
      parentPath: '/trending'
    },
    ...states.map(({ label, value }) => ({
      label,
      value: value.toLowerCase(),
      path: `/trending/${value.toLowerCase()}`,
      parentPath: '/trending'
    }))
  ]
}

export const getCountyRoutes = async (state: Route): Promise<Route[]> => {
  const counties = await getCounties(state.value)
  return [
    {
      label: `${state.label} Counties`,
      value: `${state.label} Counties`,
      path: `/trending/${state.value}`,
      parentPath: `/trending/${state.value}`
    },
    ...counties.map(({ label, value }) => ({
      label,
      value: value.toLowerCase(),
      path: `/trending/${state.value}/${value.toLowerCase()}`,
      parentPath: `/trending/${state.value}`
    }))
  ]
}

export const getTrendingRoutes = (state: Route, county: Route): Route[] => [
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
