import { withAuth } from 'context/auth/AuthRoute'
import { useTrending } from 'context/TrendingProvider'
import Breadcrumbs from 'components/common/Breadcrumbs'
import Sidebar from 'components/Sidebar'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { getTrendingRoutes } from 'utils'
import { getCounties } from 'api'
import TrendingFilters from 'components/trending/TrendingFilters'
import Modal from 'components/common/Modal'

interface Props {
  children: React.ReactNode
  label: string
}

function CountyLayout({ children, label }: Props) {
  const [hasError, setHasError] = useState(false)
  const {
    state,
    county,
    stateList,
    countyList,
    setCounty,
    countyFirstLoad,
    setCountyList,
    setSelectedCounty,
    setSelectedState,
    setState,
    setCountyFirstLoad
  } = useTrending()
  const router = useRouter()
  const { state: routerState, county: routerCounty } = router.query

  useEffect(() => {
    const getCounty = async () => {
      try {
        if (routerState && stateList.length && state === null) {
          const currentState = stateList.find(
            route => route.value === routerState
          )
          const counties = await getCounties(currentState.value)
          setCountyList(counties)
          setState(currentState)
          setSelectedState(currentState)
        }
        if (routerCounty && countyList.length) {
          const county = countyList.find(route => route.value === routerCounty)
          setCounty(county)
          if (countyFirstLoad) {
            setCountyFirstLoad(false)
            setSelectedCounty(county)
          }
        }
      } catch (e) {
        setHasError(true)
      }
    }
    getCounty()
  }, [routerCounty, stateList, state, routerState])

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

  return county ? (
    <Sidebar
      routes={getTrendingRoutes(state, county)}
      label={county.label}
      parentPath={`/trending/${state.value}`}
    >
      <div className="container trending">
        <Breadcrumbs
          current={`${county.label} County ${label}`}
          parents={[
            { path: '/trending', name: 'National Level' },
            {
              path: `/trending/${state.value}`,
              name: `${state.label} County Level`
            }
          ]}
        />
        <h1>{county.label} County Real Estate Trending</h1>
        <h2 className="county-view">{label}</h2>
        <TrendingFilters />
        {children}
      </div>
    </Sidebar>
  ) : null
}

export default withAuth(CountyLayout)
