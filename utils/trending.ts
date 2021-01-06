import { getStateRoutes, getCountyRoutes } from './routes'

export const getCurrentState = async (state: string) => {
  const stateRoutes = await getStateRoutes()
  return stateRoutes.find(route => route.value === state)
}

export const getCurrentCounty = async (state: string, county: string) => {
  const currentState = await getCurrentState(state)
  const countyRoutes = await getCountyRoutes(currentState)
  return {
    currentState,
    currentCounty: countyRoutes.find(route => route.value === county)
  }
}
