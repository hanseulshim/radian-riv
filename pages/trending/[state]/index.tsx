import { withAuth } from 'context/auth/AuthRoute'
import { useTrending } from 'context/trending/TrendingProvider'
import Breadcrumbs from 'components/Breadcrumbs'
import Sidebar from 'components/Sidebar'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { getCounties } from 'api'
import { getCountyRoutes } from 'utils'

function State() {
  const {
    state,
    stateList,
    setCountyList,
    setState,
    countyList,
    setSelectedState,
    setCountyFirstLoad,
    setSelectedZip,
    setSelectedMsa,
    setSelectedType
  } = useTrending()
  const router = useRouter()
  const { state: routerState } = router.query
  useEffect(() => {
    const getState = async () => {
      if (routerState && stateList.length) {
        const currentState = stateList.find(
          state => state.value === routerState
        )

        //TODO: Add try/catch
        try {
          const counties = await getCounties(currentState.value)
          setCountyList(counties)
          setState(currentState)
          setSelectedState(currentState)
        } catch (e) {}
      }
    }
    getState()
  }, [routerState, stateList])
  useEffect(() => {
    setCountyFirstLoad(true)
    setSelectedZip(null)
    setSelectedMsa(null)
    setSelectedType(null)
  }, [])
  return countyList.length && state ? (
    <Sidebar
      routes={getCountyRoutes(state, countyList)}
      label={state.label}
      parentPath="/trending"
    >
      <div className="container trending">
        <Breadcrumbs
          current={`${state.label} County Level`}
          parents={[{ path: '/trending', name: 'National Level' }]}
        />
        <h1>{state.label} County Level Annual Price Change</h1>
        <h2>Single Family Only</h2>
      </div>
    </Sidebar>
  ) : null
}

export default withAuth(State)
