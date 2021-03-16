import { withAuth } from 'context/auth/AuthRoute'
import { useTrending } from 'context/TrendingProvider'
import Breadcrumbs from 'components/common/Breadcrumbs'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { getCounties } from 'api'
import { getCountyRoutes } from 'utils'
import Modal from 'components/common/Modal'
import StateWithCountiesMap from 'components/trending/StateWithCountiesMap'

function State() {
  const [hasError, setHasError] = useState(false)
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
        try {
          const counties = await getCounties(currentState.value as string)
          setCountyList(counties)
          setState(currentState)
          setSelectedState(currentState)
        } catch (e) {
          setHasError(true)
        }
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
  const toggleErrorModal = () => {
    setHasError(!hasError)
  }
  if (hasError) {
    return (
      <Modal title="Error" closeModal={toggleErrorModal}>
        <div>Something went wrong.</div>
      </Modal>
    )
  }
  return countyList.length && state ? (
    <div id="main">
      <div className="content trending">
        <Breadcrumbs
          current={`${state.label} County Level`}
          parents={[{ path: '/trending', name: 'National Level' }]}
          routes={getCountyRoutes(state, countyList)}
          label={state.label}
          parentPath="/trending"
        />
        <h1>{state.label} County Level Annual Price Change</h1>
        <h2>Single Family Only</h2>
        <StateWithCountiesMap />
      </div>
    </div>
  ) : null
}

export default withAuth(State)
