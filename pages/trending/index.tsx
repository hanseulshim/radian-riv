import { withAuth } from 'components/auth/AuthRoute'
import Breadcrumbs from 'components/Breadcrumbs'
import Sidebar from 'components/Sidebar'
import { useEffect, useState } from 'react'
import { getStateRoutes, Route } from 'utils'

function Trending() {
  const [stateRoutes, setStateRoutes] = useState<Route[]>([])
  useEffect(() => {
    const getStates = async () => {
      //TODO: Add try/catch
      const states = await getStateRoutes()
      setStateRoutes(states)
    }
    getStates()
  }, [])
  return (
    <Sidebar routes={stateRoutes} label="Trending" parentPath="/">
      <div className="container trending">
        <Breadcrumbs current="National Level" />
        <h1>National Level Annual Price Change</h1>
        <h2>Single Family Only</h2>
      </div>
    </Sidebar>
  )
}

export default withAuth(Trending)
