import { withAuth } from 'components/auth/AuthRoute'
import Breadcrumbs from 'components/Breadcrumbs'
import Sidebar from 'components/Sidebar'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { getCountyRoutes, getCurrentState, Route } from 'utils'

function State() {
  const [countyRoutes, setCountyRoutes] = useState<Route[]>([])
  const [currentState, setCurrentState] = useState<Route>(null)
  const router = useRouter()
  const { state } = router.query
  useEffect(() => {
    const currentState = async () => {
      if (state) {
        const currentState = await getCurrentState(state as string)
        const counties = await getCountyRoutes(currentState)
        setCountyRoutes(counties)
        setCurrentState(currentState)
      }
    }
    currentState()
  }, [state])
  return currentState ? (
    <Sidebar
      routes={countyRoutes}
      label={currentState.label}
      parentPath="/trending"
    >
      <div className="container trending">
        <Breadcrumbs
          current={`${currentState.label} County Level`}
          parents={[{ path: '/trending', name: 'National Level' }]}
        />
        <h1>{currentState.label} County Level Annual Price Change</h1>
        <h2>Single Family Only</h2>
      </div>
    </Sidebar>
  ) : null
}

export default withAuth(State)
